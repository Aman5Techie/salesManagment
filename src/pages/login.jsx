import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/userslice";
import { useNavigate } from "react-router-dom";
import { useCheckToken } from "../hooks/Isauthenticates";

export default function LoginPage() {
  const username = useRef();
  const toast = useToast();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useCheckToken(true);

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      password: password.current.value,
    };
    if (data.username !== "temp" || data.password !== "123456") {
      toast({
        title: "Invalid Credintials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    delete data.password;
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(setUser(data));
    navigate("/");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login into your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input ref={username} type="username" defaultValue="temp" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input ref={password} type="password" defaultValue="123456" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                onClick={(e) => {
                  submitForm(e);
                }}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
