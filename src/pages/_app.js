// @ts-nocheck
import React from 'react';
import { wrapper } from 'redux/store';

import 'nprogress/nprogress.css';
import 'styles/global.scss';
import 'swiper/swiper.scss';
import { Header } from 'components/common/Header/Header';
import { Main } from 'components/layout/Main/Main';
import { NewFooter } from 'components/common/Footer/NewFooter';
import { AllModals } from 'components/modals/AllModals/AllModals';
import { Submenu } from 'components/common/Submenu/Submenu';
import { windowSize } from 'constants.js';
import { useClientSide } from 'hooks.js';
import APIBitrix from 'api/APIBitrix';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../redux/slices/user';
import { reqGetProducts } from '../redux/slices/cart';
import { categoriesItemsSelector, addCategories } from 'redux/slices/categories';

const MyApp = ({ Component, pageProps, router }) => {
  const isClientSide = useClientSide();
  const dispatch = useDispatch();
  const categoriesItems = useSelector(categoriesItemsSelector)

  const getProductsForFUserId = async () => {
    if (!localStorage.getItem('fuser_id')) {
      const FUserId = await APIBitrix.get('user/fuser-id/').then((res) => res.fuser_id);
      localStorage.setItem('fuser_id', FUserId);
    }
    dispatch(reqGetProducts());
  }

  const authGuest = async () => {
    localStorage.removeItem('authToken')
    getProductsForFUserId()
    dispatch(setUserInfo({ fuserId: localStorage.getItem('fuser_id') }));
  };

  const authClient = async () => {
    getProductsForFUserId()

    const dataAuthToken = await APIBitrix.getAuth('user/new-token/').then(res => res.data?.token)
    if (dataAuthToken) {
      localStorage.setItem('authToken', dataAuthToken)
      const userInfo = await APIBitrix.post('user/personal-data/').then(res => res.data)
      if (userInfo) dispatch(setUserInfo({ ...userInfo, isLogged: true, fuserId: localStorage.getItem('fuser_id') }))
    }
    else authGuest();
  };


  React.useEffect(async () => {
    authClient();

    if (!categoriesItems.length) {
      const categories = await APIBitrix.get('products/categories/').then((res) => res);
      dispatch(addCategories(categories));
    }
  }, []);

  return (
    <>
      <Header router={router} />
      <Main router={router}>
        <Component {...pageProps} />
        <AllModals />
        {isClientSide && windowSize < 768 && <Submenu />}
      </Main>
      <NewFooter />
    </>
  );
};

export default wrapper.withRedux(MyApp);
