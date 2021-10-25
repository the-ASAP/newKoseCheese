import React from "react";
import { BackButton } from "components/buttons/BackButton/BackButton";
import { Mail, Telegram, Vk } from "components/SVG/ArticleIcons";
import { BASE_SITE_URL } from "constants.js";
import { useRouter } from "next/router";
import s from "./ShareControl.module.scss";

export const ShareControl = ({ back, title }) => {
  const router = useRouter();
  const thisRoute = `${BASE_SITE_URL}${router.asPath.slice(1)}`;
  return (
    <div className={s.sticky}>
      <div className={s.controls}>
        {back && <BackButton additionClass="share"/>}
        <div className={s.share}>
          <button
            onClick={() => window.open(`https://vk.com/share.php?url=${thisRoute}`, "Поделиться Вконтакте", "width=600,height=400")}
            className={s.social}>
            <Vk/>
          </button>
          <button
            onClick={() => window.open(`https://t.me/share/url?url=${thisRoute}&text=${title}`, "Поделиться Вконтакте", "width=600,height=400")}
            type="button"
            className={s.social}>
            <Telegram/>
          </button>
          <a href={`mailto:?subject=${title}&body=${thisRoute}`} target="_blank" type="button" className={s.social}>
            <Mail/>
          </a>
        </div>
      </div>
    </div>
  );
};
