import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, RefreshControl } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import MyLocationIcon from '../../assets/my_location.svg';
import SearchIcon from '../../assets/search.svg';
import BarberCard from '../../components/BarberCard';
import { GlobalState } from '../../store';
import { loadBarbersNearRequest } from '../../store/modules/barber/actions';
import { Barber } from '../../store/modules/barber/types';
import {
  Container,
  HeaderArea,
  HeaderTitle,
  ListArea,
  LoadingIcon,
  LocationArea,
  LocationFinder,
  LocationInput,
  Scroller,
  SearchButton
} from './styles';

interface Coords {
  latitude: string;
  longitude: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector<GlobalState, boolean>((state) => state.barbers.loading);
  const location = useSelector<GlobalState, string>((state) => state.barbers.location);
  const nearBarbers = useSelector<GlobalState, Barber[]>(
    state => state.barbers.nearBarbers
  );
  const [searchText, setSearchText] = useState('');
  const [coords, setCoords] = useState<Coords>({} as Coords);

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const handleResetCords = () => {
    setCoords({
      latitude: '',
      longitude: ''
    });
  };

  const handleSearchByLocation = async () => {
    const permission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (permission !== 'granted') {
      Alert.alert('Primeiro libere a permissão e tente novamente.')
      return;
    }


    Geolocation.getCurrentPosition(
      async position => {
        setCoords({
          latitude: `${position.coords.latitude}`,
          longitude: `${position.coords.longitude}`
        });

        dispatch(
          loadBarbersNearRequest({
            address: '',
            latitude: `${position.coords.latitude}`,
            longitude: `${position.coords.latitude}`
          })
        );
        setSearchText(location)
      },
      error => {
        Alert.alert(`Problemas encontrados: ${error.code} ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );

  };

  const handleSearchByText = useCallback(async () => {
    handleResetCords();
    const { latitude, longitude } = coords;
    dispatch(loadBarbersNearRequest({ address: searchText, latitude, longitude }));
  }, [coords]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleSearchByText();
    setRefreshing(false);
  };

  useEffect(() => {
    async function fetchNearBarbers() {
      await handleSearchByText();
    }
    fetchNearBarbers();
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#FFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFF"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            onEndEditing={handleSearchByText}
          />
          <LocationFinder onPress={handleSearchByLocation}>
            <MyLocationIcon width="24" height="24" fill="#FFF" />
          </LocationFinder>
        </LocationArea>

        {isLoading && <LoadingIcon size="large" color="#FFf" />}
        <ListArea>
          {nearBarbers.map(barber => (
            <BarberCard key={barber.id} data={barber} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
}
