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
      :items="lstEmployee"
      :items-per-page="15"
      class="elevation-1"
      :search="searchText"
      item-key="name"
      show-select
      v-model="lstSelectedTable"
      :calculate-widths="true"
      @dblclick:row="openLayoutEditEmployee "
      @click:row="handleClick"
    ></v-data-table>
  </div>
</template>

<script>
// import ServiceProvincial from "@/services/provincial.js"
import ServiceEmployeeDetail from "@/services/employeedetail"
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
          text: "Mã nhân viên",
          sortable: false,
          value: "employeeCode",
          width:"150px",
          align:'center',
        },
        { text: "Họ và tên", value: "fullName",width:"100px",align:'center' },
        { text: "Giới tính", value: "gender",align:'center',width:"100px" },
        { text: "Ngày sinh", value: "birthDay",align:'center' },
        { text: "ĐT di động", value: "mobilePhone",align:'center' },
        { text: "Email cơ quan", value: "officeEmail",align:'center' },
        { text: "Vị trí công việc", value: "JobPosition",align:'center' },
        { text: "Ngày thử việc", value: "ThuViecDay",align:'center' },
        { text: "Ngày chính thức", value: "ChinhThucDay",align:'center' },
        { text: "Loại hợp đồng", value: "ContractType",align:'center' },
        { text: "Trạng thái lao động", value: "ContractStatus",align:'center' },
      ],
      lstEmployee: [],
    };
  },
  async created() {
    let lstEmployee = await ServiceEmployeeDetail.GetAllEmployeedetails();
    if (lstEmployee){
      this.lstEmployee = lstEmployee;
      console.log(lstEmployee);
    }
},
  methods: {
    handleClick(data){
      console.log(data)
    },
    handleClickCreateEmployeeBtn() {
      this.$router.push("/employee-list/create");
    },
    /**
     * Mở giao diện chính sửa lao đọngo
     */
    openLayoutEditEmployee(mouseEvent,data){
      console.log(data);
      if (data && data.item){
        let employeeSelectedToEdit = data.item
        if(employeeSelectedToEdit && employeeSelectedToEdit.employeeDetailId){
          this.$router.push(`/employee-list/edit/${employeeSelectedToEdit.employeeDetailId}`)
        }
      }
    }
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