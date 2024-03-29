import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import Navbar from "./Navbar";
import HomePageHeadingBox from "../components/HomePageHeadingBox";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store";

const Container = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const authState = useSelector((state: any) => state.auth.isLogged);

  const onToggle = () => {
    if (authState) {
      dispatch(modalActions.getImageToggle());
    } else {
      toast({
        title: "You are not logged in, Please Login first !!!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        width="100vw"
        height="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        // border={'1px solid'}
        // bgColor={"#343434"}
      >
        <Navbar></Navbar>
        <Flex
          bgColor="white"
          height="90%"
          width="77vw"
          borderRadius="10px"
          overflow="hidden"
          boxShadow={"5px 10px 10px #BEBEBE"}
          flexDirection="column"
        >
          <HomePageHeadingBox></HomePageHeadingBox>
          <Flex height="39%" width=" 77vw">
            <Flex
              height="100%"
              width="70%"
              justifyContent="center"
              flexDirection={"column"}
              alignItems={"center"}
              fontFamily="Press Start 2P"
              padding={"40px"}
            >
              <Heading fontSize={"180%"}>Now get Images when you want.</Heading>
              <Text fontWeight={"bold"} margin={"2"} fontSize={"100%"}>
                Here you can get images you like before the deadline you mention
              </Text>
              <Button
                width={"140px"}
                height="50px"
                fontSize={"100%"}
                borderStyle="none"
                borderRadius={"10px"}
                _hover={{ color: "white", bgColor: "#ff4da6" }}
                color="#ff4da6"
                onClick={onToggle}
                margin={"5"}
              >
                Get Image
              </Button>
            </Flex>
            <Flex height="100%" width="30%">
              <Image
                src="https://www.collinsdictionary.com/images/full/collage_405007918_1000.jpg?version=4.0.257"
                alt="loading..."
                width={"100%"}
              ></Image>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Container;
