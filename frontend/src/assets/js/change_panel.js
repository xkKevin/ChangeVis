import { change_color, change_config, timeline_config } from '@/assets/js/config'
import * as d3 from "d3"
import * as d3box from "d3-boxplot"

var text_size_ratio = 6 * 16 / 65 / 20

async function handel_change(data, proportion_flag) {
    let change_svg = d3.select("#tb_changes") // overview_svg  tb_changes
    change_svg.selectChildren().remove()
        // 计算行列高度
    const height_ratio = change_config.col_height / data.average_row
    const outer_col_height = height_ratio * data.max_row + change_config.icon_size[1] + 2 * change_config.col_border_interval_y + change_config.icon_margin_bottom

    let margin_top = await drawColline(data.column_change_data, data.skip_step, timeline_config.margin_top, data.maxlen)
    let view_width = drawChanges(data.change_data, data.skip_step, height_ratio, outer_col_height, margin_top + change_config.margin_top, proportion_flag)
    return view_width
}

function readcsv(path) {
    return new Promise((resolve, reject) => {
        d3.csv(path).then(data => {
            resolve(data)
        })
    })
}

async function drawColline(data, view) {
    let colline_svg = d3.select("#colline_svg")
    colline_svg.selectChildren().remove()

    let column_change_data = data.column_change_data
    let skip_step = data.skip_step
    let maxlen = data.maxlen
    let margin_top = timeline_config.margin_top + view.level2.height

    let timeline = {
        x: timeline_config.margin_left - timeline_config.line_width / 2,
        y: null
    }

    let cdi = 0
    let csv_data = null
    let col_data = {}
    let offset_x = maxlen * timeline_config.icon_width // 向右偏移量
    timeline.x += offset_x

    let col_posi = {} // 列名中心点的x坐标

    for (let key in column_change_data) {

        if (cdi === 0 || cdi === Object.keys(column_change_data).length - 1) {
            col_data = {}
            csv_data = await readcsv(column_change_data[key].table_path)
            csv_data.forEach(ci => {
                csv_data.columns.forEach(cname => {
                    if (col_data[cname] === undefined) col_data[cname] = []
                    col_data[cname].push(ci[cname])
                })
            })
        }

        let margin_left = timeline_config.margin_left + offset_x

        colline_svg.append("circle")
            .attr("r", timeline_config.radius)
            .attr("cx", margin_left).attr("cy", margin_top)
            .attr("stroke", 'black')
            .attr("fill", 'white')

        let text_y = margin_top + timeline_config.radius / 2
        colline_svg.append("text").text(key - skip_step)
            .attr("font-size", change_config.title_font_size)
            .attr("x", margin_left).attr("y", text_y)
            // .attr("transform", `translate(${timeline_config.radius/2}, 0)`)
            .attr("text-anchor", "middle")


        if (key > skip_step) {
            // 绘制 timeline
            colline_svg.append("rect")
                .classed("timeline", true)
                .attr("x", timeline.x).attr("y", timeline.y)
                .attr("width", timeline_config.line_width).attr("height", timeline_config.knot_interval)
                .attr("fill", change_color[column_change_data[key].row_type])

            // 绘制 icon
            let icon_x = margin_left - timeline_config.icon_width - timeline_config.start_gap
            column_change_data[key].transform_list.slice().reverse().forEach((type, ti) => {
                drawIcon(colline_svg, type, icon_x, margin_top - (timeline_config.knot_interval + change_config.icon_size[1]) / 2, timeline_config.icon_width)
                icon_x -= timeline_config.icon_width
            })
        }
        timeline.y = margin_top

        // 绘制列名
        margin_left += timeline_config.radius + timeline_config.start_gap
        let max_len = text_size_ratio * timeline_config.col_width
        let columns = column_change_data[key].columns
        let half_col_width = timeline_config.col_width / 2
        let current_col_posi = {}
        for (let ci in columns) {
            // 绘制背景颜色
            colline_svg.append("rect")
                .attr("x", margin_left).attr("y", margin_top - timeline_config.radius)
                .attr("width", timeline_config.col_width).attr("height", 2 * timeline_config.radius)
                .attr("fill", change_color[columns[ci].change_type])

            drawText(colline_svg, ci, change_config.title_font_size, margin_left, text_y, [half_col_width, 0], max_len)

            // 绘制glyph
            if (cdi === 0 || cdi === Object.keys(column_change_data).length - 1) {
                let glyph_y = cdi === 0 ? text_y - 60 : text_y + 25
                switch (columns[ci].data_type) {
                    case 'num':
                        drawBox(colline_svg, margin_left + 10, glyph_y, timeline_config.col_width - 20, 30, col_data[ci].map(Number), change_color.glyph)
                        break
                    case 'str':
                        drawBar(colline_svg, margin_left + 10, glyph_y, timeline_config.col_width - 20, 30, typeCount(col_data[ci]), change_color.glyph)
                        break
                }
            }
            current_col_posi[ci] = margin_left + half_col_width
            margin_left += timeline_config.col_width + timeline_config.col_interval
        }

        if (column_change_data[key].transform_list[column_change_data[key].transform_list.length - 1] === 'transform_columns_rearrange') {
            column_change_data[key].line_cols.forEach((ci, ti) => {
                if (col_posi[ci] != current_col_posi[ci]) {
                    // console.log(col_posi[ci], current_col_posi[ci]);
                    let start_p = [col_posi[ci], margin_top - timeline_config.knot_interval + timeline_config.radius]
                    let end_p = [current_col_posi[ci], margin_top - timeline_config.radius]
                    let points = generatePoints(start_p, end_p, 6, 3)

                    let line = d3.line()
                        .curve(d3.curveCardinal.tension(0))
                        .x(d => d[0]).y(d => d[1])

                    colline_svg.append("path")
                        .attr('d', (d) => line(points))
                        .attr("stroke", change_color.transform) // steelblue
                        .attr("stroke-width", 2)
                        .attr("fill", "none")
                }
            })
        }
        col_posi = current_col_posi

        margin_top += timeline_config.knot_interval
        cdi++
    }
    d3.selectAll(".timeline").lower()

    d3.selectAll(".plot")
        .on("mouseover", function() {
            d3.select(this).classed("select", true)
        })
        .on("mouseout", function() {
            d3.select(this).classed("select", false)
        })

    let colline_svg_box = colline_svg.node().getBBox()
    view.level3 = {
        width: timeline_config.margin_left + colline_svg_box.width,
        height: margin_top + 50
    }
}

