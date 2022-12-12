import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

export function GalleryRow({ gallery }) {
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <div>
      <div className="mt-5 mb-1 ml-1">
        <img src={gallery?.images[0]?.url} width="300" alt="Gallery cover" />
      </div>
      <h3 className="mt-1 mb-1 ml-1">
        <Link
          style={{ textDecoration: "none" }}
          to={`/galleries/${gallery.id}`}
        >
          {gallery.title}
        </Link>
      </h3>
      <div>
        {formattedDate === "unknown" ? (
          <div>Unknown date</div>
        ) : (
          <div>Created at: {formattedDate}</div>
        )}
        By:{" "}
        <Link
          style={{ textDecoration: "none" }}
          to={`/authors/${gallery?.user.id}`}
        >
          {gallery?.user?.first_name} {gallery?.user?.last_name}
        </Link>
      </div>
    </div>
  );
}
