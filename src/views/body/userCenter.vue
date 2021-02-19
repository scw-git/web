<template>
  <div class="user-center">
    <div class="title">用户中心</div>
    <div class="body">
      <div class="left">
        <a-menu
          style="width: 180px;height:60vh;"
          mode="vertical"
          @click="handleClick"
          :selectedKeys="selKey"
        >
          <a-menu-item key="userInfo">
            <a-icon type="user" />基本信息
          </a-menu-item>
          <a-menu-item key="changePassword">
            <a-icon type="lock" />修改密码
          </a-menu-item>
          <a-menu-item key="address">
            <a-icon type="home" />收货地址
          </a-menu-item>
          <a-menu-item key="myCount">
            <a-icon type="account-book" />我的订单
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <a-card style="height:100%;">
          <router-view></router-view>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selKey: ["userInfo"]
    };
  },
  created() {
    this.getRouter();
  },

  methods: {
    getRouter() {
      let router_path = this.$route.path;
      let i = router_path.indexOf("/userCenter/");
      if (i > -1) {
        this.selKey[0] = router_path.slice(i + 12);
      }
    },
    handleClick({ key }) {
      this.selKey[0] = key;
      this.$router.push({
        path: "/userCenter/" + key
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-center {
  .title {
    width: 100%;
    color: #fff;
    padding: 5px 10px;
    background-color: #8558d6;
    margin-bottom: 5px;
  }
  .body {
    display: flex;
    .right {
      margin-left: 5px;
      width: 100%;
    }
  }
}
</style>