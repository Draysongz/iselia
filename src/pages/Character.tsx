import { Box, Flex, Text, Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useCharacter } from "../components/CharacterContext";
import { useNavigate, Link } from "react-router-dom";
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


// const characterArray = [
//   {imageName: "/characters/f222.png"},
//   {imageName: "/characters/f001.png"},
//   {imageName: "/characters/f096.png"},
//   {imageName: "/characters/f023.png"},
//   {imageName: "/characters/f175.png"},
//   {imageName: "/characters/f201.png"},
//   {imageName: "/characters/f082.png"},
//   {imageName: "/characters/f005.png"},
//   {imageName: "/characters/f009.png"},
//   {imageName: "/characters/f040.png"},
//   {imageName: "/characters/f169.png"},
//   {imageName: "/characters/f025.png"},
// ]



// Array to store content for each image


export default function Character() {
  const {user, character} = useUser()
  const {updateUserProfile} = useUserAPI(user?.telegramId!)
  const {fetchCharacters, assignCharacterToUser, characters} = useCharacter(user?.id!)


  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const navigate = useNavigate();
  console.log(selectedContent)


  useEffect(()=>{
    fetchCharacters()
  },[])
  console.log(characters)


  const handleImageClick = async (pick: Char
  ) => {
  

    if (!pick.isUnlocked) return;

    if (character && character.length > 0) {
      let owned = false;
      character.map((userchar) => {
        if (userchar.id === pick.id) {
          owned = true;
        }
      });

      if (owned) {
        return;
      }
    }

    try {
      await assignCharacterToUser(pick.id);
      await updateUserProfile({ isNewPlayer: false });
      setSelectedContent(pick);
      navigate("/team", { state: { selectedContent: pick} });
    } catch (error) {
      console.log(error);
    }
  };








  return (
    <Box
      display="flex"
      flexDirection="column"
      bgImage={"/girls/1.png"}
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
        pb={32}
      >
        <Box
          bg={"#800080"}
          position={"absolute"}
          top={"-270px"}
          boxShadow="0 0 80px 80px rgba(128, 0, 128, 0.6)"
          backdropFilter="blur(8px)"
          w={"270px"}
          h={"270px"}
          borderRadius={"50%"}
          opacity={"70%"}
        />
        <Flex
          gap={5}
          w={"100%"}
          p={4}
          justifyContent={"space-between"}
          zIndex={1}
        >
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

        <Box
          bg={"transparent"}
          w={"95%"}
          border={"24px solid #59173E"}
          display={"grid"}
          gridTemplateColumns="repeat(2, 1fr)"
        >
          {characters
            .sort((a, b) =>
              a.isUnlocked === b.isUnlocked ? 0 : a.isUnlocked ? -1 : 1
            ) // Sort unlocked characters first
            .map((pick) => (
              <Flex
                key={pick.id}
                bgImage={pick.bgImage}
                bgSize={"100% 100%"}
                w={"100%"}
                h={"161px"}
                bgRepeat={"no-repeat"}
                border={"10px solid #FFCE3B"}
                mt={-1}
                position="relative" // Required for overlay
                onClick={() =>
                  pick.isUnlocked ? handleImageClick(pick) : null
                } // Disable click for locked characters
                cursor={pick.isUnlocked ? "pointer" : "not-allowed"} // Change cursor for locked characters
                filter={pick.isUnlocked ? "none" : "grayscale(100%)"} // Grayscale filter for locked characters
                opacity={pick.isUnlocked ? 1 : 0.5} // Dim the appearance of locked characters
              >
                {!pick.isUnlocked && (
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    bg="rgba(0, 0, 0, 0.5)" // Add a semi-transparent overlay
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                  >
                    Locked
                  </Box>
                )}
              </Flex>
            ))}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
