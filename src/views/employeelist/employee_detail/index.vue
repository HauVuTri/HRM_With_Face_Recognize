<template>
  <div>
    <div class="common-info">
      <div class="row m-0">
        <div class="left-side col-3">
          <div class="avatar d-flex justify-content-center MT-3">
            <v-avatar color="primary" size="56">{{getAvatarName(EmployeeInfo.fullName) || "NV"}}</v-avatar>
          </div>
          <div class="d-flex justify-content-center mt-2">
            <div class="name sub-label fs20p" style="font-weight:500">{{EmployeeInfo.fullName || "Tên lao động"}}</div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="employee-code-common sub-label">{{EmployeeInfo.employeeCode || "Mã lao động"}}</div>
          </div>
        </div>

        <div class="right-side col-9">
          <div class="h-50">
            <div class="row">
              <div class="col-4">
                <div class="sub-label">Ngày sinh</div>
                <div class="sub-info">{{formatDateToDayMonthYear(EmployeeInfo.birthDay)}}</div>
              </div>
              <div class="col-4">
                <div class="sub-label">Ngày thử việc</div>
                <div class="sub-info">26/08/2020</div>
              </div>
              <div class="col-4">
                <div class="sub-label">Ngày chính thức</div>
                <div class="sub-info">26/08/2021</div>
              </div>
            </div>
          </div>
          <div class="h-50 mt-3">
            <div class="row">
              <div class="col-4">
                <div class="sub-label">ĐT di động</div>
                <div class="sub-info">{{EmployeeInfo.mobilePhone}}</div>
              </div>
              <div class="col-4">
                <div class="sub-label">Email cơ quan</div>
                <div class="sub-info">{{EmployeeInfo.officeEmail}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-info mt-3">
      <div class="wrap-common-info p-4 bg-white mb-4">
        <div class="wrap-content">
          <div class="big-title font-weight-bold">Thông tin cơ bản</div>
          <div class="common-info-empl row">
            <div class="sub-title col-12">Thông tin chung</div>
            <div class="col-6">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span >Mã nhân viên </span>
                </div>
                <div class="col-8">
                  <input :class="!$v.EmployeeInfo.employeeCode.required && clickedSave?'invalid':''" v-model="EmployeeInfo.employeeCode" type="text" />
                  <small class="text-danger" v-if="!$v.EmployeeInfo.employeeCode.required && clickedSave">{{msgValidate.requiredField}}</small>
                </div>
              </div> 
              
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Họ và tên </span>
                </div>
                <div class="col-8">
                  <!-- <input v-model="EmployeeInfo.fullName" type="text" /> -->
                  <input  :class="!$v.EmployeeInfo.fullName.required && clickedSave?'invalid':''" v-model="$v.EmployeeInfo.fullName.$model" type="text" />
                  <small class="text-danger" v-if="!$v.EmployeeInfo.fullName.required && clickedSave">{{msgValidate.requiredField}}</small>
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Giới tính </span>
                </div>
                <div class="col-8 mw-400p">
                  <v-select
                    v-model="EmployeeInfo.gender"
                    :items="directoryData.genderData"
                    item-text="name"
                    item-value="id"
                    label="Chọn giới tính"
                    single-line
                 ></v-select>
                  <!-- <input v-model="EmployeeInfo.gender" type="text" /> -->
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Ngày sinh </span>
                </div>
                <div class="col-8" style="max-width:400px">
                  <v-menu
                    v-model="isShowDatePicker.birthDay"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToDayMonthYear(EmployeeInfo.birthDay)"
                        label="Chọn ngày sinh"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      v-model="EmployeeInfo.birthDay"
                      @input="isShowDatePicker.birthDay = false"
                    ></v-date-picker>
                  </v-menu>
                  <!-- <input v-model="EmployeeInfo.employeeCode" type="text" /> -->
                </div>
              </div>
            </div>
            <!-- <div class="col-2"></div> -->
            <div class="col-6 pl-0">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Nơi sinh </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.placeOfBirth" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Dân tộc </span>
                </div>
                <div class="col-8">
                  <!-- <v-select
                    v-model="select"
                    :hint="`${select.state}, ${select.abbr}`"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select> -->
                  <input v-model="EmployeeInfo.ethnic" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Tôn giáo </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.religion" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div class="id-info-empl row">
            <div class="sub-title col-12">CMND/Thẻ căn cước/Hộ chiếu</div>
            <div class="col-6">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Số CMND/TCC </span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.identifyCardNumber"
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Ngày cấp CMND/TCC </span>
                </div>
                <div class="col-8 mw-400p">
                  <v-menu
                    v-model="isShowDatePicker.identityCardDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToDayMonthYear(EmployeeInfo.identityCardDate)"
                        label="Chọn ngày cấp CMND"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      v-model="EmployeeInfo.identityCardDate"
                      @input="isShowDatePicker.identityCardDate = false"
                    ></v-date-picker>
                  </v-menu>
                  <!-- <input v-model="EmployeeInfo.identityCardDate" type="text" /> -->
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Nơi cấp </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.identityCardPlace" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Ngày hết hạn </span>
                </div>
                <div class="col-8 mw-400p">
                  <v-menu
                    v-model="isShowDatePicker.identityCardEndDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToDayMonthYear(EmployeeInfo.identityCardEndDate)"
                        label="Chọn ngày hết hạn"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      v-model="EmployeeInfo.identityCardEndDate"
                      @input="isShowDatePicker.identityCardEndDate = false"
                    ></v-date-picker>
                  </v-menu>
                  <!-- <input
                    v-model="EmployeeInfo.identityCardEndDate"
                    type="text"
                  /> -->
                </div>
              </div>
            </div>
            <!-- <div class="col-2"></div> -->
            <div class="col-6 pl-0">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Số hộ chiếu </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.passportNumber" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Ngày cấp hộ chiếu </span>
                </div>
                <div class="col-8 mw-400p">
                  <v-menu
                    v-model="isShowDatePicker.passportDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToDayMonthYear(EmployeeInfo.passportDate)"
                        label="Chọn ngày cấp hộ chiếu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      v-model="EmployeeInfo.passportDate"
                      @input="isShowDatePicker.passportDate = false"
                    ></v-date-picker>
                  </v-menu>
                  <!-- <input v-model="EmployeeInfo.passportDate" type="text" /> -->
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Nơi cấp hộ chiếu </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.passportPlace" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Ngày hết hạn hộ chiếu </span>
                </div>
                <div class="col-8 mw-400p">
                  <v-menu
                    v-model="isShowDatePicker.passportEndDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToDayMonthYear(EmployeeInfo.passportEndDate)"
                        label="Chọn ngày hết hạn"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      v-model="EmployeeInfo.passportEndDate"
                      @input="isShowDatePicker.passportEndDate = false"
                    ></v-date-picker>
                  </v-menu>
                  <!-- <input v-model="EmployeeInfo.passportEndDate" type="text" /> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-contact-info p-4 bg-white">
        <div class="wrap-content">
          <div class="big-title font-weight-bold">Thông tin liên hệ</div>
          <div class="phone-info-empl row">
            <div class="sub-title col-12">Số điện thoại/Email/Khác</div>
            <div class="col-6">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Điện thoại di động </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.mobilePhone" type="number" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Điện thoại cơ quan</span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.officePhone" type="number" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Điện thoại nhà riêng </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.homePhone" type="number" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Điện thoại khác </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.otherPhone" type="number" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Email </span>
                </div>
                <div class="col-8">
                  <input  v-model="EmployeeInfo.email" type="email" />
                </div>
              </div>
            </div>
            <div class="col-6 pl-0">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Email cơ quan </span>
                </div>
                <div class="col-8">
                  <input  :class="!$v.EmployeeInfo.officeEmail.email?'invalid':''" v-model="EmployeeInfo.officeEmail" type="email" />
                  <small class="text-danger" v-if="!$v.EmployeeInfo.officeEmail.email">
                    {{msgValidate.emailFormat}}
                  </small>
                </div>
              </div>
              
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Email khác </span>
                </div>
                <div class="col-8">
                  <input :class="!$v.EmployeeInfo.otherEmail.email?'invalid':''" v-model="EmployeeInfo.otherEmail" type="email" />
                  <small class="text-danger" v-if="!$v.EmployeeInfo.otherEmail.email">
                    {{msgValidate.emailFormat}}
                  </small>
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Skype </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.skype" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Facebook </span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.facebook" type="text" />
                </div>
              </div>
            </div>
          </div>

          <div class="residence-info-empl row">
            <div class="sub-title col-12">Hộ khẩu thường trú</div>
            <div class="col-6">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Địa chỉ</span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.residenceFullAddress"
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Quốc tịch </span>
                </div>
                <div class="col-8">
                  <v-combobox
                    v-model="EmployeeInfo.residenceCountry"
                    :items="directoryData.nationalityData"
                    item-text="nationalityName"
                    item-value="nationalityName"
                    label="Chọn quốc tịch "
                    @select="handleSelectResidenceNationality"
                    :return-object="false"
                  ></v-combobox>
                  <!-- <input
                    v-model="EmployeeInfo.ResidenceNationality"
                    type="text"
                  /> -->
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Tỉnh/Thành phố </span>
                </div>
                <div class="col-8 mw-400p">
                 <v-combobox
                    :value="EmployeeInfo.residenceProvince "
                    :items="directoryData.provincesData"
                    item-text="provincialName"
                    item-value="provincialName"
                    label="Chọn tỉnh/thành phố "
                    @change="handleSelectResidenceProvince"
                    
                  ></v-combobox>
                </div>
              </div>
              
            </div>
            <!-- <div class="col-2"></div> -->
            <div class="col-6 pl-0">
              
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Quận/Huyện </span>
                </div>
                <div class="col-8">
                  <v-combobox
                    :value="EmployeeInfo.residenceDistrict "
                    :items="directoryData.districtData"
                    item-text="districtName"
                    item-value="districtName"
                    label="Chọn Quận/Huyện "
                    @change="handleSelectResidenceDistrict"
                  ></v-combobox>
                  <!-- <input v-model="EmployeeInfo.residenceDistrict" type="text" /> -->
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Xã/Phường</span>
                </div>
                <div class="col-8">
                  <v-combobox
                    :value="EmployeeInfo.residenceWard"
                    :items="directoryData.wardData"
                    item-text="wardName"
                    item-value="wardName"
                    label="Chọn Xã/Phường "
                    @change="handleSelectResidenceWard"
                  ></v-combobox>
                </div>
              </div>
            </div>
          </div>
          <div class="Urgent-info-empl row">
            <div class="sub-title col-12">Liên hệ khẩn cấp</div>
            <div class="col-6">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Họ và tên</span>
                </div>
                <div class="col-8">
                  <input v-model="EmployeeInfo.urgentContactName" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>ĐT di động </span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.urgentContactPhone"
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Quan hệ </span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.urgentContactRelationship"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-2"></div> -->
            <div class="col-6 pl-0">
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>email </span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.urgentContactEmail"
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-4 d-flex align-items-center">
                  <span>Địa chỉ </span>
                </div>
                <div class="col-8">
                  <input
                    v-model="EmployeeInfo.urgentContactAddress"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer bg-white d-flex justify-content-end">
      <div class="mb-3 mr-5">
        <button
          @click="handleSaveEmployee"
          class="btn btn-primary mr-3"
          style="width: 80px"
        >
          Lưu
        </button>
        <button
          @click="handleCancle"
          class="btn btn-secondary"
          style="width: 80px"
        >
          Hủy
        </button>
      </div>
    </div>
    <div class="text-center">
    <v-dialog
      v-model="isShowDialog"
      width="500"
    >
      <v-card>
        <v-card-title  class="headline grey lighten-2">
          Thông báo
        </v-card-title>

        <v-card-text>
          {{contentDialog}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="isShowDialog = false"
          >
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
</template>

<script>
import ServiceProvincial from "@/services/provincial"
import ServiceEmployeeDetail from "@/services/employeedetail"
import ServiceNationality from "@/services/nationality"
import ServiceAdministrativeArea from "@/services/administrativearea"
import { required,minLength,email } from 'vuelidate/lib/validators'
export default {
  props: {
    // editDetail: {
    //   type: Object,
    // },
  },
  data() {
    return {
      /**
       * Biến chứa các message validate
       */
      msgValidate:{
        emailFormat:"Bạn cần nhập đúng định dạng email",
        requiredField:"Trường này là trường bắt buộc"
      },
      contentDialog:"Lưu thông tin lao động thất bại. Vui lòng thử lại sau",
      isShowDialog:false,
      /**
       * Đã click nút lưu hay chưa
       */
      clickedSave:false,
      /**
       * Kiểu của alert
       */
      typeAlert:"success",
      /**
       * Có hiện Alert hay không
       */
      isShowAlert:true,
      directoryData:{
        provincesData:[],
        genderData:[
          {
            name:"Nam",
            id:1
          },
          {
            name:"Nữ",
            id:0
          }
        ],
        nationalityData:[],
        districtData:[],
        wardData:[],
      },
      EmployeeInfo: {
        fullName: null,
        employeeCode: null,
        employeeDetailId: this.uuidv4(),
        gender: 1,
        birthDay: null,
        placeOfBirth: null,
        maritalStatus: null,
        personalTaxCode: null,
        ethnic: null,
        religion: null,
        nationalityName: null,
        nationalityID: null,
        identifyCardNumber: null,
        identityCardDate: null,
        identityCardPlace: null,
        identityCardEndDate: null,

        passportNumber: null,
        passportDate: null,
        passportPlace: null,
        passportEndDate: null,
        educationalLevel: null,
        trainingLevel: null,
        trainingPlace: null,
        schoolYear: null,
        specialized: null,
        graduationYear: null,
        classificationLearn: null,

        mobilePhone: null,
        officePhone: null,
        homePhone: null,
        otherPhone: null,
        email: null,
        officeEmail: null,
        otherEmail: null,
        skype: null,
        facebook: null,
        /**
         * Địa chỉ thường trú
         */
        residenceCountry: null,
        residenceProvince: null,
        residenceDistrict: null,
        residenceWard: null,
        residenceStreet: null,
        residenceFullAddress: null,

        urgentContactName: null,
        urgentContactPhone: null,
        urgentContactRelationship: null,
        urgentContactEmail: null,
        urgentContactAddress: null,
      },
      isShowDatePicker:{
        birthDay:false,
        identityCardDate:false,
        identityCardEndDate:false,
        passportDate:false,
        passportEndDate:false,
        residenceProvince:false,
      }
        // false,
    };
  },
  validations: {

    EmployeeInfo:{
      fullName:{
        required,
        minLength: minLength(4)
      },
      employeeCode:{
        required,
      },
      email:{
        email
      },
      officeEmail:{
        email
      },
      otherEmail:{
        email
      }
    },
    // name: {
    //   required,
    //   minLength: minLength(4)
    // },
    // age: {
    //   between: between(20, 30)
    // }
  },
  methods: {
    
    /**
     * CHuẩn bị dữ liệu để binding ra giao diện
     * 
     */
    prepareDataToBindingToLayout(data){
      //Xử lý các trường data -> chuyển từ dạng dateTime về isoFormat để hiển thị trong isShowDatePicker
      var dateFields = ["birthDay","identityCardDate","identityCardEndDate","passportDate","passportEndDate"]
      for (let index = 0; index < dateFields.length; index++) {
        if (data[dateFields[index]]) {
          data[dateFields[index]] = this.convertDateTimeToISOTime(data[dateFields[index]])
        }
      }
      return data;
    },
    /**
     * xử lý sau khi chọn xã(HỘ KHẨU THƯỜNG TRÚ)
     */
    handleSelectResidenceWard(data){
       if (data && data.districtName){
         this.EmployeeInfo.residenceWard = data.districtName
       }
    },
    /**
     * xử lý sau khi chọn tỉnh(HỘ KHẨU THƯỜNG TRÚ)
     */
    async handleSelectResidenceProvince(data){
      try {
        if (data && data.provincialCode){
          this.EmployeeInfo.residenceProvince = data.provincialName
          // gọi service lấy danh mục quận huyện theo tỉnh
          var res = await ServiceAdministrativeArea.getAdministrativeAreasByParentCode(1,data.provincialCode)
          if (res.code == 200){
            let lstHuyen = res.data
            if (lstHuyen){
              this.directoryData.districtData = lstHuyen
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * xử lý sau khi chọn huyện(HỘ KHẨU THƯỜNG TRÚ)
     */
    async handleSelectResidenceDistrict(data){
      console.log(data)
      try {
        if (data && data.districtCode){
          this.EmployeeInfo.residenceDistrict = data.districtName;
          // gọi service lấy danh mục quận huyện theo tỉnh
          var res = await ServiceAdministrativeArea.getAdministrativeAreasByParentCode(2,data.districtCode)
          if (res.code == 200){
            let lstXa = res.data
            if (lstXa){
              this.directoryData.wardData = lstXa
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleSelectResidenceNationality(){


    },
    /**
     * Chuẩn bị dữ liệu trước khi lưu
     */
    formatBeforeSave(){
      if(this.EmployeeInfo){
        var dataResonse = Object.assign({},this.EmployeeInfo )
        //Xử lý các trường data -> chuyển từ dạng dateTime về isoFormat để hiển thị trong isShowDatePicker
        var dateFields = ["birthDay","identityCardDate","identityCardEndDate","passportDate","passportEndDate"]
        for (let index = 0; index < dateFields.length; index++) {
          if (dataResonse[dateFields[index]]) {
            dataResonse[dateFields[index]] = this.convertISOTimeToDateTime(dataResonse[dateFields[index]])
          }
        }
        return dataResonse;
      }
    },
    convertISOTimeToDateTime(isotime) {
            // var dateReturn;
            if (isotime) {
                var date = new Date(isotime)
                return date.toJSON();
            }
            return null;
        },
    /**
     * Chuyển từ datetime sang dạng iso time format 
     */
    convertDateTimeToISOTime(datetimeString) {
        var dateReturn;
        console.log(1888887)
        if (datetimeString) {
            dateReturn = new Date(datetimeString);
            let day = dateReturn.getDate();
            let month = dateReturn.getMonth() + 1;
            let year = dateReturn.getFullYear();
            console.log(`${year}/${month}/${day}`);
            return `${year}-${month}-${day}`;

        }
        return null;
    },

    getAvatarName(name){
      if(name){
        var splited = name.split(" ");
        var response = ""
        splited.forEach(element => {
          let firstChar = element.charAt(0).toUpperCase();

          if(firstChar){
            response += firstChar;
          }
        });
        return response
        }
      return null;
      
    },
    /**
     * Validate dữ liệu trước khi lưu
     */
    validateDataBeforeSave(){
      return this.$v.EmployeeInfo.fullName.required && this.$v.EmployeeInfo.employeeCode.required;
    },
    
    /**
     * Xử lý lưu lao động
     */
    async handleSaveEmployee() {
      this.clickedSave = true;
      //Format data trước khi tiến hành save
      var dataSave = this.formatBeforeSave();
      var checkValidate = this.validateDataBeforeSave();
      if (checkValidate){
        console.log(checkValidate);
        var res;
        if (this.editMode){

          res = await ServiceEmployeeDetail.UpdateEmployee(dataSave);
          console.log(res)
          
        }
        else {
          res = await ServiceEmployeeDetail.CreateEmployee(dataSave);
          console.log(res)
        }
        if (!res){
          this.isShowDialog = true;
        }
        else{
          this.$router.push("/employee-list");
        }
      }
      
      
    },
    /**
     * Xử lý hủy bỏ
     */
    handleCancle() {
      this.$router.push("/employee-list")
    },

    /**
     * Chuyển ngày ở datepicker về dạng ngày tháng năm
     */
    formatDateToDayMonthYear (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      /**
       * Hàm sinh uuid ngẫu nhiên
       */
      uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
  },
  async created() {

    //Lấy dữ liệu danh mục
      //
    this.directoryData.provincesData = await ServiceProvincial.Provincials();
    this.directoryData.nationalityData = await ServiceNationality.GetAllNationalities();

    //
    var currentURL = this.$route.path;
    console.log(currentURL);
    //Chế độ thêm mới
    if (currentURL == "/employee-list/create" ) {
      this.editMode = false;

      
    } else if(currentURL.includes("/employee-list/edit/") ) {
      //Chẻ cái URl ra -> lấy ID lao động
      let currentEditEmp = "";
      let lstSplited = currentURL.split("/");
      let foundChar36 = lstSplited.find(element =>
        element.length == 36
      );
      if(foundChar36){
        currentEditEmp = foundChar36;
      }
      else {
        alert("Không có lao động nào có mã như vậy")
      }
      console.log(1231231231231);
      this.editMode = true;
      //Lấy thông tin người chỉnh sửa thông qua sessionStorage
      //Gọi service lấy thông tin người đó
      if(currentEditEmp){
        let infoEmp = await ServiceEmployeeDetail.GetEmployeedetailByID(currentEditEmp);
        console.log(infoEmp);
        if(infoEmp){
          this.EmployeeInfo = this.prepareDataToBindingToLayout(infoEmp);
          // this.EmployeeInfo = infoEmp
        }
      }

      /**
       * Lấy danh mục quận/huyện theo tỉnh đã chọn(Nếu có)
       */
      if (this.EmployeeInfo && this.EmployeeInfo.residenceProvince){

        //Tìm kiếm trong danh sách tỉnh xem tỉnh nào có cùng tên 
        var sameProvince = this.directoryData.provincesData.find(x => x.provincialName == this.EmployeeInfo.residenceProvince)
        //Nếu có tỉnh trùng
        if(sameProvince){
          // gọi service lấy danh mục quận huyện theo tỉnh
          var res = await ServiceAdministrativeArea.getAdministrativeAreasByParentCode(1,sameProvince.provincialCode)
          if (res.code == 200){
            let lstHuyen = res.data
            if (lstHuyen){
              this.directoryData.districtData = lstHuyen
            }
          }

        }
      }

      /**
       * Lấy danh mục Xã/phường theo huyện đã có (Nếu có)
       */
      if (this.EmployeeInfo && this.EmployeeInfo.residenceDistrict){

        //Tìm kiếm trong danh sách tỉnh xem tỉnh nào có cùng tên 
        var sameDistrict = this.directoryData.districtData.find(x => x.districtName == this.EmployeeInfo.residenceDistrict)
        //Nếu có huyện/quận trùng
        if(sameDistrict){
          // gọi service lấy danh mục quận huyện theo tỉnh
          var resData = await ServiceAdministrativeArea.getAdministrativeAreasByParentCode(2,sameDistrict.districtCode)
          if (resData.code == 200){
            let lstXa = resData.data
            if (lstXa){
              this.directoryData.wardData = lstXa
            }
          }

        }
      }

    }

  

  },
  mounted() {},
  updated() {},
  computed: {
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/views/employee-info.scss";
</style>