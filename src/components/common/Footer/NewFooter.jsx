import React from 'react';
import { MainLogo } from 'components/SVG/MainLogo';
import Link from 'next/link';
import { AsapLogoSvg } from 'components/SVG/Icons';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { formatPhone } from 'functions.js';
import { useDispatch } from 'react-redux';
import { letterChangeModalState } from 'redux/slices/modals';
import { email, tel, instagram, telegram, adress } from 'contacts';
import clsx from 'clsx';
import s from './NewFooter.module.scss';

const footerLinks = [
  { title: 'Каталог', link: '/products' },
  { title: 'Производство', link: '/farm' },
  { title: 'Доставка', link: '/delivery' },
  { title: 'Точки продаж', link: '/sale-points' },
  { title: 'Вопросы', link: '/questions' }
];

export const NewFooter = () => {
  const dispatch = useDispatch();

  const letterModalHandler = () => {
    dispatch(letterChangeModalState(true));
  };

  return (
    <footer className={s.footer}>
      <Wrapper>
        <div className={s.container}>
          <div className={s.block}>
              <a className={s.link} href={instagram}>
                <h2 className={s.title}>Instagram</h2>
              </a>
              <a className={s.link} href={telegram}>
                <h2 className={s.title}>Telegram</h2>
              </a>
          </div>
          <div className={s.block}>
              <a href={`tel:${formatPhone(`${tel}`)}`} className={s.contact}>
                <h2 className={s.title}>{tel}</h2>
              </a>
            <address className={s.address}>
              {adress}
            </address>
          </div>
          <div className={s.block}>
              <a href={`mailto:${email}`} className={clsx(s.link, s.email)}>
                <h2 className={s.title}>{email}</h2>
              </a>
              <button type="button" onClick={letterModalHandler} className={s.mail}>
                Написать нам
              </button>
          </div>
        </div>
        <div className={s.corp}>
          {
            <Link href="/">
              <a className={s.logo}>
                <MainLogo />
              </a>
            </Link>
          }
          <div className={s.company}>
            <span>©Ko&Co, 2021г. Все права защищены.</span>
          </div>
          <a href="https://asap-ag.ru" target="_blank" className={s.asap} rel="noreferrer">
            <AsapLogoSvg />
          </a>
        </div>
      </Wrapper>
    </footer>
  );
};
