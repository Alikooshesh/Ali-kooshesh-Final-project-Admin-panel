import {Iroute} from "../Interfaces/routesInterface";
import OrderList from "../Pages/dashboardPage/ordersList/orderList";
import UserList from "../Pages/dashboardPage/userList/userList";

export const RdashboardRoutes:Iroute[] =[
    {path:'/dashboard', exact:true, Component:OrderList, adminLoginReq:true},
    {path:'/dashboard/orders', exact:false, Component:OrderList, adminLoginReq:true},
    {path:'/dashboard/users', exact:false, Component:UserList, adminLoginReq:true}
]