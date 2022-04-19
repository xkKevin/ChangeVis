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
    for (let key in change_data) {

        let outer_col_start_x = margin_left
        let outer_col_start_y = change_config.margin_top
        let outer_col_width = 0

        let group = 0
        let col_y = outer_col_start_y + change_config.col_border_interval_y + change_config.icon_size[1] + change_config.icon_margin_bottom

        if (change_data[key].length > 0) {
            margin_left += change_config.col_border_interval_x
            outer_col_width += change_config.col_border_interval_x
        }

        change_data[key].forEach((col, ci) => {
            if (ci && group != col.group) { // 只有不同组才会有间隔
                margin_left += change_config.col_inner_interval
                outer_col_width += change_config.col_inner_interval
            }

            let col_height = height_ratio * col.output_row_num
            change_svg.append("rect")
                .attr("id", 'col_t' + col.step + '_' + ci)
                .attr("x", margin_left).attr("y", col_y)
                .attr("width", change_config.col_width).attr("height", col_height)
                .attr("fill", change_color.unchange)

            drawIcon(change_svg, col.transform_icon, margin_left, col_y - change_config.icon_size[1] - change_config.icon_margin_bottom)

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
            .attr("font-size", '20px')
            .attr("x", outer_col_start_x).attr("y", outer_col_start_y - 10)
            .attr("transform", `translate(${outer_col_width/2}, 0)`)
            .attr("text-anchor", "middle")
    }

}


export { handel_change }