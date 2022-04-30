import AsyncStorage from '@react-native-community/async-storage';
import makeApiUrl from '../apiUrlFactory';

const logout = async (): Promise<void> => {
  const token = await AsyncStorage.getItem('@DevBarber_token');
  const url = makeApiUrl('auth/logout');

  await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(token)
  });
};

export default logout;
