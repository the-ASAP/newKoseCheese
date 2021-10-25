import React from 'react';
import clsx from 'clsx';

import s from 'components/buttons/TabButton/TabButton.module.scss';

export const TabButton = ({ text, active, toggleActive, index, small, additionClass }) => (
    <button
      className={clsx(s.btn, active === index && s.active, small && s.small, s[additionClass])}
      type="button"
      onClick={() => toggleActive(index)}
    >
      {small ? <h3>{text}</h3> : <h2>{text}</h2>}
    </button>
  );
