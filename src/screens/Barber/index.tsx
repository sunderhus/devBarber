import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import BackIcon from '../../assets/back.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import BarberModal from '../../components/BarberModal';
import Stars from '../../components/Stars';
import { GlobalState } from '../../store';
import { addFavoriteBarberRequest, loadBarberDetailsRequest } from '../../store/modules/barber/actions';
import { LoadingIcon } from '../Home/styles';
import {
  BackButton,
  BarberAvatar,
  BarberFavButton,
  BarberInfo,
  BarberInfoArea,
  BarberInfoName,
  Container,
  FakeSwiper,
  PageBody,
  Scroller,
  ServiceArea,
  ServiceButton,
  ServiceButtonText,
  ServiceInfo,
  ServiceItem,
  ServiceName,
  ServicePrice,
  ServicesTitle,
  SwiperDot,
  SwiperDotActive,
  SwiperImage,
  SwiperItem,
  TestimonialArea,
  TestimonialBody,
  TestimonialInfo,
  TestimonialItem,
  TestimonialName
} from './styles';

export type RouteParams= {
  id:number;
}
export interface BarberDetails {
  id: number;
  name: string;
  avatar: string;
  stars: number;
  available: Array<{ date: string; hours: Array<string> }>;
  favorited: boolean;
  photos: Array<{ url: string }>;
  services: Array<{ name: string; price: number }>;
  testimonials: Array<{ name: string; rate: number; body: string }>;
}


export interface ExtraBarberInfo {
  data: BarberDetails;
  error: string;
}

function Barber() {
  const route = useRoute();
  const data = route.params as RouteParams;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const barberDetails = useSelector<GlobalState, BarberDetails>((state) => state.barbers.barberDetails);
  const isFavorited = useSelector<GlobalState,boolean>((state)=>state.barbers.favorites.map(barber=>barberDetails.id).includes(data.id))

  const isLoading = useSelector<GlobalState, boolean>((state) => state.barbers.loading);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const getBarberInfo = async () => {
    dispatch(loadBarberDetailsRequest(data.id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    getBarberInfo();
    setRefreshing(false);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavoriteButton = async () => {
    const {
      id, avatar, name, stars,
    } = barberDetails;

    dispatch(addFavoriteBarberRequest({
      id,
      avatar,
      name,
      stars,
    }));
  };

  const handleServiceButton = (key: number) => {
    setSelectedService(key);
    setShowModal(true);
  };

  useEffect(() => {
    getBarberInfo();
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {barberDetails.photos.length > 0 ? (
          <Swiper
            style={{ height: 240 }}
            dot={<SwiperDot />}
            activeDot={<SwiperDotActive />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: undefined,
              left: undefined,
            }}
            loop
            autoplay
          >
            {barberDetails.photos.map((photo, key) => (
              <SwiperItem key={key}>
                <SwiperImage source={{ uri: photo.url }} />
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}

        <PageBody>
          {isLoading ? (
            <LoadingIcon size="large" color="#000" />
          ) : (
            <>
              <BarberInfoArea>
                {!!barberDetails.avatar && <BarberAvatar source={{ uri: barberDetails.avatar }} />}
                <BarberInfo>
                  <BarberInfoName>{barberDetails.name}</BarberInfoName>
                  <Stars stars={barberDetails.stars} showNumber />
                </BarberInfo>
                <BarberFavButton onPress={handleFavoriteButton} activeOpacity={0.8}>
                  {isFavorited ? (
                    <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
                  ) : (
                    <FavoriteIcon width="24" height="24" fill="#FF0000" />
                  )}
                </BarberFavButton>
              </BarberInfoArea>
              {barberDetails.services && barberDetails.services.length > 0 && (
                <ServiceArea>
                  <ServicesTitle>Lista de serviços</ServicesTitle>
                  {barberDetails.services.map((item, key) => (
                    <ServiceItem key={`${item.name}${item.price}`}>
                      <ServiceInfo>
                        <ServiceName>{item.name}</ServiceName>
                        <ServicePrice>
                          R$
                          {item.price}
                        </ServicePrice>
                      </ServiceInfo>
                      <ServiceButton onPress={() => handleServiceButton(key)}>
                        <ServiceButtonText>Agendar</ServiceButtonText>
                      </ServiceButton>
                    </ServiceItem>
                  ))}
                </ServiceArea>
              )}
              {barberDetails.testimonials
                && barberDetails.testimonials.length > 0 && (
                  <TestimonialArea>
                    <Swiper
                      style={{ height: 110, alignItems: 'center' }}
                      showsPagination={false}
                      showsButtons
                      nextButton={
                        <NavNextIcon height="35" width="35" fill="#000" />
                      }
                      prevButton={
                        <NavPrevIcon height="35" width="35" fill="#000" />
                      }
                    >
                      {barberDetails.testimonials.map((item, key) => (
                        <TestimonialItem key={key}>
                          <TestimonialInfo>
                            <TestimonialName>{item.name}</TestimonialName>
                            <Stars stars={item.rate} showNumber={false} />
                          </TestimonialInfo>
                          <TestimonialBody>{item.body}</TestimonialBody>
                        </TestimonialItem>
                      ))}
                    </Swiper>
                  </TestimonialArea>
              )}
            </>
          )}

        </PageBody>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFF" />
      </BackButton>

      {!isLoading && showModal && (
      <BarberModal
        show={showModal}
        setShow={setShowModal}
        service={selectedService}
      />
      )}
    </Container>

  );
}

export default Barber;
