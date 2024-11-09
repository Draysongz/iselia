import { Box, Flex, Text, Image, Progress } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import NavigationBar from "../components/NavigationBar";
import { useUser } from "../context/context";

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

interface PlayerProgress {
  coins: number;
  questsCompleted: number;
  monstersKilled: number;
  gemstone: number,
}

export default function Home() {
  const location = useLocation();
  const {user} = useUser()

  // const { selectedContent } = location.state || {};
  const backgroundImage = location.state?.bgImage || "";

  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [damageValues] = useState([20, 65, 45]); // Array of damage values
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

  const playerProgress :PlayerProgress ={
    coins: 35000,
    questsCompleted: 2,
    monstersKilled: 500,
    gemstone: 1,
  }
  
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);
  const currentMonster = monsters[currentMonsterIndex];
  const [monsterProgress, setMonsterProgress] = useState(currentMonster.maxHp);
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (monsterProgress > 0 && characterProgress > 0) {
      // Set tapping state to true
      setIsTapping(true);
      
      // Randomly pick a damage value from the array
      const damage = damageValues[Math.floor(Math.random() * damageValues.length)];

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

      setMonsterProgress(prev => Math.max(prev - damage, 0)); // Reduce monster's progress
      setPoints(points + damage);
      setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
      setCharacterProgress(prev => Math.max(prev - 2, 0)); // Reduce character progress by 2
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

  // Track if the player is no longer tapping to stop progress decrement
  useEffect(() => {
    if (isTapping) {
      const timeout = setTimeout(() => setIsTapping(false), 500); // 500ms delay to detect stop tapping

      return () => clearTimeout(timeout);
    }
  }, [isTapping]);

  // Effect to handle monster defeat and transition to next monster
  useEffect(() => {
    if (monsterProgress === 0 && currentMonsterIndex < monsters.length - 1) {
      setShowGems(true);
      setTimeout(() => {
        setShowGems(false);
        setCurrentMonsterIndex(prev => prev + 1);
        setMonsterProgress(monsters[currentMonsterIndex + 1].maxHp);
      }, 2000);
    }
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
              {playerProgress.coins}{" "}
            </Text>
            <Image src="/gems/1.png" w={"20px"} />
          </Flex>
          <Flex
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
          <Flex
            bg={"rgba(0, 0, 0, 0.3)"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={"5px"}
            border={"3px solid black"}
          >
            <Text mx={"auto"} fontSize={"12px"} fontWeight={800} p={"5px 20px"}>
              {" "}
              {playerProgress.questsCompleted}{" "}
            </Text>
            <Image src="/gems/crown.png" w={"20px"} mt={-1} />
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
              mt={5}
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
              <Flex alignItems={"center"} gap={2} mt={{ base: 0, sm: 16 }}>
                <Image src={backgroundImage} w={"65px"} />
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