function drawTriangle(svg, text, x, y, color, width = 6, height = 12) {
    x += 2
    y -= 5
    let data = [
        [x, y],
        [x + width, y - height / 2],
        [x + width, y + height / 2]
    ]

    let line = d3.line()
        .x(d => d[0]).y(d => d[1])

    let triangle_g = svg.append("g")

    triangle_g.append("path")
        .datum(data)
        .attr('d', line)
        // .attr("stroke", color) // steelblue
        // .attr("stroke-width", 2)
        .attr("fill", "black")

    let text_x = x + width + 3
    let tri_text = triangle_g.append("text").text(text)
        .attr("font-size", change_config.step_font_size)
        .attr("x", text_x).attr("y", y + 6)
        .attr("text-anchor", "start")

    return 5 + width + tri_text.node().getBBox().width
}

function generatePoints(start, end, iv_x = 6, iv_y = 3.5) {
    let posi_interval_x = (end[0] - start[0]) / iv_x
    let posi_interval_y = (end[1] - start[1]) / iv_y
    let p1 = [start[0] + posi_interval_x, start[1] + posi_interval_y]
    let p2 = [end[0] - posi_interval_x, end[1] - posi_interval_y]
    return [start, p1, p2, end]
}

function typeCount(data) {
    let count = {}
    data.forEach(d => {
        if (count[d] === undefined) count[d] = 0
        count[d] += 1
    })

    // let values = Object.values(count)
    // return { count, d3.min(values), d3.max(values) }
    return count
}

