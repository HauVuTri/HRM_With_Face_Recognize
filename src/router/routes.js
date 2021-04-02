import { employeelist} from "./modules/employeelist"
import { general} from "./modules/general"
export const routes = [
    {
        path: '/',
        redirect:'/general'
    },
    employeelist,
    general,
]