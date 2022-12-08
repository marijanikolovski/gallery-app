import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

export function GalleryRow({ gallery }) {
    const formattedDate = useFormattedDate(gallery.created_at, "dd-MM-yyyy HH:mm");

  return (
    <div>
      <div>
        <img src={gallery?.images[0]?.url} width="100" alt="Gallery cover" />
      </div>
      <div>
        <Link to={`/galleries/${gallery.id}`}>{gallery.title}</Link>
      </div>
      <div>
        {formattedDate === "unknown" ? (
          <div>Unknown date</div>
        ) : (
          <div>Created at: {formattedDate}</div>
        )}
        By:{" "}
        <Link to={`/authors/${gallery?.user.id}`}>
          {gallery?.user?.first_name} {gallery?.user?.last_name}
        </Link>
      </div>
    </div>
  );
}
