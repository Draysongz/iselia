import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Switch from "../components/Switch"



export default function Settings() {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const toggleSwitch = () => {
      setIsSwitchOn((prev) => !prev);
    };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgImage={"../Background/background.jpg"}
      bgRepeat={"no-repeat"}
      bgPosition={"center"}
      bgSize={"cover"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#05051799",
        zIndex: 0,
      }}
    >
      <Flex
        width={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        pt={{ base: 1, sm: 5 }}
        zIndex={0}
      >
        <Flex gap={5} w={"100%"} p={4} justifyContent={"space-between"} pb={10}>
          <Flex direction={"column"} gap={3}>
            <Flex
              w={"80px"}
              h={"20px"}
              border={"0.5px solid #ff0097"}
              bg={"#FF00971A"}
              borderRadius={"15px"}
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
            >
              <Image src="/Icons/settings.png" w={"35%"} ml={-2} />
              <Text
                fontSize={"10px"}
                fontWeight={400}
                color={"#ffffff"}
                w={"38px"}
              >
                Settings
              </Text>
            </Flex>
            <Flex
              w={"80px"}
              h={"20px"}
              border={"0.5px solid #ff0097"}
              bg={"#FF00971A"}
              borderRadius={"15px"}
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
            >
              <Image src="/Icons/info.png" w={"35%"} ml={-2} />
              <Text
                fontSize={"10px"}
                fontWeight={400}
                color={"#ffffff"}
                w={"38px"}
              >
                Info
              </Text>
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex
              h={"20px"}
              border={"0.5px solid #ff0097"}
              bg={"#FF00971A"}
              borderRadius={"15px"}
              alignItems={"center"}
            >
              <Text
                fontSize={"10px"}
                fontWeight={400}
                color={"#ffffff"}
                px={2}
                textAlign={"center"}
              ></Text>
              <Image
                src="/Icons/button-circle-blue.png"
                w={"27.56px"}
                h={"27.56px"}
              />
            </Flex>
            <Flex
              h={"20px"}
              border={"0.5px solid #ff0097"}
              bg={"#FF00971A"}
              borderRadius={"15px"}
              alignItems={"center"}
            >
              <Text
                fontSize={"10px"}
                fontWeight={400}
                color={"#ffffff"}
                px={2}
                textAlign={"center"}
              ></Text>
              <Image
                src="/Icons/button-stop-square.png"
                w={"27.56px"}
                h={"27.56px"}
              />
            </Flex>
            <Flex
              h={"20px"}
              border={"0.5px solid #ff0097"}
              bg={"#FF00971A"}
              borderRadius={"15px"}
              alignItems={"center"}
            >
              <Text
                fontSize={"10px"}
                fontWeight={400}
                color={"#ffffff"}
                px={2}
                textAlign={"center"}
              ></Text>
              <Image
                src="/Icons/button-hexagon.png"
                w={"27.56px"}
                h={"27.56px"}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex direction={"column"} w={"100%"} bg={"#A60062"} gap={5} pb={5}>
          <Box
            width={"65%"}
            height={"50px"}
            bg={"#FF0097"}
            mt={-5}
            mx={"auto"}
            color={"white"}
            fontWeight={800}
            fontSize={"20px"}
            textAlign={"center"}
            borderRadius={"10px"}
            letterSpacing={"2px"}
            justifyContent={"center"}
            alignContent={"center"}
            boxShadow={"0px 0px 10px 5px #59173E"}
          >
            <Text>SETTINGS</Text>
          </Box>
          <Flex w={"90%"} mx={"auto"} justifyContent={"space-around"}>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <Flex gap={2}>
                <Box
                  w={"23px"}
                  h={"20px"}
                  borderRadius={"10px"}
                  bg={"#ffca2b"}
                  border={"2px solid #59173E"}
                />
                <Text>MUSIC</Text>
              </Flex>

              <Switch
                isChecked={isSwitchOn}
                onChange={toggleSwitch}
                size="large"
              />
            </Flex>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <Flex gap={2}>
                <Box
                  w={"23px"}
                  h={"20px"}
                  borderRadius={"10px"}
                  bg={"#ffca2b"}
                  border={"2px solid #59173E"}
                />
                <Text>EFFECT</Text>
              </Flex>

              <Switch
                isChecked={isSwitchOn}
                onChange={toggleSwitch}
                size="large"
              />
            </Flex>
          </Flex>

          <Flex
            direction={"column"}
            w={"90%"}
            mx={"auto"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Text>VOLUME</Text>
            <Slider aria-label="slider-ex-1" defaultValue={30}>
              <SliderTrack
                h={"30px"}
                bg={"#ccc"}
                boxShadow={"0px 0px 10px 5px #59173E"}
              >
                <SliderFilledTrack bg={"#ffca2b"} />
              </SliderTrack>
              <SliderThumb h={"32px"} w={"32px"} borderRadius={"2px"} />
            </Slider>
          </Flex>

          <Flex w={"90%"} gap={2} mx={"auto"} mt={{ base: 5, sm: 10 }}>
            <Flex
              width={"50%"}
              alignItems={"center"}
              gap={2}
              bg={"#f3c11b"}
              justifyContent={"center"}
              p={3}
              borderRadius={"10px"}
            >
              <Text fontSize={"12px"} color={"black"} fontWeight={400}>
                FAQ
              </Text>
            </Flex>
            <Flex
              width={"50%"}
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
              bg={"#f3c11b"}
              p={3}
              borderRadius={"10px"}
            >
              <Text fontSize={"12px"} color={"black"} fontWeight={400}>
                TERMS OF SERVICE
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
