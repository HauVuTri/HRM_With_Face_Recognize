import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import { routes } from './routes'
// import helper from "@/helpers"

Vue.use(VueRouter)
Vue.use(VueCookies)

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})
// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     // if ( to != process.env.VUE_APP_LOGIN) {
//     if ( to != "/employee-list") {
//         let token = helper.getToken();
//         console.log(token);
//         if(!token){
//             // console.log(process.env.VUE_APP_LOGIN);
//             // next(process.env.VUE_APP_LOGIN)
//             next("/employee-list")
//         }
//         else{
//             next()
//         }
//     }
//     else{
//         next();
//     }
    
    
// })
export default router;