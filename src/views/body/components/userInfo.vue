<template>
  <div class="user-info">
    <a-table
      :pagination="false"
      bordered
      :dataSource="dataForm"
      :rowKey="(record,index)=>{return index}"
    >
      <a-table-column title="用户名" data-index="userName"></a-table-column>
      <a-table-column title="电话号码" data-index="myPhone"></a-table-column>
      <a-table-column title="性别">
        <template slot-scope="record">
          <span v-if="record.gender==1">男</span>
          <span v-else>女</span>
        </template>
      </a-table-column>
      <a-table-column title="密码" data-index="pw"></a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForm: []
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getUsers({ params }).then(res => {
        this.dataForm = res.data;
      });
    }
  }
};
</script>
<style scoped>
</style>
