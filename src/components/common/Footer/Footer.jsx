import React from "react";
import { MainLogo } from "components/SVG/MainLogo";
import Link from "next/link";
import { AsapLogoSvg } from "components/SVG/Icons";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { formatPhone } from "functions.js";
import { useDispatch } from "react-redux";
import { letterChangeModalState } from "redux/slices/modals";
import s from "./Footer.module.scss";
import clsx from "clsx";

const footerLinks = [
  { title: "Каталог", link: "/products" },
  { title: "Производство", link: "/farm" },
  { title: "Доставка", link: "/delivery" },
  { title: "Точки продаж", link: "/sale-points" },
  { title: "Вопросы", link: "/questions" }
];

export const Footer = () => {

  const dispatch = useDispatch();
  
  const letterModalHandler = () => {
    dispatch(letterChangeModalState(true));
  };
  
  return (
    (
      <footer className={s.footer}>
        <Wrapper>
          <div className={s.container}>
            <div className={s.block}>
              <nav className={s.menu}>
                {footerLinks.map(({ title, link }) =>
                  (
                    <Link href={link} key={link}>
                      <a className={s.link}>
                        <h2 className={s.title}>{title}</h2>
                      </a>
                    </Link>
                  )
                )}
              </nav>
            </div>
            <div className={s.block}>
              <nav className={clsx(s.menu, s.menuSocial)}>
                <a className={clsx(s.link, s.social)} href="https://telegram.org"><h3 className={s.title}>Telegram</h3></a>
                <a className={clsx(s.link, s.social)} href="https://instagram.com/instagram"><h3 className={s.title}>Instagram</h3></a>
              </nav>
              <div className={s.info}>
                <address className={s.address}>
                  Смоленская область, Кардымовский район, село Каменка ООО "Красная горка", ОГРН 1136733008763, ИНН
                  6722041039
                </address>
                <div className={s.contacts}>
                  <a href={`tel:${formatPhone("8 (800) 250-58-24")}`} className={s.contact}>8 (800) 250-58-24</a>
                  <a href="mailto:sales@koico.ru" className={s.contact}>sales@koico.ru</a>
                </div>
                <button type="button" onClick={letterModalHandler} className={s.mail}>
                  Написать нам
                </button>
              </div>
            </div>
          </div>
          <div className={s.corp}>
            {
              <Link href="/">
                <a className={s.logo}>
                  <MainLogo/>
                </a>
              </Link>
            }
            <div className={s.company}>
              <span>©Ko&Co, 2021г. Все права защищены.</span>
            </div>
            <a
              href="https://asap-ag.ru"
              target="_blank"
              className={s.asap} rel="noreferrer"
            >
              <AsapLogoSvg/>
            </a>
          </div>
        </Wrapper>
      </footer>
    )
  )
};
