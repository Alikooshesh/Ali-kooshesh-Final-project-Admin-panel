import {Iroute} from "../Interfaces/routesInterface";
import OrderList from "../Pages/dashboardPage/ordersList/orderList";
import UserList from "../Pages/dashboardPage/userList/userList";
import ProductList from "../Pages/dashboardPage/productsList/productList";

export const RdashboardRoutes:Iroute[] =[
    {path:'/dashboard', exact:true, Component:OrderList, adminLoginReq:true},
    {path:'/dashboard/orders', exact:false, Component:OrderList, adminLoginReq:true},
    {path:'/dashboard/users', exact:false, Component:UserList, adminLoginReq:true},
    {path:'/dashboard/products', exact:false, Component:ProductList, adminLoginReq:true}
]