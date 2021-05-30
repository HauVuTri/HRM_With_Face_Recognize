import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    /**
     * Lấy thông tin chấm công dựa vào timeCode
     * @param {*} timeCode Mã tháng :dạng mm/YYYY
     * @returns Danh sách Chấm công theo tháng
     */
    async GetTimeKeepingIncludeEmployeeByTimeCode(timeCode){
        try {
            var res =  await service.get(`Timekeepings/GetTimeKeepingIncludeEmployeeByTimeCode?timeCode=${timeCode}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}