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
    'col_width': 60,
    'col_height': 130,
    'col_inner_interval': 25, // 框内列间距
    'col_outer_interval': 20, // 框外列间距
    'col_border_interval_x': 15, // 指边框与左右两边的间隙
    'col_border_interval_y': 10, // 指边框与上下两边的间隙
    'icon_size': [40, 20], // icon 的宽高 // 只有高有效
    'icon_margin_bottom': 6,
    'margin_top': 60, // 大框距离顶端间隙
    'margin_left': 60, // 大框距离左端间隙
    'empty_col_width': 50
}

const data = {
    average_row: 30.67,
    max_row: 36,
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
            pre: 3,
            group: 1
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 5,
            pre: 4,
            group: 1
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 6,
            pre: 5,
            group: 1
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 7,
            pre: 6,
            group: 1
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 30,
            change_type: 'transform',
            input_posi: [3],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            id: 8,
            pre: 7,
            group: 1
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
    change_data: {
        index: [{
            type: 'change',
            // input_row_num: 36,
            output_row_num: 36,
            input_col: [],
            transform_icon: 'delete_rows_deduplicate',
            same: {
                posi: [
                    [0.167, 1]
                ],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            create: {
                posi: [],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            delete: {
                posi: [
                    [0, 0.167]
                ],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            transform: {
                posi: [],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            input_null_posi: [],
            output_null_posi: [],
            step: 2
        }],
        id: [{
            type: 'change',
            input_row_num: 36,
            output_row_num: 36,
            input_col: ['id'],
            transform_icon: 'transform_columns_extract',
            same: {
                posi: [],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            create: {
                posi: [],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            delete: {
                posi: [],
                case: {
                    input_case: [],
                    output_case: [],
                }
            },
            transform: {
                posi: [
                    [0, 1]
                ],
                case: {
                    input_case: [
                        ['01Bob']
                    ],
                    output_case: ['01'],
                }
            },
            input_null_posi: [],
            output_null_posi: [],
            step: 1
        }],
        math: [],
        art: [],
        total: [{
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['math', 'art'],
                transform_icon: 'create_columns_mutate',
                same: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                create: {
                    posi: [
                        [0, 1]
                    ],
                    case: {
                        input_case: [
                            ['87'],
                            ['79']
                        ],
                        output_case: ['166'],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                input_null_posi: [],
                output_null_posi: [],
                step: 3
            },
            {
                type: 'sort',
                output_row_num: 30,
                max_num: 232,
                min_num: 83,
                input_case: [166, 169, 154, 157, 149, 84, 155, 156, 122, 130, 232, 176, 155, 181, 162, 83, 148, 133, 144, 189, 107, 184, 170, 126, 185, 102, 154, 146, 143, 119],
                output_case: [232, 189, 185, 184, 181, 176, 170, 169, 166, 162, 157, 156, 155, 155, 154, 154, 149, 148, 146, 144, 143, 133, 130, 126, 122, 119, 107, 102, 84, 83],
                transform_icon: 'transform_tables_sort_desc',
                step: 9
            }
        ],
        rate: [{
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'create_columns_mutate',
                same: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                create: {
                    posi: [
                        [0, 0.167]
                    ],
                    case: {
                        input_case: [
                            ['84']
                        ],
                        output_case: ['F'],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                input_null_posi: [],
                output_null_posi: [
                    [0.167, 1]
                ],
                step: 4,
                group: 1
            },
            {
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'transform_columns_mutate',
                same: {
                    posi: [
                        [0, 0.167]
                    ],
                    case: {
                        input_case: [],
                        output_case: ['F'],
                    }
                },
                create: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [
                        [0.167, 0.3]
                    ],
                    case: {
                        input_case: [
                            ['122']
                        ],
                        output_case: ['D'],
                    }
                },
                input_null_posi: [],
                output_null_posi: [
                    [0.3, 1]
                ],
                step: 5,
                group: 1
            },
            {
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'transform_columns_mutate',
                same: {
                    posi: [
                        [0, 0.167],
                        [0.167, 0.3]
                    ],
                    case: {
                        input_case: [],
                        output_case: ['F', 'D'],
                    }
                },
                create: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [
                        [0.3, 0.667]
                    ],
                    case: {
                        input_case: [
                            ['154']
                        ],
                        output_case: ['C'],
                    }
                },
                input_null_posi: [],
                output_null_posi: [
                    [0.667, 1]
                ],
                step: 6,
                group: 1
            },
            {
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'transform_columns_mutate',
                same: {
                    posi: [
                        [0, 0.167],
                        [0.167, 0.3],
                        [0.3, 0.667]
                    ],
                    case: {
                        input_case: [],
                        output_case: ['F', 'D', 'C'],
                    }
                },
                create: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [
                        [0.667, 0.833]
                    ],
                    case: {
                        input_case: [
                            ['166']
                        ],
                        output_case: ['B'],
                    }
                },
                input_null_posi: [
                    []
                ],
                output_null_posi: [
                    [0.833, 1]
                ],
                step: 7,
                group: 1
            },
            {
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'transform_columns_mutate',
                same: {
                    posi: [
                        [0, 0.167],
                        [0.167, 0.3],
                        [0.3, 0.667],
                        [0.667, 0.833]
                    ],
                    case: {
                        input_case: [],
                        output_case: ['F', 'D', 'C', 'B'],
                    }
                },
                create: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                delete: {
                    posi: [],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                },
                transform: {
                    posi: [
                        [0.833, 1]
                    ],
                    case: {
                        input_case: [
                            ['181']
                        ],
                        output_case: ['A'],
                    }
                },
                input_null_posi: [],
                output_null_posi: [],
                step: 8,
                group: 1
            }
        ]
    },
}

export { change_color, overview_config, change_config, data }