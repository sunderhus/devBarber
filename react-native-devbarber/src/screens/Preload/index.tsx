import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import BarberLogo from '../../assets/barber.svg';
import refreshAuthentication from '../../services/refreshAuthentication';
import { Container, LoadingIcon } from './styles';

const Preload = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleAuthenticationRenew = async () => {
      const token = await AsyncStorage.getItem('@DevBarber_token');

      if (!token) {
        navigation.navigate('SignIn');
        return;
      }

      const response = await refreshAuthentication(token);

      if (!response.token) {
        navigation.navigate('SignIn');
        return;
      }

      await AsyncStorage.setItem('@DevBarber_token', response.token);

      navigation.reset({
        routes: [{ name: 'MainTab' }]
      });
    };

    handleAuthenticationRenew();
  }, [navigation]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFF" />
    </Container>
  );
};

export default Preload;
