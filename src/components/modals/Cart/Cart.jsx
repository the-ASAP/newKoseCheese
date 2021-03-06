import React from 'react';

import { Purchase } from 'components/common/Purchase/Purchase';
import { CloseButton } from 'components/buttons/CloseButton/CloseButton';
import { useModal } from 'hooks';
import { ModalFooter } from 'components/modals/ModalFooter/ModalFooter';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from 'redux/slices/cart';
import { NewModalBody } from '../ModalBody/NewModalBody';

import s from './Cart.module.scss';

export const Cart = ({ closeModal }) => {
  const discountModal = useModal(false);
  const itemsInCart = useSelector(cartItemsSelector);

  return (
    <NewModalBody closeModal={closeModal} title="Корзина">
      {/* TODO: СКИДКА НА ТОВАР  */}
      {discountModal.isShowed && (
        <div className={s.promo}>
          <div className={s.promo__text}>Вам представлена скидка на первый заказ 10%</div>
          <CloseButton close={discountModal.hideModal} />
        </div>
      )}
      <div className={s.products}>
        {itemsInCart.map((item) => (
          <Purchase inCart key={item.id} params={item} />
        ))}
      </div>
      {itemsInCart?.length ? (
        <ModalFooter />
      ) : (
        <h3 style={{ marginTop: 40 }}>Ваша корзина пуста</h3>
      )}
    </NewModalBody>
  );
};
