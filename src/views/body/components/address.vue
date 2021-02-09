<template>
  <div class="address">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item label="收货人" prop="consignee">
        <a-input v-model="ruleForm.consignee"></a-input>
      </a-form-model-item>
      <a-form-model-item label="电话号码" prop="myPhone">
        <a-input type="phone" v-model="ruleForm.myPhone"></a-input>
      </a-form-model-item>
      <a-form-model-item label="收货地址" prop="address">
        <a-input v-model="ruleForm.address" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }"></a-input>
      </a-form-model-item>
    </a-form-model>
    <div style="display:flex;justify-content:center;">
      <a-button @click="save" type="primary">保存</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        consignee: "",
        myPhone: "",
        address: ""
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
      },
      rules: {
        consignee: [
          { required: true, trigger: "change", message: "收货人不能为空" }
        ],
        myPhone: [
          { required: true, trigger: "change", message: "电话号码不能为空" }
        ],
        address: [
          { required: true, trigger: "change", message: "地址不能为空" }
        ]
      }
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            ...this.ruleForm,
            userName: window.sessionStorage.getItem("graduation-design")
          };
          this.$http.address(params).then(res => {
            if (res.data.status) {
              this.$message.success("保存成功");
              this.getAddress();
            }
          });
        }
      });
    },
    getAddress() {
      let params = {
        userName: window.sessionStorage.getItem("graduation-design")
      };
      this.$http.getAddress({ params }).then(res => {
        if (res.data.userName) {
          this.ruleForm = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
