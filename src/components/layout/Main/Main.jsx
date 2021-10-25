import React from "react";
import clsx from "clsx";

import s from "./Main.module.scss";

export const Main = ({ children, router }) => {
  const getMainClass = (pathname) => pathname === '/' ? 'promo' : router.pathname.replace('/', '');
  return (
    <main
      className={clsx(s.main, s[getMainClass(router.pathname)])}>
      {children}
    </main>
  );
};
