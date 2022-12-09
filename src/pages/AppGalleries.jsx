import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken} from "../store/user/selector";
import { selectGalleries } from "../store/gallery/selector";
import { getGalleries } from "../store/gallery/slice";
import { GalleryRow } from "../components/GalleryRow";

export const AppGalleries = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectToken);
  const galleries = useSelector(selectGalleries);

  useEffect(() => {
    dispatch(getGalleries({ page: 1 }));
  }, []);

  function handlePaginate(page) {
    dispatch(getGalleries({ page: page }));
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
