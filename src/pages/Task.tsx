import {
  Box,
  Flex,
  Text,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import NavigationBar from "../components/NavigationBar";
import AvailableTask from "../components/AvailableTask";

const NewList = [
  {
    title: "Connect Venom Wallet (Airdrop)",
  },
  {
    title: "Watch New Youtube Video",
  },
  {
    title: "Play BIRDS",
  },
  {
    title: "Watch Eraldo",
  },
];
export default function Task() {
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
        <Flex gap={5} w={"100%"} p={4} justifyContent={"space-between"}>
          <Flex direction={"column"} gap={3}>
            <Link to={'/settings'}>
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
            </Link>
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

        <Tabs width={"100%"} variant="unstyled" mt={{ base: 3, sm: 10 }}>
          <Box width={"100%"}>
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
                <Text>TASKS</Text>
                <Text
                  fontSize={"10px"}
                  letterSpacing={"0px"}
                  fontWeight={400}
                  mt={-1}
                >
                  Complete all the tasks to earn more coins.
                </Text>
              </Box>
              <Flex w={"100%"} gap={1}>
                <TabList width={"90%"} mx={"auto"} marginX={"auto"} gap={2}>
                  <Tab
                    bg={"#AB6C93C7"}
                    h={"40px"}
                    color={"white"}
                    fontSize={"12px"}
                    fontWeight={800}
                    letterSpacing={"2px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    _selected={{ bg: "#f3c11b", color: "black" }}
                  >
                    Available Tasks
                  </Tab>
                  <Tab
                    h={"40px"}
                    bg={"#AB6C93C7"}
                    color={"white"}
                    fontSize={"12px"}
                    fontWeight={800}
                    letterSpacing={"2px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    _selected={{ bg: "#f3c11b", color: "black" }}
                  >
                    {" "}
                    Completed Tasks
                  </Tab>
                </TabList>
              </Flex>
            </Flex>
            <Box w={"100vw"} pb={32}>
              <Box w={"100%"}>
                <TabPanels p={0} m={0} mt={3}>
                  <TabPanel>
                    <AvailableTask />
                  </TabPanel>
                  <TabPanel p={2}>
                    <Text fontSize={'24px'}>
                        Completed
                    </Text>
                    {NewList.map((newlist) => {
                      return (
                        <Flex
                          bg={"#0000004D"}
                          border={"1px solid #35B5FF"}
                          borderRadius={"10px"}
                          h={"68px"}
                          mt={2}
                          alignItems={"center"}
                          gap={2}
                          px={3}
                          // justifyContent={'center'}
                        >
                          <Box
                            w={"41px"}
                            h={"36px"}
                            borderRadius={"10px"}
                            border={"2px solid #59173E"}
                            bg={"#AB6C93"}
                            boxShadow={"0px 0px 10px 1px #000000"}
                          />
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            w={"100%"}
                          >
                            <Box>
                              <Text fontSize={"12px"}>{newlist.title}</Text>
                              <Flex alignItems={"center"} gap={1}>
                                <Image
                                  src="/Icons/blue.png"
                                  w={"16px"}
                                  h={"16px"}
                                />
                                <Text fontSize={"12px"}>25</Text>
                              </Flex>
                            </Box>
                            <Icon as={FaAngleRight} />
                          </Flex>
                        </Flex>
                      );
                    })}
                  </TabPanel>
                </TabPanels>
              </Box>
            </Box>
          </Box>
        </Tabs>
      </Flex>

      <NavigationBar />
    </Box>
  );
}
