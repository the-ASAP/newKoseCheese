import React from 'react'
import s from './Discount.module.scss';

export const Discount = ({text, close}) => (
        <div className={s.container}>
            <p className={s.text}>{text}</p>
            <button type='button' className={s.close} onClick={() => close()} />
        </div>
    )