function drawBar(svg, x, y, width, height, data, color = '#666') {
    const plot = svg.append("g").classed("plot", "true")
    const data_values = Object.values(data)
    const data_keys = Object.keys(data)
    const max_k = data_keys[d3.maxIndex(data_values)]
    const max_v = data[max_k]
    const min_k = data_keys[d3.minIndex(data_values)]
    const min_v = data[min_k]

    let text = max_k + ': ' + max_v + ' (Max)\n'
    text += min_k + ': ' + min_v + ' (Min)'

    const xScale = d3.scaleBand()
        .domain(Object.keys(data))
        .range([0, width])

    const yScale = d3.scaleLinear()
        .domain([0, max_v])
        .range([0, height])

    for (let i in data) {
        plot.append('rect')
            .attr("height", yScale(data[i]))
            .attr("width", xScale.bandwidth())
            .attr("fill", color)
            // .attr("stroke", color)
            .attr("x", xScale(i))
            .attr("y", height - yScale(data[i]))
            .attr("opacity", 0.9)
            // .attr("y", (height - yScale(data[i]) / 2))
    }
    plot.attr("transform", `translate(${x}, ${y-5})`)
        .append("svg:title").text(text)
}

function drawBox(svg, x, y, width, height, data, color = '#666') {

    // https://github.com/akngs/d3-boxplot
    const plot = svg.append("g").classed("plot", "true")
    const plot_box = plot.append("g")

    let countNan = 0
    data.forEach(d => {
        if (isNaN(d)) countNan++
    })

    const stats = d3box.boxplotStats(data)
    const scale = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([0, width])

    let outliers = []
    const boxplot = d3box.boxplot()
        .jitter(0)
        .showInnerDots(false)
        .scale(scale)
        .vertical(0)
        .boxwidth(height)
        .opacity(0.9)
        .key(i => outliers.push(i))


    plot_box.datum(stats).call(boxplot)
    plot_box.attr("transform", `translate(${x}, ${y})`)
        .selectAll('*').attr('color', color)

    let box = plot.node().getBBox()
    plot.append("rect")
        .attr("height", box.height)
        .attr("width", box.width + 1)
        .attr("stroke", change_color.unchange)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("x", x - 2)
        .attr("y", y - 5)

    let text = "Max: " + d3.max(data)
    text += "\nMean: " + (+d3.mean(data).toFixed(2))
    text += "\nMin: " + d3.min(data)
    if (outliers.length) text += "\nOutliers: " + outliers.sort(d3.ascending).join(",")
    if (countNan) text += "\nNaN: " + countNan

    plot.append("svg:title").text(text)
}

/**
 * @description 指定坐标及图形，绘制图形
 */
function drawIcon(svg, transform_icon, x, y, icon_width) {
    return new Promise((resolve, reject) => {
        let iconUrl = require(`@/assets/images/${transform_icon}.svg`)
        let icon_image = new Image()
        icon_image.src = iconUrl
        icon_image.onload = function() {
            let icon_scale_ratio = change_config.icon_size[1] / icon_image.height
            let offset_x = icon_width / 2 - icon_image.width * icon_scale_ratio / 2
            x += offset_x
            let image_element = svg.append('image')
                .attr('href', iconUrl)
                .attr('x', x)
                .attr('y', y)
                // .attr('width', change_config.icon_size[0])
                .attr('height', change_config.icon_size[1])

            image_element.append("svg:title").text(transform_icon.split("_").join(" "))

            if (transform_icon === 'transform_columns_rearrange') {
                let img_box = image_element.node().getBBox()
                let cx = img_box.x + img_box.width / 2
                let cy = img_box.y + img_box.height / 2
                image_element.attr("transform", `translate(${-0.3*cx}, ${-0.3*cy}) scale(1.3)`)
            }
            resolve()
        }
    })
}


