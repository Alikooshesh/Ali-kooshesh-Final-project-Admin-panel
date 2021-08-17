import {Iroute} from "../Interfaces/routesInterface";
import DashboardIndex from "../Pages/dashboardPage/dashboardIndex";
import LoginIndex from "../Pages/loginPage/loginIndex";

export const RtopLevelRoutes:Iroute[] =[
    {path:'/dashboard', exact:false, Component:DashboardIndex, adminLoginReq:true},
    {path:'*', exact:false, Component:LoginIndex, adminLoginReq:false}
]