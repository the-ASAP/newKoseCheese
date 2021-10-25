import React from 'react';
import clsx from 'clsx';

import s from 'components/buttons/SubcategoryButton/SubcategoryButton.module.scss';

export const SubcategoryButton = ({title, id, active, toggleActive, additionClass}) => (
    <button
      type="button"
      className={clsx(s.subcategory, active === id && s.active, s[additionClass])}
      onClick={() => toggleActive(id)}
    >
      {title}
    </button>
  );

