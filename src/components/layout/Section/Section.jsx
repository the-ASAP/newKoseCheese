import React from "react";
import clsx from "clsx";
import s from './Section.module.scss';

export const Section = ({ children, margin }) => (
  <section className={clsx(s.block, s[margin])} >{children}</section>
);