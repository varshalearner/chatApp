import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const history = useNavigate();
  const toast = useToast();


  async function submitHandler() {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) { 
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history("/chats");

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
  
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      showToast("Please Select an Image!", "warning");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "chatApp");
      fetch("https://api.cloudinary.com/v1_1/dbmmfdjld/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.url) {
            setPic(data.url.toString());
            console.log(data.url.toString());
          } else {
            console.error("Failed to upload image:", data);
          }
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      showToast("Please Select an Image!", "warning");
      setPicLoading(false);
      return;
    }
  };

  const showToast = (title, status) => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  
  return (
    <VStack>
      <FormControl id="firstName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        
          placeholder="varshalearner+chatapp@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
   
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
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={show ? "text" : "password"}
          placeholder="Confirm Your password"
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Profile Pic</FormLabel>
        <Input
          p={1.5}
          type="file"
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" mt={4} isLoading={picLoading} onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
