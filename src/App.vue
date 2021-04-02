<template>
  <v-app>
    <v-app-bar
      app
      min-width="100%"
      color="indigo darken-2"
      dark
      clipped-left
    >
    <img src="~@/assets/images/hrm-logo.jpg" alt="" class="logo-app mx-3">
      <v-toolbar-title>Quản lý nhân sự</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      :color="color"
      :permanent="true"
      floating
      bottom
      hide-overlay
      clipped
      :transitionend="handleClick"
      v-model="drawer"

    >
      <v-list dense nav class="py-0">
        <v-list-item v-for="item in items" :key="item.title" link @click="handleClick(item)" :class="isCurrentTab(item)?'current-tab':''">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="main-wrap m-3">
        <div class="h-100">
        <router-view />

        </div>
      </div>
    </v-main>
  </v-app>
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
      currentTab:'Tổng quan',
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
    isCurrentTab(tab){
      if(tab.title == this.currentTab) return true;
      return false
    },
    handleClick(e){
      console.log(e);
      switch (e.title) {
        case "Tổng quan":
          this.currentTab = e.title  ;
          this.$router.push('/general')
          break;
        case "Lao động":
          this.currentTab = e.title  ;
          this.$router.push('/employee-list')
          break;
      
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.logo-app{
  width:40px
}
.current-tab{
  background-color: #B9F6CA
;
  /* background-color: red; */
}
.main-wrap{
  border: 1px solid #ffffff;
  border-radius:4px
}
</style>