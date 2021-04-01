export const employeelist = {
    path: "/employee-list",
    name: "Employee",
    component: () => import("@/views/employeelist/")
    // children: [
    //     {
    //         path: '',
    //         name: "EmployeeList",
    //         component: () => import("@/views/employeelist/index.vue")
    //     }
    // ]
}