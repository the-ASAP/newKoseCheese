import React from "react";
import { useSelector } from "react-redux";
import { TotalPrice } from 'components/common/TotalPrice/TotalPrice';
import { totalPriceSelector } from 'redux/slices/cart';
import { CloseButton } from "components/buttons/CloseButton/CloseButton";
import s from "./NewModalBody.module.scss";

export const NewModalBody = ({ closeModal, title, children }) => {
    const totalPrice = useSelector(totalPriceSelector);

  return (
    <>
        <div className={s.container}>
            <h2 className={s.title}></h2>
            <CloseButton close={closeModal}/>
        </div>
        <div className={s.header}>
            <h2 className={s.title}>{title}</h2>
            <div>
                <TotalPrice value={totalPrice} />
                {/* <span className={s.oldPrice}>Цена: {totalPrice} руб.</span> */}
            </div>
        </div>
        {children}
    </>
    )
};

