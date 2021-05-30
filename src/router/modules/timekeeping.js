export const timekeeping = {
    path: "/cham-cong",
    name: "TimeKeeping",
    component: () => import("@/layout"),
    redirect: { name: "TimeKeepingDetail" },
    children: [
        {
            path: "",
            name: "TimeKeepingDetail",
            component: () => import("@/views/timekeeping/")
        },
    ]

}