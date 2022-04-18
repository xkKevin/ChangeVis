import { change_color, overview_config, data } from '@/assets/js/config'
import * as d3 from "d3"

const ELK = require('elkjs')

async function testELK() {
    let { graph, height_ratio } = generateGraph(data)
    await generatePos(graph)
    console.log(graph);
    drawOverview(data.pipeline_data, graph, height_ratio)
}



function generatePos(graph) {
    return new Promise((resolve, reject) => {
        const elk = new ELK()
        elk.layout(graph) // elk 算法会把节点坐标添加到graph中，可以直接使用
            .then(result => {
                // console.log(result == graph);
                resolve()
            })
            .catch(err => {
                console.error(err)
                reject()
            })
    })
}


function generateGraph(data) {
    // 计算行列高度
    const height_ratio = overview_config.tbl_height / data.average_row
    let graph = {
        id: "root",
        layoutOptions: {
            "elk.padding": '[top = 50.0, left = 30.0, bottom = 0.0, right = 35.0]',
            'elk.algorithm': 'layered',
            "spacing.nodeNodeBetweenLayers": overview_config.node_interval,
        },
        children: [],
        edges: []
    }

    graph.children.push({
        id: "tbl0",
        width: data.source_column * overview_config.col_width,
        height: overview_config.tbl_height,
        height_real: data.source_row * height_ratio
    })

    let edge_id = 1

    data.pipeline_data.forEach(element => {
        let node = {}
        node.id = "tbl" + element.id
        node.width = element.column_num * overview_config.col_width
        node.height = overview_config.tbl_height
        node.height_real = element.row_num * height_ratio
        graph.children.push(node)

        let edge = {}
        edge.id = "e" + edge_id++;
        edge.sources = ["tbl" + element.pre]
        edge.targets = [node.id]
        graph.edges.push(edge)

    });

    return { graph, height_ratio }
}


