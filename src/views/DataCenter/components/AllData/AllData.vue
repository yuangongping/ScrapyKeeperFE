<template>
  <div class="allDataPicture">
    <div class="title">一周数据入库总量概览</div>
    <div class="box" v-if="pictureData.rows.length > 0">
      <ve-line
        :data="pictureData"
        :settings="chartSettings"
        :width="lineWidth"
        :height="lineHeight"
        :legend-visible="false"
      ></ve-line>
    </div>
    <div class="no-picture" v-else>暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    pictureData: { 
      type: Object 
    }
  },
  data() {
    this.chartSettings = {
      yAxisName: ["数据入库量/条"],
      xAxisName: ["日期"],
      area: true, //是否显示为面积图
      itemStyle: {
        //面积图颜色设置
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#7bc0ff" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#edf4ff" // 100% 处的颜色
            }
          ],
          globalCoord: true // 缺省为 false
        }
      }
    };
    return {
      lineWidth: "95%", //宽度
      lineHeight: "600px" //高度
    };
  }
};
</script>

<style lang="scss" scoped>
.allDataPicture {
  .title {
    font-weight: bold;
    color: #333;
    font-size: 17px;
    margin-left: 5px;
  }
  .box {
    padding-left: 7.5%;
  }
  .no-picture {
    font-weight: bold;
    color: #333;
    text-align: center;
    line-height: 55px;
    border: 1px solid #ebeef5;
    margin: 10px 0;
  }
}
</style>