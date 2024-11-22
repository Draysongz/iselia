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
    { name: "Funky Lemur", maxHp: 420, image: "/Monsters/M1.png" },
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
        pt={1}
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
        {user && !user.isNewPlayer ? (
          <>
            <Box textAlign={"center"} mt={{base: -4, sm: 0}}>
              <Text fontSize={"15px"} lineHeight={"18.13px"}>
                Level 1
              </Text>
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Box position={"relative"}>
                  <Image src="Icons/hexagon.png" />
                  <Text
                    fontSize={"11px"}
                    fontWeight={400}
                    position={"absolute"}
                    top={"30%"}
                    left={"21.5%"}
                  >
                    BUBBLE JUNGLE
                  </Text>
                </Box>
                <Box position={"relative"} ml={-6}>
                  <Image src="/Icons/circle.png" w={"62px"} />
                  <Text
                    color={"#ff0097"}
                    fontSize={"20px"}
                    fontWeight={400}
                    position={"absolute"}
                    top={"25%"}
                    left={"26%"}
                  >
                    1/9
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box
              textAlign={"center"}
              w={"100vw"}
              display={"flex"}
              flexDirection={"column"}
              mt={3}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text fontSize={"24px"} lineHeight={"29.02px"}>
                17.95K
              </Text>
              <Flex
                w={"90%"}
                mt={1}
                bgImage={"../Background/progressbg.png"}
                bgRepeat={"no-repeat"}
                backgroundSize={"100%"}
                h={"33px"}
              >
                <Flex
                  alignItems={"center"}
                  gap={2}
                  mt={-2}
                  mx={"auto"}
                  w={"93%"}
                >
                  <Progress
                    className="monster"
                    value={(monsterProgress / currentMonster.maxHp) * 100} // Display as percentage
                    size="sm"
                    bg={"transparent"}
                    w={"100%"}
                    borderRadius={"2px"}
                    mt={{ base: "2px", sm: "6px" }}
                    ml={{ base: "-1px", sm: "1px" }}
                    h={"13px"}
                    position={"relative"}
                    sx={{
                      "& > div": {
                        background:
                          "linear-gradient(270deg, #A1C472 1.18%, #000000 115.1%)",
                      },
                    }}
                  />
                  <Text
                    display={"flex"}
                    position={"absolute"}
                    w={"80%"}
                    justifyContent={"space-between"}
                    ml={1}
                    mt={1}
                    alignItems={"center"}
                    fontSize={"10px"}
                  >
                    {currentMonster.name}
                    <span className="text-[10px] font-extrabold">
                      {monsterProgress} HP
                    </span>
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Flex
              direction={"column"}
              w={"100%"}
              h={{ base: "400px", sm: "600px" }}
              mt={{base: 0, sm: -2}}
              alignItems={"center"}
              pt={{ base: 3, sm: 10 }}
            >
              <Flex
                w={{ base: "225px", sm: "400px" }}
                h={{ base: "225px", sm: "400px" }}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleCardClick}
                bg={"#FFDF80"}
                border={"8px solid #59173E"}
                borderRadius={"50%"}
                p={4}
              >
                <Image
                  src={currentMonster.image}
                  transition="transform 0.2s"
                  mx={"auto"}
                />
              </Flex>
              <Flex direction={'column'} w={'60%'} mt={{base: 3, sm: 5}}>
                <Flex gap={2}>
                {character && character.length > 0 && character.map((char, index)=>{
                  return (
                    <Link to={'/characters'}>
                    <Image
                      key={index}
                      borderRadius={"50%"}
                      src={char.bgImage}
                      w={{ base: "45px", sm: "65px" }}
                      h={{ base: "45px", sm: "65px" }}
                    />
                    </Link>
                  );
                })}
                 </Flex>
              <Flex
                alignItems={"center"}
                backgroundSize={"100% 100%"}
                w={"100%"}
                mt={{ base: 2, sm: 2 }}
                bgImage={"../Icons/energybar.png"}
                bgRepeat={"no-repeat"}
                h={{ base: "32px", sm: "50px" }}
                justifyContent={"center"}
              >
                <Text fontSize={"10px"}>100 / 500</Text>
              </Flex>
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
