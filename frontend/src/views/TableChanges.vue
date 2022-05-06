<template>
  <div id="TableChanges">
    <el-header height="50px" style="background: black">
        <div
          style="
            text-align: center;
            color: white;
            font-size: 20pt;
            font-family: Arial;
            font-weight: bold;
            line-height: 50px;
          "
        >
          <el-popover
            placement="bottom"
            width="410"
            trigger="hover"
            >
            <div class="tips-content"> 
              <!-- popover通过slot传入内容链接：https://www.jianshu.com/p/d4f36ee0598d -->
              <h3 style="margin-top:5px;">Introduction</h3>
              <p>Visaulizing Table Changes in Data Wrangling</p>
              We develop Somnus to visualize the semantics of wrangling scripts.
              Somnus accepts a script and data tables as input and results in a glyph-based provenance graph where nodes are tables while edges are data transformations.
              <h3 style="margin-bottom:10px;">Reference</h3>
              Kai Xiong, Siwei Fu, Guoming Ding, Zhongsu Luo, Rong Yu, Wei Chen, Hujun Bao, and Yingcai Wu. Visualizing the Scripts of Data Wrangling with SOMNUS. IEEE Transactions on Visualization and Computer Graphics, 2022.<br>
              <a href="https://ieeexplore.ieee.org/document/9693232/" target="_blank">Somnus Paper</a><br>
              <a href="/#/morpheus" target="_blank">MORPHEUS Revisited System</a><br>
              <a href="https://www.youtube.com/watch?v=fQ-eN_4vhso" target="_blank">Demo Video</a>
            </div>
            <span slot="reference">ChangeVis</span>
          </el-popover>
        </div>
    </el-header>
    <el-row type="flex" justify="center" style="height: calc(100vh - 70px); margin: 0">
    <el-col
        style="
          width: 28vw;
          padding: 0 0 0 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-right: 5px;
          z-index: 1;
        "
      >
      <el-row style="height: 40vh; margin: 0">
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
        <div style="height: calc(40vh - 55px); margin-top: 4px; align-items: center">
          <div id="monaco" style="height: 98%; width: 99%"></div>
        </div>
      </el-row>
      <el-row style="background-color: #e3e6f0; height: 5px;"></el-row>
      <el-row style="height: calc(60vh - 75px);">
        <el-row
            type="flex"
            justify="space-between"
            style="height: 50px; width: 100%; background: #f5f5f5"
          >
          <div id="tag3"></div>

        </el-row>
        <el-row style="height: calc(100% - 50px);">
          
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
      <el-row style="height: 180px">
        <svg id="overview_svg" width="100%" height="100%"></svg>
      </el-row>
      <el-row style="height: calc(100% - 230px)">
        <svg id="tb_changes" width="100%" height="100%"></svg>
      </el-row>
    </el-col>
    </el-row>

    <!-- <el-row type="flex" justify="center" style="height: 42vh; margin: 0">
      <el-col
        style="
          width: 30vw;
          padding: 0 0 0 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-right: 5px;
          z-index: 1;
        "
      >
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
        <div style="flex: 1; display: flex; align-items: center">
          <div id="monaco" style="height: 98%; width: 99%"></div>
        </div>
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
          </div>
        </el-row>
        <div style="flex: 1; display: flex; align-items: center; padding: 3px 4px;">
          <svg id="overview_svg" width="100%" height="100%"></svg>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="height: calc(58vh - 75px); width: 100%; margin-top:5px; flex-direction: column;">
        <el-row
            type="flex"
            justify="space-between"
            style="height: 50px; width: 100%; background: #f5f5f5"
          >
          <div id="tag3"></div>
        </el-row>
        <div style="flex: 1; display: flex; align-items: center;">
          <div style="height: 100%; width: 100%; background-color:white">
            <svg id="tb_changes" width="100%" height="100%"></svg>
          </div>
        </div>
    </el-row> -->
  </div>
</template>

<script>
// import axios from "axios";
import * as d3 from "d3";
import * as monaco from "monaco-editor"; // https://www.cnblogs.com/xuhaoliang/p/13803230.html

import {handel_overview} from "@/assets/js/overview_panel"
import {handel_change} from "@/assets/js/change_panel"
import { data } from '@/assets/js/case'
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
      script_content: `import pandas as pd

studentScore = pd.read_csv("students.csv")
studentScore.id = studentScore.id.str.extract('(\d+)')
studentScore.drop_duplicates(inplace=True)
studentScore.loc[:, 'totalScore'] = studentScore.math + studentScore.art
studentScore.loc[studentScore['totalScore'] < 120, 'scoreRate'] = 'F'
studentScore.loc[(studentScore['totalScore'] >= 120) & (studentScore['totalScore'] < 140) , 'scoreRate'] = 'D'
studentScore.loc[(studentScore['totalScore'] >= 140) & (studentScore['totalScore'] < 160) , 'scoreRate'] = 'C'
studentScore.loc[(studentScore['totalScore'] >= 160) & (studentScore['totalScore'] < 180) , 'scoreRate'] = 'B'
studentScore.loc[studentScore['totalScore'] >= 180 , 'scoreRate'] = 'A'
studentScore = studentScore.sort_values("totalScore", ascending = False)`, //'print("hello world!")',  上一次运行的script脚本
      language: "python",
      all_langs: ["r", "python"],
    };
  },
  components: {
  },
  methods: {
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
    initEditor() {
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById("monaco"), {
        value: this.script_content, // 编辑器初始显示文字
        language: this.language, // 语言支持自行查阅demo
        automaticLayout: true, // 自动布局
        autoIndent: true, //自动布局
        fontSize: 16, //字体大小
        readOnly: false, // 只读
        theme: "vs", // 官方自带三种主题vs, hc-black, or vs-dark,
        glyphMargin: false,
        lineNumbersMinChars: 4,
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
      this.decorations = this.editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 1, 1, 1),
            options: {
              isWholeLine: true,
              className: "myContentClass2",
              glyphMarginClassName: "myGlyphMarginClass2",
            },
          },
        ]
      );

      // console.log(this.decorations);
    },
    generateVis(){
      // this.$message({
      //     showClose: true,
      //     message: 'Test'
      // });
      handel_overview(case1);
    },
    combinedChange(combined){
      this.combined = combined
      handel_overview(case1, + this.combined, this.proportion);
    },
    proportionChange(proportion){
      this.proportion = proportion
      handel_overview(case1, + this.combined, this.proportion);
    },
  },
  mounted() {
    this.initEditor();
    this.drawTag("tag1", "Script Panel");
    // this.drawTag("tag2", "Overview Panel");
    // this.drawTag("tag3", "Change Panel");
    this.drawTag("tag2", "Visualization Panel");
    this.drawTag("tag3", "Data Panel");
    window.d3 = d3;
    this.generateVis()
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

.myGlyphMarginClass {
  background: #6391d7;
  margin-left: 35px !important;
  width: 6px !important;
}

.myContentClass {
  background: lightblue;
}

g.tbl_area {
  pointer-events: none;
}

rect.table:hover{
  /* stroke: red;
  stroke-width: 2; 
  outline: #888888 solid;*/
}

rect.select {
  outline: #888888 solid 3px;
}

.myContentClass2,
.myGlyphMarginClass2 {
}
</style>