function drawOverview(pipeline_data, graph, height_ratio) {
    let overview_svg = d3.select("#overview_svg")
    overview_svg.selectChildren().remove()
    let line_flag = -1 // -1 表示上；1 表示下
    graph.children.forEach((tbl, index) => {
        console.log(tbl);
        overview_svg.append('rect')
            .attr("id", tbl.id)
            .attr("x", tbl.x).attr("y", tbl.y).attr("width", tbl.width).attr("height", tbl.height_real)
            .attr("fill", change_color.unchange) //.attr("stroke", change_color.line)
        console.log(index);
        if (index === 0) return
        let p_data = pipeline_data[index - 1]
        if (p_data.type === 'columns') { // 列
            // p_data.output_transform_posi.forEach((ci) => {
            //     let anchor_posi = +d3.select("#tbl" + p_data.pre).attr("x");
            // })
            p_data.output_transform_posi.forEach((ci) => {
                overview_svg.append('rect')
                    .attr("id", tbl.id + '_c' + ci)
                    .attr("x", tbl.x + ci * overview_config.col_width).attr("y", tbl.y).attr("width", overview_config.col_width).attr("height", tbl.height_real)
                    .attr("fill", change_color.transform)

                if (p_data.sort_type) {
                    let color_num = 50
                    let linear = d3.scaleLinear().domain([0, color_num]).range([0, 1])
                    let compute = p_data.sort_type === 'desc' ? d3.interpolate(change_color.sort[1], change_color.sort[0]) : d3.interpolate(change_color.sort[0], change_color.sort[1])

                    overview_svg.selectAll('.color_gloup').data(d3.range(color_num)).enter().append('rect')
                        .attr("x", tbl.x + ci * overview_config.col_width).attr("y", (d, i) => tbl.y + tbl.height_real * i / color_num)
                        .attr("width", overview_config.col_width).attr("height", tbl.height_real / color_num)
                        .attr("fill", (d, i) => compute(linear(d))).attr("stroke", (d, i) => compute(linear(d)))
                }
            })

            p_data.output_delete_posi.forEach((ci) => {
                overview_svg.append('rect')
                    .attr("id", tbl.id + '_c' + ci)
                    .attr("x", tbl.x + ci * overview_config.col_width).attr("y", tbl.y).attr("width", overview_config.col_width).attr("height", tbl.height_real)
                    .attr("fill", change_color.delete)
            })

            p_data.output_create_posi.forEach((ci) => {
                overview_svg.append('rect')
                    .attr("id", tbl.id + '_c' + ci)
                    .attr("x", tbl.x + ci * overview_config.col_width).attr("y", tbl.y).attr("width", overview_config.col_width).attr("height", tbl.height_real)
                    .attr("fill", change_color.create)
            })

            let pre_x = +d3.select("#tbl" + p_data.pre).attr("x");
            let pre_y = +d3.select("#tbl" + p_data.pre).attr("y");

            let source_points = []
            p_data.input_posi.forEach(ci => {
                let point_y = pre_y
                if (line_flag === 1) {
                    point_y += (+d3.select("#tbl" + p_data.pre).attr("height"))
                }
                source_points.push({
                    x: pre_x + (ci + 0.5) * overview_config.col_width,
                    y: point_y
                })
            })

            let output_posi = p_data.output_delete_posi.concat(p_data.output_create_posi).concat(p_data.output_transform_posi).sort()
            let target_points = []
            output_posi.forEach(ci => {
                let point_y = tbl.y
                if (line_flag === 1) {
                    point_y += tbl.height_real
                }
                target_points.push({
                    x: tbl.x + (ci + 0.5) * overview_config.col_width,
                    y: point_y
                })
            })

            let height_margin = target_points[0].y - source_points[0].y
            let start_margin = 0
            let end_margin = 0
            if (line_flag === 1) { // 表示向下
                if (height_margin > 0) {
                    start_margin = Math.abs(height_margin)
                } else {
                    end_margin = Math.abs(height_margin)
                }
            } else { // 表示向上
                if (height_margin > 0) {
                    end_margin = Math.abs(height_margin)
                } else {
                    start_margin = Math.abs(height_margin)
                }
            }

            let start_p = drawColumnLines(source_points, change_color[p_data.change_type], line_flag, overview_config.line_height + start_margin)
            let end_p = drawColumnLines(target_points, change_color[p_data.change_type], line_flag, overview_config.line_height + end_margin)
            drawColumnLines([start_p, end_p], change_color[p_data.change_type], line_flag, overview_config.line_height)

            line_flag *= -1

        } else { // 行
            drawRows(p_data.output_delete_posi, change_color.delete, tbl, p_data)
            drawRows(p_data.output_transform_posi, change_color.transform, tbl, p_data)
            drawRows(p_data.output_create_posi, change_color.create, tbl, p_data)
        }
    })

    function drawColumnLines(points, color, line_flag, height) {
        // points 为一个数组，每个元素包含一个坐标
        points.forEach(point => {
            overview_svg.append('line')
                // .attr("id", tbl.id + '_r' + change_num)
                .attr("x1", point.x).attr("y1", point.y).attr("x2", point.x).attr("y2", point.y + line_flag * height)
                .attr("stroke", color).attr("stroke-width", overview_config.line_width)
        })
        let end_point = points[points.length - 1]
        overview_svg.append('line')
            // .attr("id", tbl.id + '_r' + change_num)
            .attr("x1", points[0].x).attr("y1", points[0].y + line_flag * height).attr("x2", end_point.x).attr("y2", end_point.y + line_flag * height)
            .attr("stroke", color).attr("stroke-width", overview_config.line_width)

        return { x: (points[0].x + end_point.x) / 2, y: (points[0].y + end_point.y) / 2 + line_flag * height }
    }

    function drawRows(output_posi_data, color, tbl, p_data) {
        if (output_posi_data.length > 0) {
            let change_num = output_posi_data.length
            let posi_y = tbl.y + (p_data.row_num - change_num) * height_ratio
            let rect_height = change_num * height_ratio
            overview_svg.append('rect')
                .attr("id", tbl.id + '_r' + change_num)
                .attr("x", tbl.x).attr("y", posi_y).attr("width", tbl.width).attr("height", rect_height)
                .attr("fill", color)

            let posi_line_y = posi_y + rect_height / 2
            let pre_x = +d3.select("#tbl" + p_data.pre).attr("x");
            let pre_x_width = +d3.select("#tbl" + p_data.pre).attr("width");
            let posi_line_x = pre_x + pre_x_width
            overview_svg.append('line')
                .attr("id", tbl.id + '_r' + change_num)
                .attr("x1", posi_line_x).attr("y1", posi_line_y).attr("x2", tbl.x).attr("y2", posi_line_y)
                .attr("stroke", color).attr("stroke-width", overview_config.line_width)
        }
    }
}


export { testELK }