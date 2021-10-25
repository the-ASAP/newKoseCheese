import React from "react"
import ContentLoader from "react-content-loader"
import s from './SearchLoader.module.scss';

export const SearchLoader = () => (
  <ContentLoader
    speed={2}
    backgroundColor="rgba(0, 0, 0, 0.1)"
    foregroundColor="#ffffff"
    foregroundOpacity={0.5}
    className={s.item}
  >
    <rect x="401" y="102" rx="3" ry="3" height="230" />
    <rect x="4" y="1" rx="0" ry="0" height="28" />
    <rect x="4" y="44" rx="0" ry="0" height="28" />
    <rect x="4" y="89" rx="0" ry="0" height="28" />
  </ContentLoader>
)
