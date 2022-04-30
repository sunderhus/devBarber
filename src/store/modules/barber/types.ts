export enum ActionTypes {
  loadStart ='LOAD_START',
  loadEnd ='LOAD_END',
  loadBarberDetails = 'LOAD_BARBER_DETAILS_REQUEST',
  loadBarberDetailsSuccess = 'LOAD_BARBER_DETAILS_SUCCESS',
  addFavoriteBarber = 'ADD_FAVORITE_BARBER_REQUEST',
  addFavoriteBarberSuccess = 'ADD_FAVORITE_BARBER_SUCCESS',
  loadFavoriteBarbers = 'LOAD_FAVORITE_BARBERS_REQUEST',
  loadFavoriteBarbersSuccess = 'LOAD_FAVORITE_BARBERS_REQUEST_SUCCESS',
  loadBarbers = 'LOAD_BARBERS_REQUEST',
  loadBarbersSuccess = 'LOAD_BARBERS_REQUEST_SUCCESS',
  loadNearBarbers = 'LOAD_NEAR_BARBERS_REQUEST',
  loadNearBarbersSuccess = 'LOAD_NEAR_BARBERS_REQUEST_SUCCESS',
  clearBarberModule ='CLEAR_BARBER_MODULE'
}

export interface BarberState {
  barbers: Barber[];
  nearBarbers: Barber[];
  favorites: Barber[];
  barberDetails:BarberDetails;
  loading:boolean;
  location:string,
}

export interface Barber {
  id: number;
  name: string;
  avatar: string;
  stars: number;
}

export interface BarberCoordinates {
  latitude?: string;
  longitude?: string;
  address?: string;
}


export interface BarberDetails{
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
