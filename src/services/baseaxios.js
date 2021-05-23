import axios from "axios"
import helper from "@/helpers"

export const api =  function(baseURL) {
    //lấy token từ localStorage
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmYTg1ZjY0LTU3MTctNDU2Mi1iM2ZjLTJjOTYzZjY2YWZhNiIsIm5iZiI6MTYyMTQ0MTY0NCwiZXhwIjoxNjIyMDQ2NDQ0LCJpYXQiOjE2MjE0NDE2NDR9.h8wmUWmQ7aXnBEDFonxuHConArlO4ntz0xm3eOR-7qg";
    let token = helper.getToken();
    var instanceAxios = axios.create({
        baseURL,
        validateStatus:function(status){
            return status
        },
        headers:{
            Authorization: token
        }
    })
    return instanceAxios
}
