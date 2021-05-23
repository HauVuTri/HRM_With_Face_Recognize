import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    async getAdministrativeAreasByParentCode(codeDetect,parentCode){
        try {
            var x = await service.get(`Aministrativeareas/GetAdministrativeByParentCode?codeDetect=${codeDetect}&parentCode=${parentCode}`)
            return x.data
        } catch (error) {
            console.log(error);
        }
    }
}