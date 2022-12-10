import React from 'react'
import { setNewGallery } from '../store/gallery/slice';
import { useDispatch } from 'react-redux';

export const AddGalleryComponent = ({
    id,
    newGallery,
    newImages,
    handleOnSubmit,
    handleInputChange,
    handleRemoveClick,
    handleAddClick,
    handleCancel
}) => {
    const dispatch = useDispatch()
    
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
  )
}
