import { Box, Flex, Text, Image, Progress } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import NavigationBar from "../components/NavigationBar";
import { useUser } from "../context/context";
import useCharacter from "../hooks/useCharacter";
import { useUserAPI } from "../hooks/useUserApi";

// interface ContentData {
//   bgImage: string;
//   bg: string;
//   name: string;
//   title: string;
//   description: string;
//   txtImage: string;
// }

interface Monster {
  name: string;
  maxHp: number;
  image: string;
}


export default function Home() {
  // const location = useLocation();
  const { user, character } = useUser();
  const { updateUserProfile } = useUserAPI(user?.telegramId!);
  const { fetchUserCharacters } = useCharacter(user?.id!);

  useEffect(() => {
    fetchUserCharacters();
  }, [user]);

  // const { selectedContent } = location.state || {};

  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [damageValues, setDamageValues] = useState<number[]>([]); // Array of damage values
  const [characterProgress, setCharacterProgress] = useState(100); // Character's progress
  const [showGems, setShowGems] = useState(false); // To control gem display
  const [isTapping, setIsTapping] = useState(false); // Track if the player is tapping

  // Array of monsters with unique HP, names, and images
  const monsters: Monster[] = [
    { name: "Monster 1", maxHp: 1000, image: "/Monsters/M1.png" },
    { name: "Monster 2", maxHp: 1200, image: "/Monsters/M2.png" },
    { name: "Monster 3", maxHp: 1500, image: "/Monsters/M3.png" },
    { name: "Monster 4", maxHp: 2000, image: "/Monsters/M4.png" },
  ];

  useEffect(() => {
    if (character && Array.isArray(character)) {
      const damage = character.map((char) => char.baseDamage || 0); // Fallback to 0 if baseDamage is undefined
      setDamageValues(damage);
    }
  }, [character]);



  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);
  const currentMonster = monsters[currentMonsterIndex];
  const [monsterProgress, setMonsterProgress] = useState(currentMonster.maxHp);
  const [regenRate, setRegenRate] = useState(100);
  const [totalDamageDealt, setTotalDamageDealt] = useState(0);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (monsterProgress > 0 && characterProgress > 0) {
      // Set tapping state to true
      setIsTapping(true);

      console.log(damageValues);

      // Randomly pick a damage value from the array
      const damage = damageValues;
      const totalDamage = damage.reduce((acc, curr) => acc + curr, 0);
      setTotalDamageDealt((prev) => prev + totalDamage);

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${
        -y / 10
      }deg) rotateY(${x / 10}deg)`;
      setTimeout(() => {
        card.style.transform = "";
      }, 100);

      setMonsterProgress((prev) => Math.max(prev - totalDamage, 0)); // Reduce monster's progress
      setPoints(points + totalDamage);
      setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
      setCharacterProgress((prev) => Math.max(prev - 2, 0)); // Reduce character progress by 2
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  // Increment character progress when not tapping
  useEffect(() => {
    if (!isTapping && characterProgress < 100) {
      const interval = setInterval(() => {
        setCharacterProgress((prev) => Math.min(prev + 2, 100));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isTapping, characterProgress]);
  // Initial regen rate for the first monster

  // Update regen rate when a new monster is loaded
  useEffect(() => {
    setRegenRate((prev) => prev + currentMonsterIndex * 2); // Increase rate by 0.5 with each monster
    setMonsterProgress(currentMonster.maxHp); // Reset monster HP
  }, [currentMonsterIndex]);

  // Regenerate monster HP over time, scaling the rate with each new monster
  useEffect(() => {
    if (monsterProgress === 0 && currentMonsterIndex < monsters.length - 1)
      return;
    const interval = setInterval(() => {
      setMonsterProgress((prevProgress) =>
        Math.min(prevProgress + regenRate, currentMonster.maxHp)
      );
    }, 200);

    // Clear interval when component unmounts or new monster appears
    return () => clearInterval(interval);
  }, [regenRate, currentMonster]);

  // Track if the player is no longer tapping to stop progress decrement
  useEffect(() => {
    if (isTapping) {
      const timeout = setTimeout(() => setIsTapping(false), 500); // 500ms delay to detect stop tapping

      return () => clearTimeout(timeout);
    }
  }, [isTapping]);

  // Effect to handle monster defeat and transition to next monster
  useEffect(() => {
    const monsterset = async () => {
      if (monsterProgress === 0 && currentMonsterIndex < monsters.length - 1) {
        if (!user) return;
        const rewards = Math.floor(totalDamageDealt / 10);
        await updateUserProfile({ coins: user.coins + rewards });
        setShowGems(true);
        setTimeout(() => {
          setShowGems(false);
          setCurrentMonsterIndex((prev) => prev + 1);
          setMonsterProgress(monsters[currentMonsterIndex + 1].maxHp);
          setTotalDamageDealt(0);
        }, 2000);
      }
    };

    monsterset();
  }, [monsterProgress, currentMonsterIndex]);

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
        height={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        pt={5}
        zIndex={0}
      >
        <Flex gap={5} w={"100%"} justifyContent={"flex-end"} p={3}>
          <Flex
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
         
        </Flex>
        {user && !user.isNewPlayer ? (
          <>
            <Text
              w={"40%"}
              h={"33px"}
              fontSize={"13px"}
              fontWeight={500}
              textAlign={"center"}
              color={"#f7f7ff"}
              border={"1px solid #0197f6"}
              bg={"#8000804D"}
              borderRadius={"10px"}
              alignContent={"center"}
            >
              {/* {selectedContent.name} - {selectedContent.title} */}
            </Text>
            <Flex w={"90%"} mt={10}>
              <Flex
                alignItems={"center"}
                gap={2}
                mt={-3}
                mx={"auto"}
                w={"100%"}
              >
                <Progress
                  className="monster"
                  value={(monsterProgress / currentMonster.maxHp) * 100} // Display as percentage
                  size="sm"
                  bg={"transparent"}
                  border={"3px solid #f7f7ff "}
                  borderRadius={"5px"}
                  w={"100%"}
                  h={"29px"}
                  position={"relative"}
                  sx={{
                    "& > div": {
                      background: "#800080",
                    },
                  }}
                />
                <Text
                  display={"flex"}
                  position={"absolute"}
                  w={"88%"}
                  justifyContent={"space-between"}
                  ml={1}
                  alignItems={"center"}
                  p={"5px"}
                >
                  {currentMonster.name}
                  <span className="text-2xl font-extrabold">
                    {monsterProgress} HP
                  </span>
                </Text>
              </Flex>
            </Flex>

            <Flex
              direction={"column"}
              w={"100%"}
              h={{ base: "400px", sm: "600px" }}
              mt={2}
              gap={6}
              alignItems={"center"}
              pt={{ base: 3, sm: 10 }}
            >
              <Box w={"100%"} onClick={handleCardClick}>
                <Image
                  src={currentMonster.image}
                  h={{ base: "250px", sm: "320px" }}
                  className="scale"
                  transition="transform 0.2s"
                  mx={"auto"}
                />
              </Box>
              <Flex
                direction={character.length > 1 ? "column-reverse" : "row"}
                alignItems={"center"}
                gap={2}
                mt={{ base: 0, sm: 16 }}
              >
                <Flex direction={"row"}>
                  {character &&
                    character.length > 0 &&
                    character.map((char, index) => {
                      return (
                        <Image key={index} src={char.bgImage} w={"65px"} />
                      );
                    })}
                </Flex>
                <Progress
                  className="character"
                  value={characterProgress}
                  size="sm"
                  bg={"transparent"}
                  border={"3px solid #f7f7ff "}
                  w={"220px"}
                  h={"29px"}
                  sx={{
                    "& > div": {
                      background: "#800080",
                    },
                  }}
                />
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Image src="/Labels/WOItxt.png" mt={3} />
            <Text
              w={"40%"}
              h={"33px"}
              fontSize={"13px"}
              fontWeight={500}
              textAlign={"center"}
              color={"#f7f7ff"}
              border={"1px solid #0197f6"}
              bg={"#8000804D"}
              borderRadius={"10px"}
              alignContent={"center"}
            >
              <Link to={"/characters"}>Select a Character</Link>
            </Text>
            <Flex w={"90%"} justifyContent={"space-between"} mt={10}>
              <Box
                w={"120px"}
                h={"78.96px"}
                borderRadius={"10px"}
                bg={"#8000804D"}
                border={"1px solid #0197f6"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"5px"}
                p={"10px"}
              >
                <Image src="/Icons/Calender.png" w={"35px"} h={"40.96px"} />
                <Text
                  fontSize={"10px"}
                  fontWeight={500}
                  lineHeight={"13.27px"}
                  textAlign={"center"}
                  color={"#f7f7ff"}
                >
                  Claim Daily Reward
                </Text>
              </Box>
              <Box
                w={"120px"}
                h={"78.96px"}
                borderRadius={"10px"}
                bg={"#8000804D"}
                border={"1px solid #0197f6"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"5px"}
                p={"10px"}
              >
                <Image src="/Icons/Calender.png" w={"35px"} h={"40.96px"} />
                <Text
                  fontSize={"10px"}
                  fontWeight={500}
                  lineHeight={"13.27px"}
                  textAlign={"center"}
                  color={"#f7f7ff"}
                >
                  02:30:45
                </Text>
              </Box>
            </Flex>
          </>
        )}
      </Flex>

      {clicks.map((click) => (
        <div
          key={click.id}
          className=" flex absolute text-2xl gap-2  opacity-0  pointer-events-none text-[red] font-extrabold"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: "float 1s ease-out",
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          🛡️⚔️
          <Text>
            {damageValues[Math.floor(Math.random() * damageValues.length)]}
          </Text>
          <Text>
            {damageValues[Math.floor(Math.random() * damageValues.length)]}
          </Text>
          <Text>
            {damageValues[Math.floor(Math.random() * damageValues.length)]}
          </Text>
        </div>
      ))}

      {showGems && (
        <div className="gems-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`gems-falling-animation gemstone-${
                Math.floor(Math.random() * 4) + 1
              }`}
              style={{ left: `${Math.random() * 100}vw` }}
            />
          ))}
        </div>
      )}

      <NavigationBar />
    </Box>
  );
}
