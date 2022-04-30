import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, BarberDetails, BarberState } from './types';

const INITIAL_STATE: BarberState = {
  loading:false,
  barbers: [],
  nearBarbers: [],
  location:'',
  favorites: [],
  barberDetails: {
    id: 0,
    favorited: false,
    avatar: '',
    name: '',
    stars: 0,
    photos: [],
    services: [],
    available: [],
    testimonials: []
  } as BarberDetails,
};

const barberReducer: Reducer<BarberState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {

      case ActionTypes.loadStart:
        draft.loading = true;
        return draft;

      case ActionTypes.loadEnd:
        draft.loading = false;
        return draft;

      case ActionTypes.loadBarbersSuccess:
        draft.barbers = [...action.payload.barbers];
        return draft;

      case ActionTypes.loadNearBarbersSuccess:
        draft.nearBarbers = action.payload.barbers;
        draft.location = action.payload.location;
        return draft;

      case ActionTypes.loadFavoriteBarbersSuccess:
        draft.favorites = action.payload.barbers;
        return draft;

      case ActionTypes.addFavoriteBarberSuccess:
        const indexToRemove = state.favorites.findIndex(favoriteBarber => {
          return favoriteBarber.id === action.payload.barber.id;
        });
        if (indexToRemove > -1) {
          draft.favorites.splice(indexToRemove, 1);
          break;
        }
        draft.favorites.push(action.payload.barber);
        return draft;

      case ActionTypes.loadBarberDetailsSuccess:
        if (state.barberDetails.id !== action.payload.barber.id) {
          draft.barberDetails = action.payload.barber;
          break;
        }
        return draft;

      case ActionTypes.clearBarberModule:
        draft = INITIAL_STATE;
        return draft;

      default:
        return draft;
    }
  });
};

export default barberReducer;
