import AsyncStorage from '@react-native-community/async-storage';
import makeApiUrl from '../apiUrlFactory';

interface SaveFavoriteBarber {
  id: number;
}

interface SaveFavoriteBarberResult{
  error:string;
  have:boolean;
}

const saveFavoriteBarber = async (params: SaveFavoriteBarber):Promise<SaveFavoriteBarberResult> => {
  const token = await AsyncStorage.getItem('@DevBarber_token');
  const url = makeApiUrl(`user/favorite?token=${token}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ barber: params.id })
  });
  const parsedResponse = await response.json();

  return parsedResponse as SaveFavoriteBarberResult;
};

export default saveFavoriteBarber;
