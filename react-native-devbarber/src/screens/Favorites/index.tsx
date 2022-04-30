import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackIcon from '../../assets/back.svg';
import BarberCard from '../../components/BarberCard';
import { GlobalState } from '../../store';
import { loadFavoriteBarbersRequest } from '../../store/modules/barber/actions';
import { Barber } from '../../store/modules/barber/types';
import {
  Container,
  FavoritesTop,
  FavoritesTopButton,
  FavoritesTopText, Scroller
} from './styles';


export default function Favorites() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoritedBarbers = useSelector<GlobalState, Barber[]>((state) => state.barbers.favorites)

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(()=>{
    dispatch(loadFavoriteBarbersRequest())
  },[])

  return (
    <Container>
      <FavoritesTop>
        <FavoritesTopButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill="#FFF" />
        </FavoritesTopButton>
        <FavoritesTopText>Favoritos</FavoritesTopText>
      </FavoritesTop>
      {!!favoritedBarbers.length && (
        <Scroller>
          <>
            {favoritedBarbers.map(barber => (
              <BarberCard key={barber.id} data={barber} />
            ))}
          </>
        </Scroller>
      )}
    </Container>
  );
}
