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
          <a-button size="large" type="primary" :disabled="isShow" @click="account">结算</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // locale: { emptyText: "没有商品，快去购物吧" },
      tableData: [],
      isShow: true
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
    account() {
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getAddress({ params }).then(res => {
        if (res.data.msg) {
          //没有添加地址
          alert(11);
        } else {
          alert(22);
        }
      });
    },
    add(data) {
      if (data.count >= data.allCount) {
        this.$message.warning("库存不足啦!!");
      } else {
        data.count++;
      }
    },
    subtract(data) {
      if (data.count == 1) {
        this.$message.warning("不能再减了!!");
      } else {
        data.count--;
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
            // console.log(res);
            if (res.data.status == 200) {
              this.getShoppingItem(
                window.sessionStorage.getItem("graduation-design")
              );
            }
          });
        }
      });
    },
    getShoppingItem(userName) {
      let params = {
        userName
      };
      this.$http.getShoppingItem({ params }).then(res => {
        this.tableData = res.data;
        if (this.tableData.length > 0) {
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