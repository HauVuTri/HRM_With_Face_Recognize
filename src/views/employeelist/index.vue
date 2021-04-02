<template>
  <div class="wrap-content">
    <div class="user-list-toolbar row p-0 mt-1">
      <div class="col-3 pb-0">
        <v-select
          :items="lstCategoryFilter"
          item-text="nameFilter"
          single-line
          return-object
          v-model="objectFilter"
          solo
          dense
        ></v-select>
      </div>
      <div class="col-3 pb-0">
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="p-0 m-0"
        ></v-text-field>
      </div>
      <div class="col-6">
        <v-btn
          elevation="2"
          @click="handleClickCreateEmployeeBtn"
          color="primary"
        >
          Thêm mới lao động
        </v-btn>
      </div>
    </div>
    <v-data-table
      height="calc(100vh - ( 225px ))"
      :headers="headers"
      :items="desserts"
      :items-per-page="15"
      class="elevation-1"
      :search="searchText"
      item-key="name"
      show-select
      v-model="lstSelectedTable"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Text để tìm kiếm trong table
       */
      searchText: "",
      /**
       * Danh sách các nhân viên đã selected trong table
       */
      lstSelectedTable: [],
      lstCategoryFilter: [
        {
          idFilter: "all",
          nameFilter: "Tất cả nhân viên",
        },
        {
          idFilter: "working",
          nameFilter: "Đang làm việc",
        },
        {
          idFilter: "offjob",
          nameFilter: "Đã nghỉ việc",
        },
        {
          idFilter: "probationary",
          nameFilter: "Thử việc",
        },
      ],
      objectFilter: {
        idFilter: "all",
        nameFilter: "Tất cả nhân viên",
      },
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  created() {},
  methods: {
    handleClickCreateEmployeeBtn() {
      this.$router.push("/employee-list/create");
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;
}
.v-data-table__wrapper {
  max-height: calc(100% - (58px));
}
.user-list-toolbar {
  padding: 16px 24px;
}
.el-table__header-wrapper {
  z-index: 100;
  position: fixed;
  top: 0;
}
</style>