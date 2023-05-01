import { toast } from "react-toastify";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let isAlreadyFav = state.favs.every((fav) => fav.id !== action.payload.id);
      writeFavsToLocalStorage(newFavList);
      
      const newFavList = isAlreadyFav ? [...state.favs, action.payload] : state.favs;
      toast.success("Favorilere eklendi");
      
      return {
        ...state,
        favs: newFavList
      };

    case FAV_REMOVE:
      const newRemoveFavList = state.favs.filter((fav) => fav.id !== action.payload);
      writeFavsToLocalStorage(newRemoveFavList);
      toast.warning("Favorilerden çıkarıldı");
      return {
        ...state,
        favs: newRemoveFavList
      };

    case FETCH_SUCCESS:
      toast.success("Yeni bir şaka geldi");
      return {
        ...state,
        current: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: null,
      };

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        current : null,
        error: action.payload
      };


    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage() || []
      };

    default:
      return state;
  }
}
