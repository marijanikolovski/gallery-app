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
  setGalleryWithNewComment,
  setGalleryWithoutComment,
  addComment,
  deleteComment,
} from "./slice";

function* getGalleriesHandler(action) {
  try {
    const galleries = yield call(galeryService.getAll, action.payload.page, action.payload?.term, action.payload?.userId);
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
    const gallery = yield call(galeryService.getAll, 1, null, null);
    yield put(setGalleries(gallery));
  } catch (e) {
    console.error(e);
  }
}

function* addCommentHendle(action) {
  try {
    const newComment = yield call(galeryService.addComment, action.payload);
    yield put(setGalleryWithNewComment(newComment));
  } catch (e) {
    console.error(e);
  }
}

function* deleteCommentHandle(action) {
  try {
    const comment = yield call(galeryService.deleteComment, action.payload);
    yield put(setGalleryWithoutComment(comment));
  } catch (error) {
    alert(error.message);
  }
}

export function* watchForGalleriesSagas() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
  yield takeLatest(addGallery.type, addGalleryHandler);
  yield takeLatest(editGallery.type, editGalleryHandler);
  yield takeLatest(deleteGallery.type, deleteGalleryHandler);
  yield takeLatest(addComment.type, addCommentHendle);
  yield takeLatest(deleteComment.type, deleteCommentHandle);
}
