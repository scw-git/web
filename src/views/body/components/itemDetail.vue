<template>
  <div class="item-detail">
    <!-- 上部分 -->
    <div class="up">
      <a-row>
        <a-col :span="11">
          <a-carousel arrows>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="(item,i) in data.imgUrl" :key="i">
              <img style="height:350px;" :src="item.url" alt />
            </div>
          </a-carousel>
        </a-col>
        <a-col :span="12">
          <div class="content">
            <p class="title">{{data.name}}</p>
            <p>
              价格：
              <span style="color:red">￥{{data.price}}</span>
            </p>
            <p>
              商品类型：
              <span style="color:red">{{data.type}}</span>
            </p>
            <p>
              加入收藏：
              <span style="color:red">加入收藏</span>
            </p>
            <p>
              上架日期：
              <span>{{data.time}}</span>
            </p>
            <p>
              库存：
              <span>{{data.count}}</span>
            </p>
            <p>
              购买数量：
              <span class="buy">
                <a @click="subtract">-</a>
                <input type="text" v-model="buyNum" @keydown="verifyNum" />
                <!-- <input type="number" v-model="buyNum" @keyup="verifyNum" /> -->
                <a @click="add">+</a>
              </span>
            </p>
            <div class="shopping">
              <span @click="buyNow">立即购买</span>
              <span class="car" @click="addShopping">
                <a-icon type="shopping-cart" />加入购物车
              </span>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 下部分 -->
    <div class="down">
      <div class="card-container">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="宝贝详情">
            <p>{{data.desc}}</p>
          </a-tab-pane>
          <a-tab-pane key="2" tab="累计评论 0">
            <a-empty description="没有数据" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buyNum: 1,
      data: ""
      // shoppingItem: {
      //   userName: window.sessionStorage.getItem("graduation-design"),
      //   name: this.data.name,
      //   price: this.data.price,
      //   count: this.data.count
      //   // time: getDate()
      // }
    };
  },
  created() {
    //不能直接用传过来的数据渲染，如果在该页面刷新的话数据会清除。所以应该是根据传过来的_id重新请求数据
    this.getDetail(this.$route.query.id);
  },

  methods: {
    getDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return `${y}-${m}-${d}`;
    },
    getDetail(id) {
      let params = {
        id
      };
      this.$http.getProductDetail({ params }).then(res => {
        this.data = res.data;
      });
    },
    subtract() {
      if (this.buyNum == 1) {
        this.$message.warning("不能再减了!!");
      } else {
        this.buyNum--;
      }
    },
    add() {
      if (this.buyNum >= this.data.count) {
        this.$message.warning("不能在加了!!");
      } else {
        this.buyNum++;
      }
    },
    verifyNum(e) {
      console.log(e);
      if (!(e.keyCode <= 57 && e.keyCode >= 48) && e.keyCode != 8) {
        e.returnValue = false;
      }
    },
    buyNow() {
      if (!window.sessionStorage.getItem("graduation-design")) {
        this.$message.warning("请先登录在购物");
      } else {
      }
    },
    addShopping() {
      if (!window.sessionStorage.getItem("graduation-design")) {
        this.$message.warning("请先登录在购物");
      } else {
        let params = {
          ...this.data,
          userName: window.sessionStorage.getItem("graduation-design"),
          time: this.getDate()
        };
        console.log(params);
      }
    }
    //@keyup = xxx（前提是input 类型为text）
    // xxx(){
    //   this.buyNum = this.buyNum.replace(/\D/g, ""); //\D查找所有非数字字符
    // }
  }
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 350px;
  line-height: 100%;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #808080;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>
<style  >
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  /* padding: 24px; */
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  /* height: 120px; */
  margin-top: -16px;
}
.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}
.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}
.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  border-top: 2px solid #ff4400;

  color: red;
}
.ant-tabs-nav .ant-tabs-tab:hover {
  color: #000;
}
/* 清除输入框设置type=number时，去掉后面的上下按钮 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style scoped lang='scss'>
.item-detail {
  input {
    border: 1px solid #dcdcdc;
    outline: none;
    width: 40px;
    height: 22px;
    text-align: center;
  }
  border: 1px solid #dcdcdc;
  padding: 10px;
  .up {
    width: 740px;
    img {
      width: 100%;
    }
    .content {
      margin-left: 20px;
      p {
        padding-bottom: 10px;
      }
      .title {
        font-size: 16px;
        font-weight: 700;
        padding-bottom: 10px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        border-bottom: 1px solid #dcdcdc;
      }
      .buy {
        height: 22px;
        overflow: hidden;
        a {
          padding: 2px 7px;
          color: #000;
          background-color: #ededed;
        }
      }
      .shopping {
        span {
          padding: 3px 15px;
          &:nth-child(1) {
            border: 1px solid #f0cab6;
            color: #e5511d;
            background-color: #ffe4d0;
          }
          &:nth-child(2) {
            margin-left: 10px;
            border: 1px solid #f22d00;
            color: #fff;
            background-color: #f22d00;
            cursor: pointer;
          }
        }
      }
    }
  }
  .down {
    // border: 1px solid #dcdcdc;
    margin-top: 20px;
  }
}
</style>