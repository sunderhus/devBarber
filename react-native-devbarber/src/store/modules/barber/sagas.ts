import { all, call, put, takeLatest } from 'redux-saga/effects';
import loadFavoriteBarbers, { LoadFavoriteBarbersResponse } from '../../../services/loadFavoriteBarbers';
import saveFavoriteBarber from '../../../services/saveFavoriteBarber';
import searchBarberDetails, { SearchBarberDetailsResponse } from '../../../services/searchBarberDetails';
import searchNearBarbersService, {
  SearchNearBarbersResponse
} from '../../../services/searchNearBarbers';
import {
  addFavoriteBarberRequest,
  addFavoriteBarberSuccess,
  loadBarberDetailsRequest,
  loadBarberDetailsSuccess,
  loadBarbersNearRequest,
  loadBarbersNearSuccess,
  loadBarbersSuccess, loadFavoriteBarbersSuccess, loadingEnd, loadingStart
} from './actions';
import { ActionTypes } from './types';

function* searchBarber({
  payload: { id }
}: ReturnType<typeof loadBarberDetailsRequest>) {
  yield put(loadingStart());
  const result: SearchBarberDetailsResponse = yield call(() =>
    searchBarberDetails({
      id
    })
  );
  yield put(loadBarberDetailsSuccess(result.data));
  yield put(loadingEnd());
}

function* searchBarbers() {
  yield put(loadingStart());
  const result: SearchNearBarbersResponse = yield call(() =>
    searchNearBarbersService({
      address:'',
      latitude:'',
      longitude:''
    })
  );
  console.log(result.data);
  yield put(loadBarbersSuccess(result.data));
  yield put(loadingEnd());
}

function* searchNearBarbers({
  payload: { coordinates }
}: ReturnType<typeof loadBarbersNearRequest>) {
  yield put(loadingStart());

  const result: SearchNearBarbersResponse = yield call(() =>
    searchNearBarbersService({
      address: coordinates?.address,
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude
    })
  );
  const location = result.loc ?? '';

  yield put(loadBarbersNearSuccess(result.data, location));
  yield put(loadingEnd());
}

function* searchFavoriteBarbers() {
  const result:LoadFavoriteBarbersResponse = yield call(() =>loadFavoriteBarbers());

  yield put(loadFavoriteBarbersSuccess(result.list));
}

function* addFavoriteBarber({
  payload: { barber }
}: ReturnType<typeof addFavoriteBarberRequest>) {
  yield call(() => saveFavoriteBarber({ id: barber.id }));

  yield put(addFavoriteBarberSuccess(barber));
}



export default all([
  takeLatest(ActionTypes.loadBarberDetails, searchBarber),
  takeLatest(ActionTypes.loadFavoriteBarbers, searchFavoriteBarbers),
  takeLatest(ActionTypes.loadBarbers, searchBarbers),
  takeLatest(ActionTypes.loadNearBarbers, searchNearBarbers),
  takeLatest(ActionTypes.addFavoriteBarber, addFavoriteBarber)
]);
