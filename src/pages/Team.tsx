import { Box, Flex, Text, Icon, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiZeusSword } from "react-icons/gi";
import "../index.css";
import NavigationBar from "../components/NavigationBar";

// interface ContentData {
//   bgImage: string;
//   bg: string;
//   name: string;
//   title: string;
//   description: string;
//   txtImage: string;
// }

interface PlayerProgress {
    coins: number;
    questsCompleted: number;
    monstersKilled: number;
    gemstone: number,
  }
  

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedContent } = location.state || {};

  const [boxBackgrounds, setBoxBackgrounds] = useState<string[]>(Array(4).fill(""));
  const { isOpen, onOpen, onClose }  = useDisclosure();


  const playerProgress : PlayerProgress = {
    coins: 35000,
    questsCompleted: 2,
    monstersKilled: 500,
    gemstone: 1,
  }

  // Function to set a background image for a specific box
  const handleImageClick = (boxIndex: number, imageUrl: string) => {
    setBoxBackgrounds((prevBackgrounds) => {
      const newBackgrounds = [...prevBackgrounds];
      newBackgrounds[boxIndex] = imageUrl;
      return newBackgrounds;
    });
  };

  const handleCharacterBoxClick = () => {
    if (boxBackgrounds[0]) { // Check if a character is selected
      onOpen();
    }
  };

  // Function to confirm and navigate to the home page
  const confirmBattle = () => {
    navigate("/", { state: { bgImage: boxBackgrounds[0] } });
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
        <Flex gap={5} w={"100%"} justifyContent={"flex-end"} p={3} pb={5} mb={5}>
          <Flex
            // w={"70px"}
            bg={"rgba(0, 0, 0, 0.3)"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={"5px"}
            border={"3px solid black"}
          >
            <Text mx={"auto"} fontSize={'12px'} fontWeight={800} p={'5px 20px'}> {playerProgress.coins} </Text>
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
            <Text mx={"auto"} fontSize={'12px'} fontWeight={800} p={'5px 20px'}> {playerProgress.gemstone} </Text>
            <Image src="/gems/6.png" w={"20px"} />
          </Flex>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ready to Battle?</ModalHeader>
            <ModalBody>
              <Text>Are you sure you want to enter the battle?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="green" onClick={confirmBattle}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Box width={"100%"}>
          <Flex
            direction={"column"}
            w={"100%"}
            bg={"rgb(72 49 33)"}
            height={"250px"}
            border={"3px solid black"}
            borderRadius={"5px"}
            gap={5}
            pb={5}
          >
            <Box
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
              Team
            </Box>
            
              <Flex w={"100%"} h={"70%"} gap={1}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Box
                    key={index}
                    w={"25%"}
                    h={"100%"}
                    border={"3px solid rgba(128, 0, 128, 1)"}
                    borderRadius={"5px"}
                    fontSize={"12px"}
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontWeight={800}
                    bgColor={boxBackgrounds[index] ? "none" : "rgba(128, 0, 128, 0.6)"}
                    bgImage={boxBackgrounds[index] ? `url(${boxBackgrounds[index]})` : "none"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}
                    position={'relative'}
                    onClick={index === 0 && boxBackgrounds[0] ? handleCharacterBoxClick:undefined}
                    cursor="pointer"
                  >
                    {boxBackgrounds[index] ? "Character Selected" : "Drag Character here"}

                    {boxBackgrounds[index] ? 
                    <Box
                    w={"100%"}
                    h={"30px"}
                    bg={"rgba(0, 0, 0, 0.6)"}
                    bottom={0}
                    position={"absolute"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={5}
                  >
                    <Icon
                      as={GiZeusSword}
                      bg={"rgba(0, 0, 0, 1)"}
                      boxSize={6}
                    />
                    <Text
                      letterSpacing={"2px"}
                      color={"white"}
                      fontWeight={800}
                      fontSize={"20px"}
                      sx={{
                        WebkitTextStroke: "1px black", // Custom stroke
                        textStroke: "1px black",
                      }}
                    >
                      84
                    </Text>
                  </Box> : <></>}

                  </Box>
                ))}
              </Flex>
            {selectedContent ? (
              <Text
                mx={"auto"}
                color={"white"}
                fontWeight={800}
                fontSize={"20px"}
                textAlign={"center"}
                letterSpacing={"1px"}
                sx={{
                  WebkitTextStroke: "1px black", // Custom stroke
                  textStroke: "1px black",
                }}
              >
                TOTAL DAMAGE: 84
              </Text>
            ) : (
              <Text
                mx={"auto"}
                color={"white"}
                fontWeight={800}
                fontSize={"20px"}
                textAlign={"center"}
                letterSpacing={"1px"}
                sx={{
                  WebkitTextStroke: "1px black", // Custom stroke
                  textStroke: "1px black",
                }}
              >
                TOTAL DAMAGE: 0
              </Text>
            )}
          </Flex>
          <Box
            w={"100%"}
            h={{ base: "55vh", sm: "70vh" }}
            bg={"rgba(11, 20, 19, 1)"}
          >
            <Box
              w={"92%"}
              h={"80%"}
              border={"5px solid rgba(57, 58, 60, 1)"}
              borderTop={"none"}
              mx={"auto"}
              display={"grid"}
              gridTemplateColumns="repeat(3, 1fr)"
              p={{ base: 2, sm: 5 }}
              justifyItems={"center"}
              borderBottomRadius={"10px"}
              gap={2}
            >
              {selectedContent ? (
                <Box
                  w={"100px"}
                  h={{ base: "", sm: "150px" }}
                  borderRadius={"10px"}
                  border={"5px solid rgba(57, 58, 60, 1)"}
                  bgImage={selectedContent.bgImage}
                  bgRepeat={"no-repeat"}
                  bgSize={"100% 100%"}
                  bgPosition={"center"}
                  position={"relative"}
                  onClick={() => handleImageClick(0, selectedContent.bgImage)} 
                >
                  <Box
                    w={"100%"}
                    h={"30px"}
                    bg={"rgba(0, 0, 0, 0.6)"}
                    bottom={0}
                    position={"absolute"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={5}
                  >
                    <Icon
                      as={GiZeusSword}
                      bg={"rgba(0, 0, 0, 1)"}
                      boxSize={6}
                    />
                    <Text
                      letterSpacing={"2px"}
                      color={"white"}
                      fontWeight={800}
                      fontSize={"20px"}
                      sx={{
                        WebkitTextStroke: "1px black", // Custom stroke
                        textStroke: "1px black",
                      }}
                    >
                      84
                    </Text>
                  </Box>
                </Box>
              ) : (
                <Box
                  w={"100px"}
                  h={{ base: "", sm: "150px" }}
                  borderRadius={"10px"}
                  border={"5px solid rgba(57, 58, 60, 1)"}
                  bg={"rgba(11, 20, 19, 0.8)"}
                ></Box>
              )}
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
              <Box
                w={"100px"}
                h={{ base: "", sm: "150px" }}
                borderRadius={"10px"}
                border={"5px solid rgba(57, 58, 60, 1)"}
                bg={"rgba(11, 20, 19, 0.8)"}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
