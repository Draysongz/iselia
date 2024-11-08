import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
// import { useCharacter } from "../components/CharacterContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

// Define a type for the content data
interface ContentData {
  bgImage: string;
  bg: string;
  name: string;
  title: string;
  description: string;
  txtImage: string;
  unlockCondition: string;
  isUnlocked: (progress: PlayerProgress) => boolean;
}

interface PlayerProgress {
  coins: number;
  questsCompleted: number;
  monstersKilled: number;
  gemstone: number;
}

// Array to store content for each image
const contentData: ContentData[] = [
  {
    bgImage: "/girls/small/1.png",
    bg: "/girls/2.png",
    name: "Liarel",
    txtImage: "/Labels/Liarel.png",
    title: "The Enchantress",
    description:
      "Lirael hails from the mystical Forest of Eldoria, where she trained under the ancient sorcerers. Known for her intelligence and wit, she seeks to uncover the lost spells of Iselia.",
    unlockCondition: "Get 30,000 coins to unlock",
    isUnlocked: (progress) => progress.coins >= 30000,
  },
  {
    bgImage: "/girls/small/2.png",
    bg: "/girls/6.png",
    name: "Korin",
    txtImage: "/Labels/Korin.png",
    title: "The Rogue",
    description:
      "Once a street urchin in the bustling city of Valeria, Korin learned to survive by stealing and outsmarting those who sought to exploit him. He now uses his skills to fight against oppression.",
    unlockCondition: "Get 3 Quests to unlock",
    isUnlocked: (progress) => progress.questsCompleted >= 3,
  },
  {
    bgImage: "/girls/small/3.png",
    bg: "/girls/4.png",
    name: "Thalia",
    txtImage: "/Labels/Thalia.png",
    title: "The Warrior",
    description:
      "A member of the renowned Ironclad Clan, Thalia fights to protect her homeland from invading forces. She carries the weight of her clan's legacy and strives to prove herself as a worthy leader.",
    unlockCondition: "Get 30,000 coins to unlock",
    isUnlocked: (progress) => progress.monstersKilled >= 1000,
  },
  {
    bgImage: "/girls/small/4.png",
    bg: "/girls/5.png",
    name: "Zephyr",
    txtImage: "/Labels/Zephyr.png",
    title: "The Trickster",
    description:
      "Zephyr grew up in the bustling markets of Iselia, where she learned the art of trickery and illusion. She uses her talents to entertain and confuse, often getting into trouble for her pranks.",
    unlockCondition: "Get 100,000 coins to unlock",
    isUnlocked: (progress) => progress.coins >= 100000,
  },
];

export default function Character() {

  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const navigate = useNavigate();
  const [showCharacterDetail, setShowCharacterDetail] = useState(false);

  const playerProgress : PlayerProgress = {
    coins: 35000,
    questsCompleted: 2,
    monstersKilled: 500,
    gemstone: 1,
  }

  const handleImageClick = (index: number) => {
    if (contentData[index].isUnlocked(playerProgress)) {
       const newContent = {
        bg: contentData[index].bg,
        bgImage: contentData[index].bgImage,
        description: contentData[index].description,
        isUnlocked: contentData[index].isUnlocked(playerProgress),
        name: contentData[index].name,
        txtImage: contentData[index].txtImage,
        unlockCondition: contentData[index].unlockCondition

       }
      setSelectedContent(newContent);
      setShowCharacterDetail(false); // Reset detail view if any image is clicked
     
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
              {contentData.map((content, index) => {
                const isUnlocked = content.isUnlocked(playerProgress);
                return(
                  <Box
                    key={index}
                    position={"relative"}
                    opacity={content.isUnlocked(playerProgress) ? 1 : 0.4}
                    onClick={() => handleImageClick(index)}
                    cursor={
                      content.isUnlocked(playerProgress)
                        ? "pointer"
                        : "not-allowed"
                    }
                  >
                    <Image
                      src={content.bgImage}
                      width="100%"
                      height="193px"
                      border={
                        selectedContent === content
                          ? "3px solid #0197f6"
                          : "none"
                      }
                      transition="transform 0.2s"
                      _hover={{
                        transform: content.isUnlocked(playerProgress)
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
                        {content.unlockCondition}
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
