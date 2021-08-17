import {Route} from "react-router-dom";
import {Redirect} from "react-router";
import React from "react";
import {Iroute} from "../../Interfaces/routesInterface";
import {useSelector} from "react-redux";

function CustomRoute(props:Iroute) {
    const adminAuthRedux = useSelector((state:any) => state.adminAuth)

    if(props.adminLoginReq){
        if(adminAuthRedux.isLogin){
            return <Route path={props.path} exact={props.exact} render={routingProps => <props.Component {...routingProps}/>}/>
        }else{
            return <Redirect to={"/login"}/>
        }
    }else {
        return <Route path={props.path} exact={props.exact} render={routingProps => <props.Component {...routingProps}/>}/>
    }
}

export default CustomRoute