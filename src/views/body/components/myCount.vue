<template>
  <div class="my-count" style="height:100%;">
    <a-table
      :scroll="{y:370}"
      size="small"
      :pagination="false"
      :data-source="dataAcount"
      bordered
      :rowKey="(record,index)=>{return index}"
    >
      <a-table-column title="订单号" data-index="orderNumber"></a-table-column>
      <a-table-column title="总计" data-index="total"></a-table-column>
      <a-table-column title="生成时间" data-index="date"></a-table-column>
      <a-table-column title="状态" data-index="status"></a-table-column>
      <a-table-column title="收货人" data-index="consignee"></a-table-column>
      <a-table-column title="收货地址" data-index="address"></a-table-column>
      <a-table-column title="联系方式" data-index="myPhone"></a-table-column>
      <a-table-column title="操作">
        <template slot-scope="record">
          <a v-if="record.status=='未付款'" @click="pay(record)">付款/取消</a>
          <a v-else>删除</a>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataAcount: []
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getOrder({ params }).then(res => {
        this.dataAcount = res.data;
        // console.log(res);
      });
    }
  }
};
</script>
<style scoped>
</style>
