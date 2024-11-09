"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  telegramId: string;
  username?: string;
  isNewPlayer: boolean; // Indicates if player is new
  energyLevel: number; // Current energy taps
  energyLevelLimit: number; // Maximum energy taps
  coins: number;
  referralCount: number;
  referredBy?: string; // Optional referral information
  referrals: Referral[]; // List of referrals made by this user
  userCharacters: Character[]; // List of characters owned by the user
  inventory?: Inventory; // User's inventory, optional
  createdAt: Date;
  updatedAt: Date;
};

type Referral = {
  id: string;
  userId: string;
  referredId: string;
  createdAt: Date;
};

type Character = {
  id?: string;
  name: string;
  bg?: string;
  title: string;
  bgImage?: string;
  description?: string;
  isUnlocked?: boolean;
  txtImage?: string;
  unlockCondition?: string;
  baseDamage: number;
  upgradeLevel?: number;
  price?: number;
  isStarter?: boolean;
  createdAt?: Date;
};


type Inventory = {
  id: string;
  coins: number;
  chests: Chest[];
  characters: Character[];
  createdAt: Date;
};

type Chest = {
  id: string;
  rewards: Reward[];
  createdAt: Date;
};

type Reward = {
  id: string;
  type: RewardType;
  coins?: number;
  characterId?: string;
  createdAt: Date;
};

enum RewardType {
  CHARACTER = "CHARACTER",
  ITEM = "ITEM",
  COINS = "COINS",
}


type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("")

  const clearUser = () => setUser(null); // Function to clear user data

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
