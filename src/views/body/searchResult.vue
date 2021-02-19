<template>
  <div class="search-result">
    <div class="fav">
      <div class="title">搜索结果</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  watch: {
    $route() {
      this.getResult();
    }
  },
  created() {
    this.getResult();
  },
  methods: {
    getResult() {
      let params = {
        searchValue: this.$route.query.searchValue
      };
      this.$http.searchProduct({ params }).then(res => {
        this.data = res.data;
        console.log(res);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.search-result {
  background: #fff;
  img {
    width: 100%;
  }
  .title {
    width: 100%;
    color: #fff;
    padding: 5px 10px;
    background-color: #8558d6;
    margin-bottom: 5px;
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
}
</style>
