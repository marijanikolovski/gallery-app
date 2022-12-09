import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/gallery/selector";
import { getGalleries, setSearchUserId } from "../store/gallery/slice";
import { GalleryRow } from "../components/GalleryRow";

export const AppGalleries = ({ myId }) => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);

  useEffect(() => {
    if (myId) {
      dispatch(setSearchUserId(myId));
      dispatch(getGalleries({ page: 1, userId: myId }));
    }
    if (!myId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, userId: null }));
    }
  }, [myId, dispatch]);

  function handlePaginate(page) {
    if (myId) {
      dispatch(getGalleries({ page: page, userId: myId }));
    }
    if (!myId) {
      dispatch(getGalleries({ page: page, userId: null }));
    }
  }

  return (
    <div>
      {galleries.data.length ? (
        <div>
          <ul>
            {galleries.data.map((gallery) => (
              <GalleryRow
                key={gallery.id}
                gallery={gallery}
                current_page={galleries.current_page}
                last_page={galleries.last_page}
                handlePaginate={handlePaginate}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>No galleries created.</div>
      )}
    </div>
  );
};
