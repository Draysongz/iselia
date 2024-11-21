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
  // Tab,
  TabPanel,
  useToast,
  useTab,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useUser } from "../context/context";
import { useRoyal } from "../hooks/useIselia";
import { useTonConnect } from "../hooks/useTonConnect";
import { useUserAPI } from "../hooks/useUserApi";

const Boost = [
  {
    name: "ENERGY REFILL",
    image: "/Icons/energy.png",
    coin: "",
    notice: "",
    coinWidth: "",
    btnTxt: "Free(2)",
  },
  {
    name: "ENERGY UPGRADE",
    image: "/Icons/up.png",
    coin: "/gems/1.png",
    notice: "",
    coinWidth: "30px",
    btnTxt: "25",
  },
  {
    name: "DAMAGE MULTIPLIER",
    image: "/gems/1.png",
    coin: "/gems/7.png",
    notice: "2 available",
    coinWidth: "40px",
    btnTxt: "25",
  },
];

const Chest = [
  {
    name: "DAILY REWARDS",
    image: "/Icons/chest/1.png",
    btnTxt: "CLAIM",
  },
  {
    name: "BASE TREASURE",
    image: "/Icons/chest/3.png",
    btnTxt: "2 TON",
  },
  {
    name: "PREMIUM TREASURE",
    image: "/Icons/chest/2.png",
    btnTxt: "2 TON",
  },
  {
    name: "BASE EQUIPMENT",
    image: "/gems/1.png",
    btnTxt: "2 TON",
  },
  {
    name: "PREMIUM EQUIPMENT",
    image: "/gems/1.png",
    btnTxt: "2 TON",
  },
];

