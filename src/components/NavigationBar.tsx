import { Box, Text, Image} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

interface NavItemProps {
  // icon: React.ReactNode;
  iconSrc: string; 
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ iconSrc, label, to, isActive = false, }) => (
  <Link to={to}>
  <Box
    className={`flex flex-col items-center w-[66px] h-[61px] p-2 justify-center ${
      isActive ? "text-[#f7f7f7] border-b-2 border-b-[#800080] bg-[#8000800D]" : "text-[#f7f7f7]"
    }`}
  >
    <Image
    src={iconSrc}
    alt={label}
    w={'30px'}
    h={'30px'}/>
    <Text className="mt-1 text-xs">{label}</Text>
  </Box>
  </Link>
);

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const isCharacterActive = location.pathname.startsWith("/characters");
  const isSettingsActive = location.pathname.startsWith("/settings");
  return (
    <nav>
      <Box
        bgColor={"#050517"}
        width={"100%"}
        display={"flex"}
        height={"80px"}
        alignItems={"center"}
        justifyContent={"space-around"}
        position={"fixed"}
        bottom={0}
        right={0}
        p={"10px"}
        // border={"2px solid"}
        boxShadow={"0px 0px 8px 8px black"}
        zIndex={80}
      >
        {/* <NavItem
          // iconSrc="./NavIcons/Characters.png"
          label="Characters"
          to="/characters"
          isActive={location.pathname === "/characters"}
          /> */}
        <NavItem
          iconSrc="./NavIcons/payment.png"
          label="EARN"
          to="/earn"
          isActive={location.pathname === "/earn"}
        />
        <NavItem
          iconSrc="./NavIcons/group.png"
          label="TEAM"
          to="/team"
          isActive={location.pathname === "/team"}
        />
        <NavItem
          iconSrc="./NavIcons/swords.png"
          label="FIGHT"
          isActive={ isSettingsActive || isCharacterActive || location.pathname === "/"}
          to="/"
        />
        <NavItem
          iconSrc="./NavIcons/cart.png"
          label="SHOP"
          to="/shop"
          isActive={location.pathname === "/shop"}
        />
        <NavItem
          iconSrc="./NavIcons/task.png"
          label="TASK"
          to="/tasks"
          isActive={location.pathname === "/tasks"}
        />
      </Box>
    </nav>
  );
};

export default NavigationBar;
