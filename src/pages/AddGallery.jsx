import React, { useState } from "react";
import { addGallery, setNewGallery } from "../store/gallery/slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectNewGallery } from "../store/gallery/selector";

export const AddGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const newGallery = useSelector(selectNewGallery);
  const [newImages, setNewImages] = useState([
    {
      url: "",
    },
  ]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(addGallery({ ...newGallery, images: newImages }));

    history.push("/galleries");
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

  return (
    <div>
      <h2 style={{ padding: "10px" }}>Create New Gallery</h2>
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
        <button type="submit">Add Gallery</button>
      </form>
    </div>
  );
};
