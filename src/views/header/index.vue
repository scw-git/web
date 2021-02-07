<template>
  <div class="header">
    <div class="login-info">
      <span class="welcome">欢迎使用推荐系统</span>
      <span v-if="name">欢迎：{{name}}</span>
      <span v-if="name" style="cursor:pointer" @click="toShopping">【购物车】</span>
      <span v-if="name" style="cursor:pointer" @click="logout">【退出登录】</span>
      <span v-if="!name" class="login" @click="openLogin">亲，请登录哦</span>
      <span v-if="!name" class="register" @click="openRegister">注册</span>
    </div>
    <div class="body">
      <div class="logo">
        <img src="@/assets/img/logo2.png" alt />
      </div>
      <div class="search">
        <div class="search-wrap">
          <input type="text" placeholder="请输入商品名称" />
          <span>搜索</span>
        </div>
      </div>
    </div>
    <div class="cover" v-if="loginShow" @click="loginShow=false"></div>
    <div class="loginDiv" v-if="loginShow">
      <div class="login-infon">
        <h5
          v-if="showError"
          style="border:1px solid #ffb4a8;padding:2px 10px;background-color:#fef2f2;color:#6c6c6c"
        >账号或密码错误</h5>
        <a-form-model ref="loginForm" :model="loginForm" :rules="rules">
          <a-form-model-item prop="loginUserName">
            <!-- prop中的名字必须与v-model中的名字相同，否则一直校验错误 -->
            <!-- prop表单域字段，需要校验时必填。prop指定了在rules中用哪个规则，即校验规则-->
            <a-input v-model="loginForm.loginUserName" @keydown="verify" placeholder="请输入账号">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="loginPassWord">
            <a-input
              type="password"
              @keydown="verify"
              v-model="loginForm.loginPassWord"
              placeholder="请输入密码"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button class="login-btn" type="danger" @click="loginSubmitForm">登录</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <div class="cover" v-if="registerShow" @click="registerShow=false"></div>
    <div class="registerDiv" v-if="registerShow">
      <div class="register-infon">
        <a-form-model ref="registerForm" :model="registerForm" :rules="rules" v-bind="layout">
          <!--这里的v-bind不能简写-->
          <a-form-model-item label="用户名" has-feedback prop="userName">
            <a-input @keydown="verify" v-model="registerForm.userName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="密码" has-feedback prop="pw">
            <a-input type="password" v-model="registerForm.pw" @keydown="verify"></a-input>
          </a-form-model-item>
          <a-form-model-item label="确认密码" has-feedback prop="againPw">
            <a-input type="password" @keydown="verify" v-model="registerForm.againPw"></a-input>
          </a-form-model-item>
          <a-form-model-item label="性别" prop="gender">
            <a-radio-group v-model="registerForm.gender">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <!-- <a-form-model-item label="联系方式" prop="userName">
            <a-input v-model="registerForm.phone"></a-input>
          </a-form-model-item>-->
          <a-form-model-item label="联系方式" prop="myPhone">
            <a-input @keydown="verify" v-model="registerForm.myPhone"></a-input>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{span:14,offset:7}">
            <a-button class="register-btn" type="danger" @click="registerSubmitForm">注册</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //防抖（触发事件后，n秒内执行。在此期间再次触发，则时间重新计算）
    let checkPendding;
    let checkUserName = (rule, value, callback) => {
      clearTimeout(checkPendding);
      checkPendding = setTimeout(() => {
        if (value && value.length >= 2) {
          let params = {
            userName: value
          };
          this.$http.userName(params).then(res => {
            if (res.data.status == 404) {
              callback(new Error("用户名已经存在"));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error("请输入账号,长度为2~15"));
        }
      }, 600);
    };
    let password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.againPw !== "") {
          //检验的情况是，先输入确认密码。后输入密码
          this.$refs.registerForm.validateField("againPw");
        }
        callback();
      }
    };
    let configPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pw) {
        callback(new Error("两次密码不相同"));
      } else {
        callback();
      }
    };
    return {
      name: "",
      showError: false,
      loginShow: false,
      registerShow: false,
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      loginForm: {
        loginUserName: "",
        loginPassWord: ""
      },
      registerForm: {
        userName: "",
        pw: "",
        againPw: "",
        gender: "",
        myPhone: ""
      },

      rules: {
        userName: [
          { required: true, validator: checkUserName, trigger: "change" }
        ],
        pw: [{ required: true, validator: password, trigger: "change" }],
        againPw: [
          { required: true, validator: configPassWord, trigger: "change" }
        ],
        gender: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择性别！"
          }
        ],
        loginUserName: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        loginPassWord: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        myPhone: [
          //校验名字不能用phone，可能是关键字
          { required: true, trigger: "change", message: " 请输入联系电话" }
        ]
      }
    };
  },
  created() {
    this.name = window.sessionStorage.getItem("graduation-design");
  },
  methods: {
    toShopping() {
      this.$router.push({
        path: "/shoppingCar"
      });
    },
    verify(e) {
      //禁止输入空格
      if (e.keyCode == 32) {
        e.returnValue = false;
      }
    },
    onSearch() {},
    openLogin() {
      this.loginShow = true;
    },
    openRegister() {
      this.registerShow = true;
    },
    logout() {
      this.$confirm({
        title: "提示",
        content: "确认退出登录？",
        cancelText: "取消",
        onOk: () => {
          window.sessionStorage.removeItem("graduation-design");
          this.name = "";
        }
      });
    },
    loginSubmitForm() {
      this.showError = false;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            // 不能直接用解构，与后端的字段不一样
            userName: this.loginForm.loginUserName,
            pw: this.loginForm.loginPassWord
          };
          this.$http.login(params).then(res => {
            if (res.data.status) {
              this.showError = true;
            } else {
              window.sessionStorage.setItem(
                "graduation-design",
                res.data.userName
              );
              this.name = res.data.userName;
              this.$message.success("登录成功");
              this.loginShow = false;
            }
          });
        }
      });
    },
    registerSubmitForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let params = {
            ...this.registerForm
          };
          this.$http.register(params).then(res => {
            if (res.data.status === 200) {
              this.registerShow = false;
              this.$message.success("注册成功");
              this.name = window.sessionStorage.getItem("graduation-design");
              this.$refs.registerForm.resetFields();
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
<style lang="scss" scoped>
.header {
  .login-info {
    padding-top: 3px;
    margin-bottom: 10px;
    float: right;
    .welcome {
      color: #000;
      border-right: none;
    }
    span {
      font-size: 12px;
      padding-right: 5px;
      // border-right: 1px solid #ff3300;
      color: #ff3300;
    }
    .login {
      margin: 10px;
      cursor: pointer;
    }
    .register {
      cursor: pointer;
    }
  }
  .body {
    clear: both;
    display: flex;
    height: 80px;
    text-align: center;
    .logo {
      height: 100%;
      img {
        height: 100%;
      }
    }
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10%;
      .search-wrap {
        overflow: hidden;
        input {
          width: 400px;
          outline: none;
          padding: 2px 6px;
          border: 2px solid #ff3300;
          border-radius: 10px 0 0 10px;
        }
        span {
          background-color: #ff3300;
          color: #ffffff;
          padding: 10px;
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }
  .cover {
    position: fixed;
    background-color: rgba($color: #b1b1b1, $alpha: 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .loginDiv {
    border-radius: 10px;
    position: fixed;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e9e9f2;
    z-index: 99999;
    display: flex;
    justify-content: center;
    .login-infon {
      margin: 50px 0;
      .login-btn {
        width: 100%;
        margin-top: 25px;
      }
    }
  }
  .registerDiv {
    border-radius: 10px;
    position: fixed;
    width: 350px;
    height: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e9e9f2;
    z-index: 99999;
    display: flex;
    justify-content: center;
    .register-infon {
      margin-top: 20px;
      .register-btn {
        width: 100%;
        margin-top: 25px;
      }
    }
  }
}
</style>