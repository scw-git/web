<template>
  <div class="home-content">
    <a-carousel autoplay>
      <div>
        <img src="@/assets/carousel/4.jpg" alt />
      </div>
      <div>
        <img src="@/assets/carousel/2.jpg" alt />
      </div>
      <div>
        <img src="@/assets/carousel/3.jpg" alt />
      </div>
      <div>
        <img src="@/assets/carousel/1.jpg" alt />
      </div>
    </a-carousel>
    <!-- 猜你喜欢 -->
    <div class="fav">
      <div class="fav-title">
        <p style="color:#FF5500;border-left: 4px solid #ff4f25;">
          猜你喜欢
          <router-link
            :to="{path:'/recommend/recommendList'}"
            style="float:right;color:#FF5500"
          >更多 ></router-link>
        </p>
      </div>
      <div class="fav-content">
        <a-empty v-if="obj.recommend.length==0"></a-empty>
        <div class="items">
          <div
            class="item"
            v-for="(item,i) in obj.recommend"
            :key="i"
            @click="toRecommendDetail(item._id)"
          >
            <div class="img-wrap">
              <img :src="item.imgUrl[0].url" alt />
            </div>
            <h5>{{item.name}}</h5>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手机 -->
    <div class="fav">
      <div class="fav-title">
        <p style="color:#FF5500;border-left: 4px solid #ff4f25;">
          手机
          <router-link
            :to="{path:'/allProduct/allProductList',query:{type:'手机'}}"
            style="float:right;color:#FF5500"
          >更多 ></router-link>
        </p>
      </div>
      <div class="fav-content">
        <a-empty v-if="obj.phone.length==0"></a-empty>
        <div class="items">
          <div class="item" v-for="(item,i) in obj.phone" :key="i" @click="toDetail(item._id)">
            <div class="img-wrap">
              <img :src="item.imgUrl[0].url" alt />
            </div>
            <h5>{{item.name}}</h5>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fav">
      <div class="fav-title">
        <p style="color:#FF5500;border-left: 4px solid #ff4f25;">
          化妆品
          <router-link
            :to="{path:'/allProduct/allProductList',query:{type:'化妆品'}}"
            style="float:right;color:#FF5500"
          >更多 ></router-link>
        </p>
      </div>
      <div class="fav-content">
        <a-empty v-if="obj.cosmetic.length==0"></a-empty>
        <div class="items">
          <div class="item" v-for="(item,i) in obj.cosmetic" :key="i" @click="toDetail(item._id)">
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
      obj: {
        phone: [],
        cosmetic: [],
        recommend: []
      }
    };
  },
  created() {
    this.getRecommendData("", "recommend", true);
    this.getData("手机", "phone");
    this.getData("化妆品", "cosmetic");
    // console.log(this.obj);
  },
  methods: {
    getData(type, rename, recommend) {
      let params = {
        recommend,
        type,
        limit: 10
      };
      // console.log(params);
      //下面的要加个大括号，get方法携带的参数在params中。但后端获取是在query中
      //原来的请求方式是：axios.get('xxx',{params:{xxx:xxx}})
      this.$http.getProduct({ params }).then(res => {
        this.obj[rename] = res.data.data;
      });
    },
    getRecommendData(type, rename, recommend) {
      let params = {
        recommend,
        type
      };
      this.$http.getProduct({ params }).then(res => {
        let all = res.data.data;
        // 这里有个重大的bug，如果用getRandomArray方法（自己写的），则所有的商品数少于等于10个。前端页面会一直没有响应
        //用getRandomArrayElements，如果总数少于10，会出现undefined情况
        this.obj.recommend = this.getRandomArrayElements(all, 10);
        // console.log(this.obj.recommend);
      });
    },
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
    getRandomArray(arr, n) {
      let newArr = [];
      while (newArr.length < n) {
        let ran = Math.ceil(Math.random() * arr.length);
        if (ran < arr.length) {
          newArr.push(arr[ran]);
          arr.splice(ran, 1);
        }
      }
      return newArr;
    },

    toRecommendDetail(id) {
      this.$router.push({
        path: "/recommend/itemDetail",
        query: {
          id
        }
      });
    },
    toDetail(id) {
      this.$emit("isShow", "ok");
      this.$router.push({
        //query用path，params用name
        path: "/allProduct/itemDetail",
        query: {
          id
        }
      });
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
.home-content {
  margin: 5px 10%;
  img {
    width: 100%;
  }
  .fav {
    background: #fff;
    margin: 10px 0;
    width: 100%;
    height: 100%;
    .fav-title {
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
  }
}
</style>