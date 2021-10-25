import React from "react";
import s from "./ZoomImage.module.scss";

export const ZoomImage = ({ image, objectProperties }) => {
  const [zoom, setZoom] = React.useState({});
  const { left, top, width, height } = objectProperties;
  const encodedImage = encodeURI(`${image}`);
  const zoomInHandler = (e) => {
    setZoom({
      transformOrigin: `${(e.pageX - left) / parseInt(width, 10) * 100}% ${(e.pageY - top) / parseInt(height, 10) * 100}%`
    });
  };

  const zoomOutHandler = () => {
    setZoom({
      opacity: 0,
      transform: "scale(1)"
    });
  };

  return (
    <>
      <div
        className={s.item}
        style={{
          backgroundImage: `url(${encodedImage})`,
          ...zoom
        }}
        onMouseMove={zoomInHandler}
        onMouseOut={zoomOutHandler}
      />
    </>
  );
};