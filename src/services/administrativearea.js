import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    async getAdministrativeAreasByParentCode(parentCode){
        try {
            var x = await service.get(`/GetAdministrativeAreasByParentCode/${parentCode}`)
            console.log(x);
            return 1
        } catch (error) {
            console.log(error);
        }
    }
}