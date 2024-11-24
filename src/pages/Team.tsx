import {
  Box,
  Flex,
  Text,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { GiZeusSword } from "react-icons/gi";
import "../index.css";
import NavigationBar from "../components/NavigationBar";
import { useUser } from "../context/context";

// import useCharacter from "../hooks/useCharacter";

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedContent } = location.state || {};
  const { user, character } = useUser();
  console.log(character);
  console.log(user);
  // const { fetchUserCharacters } = useCharacter(user?.id!);

  const [boxBackgrounds, setBoxBackgrounds] = useState<string[]>(
    Array(4).fill("")
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to set a background image for a specific box
  const handleImageClick = (boxIndex: number, imageUrl: string) => {
    setBoxBackgrounds((prevBackgrounds) => {
      const newBackgrounds = [...prevBackgrounds];
      newBackgrounds[boxIndex] = imageUrl;
      return newBackgrounds;
    });
  };

  const handleCharacterBoxClick = () => {
    if (boxBackgrounds[0]) {
      // Check if a character is selected
      onOpen();
    }
  };

  const calculateTotalDamage = ()=>{
    let totalDamage = 0
    for (let index = 0; index < character.length; index++) {
      totalDamage= totalDamage + character[index].baseDamage
    }
    return totalDamage
  }

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
            bg={"#A60062"}
            height={"180px"}
            borderRadius={"5px"}
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
              Team
            </Box>

            <Flex
              w={"100%"}
              h={"70%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Box
                    key={index}
                    w={"25%"}
                    h={"100%"}
                    // border={"3px solid rgba(128, 0, 128, 1)"}
                    borderRadius={"5px"}
                    fontSize={"12px"}
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontWeight={800}
                    // bgColor={
                    //   boxBackgrounds[index] ? "none" : "rgba(128, 0, 128, 0.6)"
                    // }
                    bgImage={
                      boxBackgrounds[index]
                        ? `url(${boxBackgrounds[index]})`
                        : "/Background/card.png"
                    }
                    bgRepeat={"no-repeat"}
                    bgPos={"center"}
                    bgSize={"80% 100%"}
                    position={"relative"}
                    onClick={
                      index === 0 && boxBackgrounds[0]
                        ? handleCharacterBoxClick
                        : undefined
                    }
                    cursor="pointer"
                  >
                    {
                      boxBackgrounds[index] ? "Character Selected" : ""
                      // "Drag Character here"
                    }

                    {boxBackgrounds[index] ? (
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
                    ) : (
                      <></>
                    )}
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
                TOTAL DAMAGE: {calculateTotalDamage()}
              </Text>
            )}
          </Flex>
          <Box w={"100%"} h={{ base: "55vh", sm: "70vh" }}>
            <Box
              w={"92%"}
              h={"80%"}
              borderTop={"none"}
              mx={"auto"}
              display={"grid"}
              gridTemplateColumns="repeat(4, 1fr)"
              p={{ base: 2, sm: 5 }}
              justifyItems={"center"}
              borderBottomRadius={"10px"}
              gap={2}
            >
              {selectedContent ? (
                <Box
                  w={"100%"}
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
                <Box w={"85vw"} h={{ base: "55vh", sm: "70vh" }} >
                  <Box
                    w={"100%"}
                    h={"80%"}
                    mx={"auto"}
                    display={"flex"}
                    flexWrap={"wrap"} // Allows boxes to wrap to the next row
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={4} // Space between items
                    p={{ base: 2, sm: 4 }}
                    borderBottomRadius={"10px"}
                  >
                    {Array.from({ length: 12 }).map((_, index) => {
                      const isCharacterAvailable = character[index];
                      return (
                        <Box
                          key={index}
                          flex={"1 0 18%"} // Adjusts size: 22% of the container width with wrapping
                          maxW={"22%"} // Ensures the box doesn't exceed 22% width
                          h={{ base: "180px", sm: "100px" }} // Box height
                          borderRadius={"10px"}
                          bgImage={
                            isCharacterAvailable ? character[index].bgImage! : ""
                            
                          }
                          bgRepeat={
                            isCharacterAvailable ? "no-repeat" : undefined
                          }
                          bgSize={isCharacterAvailable ? "cover" : undefined}
                          bgPosition={"center"}
                          position={"relative"}
                          onClick={
                            isCharacterAvailable
                              ? () =>
                                  handleImageClick(
                                    index,
                                    character[index].bgImage!
                                  )
                              : undefined
                          }
                          border={"2px solid #59173E"}
                        >
                          {isCharacterAvailable && (
                            <Box
                              w={"100%"}
                              h={"30px"}
                              bg={"rgba(0, 0, 0, 0.6)"}
                              bottom={0}
                              position={"absolute"}
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              px={2}
                            >
                              <Icon
                                as={GiZeusSword}
                                bg={"rgba(0, 0, 0, 1)"}
                                boxSize={6}
                                color={"white"}
                              />
                              <Text
                                letterSpacing={"2px"}
                                color={"white"}
                                fontWeight={800}
                                fontSize={"16px"}
                                sx={{
                                  WebkitTextStroke: "1px black",
                                }}
                              >
                                {character[index].baseDamage || 0}{" "}
                                {/* Adjust based on available data */}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
