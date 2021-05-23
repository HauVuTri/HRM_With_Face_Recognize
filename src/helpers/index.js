export default{
    getToken(){
        let token =localStorage.getItem("section")
        if (token) {
            return token
        }
        return null;
    }
}