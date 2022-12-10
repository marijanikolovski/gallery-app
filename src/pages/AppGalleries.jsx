import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries, selectSearchTerm, selectSearcUserId } from "../store/gallery/selector";
import { getGalleries, setSearchUserId } from "../store/gallery/slice";
import { GalleryRow } from "../components/GalleryRow";
import { useParams } from "react-router-dom";
import { GallerySerchComponent } from "../components/GallerySerchComponent";
import { setSearchTerm } from "../store/gallery/slice";
import { selectToken } from "../store/user/selector";

export const AppGalleries = ({ myId }) => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);
  const isAuthenticated = useSelector(selectToken);
  const { id } = useParams()
  const term = useSelector(selectSearchTerm);
  const userId = useSelector(selectSearcUserId);

  useEffect(() => {
    if (myId) {
      dispatch(setSearchUserId(myId));
      dispatch(getGalleries({ page: 1, term: null, userId: myId }));
    }
    if(id){
      dispatch(setSearchUserId(id));
      dispatch(getGalleries({page: 1, term: null, userId: id}));
  }
    if (!id && !myId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, term: null, userId: null }));
    }
  }, [myId, id, dispatch]);

  function handlePaginate(page) {
    if (myId) {
      dispatch(getGalleries({ page: page, term: term, userId: myId }));
    }
    if(id){
      dispatch(getGalleries({page: page, term: term, userId: id}));
  }
    if (!id && !myId) {
      dispatch(getGalleries({ page: page, term: term, userId: null }));
    }
  }

  function handleSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <div>
      {galleries.data.length ? (
        <div>
          <GallerySerchComponent 
            handleSearchTerm={handleSearchTerm}
            handleSearch={handleSearch}
          />
          <ul>
            {galleries.data.map((gallery) => (
              <GalleryRow
                key={gallery.id}
                gallery={gallery}
                handlePaginate={handlePaginate}
              />
            ))}
          </ul>
          {galleries.current_page !== galleries.last_page && (
            <button onClick={() => handlePaginate(galleries.current_page + 1)}>
              Load More
            </button>
            )}
        </div>
      ) : (
        <div>No galleries created.</div>
      )}
    </div>
  );
};
