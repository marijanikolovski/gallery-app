import * as usersSagas from "./user/saga";
import * as galleriesSagas from "./gallery/saga";

const sagas = {
  ...usersSagas,
  ...galleriesSagas
};

export default sagas;
