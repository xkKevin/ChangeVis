const case3 = {
    average_row: 30.67,
    max_row: 36,
    source_column: 3,
    source_row: 36,
    step2code: {
        1: [4],
        2: [5],
        3: [6],
        4: [7],
        5: [8],
        6: [9],
        7: [10],
        8: [11],
        9: [12],
    },
    pipeline_data: [{
            type: 'columns',
            column_num: 3,
            row_num: 36,
            change_type: 'transform',
            input_posi: [0],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [0],
            step: [1, 1],
            pre: 0,
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
            step: [2, 2],
            pre: 1,
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
            step: [3, 3],
            pre: 2,
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
            step: [4, 8],
            pre: 3,
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
            step: [5],
            pre: 4,
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
            step: [6],
            pre: 5,
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
            step: [7],
            pre: 6,
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
            step: [8],
            pre: 7,
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
            step: [9, 9],
            pre: 8,
        }
    ],
    change_data: {
        index: {
            origin: [{
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
            }]
        },
        id: {
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
                            ['01-Bob', '02-Lily', '02-Lily', '03-Ivy', '04-Alan', '05-John', '05-John', '06-Tom', '07-Iris', '07-Iris', '08-David', '09-Tony', '10-Eric', '11-Jim', '11-Jim', '12-Ken', '13-Judy', '14-Mandy', '15-Tina', '15-Tina', '16-Sara', '17-Diana', '18-Amy', '19-Kelly', '20-Leo', '21-Mark', '22-Nick', '23-William', '21-Mark', '24-Gary', '25-Peter', '26-Marlon', '27-Evan', '28-Hardy', '29-Betty', '30-Polly']
                        ],
                        output_case: ['16', '30', '21', '21', '18', '24', '10', '26', '09', '17', '19', '13', '06', '02', '02', '27', '01', '03', '05', '05', '07', '07', '25', '29', '22', '15', '15', '28', '08', '12', '23', '04', '11', '11', '20', '14'],
                    }
                }],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 1
            }]
        },
        math: { origin: [] },
        art: { origin: [] },
        total: {
            origin: [{
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
                                [87, 92, 74, 64, 68, 9, 71, 65, 57, 85, 82, 84, 81, 67, 72, 75, 82, 89, 77, 89, 67, 96, 78, 81, 99, 55, 76, 56, 56, 95],
                                [79, 77, 80, 93, 81, 75, 84, 91, 65, 45, 99, 92, 74, 165, 90, 8, 66, 44, 67, 100, 40, 88, 92, 45, 86, 47, 78, 90, 87, 24]
                            ],
                            output_case: [166, 169, 154, 157, 149, 84, 155, 156, 122, 130, 181, 176, 155, 232, 162, 83, 148, 133, 144, 189, 107, 184, 170, 126, 185, 102, 154, 146, 143, 119],
                        }
                    }],
                    delete: [],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 3,
                    total_case: [
                        [],
                        []
                    ]
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
            ]
        },
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
                                [84, 83, 107, 102, 119]
                            ],
                            output_case: ['F', 'F', 'F', 'F', 'F'],
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
                            input_case: [84, 83, 107, 102, 119],
                            output_case: ['F', 'F', 'F', 'F', 'F'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.167, 0.3],
                        case: {
                            input_case: [
                                [122, 130, 133, 126]
                            ],
                            output_case: ['D', 'D', 'D', 'D'],
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
                        posi: [0.167, 0.3],
                        case: {
                            input_case: [122, 130, 133, 126],
                            output_case: ['D', 'D', 'D', 'D'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.3, 0.667],
                        case: {
                            input_case: [
                                [154, 157, 149, 155, 156, 155, 148, 144, 154, 146, 143]
                            ],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
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
                        posi: [0.3, 0.667],
                        case: {
                            input_case: [154, 157, 149, 155, 156, 155, 148, 144, 154, 146, 143],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.667, 0.833],
                        case: {
                            input_case: [
                                [166, 169, 176, 162, 170]
                            ],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
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
                            input_case: [166, 169, 176, 162, 170],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.833, 1],
                        case: {
                            input_case: [
                                [181, 232, 189, 184, 185]
                            ],
                            output_case: ['A', 'A', 'A', 'A', 'A'],
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
                            [84, 83, 107, 102, 119]
                        ],
                        output_case: ['F', 'F', 'F', 'F', 'F'],
                    },
                    step: 4
                }],
                delete: [],
                transform: [{
                        posi: [0.167, 0.3],
                        case: {
                            input_case: [
                                [122, 130, 133, 126]
                            ],
                            output_case: ['D', 'D', 'D', 'D'],
                        },
                        step: 5
                    },
                    {
                        posi: [0.3, 0.667],
                        case: {
                            input_case: [
                                [154, 157, 149, 155, 156, 155, 148, 144, 154, 146, 143]
                            ],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                        },
                        step: 6
                    },
                    {
                        posi: [0.667, 0.833],
                        case: {
                            input_case: [
                                [166, 169, 176, 162, 170]
                            ],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
                        },
                        step: 7
                    },
                    {
                        posi: [0.833, 1],
                        case: {
                            input_case: [
                                [181, 232, 189, 184, 185]
                            ],
                            output_case: ['A', 'A', 'A', 'A', 'A'],
                        },
                        step: 8
                    },
                ],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 4
            }]
        }
    },
    column_change_data: {
        0: {
            table_path: 'data/case3/L3 (studentScore).csv',
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
            }
        },
        1: {
            type: 'unchange',
            transform: 'transform_columns_extract',
            table_path: 'data/case3/L4 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
            }
        },
        2: {
            type: 'unchange',
            transform: 'delete_rows_deduplicate',
            table_path: 'data/case3/L5 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
            }
        },
        3: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case3/L6 (studentScore).csv',
            change: true,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
            }
        },
        4: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case3/L7 (studentScore).csv',
            change: true,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        },
        5: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case3/L8 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str',
                    data: []
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        },
        6: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case3/L9 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        },
        7: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case3/L10 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        },
        8: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case3/L11 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        },
        9: {
            type: 'unchange',
            transform: 'transform_tables_sort_desc',
            table_path: 'data/case3/L12 (studentScore).csv',
            change: false,
            columns: {
                'id': {
                    type: 'str'
                },
                'math': {
                    type: 'num'
                },
                'art': {
                    type: 'num'
                },
                'total': {
                    type: 'num'
                },
                'rate': {
                    type: 'str'
                }
            }
        }
    }
}

