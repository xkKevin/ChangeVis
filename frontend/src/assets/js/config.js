const change_color = {
    'delete': '#fb9a99',
    'transform': '#a6cee3',
    'create': '#b2df8a',
    'unchange': '#e6e6e6',
    'nan': '#ffffff',
    'sort': ['#d4fcff', '#1f78b4'], // [min, max]
    'line': "black",
    'col_bg': "#f5f4ff"
}

const overview_config = {
    'col_width': 16,
    'col_height': 65,
    'node_interval': 60, // 节点之间的间隔
    'line_height': 12, // 线的半高
    'line_width': 2, // 线条的粗细
}

const change_config = {
    'margin_top': 50, // 大框距离顶端间隙
    'margin_left': 25, // 大框距离左端间隙
    'col_width': 65,
    'col_height': 180,
    'col_inner_interval': 25, // 框内列间距
    'col_outer_interval': 25, // 框外列间距
    'col_border_interval_x': 15, // 指边框与左右两边的间隙
    'col_border_interval_y': 10, // 指边框与上下两边的间隙
    'icon_size': [40, 23], // icon 的宽高 // 只有高有效
    'icon_margin_bottom': 6,
    'empty_col_width': 50,
    'title_font_size': '20px',
    'content_font_size': '18px',
    'step_font_size': '16px',
    'dot_width': 1, // 虚线的宽度
    'dot_dasharray': "6 10", // 虚线与空白的长度
    'right_step_width': 20,
    'text_max_len': 6,
}

const timeline_config = {
    'margin_top': 60,
    'margin_left': 220,
    'col_width': 120,
    'knot_interval': 65,
    'radius': 16,
    'line_width': 10, // 时间轴的宽度
    'start_gap': 10, // 列名/icon 与 时间轴的间隔
    'icon_width': 36
}


export { change_color, overview_config, change_config, timeline_config }