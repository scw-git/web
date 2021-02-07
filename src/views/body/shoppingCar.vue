<template>
  <div class="shopping-car">
    <div class="title">购物车</div>
    <div class="items">
      <a-table :data-source="tableData" bordered :rowKey="(record,index)=>{return index}">
        <a-table-column title="商品名称" data-index="name"></a-table-column>
        <a-table-column title="价格" data-index="price"></a-table-column>
        <a-table-column title="数量" data-index="count"></a-table-column>
        <a-table-column title="日期" data-index="time"></a-table-column>
        <a-table-column title="操作">
          <template slot-scope="record">
            <a href="javascript:" @click="del(record._id)">删除</a>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "xx",
          price: 288,
          count: 2,
          time: 2021 - 2 - 7
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.shopping-car {
  margin: 10px 10%;

  .title {
    width: 100%;
    color: #fff;
    padding: 5px 10px;
    background-color: #8558d6;
  }
}
</style>