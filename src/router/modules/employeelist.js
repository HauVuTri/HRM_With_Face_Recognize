export const employeelist = {
    path: "/employee-list",
    name: "Employee",
    component: () => import("@/layout"),
    redirect: { name: "EmployeeList" },
    children: [
        {
            path: "",
            name: "EmployeeList",
            component: () => import("@/views/employeelist/")
        },
        {
            path: "create",
            name: "CreateEmployee",
            component: () => import("@/views/employeelist/employee_detail")
        },
        {
            path: "edit/:id",
            name: "EditEmployee",
            component: () => import("@/views/employeelist/employee_detail")
        },
    ]

}