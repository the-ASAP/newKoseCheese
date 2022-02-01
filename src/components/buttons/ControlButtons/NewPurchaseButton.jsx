// @ts-nocheck
import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { PurchaseIcon, NewPurchaseIcon } from 'components/SVG/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsSelector, reqAddToCart, reqIncProductCount} from 'redux/slices/cart';
import s from './ControlButtons.module.scss';
import { popUpChangeModalState } from 'redux/slices/modals';

const NewPurchaseButton = ({ productProps }) => {
    const dispatch = useDispatch();

    const itemsInCart = useSelector(cartItemsSelector);

    const cartHandler = () => {
        if(itemsInCart.some(item => item.id === id)) {
          // let deletedProduct = itemsInCart.find(item => item.id === id)
          // dispatch(reqRemoveFromCart(deletedProduct))
          let incProduct = itemsInCart.find(item => item.id === id)
          dispatch(reqIncProductCount({...incProduct, quantity: parseInt(incProduct?.quantity, 10) + 1}))
        }
        else {
          if (productProps.status) {
            // @ts-ignore
            dispatch(reqAddToCart(productProps));
          } else if (!productProps.status) {
            dispatch(
              popUpChangeModalState({
                visible: true,
                text: 'Товара временно нет в наличии'
              })
            );
          }
        }
      };
    const { id } = productProps;
    const [cartClick, setCartClick] = useState(false);
    useEffect(() => {
        itemsInCart.some((item) => item.id === id) ? setCartClick(true) : setCartClick(false);
      }, [itemsInCart]);

    return (
        <button
            type="button"
            className={clsx(s.newButton, cartClick ? s.newButtonClicked : '')}
            onClick={cartHandler}
        >
            <NewPurchaseIcon />
            <span className={s.newButton__text}>В корзину</span> 
        </button>
    )
}

export default NewPurchaseButton