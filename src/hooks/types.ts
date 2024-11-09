// types.ts (Define your types)
export interface Character {
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

export interface User {
  id: string;
  telegramId: string;
  username?: string;
  isNewPlayer: boolean;
  energyLevel: number;
  coins: number;
  referralCount: number;
  referredBy?: string;
  userCharacters: string[]; // Store only the character IDs
}

export interface Error {
  message: string;
}
