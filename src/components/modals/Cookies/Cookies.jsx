import React from "react";

import s from "./Cookies.module.scss";

const cookiesWritesHandler = () => {
  document.cookie = "hideCookie=true; max-age=2,628e+6";
};

export const Cookies = ({ close }) => (
  <>
    <p className={s.text}>
      Мы используем cookies, чтобы сайт работал корректно. Они помогают нам понять, как
      пользователи взаимодействуют с сайтом, чтобы улучшать его работу. Информация собирается
      анонимно. Нажимая кнопку ХОРОШО, вы разрешаете использование файлов cookie
    </p>
    <button type="button" className={s.ok} onClick={() => {
      close();
      cookiesWritesHandler();
    }}>Хорошо
    </button>
  </>
);
