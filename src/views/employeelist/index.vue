<template>
  <div class="wrap-content">
    <div class="main-title" style="background: #e5e5e5">
      <h3 class="ml-2 fs20p m-0">DANH SÁCH LAO ĐỘNG</h3>
    </div>
    <div class="user-list-toolbar row p-0 mt-1 mb-2">
      <div class="col-3 pb-0 pl-0 mr-3">
        <v-select
          :items="lstCategoryFilter"
          item-text="nameFilter"
          single-line
          return-object
          v-model="objectFilter"
          solo
          hide-details
          dense
        ></v-select>
      </div>
      <div class="col-3 pb-0 pl-0">
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="Tìm kiếm "
          single-line
          hide-details
          class="p-0 m-0"
        ></v-text-field>
      </div>
      <div class="d-flex justify-content-center align-items-center">
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
      height="calc(100vh - ( 255px ))"
      :headers="headers"
      :items="lstEmployee"
      :items-per-page="15"
      class="elevation-1 row-pointer"
      :search="searchText"
      item-key="employeeCode"
      show-select
      v-model="lstSelectedTable"
      :calculate-widths="true"
      @dblclick:row="editEmployee"
      @click:row="handleClick"
    >
      <template v-slot:item.birthDay="{ item }">
        {{ convertDateTimeToDayMonthYear(item.birthDay) }}
        <!-- {{item.birthDay}} -->
      </template>
      <template v-slot:item.gender="{ item }">
        {{ item.gender == 1 ? "Nam" : "Nữ" }}
        <!-- {{item.birthDay}} -->
      </template>
      <template v-slot:item.ContractStatus="{}"> Đang làm việc </template>
      <template slot="no-data"> Chưa có thông tin lao động </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="handleClickBtnEditItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="showConfirmDelete(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <!-- Confirm delete -->
    <v-dialog v-model="isShowDialogConfirm" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Xác nhận
        </v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa lao động này không?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="isShowDialogConfirm = false"> Không </v-btn>
          <v-btn color="green darken-1" text @click="handleClickYesDelete">
            Có
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Loader -->
    <v-dialog
      v-model="isShowLoader"
      hide-overlay
      persistent
      width="400"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Vui lòng chờ
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import ServiceProvincial from "@/services/provincial.js"
import ServiceEmployeeDetail from "@/services/employeedetail";
import MixinApp from "@/mixins/appMixin";
// src\assets\mixins\app.js
export default {
  name: "EmployeeList",
  mixins: [MixinApp],
  data() {
    return {
      /**
       * Loader khi load dữ liệu
       */
      isShowLoader:false,
      /**
       * Id của lao động đang được chọn để xóa
       */
      currentEmployeeSelectedToDeleteID:"",
      /**
       * Có show dialog confirm xóa lao động hay không?
       */
      isShowDialogConfirm:false,
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
          width: "150px",
          align: "center",
        },
        {
          text: "Họ và tên",
          value: "fullName",
          width: "200px",
          align: "center",
        },
        { text: "Giới tính", value: "gender", align: "center", width: "100px" },
        { text: "Ngày sinh", value: "birthDay", align: "center" },
        { text: "ĐT di động", value: "mobilePhone", align: "center" },
        { text: "Email cơ quan", value: "officeEmail", align: "center" },
        {
          text: "Trạng thái lao động",
          value: "ContractStatus",
          align: "center",
        },
        {
          text: "",
          value: "actions",
          align: "center",
        },
      ],
      lstEmployee: [],
    };
  },
  async created() {
    let lstEmployee = await ServiceEmployeeDetail.GetAllEmployeedetails();
    if (lstEmployee) {
      this.lstEmployee = lstEmployee;
    }
  },
  methods: {
    /**
     * Hàm lấy toàn bộ 
     */
    async getAllEmployee(){
      let lstEmployee = await ServiceEmployeeDetail.GetAllEmployeedetails();
      if (lstEmployee) {
        this.lstEmployee = lstEmployee;
      }

    },
    async handleClickYesDelete(){
      if(this.currentEmployeeSelectedToDeleteID){
        this.isShowDialogConfirm = false;
        await this.deleteItem(this.currentEmployeeSelectedToDeleteID);
      }
    },
    /**
     * Hàm sửa 1 lao động
     */
    handleClickBtnEditItem(item) {
      let employeeSelectedToEdit = item;
      if (employeeSelectedToEdit && employeeSelectedToEdit.employeeDetailId) {
        this.$router.push(
          `/employee-list/edit/${employeeSelectedToEdit.employeeDetailId}`
        );
      }
    },
    /**
     * Hàm show xác nhận có xóa lao động hay không
     */
    showConfirmDelete(item){
      if(item && item.employeeDetailId){
        /** gán id đang chọn vào biến tạm */
        this.currentEmployeeSelectedToDeleteID = item.employeeDetailId;
        //Show dialog lên
        this.isShowDialogConfirm = true
      }
    },
    /**
     * Hàm xóa 1 lao động
     */
    async deleteItem(employeeID) {
      if (employeeID ) {
        this.isShowLoader = true;
        var resDelete  = await ServiceEmployeeDetail.DeleteEmployeedetailByID(
          employeeID
        );
        this.isShowLoader = false;
        if (resDelete) {
          alert("Xóa lao động thành công");
        }
      }
    },
    handleClick(data) {
      console.log(data);
    },
    handleClickCreateEmployeeBtn() {
      this.$router.push("/employee-list/create");
    },
    /**
     * Hàm sửa 1 lao động
     */
    editEmployee(mouseEvent, data) {
      console.log(data);
      if (data && data.item) {
        let employeeSelectedToEdit = data.item;
        if (employeeSelectedToEdit && employeeSelectedToEdit.employeeDetailId) {
          this.$router.push(
            `/employee-list/edit/${employeeSelectedToEdit.employeeDetailId}`
          );
        }
      }
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
.row-pointer {
  &:hover {
    cursor: pointer;
  }
}
</style>