function drawChanges(data, view, proportion_flag = false) {
    let change_svg = d3.select("#change_svg")
    change_svg.selectChildren().remove()

    const height_ratio = change_config.col_height / data.average_row
    const outer_col_height = height_ratio * data.max_row + change_config.icon_size[1] + 2 * change_config.col_border_interval_y + change_config.icon_margin_bottom

    let change_data = data.change_data
    let skip_step = data.skip_step
    let margin_top = change_config.margin_top + view.level1.height

    let margin_left = change_config.margin_left
    let start_flag = true
    let fill_block = ['unchange', 'delete', 'transform', 'create', 'nan']

    for (let key in change_data) {

        let outer_col_start_x = margin_left
        let outer_col_start_y = margin_top // change_config.margin_top
        let outer_col_width = 0

        let group = 0
        let col_y = outer_col_start_y + change_config.col_border_interval_y + change_config.icon_size[1] + change_config.icon_margin_bottom

        let dependent_col_x // 第一个依赖列的x坐标

        if (change_data[key].length > 0) {
            margin_left += change_config.col_border_interval_x
            outer_col_width += change_config.col_border_interval_x
        }

        let tri_width = 0

        change_data[key].forEach((col, ci) => {
            if (ci) { // 只有非首位且不同组才要加间隔  && group != col.group
                margin_left += change_config.col_inner_interval
                outer_col_width += change_config.col_inner_interval
            }

            let change_step = change_svg.append("g").classed("change_step", true).attr("step", col.step)


            let col_height = height_ratio * col.output_row_num

            // 添加依赖列
            if (col.input_col) {
                col.input_col.forEach((dependent_col, dci) => {
                    if (dci === 0) {
                        dependent_col_x = margin_left
                    }
                    change_step.append("rect")
                        .attr("id", 'col_t' + col.step + '_' + ci + '_' + dependent_col)
                        .attr("x", margin_left).attr("y", col_y)
                        .attr("width", change_config.col_width).attr("height", col_height)
                        .attr("fill", change_color.unchange)
                        .attr("stroke", 'black')
                        .attr("stroke-width", change_config.dot_width + 'px')
                        .attr("stroke-dasharray", change_config.dot_dasharray)

                    // 依赖列列名
                    drawText(change_step, dependent_col, change_config.content_font_size, margin_left, col_y - 1.5 * change_config.icon_margin_bottom, [change_config.col_width / 2, 0])

                    // change_step.append("text").text(dependent_col)
                    //     .attr("font-size", change_config.content_font_size)
                    //     .attr("x", margin_left).attr("y", col_y - 1.5 * change_config.icon_margin_bottom)
                    //     .attr("transform", `translate(${change_config.col_width/2}, 0)`)
                    //     .attr("text-anchor", "middle")

                    margin_left += change_config.col_width
                    outer_col_width += change_config.col_width
                })
                margin_left += change_config.dot_width / 2
                outer_col_width += change_config.dot_width / 2
            }

            // 添加主体改变列
            change_step.append("rect")
                .attr("id", 'col_t' + col.step + '_' + ci)
                .attr("x", margin_left).attr("y", col_y)
                .attr("width", change_config.col_width).attr("height", col_height)
                .attr("fill", change_color.unchange)

            // 为主体改变列着色，并添加文本，同时展示右侧比例
            let step_text_flag = 0 // 是否空出 step_text 的间隔
            fill_block.forEach(fill_ai => {
                if (fill_ai === 'nan') {
                    if (col.output_nan_posi && col.output_nan_posi.length === 2) {
                        let area_y = col_y + col.output_nan_posi[0] * col_height
                        let area_proportion = col.output_nan_posi[1] - col.output_nan_posi[0]
                        let text = proportion_flag ? (area_proportion * 100).toFixed(0) + '%' : ''
                        fillColorText(change_step, margin_left, area_y, area_proportion * col_height, change_color[fill_ai], text)
                    }
                    if (col.input_nan_posi) {
                        col.input_nan_posi.forEach((cinan, ci) => {
                            if (cinan && cinan.length === 2) {
                                let area_y = col_y + cinan[0] * col_height
                                let area_proportion = cinan[1] - cinan[0]
                                let text = proportion_flag ? (area_proportion * 100).toFixed(0) + '%' : ''
                                fillColorText(change_step, dependent_col_x + ci * change_config.col_width, area_y, area_proportion * col_height, change_color[fill_ai], text)
                            }
                        })
                    }
                } else if (col[fill_ai]) {
                    col[fill_ai].forEach(block => { // block 表示一个颜色块
                        let block_y = col_y + block.posi[0] * col_height
                        let area_proportion = block.posi[1] - block.posi[0]
                        let text = proportion_flag ? (area_proportion * 100).toFixed(0) + '%' : block.case.output_case[0]
                        let text_y = fillColorText(change_step, margin_left, block_y, area_proportion * col_height, change_color[fill_ai], text)
                        if (!proportion_flag) {
                            block.case.input_case.forEach((dependent_text, ci) => {
                                drawText(change_step, dependent_text[0], change_config.step_font_size, dependent_col_x + ci * change_config.col_width, text_y, [change_config.col_width / 2, 0])
                            })
                        }

                        let text_x = margin_left + change_config.col_width

                        // 添加右侧步骤文本
                        if (block.step != undefined) {
                            change_step.append("text").text(block.step - skip_step)
                                .attr("font-size", change_config.step_font_size)
                                .attr("x", text_x).attr("y", text_y)
                                .attr("transform", `translate(${change_config.right_step_width/2}, 0)`)
                                .attr("text-anchor", "middle")
                            step_text_flag = 1

                            // 为 change_step 赋予新的 step 值
                            let old_step = change_step.attr("step")
                            change_step.attr("step", old_step + '_' + block.step)
                        }

                        // 添加右侧 三角形
                        if (block.triangle != undefined) {
                            tri_width = drawTriangle(change_step, block.triangle, text_x, text_y, change_color[fill_ai])
                        }

                    })
                }
            })

            if (col.type === "sort") {
                let linear = d3.scaleLinear().domain([col.min_num, col.max_num]).range([0, 1])
                let compute = d3.interpolate(change_color.sort[0], change_color.sort[1])
                let ba_height = col_height / col.output_row_num
                let ba_color

                change_step.selectAll('.changes_cg' + col.step).data(col.input_case).enter().append('rect')
                    .attr("x", margin_left).attr("y", (d, i) => col_y + i * ba_height)
                    .attr("width", change_config.col_width / 2).attr("height", ba_height)
                    .attr("fill", (d, i) => {
                        if (d === undefined) ba_color = change_color.nan
                        else ba_color = compute(linear(d))
                        return ba_color
                    }).attr("stroke", (d, i) => {
                        if (d === undefined) ba_color = change_color.nan
                        else ba_color = compute(linear(d))
                        return ba_color
                    })

                change_step.selectAll('.changes_cg' + col.step).data(col.output_case).enter().append('rect')
                    .attr("x", margin_left + change_config.col_width / 2).attr("y", (d, i) => col_y + i * ba_height)
                    .attr("width", change_config.col_width / 2).attr("height", ba_height)
                    .attr("fill", (d, i) => {
                        if (d === undefined) ba_color = change_color.nan
                        else ba_color = compute(linear(d))
                        return ba_color
                    }).attr("stroke", (d, i) => {
                        if (d === undefined) ba_color = change_color.nan
                        else ba_color = compute(linear(d))
                        return ba_color
                    })
            }


            // 添加图标
            drawIcon(change_step, col.transform_icon, margin_left, col_y - change_config.icon_size[1] - change_config.icon_margin_bottom, change_config.col_width)

            // 添加步骤序号
            if (step_text_flag === 0) {
                let text_g = change_step.append("g").attr("id", "step" + col.step)
                let text_step = text_g.append("text").text(col.step - skip_step)
                    .attr("font-size", change_config.step_font_size)
                    .attr("x", margin_left + change_config.col_width).attr("y", col_y - 1.5 * change_config.icon_margin_bottom)
                    .attr("text-anchor", "end")
                    // let text_box = text_step.node().getBBox()
                    // text_g.append("rect")
                    //     .attr("x", text_box.x - 2).attr("y", text_box.y - 1.5)
                    //     .attr("width", text_box.width + 4).attr("height", text_box.height + 3)
                    //     .attr("fill", "none")
                    //     .attr("stroke", change_color[col.transform_icon.split('_')[0]])
                    //     .attr("stroke-width", 2.5)
                text_step.raise()
            }

            group = col.group ? col.group : 0
            let move_dist = change_config.col_width + step_text_flag * change_config.right_step_width + tri_width
            margin_left += move_dist
            outer_col_width += move_dist
        });

        if (change_data[key].length === 0) {
            margin_left += change_config.empty_col_width + change_config.col_outer_interval
            outer_col_width = change_config.empty_col_width
        } else {
            margin_left += change_config.col_border_interval_x + change_config.col_outer_interval
            outer_col_width += change_config.col_border_interval_x
        }

        // 绘制列的外边框
        change_svg.append("rect")
            .attr("id", 'col_' + key)
            .attr("x", outer_col_start_x).attr("y", outer_col_start_y)
            .attr("width", outer_col_width).attr("height", outer_col_height)
            .attr("fill", change_color.col_bg)
            .lower()

        // 绘制外侧列名
        drawText(change_svg, key, change_config.title_font_size,
            outer_col_start_x, outer_col_start_y - 10, [outer_col_width / 2, 0], text_size_ratio * (outer_col_width + change_config.col_outer_interval))

        // change_svg.append("text").text(key)
        //     .attr("font-size", change_config.title_font_size)
        //     .attr("x", outer_col_start_x).attr("y", outer_col_start_y - 10)
        //     .attr("transform", `translate(${outer_col_width/2}, 0)`)
        //     .attr("text-anchor", "middle")
    }

    let change_svg_box = change_svg.node().getBBox()
    view.level2 = {
        width: change_svg_box.width + change_config.margin_left * 2,
        height: margin_top + change_svg_box.height
    }
}

