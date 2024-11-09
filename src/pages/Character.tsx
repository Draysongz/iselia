import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useCharacter } from "../components/CharacterContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useUser } from "../context/context";
import useCharacter from "../hooks/useCharacter";
import { useUserAPI } from "../hooks/useUserApi";



export interface Char {
  id: string;
  name: string;
  baseDamage: number;
  upgradeLevel: number;
  price: number;
  bg?: string;
  bgImage?: string;
  description?: string;
  isUnlocked?: boolean;
  title?: string;
  txtImage?: string;
  unlockCondition?: string;
  isStarter: boolean;
}





// Array to store content for each image


export default function Character() {
  const {user, character} = useUser()
  const {updateUserProfile} = useUserAPI(user?.telegramId!)
  const {fetchCharacters, characters, assignCharacterToUser} = useCharacter(user?.id!)


  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const navigate = useNavigate();
  const [showCharacterDetail, setShowCharacterDetail] = useState(false);
 

  useEffect(()=>{
    fetchCharacters()
  },[])


  const handleImageClick = async (char: Char) => {
    if(!char.isUnlocked) return ;
    if(character && character.length > 0){
      let owned = false
      character.map((userchar)=>{
       if(userchar.id === char.id){
        owned =true
       }
      })
      if(owned){
        return;
      }
    }
    try {
         await assignCharacterToUser(char.id)
         await  updateUserProfile({isNewPlayer: false})
          setSelectedContent(char); 
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelectCharacterClick = () => {
    setShowCharacterDetail(true); // Show character detail view
  };



  const handleContinueClick = () => {
    if (selectedContent) {
      navigate("/team", { state: { selectedContent } });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgImage={
        selectedContent
          ? `url(${showCharacterDetail ? "/girls/1.png" : selectedContent.bg})`
          : "/girls/3.png"
      }
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      width="100vw"
      minHeight="100vh"
      alignItems="center"
      textColor="white"
      overflow="hidden"
      position="relative"
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
        width="100%"
        minHeight="100vh"
        flexDirection="column"
        alignItems="center"
        zIndex={1}
        // justifyContent={'center'}
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

        <Flex gap={5} w={"100%"} justifyContent={"flex-end"} p={3} pb={5}>
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
              {user && user.coins}{" "}
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
              {user && user.coins}{" "}
            </Text>
            <Image src="/gems/6.png" w={"20px"} />
          </Flex>
        </Flex>

        {selectedContent ? (
          showCharacterDetail ? (
            // Character detail view after clicking "Select Character"
            <Flex
              w={"100%"}
              minH={"100vh"}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              pb={{ base: 32, sm: 32 }}
            >
              <Image src="/Labels/WOItxt.png" mt={{ base: 5, sm: 5 }} />
              <Box
                bg="#050517"
                w="90%"
                border="3px solid #f7f7ff"
                // h={{ base: "", sm: "300px" }}
                borderRadius="10px"
                p="25px 10px"
                gap="10px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mt={{ base: -10, sm: 0 }}
              >
                <Image
                  src={selectedContent.txtImage}
                  w={{ base: "90vw", sm: "auto" }}
                  h={{ base: "80px", sm: "auto" }}
                />
                <Flex direction={"column"} w={"90%"}>
                  <Text fontSize="13px" fontWeight={500}>
                    Congratulations, Eruel! You've just leveled up!
                  </Text>
                  <Text fontSize="13px" fontWeight={500} mt={5}>
                    Your journey through the mystical lands of Iselia has
                    granted you new powers and abilities! Here’s what’s changed:
                  </Text>
                  <Text
                    fontSize="13px"
                    fontWeight={500}
                    mt={5}
                    color={"#0197f6"}
                  >
                    New Level Character: 
                    <span className="text-[#f7f7ff] ml-1">
                      {selectedContent.name}
                    </span>
                  </Text>
                  <Text fontSize="13px" fontWeight={500} color={"#0197f6"}>
                    Skill Points: 
                    <span className="text-[#f7f7ff] mt-1">
                      You've earned 5 Skill Points to enhance your abilities! 💪
                    </span>
                  </Text>
                  <Text
                    fontSize={"13px"}
                    color={"#0197f6"}
                    fontWeight={500}
                    mt={5}
                  >
                    Unlocks:
                  </Text>
                  <Text fontSize="13px" fontWeight={500} color={"#0197f6"}>
                    New Skills: 
                    <span className="text-[#f7f7ff] ml-2">
                      Discover powerful new skills that can turn the tide of
                      battle!
                    </span>
                  </Text>
                  <Text fontSize="13px" fontWeight={500} color={"#0197f6"}>
                    Gear Upgrades: 
                    <span className="text-[#f7f7ff] ml-2">
                      Access advanced gear to boost your stats and style! 🛡️⚔️
                    </span>
                  </Text>
                </Flex>
                <Button
                  mt={2}
                  w={"90%"}
                  bg={"#800080"}
                  border={"2px solid #0197f6"}
                  color={"#f7f7ff"}
                  fontSize={"20px"}
                  fontWeight={500}
                  h={"47px"}
                  onClick={handleContinueClick}
                >
                  Continue
                </Button>
              </Box>
            </Flex>
          ) : (
            // Character selection view
            <Box
              bg="#050517"
              w="100%"
              border="3px solid #f7f7ff"
              h={{ base: "290px", sm: "395.45px" }}
              borderRadius="10px"
              p="25px 10px"
              gap="10px"
              textAlign="center"
              position="absolute"
              bottom={24}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              // Click anywhere to return to image selection
            >
              <Image
                src={selectedContent.txtImage}
                w={{ base: "200px", sm: "auto" }}
              />
              <Text
                w={"120px"}
                h={"26px"}
                fontSize={"12px"}
                fontWeight={"500"}
                lineHeight={"15.93px"}
                textAlign={"center"}
                p={"5px 10px"}
                borderRadius={"3px"}
                bg={"#0197f6"}
                color={"#050517"}
                mt={-1}
              >
                {selectedContent.title}
              </Text>
              <Text
                fontSize={{ base: "14px", sm: "16px" }}
                w="317px"
                h={{ base: "90px", sm: "105px" }}
              >
                {selectedContent.description}
              </Text>
              <Button
                border="3px solid #0197f6"
                bg="#800080"
                width="90%"
                h={{ base: "40px", sm: "53px" }}
                borderRadius="10px"
                padding="10px"
                color="#f7f7ff"
                fontSize={{ base: "14px", sm: "20px" }}
                mt={{ base: 0, sm: 5 }}
                fontWeight={500}
                textAlign="center"
                onClick={handleSelectCharacterClick} // Show character detail view
              >
                Select Character
              </Button>
            </Box>
          )
        ) : (
          <Flex
            direction={"column"}
            width={"100%"}
            alignItems={"center"}
            pt={10}
          >
            <Image src="/Labels/select.png" mt={{ base: 0, sm: 24 }} />
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={2}
              w="90%"
              justifyContent="space-between"
              mt={{ base: -14, sm: -10 }}
            >
              {characters && characters.map((character, index) => {
                const isUnlocked = character.isUnlocked;
                return(
                  <Box
                    key={index}
                    position={"relative"}
                    opacity={isUnlocked ? 1 : 0.4}
                    onClick={() => handleImageClick(character)}
                    cursor={
                      isUnlocked ? "pointer" : "not-allowed"
                    }
                  >
                    <Image
                      src={character.bgImage}
                      width="100%"
                      height="193px"
                      border={
                        selectedContent === character
                          ? "3px solid #0197f6"
                          : "none"
                      }
                      transition="transform 0.2s"
                      _hover={{
                        transform: isUnlocked
                          ? "scale(1.05)"
                          : "none",
                      }}
                    />

                    {!isUnlocked && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="rgba(0, 0, 0, 0.6)"
                        color="white"
                        fontWeight="bold"
                        fontSize="14px"
                        textAlign="center"
                        px={2}
                        opacity={0}
                        _hover={{ opacity: 1 }} // Show overlay on hover
                      >
                        {character.unlockCondition}
                      </Box>
                    )}
                  </Box>
                )
})}
            </Box>
          </Flex>
        )}
      </Flex>
      <NavigationBar />
    </Box>
  );
}
