export const rollcall = {
    path: "/diem-danh",
    name: "RollCall",
    component: () => import("@/layout"),
    redirect: { name: "RollCallDetail" },
    children: [
        {
            path: "",
            name: "RollCallDetail",
            component: () => import("@/views/rollcall/")
        },
    ]

}