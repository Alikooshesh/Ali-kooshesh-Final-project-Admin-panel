import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../redux/reducers/adminAuthReducer/adminAuthReducer";
import {useHistory} from "react-router-dom";
import {Box, Button, Grid, TextField, Typography} from "@material-ui/core";

function LoginIndex() {

    const dispatch = useDispatch()
    const history = useHistory()

    const adminAuthRedux = useSelector((state:any) => state.adminAuth)

    const [box,setBox] = useState<number>(1)
    const [phoneNumber , setPhoneNumer] = useState<number|string>("")
    const [code , setCode] = useState<number|string>("")
    const [fullName , setFullName] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [errText,setErrText] = useState<string|boolean>(false)

    function phoneInputChangeHandle(e:React.ChangeEvent<HTMLInputElement>) {
        if (`${phoneNumber}`.length < 11 || e.target.value.length < 11){
            e.target.value == '0' && setPhoneNumer(0)
            e.target.value == "" && setPhoneNumer("")
            parseInt(e.target.value) && setPhoneNumer(e.target.value)
        }
    }

    function codeInputChangeHandle(e:React.ChangeEvent<HTMLInputElement>) {
        if (`${code}`.length < 4 || e.target.value.length < 4){
            e.target.value == '0' && setCode(0)
            e.target.value == "" && setCode("")
            parseInt(e.target.value) && setCode(e.target.value)
        }
    }

    function sendCodeBtnClick() {
        setErrText(false)
        const phoneRegex:RegExp = /^(\+98|0098|98|0)?9\d{9}$/

        if(phoneRegex.test(`${phoneNumber}`)){
            if (!loading){
                setLoading(true)
                axios.post('https://pcmarket-server-api.herokuapp.com/userLogin',{phoneNumber : phoneNumber})
                    .then(res => {
                        setBox(2)
                        setLoading(false)
                        console.log(res)
                    })
                    .catch(err => {
                        setErrText("Connection error, Try again")
                        console.log(err)
                        setLoading(false)
                    })
            }
        }else {
            setErrText("Invalid phone number")
        }
    }

    function verifyCodeBtnClick() {
        setErrText(false)
        if (!loading){
            setLoading(true)
            axios.post('https://pcmarket-server-api.herokuapp.com/userLogin/verifyCode',{phoneNumber : phoneNumber , verifyCode : code})
                .then(res => {
                    console.log(res.data)
                    if (res.data.fullName){
                        dispatch(login({userId : res.data.userId , fullName : res.data.fullName , phoneNumber : res.data.phone , tokenId : res.data.tokenId}))
                        history.push('/dashboard')
                    }else {
                        dispatch(login({userId : res.data.userId , fullName : "" , phoneNumber : res.data.phone , tokenId : res.data.tokenId}))
                        setBox(3)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    err.status == 404 && setErrText("Invalid phone number")
                    err.status != 404 && setErrText("Wrong digits, Try again")
                    console.log(err)
                    setLoading(false)
                })
        }
    }

    function addFullName() {
        setErrText(false)
        if(fullName.length>3){
            axios.post('https://pcmarket-server-api.herokuapp.com/user/fullName',{tokenId : adminAuthRedux.tokenId , newFullName : fullName})
                .then(res =>{
                    dispatch(login({userId : res.data.userId , fullName : res.data.fullName , phoneNumber : res.data.phone , tokenId : res.data.tokenId}))
                    history.push('/dashboard')
                })
                .catch(err => {
                    err.status == 403 && setErrText("Token expired") && dispatch(logout())
                    err.status == 404 && setErrText("Connection Error, Please try again")
                    console.log(err)
                    setLoading(false)
                })
        }else {setErrText("Full name should be more than 3 character")}
    }

    useEffect(()=>{
        adminAuthRedux.isLogin && history.push('/dashboard')
    },[])

    return(
        <Box component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'} style={{width : '100%', height : '100vh'}}>
            <Box component={'div'} borderRadius={'borderRadius'} padding={'3'}
                 display={(box == 1 && 'flex') || 'none'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}
                 style={{width:'25%', height:'auto' , backgroundColor : '#E5E7EB' , padding:'1rem'}}>
                <Typography component={'p'} variant={'h3'} style={{color : '#1F2937' , marginBottom : '1rem'}}>Admin Login</Typography>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" style={{width : '100%'}}
                           value={phoneNumber} onChange={phoneInputChangeHandle}/>

                <Button variant={"contained"} color={'primary'} disabled={loading} style={{marginTop : '1rem'}} onClick={sendCodeBtnClick}>Send Code</Button>
                <Typography component={'small'} variant={'h6'} color={'secondary'} style={{marginTop : '0.5rem'}}>{errText}</Typography>
            </Box>

            <Box component={'div'} borderRadius={'borderRadius'} padding={'3'}
                 display={(box == 2 && 'flex') || 'none'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}
                 style={{width:'25%', height:'auto' , backgroundColor : '#E5E7EB' , padding:'1rem'}}>
                <Typography component={'p'} variant={'h3'} style={{color : '#1F2937' , marginBottom : '1rem'}}>Admin Login</Typography>
                <TextField id="outlined-basic" label="4-Digits code" variant="outlined" style={{width : '100%'}}
                           value={code} onChange={codeInputChangeHandle}/>

                <Button variant={"contained"} color={'primary'} disabled={loading} style={{marginTop : '1rem'}} onClick={verifyCodeBtnClick}>Login</Button>
                <Typography component={'small'} variant={'h6'} color={'secondary'} style={{marginTop : '0.5rem'}}>{errText}</Typography>
            </Box>

            <Box component={'div'} borderRadius={'borderRadius'} padding={'3'}
                 display={(box == 3 && 'flex') || 'none'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}
                 style={{width:'25%', height:'auto' , backgroundColor : '#E5E7EB' , padding:'1rem'}}>
                <Typography component={'p'} variant={'h3'} style={{color : '#1F2937' , marginBottom : '1rem'}}>Admin Login</Typography>
                <TextField id="outlined-basic" label="Full Name" variant="outlined" style={{width : '100%'}}
                           value={fullName} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setFullName(e.target.value)}/>

                <Button variant={"contained"} color={'primary'} disabled={loading} style={{marginTop : '1rem'}} onClick={addFullName}>Dashboard</Button>
                <Typography component={'small'} variant={'h6'} color={'secondary'} style={{marginTop : '0.5rem'}}>{errText}</Typography>
            </Box>
        </Box>
    )
}

export default LoginIndex