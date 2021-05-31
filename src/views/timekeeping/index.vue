<template>
  <div class="rol-call-wrap">
    <div class="bg-white main-content">
      <div class="main-title pb-2" style="background: #e5e5e5">
        <h3 class="ml-2 fs20p">THÔNG TIN ĐIỂM DANH</h3>
      </div>
      <div class="row mx-0 mb-4 pt-2">
        <div class="col-3 p-0 mx-3">
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
            class="p-0 m-0"
          ></v-text-field>
        </div>
        <div class="col-3 p-0 ml-4">
          <v-menu
            v-model="isShowDatePicker.birthDay"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="monthSelectSearch"
                label="Chọn tháng tra cứu chấm công"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="monthSelectSearch"
              locale="vi"
              type="month"
              @input="isShowDatePicker.monthSelectSearch = false"
              @change="handleChangeDatePicker"
            ></v-date-picker>
          </v-menu>
        </div>
      </div>

      <div class="table-roll-call">
        <v-data-table
          height="calc(100vh - ( 255px ))"
          :headers="headers"
          :items="lstTimeKeepingByPeriod"
          :items-per-page="15"
          class="elevation-1 row-pointer"
          :search="searchText"
          item-key="employeeCode"
          :calculate-widths="true"
        >
          <template v-slot:item.birthDay="{ item }">
            {{ convertDateTimeToDayMonthYear(item.birthDay) }}
            <!-- {{item.birthDay}} -->
          </template>
          <template v-slot:item.employeeDetail.gender="{ item }">
            {{ item.employeeDetail.gender == 1 ? "Nam" : "Nữ" }}
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
      </div>
    </div>
  </div>
</template>

<script>
import ServiceTimeKeeping from "@/services/timekeeping";
export default {
  name: "TimeKeeping",
  data() {
    return {
      sortBy:"employeeDetail.employeeCode",
      /**
       * Biến lưu trữ có hiển thị datepicker hay không
       */
      isShowDatePicker: {
        monthSelectSearch: false,
      },
      /**
       * tháng tra cứu điểm danh của công ty
       */
      monthSelectSearch: null,

      /**
       * Kỳ đã chọn
       */
      // periodSelected: null,

      /**
       * Danh sách các kỳ đã tồn tại/ có trong DB
       */
      lstPeriodsExisted: [
        {
          year: 2020,
          month: 11,
          periodName: "11/2020",
        },
      ],
      /**
       * Text để tìm kiếm trong table
       */
      searchText: "",
      /**
       * Thông tin Chấm CÔNG theo kỳ
       */
      lstTimeKeepingByPeriod: [],
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
        { text: "Số công trong tháng", value: "", align: "center" },
        { text: "Giới tính", value: "employeeDetail.gender", align: "center", width: "100px" },
        { text: "ĐT di động", value: "employeeDetail.mobilePhone", align: "center" },
        { text: "Email cơ quan", value: "employeeDetail.officeEmail", align: "center" },
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
    };
  },

  /**
   * Các phương thức
   */
  methods: {
    /**
     * Xử lý việc thay đổi ngày khi kiểm tra điểm danh theo ngày
     */
    async handleChangeDatePicker(data){
      console.log(data);
      // var timeCodePicked;
      // if(data ){
      //   var datePicked = new Date(data)
      //   let date = datePicked.getDate().toString();
      //   if(date.length <2){
      //     date = "0"+ date;
      //   }
      //   let month =( datePicked.getMonth() +1).toString();
      //   if(month.length <2){
      //     month = "0"+ month;
      //   }
      //   let year = datePicked.getFullYear();
      //   timeCodePicked = `${date}${month  }${year}`
      //   console.log(timeCodePicked);
      // }
      // //Gọi service lấy thôgn tin điểm danh theo ngày đã Chọn
      // if(timeCodePicked){
      //   //Gọi service lấy danh sách thông tin điểm danh mặc định theo ngày hiện tại
      //   var dataRollCallToDay = await ServiceRollCall.GetRollCallIncludeEmployeeByTimeCode(timeCodePicked);
      //   if (dataRollCallToDay && dataRollCallToDay.length > 0) {
      //     this.lstTimeKeepingByPeriod = dataRollCallToDay;
      //   }
      //   else{
      //     this.lstTimeKeepingByPeriod = []
      //   }
      // }
    },
    
  },
  async created() {
    //Lấy thông tin ngày hôm nay gán cho biến "Chọn ngày thông tin điểm danh"
    var today = new Date();
   
    let month =( today.getMonth() +1).toString();
    if(month.length <2){
      month = "0"+ month;
    }
    let year = today.getFullYear();
    this.monthSelectSearch = `${today.getFullYear()}-${
      month
    }`;

    //Gọi service lấy danh sách thông tin điểm danh mặc định theo tháng ngay gần trước đó
    var dataTimeKeeping = await ServiceTimeKeeping.GetTimeKeepingIncludeEmployeeByTimeCode(
      `${month}/${year}`
    );
    if (dataTimeKeeping && dataTimeKeeping.length > 0) {
      this.lstTimeKeepingByPeriod = dataTimeKeeping;
    }
  },
};
</script>

<style lang="scss">
.rol-call-wrap {
  .main-content {
    // height: calc(100vh - (115px)) !important;
  }
}
.v-text-field {
  padding: 0 !important;
}
</style>