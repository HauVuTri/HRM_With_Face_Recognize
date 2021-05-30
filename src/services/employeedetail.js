import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    /**
     * Lấy toàn bộ thôgn tin các lao động
     * @returns 
     */
    async GetAllEmployeedetails(){
        try {
            var res =  await service.get(`/Employeedetails`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Lấy dữ liệu lao động theo ID
     * @param {GUid} id 
     * @returns 
     */
    async GetEmployeedetailByID(id){
        try {
            var res =  await service.get(`/Employeedetails/${id}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Lấy dữ liệu chi tiết lao động theo mã CODE
     * @param {*} employeeCode 
     * @returns 
     */
    async GetEmployeedetailByCode(employeeCode){
        try {
            var res =  await service.get(`/Employeedetails/EmployeeCode/${employeeCode}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Cập nhật chi tiết lao động
     * @param {EmployeeDetail} employeeDetail 
     */
    async UpdateEmployee(employeeDetail){
        try {
            if(employeeDetail){
                var res = await service.put(`/Employeedetails/${employeeDetail.employeeDetailId}`,employeeDetail)
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Thêm mới chi tiết lao động
     * @param {EmployeeDetail} employeeDetail 
     */
    async CreateEmployee(employeeDetail){
        try {
            if(employeeDetail){
                var res = await service.post(`/Employeedetails`,employeeDetail)
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Xóa lao động theo ID
     * @param {GUid} id 
     * @returns 
     */
     async DeleteEmployeedetailByID(id){
        try {
            var res =  await service.delete(`/Employeedetails/${id}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
}