function CustomTab({ label }: { label: string }) {
  const tabProps = useTab({});
  const isSelected = tabProps["aria-selected"] === true;

  return (
    <Box
      // as="button"
      {...tabProps}
      display={"flex"}
      flexDirection={"column"}
      width={"50%"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Box
        w={"50px"}
        h={"50px"}
        bg={isSelected ? "#f3c11b" : "#AB6C93C7"}
        borderRadius={"10px"}
        boxShadow={"0px 0px 10px 5px #59173E"}
      />
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
        {label}
      </Text>
    </Box>
  );
}

export default function Shop() {
  const { user } = useUser();
  const { updateUserProfile } = useUserAPI(user?.telegramId!);
  const { Deposit } = useRoyal();
  const { connected } = useTonConnect();
  const toast = useToast();

  const handlePayment = async (amount: number, chest: any) => {
    console.log("amount to pay", amount);
    if (!user) return;
    let randomInt;
    if (chest.name === "BASE TREASURE") {
      randomInt = Math.floor(Math.random() * 50000) || 0;
    } else if (chest.name === "PREMIUM TREASURE") {
      randomInt = Math.floor(Math.random() * 100000) || 0;
    }
    if (!connected) {
      toast({
        title: "Please connect wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const dep = await Deposit(amount);
      console.log("amount to pay", dep);
      await updateUserProfile({ coins: user.coins + randomInt! });
      toast({
        title: "Deposit successful",
        description: `You have won ${randomInt} coins `,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
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
        position={"relative"}
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

        <Flex
          gap={3}
          w={"100%"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Box alignSelf={"center"}>
            <TonConnectButton />
          </Box>
          <Flex gap={5} w={"100%"} p={4} justifyContent={"space-between"}>
            <Flex direction={"column"} gap={3}>
              <Link to={"/settings"}>
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
                >
                  {" "}
                  {user && user.coins}{" "}
                </Text>
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
                >
                  {" "}
                  {user && user.coins}{" "}
                </Text>
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
                >
                  {" "}
                  {user && user.coins}{" "}
                </Text>
                <Image
                  src="/Icons/button-hexagon.png"
                  w={"27.56px"}
                  h={"27.56px"}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Tabs width={"100%"} variant="unstyled">
          <Box width={"100%"}>
            <Flex
              direction={"column"}
              w={"100%"}
              bg={"#A60062"}
              // height={"250px"}
              //   border={"3px solid black"}
              //   borderRadius={"5px"}
              gap={5}
              pb={5}
            >
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
                <TabList width={"80%"} mx={"auto"}>
                  <CustomTab label="BOOST" />
                  <CustomTab label="CHEST" />
                </TabList>
              </Flex>
            </Flex>
            <Box w={"100%"} pb={32}>
              <Box
                w={"100%"}
                borderTop={"none"}
                mx={"auto"}
                p={{ base: 2, sm: 3 }}
                justifyItems={"center"}
                gap={2}
              >
                <TabPanels>
                  <TabPanel>
                    <Box
                      display={"grid"}
                      gridTemplateColumns="repeat(2, 1fr)"
                      w={"100%"}
                      gap={3}
                    >
                      {Boost.map((boost) => {
                        return (
                          <Flex
                            bg={"#AB6C93C7"}
                            border={"2px solid #59173E"}
                            direction={"column"}
                            w={"100%"}
                            borderRadius={"10px"}
                            justifyContent={"space-between"}
                            p={"5px"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text
                              fontSize={"10px"}
                              w={"60px"}
                              fontWeight={400}
                              textAlign={"center"}
                              mt={2}
                              // letterSpacing={"2px"}
                            >
                              {boost.name}
                            </Text>
                            {/* <Image src={boost.image} w={"115px"} h={"115px"} /> */}
                            <Image src="/Background/Dungeon.png" mt={3} />
                            <Button
                              w={"95%"}
                              bg={"#f3c11b"}
                              display={"flex"}
                              gap={3}
                              alignItems={"center"}
                              textAlign={"center"}
                              mx={"auto"}
                              h={"39px"}
                              borderRadius={"10px"}
                              _hover={{ bg: "#f3c11b" }}
                            >
                              {/* <Image src={boost.coin} w={boost.coinWidth} /> */}
                              <Text
                                color={"black"}
                                fontWeight={400}
                                fontSize={"12px"}
                              >
                                {/* {boost.btnTxt} */}
                                FREE (2)
                              </Text>
                            </Button>
                          </Flex>
                        );
                      })}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      display={"grid"}
                      gridTemplateColumns="repeat(2, 1fr)"
                      w={"100%"}
                      gap={3}
                    >
                      {Chest.map((chest, index) => {
                        return (
                          <Flex
                            key={index}
                            bg={"#AB6C93C7"}
                            direction={"column"}
                            w={"100%"}
                            borderRadius={"10px"}
                            justifyContent={"space-between"}
                            p={"5px"}
                            gap={2}
                            border={"2px solid #59173E"}
                            alignItems={"center"}
                            gridColumn={index === 0 ? "1 / -1" : "auto"}
                          >
                            <Text
                              fontSize={"10px"}
                              w={"60px"}
                              fontWeight={400}
                              textAlign={"center"}
                              mt={2}
                            >
                              {chest.name}
                            </Text>
                            {/* <Image src={chest.image} w={"115px"} h={"115px"} /> */}
                            <Image src="/Background/Dungeon.png" />
                            <Button
                              w={"95%"}
                              bg={"#f3c11b"}
                              display={"flex"}
                              gap={3}
                              alignItems={"center"}
                              textAlign={"center"}
                              mx={"auto"}
                              h={"39px"}
                              borderRadius={"10px"}
                              _hover={{ bg: "#f3c11b" }}
                              onClick={() => {
                                if (
                                  chest.name === "PREMIUM TREASURE" ||
                                  chest.name === "BASE TREASURE"
                                ) {
                                  handlePayment(2, chest);
                                }
                              }}
                            >
                              <Text
                                color={"black"}
                                fontWeight={400}
                                fontSize={"12px"}
                              >
                                {chest.btnTxt}
                              </Text>
                            </Button>
                          </Flex>
                        );
                      })}
                    </Box>
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
