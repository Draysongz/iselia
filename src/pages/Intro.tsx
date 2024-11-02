import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import "../index.css";

export default function Intro() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgImage={"../girls/1.png"}
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
        backgroundColor: "#050517B2", // Adjust opacity here
        zIndex: 0,
      }}
    >
      <Flex
        width={"100%"}
        height={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={3}
        gap={5}
        zIndex={0}
        position={"relative"}
        // bg={'red'}
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
        <Flex direction={"column"} gap={{ base: 2, sm: 5 }} w={"100%"} justifyContent={'center'} alignItems={'center'}>
          <Flex alignItems={"center"} direction={"column"} gap={1} w={"100%"} mt={16}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"90%"}
              h={"348px"}
              border={"3px solid #f7f7ff"}
              bg={"#050517"}
              p={"10px"}
              gap={"10px"}
              borderRadius={"10px"}
            >
              <Image
                src="/Labels/WOItxt.png"
                w={"217px"}
                h={"120px"}
                mx={"auto"}
              />
              <Text
                w={"90%"}
                h={"168px"}
                fontSize={"16px"}
                fontWeight={500}
                textAlign={"center"}
                color={"#f7f7ff"}
                lineHeight={"21.24px"}
                mt={-5}
              >
                Dive into the enchanting realm of Iselia, where adventure and
                allure intertwine. Players explore a vibrant world filled with
                diverse characters, each possessing unique abilities and
                captivating backstories. Engage in thrilling quests, forge
                alliances, and uncover the secrets of Iselia's past.
              </Text>
            </Box>
          </Flex>
          <Button border={'3px solid #050517'} bg={'#800080'} width={'90%'}  position={'absolute'} bottom={5} h={'53px'} borderRadius={'10px'} padding={'10px'} color={'#f7f7ff'} fontSize={'20px'} fontWeight={500} textAlign={'center'}>
            Let's Go
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
