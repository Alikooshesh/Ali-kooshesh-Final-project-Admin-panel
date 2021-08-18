import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/reducers/adminAuthReducer/adminAuthReducer";
import {Button, Typography} from "@material-ui/core";

function ProductList() {
    const dispatch = useDispatch()
    const adminAuthRedux = useSelector((state:any) => state.adminAuth)

    const [categoryId , setCategoryId] = useState<string>('ca1')
    const [productList,setProductList] = useState<{productID : string , productName : string , price : number}[]>([])

    useEffect(()=>{
        axios.get(`https://pcmarket-server-api.herokuapp.com/categoryWithProducts/${categoryId}`)
            .then(res =>{
                setProductList(res.data[0].product)
                console.log(res.data[0].product)
            })
            .catch(err => {
                console.log(err.data)
            })
    },[])

    useEffect(()=>{
        axios.get(`https://pcmarket-server-api.herokuapp.com/categoryWithProducts/${categoryId}`)
            .then(res =>{
                setProductList(res.data[0].product)
                console.log(res.data[0].product)
            })
            .catch(err => {
                console.log(err.data)
            })
    },[categoryId])

    return(
        <>
            <Typography variant={"h5"}>Choose category</Typography>
            <Button variant={"contained"} color={'primary'} style={{marginRight : '1rem'}} onClick={()=> setCategoryId('ca1')}>VGA</Button>
            <Button variant={"contained"} color={'primary'} onClick={()=> setCategoryId('ca2')}>Laptop</Button>
            <table style={{width : '100%'}}>
                <thead className={"mb-5"}>
                <tr style={{borderColor : 'black', borderStyle : 'solid', borderBottom : '5px'}}>
                    <th style={{paddingBottom : '1rem' , width : '25%'}}>Product ID</th>
                    <th style={{paddingBottom : '1rem' , width : '25%'}}>Product Name</th>
                    <th style={{paddingBottom : '1rem' , width : '25%'}}>Price</th>
                </tr>
                </thead>

                <tbody>

                {productList.map(item => {
                    return(
                        <tr key={`${item.productID} ${Math.random()}`} style={{textAlign : 'center'}}>
                            <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.productID}</td>
                            <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.productName}</td>
                            <td style={{paddingTop : '1rem' , paddingBottom : '1rem'}}>{item.price} Toman</td>

                        </tr>
                    )
                })}

                </tbody>
            </table>
        </>
    )
}

export default ProductList