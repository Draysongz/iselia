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
  useToast,
} from "@chakra-ui/react";
import { CiShare2 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { initUtils } from "@telegram-apps/sdk";

import NavigationBar from "../components/NavigationBar";
import { useUser } from "../context/context";
import { useState, useEffect } from "react";
import { useUserAPI } from "../hooks/useUserApi";
export default function Earn() {
  const { user } = useUser();
  const toast = useToast();
  const [referredUser, setReferredUsers] = useState<any[]>([]);

  const { fetchRefferals } = useUserAPI(user?.telegramId!);

  const handleInviteFriend = () => {
    const utils = initUtils();
    const inviteLink = `https://t.me/Iseliaworld_bot/${user?.telegramId}`;
    const shareText = `Join me on this awesome Telegram mini app!`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };

  const copyLink = async () => {
    navigator.clipboard.writeText(
      `https://t.me/Iseliaworld_bot/${user?.telegramId}`
    );
    toast({
      title: "Copied",
      status: "success",
      isClosable: true,
      duration: 2000,
    });
  };

  useEffect(() => {
    const fetchRef = async () => {
      const refUsers = await fetchRefferals();
      console.log("ref users from ref page", refUsers);
      setReferredUsers(refUsers.referredUsers || []);
    };

    if (user) {
      fetchRef();
    }
  }, [user]);

  console.log(referredUser);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgImage={"../Background/backdrop.svg"}
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

        <Tabs
          width={"100%"}
          variant="unstyled"
          defaultIndex={1}
          mt={{ base: 3, sm: 10 }}
        >
          <Box width={"100%"}>
            <Flex direction={"column"} w={"100%"} bg={"#A60062"} gap={5} pb={5}>
              <Box
                width={"30%"}
                height={"50px"}
                bg={"#FF0097"}
                mt={-5}
                mx={"auto"}
                color={"white"}
                fontWeight={800}
                fontSize={"20px"}
                textAlign={"center"}
                borderRadius={"5px"}
                letterSpacing={"2px"}
                justifyContent={"center"}
                alignContent={"center"}
                boxShadow={"0px 0px 10px 5px #59173E"}
                sx={{
                  WebkitTextStroke: "1px black", // Custom stroke
                  textStroke: "1px black",
                }}
              >
                SHOP
              </Box>
              <Flex w={"100%"} gap={1}>
                <TabList width={"90%"} mx={"auto"} marginX={"auto"} gap={2}>
                  <Tab
                    bg={"#AB6C93C7"}
                    color={"white"}
                    fontSize={"16px"}
                    fontWeight={400}
                    letterSpacing={"2px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    _selected={{ bg: "#f3c11b", color: "black" }}
                    isDisabled
                    _disabled={{
                      bg: "#AB6C93C7",
                      color: "white",
                      cursor: "not-allowed",
                    }}
                  >
                    STATS
                  </Tab>
                  <Tab
                    bg={"#AB6C93C7"}
                    color={"white"}
                    fontSize={"16px"}
                    fontWeight={400}
                    textAlign={"center"}
                    letterSpacing={"2px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    _selected={{ bg: "#f3c11b", color: "black" }}
                  >
                    {" "}
                    SOCIAL
                  </Tab>
                  <Tab
                    bg={"#AB6C93C7"}
                    color={"white"}
                    fontSize={"16px"}
                    fontWeight={400}
                    textAlign={"center"}
                    letterSpacing={"2px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    _selected={{ bg: "#f3c11b", color: "black" }}
                    isDisabled
                    _disabled={{
                      bg: "#AB6C93C7",
                      color: "white",
                      cursor: "not-allowed",
                    }}
                  >
                    {" "}
                    ROADMAP
                  </Tab>
                </TabList>
              </Flex>
            </Flex>
            <Box w={"100vw"} pb={32}>
              <Box w={"100%"}>
                <TabPanels p={0} m={0} mt={3}>
                  <TabPanel></TabPanel>
                  <TabPanel p={0}>
                    <Box
                      width={"100%"}
                      display={"grid"}
                      gap={5}
                      bg={"#A60062"}
                      p={5}
                    >
                      <Flex
                        w={"90%"}
                        bg={"#AB6C93C7"}
                        mx={"auto"}
                        py={2}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        boxShadow={"0px 0px 10px 5px #59173E"}
                        borderRadius={"10px"}
                      >
                        <Box textAlign={"center"}>
                          <Text fontWeight={400}>
                            {" "}
                            {referredUser && referredUser.length > 0
                              ? referredUser.length
                              : "0"}{" "}
                          </Text>
                          <Text fontSize={"10px"} fontWeight={400}>
                            FRIENDS INVITED
                          </Text>
                        </Box>
                        <Box textAlign={"center"}>
                          <Text fontWeight={400}>
                            {referredUser && referredUser.length > 0
                              ? referredUser.length * 500
                              : "0"}{" "}
                          </Text>
                          <Text fontSize={"10px"} fontWeight={400}>
                            XP EARNED
                          </Text>
                        </Box>
                      </Flex>
                      <Flex
                        w={"90%"}
                        bg={"#AB6C93C7"}
                        mx={"auto"}
                        p={"10px 24px"}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        boxShadow={"0px 0px 10px 5px #59173E"}
                        borderRadius={"10px"}
                      >
                        <Image
                          src="/Icons/light.png"
                          bg={"#FFFFFFB2"}
                          border={"1px solid #59173E"}
                          w={"65px"}
                          h={"65px"}
                          borderRadius={"10px"}
                          p={"10px 13px"}
                        />
                        <Box>
                          <Text fontSize={"15px"} textAlign={"center"}>
                            ASK FRIENDS FOR
                          </Text>
                          <Text fontSize={"15px"} textAlign={"center"}>
                            ENERGY
                          </Text>
                        </Box>
                      </Flex>
                      <Flex
                        w={"90%"}
                        bg={"#AB6C93C7"}
                        mx={"auto"}
                        p={"10px 24px"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        boxShadow={"0px 0px 10px 5px #59173E"}
                        borderRadius={"10px"}
                      >
                        <Image
                          src="/Icons/pink.png"
                          bg={"#FFFFFFB2"}
                          border={"1px solid #59173E"}
                          w={"65px"}
                          h={"65px"}
                          borderRadius={"10px"}
                          p={"10px 13px"}
                        />
                        <Box>
                          <Text fontSize={"15px"} textAlign={"center"}>
                            EARN REWARDS
                          </Text>
                          <Text fontSize={"15px"} textAlign={"center"}>
                            REFERRING FRIENDS
                          </Text>
                        </Box>
                      </Flex>

                      <Flex
                        w={"90%"}
                        gap={2}
                        mx={"auto"}
                        mt={{ base: 5, sm: 10 }}
                      >
                        <Flex
                          width={"50%"}
                          alignItems={"center"}
                          gap={2}
                          bg={"#f3c11b"}
                          justifyContent={"center"}
                          p={3}
                          borderRadius={"10px"}
                          onClick={handleInviteFriend}
                        >
                          <Text
                            fontSize={"12px"}
                            color={"black"}
                            fontWeight={400}
                          >
                            INVITE FRIEND
                          </Text>
                          <Icon as={CiShare2} />
                        </Flex>
                        <Flex
                          width={"50%"}
                          alignItems={"center"}
                          gap={2}
                          justifyContent={"center"}
                          bg={"#f3c11b"}
                          p={3}
                          borderRadius={"10px"}
                          onClick={copyLink}
                        >
                          <Text
                            fontSize={"12px"}
                            color={"black"}
                            fontWeight={400}
                          >
                            COPY LINK
                          </Text>
                          <Icon as={FaRegCopy} />
                        </Flex>
                      </Flex>
                      <Flex
                        w={"90%"}
                        h={"50px"}
                        mx={"auto"}
                        bg={"#35B5FFB2"}
                        boxShadow={"0px 0px 10px 5px #59173E"}
                        borderRadius={"15px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={3}
                      >
                        <Image src="/Icons/fire.png" />
                        <Text>ASK FRIENDS FOR ENERGY</Text>
                      </Flex>
                    </Box>
                  </TabPanel>
                  <TabPanel></TabPanel>
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
