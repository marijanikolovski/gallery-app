import React, { useEffect, useState } from "react";
import {
  getGallery,
  addGallery,
  editGallery,
  setNewGallery,
  setResetForm,
} from "../store/gallery/slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectGallery, selectNewGallery } from "../store/gallery/selector";
import { refreshToken } from "../store/user/slice";
import { selectToken } from "../store/user/selector";
import { galeryService } from "../service/GalleryService";

export const AddGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const history = useHistory();
  const isAuthenticated = useSelector(selectToken);
  const newGallery = useSelector(selectNewGallery);
  const [newImages, setNewImages] = useState([
    {
      url: "",
    },
  ]);

  const handleRefreshToken = async () => {
    if (isAuthenticated) {
      dispatch(refreshToken());
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(
        editGallery({
          newGallery: {
            id: id,
            title: newGallery.title,
            description: newGallery.description,
            images: newImages,
          },
        })
      );
      dispatch(setResetForm());
      history.push(`/galleries/${gallery.id}`);
    } else {
      dispatch(addGallery({ ...newGallery, images: newImages }));
      dispatch(setResetForm());
      history.push("/galleries/me");
    }
    dispatch(setResetForm());
  };

  const handleGetSingleGallery = async (id) => {
    if (id) {
      const response = await galeryService.get(id);
      dispatch(setNewGallery(response));
    }
  };

  const handleInputChange = (e, index) => {
    const list = [...newImages];
    list[index][e.target.name] = e.target.value;
    setNewImages(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...newImages];
    list.splice(index, 1);
    setNewImages(list);
  };

  const handleAddClick = () => {
    setNewImages([...newImages, { url: "" }]);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${gallery.id}`);
    } else {
      history.push("/galleries/me");
    }
  };

  useEffect(() => {
    if (id) {
      handleGetSingleGallery(id);
    }
  }, [id]);

  return (
    <div>
      {id ? (
        <h2 style={{ padding: "10px" }}>Create New Gallery</h2>
      ) : (
        <h2>Create New Gallery</h2>
      )}
      <form onSubmit={handleOnSubmit}>
        <input
          required
          type="text"
          placeholder="Title"
          value={newGallery.title}
          onChange={({ target }) =>
            dispatch(setNewGallery({ ...newGallery, title: target.value }))
          }
        />
        <textarea
          placeholder="Description"
          value={newGallery.description}
          onChange={({ target }) =>
            dispatch(
              setNewGallery({ ...newGallery, description: target.value })
            )
          }
        />
        {newImages &&
          newImages.map((x, i) => {
            return (
              <div key={i}>
                <input
                  required
                  name="url"
                  value={x.url}
                  placeholder="Image url goes here"
                  onChange={(e) => handleInputChange(e, i)}
                  key={i}
                />
                <span>
                  {newImages?.length !== 1 && (
                    <button onClick={() => handleRemoveClick(i)}>Remove</button>
                  )}
                </span>
                <div>
                  {newImages?.length - 1 === i && (
                    <button onClick={handleAddClick}>Add more</button>
                  )}
                </div>
              </div>
            );
          })}
        <span>
          <button type="submit">{id ? "Edit" : "Add Gallery"}</button>
          <button onClick={handleCancel}>Cancel</button>
        </span>
      </form>
    </div>
  );
};
