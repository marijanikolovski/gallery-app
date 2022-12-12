import React from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../store/user/selector";
import useFormattedDate from "../hooks/useFormattedDate";
import { Button } from "react-bootstrap";

export const CommentComponent = ({
  gallery,
  handleDeleteComment,
  isAuthenticated,
  handleAddNewComment,
  newComment,
  setNewComment,
}) => {
  const activeUser = useSelector(selectActiveUser);
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <div>
      {gallery && gallery.comments && (
        <div>
          {gallery.comments.length ? <h3>Comments</h3> : <h3>No Comments</h3>}
          <ul>
            {gallery.comments.map((comment) => (
              <li key={comment.id}>
                <div>
                  By: {comment.user.first_name} {comment.user.last_name}
                </div>
                <div>
                  {formattedDate === "unknown" ? (
                    <div>Unknown date</div>
                  ) : (
                    <div>Created at: {formattedDate}</div>
                  )}
                </div>
                <p>{comment.content}</p>
                {activeUser && activeUser.id === comment.user.id && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete Comment
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <form onSubmit={handleAddNewComment}>
            <textarea
              required
              value={newComment.content}
              placeholder="Enter comment"
              onChange={({ target }) =>
                setNewComment({ ...newComment, content: target.value })
              }
            />
            <div>
              <Button type="submit">Create Comment</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
