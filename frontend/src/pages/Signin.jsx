import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance';

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign in"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>
          <InputBox label={"username"} placeholder={"raghu"} type={"text"} onChange={(e) => {
            setUsername(e.target.value);
          }}/>
          <InputBox label={"Password"} placeholder={"******"} type={"password"} onChange={(e) => {
            setPassword(e.target.value);
          }}/>
          <div className='pt-4'>
            <Button label={'Sign In'} onClick={async () => {
              const response = await axiosInstance.post('/signin' , {
                username,
                password
              });

              localStorage.setItem("token", response.data.token)
              navigate('/dashboard');
            }}/>
          </div>
          <BottomWarning label={"Don't have and account? "} to={'/signup'} buttonText={'Sign up'}/>
        </div>
      </div>
    </div>
  )
}

export default Signin