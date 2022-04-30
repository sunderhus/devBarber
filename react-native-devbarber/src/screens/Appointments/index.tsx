import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import BackIcon from '../../assets/back.svg';
import {
  AppointmentsTop,
  AppointmentsTopButton,
  AppointmentsTopText,
  Container
} from './styles';



const Appointments = () => {
  const navigation = useNavigation();
  const handleBackButton = useCallback(() => {
    navigation.goBack();
  },[navigation]);

  return (
    <Container>
      <AppointmentsTop>
        <AppointmentsTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </AppointmentsTopButton>
        <AppointmentsTopText>Agendamentos</AppointmentsTopText>
      </AppointmentsTop>
    </Container>
  );
};
export default Appointments;
