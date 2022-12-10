import React, { useEffect, useState } from "react";
import {
  addGallery,
  editGallery,
  setNewGallery,
  setResetForm,
} from "../store/gallery/slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectGallery, selectNewGallery } from "../store/gallery/selector";
import { AddGalleryComponent } from "../components/AddGalleryComponent";

export const AddGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const history = useHistory();
  const newGallery = useSelector(selectNewGallery);
  const [newImages, setNewImages] = useState([
    {
      url: "",
    },
  ]);

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
      history.push("/my-galleries");
    }
    dispatch(setResetForm());
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
      history.push("/my-galleries");
    }
  };

  const reorderUrlList = (event, urlList) => {
		const movedUrl = urlList.find(
			(item, index) => index === event.oldIndex
		);
		const remainingUrls = urlList.filter(
			(item, index) => index !== event.oldIndex
		);

		const reorderedItems = [
			...remainingUrls.slice(0, event.newIndex),
			movedUrl,
			...remainingUrls.slice(event.newIndex),
		];

		return reorderedItems;
	};

  function changeOrder(index, position) {
		setNewImages(
			reorderUrlList(
				{ oldIndex: index, newIndex: index + (position === "UP" ? -1 : 1) },
				newImages
			)
		);
	}

  useEffect(() => {
    if(id){
        dispatch(setNewGallery(gallery));
        setNewImages(gallery?.images);
    }
}, [id])

  return (
    <div>
      <AddGalleryComponent 
        key={gallery.id}
        id={id}
        newGallery={newGallery}
        newImages={newImages}
        handleOnSubmit={handleOnSubmit}
        handleInputChange={handleInputChange}
        handleRemoveClick={handleRemoveClick}
        handleAddClick={handleAddClick}
        handleCancel={handleCancel}
        changeOrder={changeOrder}
      />
    </div>
  );
};
