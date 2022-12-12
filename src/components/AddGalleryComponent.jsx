import React from "react";
import { setNewGallery } from "../store/gallery/slice";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

export const AddGalleryComponent = ({
  id,
  newGallery,
  newImages,
  handleOnSubmit,
  handleInputChange,
  handleRemoveClick,
  handleAddClick,
  handleCancel,
  changeOrder,
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      {id ? (
        <h2 className="fw-bold mb-3 mt-md-4 mb-2 text-center text-uppercase ">
          Edit Gallery
        </h2>
      ) : (
        <h2>Create New Gallery</h2>
      )}
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            className="mb-2"
            required
            type="text"
            placeholder="Title"
            value={newGallery.title}
            onChange={({ target }) =>
              dispatch(setNewGallery({ ...newGallery, title: target.value }))
            }
          />
        </div>
        <div>
          <textarea
            className="mb-2"
            placeholder="Description"
            value={newGallery.description}
            onChange={({ target }) =>
              dispatch(
                setNewGallery({ ...newGallery, description: target.value })
              )
            }
          />
        </div>
        {newImages &&
          newImages.map((x, i) => {
            return (
              <div key={i}>
                <input
                  className="mb-2"
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
                  <button type="button" onClick={() => changeOrder(i, "UP")}>
                    Move Up
                  </button>
                  <button type="button" onClick={() => changeOrder(i, "DOWN")}>
                    Move Down
                  </button>
                </span>
                <div className="mb-2">
                  {newImages?.length - 1 === i && (
                    <button onClick={handleAddClick}>Add more</button>
                  )}
                </div>
              </div>
            );
          })}
        <div className="mb-2">
          <button onClick={handleCancel}>Cancel</button>
        </div>

        <span className="mb-2">
          <Button type="submit">{id ? "Edit" : "Add Gallery"}</Button>
        </span>
      </form>
    </div>
  );
};
