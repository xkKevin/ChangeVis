const change_color = {
    'delete': '#fb9a99',
    'transform': '#a6cee3',
    'create': '#b2df8a',
    'unchange': '#e6e6e6',
    'nan': '#ffffff',
    'sort': ['#ffffff', '#1f78b4'], // [min, max]
    'line': "black"
}

const overview_config = {
    'col_width': 16,
    'tbl_height': 65,
    'node_interval': 60, // 节点之间的间隔
    'line_height': 12, // 线的半高
    'line_width': 2, // 线条的粗细
}

var data = {
    average_row: 30.67,
    source_column: 3,
    source_row: 36,
    pipeline_data: [{
            type: 'columns',
            column_num: 3,
            row_num: 36,
            change_type: 'transform',
            input_posi: [0],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [0],
            id: 1,
            pre: 0
        },
        {
            type: 'rows',
            column_num: 3,
            row_num: 36,
            change_type: 'delete',
            input_posi: [2, 6, 9, 14, 19, 28],
            output_delete_posi: [30, 31, 32, 33, 34, 35],
            output_create_posi: [],
            output_transform_posi: [],
            id: 2,
            pre: 1
        },
        {
            type: 'columns',
            column_num: 4,
            row_num: 30,
            change_type: 'create',
            input_posi: [1, 2],
            output_delete_posi: [],
            output_create_posi: [3],
            output_transform_posi: [],
            id: 3,
            pre: 2
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'create',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [4],
            output_transform_posi: [],
            id: 4,
            pre: 3
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [4],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 5,
            pre: 4
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [4],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 6,
            pre: 5
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [4],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 7,
            pre: 6
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [4],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 8,
            pre: 7
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [3],
            sort_type: 'desc',
            id: 9,
            pre: 8
        }
    ],
}

export { change_color, overview_config, data }