<template>
  <div class="my-count" style="height:100%;">
    <a-table
      :scroll="{y:370}"
      size="small"
      :loading="loading"
      :pagination="false"
      :data-source="dataAcount"
      :bordered="true"
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
          <span v-if="record.status=='未付款'">
            <a style="margin-right:3px;" @click="pay(record)">付款</a>
            <a @click="del(record._id,'取消')">/ 取消</a>
          </span>
          <a v-else @click="del(record._id,'删除')">删除</a>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataAcount: [],
      loading: false
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    pay(record) {
      this.$confirm({
        title: "支付提示",
        content: `需要支付 ${record.total}元`,
        cancelText: "取消",
        onOk: () => {
          let params = {
            userName: window.sessionStorage.getItem("graduation-design"),
            orderNumber: record.orderNumber,
            status: "已付款"
          };
          this.$http.updateOrder(params); //更新付款状态
          this.$message.success("支付成功");
          this.getOrder();
        }
      });
    },
    del(id, content) {
      this.$confirm({
        title: "提示",
        content: `确认${content}该订单？`,
        cancelText: "取消",
        onOk: () => {
          let params = {
            id
          };
          this.$http.delOrder({ params }).then(res => {
            if (res.data.status == 200) {
              this.$message.success(`${content}成功`);
              this.getOrder();
            }
          });
        }
      });
    },
    getOrder() {
      this.loading = true;
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getOrder({ params }).then(res => {
        this.dataAcount = res.data;
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
</style>
