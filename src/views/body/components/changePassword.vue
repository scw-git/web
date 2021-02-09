<template>
  <div class="change-password">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
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

    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
      },
      ruleForm: {
        pw: "",
        confirmPw: ""
      },
      rules: {
        pw: [{ validator: password, trigger: "change" }],
        confirmPw: [{ validator: configPassWord, trigger: "change" }]
      }
    };
  },
  methods: {
    e() {
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
