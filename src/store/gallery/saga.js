import { put, call, takeLatest, take } from "redux-saga/effects";
import { galeryService } from "../../service/GalleryService";
import {
  setGalleries,
  setGallery,
  setPaginated,
  getGalleries,
  getGallery,
} from "./slice";

function* getGalleriesHandler(action) {
  try {
    const galleries = yield call(galeryService.getAll, action.payload.page);
    if (action.payload?.page > 1) {
      yield put(setPaginated(galleries));
    } else {
      yield put(setGalleries(galleries));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getGalleryHandler(action) {
  try {
    const gallery = yield call(galeryService.get, action.payload);
    yield put(setGallery(gallery));
  } catch (e) {
    console.log(e);
  }
}

export function* watchForGalleriesSagas() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
}
