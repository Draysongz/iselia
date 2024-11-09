import {
  Box,
  Flex,
  Text,
  //   Icon,
  Image,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { TonConnectButton } from "@tonconnect/ui-react";

const Boost = [
    {
        name: "ENERGY REFILL",
        image: "/Icons/energy.png",
        coin: "",
        notice: "",
        coinWidth: "",
        btnTxt: "Free(2)"
    },
    {
        name: "ENERGY UPGRADE",
        image: "/Icons/up.png",
        coin: "/gems/1.png",
        notice: "",
        coinWidth: "30px",
        btnTxt: "25"
    },
    {
        name: "DAMAGE MULTIPLIER",
        image: "/gems/1.png",
        coin: "/gems/7.png",
        notice: "2 available",
        coinWidth: "40px",
        btnTxt: "25"
    },
]

const Chest = [
    {
        name: 'DAILY REWARDS',
        image: "/Icons/chest/1.png",
        btnTxt: "CLAIM",
    },
    {
        name: 'BASE TREASURE',
        image: "/Icons/chest/3.png",
        btnTxt: "LOCKED",
    },
    {
        name: 'PREMIUM TREASURE',
        image: "/Icons/chest/2.png",
        btnTxt: "LOCKED",
    },
    {
        name: 'BASE EQUIPMENT',
        image: "/gems/1.png",
        btnTxt: "LOCKED",
    },
    {
        name: 'PREMIUM EQUIPMENT',
        image: "/gems/1.png",
        btnTxt: "LOCKED",
    },
]

interface PlayerProgress {
  coins: number;
  questsCompleted: number;
  monstersKilled: number;
  gemstone: number;
}

export default function Shop() {
  const playerProgress : PlayerProgress= {
    coins: 35000,
    questsCompleted: 2,
    monstersKilled: 500,
    gemstone: 1,
  }

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
        backgroundColor: "#050517B2",
        zIndex: 0,
      }}
    >
      <Flex
        width={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        pt={{ base: 1, sm: 5 }}
        zIndex={0}
        position={'relative'}
      >
        <Box
          bg={"#800080"}
          position={"absolute"}
          top={"-270px"}
          boxShadow="0 0 80px 80px rgba(128, 0, 128, 0.6)" // Adjust opacity as needed
          backdropFilter="blur(8px)"
          w={"270px"}
          h={"270px"}
          borderRadius={"50%"}
          opacity={"70%"}
        />

        <Flex gap={5} w={"100%"} justifyContent={"flex-end"} p={3} pb={5} mb={5}>
          <TonConnectButton />
          <Flex
            // w={"70px"}
            bg={"rgba(0, 0, 0, 0.3)"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={"5px"}
            border={"3px solid black"}
          >
            <Text mx={"auto"} fontSize={"12px"} fontWeight={800} p={"5px 20px"}>
              {" "}
              {playerProgress.coins}{" "}
            </Text>
            <Image src="/gems/1.png" w={"20px"} />
          </Flex>
          <Flex
            // w={"70px"}
            bg={"rgba(0, 0, 0, 0.3)"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={"5px"}
            border={"3px solid black"}
          >
            <Text mx={"auto"} fontSize={"12px"} fontWeight={800} p={"5px 20px"}>
              {" "}
              {playerProgress.gemstone}{" "}
            </Text>
            <Image src="/gems/6.png" w={"20px"} />
          </Flex>
        </Flex>
        <Tabs width={"100%"} variant="unstyled">
          <Box width={"100%"}>
            <Flex
              direction={"column"}
              w={"100%"}
            //   bg={"rgb(72 49 33)"}
              // height={"250px"}
            //   border={"3px solid black"}
            //   borderRadius={"5px"}
              gap={5}
              pb={5}
            >
              {/* <Box
                width={"30%"}
                height={"50px"}
                bg={"rgba(72, 49, 33, 1)"}
                mt={-5}
                mx={"auto"}
                border={"3px solid black"}
                color={"white"}
                fontWeight={800}
                fontSize={"20px"}
                textAlign={"center"}
                borderRadius={"5px"}
                letterSpacing={"2px"}
                sx={{
                  WebkitTextStroke: "1px black", // Custom stroke
                  textStroke: "1px black",
                }}
              >
                SHOP
              </Box> */}
              <Flex w={"100%"} gap={1}>
                <TabList width={"80%"} mx={"auto"}>
                  <Tab
                    display={"flex"}
                    flexDirection={"column"}
                    width={"50%"}
                    opacity={0.2}
                    gap={1}
                    _selected={{
                      borderBottom: "3px solid #0197F6",
                      opacity: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Image src="/gems/7.png" w={"50px"} />
                    <Text
                      mx={"auto"}
                      color={"white"}
                      fontWeight={800}
                      fontSize={"14px"}
                      textAlign={"center"}
                      letterSpacing={"1px"}
                      sx={{
                        WebkitTextStroke: "1px black", // Custom stroke
                        textStroke: "1px black",
                      }}
                    >
                      BOOST
                    </Text>
                  </Tab>
                  <Tab
                    display={"flex"}
                    flexDirection={"column"}
                    width={"50%"}
                    opacity={0.2}
                    gap={1}
                    _selected={{
                      borderBottom: "3px solid #0197F6",
                      opacity: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Image src="/gems/7.png" w={"50px"} />
                    <Text
                      mx={"auto"}
                      color={"white"}
                      fontWeight={800}
                      fontSize={"14px"}
                      textAlign={"center"}
                      letterSpacing={"1px"}
                      sx={{
                        WebkitTextStroke: "1px black", // Custom stroke
                        textStroke: "1px black",
                      }}
                    >
                      CHEST
                    </Text>
                  </Tab>
                </TabList>
              </Flex>
            </Flex>
            <Box
              w={"100%"}
            //   h={{ base: "100vh", sm: "70vh" }}
            //   bg={"rgba(11, 20, 19, 1)"}
              pb={32}
            >
              <Box
                w={"100%"}
                // h={"80%"}
                // border={"5px solid rgba(57, 58, 60, 1)"}
                borderTop={"none"}
                mx={"auto"}
                p={{ base: 2, sm: 3 }}
                justifyItems={"center"}
                // borderBottomRadius={"10px"}
                gap={2}
              >
                <TabPanels>
                  <TabPanel>
                    <Flex direction={"column"} w={"100%"} gap={3}>
                      {/* <Flex direction={'column'}
                      w={"100%"} gap={2}>
                        <Flex
                          w={"100%"}
                          direction={"column"}
                          bg={"rgba(57, 58, 60, 1)"}
                          gap={2}
                          p={2}
                          borderRadius={"5px"}
                        >
                          <Text
                            fontSize={"16px"}
                            fontWeight={800}
                            textAlign={"center"}
                          >
                            ENERGY REFILL
                          </Text>
                          <Image src="/Icons/recharge.png" />
                          <Button
                            bg={"#39d553"}
                            color={"white"}
                            fontWeight={800}
                            fontSize={"20px"}
                            w={"90%"}
                            mx={"auto"}
                            _hover={{ bg: "#39d553" }}
                          >
                            FREE (2)
                          </Button>
                        </Flex>
                        <Flex
                          w={"50%"}
                          direction={"column"}
                          bg={"rgba(57, 58, 60, 1)"}
                          gap={2}
                          p={2}
                          borderRadius={"5px"}
                        >
                          <Text
                            fontSize={"16px"}
                            fontWeight={800}
                            textAlign={"center"}
                          >
                            ENERGY UPGRADE
                          </Text>
                          <Image src="/Icons/buff.png" />
                          <Button
                            bg={"#ffbf31"}
                            display={"flex"}
                            gap={3}
                            alignItems={"center"}
                            textAlign={"center"}
                            w={"90%"}
                            mx={"auto"}
                            _hover={{ bg: "#ffbf31" }}
                          >
                            <Image src="/gems/1.png" w={"30px"} />
                            <Text
                              color={"white"}
                              fontWeight={800}
                              fontSize={"20px"}
                            >
                              25
                            </Text>
                          </Button>
                        </Flex>
                      </Flex> */}
                    {Boost.map((boost) => {
                        return(
                      <Flex
                        bg={"#050517"}
                        w={"100%"}
                        borderRadius={"10px"}
                        justifyContent={'space-between'}
                        p={'5px 20px'}
                        border={'1px solid #f7f7ff'}
                        alignItems={'center'}
                      >
                        <Image src={boost.image} w={"115px"} h={'115px'} />
                        <Flex
                          w={"50%"}
                          height={''}
                          direction={"column"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          py={3}
                          gap={3}
                        //   bg={'red'}
                        >
                          <Text
                            fontSize={"16px"}
                            fontWeight={800}
                            textAlign={"center"}
                            letterSpacing={'2px'}
                          >
                            {boost.name}
                          </Text>
                          <Box w={"100%"}>
                            <Text textAlign={"center"} color={"gray"}>
                              {boost.notice}
                            </Text>
                            <Button
                              bg={"#800080"}
                              display={"flex"}
                              gap={3}
                              alignItems={"center"}
                              textAlign={"center"}
                              w={"90%"}
                              mx={"auto"}
                              border={'2px solid #0197f6'}
                              borderRadius={'10px'}
                              _hover={{ bg: "#800080" }}
                            >
                              <Image src={boost.coin} w={boost.coinWidth} />
                              <Text
                                color={"white"}
                                fontWeight={800}
                                fontSize={"20px"}
                              >
                                {boost.btnTxt}
                              </Text>
                            </Button>
                          </Box>
                        </Flex>
                      </Flex>
                        )
                    })}
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex direction={"column"} w={"100%"} gap={3}>
                    {Chest.map((chest, index) => {
                        return(

                    <Flex
                        key={index}
                        bg={"#050517"}
                        w={"100%"}
                        borderRadius={"10px"}
                        justifyContent={'space-between'}
                        p={'5px 20px'}
                        border={'1px solid #f7f7ff'}
                        alignItems={'center'}
                      >
                        <Image src={chest.image} w={"115px"} h={'115px'} />
                        <Flex
                          w={"50%"}
                          height={''}
                          direction={"column"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          py={3}
                          gap={3}
                        //   bg={'red'}
                        >
                          <Text
                            fontSize={"16px"}
                            fontWeight={800}
                            textAlign={"center"}
                            letterSpacing={'2px'}
                          >
                            {chest.name}
                          </Text>
                          <Box w={"100%"}>
                            <Button
                              bg={"#800080"}
                              display={"flex"}
                              gap={3}
                              alignItems={"center"}
                              textAlign={"center"}
                              w={"90%"}
                              mx={"auto"}
                              border={'2px solid #0197f6'}
                              borderRadius={'10px'}
                              _hover={{ bg: "#800080" }}
                              isDisabled={index > 0}
                            >
                              <Text
                                color={"white"}
                                fontWeight={800}
                                fontSize={"20px"}   
                              >
                                {chest.btnTxt}
                              </Text>
                            </Button>
                          </Box>
                        </Flex>
                      </Flex>
                        )
                    })}
                    </Flex>
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
