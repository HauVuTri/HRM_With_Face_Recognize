import { employeelist} from "./modules/employeelist"
export const routes = [
    {
        path: '/',
        redirect:'/employee-list'
    },
    employeelist
]