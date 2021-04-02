export const general = {
    path: "/general",
    name: "General",
    component: () => import("@/layout"),
    redirect:{
        name:"GeneralInfo"
    },
    children:[
        {
            path: "",
            name: "GeneralInfo",
            component: () => import("@/views/general/")
        }
    ]
}