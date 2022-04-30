import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackIcon from '../../assets/back.svg';
import BarberCard, { BarberData } from '../../components/BarberCard';
import { GlobalState } from '../../store';
import { loadBarbersRequest } from '../../store/modules/barber/actions';
import { Barber } from '../../store/modules/barber/types';
import {
  Container,
  LoadingIcon,
  Scroller,
  SearchInput,
  SearchTop,
  SearchTopButton
} from './styles';

export default function Search() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const barberStateList = useSelector<GlobalState, Barber[]>(
    state => state.barbers.barbers
  );
  const isLoading = useSelector<GlobalState, boolean>(
    state => state.barbers.loading
  );

  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filteredList, setFilteredList] =
    useState<Array<BarberData>>(barberStateList);


  const handleBackButton = () => {
    navigation.goBack();
  };


  const handleBarberSearch = (barberName: string) => {
    if (!barberName) {
      setFilteredList(barberStateList)
      return;
    }

    const matchCases = barberStateList.filter(barber =>
      barber.name.toLowerCase().includes(barberName.toLowerCase())
    );
    setFilteredList(matchCases);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(loadBarbersRequest());
    setRefreshing(false);
  };


  useEffect(()=>{
    dispatch(loadBarbersRequest());
  },[])


  return (
    <Container>
      <SearchTop>
        <SearchTopButton onPress={handleBackButton}>
          <BackIcon fill="#FFF" height="44" width="44" />
        </SearchTopButton>
        <SearchInput
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor="#FFF"
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          onSubmitEditing={(event)=>handleBarberSearch(event.nativeEvent.text)}
        />
      </SearchTop>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {isLoading && <LoadingIcon size="large" color="#fff" />}

        {!isLoading && (
          <>
            {filteredList.map(item => (
              <BarberCard key={item.id} data={item} />
            ))}
          </>
        )}
      </Scroller>
    </Container>
  );
}
