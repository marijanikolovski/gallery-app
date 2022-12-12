import React from "react";
import { Carousel } from "react-bootstrap";

export const ImageComponent = ({ images }) => {
  return (
    <div>
      <Carousel>
        {images && images.length
          ? images.map((image, index) => (
              <Carousel.Item key={image.id}>
                <a key={index} target="_blank" href={image.url}>
                  <img
                    key={image.id}
                    src={image.url}
                    alt={"Image"}
                    style={{ maxHeight: "320px", maxWidth: "620px" }}
                  />
                </a>
              </Carousel.Item>
            ))
          : "No images found"}
      </Carousel>
    </div>
  );
};
