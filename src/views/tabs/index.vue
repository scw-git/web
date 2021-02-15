<template>
  <div class="tabs-content">
    <div class="tabs">
      <span class="home" @click="target='首页'" :class="{target:target=='首页'}">
        <router-link to="/homeContent">首页</router-link>
      </span>
      <span @click="target='推荐商品'" :class="{target:target=='推荐商品'}">
        <router-link :to="{path:'/recommend'}">推荐商品</router-link>
      </span>
      <span @click="target='全部商品'" :class="{target:target=='全部商品'}">
        <router-link to="/allProduct">全部商品</router-link>
      </span>
    </div>
    <router-view @isShow="handle"></router-view>
    <end />
  </div>
</template>
<script>
import end from "../end/index";
import homeContent from "../body/homeContent";
import allProduct from "../body/allProduct";
import shoppingCar from "../body/shoppingCar";
import userCenter from "../body/userCenter";

export default {
  components: {
    end,
    homeContent,
    allProduct,
    shoppingCar,
    userCenter
  },
  data() {
    return {
      target: "首页"
    };
  },
  created() {
    if (this.$route.path.includes("/allProduct")) {
      this.target = "全部商品";
    } else if (this.$route.path.includes("/recommend")) {
      this.target = "推荐商品";
    }
  },
  watch: {
    $route(to) {
      if (to.path.includes("/allProduct")) {
        this.target = "全部商品";
      } else if (to.path.includes("/recommend")) {
        this.target = "推荐商品";
      } else {
        this.target = "";
      }
    }
  },
  methods: {
    handle(msg) {
      //点击了某个物品，把选中的首页取消掉
      // console.log("msg", msg);
      if (msg == "ok") {
        this.target = "";
      }
    }
  }
};
</script>
<style  scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 360px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
<style lang="scss" scoped>
.tabs-content {
  $bar-lh: 50px; //高度为50px,行高也是
  .tabs {
    height: $bar-lh;
    width: 100%;
    background-color: #fd5632;
    background-image: linear-gradient(to right, #ff8300, #ff5800);
    color: #fff;
    line-height: $bar-lh;
    a {
      color: #fff;
    }
    .home {
      margin-left: 10%;
    }
    span {
      cursor: pointer;
      margin: 0 20px;
    }
    .target {
      border-bottom: 1.5px solid #fff;
      padding-bottom: 3px;
    }
  }
}
</style>