import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/gallery/selector";
import { getGalleries, setSearchUserId } from "../store/gallery/slice";
import { GalleryRow } from "../components/GalleryRow";
import { useParams } from "react-router-dom";

export const AppGalleries = ({ myId }) => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);
  const { id } = useParams()

  useEffect(() => {
    if (myId) {
      dispatch(setSearchUserId(myId));
      dispatch(getGalleries({ page: 1, userId: myId }));
    }
    if(id){
      dispatch(setSearchUserId(id));
      dispatch(getGalleries({page: 1, userId: id}));
  }
    if (!id && !myId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, userId: null }));
    }
  }, [myId, id, dispatch]);

  function handlePaginate(page) {
    if (myId) {
      dispatch(getGalleries({ page: page, userId: myId }));
    }
    if(id){
      dispatch(getGalleries({page: page, userId: id}));
  }
    if (!id && !myId) {
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
