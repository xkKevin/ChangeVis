import { change_color, overview_config } from '@/assets/js/config'
import { handel_change } from "@/assets/js/change_panel"
import * as d3 from "d3"

const ELK = require('elkjs')

var select_rect = [] // 表示选中的矩形块
var select_code = { lines: [], changes: [] }
var overall_data
var skip_step = 0 // 跳过的初始步骤
var select_data = {}


var vm = null
const sendVue = (_that) => {
    vm = _that
}


/**
 * 
 * @param {*} data 
 * @param {*} group_flag : 是否合并，1 表示合并，0表示不合并
 */
async function handel_overview(data, group_flag = 0, proportion_flag = false) {
    select_rect = []
    skip_step = 0
    overall_data = data
    let { graph, height_ratio, end_step } = generateGraph(data, group_flag)
    await generatePos(graph)
    drawOverview(data.pipeline_data, graph, height_ratio, group_flag, proportion_flag)
    select_data = generate_select_data(0, end_step, group_flag)
    changeProportionView(group_flag, proportion_flag)
    vm.codeGlyphHighlight(Object.values(data.step2code).map(Number))
}

function changeProportionView(group_flag, proportion_flag) {
    handel_change(select_data, proportion_flag)
    add_event(group_flag, proportion_flag)
}

function add_event(group_flag, proportion_flag) {
    // 为整个body添加事件
    d3.select("body").on("keydown", (event) => {
        // console.log(event)
        if (event.keyCode === 27) { // escape
            d3.selectAll(".table").attr("click_flag", '0').classed("select", false)
            select_rect = []
            vm.codeLineHighlight([], [])
            d3.selectAll('div.glyph_margin').classed("myGlyphMarginClass", false)
        }
    })

    // 为Pipeline表格添加事件
    d3.selectAll(".table")
        .on("mouseover", function() {
            d3.select(this).classed("select", true)
        })
        .on("mouseout", function() {
            let tbl_this = d3.select(this)
            if (tbl_this.attr("click_flag") === '0') {
                tbl_this.classed("select", false)
            }
        })
        .on("mouseup", function() {
            let tbl_this = d3.select(this)
            let index = select_rect.indexOf(tbl_this.attr("step"))
            if (index != -1) { // 找到了就去掉
                tbl_this.attr("click_flag", '0').classed("select", false)
                select_rect.splice(index, 1) // 去掉 index 位置的元素
            } else { // 没找到就加上
                tbl_this.attr("click_flag", '1').classed("select", true)
                select_rect.push(tbl_this.attr("step"))
                select_rect.slice(0, -2).forEach(remove_select => {
                    d3.select("#tbl" + remove_select.split("_").pop()).attr("click_flag", '0').classed("select", false)
                })
                select_rect = select_rect.slice(-2)
            }
            if (select_rect.length === 2) {
                let select_steps = [...select_rect[0].split("_"), ...select_rect[1].split("_")].map(Number).sort()

                // let select_steps = [+select_rect[0].slice(3), +select_rect[1].slice(3)].sort()

                select_data = generate_select_data(select_steps[0], select_steps[select_steps.length - 1], group_flag)
                changeProportionView(group_flag, proportion_flag)
                vm.codeLineHighlight(select_code.lines, select_code.changes)
                d3.selectAll('div.glyph_margin').classed("myGlyphMarginClass", false)
            }
        })

    // d3.selectAll(".table").on("mouseleave", function() {
    //     d3.select(this).classed("select", false)
    // })

    // d3.selectAll(".table").on("mousehover", function() {
    //     // d3.select(this).attr("stroke", "red")
    //     // d3.select(this).attr("transform", "scale(1.1)")
    //     let tbl_this = d3.select(this)
    //     let x = +tbl_this.attr("x")
    //     let y = +tbl_this.attr("y")
    //     let width = +tbl_this.attr("width")
    //     let height = +tbl_this.attr("height")
    //     let center = {
    //         x: x + width / 2,
    //         y: y + height / 2
    //     }
    //     let tbl_shadow = {
    //         x: center.x - width * 0.6,
    //         y: center.y - height * 0.6,
    //         width: width * 1.2,
    //         height: height * 1.2
    //     }
    //     overview_svg.append('rect')
    //         .attr("id", "tbl_this")
    //         .attr("x", tbl_shadow.x).attr("y", tbl_shadow.y)
    //         .attr("width", tbl_shadow.width).attr("height", tbl_shadow.height)
    //         .attr("fill", "#666666").attr("opacity", 0.3)

    //     // .attr("stroke", "red").attr("stroke-width", 2)
    // });

    // d3.selectAll(".table").on("mouseleave", function() {
    //     // d3.select(this).attr("stroke", "none")
    //     // d3.select(this).attr("transform", "scale(0.9)")
    //     d3.select("#tbl_this").remove()
    // });

    // if (p_data.group != undefined) {
    //     // rect_tbl.attr("class", "og" + p_data.group)
    //     rect_tbl.classed("og" + p_data.group, true)
    // }

    // 为ChangeView中的 change_step 添加事件
    d3.selectAll(".change_step")
        .on("mouseover", function() {
            d3.select(this).classed("select", true)
        })
        .on("mouseout", function() {
            d3.select(this).classed("select", false)
        })
        .on("mouseup", function() {
            let steps = d3.select(this).attr("step").split("_").map(Number)
            let glyph_margins = d3.selectAll('div.glyph_margin').classed("myGlyphMarginClass", false).nodes()
            steps.forEach(si => {
                    let hightlight_n = Object.values(overall_data.step2code).indexOf(overall_data.step2code[si])
                    d3.select(glyph_margins[hightlight_n]).classed("myGlyphMarginClass", true)
                })
                // vm.codeGlyphHighlight(select_code.change_steps)
        })
}

