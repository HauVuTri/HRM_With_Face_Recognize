import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    async GetAllNationalities(){
        try {
            var res =  await service.get(`/Nationalities`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}