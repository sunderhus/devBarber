import { ActionTypes, Barber, BarberCoordinates, BarberDetails } from './types';

export function loadBarberDetailsRequest(id: number) {
  return {
    type: ActionTypes.loadBarberDetails,
    payload: {
      id
    }
  };
}

export function loadBarberDetailsSuccess(barber: BarberDetails) {
  return {
    type: ActionTypes.loadBarberDetailsSuccess,
    payload: {
      barber
    }
  };
}

export function addFavoriteBarberRequest(barber: Barber) {
  return {
    type: ActionTypes.addFavoriteBarber,
    payload: {
      barber
    }
  };
}

export function addFavoriteBarberSuccess(barber: Barber) {
  return {
    type: ActionTypes.addFavoriteBarberSuccess,
    payload: {
      barber
    }
  };
}

export function loadBarbersNearRequest(coordinates: BarberCoordinates) {
  return {
    type: ActionTypes.loadNearBarbers,
    payload: {
      coordinates
    }
  };
}

export function loadBarbersNearSuccess(barbers: Barber[], location?:string) {
  return {
    type: ActionTypes.loadNearBarbersSuccess,
    payload: {
      barbers,
      location
    }
  };
}

export function loadBarbersRequest() {
  return {
    type: ActionTypes.loadBarbers
  };
}

export function loadBarbersSuccess(barbers: Barber[]) {
  return {
    type: ActionTypes.loadBarbersSuccess,
    payload: {
      barbers
    }
  };
}

export function loadFavoriteBarbersRequest() {
  return {
    type: ActionTypes.loadFavoriteBarbers
  };
}


export function loadFavoriteBarbersSuccess(barbers: Barber[]) {
  return {
    type: ActionTypes.loadFavoriteBarbersSuccess,
    payload: {
      barbers
    }
  };
}


export function loadingStart() {
  return {
    type: ActionTypes.loadStart
  };
}

export function loadingEnd() {
  return {
    type: ActionTypes.loadEnd
  };
}




export function clearBarberModule() {
  return {
    type: ActionTypes.clearBarberModule
  };
}

