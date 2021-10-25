import React from 'react';
import clsx from "clsx";

import s from './H1.module.scss';

export const H1 = ({ children, additionClass }) => <h1 className={clsx(s.title, s[additionClass])}>{children}</h1>;
