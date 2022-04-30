import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import BackIcon from '../../assets/back.svg';
import logout from '../../services/logout';
import { clearBarberModule } from '../../store/modules/barber/actions';
import {
  Container,
  LogoutButton,
  LogoutButtonText,
  ProfileTop,
  ProfileTopButton,
  ProfileTopText
} from './styles';

interface UserData {
  name: string;
  avatar: string;
  email: string;
}

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearBarberModule())
    await logout();
    await AsyncStorage.removeItem('@DevBarber_token');

    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ProfileTop>
        <ProfileTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </ProfileTopButton>
        <ProfileTopText>Perfil do usuário</ProfileTopText>
      </ProfileTop>

      <LogoutButton onPress={handleLogout}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}
