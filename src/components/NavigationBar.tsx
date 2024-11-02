import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

interface NavItemProps {
//   icon: React.ReactNode;
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
        p={'10px'}
        // border={"2px solid"}
        boxShadow={"0px 0px 8px 8px black"}
        zIndex={80}
      >
        <NavItem
          iconSrc="./NavIcons/Home.png"
          label="Home"
          isActive={location.pathname === "/"}
          to="/"
        />
        <NavItem
          iconSrc="./NavIcons/Quests.png"
          label="Quest"
          to="/quests"
          isActive={location.pathname === "/quests"}
          
        />
        <NavItem
          iconSrc="./NavIcons/Characters.png"
          label="Characters"
          to="/characters"
          isActive={location.pathname === "/characters"}
        />
        <NavItem
          iconSrc="./NavIcons/Community.png"
          label="Community"
          to="/community"
          isActive={location.pathname === "/community"}
        />
        <NavItem
          iconSrc="./NavIcons/Settings.png"
          label="Settings"
          to="/settings"
          isActive={location.pathname === "/settings"}
        />
      </Box>
    </nav>
  );
};

export default NavigationBar;
