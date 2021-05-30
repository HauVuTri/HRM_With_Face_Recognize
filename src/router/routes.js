import { employeelist} from "./modules/employeelist"
import { general} from "./modules/general"
import { rollcall} from "./modules/rollcall"
import { timekeeping} from "./modules/timekeeping"
export const routes = [
    {
        path: '/',
        redirect:'/general'
    },
    employeelist,
    general,
    rollcall,
    timekeeping,
]