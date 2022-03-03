import React from "react";
import clsx from 'clsx';
import s from "./Wrapper.module.scss";

export const Wrapper = ({ children, additionClass, style }) => <div className={clsx(s.container, s[additionClass])} style={style}>{children}</div>;