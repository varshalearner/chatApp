import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();


  async function submitHandler() {
    setLoading(true);
    if ( !email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  
    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");

    } catch (error) {
      if (error.response) {
        toast({
          title: "Error Occurred!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Network Error",
          description: "There was a problem with the request. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      
    }
  }
  

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value = {email}
          placeholder="varshalearner+chatapp@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            value = {password}
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <InputRightElement
            onClick={() => {
              setShow(!show);
            }}
            w="4.5rem"
          >
            <button h="1.75rem" size="sm">
              Show
            </button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
  
      <Button colorScheme="blue" width="100%" mt={4} onClick={submitHandler}>
        Login
      </Button>
      <Button width="100%" colorScheme="green" onClick={()=>{
        setEmail("guest@gmail.com");
        setPassword("123456");
    
      }}>
        Get Guest User Credentials
      </Button>
    </VStack>
    )  
}

export default Login