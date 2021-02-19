<template>
  <div class="change-password">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item label="用户名" style="margin-bottom:10px;">
        <span style="font-size:20px;">{{userName}}</span>
      </a-form-model-item>
      <a-form-model-item label="输入旧密码" prop="oldPw">
        <a-input v-model="ruleForm.oldPw"></a-input>
      </a-form-model-item>
      <a-form-model-item label="输入新密码" prop="pw" hasFeedback>
        <a-input type="password" v-model="ruleForm.pw"></a-input>
      </a-form-model-item>
      <a-form-model-item label="确认新密码" prop="confirmPw" hasFeedback>
        <a-input type="password" v-model="ruleForm.confirmPw"></a-input>
      </a-form-model-item>
    </a-form-model>
    <div style="display:flex;justify-content:center;">
      <a-button type="primary" @click="e">修改</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let password = (rule, value, callback) => {
      if (value === "") {
        callback("请输入新密码");
      } else {
        if (this.ruleForm.confirmPw !== "") {
          this.$refs.ruleForm.validateField("confirmPw");
        }
        callback();
      }
    };
    let configPassWord = (rule, value, callback) => {
      if (value === "") {
        callback("请再次输入密码");
      } else if (value !== this.ruleForm.pw) {
        callback("两次密码不正确");
      } else {
        callback();
      }
    };
    let verifyOldPw = (rule, value, callback) => {
      if (value == "") {
        callback("不能为空");
      } else {
        if (this.tag == 1) {
          let params = {
            userName: window.sessionStorage.getItem("graduation-design")
          };
          this.$http.getUsers({ params }).then(res => {
            if (value == res.data[0].pw) {
              callback();
            } else {
              callback("原密码错误");
            }
          });
        } else {
          callback();
        }
      }
    };

    return {
      userName: window.sessionStorage.getItem("graduation-design"),
      tag: 0,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
      },
      ruleForm: {
        pw: "",
        confirmPw: "",
        oldPw: ""
      },
      rules: {
        pw: [{ validator: password, trigger: "change" }],
        confirmPw: [{ validator: configPassWord, trigger: "change" }],
        oldPw: [{ validator: verifyOldPw }]
      }
    };
  },
  methods: {
    e() {
      this.tag = 1;
      setTimeout(() => {
        this.tag = 0;
      }, 500);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm({
            title: "提示",
            content: "确定修改密码？",
            cancelText: "取消",
            onOk: () => {
              const userName = window.sessionStorage.getItem(
                "graduation-design"
              );
              let params = {
                pw: this.ruleForm.pw,
                userName
              };
              this.$http.updatePw(params).then(res => {
                if (res.data.status == 200) {
                  this.$router.push({
                    path: "/index"
                  });
                  //通知header中的index.vue组件，退出登录
                  this.$vue.$emit("changePw", "ok");
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
