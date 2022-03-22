import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { menuChangeModalState } from 'redux/slices/modals';
import { MainLogo } from 'components/SVG/MainLogo';
import { CloseIcon } from 'components/SVG/Icons';
import { email, telegramSecond, tel, telegram } from 'contacts';
import s from './Menu.module.scss';
import { SearchPanel } from '../../common/SearchPanel/SearchPanel';

// const headerLinks = [
//   { title: 'Каталог', link: '/products' },
//   { title: 'Доставка', link: '/delivery' },
//   { title: 'Статьи', link: '/articles' },
//   { title: 'Производство', link: '/farm' },
//   { title: 'Вопросы', link: '/questions' }
// ];

const headerLinks = [
  { title: 'Каталог', link: 'products'},
  { title: 'Ферма', link: '/farm' },
  { title: 'Сыроварня', link: '/cheeseboard' },
  { title: 'Рецепты', link: '/articles'},
  { title: 'Контроль качества', link: '/control' },
  { title: 'Условия доставки', link: '/delivery' },
  { title: 'Вопросы', link: '/questions' },
];


export const Menu = () => {
  const dispatch = useDispatch();
  const closeMenuModalHandler = () => {
    dispatch(menuChangeModalState(false));
  };
  return (
    <div className={s.container}>
      <header className={s.header}>
        <span />
        <Link href="/">
          <a>
            <MainLogo />
          </a>
        </Link>
        <button type="button" onClick={closeMenuModalHandler} className={s.close}>
          <CloseIcon />
        </button>
      </header>
      <SearchPanel />
      <div className={s.wrapper}>
        <div className={s.block}>
          {headerLinks.map((el) => (
            <Link href={el.link} key={el.title}>
              <a className={s.link}>
                <h2 onClick={closeMenuModalHandler}>{el.title}</h2>
              </a>
            </Link>
          ))}
          <div className={s.contacts}>
            <a href={`tel:${tel}`} className={s.contact}>
              {tel}
            </a>
            <a href={`mailto:${email}`} className={s.contact}>
              {email}
            </a>
          </div>
        </div>
        <div className={s.block}>
          <a href={telegram} className={s.social}>
            Telegram
          </a>
          <a href={telegramSecond} className={s.social}>
            Наши лавки
          </a>
        </div>
      </div>
    </div>
  );
};
