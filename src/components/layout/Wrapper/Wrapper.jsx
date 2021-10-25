import React from "react";

import s from "./Wrapper.module.scss";

export const Wrapper = ({ children, style }) => <div className={s.container} style={style}>{children}</div>;