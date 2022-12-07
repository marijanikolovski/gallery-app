import { Link } from "react-router-dom";

export function GalleryRow({ gallery }) {
  return (
    <div>
      <div>
        <img src={gallery?.images[0]?.url} width="100" alt="Gallery cover" />
      </div>
      <div>
        <Link to={`/galleries/${gallery.id}`}>{gallery.title}</Link>
      </div>
      <div>
        By:{" "}
        <Link to={`/authors/${gallery.user.id}`}>
          {gallery.user.first_name} {gallery.user.last_name}
        </Link>
      </div>
    </div>
  );
}
