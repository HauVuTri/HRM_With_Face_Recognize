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
    // isCurrentTab(tab) {
    //   if (tab.title == this.currentTab) return true;
    //   return false;
    // },
    // handleClick(e) {
    //   console.log(e);
    //   switch (e.title) {
    //     case "Tổng quan":
    //       this.currentTab = e.title;
    //       this.$router.push("/general");
    //       break;
    //     case "Lao động":
    //       this.currentTab = e.title;
    //       this.$router.push("/employee-list");
    //       break;

    //     default:
    //       break;
    //   }
    // },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/app.scss";

.logo-app {
  width: 40px;
}
.current-tab {
  background-color: #b9f6ca;
  /* background-color: red; */
}
.main-wrap {
  // border: 1px solid #ffffff;
  border-radius: 4px;
}
</style>