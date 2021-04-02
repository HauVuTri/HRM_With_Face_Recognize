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
          text: "Mã nhân viên",
          sortable: false,
          value: "EmployeeCode",
          width:"150px",
          align:'center',
        },
        { text: "Họ và tên", value: "FullName",width:"100px",align:'center' },
        { text: "Giới tính", value: "Gender",align:'center',width:"100px" },
        { text: "Ngày sinh", value: "DateOfBirth",align:'center' },
        { text: "ĐT di động", value: "CellPhone",align:'center' },
        { text: "Email cơ quan", value: "OfficeEmail",align:'center' },
        { text: "Vị trí công việc", value: "JobPosition",align:'center' },
        { text: "Ngày thử việc", value: "ThuViecDay",align:'center' },
        { text: "Ngày chính thức", value: "ChinhThucDay",align:'center' },
        { text: "Loại hợp đồng", value: "ContractType",align:'center' },
        { text: "Trạng thái lao động", value: "ContractStatus",align:'center' },
        { text: "Ngày tham gia BHXH", value: "BXHHJoinDay",align:'center' },
        { text: "Tỷ lệ đóng", value: "PaymentRate",align:'center' },
        { text: "Số sổ BXHH", value: "SocialInsuranceBookNo",align:'center' },
        { text: "Mã số BHXH", value: "SocialInsuranceCode",align:'center' },
      ],
      lstEmployee: [
        {
          EmployeeCode:"EM001",
          FullName:"Vũ Trí Hậu",
          Gender:"Nam",
          DateOfBirth:"26/08/1998",
          CellPhone:"0984287005",
          OfficeEmail:"vutrihau1@gmail.com",
          JobPosition:"DEV",
          ThuViecDay:"20/02/2021",
          ChinhThucDay:"20/05/2021",
          ContractType:"Chính thức",
          ContractStatus:"Online",
          BXHHJoinDay:"20/04/2015",
          PaymentRate:5,
          SocialInsuranceBookNo:"128312312",
          SocialInsuranceCode:"12323002",
          
        }
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