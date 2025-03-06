import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/context";
import { Character } from "./types";


// Define the shape of the user object (you can extend this as needed)
type User = {
  id: string ;
  telegramId: string ;
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

interface UpdateUserProfileData {
  isNewPlayer?: boolean; // Indicates if player is new
  energyLevel?: number; // Current energy taps
  energyLevelLimit?: number; // Maximum energy taps
  coins?: number;
  referralCount?: number;
  referredBy?: string; // Optional referral information
  referrals?: Referral[]; // List of referrals made by this user
  userCharacters?: Character[]; // List of characters owned by the user
  inventory?: Inventory;

  // Add other fields as needed
}

export const useUserAPI = (userId: string | null) => {
    const {setUser, token} = useUser()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     userEventEmitter.emit("userUpdated", user);
//   }, [user]);

  const BaseUrl = "  https://6b7f-105-113-110-29.ngrok-free.app/api";

  // Get user profile
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User>(`${BaseUrl}/profile/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      });
      setUser(response.data);
      setError(null);
      
    } catch (err) {
      setError("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: UpdateUserProfileData) => {
    setLoading(true);
    try {
      const response = await axios.put<User>(
        `${BaseUrl}/profile/${userId}`,
        data
      );
      console.log("user gotten from userapi after updating", response.data);
      setUser(response.data);

      setError(null);
    } catch (err) {
      setError("Failed to update user profile");
    } finally {
      setLoading(false);
    }
  };

  // Update user balance (add or subtract)
  const updateUserBalance = async (amount: Number) => {
    setLoading(true);
    try {
      const response = await axios.put<User>(`${BaseUrl}/balance/${userId}`, {
        amount,
      });
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to update user balance");
    } finally {
      setLoading(false);
    }
  };

  // Get all users (for admin)
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(`${BaseUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      return response.data; // Return the list of users for further use
    } catch (err) {
      setError("Failed to fetch users");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRefferals = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(
        `${BaseUrl}/users/${userId}`, // API URL with userId for fetching referrals
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`, // Use token for authorization if required
          },
        }
      );

      setError(null);
      console.log(response.data);
      return response.data; // Return the list of referred users
    } catch (err) {
      setError("Failed to fetch referrals");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const refillTaps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BaseUrl}/user/refill`, { userId: userId });

      const updatedUser = response.data.user;

      // Update the user state with the new data
      setUser(updatedUser);

      // Emit the updated user data to propagate changes
   

      return updatedUser;
    } catch (err) {
      setError("Error refilling taps");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const dailyCheckIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BaseUrl}/user/checkin`, { userId });
      const updatedUser = response.data.updatedUser;

      // Emit the user updated event
      setUser(updatedUser);
   

      return updatedUser;
    } catch (err) {
      setError("Error during daily check-in");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchUserProfile,
    updateUserProfile,
    updateUserBalance,
    fetchAllUsers,
    refillTaps,
    fetchRefferals,
    dailyCheckIn,
  };
};
