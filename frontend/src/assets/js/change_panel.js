import { change_color, change_config, data } from '@/assets/js/config'
import * as d3 from "d3"

function handel_change() {

    // 计算行列高度
    const height_ratio = change_config.col_height / data.average_row
    const outer_col_height = height_ratio * data.max_row + change_config.icon_size[1] + 2 * change_config.col_border_interval_y + change_config.icon_margin_bottom

    drawChanges(data.change_data, height_ratio, outer_col_height)

}

function drawIcon(change_svg, transform_icon, x, y) {
    return new Promise((resolve, reject) => {
        let iconUrl = require(`@/assets/images/${transform_icon}.svg`)
        let icon_image = new Image()
        icon_image.src = iconUrl
        icon_image.onload = function() {
            let icon_scale_ratio = change_config.icon_size[1] / icon_image.height
            let offset_x = change_config.col_width / 2 - icon_image.width * icon_scale_ratio / 2
            change_svg.append('image')
                .attr('href', iconUrl)
                .attr('x', x)
                .attr('y', y)
                // .attr('width', change_config.icon_size[0])
                .attr('height', change_config.icon_size[1])
                .attr("transform", `translate(${offset_x}, 0)`)
            resolve()
        }
    })
}

function drawChanges(change_data, height_ratio, outer_col_height) {
    let change_svg = d3.select("#tb_changes") // overview_svg  tb_changes
    change_svg.selectChildren().remove()

    let margin_left = change_config.margin_left
    let start_flag = true
    let fill_block = ['unchange', 'delete', 'transform', 'create', 'nan']

    for (let key in change_data) {

        let outer_col_start_x = margin_left
        let outer_col_start_y = change_config.margin_top
        let outer_col_width = 0

        let group = 0
        let col_y = outer_col_start_y + change_config.col_border_interval_y + change_config.icon_size[1] + change_config.icon_margin_bottom

        let dependent_col_x // 第一个依赖列的x坐标

        if (change_data[key].length > 0) {
            margin_left += change_config.col_border_interval_x
            outer_col_width += change_config.col_border_interval_x
        }

        change_data[key].forEach((col, ci) => {
            if (ci && group != col.group) { // 只有非首位且不同组才要加间隔
                margin_left += change_config.col_inner_interval
                outer_col_width += change_config.col_inner_interval
            }


            let col_height = height_ratio * col.output_row_num

            // 添加依赖列
            if (col.input_col && group != col.group) {
                col.input_col.forEach((dependent_col, dci) => {
                    if (dci === 0) {
                        dependent_col_x = margin_left
                    }
                    change_svg.append("rect")
                        .attr("id", 'col_t' + col.step + '_' + ci + '_' + dependent_col)
                        .attr("x", margin_left).attr("y", col_y)
                        .attr("width", change_config.col_width).attr("height", col_height)
                        .attr("fill", change_color.unchange)
                        .attr("stroke", 'black')
                        .attr("stroke-width", change_config.dot_width + 'px')
                        .attr("stroke-dasharray", change_config.dot_dasharray)

                    // 依赖列列名
                    change_svg.append("text").text(dependent_col)
                        .attr("font-size", change_config.content_font_size)
                        .attr("x", margin_left).attr("y", col_y - 1.5 * change_config.icon_margin_bottom)
                        .attr("transform", `translate(${change_config.col_width/2}, 0)`)
                        .attr("text-anchor", "middle")

                    margin_left += change_config.col_width
                    outer_col_width += change_config.col_width
                })
                margin_left += change_config.dot_width / 2
                outer_col_width += change_config.dot_width / 2
            }

            // 添加主体改变列
            change_svg.append("rect")
                .attr("id", 'col_t' + col.step + '_' + ci)
                .attr("x", margin_left).attr("y", col_y)
                .attr("width", change_config.col_width).attr("height", col_height)
                .attr("fill", change_color.unchange)

            // 为主体改变列着色，并添加文本
            fill_block.forEach(fill_ai => {
                if (fill_ai === 'nan') {
                    if (col.output_nan_posi && col.output_nan_posi.length === 2) fillColorText(change_svg, margin_left, col_y + col.output_nan_posi[0] * col_height, (col.output_nan_posi[1] - col.output_nan_posi[0]) * col_height, change_color[fill_ai])
                } else if (col[fill_ai]) {
                    col[fill_ai].forEach(block => { // block 表示一个颜色块
                        let block_y = col_y + block.posi[0] * col_height
                        fillColorText(change_svg, margin_left, block_y, (block.posi[1] - block.posi[0]) * col_height, change_color[fill_ai], block.case.output_case[0])
                        block.case.input_case.forEach((dependent_text, ci) => {
                            change_svg.append("text").text(dependent_text[0])
                                .attr("font-size", change_config.step_font_size)
                                .attr("x", dependent_col_x + ci * change_config.col_width).attr("y", block_y + 15)
                                .attr("transform", `translate(${change_config.col_width/2}, 0)`)
                                .attr("text-anchor", "middle")
                        })
                    })
                }
            })

            if (col.type === "sort") {
                let linear = d3.scaleLinear().domain([col.min_num, col.max_num]).range([0, 1])
                let compute = d3.interpolate(change_color.sort[0], change_color.sort[1])
                let ba_height = col_height / col.output_row_num
                let ba_color

                change_svg.selectAll('.changes_cg' + col.step).data(col.input_case).enter().append('rect')
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

                change_svg.selectAll('.changes_cg' + col.step).data(col.output_case).enter().append('rect')
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
            drawIcon(change_svg, col.transform_icon, margin_left, col_y - change_config.icon_size[1] - change_config.icon_margin_bottom)

            // 添加步骤序号
            change_svg.append("text").text(col.step)
                .attr("font-size", change_config.step_font_size)
                .attr("x", margin_left + change_config.col_width).attr("y", col_y - 1.5 * change_config.icon_margin_bottom)
                .attr("text-anchor", "end")

            group = col.group ? col.group : 0
            margin_left += change_config.col_width
            outer_col_width += change_config.col_width
        });

        if (change_data[key].length === 0) {
            margin_left += change_config.empty_col_width + change_config.col_outer_interval
            outer_col_width = change_config.empty_col_width
        } else {
            margin_left += change_config.col_border_interval_x + change_config.col_outer_interval
            outer_col_width += change_config.col_border_interval_x
        }

        change_svg.append("rect")
            .attr("id", 'col_' + key)
            .attr("x", outer_col_start_x).attr("y", outer_col_start_y)
            .attr("width", outer_col_width).attr("height", outer_col_height)
            .attr("fill", change_color.col_bg)
            .lower()

        change_svg.append("text").text(key)
            .attr("font-size", change_config.title_font_size)
            .attr("x", outer_col_start_x).attr("y", outer_col_start_y - 10)
            .attr("transform", `translate(${outer_col_width/2}, 0)`)
            .attr("text-anchor", "middle")
    }

}

function fillColorText(svg, x, y, height, color, text = undefined) {
    svg.append("rect")
        .attr("x", x).attr("y", y)
        .attr("width", change_config.col_width).attr("height", height)
        .attr("fill", color)

    if (text) {
        svg.append("text").text(text)
            .attr("font-size", change_config.step_font_size)
            .attr("x", x).attr("y", y + 15)
            .attr("transform", `translate(${change_config.col_width/2}, 0)`)
            .attr("text-anchor", "middle")
    }
    return { x, y, height }
}


export { handel_change }