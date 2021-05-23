import {api} from "./baseaxios"

const service = api(process.env.VUE_APP_DANH_MUC_BaseURL)

export default {
    async Provincials(){
        try {
            var res =  await service.get(`/Provincials`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}