import { put, call, takeLatest, take } from "redux-saga/effects";
import { galeryService } from "../../service/GalleryService";
import {
  setGalleries,
  setGallery,
  setPaginated,
  getGalleries,
  getGallery,
  setGalleriesWithNewGallery,
  addGallery,
  editGallery,
  deleteGallery,
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

function* addGalleryHandler(action) {
  try {
    const newGallery = yield call(galeryService.add, action.payload);
    yield put(setGalleriesWithNewGallery(newGallery));
  } catch (e) {
    console.log(e);
  }
}

function* editGalleryHandler(action) {
  try {
    const gallery = yield call(
      galeryService.edit,
      action.payload.newGallery.id,
      action.payload.newGallery
    );
    yield put(setGalleriesWithNewGallery(gallery));
  } catch (e) {
    console.error(e);
  }
}

function* deleteGalleryHandler(action) {
  try {
    yield call(galeryService.delete, action.payload);
    const gallery = yield call(galeryService.getAll);
    yield put(setGalleries(gallery));
  } catch (e) {
    console.error(e);
  }
}

export function* watchForGalleriesSagas() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
  yield takeLatest(addGallery.type, addGalleryHandler);
  yield takeLatest(editGallery.type, editGalleryHandler);
  yield takeLatest(deleteGallery.type, deleteGalleryHandler);
}
