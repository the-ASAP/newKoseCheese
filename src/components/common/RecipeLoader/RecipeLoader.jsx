import React from "react";
import ContentLoader from "react-content-loader";
import s from "./RecipeLoader.module.scss";

export const RecipeLoader = () => (
  ["", ""].map((_, i) =>
    <ContentLoader
      key={i}
      speed={2}
      viewBox="0 0 606 580"
      backgroundColor="rgba(0, 0, 0, 0.1)"
      foregroundColor="#ffffff"
      foregroundOpacity={0.5}
      className={s.item}
    >
      <rect x="3" y="4" rx="0" ry="0" width="600" height="320"/>
      <rect x="4" y="338" rx="0" ry="0" width="521" height="48"/>
      <rect x="5" y="402" rx="0" ry="0" width="399" height="149"/>
    </ContentLoader>)
);