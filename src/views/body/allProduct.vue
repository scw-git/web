<template>
  <div class="detail">
    <div class="left">
      <div class="type">
        <span>所有商品分类</span>
      </div>
      <div class="type-item">
        <ul>
          <li
            @click="toItemList(item.type)"
            v-for="(item,i) in type"
            :key="i"
            :value="item.type"
          >{{item.type}}</li>
        </ul>
      </div>
      <div class="type" style="background-color:#9b2f9c">
        <span>猜你喜欢</span>
      </div>
      <div class="detail-item">
        <div class="items" v-for="(item,i) in data" :key="i">
          <div class="item" @click="toDetail(item._id)">
            <img v-if="data" :src="item.imgUrl[0].url" alt />
            <div class="content">
              <h4>{{item.name}}</h4>
              <span>
                价格：
                <span class="price">￥{{item.price}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contents">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: [],
      data: []
    };
  },
  created() {
    this.getProductType();
    this.$http.getProduct().then(res => {
      let data = res.data.data;
      this.data = this.getRandomArrayElements(data, 5);
    });
  },
  watch: {
    $route(to) {
      if (to.query.type) {
        let params = {
          type: to.query.type
        };
        this.$http.getProduct({ params }).then(res => {
          let data = res.data.data;
          this.data = this.getRandomArrayElements(data, 5);
        });
      }
    }
  },
  methods: {
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    //获取类型
    getProductType() {
      this.$http.getProductType().then(res => {
        this.type = res.data;
      });
    },
    toDetail(id) {
      this.$router.push({
        path: "/allProduct/itemDetail",
        query: {
          id
        }
      });
    },
    toItemList(type) {
      // console.log(6666, this.$route);
      this.$router.push({
        path: "/allProduct/allProductList",
        query: {
          type: type
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  margin: 10px 10%;
  display: flex;
  .left {
    flex-shrink: 0; //空间不足时，不收缩
    width: 188px;
    height: 100%;
    .type {
      height: 25px;
      background-color: #ff5f0f;
      span {
        color: #fff;
        margin: 5px 10px 5px;
        font-size: 12px;
      }
    }
    .type-item {
      ul {
        padding-left: 0px;
        list-style: none;
        font-weight: 700;
        border: 1px solid #e6e6e6;
        li {
          border-bottom: 1px solid #e6e6e6;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 12px;
          &:hover {
            background-color: #e9e8e8;
          }
        }
      }
    }
    .detail-item {
      border: 1px solid #dcdcdc;
      .items {
        .item {
          display: flex;
          margin: 10px;
          font-size: 10px;
          cursor: pointer;
          img {
            border: 1px solid #dcdcdc;
            padding: 2px;
            width: 50px;
            height: 50px;
          }
          .content {
            margin-left: 10px;
            h4 {
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .price {
              color: #ff5f0f;
            }
          }
        }
      }
    }
  }
  .contents {
    margin: 0 10px;
  }
}
</style>