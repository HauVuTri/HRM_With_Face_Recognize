import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    async GetRollCallIncludeEmployeeByTimeCode(rollCallTimeCode){
        try {
            var res =  await service.get(`RollCalls/GetRollCallIncludeEmployeeByTimeCode?rollCallTimeCode=${rollCallTimeCode}`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}