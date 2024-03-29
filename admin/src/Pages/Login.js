import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button ,Spin, message } from 'antd';
import '../static/login.css';
import service_path from '../config/apiurl.js'
import axios from 'axios'

function Login(props){
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{ //检查登录是否正确
        setIsLoading(true)
    
        if(!userName){
            message.error('用户名不能为空')
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:service_path.checklogin,
            data:dataProps,
            withCredentials: true
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.data == '登录成功'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')

                }else{
                    message.error('用户名密码错误')
                }
           }
        )
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="React_Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        onChange={(e)=>{setUserName(e.target.value)}} //将输入框值传入username变量
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login