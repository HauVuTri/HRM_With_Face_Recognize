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
                :value="formatDateToDayMonthYear(dateSelectSearch)"
                label="Chọn ngày kiểm tra thông tin điểm danh"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="vi"
              v-model="dateSelectSearch"
              @input="isShowDatePicker.dateSelectSearch = false"
              @change="handleChangeDatePicker"
            ></v-date-picker>
          </v-menu>
        </div>
      </div>

      <div class="table-roll-call">
        <v-data-table
          height="calc(100vh - ( 255px ))"
          :headers="headers"
          :items="lstRollCallByPeriod"
          :items-per-page="15"
          class="elevation-1 "
          :search="searchText"
          item-key="name"
          show-select
          :calculate-widths="true"
          :sort-by.sync="sortBy"
        >
          <!-- <template v-slot:item.employeeDetail.birthDay="{ item }">
            {{ convertDateTimeToDayMonthYear(item.employeeDetail.birthDay) }}
          </template> -->

          <template v-slot:item.timeCheckin="{ item }">
            {{ getHourMinuteSecond(item.timeCheckin) }}
          </template>

          <template v-slot:item.employeeDetail.gender="{ item }">
            {{ item.employeeDetail.gender == 1 ? "Nam" : "Nữ" }}
          </template>

          <template v-slot:item.ContractStatus="{}"> Đang làm việc </template>
          
          <template v-slot:item.timeLate="{ item }"> {{item.lateTime}} </template>

           <template slot="no-data" >
             <div class="">
              Chưa có thông tin điểm danh của ngày này

             </div>
          </template>
           <!-- <template slot="body" >
             <div class="cursor-pointer">
             </div>
          </template> -->
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceRollCall from "@/services/rollcall";
export default {
  name: "RollCall",
  data() {
    return {
      sortBy:"employeeDetail.employeeCode",
      /**
       * Biến lưu trữ có hiển thị datepicker hay không
       */
      isShowDatePicker: {
        dateSelectSearch: false,
      },
      /**
       * Ngày tra cứu điểm danh của công ty
       */
      dateSelectSearch: null,

      /**
       * Kỳ đã chọn
       */
      // periodSelected: null,

      /**
       * Danh sách các kỳ đã có trong DB
       */
      lstPeriods: [
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
       * Thông tin điểm danh theo ngày
       */
      lstRollCallByPeriod: [],
      headers: [
        {
          text: "Mã nhân viên",
          value: "employeeDetail.employeeCode",
          width: "80px",
          align: "center",
        },
        {
          text: "Họ và tên",
          value: "employeeDetail.fullName",
          width: "180px",
          align: "center",
        },
        {
          text: "Giờ Check In",
          value: "timeCheckin",
          align: "center",
          width: "150px",
        },
        {
          text: "Số phút đến muộn/về sớm",
          value: "timeLate",
          align: "center",
          width: "180px",
        },
        {
          text: "Giới tính",
          value: "employeeDetail.gender",
          align: "center",
          width: "100px",
        },
       
        {
          text: "ĐT di động",
          value: "employeeDetail.mobilePhone",
          align: "center",
        },
        {
          text: "Email cơ quan",
          value: "employeeDetail.officeEmail",
          align: "center",
        },
        {
          text: "Trạng thái lao động",
          value: "ContractStatus",
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
      var timeCodePicked;
      if(data ){
        var datePicked = new Date(data)
        let date = datePicked.getDate().toString();
        if(date.length <2){
          date = "0"+ date;
        }
        let month =( datePicked.getMonth() +1).toString();
        if(month.length <2){
          month = "0"+ month;
        }
        let year = datePicked.getFullYear();
        timeCodePicked = `${date}${month  }${year}`
        console.log(timeCodePicked);
      }
      //Gọi service lấy thôgn tin điểm danh theo ngày đã Chọn
      if(timeCodePicked){
        //Gọi service lấy danh sách thông tin điểm danh mặc định theo ngày hiện tại
        var dataRollCallToDay = await ServiceRollCall.GetRollCallIncludeEmployeeByTimeCode(timeCodePicked);
        if (dataRollCallToDay && dataRollCallToDay.length > 0) {
          this.lstRollCallByPeriod = dataRollCallToDay;
        }
        else{
          this.lstRollCallByPeriod = []
        }
      }
    },
    /**
     * Hàm trả về thời gian đi muộn/ về sớm
     */
    getTimeLate(dateArrivedString){
      // debugger;
      console.log(dateArrivedString);
      if(dateArrivedString){
        var dateArrived = new Date(dateArrivedString)
        if(dateArrived){
          console.log(dateArrived);
          var currentDate = new Date();
          console.log(currentDate);
          //Điểm danh vào buổi sáng
          if(dateArrived.getHours() >7 && dateArrived.getHours() < 12){
            let diffTime = dateArrived - currentDate;
            console.log(diffTime);
            return diffTime;
          }
          else {
            let diffTime = dateArrived - currentDate;
            console.log(diffTime);
            return diffTime;
          }
        }

      }
    }
  },
  async created() {
    //Lấy thông tin ngày hôm nay gán cho biến "Chọn ngày thông tin điểm danh"
    var today = new Date();
    let date = today.getDate().toString();
    if(date.length <2){
      date = "0"+ date;
    }
    let month =( today.getMonth() +1).toString();
    if(month.length <2){
      month = "0"+ month;
    }
    let year = today.getFullYear();
    this.dateSelectSearch = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    //Gọi service lấy danh sách thông tin điểm danh mặc định theo ngày hiện tại
    var dataRollCallToDay = await ServiceRollCall.GetRollCallIncludeEmployeeByTimeCode(
      `${date}${month}${year}`
    );
    if (dataRollCallToDay && dataRollCallToDay.length > 0) {
      this.lstRollCallByPeriod = dataRollCallToDay;
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