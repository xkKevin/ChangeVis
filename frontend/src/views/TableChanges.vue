<template>
  <div id="TableChanges" :style="{
        '--delete-color': color.delete,
        '--transform-color': color.transform,
        '--create-color': color.create,
      }">
    <el-header height="50px" style="background: black">
      <el-row style="background: black; padding-top: 8px; flex: 1;">
        <div style="background: black; float: left;">
          <span style="font-family: Arial; font-size: 20px; color: white">Case:</span>
          <el-dropdown @command="selectCase" style="margin-left: 20px">
              <span
                  class="el-dropdown-link"
                  style="
                      width: 138px;
                      display: inline-block;
                      text-align: center;
                      padding: 4px 0;
                  "
              >
                  {{ one_case }}
              </span>
              <i
                  class="el-icon-arrow-down el-icon--right"
                  style="position: relative; left: -3px"
              ></i>
              <el-dropdown-menu slot="dropdown" style="width: 138px; text-align: center;">
                  <el-dropdown-item
                      v-for="key in Object.keys(cases)"
                      :key="key"
                      :value="key"
                      :command="key"
                  >
                      {{ key }}
                  </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="background: black; margin-top: 10px; text-align: center;line-height: 20px; width: 100%;">
            <span style="font-family: Arial; font-size: 30px; color: white; font-weight: bold">ChangeVis</span>
        </div>
      </el-row>
    </el-header>
    <el-row type="flex" justify="center" style="height: calc(100vh - 70px); margin: 0">
    <el-col
        style="
          width: 25vw;
          padding: 0 0 0 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-right: 5px;
          z-index: 1;
        "
      >
      <el-row style="height: 42vh; margin: 0">
        <el-row
          type="flex"
          justify="space-between"
          style="height: 50px; background: #f5f5f5; width: 100%"
        >
          <div id="tag1"></div>
          <div class="title_right">
            Language:
            <el-dropdown @command="changeModel" style="margin-left: 8px">
              <span
                class="el-dropdown-link"
                style="width: 69px; display: inline-block; text-align: center; padding: 2px 0;"
              >
                {{ language }}
              </span>
              <i class="el-icon-arrow-down el-icon--right" style="position: relative; left: -4px;"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in all_langs"
                  :key="item"
                  :value="item"
                  :command="item"
                >
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              round
              @click="generateVis"
              style="
                background: #6391d7;
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: -0.7px;
                line-height: 17px;
                font-weight: 400;
                display: flex;
                align-items: center;
                height: 32px;
                margin-top: 3px;
                margin-left: 8px;
              "
              >Run</el-button
            >
          </div>
        </el-row>
        <div style="height: calc(42vh - 55px); margin-top: 4px; align-items: center">
          <div id="monaco" style="height: 98%; width: 99%"></div>
        </div>
      </el-row>
      <el-row style="background-color: #e3e6f0; height: 5px;"></el-row>
      <el-row style="height: calc(58vh - 75px);">
        <el-row
            type="flex"
            justify="space-between"
            style="height: 50px; width: 100%; background: #f5f5f5"
          >
          <div id="tag3"></div>
          <div>
            <el-button v-if="existCreate&(allFlag|tempTransformFlag|tempDeleteFlag)" style="background-color: #b2df8a; font-size: 18px; width:140px; color: black; font-family: Arial" @click="clickCreate" icon="el-icon-search" >Create</el-button>
            <el-button v-if="existCreate&tempCreateFlag" style="background-color: #b2df8a; font-size: 18px; width:140px; color: black;" @click="clickCreate" icon="el-icon-circle-check">Create</el-button>
            <el-button v-if="existDelete&(allFlag|tempCreateFlag|tempTransformFlag)" style="background-color: #fb9a99; font-size: 18px; width:140px; color: black;" @click="clickDelete" icon="el-icon-search">Delete</el-button>
            <el-button v-if="existDelete&tempDeleteFlag" style="background-color: #fb9a99; font-size: 18px; width:140px; color: black;" @click="clickDelete" icon="el-icon-circle-check">Delete</el-button>
            <el-button v-if="existTransform&tempTransformFlag" style="background-color: #a6cee3; font-size: 18px; width:140px; color: black;" @click="clickTransform" icon="el-icon-circle-check">Transform</el-button>
            <el-button v-if="existTransform&(allFlag|tempCreateFlag|tempDeleteFlag)" style="background-color: #a6cee3; font-size: 18px; width:140px; color: black;" @click="clickTransform" icon="el-icon-search">Transform</el-button>
          </div>
        </el-row>
        <el-row style="height: calc(100% - 50px);">
          <div v-if="allFlag" id="data_panel" style="height: 100%">
            <vxe-table
              border
              Table="60px"
              class="mytable-scrollbar"
              :height= "dataview_height"
              empty-text="No Data"
              :cell-class-name="cellClassName"
              :data="tableData"
              >       
              <vxe-column v-for="col in showCol" :key="col" :field="col" :title="col"></vxe-column>
            </vxe-table>
          </div>
          <div v-if="tempFlag" id="data_panel" style="height: 100%">
            <vxe-table
              border
              Table="60px"
              class="mytable-scrollbar"
              :height= "dataview_height"
              empty-text="No Data"
              :cell-class-name="cellClassName"
              :data="tempTableData"
              >       
              <vxe-column v-for="col in showCol" :key="col" :field="col" :title="col"></vxe-column>
            </vxe-table>
          </div>
        </el-row>
      </el-row>
    </el-col>

    <el-col
        style="
          flex:1;
          padding: 0 0 0 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          z-index: 1;
        "
      >
      <el-row
          type="flex"
          justify="space-between"
          style="height: 50px; background: #f5f5f5"
        >
        <div id="tag2"></div>
        <div class="title_right">
            <span style="margin-right: 5px">Combined:</span> 
            <el-switch v-model="combined" active-color="#13ce66" inactive-color="#ff4949" @change="combinedChange">
            </el-switch>

            <span style="margin-right: 5px; margin-left: 10px">Show Proportion:</span> 
            <el-switch v-model="proportion" active-color="#13ce66" inactive-color="#ff4949" @change="proportionChange">
            </el-switch>
          </div>
      </el-row>
      <el-row id="vis_panel" class="mytable-scrollbar" style="height: calc(100% - 50px);">
        <div id="vis_panel_div"  style="display: inline-block; overflow: auto;">
          <svg id="vis_svg" :width="visview_width" :height="visview_height"></svg>
        </div>
      </el-row>
    </el-col>
    </el-row>

  </div>
