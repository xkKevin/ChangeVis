const case1 = {
    average_row: 30.67,
    max_row: 36,
    source_column: 3,
    source_row: 36,
    group: [
        [4, 5, 6, 7, 8]
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
            }]
        }
    },
    column_change_data: {
        0: {
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
        6: {
            type: 'unchange',
            transform: 'transform_columns_mutate',
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


export { data }