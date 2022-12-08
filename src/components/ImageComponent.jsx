import React from "react";

export const ImageComponent = ({ images }) => {
  return (
    <div>
      <ul>
        {images && images.length
          ? images.map((image, index) => (
              <li key={image.id}>
                <a key={index} target="_blank" href={image.url}>
                  <img
                    key={image.id}
                    src={image.url}
                    alt={"Image"}
                    style={{ maxHeight: "320px", maxWidth: "620px" }}
                  />
                </a>
              </li>
            ))
          : "No images found"}
      </ul>
    </div>
  );
};
