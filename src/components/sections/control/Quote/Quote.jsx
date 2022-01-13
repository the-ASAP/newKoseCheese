import React from 'react'
import s from './Quote.module.scss'

export const Quote = ({info}) => {
    const {text, author, position} = info
    return (
        <div className={s.container}>
            {/* <h1 className={s.bigComma}>“a</h1> */}
            <h2 className={s.text}>{text}</h2>
            <span className={s.author}>{author}</span>
            <span className={s.position}>{position}</span>
        </div>
    )
}
