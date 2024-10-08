import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox label={"Username"} placeholder={"raghu"} type={'text'} onChange={(e) => {
            setUsername(e.target.value); 
          }} />
          <InputBox label={"Email"} placeholder={"raghu@gmail.com"} type={'email'} onChange={(e) => {
            setEmail(e.target.value);  
          }} />
          <InputBox label={"Password"} placeholder={"******"} type={"password"} onChange={(e) => {
            setPassword(e.target.value);  
          }} />

          <div className='pt-4'>
            <Button onClick={async () => {
              try {
                const response = await axiosInstance.post('/signup', {  
                  username,
                  email,
                  password
                });

                localStorage.setItem("token", response.data.token);
                navigate('/dashboard');
              } catch (error) {
                console.error('Signup failed:', error);
              }
            }} label={"Sign Up"} />
          </div>

          <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}

export default Signup;
