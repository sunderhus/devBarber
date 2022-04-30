import AsyncStorage from '@react-native-community/async-storage';
import makeApiUrl from '../apiUrlFactory';

interface SearchBarberDetailsParams {
  id: number;
}

interface BarberDetails {
  id: number;
  name: string;
  avatar: string;
  stars: number;
  available: Array<{ date: string; hours: Array<string> }>;
  favorited: boolean;
  photos: Array<{ url: string }>;
  services: Array<{ name: string; price: number }>;
  testimonials: Array<{ name: string; rate: number; body: string }>;
}

export interface SearchBarberDetailsResponse {
  data: BarberDetails;
  error: string;
}

const searchBarberDetails = async (
  params: SearchBarberDetailsParams
): Promise<SearchBarberDetailsResponse> => {
  const token = await AsyncStorage.getItem('@DevBarber_token');

  const url = makeApiUrl(`barber/${params.id}?token=${token}`);

  const response = await fetch(url);
  const parsedResponse = await response.json();

  return parsedResponse as SearchBarberDetailsResponse;
};

export default searchBarberDetails;
