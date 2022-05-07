import { change_color, change_config, timeline_config } from '@/assets/js/config'
import * as d3 from "d3"

var text_size_ratio = 6 * 16 / 65 / 20

function handel_change(data, proportion_flag) {
    let change_svg = d3.select("#tb_changes") // overview_svg  tb_changes
    change_svg.selectChildren().remove()
        // 计算行列高度
    const height_ratio = change_config.col_height / data.average_row
    const outer_col_height = height_ratio * data.max_row + change_config.icon_size[1] + 2 * change_config.col_border_interval_y + change_config.icon_margin_bottom

    let margin_top = drawTimeline(data.column_change_data, data.skip_step, timeline_config.margin_top)
    drawChanges(data.change_data, data.skip_step, height_ratio, outer_col_height, margin_top + change_config.margin_top, proportion_flag)

}


function drawTimeline(column_change_data, skip_step, margin_top) {
    let change_svg = d3.select("#tb_changes")
    let timeline = {
        x: timeline_config.margin_left - timeline_config.line_width / 2,
        y: null
    }

    for (let key in column_change_data) {
        let margin_left = timeline_config.margin_left

        change_svg.append("circle")
            .attr("r", timeline_config.radius)
            .attr("cx", margin_left).attr("cy", margin_top)
            .attr("stroke", 'black')
            .attr("fill", 'white')

        let text_y = margin_top + timeline_config.radius / 2
        change_svg.append("text").text(key - skip_step)
            .attr("font-size", change_config.title_font_size)
            .attr("x", margin_left).attr("y", text_y)
            // .attr("transform", `translate(${timeline_config.radius/2}, 0)`)
            .attr("text-anchor", "middle")


        if (key > skip_step) {
            // 绘制 timeline
            change_svg.append("rect")
                .classed("timeline", true)
                .attr("x", timeline.x).attr("y", timeline.y)
                .attr("width", timeline_config.line_width).attr("height", timeline_config.knot_interval)
                .attr("fill", change_color[column_change_data[key].type])

            // 绘制 icon
            let icon_x = margin_left - timeline_config.icon_width - timeline_config.start_gap
            column_change_data[key].transform_list.slice().reverse().forEach((type, ti) => {
                drawIcon(change_svg, type, icon_x, margin_top - (timeline_config.knot_interval + change_config.icon_size[1]) / 2, timeline_config.icon_width)
                icon_x -= timeline_config.icon_width
            })
        }
        timeline.y = margin_top

        // 绘制列名
        margin_left += timeline_config.radius
        let max_len = text_size_ratio * timeline_config.col_width
        column_change_data[key].columns_list.forEach(coln => {
            drawText(change_svg, coln, change_config.title_font_size, margin_left, text_y, [timeline_config.col_width / 2, 0], max_len)

            // change_svg.append("text").text(coln)
            //     .attr("font-size", change_config.title_font_size)
            //     .attr("x", margin_left).attr("y", text_y)
            //     .attr("transform", `translate(${timeline_config.col_width/2}, 0)`)
            //     .attr("text-anchor", "middle")

            margin_left += timeline_config.col_width + timeline_config.col_interval
        })
        margin_top += timeline_config.knot_interval
    }
    d3.selectAll(".timeline").lower()

    return margin_top
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


function drawChanges(change_data, skip_step, height_ratio, outer_col_height, margin_top = change_config.margin_top, proportion_flag = false) {
    let change_svg = d3.select("#tb_changes") // overview_svg  tb_changes
        // change_svg.selectChildren().remove()

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

                        // 添加右侧步骤文本
                        if (block.step != undefined) {
                            let text_x = margin_left + change_config.col_width
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
            let move_dist = change_config.col_width + step_text_flag * change_config.right_step_width
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


export { handel_change }