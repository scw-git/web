<template>
  <div class="shopping-car">
    <div class="title">购物车</div>
    <a-card>
      <div class="items">
        <a-table
          :pagination="false"
          :data-source="tableData"
          bordered
          :rowKey="(record,index)=>{return index}"
        >
          <a-table-column title="商品名称">
            <template slot-scope="record">
              <img style="width:50px;height:50px;" :src="record.imgUrl" alt />
              <span style="margin-left:5px">{{record.name}}</span>
            </template>
          </a-table-column>
          <a-table-column title="价格">
            <template slot-scope="record">
              <span style="color:#ff0036">￥{{record.price}}</span>
            </template>
          </a-table-column>
          <a-table-column title="购买数量">
            <template slot-scope="record">
              <p>
                <span class="buy">
                  <a @click="subtract(record)">-</a>
                  <input type="text" v-model="record.count" @keydown="verifyNum" />
                  <a @click="add(record)">+</a>
                </span>
              </p>
            </template>
          </a-table-column>
          <a-table-column title="日期" data-index="time"></a-table-column>
          <a-table-column title="操作">
            <template slot-scope="record">
              <a style="color:#ff8000" href="javascript:" @click="del(record._id)">删除</a>
            </template>
          </a-table-column>
        </a-table>
        <div style="display:flex;flex-direction:row-reverse;margin-top:10px;">
          <a-button size="large" type="primary" :disabled="isShow" @click="buy">结算</a-button>
        </div>
      </div>
    </a-card>
    <a-modal :footer="null" :width="900" :maskClosable="false" v-model="visible" title="我的订单">
      <a-table
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
      </a-table>
      <div class="btn" style="display:flex;justify-content:center;margin-top:20px;">
        <a-button style="margin-right:30px;" @click="cancelBuy">取消</a-button>
        <a-button type="primary" style="margin-right:30px;" @click="laterBuy">稍后支付</a-button>
        <a-button type="primary" @click="buyNow">马上支付</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [], //购物车里面的数据
      isShow: true,
      visible: false,
      dataAcount: [], //点击购买生成的订单数据
      total: 0, //购物车商品的总价格
      orderNumber: "" //点击购买生成的订单号
    };
  },
  created() {
    this.getShoppingItem(window.sessionStorage.getItem("graduation-design"));
  },
  methods: {
    verifyNum(e) {
      if (!(e.keyCode <= 57 && e.keyCode >= 48) && e.keyCode != 8) {
        e.returnValue = false;
      }
    },
    getDate(type) {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      if (type == "orderNumber") {
        return `PD${y}${m}${d}${h}${minute}${s}`;
      } else if ((type = "date")) {
        return `${y}-${m}-${d} ${h}:${minute}`;
      }
    },
    //稍后支付
    laterBuy() {
      this.visible = false;
      this.delAllShoppingItem();
      this.$router.push({
        path: "/userCenter/myCount"
      });
    },
    //点击了马上支付
    buyNow() {
      let params = {
        userName: window.sessionStorage.getItem("graduation-design"),
        orderNumber: this.orderNumber,
        status: "已付款"
      };
      this.$http.updateOrder(params); //更新付款状态
      this.$message.success("支付成功");
      this.laterBuy();
    },
    //点击了取消
    cancelBuy() {
      let params = {
        id: this.dataAcount[0]._id
      };
      // 把生成的订单删除
      this.$http.delOrder({ params });
      this.visible = false;
    },
    //点击了结算
    buy() {
      // 算出总价
      for (let i of this.tableData) {
        this.total = 0; //先清除上次的缓存
        this.total = this.total + i.count * i.price;
      }
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getAddress({ params }).then(res => {
        if (res.data.msg) {
          //没有添加地址
          this.$message.warning("请先添加地址");
          this.$router.push({
            path: "/userCenter/address"
          });
        } else {
          this.visible = true;
          let { userName, address, consignee, myPhone } = res.data;
          let params = {
            userName,
            orderNumber: this.getDate("orderNumber"),
            total: this.total + ".00",
            date: this.getDate("date"),
            consignee,
            myPhone,
            address,
            status: "未付款"
          };
          this.$http.order(params).then(res => {
            this.dataAcount = res.data;
            this.orderNumber = res.data[0].orderNumber;
            // console.log(res.data);
          });
        }
      });
    },
    //更新购买数量
    updateNum(data) {
      // console.log(this.tableData);
      let params = {
        id: data._id,
        count: data.count
      };
      this.$http.updateShoppingItem(params);
    },
    add(data) {
      if (data.count >= data.allCount) {
        this.$message.warning("库存不足啦!!");
      } else {
        data.count++;
        this.updateNum(data);
      }
    },
    subtract(data) {
      if (data.count == 1) {
        this.$message.warning("不能再减了!!");
      } else {
        data.count--;
        this.updateNum(data);
      }
    },
    del(id) {
      this.$confirm({
        title: "提示",
        content: "确认删除该商品",
        cancelText: "取消",
        onOk: () => {
          let params = {
            id
          };
          this.$http.delShoppingItem({ params }).then(res => {
            if (res.data.status == 200) {
              this.getShoppingItem(
                window.sessionStorage.getItem("graduation-design")
              );
            }
          });
        }
      });
    },
    //删除购物车中所有商品
    delAllShoppingItem() {
      this.$http.delAllShoppingItem();
    },
    getShoppingItem(userName) {
      let params = {
        userName
      };
      this.$http.getShoppingItem({ params }).then(res => {
        this.tableData = res.data;
        if (res.data.length > 0) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.shopping-car {
  margin: 10px 10%;
  input {
    border: 1px solid #dcdcdc;
    outline: none;
    width: 40px;
    height: 22px;
    text-align: center;
  }
  .title {
    width: 100%;
    color: #fff;
    padding: 5px 10px;
    background-color: #8558d6;
    margin-bottom: 5px;
  }
  .items {
    .buy {
      height: 22px;
      overflow: hidden;
      a {
        padding: 2px 7px;
        color: #000;
        background-color: #ededed;
      }
    }
  }
}
</style>