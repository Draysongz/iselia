import { Box, Flex, Image, Progress } from "@chakra-ui/react";
import "../index.css";

export default function Loading() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bg={"#050517"}
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
      >
        <Box
          bg={"#3F3E0F"}
          position={"absolute"}
          top={"-270px"}
          boxShadow="0 0 80px 80px #3F3E0F" // Adjust opacity as needed
          backdropFilter="blur(8px)"
          w={"270px"}
          h={"270px"}
          borderRadius={"50%"}
          opacity={"70%"}
          //   mt={-72}
        />
        <Flex
          direction={"column"}
          gap={4}
          opacity={"70%"}
          justifyContent={"center"}
          alignItems={"center"}
          // mt={"-100px"}
        >
          <Image src="./Labels/logo.svg" w={"50%"} h={"50%"} />
          <Image src="./Labels/text.svg" w={"50%"} h={"50%"} />

          <Flex alignItems={"center"} direction={"column"} gap={1}>
            <Progress
              value={60}
              size="sm"
              bg={"transparent"}
              border={"3px solid #f7f7ff "}
              w={"220px"}
              h={"29px"}
              sx={{
                "& > div": {
                  backgroundColor: "#E7E247",
                  boxShadow: "0px 0px 50px #E7E247",
                },
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* <NavigationBar /> */}
    </Box>
  );
}
