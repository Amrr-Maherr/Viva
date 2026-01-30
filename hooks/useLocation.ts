import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationData {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  isLoading: boolean;
  getCurrentLocation: () => Promise<void>;
}

export const useLocation = (): LocationData => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(`Error getting location: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    errorMsg,
    isLoading,
    getCurrentLocation,
  };
};