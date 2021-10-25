import React from 'react';

import s from './WrapperNarrow.module.scss';

export const WrapperNarrow = ({ children }) => (
    <div className={s.wrapper} >
      {children}
    </div>
  );

