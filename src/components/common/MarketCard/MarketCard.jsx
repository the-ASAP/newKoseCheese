import React from 'react'
import { formatPhone } from 'functions.js';

import s from './MarketCard.module.scss';

export const MarketCard = ({city, market, workingTime, phone, image }) => (
        <div className={s.card}>
            <div className={s.header}>
                <div className={s.info}>
                    <span className={s.address}>г. {city}, {market}.</span>
                    <span className={s.time}>{" "}({workingTime})</span>
                </div>
                {phone && <a href={`tel:${formatPhone(phone)}`} className={s.phone}>{phone}</a>}
            </div>
            <img src={image} alt='Козий сыр рынок' className={s.image} />
        </div>
    )

