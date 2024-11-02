import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

// Define a type for the content data
interface ContentData {
  bgImage: string;
  title: string;
  description: string;
  txtImage: string;
}

// Array to store content for each image
const contentData: ContentData[] = [
  {
    bgImage: "/girls/small/1.png",
    txtImage: "/Labels/Liarel.png",
    title: "The Enchantress",
    description: "Lirael hails from the mystical Forest of Eldoria, where she trained under the ancient sorcerers. Known for her intelligence and wit, she seeks to uncover the lost spells of Iselia.",
  },
  {
    bgImage: "/girls/small/2.png",
    txtImage: "/Labels/Korin.png",
    title: "The Rogue",
    description: "Once a street urchin in the bustling city of Valeria, Korin learned to survive by stealing and outsmarting those who sought to exploit him. He now uses his skills to fight against oppression.",
  },
  {
    bgImage: "/girls/small/3.png",
    txtImage: "/Labels/Thalia.png",
    title: "The Warrior",
    description: "A member of the renowned Ironclad Clan, Thalia fights to protect her homeland from invading forces. She carries the weight of her clan's legacy and strives to prove herself as a worthy leader.",
  },
  {
    bgImage: "/girls/small/4.png",
    txtImage: "/Labels/Zephyr.png",
    title: "The Trickster",
    description: "Zephyr grew up in the bustling markets of Iselia, where she learned the art of trickery and illusion. She uses her talents to entertain and confuse, often getting into trouble for her pranks.",
  },
];

export default function Character() {
  // Use ContentData type for selectedContent
  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [showCharacterDetail, setShowCharacterDetail] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedContent(contentData[index]);
    setShowCharacterDetail(false); // Reset detail view if any image is clicked
  };

  const handleSelectCharacterClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent this click from triggering the background click
    setShowCharacterDetail(true);
  };

  const handleReturnToImageSelection = () => {
    if (selectedContent && !showCharacterDetail) {
      // Only reset if in "Select Character" content
      setSelectedContent(null);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgImage={ selectedContent ? `url(${selectedContent.bgImage})` : "/girls/3.png"}
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
        height="100vh"
        flexDirection="column"
        alignItems="center"
        pt={10}
        zIndex={1}
      >
        {selectedContent ? (
          showCharacterDetail ? (
            // Character detail view after clicking "Select Character"
            <Box
              bg="#8000804D"
              borderRadius="10px"
              p="20px"
              mt={-10}
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text fontSize="20px" fontWeight={700}>
                {selectedContent.title} - Ready for Adventure!
              </Text>
              <Text fontSize="14px" mt={2}>
                Prepare yourself, {selectedContent.title}. Your journey begins here.
              </Text>
              <Button mt={4} colorScheme="blue">
                Start Game
              </Button>
            </Box>
          ) : (
            // Character selection view
            <Box
              bg="#050517"
              w="100%"
              border="3px solid #f7f7ff"
              h={{ base: "250px", sm: "395.45px" }}
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
              onClick={handleReturnToImageSelection} // Click anywhere to return to image selection
            >
              <Image src={selectedContent.txtImage} w={{ base: "200px", sm: "auto" }} />
              <Text fontSize={{ base: "14px", sm: "16px" }} w="317px" h={{ base: "90px", sm: "105px" }}>
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
          <>
            <Image src="/Labels/select.png" mt={{ base: 0, sm: 10 }} />
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={2}
              w="90%"
              justifyContent="space-between"
              mt={{ base: -14, sm: 10 }}
            >
              {contentData.map((content, index) => (
                <Image
                  key={index}
                  src={content.bgImage}
                  width="100%"
                  height="193px"
                  onClick={() => handleImageClick(index)}
                  cursor="pointer"
                  border={selectedContent === content ? "3px solid #0197f6" : "none"}
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              ))}
            </Box>
          </>
        )}
      </Flex>
      <NavigationBar />
    </Box>
  );
}