function generate_select_data(start, end, group_flag) {
    let select_data = { change_data: {}, column_change_data: {} }
    let column_status_step = 0
    let columns = ['index'] // change view 中应该显示哪些列
    let timeline_point_data = {}
    let transform_list = []
    skip_step = start
    select_data.skip_step = start

    select_code = { lines: [], changes: [] }
    overall_data.pipeline_data.forEach(tbl => {
        if (tbl.step[0] >= start && tbl.step[0] <= end) {
            select_code.lines.push(overall_data.step2code[tbl.step[0]])
            select_code.changes.push(tbl.change_type)
        }
    })

    for (let key in overall_data.column_change_data) {
        key = +key
        if (key >= start && key <= end) {
            if (key === start || key === end || overall_data.column_change_data[key].type != 'unchange') {
                let tran_cols = Object.keys(overall_data.column_change_data[key].columns)
                columns = columns.concat(tran_cols.filter(c => !columns.includes(c))) // 取并集

                timeline_point_data.columns_list = tran_cols
                timeline_point_data.type = overall_data.column_change_data[key].type
                transform_list.push(overall_data.column_change_data[key].transform)
                timeline_point_data.transform_list = transform_list
                select_data.column_change_data[key] = timeline_point_data

                transform_list = []
                timeline_point_data = {}
            } else {
                transform_list.push(overall_data.column_change_data[key].transform)
            }
        }
    }
    let rows = []

    columns.forEach(key => {
        select_data.change_data[key] = []
        let trans_field = 'origin'
        if (group_flag && (overall_data.change_data[key].combine != undefined)) {
            trans_field = 'combine'
        }
        overall_data.change_data[key][trans_field].forEach(trans => {
            // let new_tran = Object.assign({}, trans) // 深拷贝对象
            if (trans.step >= start && trans.step <= end) {
                rows.push(trans.output_row_num)
                select_data.change_data[key].push(trans)
            }
        })
    })
    select_data.average_row = d3.mean(rows)
    select_data.max_row = d3.max(rows)

    console.log(select_data);
    return select_data
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


function generateGraph(data, group_flag) {
    // 计算行列高度
    const height_ratio = overview_config.col_height / data.average_row
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
        height: overview_config.col_height,
        height_real: data.source_row * height_ratio,
        index: -1,
        step: group_flag ? "0_0" : "0" // 绘制矩形时绑定id
    })

    let edge_id = 1
    let end_step = 1

    data.pipeline_data.forEach((element, index) => {
        if (group_flag && element.step.length === 1) return
        let node = {}
        if (element.step[group_flag] > end_step) end_step = element.step[group_flag]
        node.id = "tbl" + element.step[group_flag]
        node.width = element.column_num * overview_config.col_width
        node.height = overview_config.col_height
        node.height_real = element.row_num * height_ratio
        node.index = index // 额外保存 element 的index信息
        node.step = group_flag ? element.step.join("_") : element.step[0]
        graph.children.push(node)

        let edge = {}
        edge.id = "e" + edge_id++;
        edge.sources = ["tbl" + element.pre]
        edge.targets = [node.id]
        graph.edges.push(edge)

    });

    return { graph, height_ratio, end_step }
}


