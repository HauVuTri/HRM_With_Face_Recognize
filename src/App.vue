<template>
  <router-view />
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    // HelloWorld,
  },
  data() {
    return {
      currentTab: "Tổng quan",
      drawer: false,
      items: [
        { title: "Tổng quan", icon: "mdi-view-dashboard" },
        { title: "Lao động", icon: "mdi-image" },
        { title: "Bổ nhiệm", icon: "mdi-help-box" },
        { title: "Điểm danh", icon: "mdi-help-box" },
        { title: "Nghỉ việc", icon: "mdi-help-box" },
        { title: "Thiết lập", icon: "mdi-help-box" },
      ],
      color: "blue lighten-5",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
    };
  },
  methods: {
    isCurrentTab(tab) {
      if (tab.title == this.currentTab) return true;
      return false;
    },
    handleClick(e) {
      console.log(e);
      switch (e.title) {
        case "Tổng quan":
          this.currentTab = e.title;
          this.$router.push("/general");
          break;
        case "Lao động":
          this.currentTab = e.title;
          this.$router.push("/employee-list");
          break;

        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.logo-app {
  width: 40px;
}
.current-tab {
  background-color: #b9f6ca;
  /* background-color: red; */
}
.main-wrap {
  border: 1px solid #ffffff;
  border-radius: 4px;
}
</style>