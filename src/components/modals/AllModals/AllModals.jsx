import React from "react";
import { ModalWrapper } from "components/modals/ModalWrapper/ModalWrapper";
import { mainModalProperties, mainPopupProperties } from "constants.js";
import { Cart } from "components/modals/Cart/Cart";
import { Favorite } from "components/modals/Favorite/Favorite";
import { Subscribe } from "components/modals/Subscribe/Subscribe";
import { Letter } from "components/modals/Letter/Letter";
import { Menu } from "components/modals/Menu/Menu";
import { PrivacyPolicy } from "components/modals/PrivacyPolicy/PrivacyPolicy";
import { useDispatch, useSelector } from "react-redux";
import {
  cartModalSelector,
  favoriteModalSelector,
  subscribeModalSelector,
  letterModalSelector,
  menuModalSelector,
  privacyModalSelector,
  cartChangeModalState,
  favoriteChangeModalState,
  letterChangeModalState,
  subscribeChangeModalState,
  menuChangeModalState,
  privacyChangeModalState,
  popUpChangeModalState,
  popUpModalSelector,
  newPhonePopUpSelector,
  newPhonePopupChangeState,
  successPurchasePopupChangeState, successPurchaseSelector
} from "redux/slices/modals";
import { WarnPopup } from "components/modals/WarnPopup/WarnPopup";
import { ChangePhonePopup } from "components/modals/ChangePhonePopup/ChangePhonePopup";
import { SuccessPurchase } from "components/modals/SuccessPurchase/SuccessPurchase";


export const AllModals = () => {
  const dispatch = useDispatch();
  const cartModalValue = useSelector(cartModalSelector);
  const favoriteModalValue = useSelector(favoriteModalSelector);
  const subscribeModalValue = useSelector(subscribeModalSelector);
  const letterModalValue = useSelector(letterModalSelector);
  const menuModalValue = useSelector(menuModalSelector);
  const privacyModalValue = useSelector(privacyModalSelector);
  const popupModalValue = useSelector(popUpModalSelector);
  const newPhonePopupValue = useSelector(newPhonePopUpSelector);
  const successPurchasePopupValue = useSelector(successPurchaseSelector);

  return (
    <>
      <ModalWrapper closeModal={() => dispatch(cartChangeModalState(false))}
                    show={cartModalValue}
                    stopScroll
                    {...mainModalProperties}>
        <Cart closeModal={() => dispatch(cartChangeModalState(false))}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(favoriteChangeModalState(false))}
                    show={favoriteModalValue}
                    stopScroll
                    {...mainModalProperties}>
        <Favorite closeModal={() => dispatch(favoriteChangeModalState(false))}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(subscribeChangeModalState(false))}
                    show={subscribeModalValue}
                    stopScroll
                    {...mainModalProperties}>
        <Subscribe closeModal={() => dispatch(subscribeChangeModalState(false))}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(letterChangeModalState(false))}
                    show={letterModalValue}
                    stopScroll
                    {...mainModalProperties}>
        <Letter closeModal={() => dispatch(letterChangeModalState(false))}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(menuChangeModalState(false))}
                    show={menuModalValue}
                    stopScroll
                    additionClass="menu"
                    {...mainModalProperties}>
        <Menu/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(privacyChangeModalState(false))}
                    show={privacyModalValue}
                    stopScroll
                    {...mainModalProperties}>
        <PrivacyPolicy closeModal={() => dispatch(privacyChangeModalState(false))}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(popUpChangeModalState(false))}
                    show={popupModalValue.visible}
                    stopScroll
                    {...mainPopupProperties}>
        <WarnPopup text={popupModalValue.text}/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(newPhonePopupChangeState(false))}
                    show={newPhonePopupValue}
                    {...mainPopupProperties}>
        <ChangePhonePopup/>
      </ModalWrapper>
      <ModalWrapper closeModal={() => dispatch(successPurchasePopupChangeState(false))}
                    show={successPurchasePopupValue.visible}
                    stopScroll
                    {...mainPopupProperties}>
        <SuccessPurchase order={successPurchasePopupValue.order} mail={successPurchasePopupValue.mail}/>
      </ModalWrapper>
    </>
  );
};