const case1 = {
    average_row: 25.1875,
    max_row: 31,
    source_column: 4,
    source_row: 31,
    step2code: {
        1: [17],
        2: [18],
        3: [5, 19],
        4: [5, 19],
        5: [5, 19],
        6: [20],
        7: [21],
        8: [22],
        9: [10, 23],
        10: [12, 23],
        11: [12, 23],
        12: [12, 23],
        13: [13, 23],
        14: [24],
        15: [25],
        16: [26],
    },
    pipeline_data: [{
            type: 'rows',
            column_num: 4,
            row_num: 31,
            change_type: 'delete',
            input_posi: [5, 22, 25],
            output_delete_posi: [27, 28, 29],
            output_create_posi: [],
            output_transform_posi: [],
            step: [1, 1],
            pre: 0
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 28,
            change_type: 'create',
            input_posi: [0],
            output_delete_posi: [],
            output_create_posi: [4],
            output_transform_posi: [],
            step: [2, 2],
            pre: 1
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 28,
            change_type: 'transform',
            input_posi: [1],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [1],
            step: [3, 5],
            pre: 2
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 28,
            change_type: 'transform',
            input_posi: [1],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [1],
            step: [4],
            pre: 3
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 28,
            change_type: 'transform',
            input_posi: [1],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [1],
            step: [5],
            pre: 4
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 28,
            change_type: 'transform',
            input_posi: [1, 4],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [4],
            step: [6, 6],
            pre: 5
        },
        {
            type: 'rows',
            column_num: 5,
            row_num: 28,
            change_type: 'delete',
            input_posi: [6, 10, 11, 16, 23],
            output_delete_posi: [22, 23, 24, 25, 26],
            output_create_posi: [],
            output_transform_posi: [],
            step: [7, 7],
            pre: 6
        },
        {
            type: 'columns',
            column_num: 6,
            row_num: 23,
            change_type: 'create',
            input_posi: [3, 4],
            output_delete_posi: [],
            output_create_posi: [5],
            output_transform_posi: [],
            step: [8, 8],
            pre: 7
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'create',
            input_posi: [5],
            output_delete_posi: [],
            output_create_posi: [6],
            output_transform_posi: [],
            step: [9, 13],
            pre: 8
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'transform',
            input_posi: [5],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [6],
            step: [10],
            pre: 9
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'transform',
            input_posi: [5],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [6],
            step: [11],
            pre: 10
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'transform',
            input_posi: [5],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [6],
            step: [12],
            pre: 11
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'transform',
            input_posi: [5],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [6],
            step: [13],
            pre: 12
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 23,
            change_type: 'delete',
            input_posi: [0, 1],
            output_delete_posi: [0, 1],
            output_create_posi: [],
            output_transform_posi: [],
            step: [14, 14],
            pre: 13
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 23,
            change_type: 'transform',
            input_posi: [4, 5, 6],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [0, 1, 2],
            step: [15, 15],
            pre: 14
        },
        {
            type: 'columns',
            column_num: 5,
            row_num: 23,
            change_type: 'transform',
            input_posi: [2],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [2],
            sort_type: 'desc',
            step: [16, 16],
            pre: 15
        }
    ],
    change_data: {
        index: {
            origin: []
        },
        Info: {
            origin: [{
                type: 'change',
                input_row_num: 23,
                output_row_num: 23,
                input_col: [],
                transform_icon: 'delete_columns_select_remove',
                unchange: [],
                create: [],
                delete: [{
                    posi: [0, 1],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                }],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 14
            }]
        },
        Department: {
            origin: [{
                    type: 'change',
                    input_row_num: 28,
                    output_row_num: 28,
                    input_col: ['Department'],
                    transform_icon: 'transform_columns_replace',
                    unchange: [{
                        posi: [0.464, 1],
                        case: {
                            input_case: [
                                ['Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department']
                            ],
                            output_case: ['Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.464],
                        case: {
                            input_case: [
                                ['Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department']
                            ],
                            output_case: ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 3
                },
                {
                    type: 'change',
                    input_row_num: 28,
                    output_row_num: 28,
                    input_col: ['Department'],
                    transform_icon: 'transform_columns_replace',
                    unchange: [{
                        posi: [0.25, 1],
                        case: {
                            input_case: [
                                ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department']
                            ],
                            output_case: ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.25],
                        case: {
                            input_case: [
                                ['Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department']
                            ],
                            output_case: ['MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 4
                },
                {
                    type: 'change',
                    input_row_num: 28,
                    output_row_num: 28,
                    input_col: ['Department'],
                    transform_icon: 'transform_columns_replace',
                    unchange: [{
                        posi: [0.286, 1],
                        case: {
                            input_case: [
                                ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD']
                            ],
                            output_case: ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.286],
                        case: {
                            input_case: [
                                ['Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department']
                            ],
                            output_case: ['SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 5
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: [],
                    transform_icon: 'delete_columns_select_remove',
                    unchange: [],
                    create: [],
                    delete: [{
                        posi: [0, 1],
                        case: {
                            input_case: [],
                            output_case: [],
                        }
                    }],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 14
                },
            ],
            combine: [{
                    type: 'change',
                    input_row_num: 28,
                    output_row_num: 28,
                    input_col: ['total'],
                    transform_icon: 'transform_columns_replace',
                    unchange: [],
                    create: [],
                    delete: [],
                    transform: [{
                            posi: [0, 0.464],
                            case: {
                                input_case: [
                                    ['Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department', 'Technical Department']
                                ],
                                output_case: ['TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD', 'TD'],
                            },
                            step: 3
                        },
                        {
                            posi: [0.464, 0.714],
                            case: {
                                input_case: [
                                    ['Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department', 'Manage Department']
                                ],
                                output_case: ['MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD'],
                            },
                            step: 4
                        },
                        {
                            posi: [0.714, 1],
                            case: {
                                input_case: [
                                    ['Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department', 'Sales Department']
                                ],
                                output_case: ['SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD'],
                            },
                            step: 5
                        }
                    ],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 3
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: [],
                    transform_icon: 'delete_columns_select_remove',
                    unchange: [],
                    create: [],
                    delete: [{
                        posi: [0, 1],
                        case: {
                            input_case: [],
                            output_case: [],
                        }
                    }],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 14
                },
            ]
        },
        Attendance: {
            origin: [{
                    type: 'change',
                    output_row_num: 31,
                    input_col: [],
                    transform_icon: 'delete_rows_filter',
                    unchange: [{
                        posi: [0, 0.9],
                        case: {
                            input_case: [],
                            output_case: [27, 25, 24, 26, 22, 23, 14, 24, 23, 22, 15, 13, 24, 22, 22, 22, 19, 26, 22, 23, 23, 29, 26, 14, 27, 22, 25, 28],
                        }
                    }],
                    create: [],
                    delete: [{
                        posi: [0.9, 1],
                        case: {
                            input_case: [],
                            output_case: [32, 35, 31],
                        }
                    }],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 1
                },
                {
                    type: 'change',
                    output_row_num: 28,
                    input_col: [],
                    transform_icon: 'delete_rows_filter',
                    unchange: [{
                        posi: [0, 0.821],
                        case: {
                            input_case: [],
                            output_case: [27, 25, 24, 26, 22, 23, 24, 23, 22, 24, 22, 22, 22, 26, 22, 23, 23, 29, 26, 27, 22, 25, 28],
                        }
                    }],
                    create: [],
                    delete: [{
                        posi: [0.821, 1],
                        case: {
                            input_case: [],
                            output_case: [14, 15, 13, 19, 14],
                        }
                    }],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 7
                }
            ],
            combine: [{
                type: 'change',
                output_row_num: 31,
                input_col: [],
                transform_icon: 'transform_columns_replace',
                unchange: [],
                create: [],
                delete: [{
                        posi: [0.721, 0.821],
                        case: {
                            input_case: [],
                            output_case: [32, 35, 31],
                        },
                        step: 1
                    },
                    {
                        posi: [0.821, 1],
                        case: {
                            input_case: [],
                            output_case: [14, 15, 13, 19, 14],
                        },
                        step: 7
                    }
                ],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 1

            }]
        },
        Performance: {
            origin: []
        },
        Staff: {
            origin: [{
                type: 'change',
                input_row_num: 31,
                output_row_num: 31,
                input_col: ['Info'],
                transform_icon: 'create_columns_extract',
                unchange: [],
                create: [{
                    posi: [0, 1],
                    case: {
                        input_case: [
                            ['01-Bob', '02-Lily', '03-Ivy', '04-Alan', '05-John', '07-Iris', '08-David', '09-Tony', '10-Eric', '11-Jim', '12-Ken', '13-Judy', '14-Mandy', '01-Tina', '02-Sara', '03-Diana', '04-Amy', '05-Kelly', '06-Leo', '07-Tom', '01-Mark', '03-William', '04-Gary', '06-Marlon', '07-Evan', '08-Hardy', '09-Betty', '10-Polly']
                        ],
                        output_case: ['Bob', 'Lily', 'Ivy', 'Alan', 'John', 'Iris', 'David', 'Tony', 'Eric', 'Jim', 'Ken', 'Judy', 'Mandy', 'Tina', 'Sara', 'Diana', 'Amy', 'Kelly', 'Leo', 'Tom', 'Mark', 'William', 'Gary', 'Marlon', 'Evan', 'Hardy', 'Betty', 'Polly'],
                    }
                }],
                delete: [],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 2
            }]
        },
        Achievements: {
            origin: [{
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Performance', 'Attendance'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 1],
                        case: {
                            input_case: [
                                [24, 23, 15, 24, 19, 22, 21, 23, 21, 25, 27, 28, 24, 26, 24, 22, 18, 20, 23, 21, 18, 21, 22],
                                [27, 25, 24, 26, 22, 23, 24, 23, 22, 24, 22, 22, 22, 26, 22, 23, 23, 29, 26, 27, 22, 25, 28]
                            ],
                            output_case: [88.89, 92.0, 62.5, 92.31, 86.36, 95.65, 87.5, 100.0, 95.45, 104.17, 122.73, 127.27, 109.09, 100.0, 109.09, 95.65, 78.26, 68.97, 88.46, 77.78, 81.82, 84.0, 78.57],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 8
                },
                {
                    type: 'sort',
                    output_row_num: 23,
                    max_num: 127.27,
                    min_num: 62.5,
                    input_case: [88.89, 92.0, 62.5, 92.31, 86.36, 95.65, 87.5, 100.0, 95.45, 104.17, 122.73, 127.27, 109.09, 100.0, 109.09, 95.65, 78.26, 68.97, 88.46, 77.78, 81.82, 84.0, 78.57],
                    output_case: [127.27, 122.73, 109.09, 109.09, 104.17, 100.0, 100.0, 95.65, 95.65, 95.45, 92.31, 92.0, 88.89, 88.46, 87.5, 86.36, 84.0, 81.82, 78.57, 78.26, 77.78, 68.97, 62.5],
                    transform_icon: 'transform_tables_sort_desc',
                    step: 16
                }
            ]
        },
        Perf_rate: {
            origin: [{
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Achievements'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [{
                        posi: [0, 0.087],
                        case: {
                            input_case: [
                                [62.5, 68.97]
                            ],
                            output_case: ['F', 'F'],
                        }
                    }],
                    delete: [],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [0.087, 1],
                    step: 9
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Achievements'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.087],
                        case: {
                            input_case: [62.5, 68.97],
                            output_case: ['F', 'F'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.087, 0.217],
                        case: {
                            input_case: [
                                [78.26, 77.78, 78.57]
                            ],
                            output_case: ['D', 'D', 'D'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.217, 1],
                    step: 10
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Achievements'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.217],
                        case: {
                            input_case: [78.26, 77.78, 78.57],
                            output_case: ['D', 'D', 'D'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.217, 0.696],
                        case: {
                            input_case: [
                                [88.89, 92.0, 92.31, 86.36, 95.65, 87.5, 95.45, 95.65, 88.46, 81.82, 84.0]
                            ],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.696, 1],
                    step: 11
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Achievements'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.696],
                        case: {
                            input_case: [88.89, 92.0, 92.31, 86.36, 95.65, 87.5, 95.45, 95.65, 88.46, 81.82, 84.0],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.696, 0.913],
                        case: {
                            input_case: [
                                [100.0, 104.17, 109.09, 100.0, 109.09]
                            ],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [0.913, 1],
                    step: 12
                },
                {
                    type: 'change',
                    input_row_num: 23,
                    output_row_num: 23,
                    input_col: ['Achievements'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.913],
                        case: {
                            input_case: [100.0, 104.17, 109.09, 100.0, 109.09],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0.913, 1],
                        case: {
                            input_case: [
                                [122.73, 127.27]
                            ],
                            output_case: ['A', 'A'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 13
                }
            ],
            combine: [{
                type: 'change',
                input_row_num: 23,
                output_row_num: 23,
                input_col: ['Achievements'],
                transform_icon: 'create_columns_mutate',
                unchange: [],
                create: [{
                    posi: [0, 0.087],
                    case: {
                        input_case: [
                            [62.5, 68.97]
                        ],
                        output_case: ['F', 'F'],
                    },
                    step: 9
                }],
                delete: [],
                transform: [{
                        posi: [0.087, 0.217],
                        case: {
                            input_case: [
                                [78.26, 77.78, 78.57]
                            ],
                            output_case: ['D', 'D', 'D'],
                        },
                        step: 10
                    },
                    {
                        posi: [0.217, 0.696],
                        case: {
                            input_case: [
                                [88.89, 92.0, 92.31, 86.36, 95.65, 87.5, 95.45, 95.65, 88.46, 81.82, 84.0]
                            ],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                        },
                        step: 11
                    },
                    {
                        posi: [0.696, 0.913],
                        case: {
                            input_case: [
                                [100.0, 104.17, 109.09, 100.0, 109.09]
                            ],
                            output_case: ['B', 'B', 'B', 'B', 'B'],
                        },
                        step: 12
                    },
                    {
                        posi: [0.913, 1],
                        case: {
                            input_case: [
                                [122.73, 127.27]
                            ],
                            output_case: ['A', 'A'],
                        },
                        step: 13
                    },
                ],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 9
            }]
        }
    },
    column_change_data: {
        0: {
            table_path: 'data/case1/L3 (staff).csv',
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                }
            }
        },
        1: {
            type: 'unchange',
            transform: 'delete_rows_filter',
            table_path: 'data/case1/L4 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                }
            }
        },
        2: {
            type: 'create',
            transform: 'create_columns_extract',
            table_path: 'data/case1/L5 (staff).csv',
            change: true,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        3: {
            type: 'unchange',
            transform: 'transform_columns_replace',
            table_path: 'data/case1/L6 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        4: {
            type: 'unchange',
            transform: 'transform_columns_replace',
            table_path: 'data/case1/L7 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        5: {
            type: 'unchange',
            transform: 'transform_columns_replace',
            table_path: 'data/case1/L8 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        6: {
            type: 'unchange',
            transform: 'transform_columns_merge',
            table_path: 'data/case1/L9 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        7: {
            type: 'unchange',
            transform: 'delete_rows_filter',
            table_path: 'data/case1/L10 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                }
            }
        },
        8: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case1/L11 (staff).csv',
            change: true,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                }
            }
        },
        9: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case1/L12 (staff).csv',
            change: true,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        10: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case1/L13 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        11: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case1/L14 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        12: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case1/L15 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        13: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case1/L16 (staff).csv',
            change: false,
            columns: {
                'Info': {
                    type: 'str'
                },
                'Department': {
                    type: 'str'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        14: {
            type: 'delete',
            transform: 'delete_columns_select_remove',
            table_path: 'data/case1/L17 (staff).csv',
            change: true,
            columns: {
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                },
                'Staff': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Perf_rate': {
                    type: 'str'
                }
            }
        },
        15: {
            type: 'transform',
            transform: 'transform_columns_rearrange',
            table_path: 'data/case1/L18 (staff).csv',
            change: true,
            columns: {
                'Staff': {
                    type: 'str'
                },
                'Perf_rate': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                }

            }
        },
        16: {
            type: 'unchange',
            transform: 'transform_tables_sort_desc',
            table_path: 'data/case1/L19 (staff).csv',
            change: false,
            columns: {
                'Staff': {
                    type: 'str'
                },
                'Perf_rate': {
                    type: 'str'
                },
                'Achievements': {
                    type: 'num'
                },
                'Attendance': {
                    type: 'num'
                },
                'Performance': {
                    type: 'num'
                }
            }
        }
    }
}

const case2 = {
    average_row: 29.77,
    max_row: 36,
    source_column: 6,
    source_row: 36,
    step2code: {
        1: [5],
        2: [6],
        3: [7],
        4: [8],
        5: [9],
        6: [10],
        7: [11],
        8: [12],
        9: [13],
        10: [14],
        11: [15],
        12: [16],
    },
    pipeline_data: [{
            type: 'columns',
            column_num: 6,
            row_num: 36,
            change_type: 'transform',
            input_posi: [1],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [1],
            step: [1, 1],
            pre: 0
        },
        {
            type: 'rows',
            column_num: 6,
            row_num: 31,
            change_type: 'delete',
            input_posi: [31, 32, 33, 34, 35],
            output_delete_posi: [31, 32, 33, 34, 35],
            output_create_posi: [],
            output_transform_posi: [],
            step: [2, 2],
            pre: 1
        },
        {
            type: 'columns',
            column_num: 6,
            row_num: 31,
            change_type: 'delete',
            input_posi: [0, 1],
            output_delete_posi: [0],
            output_create_posi: [],
            output_transform_posi: [1],
            step: [3, 3],
            pre: 2
        },
        {
            type: 'columns',
            column_num: 6,
            row_num: 31,
            change_type: 'create',
            input_posi: [1],
            output_delete_posi: [],
            output_create_posi: [2],
            output_transform_posi: [],
            step: [4, 4],
            pre: 3
        },
        {
            type: 'columns',
            column_num: 7,
            row_num: 31,
            change_type: 'create',
            input_posi: [4, 5],
            output_delete_posi: [],
            output_create_posi: [6],
            output_transform_posi: [],
            step: [5, 5],
            pre: 4
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'create',
            input_posi: [6],
            output_delete_posi: [],
            output_create_posi: [7],
            output_transform_posi: [],
            step: [6, 9],
            pre: 5
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'transform',
            input_posi: [7],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [7],
            step: [7],
            pre: 6
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'transform',
            input_posi: [7],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [7],
            step: [8],
            pre: 7
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'transform',
            input_posi: [7],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [7],
            step: [9],
            pre: 8
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'transform',
            input_posi: [6],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [6],
            sort_type: 'asc',
            step: [10, 10],
            pre: 9
        },
        {
            type: 'columns',
            column_num: 8,
            row_num: 31,
            change_type: 'transform',
            input_posi: [6, 7],
            output_delete_posi: [],
            output_create_posi: [],
            output_transform_posi: [1, 2],
            step: [11, 11],
            pre: 10
        },
        {
            type: 'rows',
            column_num: 8,
            row_num: 31,
            change_type: 'delete',
            input_posi: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            output_delete_posi: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            output_create_posi: [],
            output_transform_posi: [],
            step: [12, 12],
            pre: 11
        }
    ],
    change_data: {
        index: {
            origin: [{
                type: 'change',
                input_row_num: 31,
                output_row_num: 31,
                input_col: [],
                transform_icon: 'delete_rows_slice_keep',
                unchange: [{
                    posi: [0, 0.323],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                }],
                create: [],
                delete: [{
                    posi: [0.323, 1],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                }],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 12
            }]
        },
        Manufacturer: {
            origin: [{
                type: 'change',
                input_row_num: 31,
                output_row_num: 31,
                input_col: [],
                transform_icon: 'combine_columns_merge',
                unchange: [],
                create: [],
                delete: [{
                    posi: [0, 1],
                    case: {
                        input_case: [],
                        output_case: ['Audi', 'Audi', 'Audi', 'Audi', 'Audi', 'Audi', 'BMW', 'BMW', 'BMW', 'BMW', 'BMW', 'BMW', 'Buick', 'Buick', 'Buick', 'Buick', 'Honda', 'Honda', 'Honda', 'Honda', 'Honda', 'Ford', 'Ford', 'Ford', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes'],
                    }
                }],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 3
            }]
        },
        Model: {
            origin: [{
                    type: 'change',
                    input_row_num: 36,
                    output_row_num: 36,
                    input_col: ['Model'],
                    transform_icon: 'transform_columns_replace_na',
                    unchange: [{
                        posi: [0.139, 1],
                        case: {
                            input_case: [
                                ['A4', 'A6', 'A8', 'S3', 'S4', 'S5', '320i', '325Li', '330i', '520Li', '528Li', '535Li', 'Regal', 'Encore', 'Park Avenue', 'Larcosse', 'Civic', 'Accord', 'Passport', 'Odyssey', 'Focus', 'Mustang', 'Mondeo', 'C180', 'C200', 'GLC200', 'GLC300', 'E200L', 'E300L', 'DeVille', 'Escalade']
                            ],
                            output_case: ['A4', 'A6', 'A8', 'S3', 'S4', 'S5', '320i', '325Li', '330i', '520Li', '528Li', '535Li', 'Regal', 'Encore', 'Park Avenue', 'Larcosse', 'Civic', 'Accord', 'Passport', 'Odyssey', 'Focus', 'Mustang', 'Mondeo', 'C180', 'C200', 'GLC200', 'GLC300', 'E200L', 'E300L', 'DeVille', 'Escalade'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.139],
                        case: {
                            input_case: [],
                            output_case: ['Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown'],
                        }
                    }],
                    input_nan_posi: [0, 0.139],
                    output_nan_posi: [],
                    step: 1
                },
                {
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Manufacturer', 'Model'],
                    transform_icon: 'combine_columns_merge',
                    unchange: [],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 1],
                        case: {
                            input_case: [
                                ['Audi', 'Audi', 'Audi', 'Audi', 'Audi', 'Audi', 'BMW', 'BMW', 'BMW', 'BMW', 'BMW', 'BMW', 'Buick', 'Buick', 'Buick', 'Buick', 'Honda', 'Honda', 'Honda', 'Honda', 'Honda', 'Ford', 'Ford', 'Ford', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes', 'Mercedes'],
                                ['A4', 'A6', 'A8', 'S3', 'S4', 'S5', '320i', '325Li', '330i', '520Li', '528Li', '535Li', 'Regal', 'Encore', 'Park Avenue', 'Larcosse', 'Civic', 'Accord', 'Unknown', 'Passport', 'Odyssey', 'Focus', 'Mustang', 'Mondeo', 'C180', 'C200', 'GLC200', 'Unknown', 'GLC300', 'E200L', 'E300L']
                            ],
                            output_case: ['Audi_A4', 'Audi_A6', 'Audi_A8', 'Audi_S3', 'Audi_S4', 'Audi_S5', 'BMW_320i', 'BMW_325Li', 'BMW_330i', 'BMW_520Li', 'BMW_528Li', 'BMW_535Li', 'Buick_Regal', 'Buick_Encore', 'Buick_Park Avenue', 'Buick_Larcosse', 'Honda_Civic', 'Honda_Accord', 'Honda_Unknown', 'Honda_Passport', 'Honda_Odyssey', 'Ford_Focus', 'Ford_Mustang', 'Ford_Mondeo', 'Mercedes_C180', 'Mercedes_C200', 'Mercedes_GLC200', 'Mercedes_Unknown', 'Mercedes_GLC300', 'Mercedes_E200L', 'Mercedes_E300L'],
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 3
                }
            ]
        },
        Launch_Date: {
            origin: [{
                type: 'change',
                input_row_num: 36,
                output_row_num: 36,
                input_col: ['Launch_Date'],
                transform_icon: 'delete_rows_drop_na',
                unchange: [{
                    posi: [0, 0.861],
                    case: {
                        input_case: [
                            ['2015/12/10', '2016/1/1', '2016/2/10', '2016/7/10', '06/15/2018', '09/10/2015', '2016/9/10', '2016/9/10', '2016/9/10', '2016/8/15', '2016/7/15', '2016/7/15', '2014/10/10', '2016/6/20', '2011/5/10', '2016/3/10', '2016/11/10', '2016/9/20', '2016/3/10', '2015/3/10', '2015/7/10', '2016/8/1', '11/10/2015', '2016/11/20', '2016/5/10', '2016/5/10', '2015/11/15', '2015/11/15', '2015/11/15', '2016/8/10', '2016/8/10']
                        ],
                        output_case: ['2015/12/10', '2016/1/1', '2016/2/10', '2016/7/10', '06/15/2018', '09/10/2015', '2016/9/10', '2016/9/10', '2016/9/10', '2016/8/15', '2016/7/15', '2016/7/15', '2014/10/10', '2016/6/20', '2011/5/10', '2016/3/10', '2016/11/10', '2016/9/20', '2016/3/10', '2015/3/10', '2015/7/10', '2016/8/1', '11/10/2015', '2016/11/20', '2016/5/10', '2016/5/10', '2015/11/15', '2015/11/15', '2015/11/15', '2016/8/10', '2016/8/10'],
                    }
                }],
                create: [],
                delete: [{
                    posi: [0.861, 1],
                    case: {
                        input_case: [],
                        output_case: [],
                    }
                }],
                transform: [],
                input_nan_posi: [0.861, 1],
                output_nan_posi: [],
                step: 2
            }]
        },
        Launch_Year: {
            origin: [{
                type: 'change',
                input_row_num: 31,
                output_row_num: 31,
                input_col: ['Launch_Date'],
                transform_icon: 'create_columns_extract',
                unchange: [],
                create: [{
                    posi: [0, 1],
                    case: {
                        input_case: [
                            ['2015/12/10', '2016/1/1', '2016/2/10', '2016/7/10', '06/15/2018', '09/10/2015', '2016/9/10', '2016/9/10', '2016/9/10', '2016/8/15', '2016/7/15', '2016/7/15', '2014/10/10', '2016/6/20', '2011/5/10', '2016/3/10', '2016/11/10', '2016/9/20', '2016/3/10', '2015/3/10', '2015/7/10', '2016/8/1', '11/10/2015', '2016/11/20', '2016/5/10', '2016/5/10', '2015/11/15', '2015/11/15', '2015/11/15', '2016/8/10', '2016/8/10']
                        ],
                        output_case: [2015, 2016, 2016, 2016, 6, 9, 2016, 2016, 2016, 2016, 2016, 2016, 2014, 2016, 2011, 2016, 2016, 2016, 2016, 2015, 2015, 2016, 11, 2016, 2016, 2016, 2015, 2015, 2015, 2016, 2016],
                    }
                }],
                delete: [],
                transform: [],
                input_nan_posi: [],
                output_nan_posi: [],
                step: 4
            }],
        },
        Sale_Price: {
            origin: []
        },
        Resale_Num: {
            origin: []
        },
        Resale_Price: {
            origin: []
        },
        Value_Retention: {
            origin: [{
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Resale_Price', 'Sale_Price'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 1],
                        case: {
                            input_case: [
                                [23.54, 31.73, 60.72, 20.83, 27.93, 35.92, 25.93, 26.01, 30.45, 34.98, 43.72, 49.92, 12.83, 8.94, 14.99, 16.82, 7.83, 17.87, 14.82, 16.93, 14.94, 7.83, 29.83, 14.53, 21.86, 23.72, 30.84, 31.85, 31.41, 33.82, 35.95],
                                [27.28, 41.53, 87.98, 39.98, 45.98, 67.9, 32.0, 32.59, 45.2, 43.56, 55.06, 68.86, 18.99, 13.99, 38.8, 22.58, 11.59, 23.98, 17.98, 23.98, 22.98, 13.08, 76.4, 17.98, 31.48, 32.58, 39.6, 42.8, 48.6, 43.68, 47.48]
                            ],
                            output_case: [0.753, 0.764, 0.69, 0.521, 0.607, 0.529, 0.81, 0.798, 0.674, 0.803, 0.794, 0.725, 0.676, 0.639, 0.386, 0.745, 0.676, 0.745, 0.824, 0.706, 0.65, 0.599, 0.39, 0.808, 0.694, 0.728, 0.779, 0.744, 0.646, 0.774, 0.757]
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 5
                },
                {
                    type: 'sort',
                    output_row_num: 31,
                    max_num: 0.386,
                    min_num: 0.863,
                    input_case: [0.863, 0.764, 0.69, 0.521, 0.607, 0.529, 0.81, 0.798, 0.674, 0.803, 0.794, 0.725, 0.676, 0.639, 0.386, 0.745, 0.676, 0.745, 0.824, 0.706, 0.65, 0.599, 0.39, 0.808, 0.694, 0.728, 0.779, 0.744, 0.646, 0.774, 0.757],
                    output_case: [0.386, 0.39, 0.521, 0.529, 0.599, 0.607, 0.639, 0.646, 0.65, 0.674, 0.676, 0.676, 0.69, 0.694, 0.706, 0.725, 0.728, 0.744, 0.745, 0.745, 0.757, 0.764, 0.774, 0.779, 0.794, 0.798, 0.803, 0.808, 0.81, 0.824, 0.863],
                    transform_icon: 'transform_tables_sort_asc',
                    step: 10
                }
            ]
        },
        Rate: {
            origin: [{
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Value_Retention'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [{
                        posi: [0, 1],
                        case: {
                            input_case: [
                                [0.863, 0.764, 0.69, 0.521, 0.607, 0.529, 0.81, 0.798, 0.674, 0.803, 0.794, 0.725, 0.676, 0.639, 0.386, 0.745, 0.676, 0.745, 0.824, 0.706, 0.65, 0.599, 0.39, 0.808, 0.694, 0.728, 0.779, 0.744, 0.646, 0.774, 0.757]
                            ],
                            output_case: ['A', '0.764', '0.69', '0.521', '0.607', '0.529', 'A', '0.798', '0.674', 'A', '0.794', '0.725', '0.676', '0.639', '0.386', '0.745', '0.676', '0.745', 'A', '0.706', '0.65', '0.599', '0.39', 'A', '0.694', '0.728', '0.779', '0.744', '0.646', '0.774', '0.757'],
                        }
                    }],
                    delete: [],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 6
                },
                {
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Rate'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0.387, 1],
                        case: {
                            input_case: [
                                ['A', '0.69', '0.521', '0.607', '0.529', 'A', '0.674', 'A', '0.676', '0.639', '0.386', '0.676', 'A', '0.65', '0.599', '0.39', 'A', '0.694', '0.646']
                            ],
                            output_case: ['A', '0.69', '0.521', '0.607', '0.529', 'A', '0.674', 'A', '0.676', '0.639', '0.386', '0.676', 'A', '0.65', '0.599', '0.39', 'A', '0.694', '0.646'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.387],
                        case: {
                            input_case: [
                                [0.764, 0.798, 0.794, 0.725, 0.745, 0.745, 0.706, 0.728, 0.779, 0.744, 0.774, 0.757]
                            ],
                            output_case: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 7
                },
                {
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Rate'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0.322, 1],
                        case: {
                            input_case: [
                                ['A', 'B', '0.521', '0.529', 'A', 'B', 'A', 'B', 'B', '0.386', 'B', 'B', 'A', 'B', '0.39', 'A', 'B', 'B', 'B', 'B', 'B']
                            ],
                            output_case: ['A', 'B', '0.521', '0.529', 'A', 'B', 'A', 'B', 'B', '0.386', 'B', 'B', 'A', 'B', '0.39', 'A', 'B', 'B', 'B', 'B', 'B'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.322],
                        case: {
                            input_case: [
                                [0.69, 0.607, 0.674, 0.676, 0.639, 0.676, 0.65, 0.599, 0.694, 0.646]
                            ],
                            output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C']
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 8
                },
                {
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Rate'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0.129, 1],
                        case: {
                            input_case: [
                                ['A', 'B', 'C', 'C', 'A', 'B', 'C', 'A', 'B', 'B', 'C', 'C', 'B', 'C', 'B', 'A', 'B', 'C', 'C', 'A', 'C', 'B', 'B', 'B', 'C', 'B', 'B']
                            ],
                            output_case: ['A', 'B', 'C', 'C', 'A', 'B', 'C', 'A', 'B', 'B', 'C', 'C', 'B', 'C', 'B', 'A', 'B', 'C', 'C', 'A', 'C', 'B', 'B', 'B', 'C', 'B', 'B'],
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                        posi: [0, 0.129],
                        case: {
                            input_case: [
                                [0.521, 0.529, 0.386, 0.39]
                            ],
                            output_case: ['F', 'F', 'F', 'F']
                        }
                    }],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 9
                }
            ],
            combine: [{
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Value_Retention'],
                    transform_icon: 'create_columns_mutate',
                    unchange: [],
                    create: [{
                        posi: [0, 1],
                        case: {
                            input_case: [
                                [0.863, 0.764, 0.69, 0.521, 0.607, 0.529, 0.81, 0.798, 0.674, 0.803, 0.794, 0.725, 0.676, 0.639, 0.386, 0.745, 0.676, 0.745, 0.824, 0.706, 0.65, 0.599, 0.39, 0.808, 0.694, 0.728, 0.779, 0.744, 0.646, 0.774, 0.757]
                            ],
                            output_case: ['A', '0.764', '0.69', '0.521', '0.607', '0.529', 'A', '0.798', '0.674', 'A', '0.794', '0.725', '0.676', '0.639', '0.386', '0.745', '0.676', '0.745', 'A', '0.706', '0.65', '0.599', '0.39', 'A', '0.694', '0.728', '0.779', '0.744', '0.646', '0.774', '0.757'],
                        }
                    }],
                    delete: [],
                    transform: [],
                    input_nan_posi: [],
                    output_nan_posi: [],
                    step: 6
                },
                {
                    type: 'change',
                    input_row_num: 31,
                    output_row_num: 31,
                    input_col: ['Rate'],
                    transform_icon: 'transform_columns_mutate',
                    unchange: [{
                        posi: [0, 0.161],
                        case: {
                            input_case: [
                                ['A', 'A', 'A', 'A', 'A']
                            ],
                            output_case: ['A', 'A', 'A', 'A', 'A']
                        }
                    }],
                    create: [],
                    delete: [],
                    transform: [{
                            posi: [0.161, 0.548],
                            case: {
                                input_case: [
                                    [0.764, 0.798, 0.794, 0.725, 0.745, 0.745, 0.706, 0.728, 0.779, 0.744, 0.774, 0.757]
                                ],
                                output_case: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
                            },
                            step: 7
                        },
                        {
                            posi: [0.548, 0.871],
                            case: {
                                input_case: [
                                    [0.69, 0.607, 0.674, 0.676, 0.639, 0.676, 0.65, 0.599, 0.694, 0.646]
                                ],
                                output_case: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C']
                            },
                            step: 8
                        },
                        {
                            posi: [0.871, 1],
                            case: {
                                input_case: [
                                    [0.521, 0.529, 0.386, 0.39]
                                ],
                                output_case: ['F', 'F', 'F', 'F']
                            },
                            step: 9
                        }
                    ],
                    step: 7,
                    input_nan_posi: [],
                    output_nan_posi: [],
                }
            ]
        }
    },
    column_change_data: {
        0: {
            table_path: 'data/case2/L4 (car).csv',
            columns: {
                'Manufacturer': {
                    type: 'str'
                },
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        1: {
            type: 'unchange',
            transform: 'transform_columns_replace_na',
            table_path: 'data/case2/L5 (car).csv',
            change: false,
            columns: {
                'Manufacturer': {
                    type: 'str'
                },
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        2: {
            type: 'unchange',
            transform: 'delete_rows_drop_na',
            table_path: 'data/case2/L6 (car).csv',
            change: false,
            columns: {
                'Manufacturer': {
                    type: 'str'
                },
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        3: {
            type: 'delete',
            transform: 'combine_columns_merge',
            table_path: 'data/case2/L7 (car).csv',
            change: true,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        4: {
            type: 'create',
            transform: 'create_columns_extract',
            table_path: 'data/case2/L8 (car).csv',
            change: true,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        5: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case2/L10 (car).csv',
            change: true,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                }
            }
        },
        6: {
            type: 'create',
            transform: 'create_columns_mutate',
            table_path: 'data/case2/L11 (car).csv',
            change: true,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Rate': {
                    type: 'str'
                }
            }
        },
        7: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case2/L12 (car).csv',
            change: false,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Rate': {
                    type: 'str'
                }
            }
        },
        8: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case2/L13 (car).csv',
            change: false,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Rate': {
                    type: 'str'
                }
            }
        },
        9: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
            table_path: 'data/case2/L14 (car).csv',
            change: false,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Rate': {
                    type: 'str'
                }
            }
        },
        10: {
            type: 'unchange',
            transform: 'transform_tables_sort_asc',
            table_path: 'data/case2/L15 (car).csv',
            change: false,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Rate': {
                    type: 'str'
                }
            }
        },
        11: {
            type: 'transform',
            transform: 'transform_columns_rearrange',
            table_path: 'data/case2/L16 (car).csv',
            change: true,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Rate': {
                    type: 'str'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        },
        12: {
            type: 'unchange',
            transform: 'delete_rows_slice_keep',
            table_path: 'data/case2/L17 (car).csv',
            change: false,
            columns: {
                'Model': {
                    type: 'str'
                },
                'Rate': {
                    type: 'str'
                },
                'Value_Retention': {
                    type: 'num'
                },
                'Launch_Date': {
                    type: 'date'
                },
                'Launch_Year': {
                    type: 'num'
                },
                'Sale_Price': {
                    type: 'num'
                },
                'Resale_Num': {
                    type: 'num'
                },
                'Resale_Price': {
                    type: 'num'
                }
            }
        }
    }
}


export { case1, case2, case3 }