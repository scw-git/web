<template>
  <div class="end">
    <div class="end-text">
      <div class="line">
        <div class="after" style="left: 90px;"></div>
        <i>END</i>
        <div class="after"></div>
      </div>
    </div>
    <div class="admin-entry">
      <a href="http://localhost:8086/" target="_blank">管理员入口</a>
    </div>
    <div class="helper">
      <a-row>
        <a-col :span="6">
          <a-icon type="safety-certificate" style="font-size:20px" />
          <span>消费者保障</span>
          <ul>
            <li>保障范围</li>
            <li>退货退款流程</li>
            <li>服务中心</li>
            <li>更多特色服务</li>
          </ul>
        </a-col>
        <a-col :span="6">
          <a-icon type="safety-certificate" style="font-size:20px" />
          <span>新手上路</span>
          <ul>
            <li>新手专区</li>
            <li>消费警示</li>
            <li>交易安全</li>
            <li>24小时在线帮助</li>
            <li>免费开店</li>
          </ul>
        </a-col>
        <a-col :span="6">
          <a-icon type="safety-certificate" style="font-size:20px" />
          <span>付款方式</span>
          <ul>
            <li>快捷支付</li>
            <li>信用卡</li>
            <li>余额宝</li>
            <li>蚂蚁花呗</li>
            <li>货到付款</li>
          </ul>
        </a-col>
        <a-col :span="6">
          <a-icon type="safety-certificate" style="font-size:20px" />
          <span>系统特色</span>
          <ul>
            <li>智能化</li>
            <li>推荐功能</li>
            <li>界面简洁</li>
          </ul>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>>
<style lang="scss" scoped>
.end {
  margin: 0 10%;
  .end-text {
    height: 50px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100px;
      i {
        font-style: normal;
        font-size: 18px;
        color: #ccccd0;
      }
      .after {
        position: absolute;
        top: 50%;
        left: -50px;
        width: 60px;
        height: 0;
        border-top: 1px solid #ccccd0;
      }
    }
  }
  .admin-entry {
    display: flex;
    justify-content: center;
    margin: 10px 0 30px;
    a {
      border: 1px solid #999;
      color: #999;
      padding: 2px 5px;
    }
  }
  .helper {
    padding-bottom: 50px;
    margin-left: 50px;
    span {
      margin-left: 5px;
    }
    ul {
      padding: 0;
      margin: 10px 15px 20px 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 15px;
        color: #999;
        font-size: 12px;
        line-height: 25px;
      }
    }
  }
}
</style>