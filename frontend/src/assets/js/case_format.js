const case1 = {
    average_row: 30.67,
    max_row: 36,
    source_column: 3,
    source_row: 36,
    group: [
        [1, 2],
        [4, 5, 6, 7]
    ],
    pipeline_data: [{
            type: 'columns',
            column_num: 3,
            row_num: 36,
            change_type: 'transform',
            input_posi: [0],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [0],
            step: 1,
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
            step: 2,
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
            step: 3,
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
            step: 4,
            pre: 3
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
            step: 5,
            pre: 4
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
            step: 6,
            pre: 5
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
            step: 7,
            pre: 6
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
            step: 8,
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
            step: 9,
            pre: 8
        }
    ],
    change_data: {
        index: [{
            type: 'change',
            output_row_num: 36,
            input_col: [],
            transform_icon: 'delete_rows_deduplicate',
            unchange: [{
                posi: [0, 0.8333],
                case: {
                    input_case: [],
                    output_case: [],
                }
            }],
            create: [],
            delete: [{
                posi: [0.8333, 1],
                case: {
                    input_case: [],
                    output_case: [],
                }
            }],
            transform: [],
            input_nan_posi: [],
            output_nan_posi: [],
            step: 2
        }],
        step: {
            origin: [{
                type: 'change',
                input_row_num: 36,
                output_row_num: 36,
                input_col: ['id'],
                transform_icon: 'transform_columns_extract',
                unchange: [],
                create: [],
                delete: [],
                transform: [{
                    posi: [0, 1],
                    case: {
                        input_case: [
                            ['01Bob']
                        ],
                        output_case: ['01'],
                    }
                }],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 1
            }]
        },
        math: [],
        art: [],
        total: [{
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['math', 'art'],
                transform_icon: 'create_columns_mutate',
                unchange: [],
                create: [{
                    posi: [0, 1],
                    case: {
                        input_case: [
                            ['87'],
                            ['79']
                        ],
                        output_case: ['166'],
                    }
                }],
                delete: [],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
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
                step: '9'
            }
        ],
        rate: {
            origin: [{
                    type: 'change',
                    input_row_num: 30,
                    output_row_num: 30,
                    input_col: ['total'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [{
                        posi: [0, 0.167],
                        case: {
                            input_case: [
                                ['84']
                            ],
                            output_case: ['F'],
                        }
                    }],
                    delete: [],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [0.167, 1],
                    step: 4
                },
                {
                    type: 'change',
                    input_row_num: 30,
                    output_row_num: 30,
                    input_col: ['total'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.167],
                        case: {
                            input_case: [],
                            output_case: ['F'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.167, 0.3],
                        case: {
                            input_case: [
                                ['122']
                            ],
                            output_case: ['D'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.3, 1],
                    step: 5
                },
                {
                    type: 'change',
                    input_row_num: 30,
                    output_row_num: 30,
                    input_col: ['total'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.167],
                        case: {
                            input_case: [],
                            output_case: ['F'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.3, 0.667],
                        case: {
                            input_case: [
                                ['154']
                            ],
                            output_case: ['C'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.667, 1],
                    step: 6
                },
                {
                    type: 'change',
                    input_row_num: 30,
                    output_row_num: 30,
                    input_col: ['total'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0.167, 0.3],
                        case: {
                            input_case: [],
                            output_case: ['D'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.667, 0.833],
                        case: {
                            input_case: [
                                ['166']
                            ],
                            output_case: ['B'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.833, 1],
                    step: 7
                },
                {
                    type: 'change',
                    input_row_num: 30,
                    output_row_num: 30,
                    input_col: ['total'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0.667, 0.833],
                        case: {
                            input_case: [],
                            output_case: ['B'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.833, 1],
                        case: {
                            input_case: [
                                ['181']
                            ],
                            output_case: ['A'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 8
                }
            ],
            combine: [{
                type: 'change',
                input_row_num: 30,
                output_row_num: 30,
                input_col: ['total'],
                transform_icon: 'create_columns_mutate',
                unchange: [],
                create: [{
                    posi: [0, 0.167],
                    case: {
                        input_case: [
                            ['84']
                        ],
                        output_case: ['F'],
                    },
                    step: '5'
                }],
                delete: [],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [0.167, 1],
            }]
        }
    },
    column_change_data: {
        0: {
            columns_list: ['id', 'math', 'art']
        },
        3: {
            type: 'create',
            transform_list: ['transform_columns_extract', 'delete_rows_deduplicate', 'create_columns_mutate'],
            step_list: [1, 3],
            columns_list: ['id', 'math', 'art', 'total']
        },
        4: {
            type: 'create',
            transform_list: ['create_columns_mutate'],
            step_list: [3, 4],
            columns_list: ['id', 'math', 'art', 'total', 'rate']
        },
        9: {
            type: 'unchange',
            transform_list: ['transform_columns_mutate', 'transform_columns_mutate', 'transform_columns_mutate', 'transform_columns_mutate', 'transform_tables_sort_desc'],
            step_list: [4, 9],
            columns_list: ['id', 'math', 'art', 'total', 'rate']
        }
    },
    column_change_data: {
        0: {
            columns_list: ['id', 'math', 'art'],
            change: false
        },
        1: {
            type: 'unchange',
            columns: {
                'id': {
                    type: 'str' | 'num' | 'time'
                    max: 12,
                    min: 36
                }
            }
            transform_list: 'transform_columns_extract',
            change: false
        },
        2: {
            type: 'unchange',
            columns_list: ['id', 'math', 'art'],
            transform_list: 'transform_columns_extract',
            change: false
        },
        3: {
            type: 'create',
            transform_list: 'transform_columns_extract',
            columns_list: ['id', 'math', 'art', 'total'],
            change: true
        },
        4: {
            type: 'create',
            transform_list: ['create_columns_mutate'],
            columns_list: ['id', 'math', 'art', 'total', 'rate']
        },
        9: {
            type: 'unchange',
            transform_list: ['transform_columns_mutate', 'transform_columns_mutate', 'transform_columns_mutate', 'transform_columns_mutate', 'transform_tables_sort_desc'],
            columns_list: ['id', 'math', 'art', 'total', 'rate']
        }
    }
}


export { data }