function drawOverview(pipeline_data, graph, height_ratio, group_flag, proportion_flag) {
    let overview_svg = d3.select("#overview_svg") // overview_svg  tb_changes
    overview_svg.selectChildren().remove()

    let line_flag = -1 // -1 表示上；1 表示下
    graph.children.forEach(tbl => {
        // console.log(tbl);
        let rect_tbl = overview_svg.append('rect')
            .attr("id", tbl.id)
            .attr("step", tbl.step)
            .attr("class", "table")
            .attr("x", tbl.x).attr("y", tbl.y).attr("width", tbl.width).attr("height", tbl.height_real)
            .attr("fill", change_color.unchange) //.attr("stroke", change_color.line)
            .attr("click_flag", "0")
            // .attr("pointer-events", "fill")
        let index = tbl.index
        if (index === -1) return
        let p_data = pipeline_data[index]


        let tbl_area = overview_svg.append('g').attr("class", "tbl_area")
        let tbl_line = overview_svg.append('g').attr("class", "tbl_line").lower()

        if (p_data.type === 'columns') { // 列
            // p_data.output_transform_posi.forEach((ci) => {
            //     let anchor_posi = +d3.select("#tbl" + p_data.pre).attr("x");
            // })
            p_data.output_transform_posi.forEach((ci) => {
                tbl_area.append('rect')
                    .attr("id", tbl.id + '_c' + ci)
                    .attr("x", tbl.x + ci * overview_config.col_width).attr("y", tbl.y).attr("width", overview_config.col_width).attr("height", tbl.height_real)
                    .attr("fill", change_color.transform)

                if (p_data.sort_type) {
                    let color_num = 50
                    let linear = d3.scaleLinear().domain([0, color_num]).range([0, 1])
                    let compute = p_data.sort_type === 'desc' ? d3.interpolate(change_color.sort[1], change_color.sort[0]) : d3.interpolate(change_color.sort[0], change_color.sort[1])

                    tbl_area.selectAll('.color_gloup').data(d3.range(color_num)).enter().append('rect')
                        .attr("x", tbl.x + ci * overview_config.col_width).attr("y", (d, i) => tbl.y + tbl.height_real * i / color_num)
                        .attr("width", overview_config.col_width).attr("height", tbl.height_real / color_num)
                        .attr("fill", (d, i) => compute(linear(d))).attr("stroke", (d, i) => compute(linear(d)))
                }
            })

            p_data.output_delete_posi.forEach((ci) => {
                tbl_area.append('rect')
                    .attr("id", tbl.id + '_c' + ci)
                    .attr("x", tbl.x + ci * overview_config.col_width).attr("y", tbl.y).attr("width", overview_config.col_width).attr("height", tbl.height_real)
                    .attr("fill", change_color.delete)
            })

            p_data.output_create_posi.forEach((ci) => {
                tbl_area.append('rect')
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

            let start_p = drawColumnLines(tbl_line, source_points, change_color[p_data.change_type], line_flag, overview_config.line_height + start_margin)
            let end_p = drawColumnLines(tbl_line, target_points, change_color[p_data.change_type], line_flag, overview_config.line_height + end_margin)
            drawColumnLines(tbl_line, [start_p, end_p], change_color[p_data.change_type], line_flag, overview_config.line_height)

            line_flag *= -1

        } else { // 行
            drawRows(tbl_area, tbl_line, p_data.output_delete_posi, change_color.delete, tbl, p_data, height_ratio)
            drawRows(tbl_area, tbl_line, p_data.output_transform_posi, change_color.transform, tbl, p_data, height_ratio)
            drawRows(tbl_area, tbl_line, p_data.output_create_posi, change_color.create, tbl, p_data, height_ratio)
        }
    })
}

/**
 * @description “半口型”连接一系列点
 * @param {*} svg 需要绘制在哪个对象上
 * @param {*} points 一个数组，每个元素包含一个坐标 eg: [{x:2, y:12}]
 * @param {*} color 绘制这条线的颜色
 * @param {*} line_flag 朝上画还是朝下画（-1 表示上；1 表示下）
 * @param {*} height 垂直方向的高度
 * @returns 返回水平方向的连接线的中点坐标
 */
function drawColumnLines(svg, points, color, line_flag, height) {
    points.forEach(point => {
        svg.append('line')
            // .attr("id", tbl.id + '_r' + change_num)
            .attr("x1", point.x).attr("y1", point.y).attr("x2", point.x).attr("y2", point.y + line_flag * height)
            .attr("stroke", color).attr("stroke-width", overview_config.line_width)
    })
    let end_point = points[points.length - 1]
    svg.append('line')
        // .attr("id", tbl.id + '_r' + change_num)
        .attr("x1", points[0].x).attr("y1", points[0].y + line_flag * height).attr("x2", end_point.x).attr("y2", end_point.y + line_flag * height)
        .attr("stroke", color).attr("stroke-width", overview_config.line_width)

    return { x: (points[0].x + end_point.x) / 2, y: (points[0].y + end_point.y) / 2 + line_flag * height }
}

/**
 * @description 绘制行结构以及连接线
 * @param {*} svg 需要绘制在哪个对象上
 * @param {*} output_posi_data output_delete/transform/create_posi
 * @param {*} color 绘制的矩形及线条的颜色
 * @param {*} tbl table节点的一些信息，如节点的坐上角坐标，高度等
 * @param {*} p_data 单个pipeline_data数据
 * @param {*} height_ratio table中实际高度与行数比
 */
function drawRows(svg, line_svg, output_posi_data, color, tbl, p_data, height_ratio) {
    if (output_posi_data.length > 0) {
        let change_num = output_posi_data.length
        let posi_y = tbl.y + (p_data.row_num - change_num) * height_ratio
        let rect_height = change_num * height_ratio
        svg.append('rect')
            .attr("id", tbl.id + '_r' + change_num)
            .attr("x", tbl.x).attr("y", posi_y).attr("width", tbl.width).attr("height", rect_height)
            .attr("fill", color)

        let posi_line_y = posi_y + rect_height / 2
        let pre_x = +d3.select("#tbl" + p_data.pre).attr("x");
        let pre_x_width = +d3.select("#tbl" + p_data.pre).attr("width");
        let posi_line_x = pre_x + pre_x_width
        line_svg.append('line')
            .attr("id", tbl.id + '_r' + change_num)
            .attr("x1", posi_line_x).attr("y1", posi_line_y).attr("x2", tbl.x).attr("y2", posi_line_y)
            .attr("stroke", color).attr("stroke-width", overview_config.line_width)
    }
}

export { handel_overview, sendVue, changeProportionView }