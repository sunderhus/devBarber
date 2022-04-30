import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Stars from '../Stars';
import {
  Area,
  Avatar,
  BarberName,
  InfoArea,
  SeeProfileButton,
  SeeProfileButtonText
} from './styles';

export interface BarberData {
  id: number;
  name: string;
  avatar: string;
  stars: number;
}

export default function BarberCard({ data }: { data: BarberData }) {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Barber', {
      id: data.id
    });
  };

  return (
    <Area onPress={handleClick}>
      <Avatar source={{ uri: data.avatar }} />
      <InfoArea>
        <BarberName>{data.name}</BarberName>
        <Stars stars={data.stars} showNumber />
        <SeeProfileButton>
          <SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
}
