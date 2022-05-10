import { readcsv } from "@/assets/js/change_panel"
import { vm } from "@/assets/js/overview_panel"
import * as d3 from "d3"

const ELK = require('elkjs')

var overall_data


async function show_data_panel(data) {
    overall_data = data
    vm.showCol = overall_data.step2columnshow[0]
    vm.tableData = await readcsv(overall_data.step2datac[0])
}

export { show_data_panel }