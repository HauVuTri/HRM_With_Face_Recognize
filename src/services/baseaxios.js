import axios from "axios"

export const api =  function(baseURL) {
    var instanceAxios = axios.create({
        baseURL,
        validateStatus:function(status){
            return status
        }
    })
    return instanceAxios
}
