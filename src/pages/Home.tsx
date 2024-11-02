import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import "../index.css";
import NavigationBar from "../components/NavigationBar";

export default function Home() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgImage={"../girls/2.png"}
      bgRepeat={"no-repeat"}
      bgPosition={"center"}
      bgSize={"110% 100%"}
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
        backgroundColor: "#05051780",
        zIndex: 0,
      }}
    >
      <Flex
        width={"100%"}
        height={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        pt={10}
        zIndex={0}
      >
        
        <Image src="/Labels/WOItxt.png" />
        <Text w={'40%'} h={'33px'} fontSize={'10px'} fontWeight={500} textAlign={'center'} color={'#f7f7ff'} border={'1px solid #0197f6'} bg={'#8000804D'} borderRadius={'10px'} p={'10px'} mt={-10}>
        Lirael - The Enchantress
        </Text>
        <Flex w={"90%"} justifyContent={'space-between'} mt={10}>
            <Box w={'120px'} h={'78.96px'} borderRadius={'10px'} bg={'#8000804D'} border={'1px solid #0197f6'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'5px'} p={'10px'}>
                <Image src="/Icons/Calender.png" w={'35px'} h={'40.96px'}/>
                <Text fontSize={'10px'} fontWeight={500} lineHeight={'13.27px'} textAlign={'center'} color={'#f7f7ff'}>
                Claim Daily Reward
                </Text>
            </Box>
            <Box w={'120px'} h={'78.96px'} borderRadius={'10px'} bg={'#8000804D'} border={'1px solid #0197f6'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'5px'} p={'10px'}>
                <Image src="/Icons/Calender.png" w={'35px'} h={'40.96px'}/>
                <Text fontSize={'10px'} fontWeight={500} lineHeight={'13.27px'} textAlign={'center'} color={'#f7f7ff'}>
                02:30:45
                </Text>
            </Box>
        </Flex>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
