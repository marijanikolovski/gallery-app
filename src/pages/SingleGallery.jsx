import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery } from "../store/gallery/selector";
import useFormattedDate from "../hooks/useFormattedDate";
import { ImageComponent } from "../components/ImageComponent";
import {
  deleteGallery,
  getGallery,
  addComment,
  deleteComment,
} from "../store/gallery/slice";
import { selectToken, selectActiveUser } from "../store/user/selector";
import { CommentComponent } from "../components/CommentComponent";

export const SingleGallery = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const { id } = useParams();
  const isAuthenticated = useSelector(selectToken);
  const activeUser = useSelector(selectActiveUser);
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );
  const [newComment, setNewComment] = useState({
    content: "",
  });

  const handleEditGallery = (id) => {
    history.push(`/edit-gallery/${id}`);
  };

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleDeleteGallery = async (id) => {
    const response = prompt("Enter 'ok' if you want to delete this gallery. ");

    if (response !== "ok") {
      return;
    }
    dispatch(deleteGallery(id));
    history.push("/my-galleries");
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment: newComment, galleryId: id }));
    setNewComment({ content: "" });
  };

  const handleDeleteComment = async (id) => {
    const response = prompt("Enter 'ok' if you want to delete this comment. ");

    if (response !== "ok") {
      return;
    }
    dispatch(deleteComment(id));
    history.go(0);
  };

  return (
    <div>
      {activeUser && activeUser.id === gallery.user_id && (
        <>
          <Button
            style={{ margin: "5px" }}
            onClick={() => handleEditGallery(id)}
          >
            Edit
          </Button>
          <Button
            style={{ margin: "px" }}
            onClick={() => handleDeleteGallery(id)}
          >
            Delete
          </Button>
        </>
      )}
      <h1 className="fw-bold mb-3 mt-md-4 mb-2 text-center">{gallery.title}</h1>
      <h5>
        By:{" "}
        <Link
          style={{ textDecoration: "none" }}
          to={`/authors/${gallery?.user?.id}`}
        >
          {gallery?.user?.first_name} {gallery?.user?.last_name}
        </Link>
      </h5>
      <div>
        {formattedDate === "unknown" ? (
          <div>Unknown date</div>
        ) : (
          <div>Created at: {formattedDate}</div>
        )}
      </div>
      <div>
        <ImageComponent key={gallery.id} images={gallery.images} />
      </div>
      <p className="justify-content-center">{gallery.description}</p>

      <div>
        <CommentComponent
          key={gallery.id}
          gallery={gallery}
          handleDeleteComment={handleDeleteComment}
          isAuthenticated={isAuthenticated}
          handleAddNewComment={handleAddNewComment}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </div>
    </div>
  );
};
