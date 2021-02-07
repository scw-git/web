<template>
  <div class="item-list">
    <div class="fav">
      <div class="fav-title">
        <p v-if="title==''">推荐商品列表</p>
        <p v-else>{{title}}</p>
      </div>
      <div class="fav-content">
        <div class="items">
          <a-empty v-if="data.length==0" style="width:100%;height:200px;margin-top:25px"></a-empty>
          <div class="item" v-for="(item,i) in data" :key="i" @click="toDetail(item._id)">
            <div class="img-wrap">
              <img :src="item.imgUrl[0].url" alt />
            </div>
            <h5>{{item.name}}</h5>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <a-pagination
          v-model="pagination.currentPage"
          @change="changePagination"
          :total="total"
          :pageSize="pagination.limit"
          show-less-items
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      title: "",
      total: 0, //指的是所有的数据，每页显示的数量
      pagination: {
        limit: 10, //每页显示的数量
        currentPage: 1 //当前页
      }
    };
  },
  watch: {
    $route(to) {
      this.pagination.currentPage = 1;
      // console.log(777, to);
      this.getProductList(true, to.query.type);
      if (to.query.type) {
        this.title = to.query.type;
      } else {
        this.title = "";
      }
    }
  },
  created() {
    let type = "";
    if (this.$route.query.type) {
      type = this.$route.query.type;
    }
    this.getProductList(true, type);
    if (this.$route.query.type) {
      this.title = this.$route.query.type;
    } else {
      this.title = "";
    }
  },
  methods: {
    changePagination(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getProductList(true, this.$route.query.type);
      // this.getProductList(this.$route.query.recommend);
    },
    getProductList(recommend, type) {
      let params = {
        recommend,
        type,
        ...this.pagination
      };
      //get方法params一定要添加｛｝。原来是这么写的，{'xxx',params:{}}
      this.$http.getProduct({ params }).then(res => {
        this.data = res.data.data;
        this.total = res.data.count;
        // console.log(res);
      });
    },
    toDetail(id) {
      // console.log(66, this.$route);
      this.$router.push({
        path: "/recommend/itemDetail",
        query: {
          id
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.item-list {
  width: 752px;
  img {
    width: 100%;
  }
  .fav {
    background: #fff;
    width: 100%;
    height: 100%;
    .fav-title {
      width: 100%;
      padding: 20px 20px 10px 20px;
      border-bottom: 1px solid #f4f4f4;
      color: #ad46df;
      font-size: 16px;
      p {
        border-left: 4px solid #8558d6;
        padding-left: 10px;
      }
    }
    .fav-content {
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 20%;
          padding: 15px 15px;
          border: 1px solid #f4f4f4;
          letter-spacing: 1px;
          cursor: pointer;
          &:hover {
            border: 1px solid #ff4400;
          }
          h5 {
            color: #666;
            margin: 10px 0;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .price {
            color: #f40;
          }
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin: 40px 0;
      padding-bottom: 30px;
    }
  }
}
</style>