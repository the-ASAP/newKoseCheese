import React from "react";
import Link from "next/link";
import { H1 } from "components/layout/H1/H1";
import s from "./ProfileHeader.module.scss";
import { useSelector } from "react-redux";
import { userInfoSelector } from "redux/slices/user";

export const ProfileHeader = () => {
  const userInfo = useSelector(userInfoSelector);
  return (
    <>
      <H1 additionClass="profile">Личный кабинет</H1>
      <header className={s.header}>
        <h3 className={s.title}>Здравствуйте, <span>{userInfo.name}</span></h3>
        <div className={s.row}>
          <div className={s.info}>
            <div className={s.field}>
              <span className={s.label}>Скидка:</span>
              <span className={s.value}>5%</span>
            </div>
            <div className={s.field}>
              <span className={s.label}>Баланс:</span>
              <span className={s.value}>320 руб.</span>
            </div>
            <div className={s.field}>
              <span className={s.label}>Всего покупок:</span>
              <span className={s.value}>112</span>
            </div>
            <div className={s.field}>
              <span className={s.label}>Доставка:</span>
              <span className={s.value}>Бесплатно</span>
            </div>
          </div>
          <Link href="/login">
            <a className={s.out}>Выйти</a>
          </Link>
          {/*<button type="button" className={s.out} href="#">Выйти</button>*/}
        </div>
      </header>
    </>
  );
};