</template>

<script>
// import axios from "axios";
import * as d3 from "d3";
import * as monaco from "monaco-editor"; // https://www.cnblogs.com/xuhaoliang/p/13803230.html

import {handel_overview, sendVue, changeProportionView} from "@/assets/js/overview_panel"
import {show_data_panel} from "@/assets/js/data_panel"
import {change_color} from "@/assets/js/config"
import { case1, case2, case3 } from '@/assets/js/case_format'

const request_api = "/backend";

export default {
  name: "TableChanges",
  // delimiters: ["[[", "]]"],
  data() {
    return {
      combined: false, // 是否合并
      proportion: false, 
      editor: null, // 文本编辑器
      line_decorations: null,
      glyph_decorations: null,
      color: change_color,
      script_content: '', //'print("hello world!")',  上一次运行的script脚本
      language: "python",
      all_langs: ["r", "python"],
      cases: {
                case1: 'case1script.txt',
                case2: 'case2script.txt',
                case3: 'case3script.txt',
            },
      casesNum: {
                case1: case1,
                case2: case2,
                case3: case3,
            },
      one_case: 'Select a case',
      screen_size: 0,
      allview: {},
      vis_panel: {},
      dataview_height: 400,
      visview_width: 1000, 
      visview_height: 800,
      tableData: [],
      tempTableData: [],
      selectRow: null,
      selectColumn: null,
      showCol: [],
      existCreate: false,
      existTransform: false,
      existDelete: false,
      allFlag: true,
      tempFlag: false,
      tempCreateFlag: false,
      tempDeleteFlag: false,
      tempTransformFlag: false
    };
  },
  components: {
  },
  watch: {
    screen_size(val) {
      this.dataview_height = d3.select("#data_panel").node().offsetHeight
    },
    allview(val) {
      this.visview_width = this.allview.width;
      this.visview_height = this.allview.height;
      // console.log(this.visview_width, this.visview_height);
    }
  },
  computed: {
    // dataview_height: function() {
    //   console.log(d3.select("#data_panel").node().offsetHeight);
    //   if (d3.select("#data_panel").node() === null) return 400
    //   return d3.select("#data_panel").node().offsetHeight
    // }
  },
  methods: {
    cellClassName ({ row, rowIndex, column, columnIndex }) {
            if (column.property.slice(0,10) !== 'ChangeVis_') {
              let tempColName = 'ChangeVis_' + column.property
              if (row[tempColName] == -1) {
                return 'col-white'
              } else if (row[tempColName] == 0) {
                return 'col-gray'
              } else if (row[tempColName] == 1) {
                this.existCreate = true
                return 'col-green'
              } else if (row[tempColName] == 2) {
                this.existDelete = true
                return 'col-red'
              } else if (row[tempColName] == 3) {
                this.existTransform = true
                return 'col-blue'
              }
            }},
    clickTransform () {
      if(this.tempFlag === true & this.tempCreateFlag === false & this.tempDeleteFlag === false){
        this.tempFlag = false
        this.allFlag = true
        this.tempCreateFlag= false,
        this.tempDeleteFlag= false,
        this.tempTransformFlag= false
      } else {
        this.tempCreateFlag = false
        this.tempDeleteFlag = false
        this.tempFlag = true
        this.allFlag = false
        let addFlag = false
        this.tempTableData = []
        for (var i=0;i<this.tableData.length;i++){
          addFlag = false
          for (var key in this.tableData[i]){
            if (key.slice(0,10) === 'ChangeVis_'){
              if(this.tableData[i][key] == 3){
                addFlag = true
              }
            }
          }
          if(addFlag){
            this.tempTableData.push(this.tableData[i])
          }
        }
        this.tempTransformFlag = true
      }
    },
    clickCreate () {
      if(this.tempFlag === true & this.tempDeleteFlag === false & this.tempTransformFlag === false){
        this.tempFlag = false
        this.allFlag = true
        this.tempCreateFlag= false,
        this.tempDeleteFlag= false,
        this.tempTransformFlag= false
      } else {
        this.tempTransformFlag = false
        this.tempDeleteFlag = false
        this.tempFlag = true
        this.allFlag = false
        let addFlag = false
        this.tempTableData = []
        for (var i=0;i<this.tableData.length;i++){
          addFlag = false
          for (var key in this.tableData[i]){
            if (key.slice(0,10) === 'ChangeVis_'){
              if(this.tableData[i][key] == 1){
                addFlag = true
              }
            }
          }
          if(addFlag){
            this.tempTableData.push(this.tableData[i])
          }
        }
        this.tempCreateFlag = true
      }
    },
    clickDelete () {
      if(this.tempFlag === true & this.tempCreateFlag === false & this.tempTransformFlag === false){
        this.tempFlag = false
        this.allFlag = true
        this.tempCreateFlag= false,
        this.tempDeleteFlag= false,
        this.tempTransformFlag= false
      } else {
        this.tempCreateFlag = false
        this.tempTrasnsformFlag = false
        this.tempFlag = true
        this.allFlag = false
        let addFlag = false
        this.tempTableData = []
        for (var i=0;i<this.tableData.length;i++){
          addFlag = false
          for (var key in this.tableData[i]){
            if (key.slice(0,10) === 'ChangeVis_'){
              if(this.tableData[i][key] == 2){
                addFlag = true
              }
            }
          }
          if(addFlag){
            this.tempTableData.push(this.tableData[i])
          }
        }
        this.tempDeleteFlag = true
      }
    },
    selectCase(one_case = 'case3') {
            this.one_case = one_case;
            this.getScriptData(this.cases[this.one_case]);
            this.combined = false;
            this.proportion = false;
            this.existCreate = false;
            this.existDelete = false;
            this.existTransform = false;
            let that = this
            show_data_panel(this.casesNum[this.one_case], that);
            handel_overview(this.casesNum[this.one_case], + this.combined, this.proportion).then(data => {
              let allview = {}
              allview.width = Math.max(data.level1.width, data.level2.width, data.level3.width)
              allview.height = data.level3.height
              that.allview = allview
            });
            // this.getTableData(this.cases[this.one_case]);
        },
    drawTag(id, text) {
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", `${id}svg`);
      svg.setAttribute("width", "230px");
      svg.setAttribute("height", "40px");
      svg.setAttributeNS(
        "http://www.w3.org/2000/xmlns/",
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink"
      );

      // document.getElementById("glyphs").appendChild(svg)
      // let svg = d3.append("svg")
      //           .attr('id',`${id}svg`)

      document.getElementById(id).appendChild(svg);
      let g = d3.select(`#${id}svg`).append("g");
      g.append("path")
        .attr("d", "M0,0 L0,40 L200,40 L230,0 L0,0")
        .attr("fill", "#62ADB2");

      // g.append("rect")
      // .attr('x',0)
      // .attr('y',0)
      // .attr("height",10)
      // .attr("width",60)
      // .attr("fill","red")

      g.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", 26)
        .attr("dx", 18)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .attr("font-size", `19px`)
        .attr("font-weight", "bold")
        .attr("font-family", "Arial")
        .text(text);
    },
    initData() {
        this.dataview_height = d3.select("#data_panel").node().offsetHeight;
        document.getElementById("vis_panel_div").style.width = document.getElementById("vis_panel").offsetWidth + 'px';
        document.getElementById("vis_panel_div").style.height = document.getElementById("vis_panel").offsetHeight + 'px';
        this.selectCase();
    },
    initEditor() {
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById("monaco"), {
        value: this.script_content, // 编辑器初始显示文字
        language: this.language, // 语言支持自行查阅demo
        automaticLayout: true, // 自动布局
        autoIndent: true, //自动布局
        fontSize: 18, //字体大小
        readOnly: false, // 只读
        theme: "vs", // 官方自带三种主题vs, hc-black, or vs-dark,
        glyphMargin: true,
        lineNumbersMinChars: 1,
      });

      this.editor.onKeyUp((e) => {
        this.detectChanges();
      });
    },
    detectChanges() {
      if (this.script_content == this.editor.getValue()) {
        // console.log("no changes");
        this.interaction_flag = true;
      } else {
        // console.log("changes");
        this.interaction_flag = false;
        this.fireKeyEvent(document.getElementById("tag3"), "keyup", 27);  // Escape code is 27
      }
    },
    generateVis(){
      let that = this
      handel_overview(this.casesNum[this.one_case], + this.combined, this.proportion).then(data => {
        let allview = {}
        allview.width = Math.max(data.level1.width, data.level2.width, data.level3.width)
        allview.height = data.level3.height
        that.allview = allview
      });
    },
    combinedChange(combined){
      this.combined = combined
      this.codeLineHighlight()
      this.codeGlyphHighlight()
      let that = this
      handel_overview(this.casesNum[this.one_case], + this.combined, this.proportion).then(data => {
        let allview = {}
        allview.width = Math.max(data.level1.width, data.level2.width, data.level3.width)
        allview.height = data.level3.height
        that.allview = allview
      });
    },
    proportionChange(proportion){
      this.proportion = proportion
      changeProportionView(+ this.combined, this.proportion);
    },
    codeGlyphHighlight(lines = []) {
      this.glyph_decorations = this.editor.deltaDecorations(this.glyph_decorations, 
        lines.map((line, key) => {
          return {
            range: new monaco.Range(line, 1, line, 1),
            options: {
                glyphMarginClassName: "myGlyphMarginClass",
            },
          }
        })
      );
    },
    codeLineHighlight(lines = [], changes = []) {
      // d3.selectAll('span[class^="mtk"]').classed("create", false).classed("transform", false).classed("delete", false)

      this.line_decorations = this.editor.deltaDecorations(this.line_decorations, 
        lines.map((line, key) => {
          return {
            range: new monaco.Range(line, 1, line, 1),
            options: {
                isWholeLine: true,
                inlineClassName: typeof(changes) === 'string' ? changes: changes[key],  
                // inlineClassName: "myContentClass",
                // glyphMarginClassName: "myGlyphMarginClass",
            },
          }
        })
      );
      //  start, end 弃用，直接用数组绘制每一行
      //  https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-rendering-glyphs-in-the-margin
      //   this.editor.deltaDecorations(this.line_decorations, [{
      //     range: new monaco.Range(start, 1, end, 1),
      //     options: {
      //         isWholeLine: true,
      //         className: "myContentClass",
      //         inlineClassName: "myContentClass",
      //         glyphMarginClassName: "myGlyphMarginClass",
      //     },
      //   }, ]);
    },
    loadFile(name) {
          const xhr = new XMLHttpRequest()
          const okStatus = document.location.protocol === 'file:' ? 0 : 200
          xhr.open('GET', name, false)
          xhr.overrideMimeType('text/html;charset=utf-8')// 默认为utf-8
          xhr.send(null)
          return xhr.status === okStatus ? xhr.responseText : null
        },
        // unicode转utf-8
        unicodeToUtf8(data) {
          data = data.replace(/\\/g, '%')
          return unescape(data)
    },
    getScriptData(case_file = "") {
        // console.log(case_file);
        var path = 'data/' + case_file
        // console.log(path);
        const file = this.unicodeToUtf8(this.loadFile(path))
        if (case_file === 'case2script.txt'){
          this.language = 'r'
        }
        else{
          this.language = 'python'
        }
        this.changeModel(this.language, file, false);
    },
    changeModel(lang = "r", script_content = "", flag = true) {
      //创建新模型，value为旧文本，lang 为语言
      var oldModel = this.editor.getModel(); //获取旧模型
      if (flag) {
        // flag 为 true，说明是界面传来的，注意不能用 script_content === "" 来判断，因为 第二个参数传进来的是 VueComponent
        if (lang === this.language) return;
        // console.log("script_content:", script_content);
        script_content = this.editor.getValue();
        this.language = lang;
      }
      // modesIds即为支持语言
      // var modesIds = monaco.languages.getLanguages().map(function (lang) {
      //   return lang.id;
      // });
      var newModel = monaco.editor.createModel(script_content, lang);

      //将旧模型销毁
      if (oldModel) {
        oldModel.dispose();
      }
      //设置新模型
      this.editor.setModel(newModel);
      this.line_decorations = this.editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 1, 1, 1),
            options: {
              isWholeLine: true,
              className: "default"
            },
          },
        ]
      );
      this.glyph_decorations = this.editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 1, 1, 1),
            options: {
              glyphMarginClassName: "default",
            },
          },
        ]
      );
    },
  },
  mounted() {
    this.initEditor();
    this.initData();
    this.drawTag("tag1", "Script Panel");
    // this.drawTag("tag2", "Overview Panel");
    // this.drawTag("tag3", "Change Panel");
    this.drawTag("tag2", "Visualization Panel");
    this.drawTag("tag3", "Data Panel");
    window.d3 = d3;
    window.vue = this;
    sendVue(this)
    const that = this
    window.onresize = () => {
        return (() => {
            that.screen_size = document.body.clientWidth + document.body.clientHeight;
            document.getElementById("vis_panel_div").style.width = document.getElementById("vis_panel").offsetWidth + 'px';
            document.getElementById("vis_panel_div").style.height = document.getElementById("vis_panel").offsetHeight + 'px';
        })()
    }
  },
};
</script>

