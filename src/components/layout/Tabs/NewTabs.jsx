import React from 'react';
import clsx from "clsx";

import s from './NewTabs.module.scss';

export const NewTabs = ({ children, border, additionClass }) => <div className={clsx(s.container, border ? s.top : s.bottom, s[additionClass])}>{children}</div>;

