import AsyncStorage from '@react-native-community/async-storage';
import makeApiUrl from '../apiUrlFactory';

interface SearchNearBarbersParams {
  latitude?: string;
  longitude?: string;
  address?: string;
}
interface Barber {
  avatar: string;
  distance: number;
  id: number;
  name: string;
  stars: number;
  latitude: string;
  longitude: string;
}

export interface SearchNearBarbersResponse {
  data: Barber[];
  error: string;
  loc: string;
}

const searchNearBarbers = async (
  params: SearchNearBarbersParams
): Promise<SearchNearBarbersResponse> => {
  const token = await AsyncStorage.getItem('@DevBarber_token');
  const latitude = params.latitude || null;
  const longitude = params.longitude || null;

  const url = makeApiUrl(
    `barbers?token=${token}&lat=${latitude}&lng=${longitude}&address=${params.address}`
  );
  const response = await fetch(url);
  const parsedResponse = await response.json();

  return parsedResponse as SearchNearBarbersResponse;
};

export default searchNearBarbers;
