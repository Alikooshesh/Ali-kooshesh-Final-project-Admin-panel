import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/reducers/adminAuthReducer/adminAuthReducer";

function OrderList() {
    const dispatch = useDispatch()
    const adminAuthRedux = useSelector((state:any) => state.adminAuth)

    const [orderList,setOrderList] = useState<{orderId : string , makerUserId : string , status : string}[]>([])

    useEffect(()=>{
        axios.get(`https://pcmarket-server-api.herokuapp.com/admin/orders/${adminAuthRedux.tokenId}`)
            .then(res =>{
                setOrderList(res.data)
            })
            .catch(err => {
                console.log(err.data)
                dispatch(logout())
            })
    },[])

    return(
        <table style={{width : '100%'}}>
            <thead className={"mb-5"}>
            <tr style={{borderColor : 'black', borderStyle : 'solid', borderBottom : '5px'}}>
                <th style={{paddingBottom : '1rem' , width : '25%'}}>Order ID</th>
                <th style={{paddingBottom : '1rem' , width : '25%'}}>User ID</th>
                <th style={{paddingBottom : '1rem' , width : '25%'}}>Status</th>
            </tr>
            </thead>

            <tbody>

            {orderList.map(item => {
                return(
                    <tr key={`${item.orderId} ${Math.random()}`} style={{textAlign : 'center'}}>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.orderId}</td>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.makerUserId}</td>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.status}</td>

                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}

export default OrderList