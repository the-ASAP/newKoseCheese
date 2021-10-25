import React from "react";
import ContentLoader from "react-content-loader";
import s from "./ProductLoader.module.scss";

export const ProductLoader = () => (
    <>
      {["", "", "", ""].map((_, i) => <ContentLoader
        speed={2}
        width={"25%"}
        height={"25rem"}
        viewBox="0 0 330 400"
        backgroundColor="rgba(0, 0, 0, 0.1)"
        foregroundColor="#ffffff"
        className={s.item}
        foregroundOpacity={0.5}
        key={i}
      >
        <rect x="535" y="475" rx="3" ry="3" width="67" height="11"/>
        <rect x="500" y="473" rx="3" ry="3" width="140" height="11"/>
        <rect x="558" y="474" rx="3" ry="3" width="53" height="11"/>
        <rect x="522" y="475" rx="3" ry="3" width="72" height="11"/>
        <rect x="511" y="473" rx="3" ry="3" width="100" height="11"/>
        <rect x="567" y="461" rx="3" ry="3" width="37" height="11"/>
        <rect x="521" y="494" rx="3" ry="3" width="140" height="11"/>
        <rect x="491" y="465" rx="3" ry="3" width="173" height="11"/>
        <rect x="20" y="30" rx="23" ry="23" width="300" height="160"/>
        <rect x="77" y="204" rx="7" ry="7" width="169" height="24"/>
        <rect x="38" y="241" rx="8" ry="8" width="256" height="15"/>
        <circle cx="127" cy="286" r="15"/>
        <circle cx="166" cy="286" r="15"/>
        <circle cx="207" cy="286" r="15"/>
        <rect x="119" y="319" rx="6" ry="6" width="96" height="25"/>
        <rect x="91" y="361" rx="8" ry="8" width="155" height="33"/>
      </ContentLoader>)}
    </>
  );