<template>
  <div class="index">
    <div class="header">
      <Header class="index-header" />
    </div>
    <div class="body">
      <tabs />
    </div>
  </div>
</template>
<script>
import Header from "./header/index";
import tabs from "./tabs/index";
export default {
  components: {
    Header,
    tabs
  }
};
</script>
<style lang="scss" scoped>
.index {
  width: 1200px;
  background-color: #f4f4f4;
  .index-header {
    padding: 0 10%;
  }
}
</style>