function drawText(svg, text, font_size, x, y, transform, max_len = change_config.text_max_len, anchor = "middle") {

    if (text === undefined) return

    let text_element = svg.append("text").text(text)
        .attr("font-size", font_size)
        .attr("x", x).attr("y", y)
        .attr("transform", `translate(${transform[0]}, ${transform[1]})`)
        .attr("text-anchor", anchor)

    if (text.length > max_len) {
        let text_abbr = text.slice(0, max_len - 1) + '...'
        text_element.text(text_abbr).append("svg:title").text(text)
    }
}

function fillColorText(svg, x, y, height, color, text = undefined) {
    svg.append("rect")
        .attr("x", x).attr("y", y)
        .attr("width", change_config.col_width).attr("height", height)
        .attr("fill", color)

    let text_y = y + height / 2 + 5
    if (text) {
        drawText(svg, text, change_config.step_font_size, x, text_y, [change_config.col_width / 2, 0])

        // svg.append("text").text(text)
        //     .attr("font-size", change_config.step_font_size)
        //     .attr("x", x).attr("y", text_y)
        //     .attr("transform", `translate(${change_config.col_width/2}, 0)`)
        //     .attr("text-anchor", "middle")
    }
    return text_y
}


export { handel_change, readcsv, drawChanges, drawColline }