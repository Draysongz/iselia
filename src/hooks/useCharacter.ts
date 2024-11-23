import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Character } from  './types';  // Path to your types file
import { useUser } from '../context/context';

// Define the base URL for the API

  const BaseUrl = "https://72dc-105-112-17-118.ngrok-free.app/api";

const useCharacter = (userId: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const {token, setCharacter} = useUser()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all characters from the backend
  const fetchCharacters = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<Character[]>(`${BaseUrl}/characters`,{
          headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });
      setCharacters(response.data); // Set fetched characters to state
      setError(null); // Clear previous errors
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Error fetching characters:', axiosError);
      setError('Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCharacters = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<Character[]>(`${BaseUrl}/characters/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });
      setCharacter(response.data); // Set fetched characters to state
      setError(null); // Clear previous errors
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Error fetching user characters:', axiosError);
      setError('Failed to fetch user characters');
    } finally {
      setLoading(false);
    }
  };

  // Assign a character to the user
  const assignCharacterToUser = async (characterId: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/character/assign`, {
        userId,
        characterId
      });
      console.log('Character assigned:', response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Error assigning character:', axiosError);
      setError('Failed to assign character');
    } finally {
      setLoading(false);
    }
  };

  return {
    characters,
    loading,
    error,
    fetchCharacters,
    assignCharacterToUser,
    fetchUserCharacters
  };
};

export default useCharacter;
