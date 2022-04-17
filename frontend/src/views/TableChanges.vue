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
              We develop Somnus to visualize the semantics of wrangling scripts.
              Somnus accepts a script and data tables as input and results in a glyph-based provenance graph where nodes are tables while edges are data transformations.
              <h3 style="margin-bottom:10px;">Reference</h3>
              Kai Xiong, Siwei Fu, Guoming Ding, Zhongsu Luo, Rong Yu, Wei Chen, Hujun Bao, and Yingcai Wu. Visualizing the Scripts of Data Wrangling with SOMNUS. IEEE Transactions on Visualization and Computer Graphics, 2022.<br>
              <a href="https://ieeexplore.ieee.org/document/9693232/" target="_blank">Somnus Paper</a><br>
              <a href="/#/morpheus" target="_blank">MORPHEUS Revisited System</a><br>
              <a href="https://www.youtube.com/watch?v=fQ-eN_4vhso" target="_blank">Demo Video</a>
            </div>
            <span slot="reference">Table Changes</span>
          </el-popover>
        </div>
    </el-header>
    <el-row type="flex" justify="center" style="height: 42vh; margin: 0">
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
              @click="generateSomnusGlyphs"
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
                height: 38px;
                margin-top: 3px;
                margin-left: 8px;
              "
              >Run</el-button
            >
          </div>
        </el-row>
        <div style="flex: 1; display: flex; align-items: center">
          <div id="monaco" style="height: 100%; width: 100%"></div>
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
        </el-row>
        <div style="flex: 1; display: flex; align-items: center;">
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
          <div id="tb_changes" style="height: 100%; width: 100%; background-color:white"></div>
        </div>
    </el-row>
  </div>
</template>

<script>
// import axios from "axios";
import * as d3 from "d3";
// import * as monaco from "monaco-editor"; // https://www.cnblogs.com/xuhaoliang/p/13803230.html

const request_api = "/backend";

export default {
  name: "TableChanges",
  // delimiters: ["[[", "]]"],
  data() {
    return {
      language: "r",
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
  },
  mounted() {
    this.drawTag("tag1", "Script Panel");
    this.drawTag("tag2", "Overview Panel");
    this.drawTag("tag3", "Change Panel");
  },
};
</script>

<style>
#TableChanges {
  border: 2px solid #e3e6f0;
  background-color: #e3e6f0;
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

.myContentClass2,
.myGlyphMarginClass2 {
}
</style>
