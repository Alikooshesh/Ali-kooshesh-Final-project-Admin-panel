import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/reducers/adminAuthReducer/adminAuthReducer";

function UserList() {
    const dispatch = useDispatch()
    const adminAuthRedux = useSelector((state:any) => state.adminAuth)

    const [usersList,setUsersList] = useState<{userId : string , phone : string , fullName : string}[]>([])

    useEffect(()=>{
        axios.get(`https://pcmarket-server-api.herokuapp.com/admin/users/${adminAuthRedux.tokenId}`)
            .then(res =>{
                setUsersList(res.data)
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
                <th style={{paddingBottom : '1rem' , width : '25%'}}>User ID</th>
                <th style={{paddingBottom : '1rem' , width : '25%'}}>Full name</th>
                <th style={{paddingBottom : '1rem' , width : '25%'}}>Phone number</th>
            </tr>
            </thead>

            <tbody>

            {usersList.map(item => {
                return(
                    <tr key={`${item.userId} ${Math.random()}`} style={{textAlign : 'center'}}>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.userId}</td>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.fullName}</td>
                        <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.phone}</td>

                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}

export default UserList