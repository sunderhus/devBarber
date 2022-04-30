import AsyncStorage from '@react-native-community/async-storage';
import makeApiUrl from '../apiUrlFactory';

interface Barber {
  id: number;
  name: string;
  avatar: string;
  stars: number;
}

export interface LoadFavoriteBarbersResponse {
  list: Array<Barber>;
  error: string;
}

const loadFavoriteBarbers = async (): Promise<LoadFavoriteBarbersResponse> => {
  const token = await AsyncStorage.getItem('@DevBarber_token');
  const url = makeApiUrl(`user/favorites?token=${token}`);

  const response = await fetch(url);
  const parsedResponse = await response.json();

  return parsedResponse as LoadFavoriteBarbersResponse;
};

export default loadFavoriteBarbers;