<style>

#TableChanges {
  border: 2px solid #e3e6f0;
  background-color: #e3e6f0;
}

.el-button.is-round {
  border-radius: 15px;
  padding: 12px 18px;
}

.el-popover, .el-popover__title {
	word-break: normal; /* 让单词完整显示，而不拆分换行 */
}

tr {
  color: black;
}
/* thead tr   !important*/
.el-table th {
  background-color: #f5f5f5;
  color: black;
}

/* .el-table__row--striped td{
  background-color: #F6F8FB !important;
} */

.title_right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-family: Arial;
  font-size: 20px;
}
.el-col,
.el-header,
.el-aside,
.el-main,
.el-footer {
  /* border: 1px solid grey; */
  background-color: white;
}
footer.el-footer {
  padding: 10px;
}
.el-dropdown {
  border-radius: 8px;
  border: 1px solid grey;
  background-color: white;
  /* background-color: lightblue; */
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-family: Arial;
  font-size: 20px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

g.tbl_area {
  pointer-events: none;
}

/*
rect.table:hover{
  stroke: red;
  stroke-width: 2; 
  outline: #888888 solid;
}
*/

g.select,
rect.select {
  outline: #888888 solid 3px;
}

.transform {
  background: var(--transform-color);
}

.delete {
  background: var(--delete-color);
}

.create {
  background: var(--create-color);
}

.myGlyphMarginClass {
  background: #6391d7;
  margin-left: 15px !important;
  width: 6px !important;
}

.myContentClass {
  background: lightblue;
}

.mytable-scrollbar {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px
  
}

.mytable-scrollbar .vxe-body--column.col-white {
  background-color: #ffffff;
  color: #000000;
}

.mytable-scrollbar .vxe-body--column.col-gray {
  background-color: #e6e6e6;
  color: #000000;
}

.mytable-scrollbar .vxe-body--column.col-green {
  background-color: #b2df8a;
  color: #000000;
}

.mytable-scrollbar .vxe-body--column.col-red {
  background-color: #fb9a99;
  color: #000000;
}

.mytable-scrollbar .vxe-body--column.col-blue {
  background-color: #a6cee3;
  color: #000000;
}

.mytable-scrollbar ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}


</style>
