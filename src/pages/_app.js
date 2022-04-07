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

  const putClientInStorage = async () => {
    if (!localStorage.getItem('fuser_id')) {
      const getClientId = await APIBitrix.get('user/fuser-id/').then((res) => res.fuser_id);
      localStorage.setItem('fuser_id', getClientId);
    }
    dispatch(setUserInfo({ user_id: localStorage.getItem('fuser_id') }));
    dispatch(reqGetProducts());
  };

  const getProducts = async () => {
    if (localStorage.getItem('authToken')) {
      if (!localStorage.getItem('fuser_id')) {
        const getClientId = await APIBitrix.get('user/fuser-id/').then((res) => res.fuser_id);
        localStorage.setItem('fuser_id', getClientId);
      }

      const dataAuthToken = await APIBitrix.getAuth(
        'user/new-token/',
        {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      ).then(async ({ data }) => {
        if (data.token) {
          localStorage.setItem('authToken', data.token)

          await APIBitrix.post(
            'user/personal-data/',
            {},
          ).then((res) => {
            const userInfo = res.data
            dispatch(setUserInfo({ ...userInfo, isLogged: true, fuserId: localStorage.getItem('fuser_id') }))
            dispatch(reqGetProducts());
          });
        }
        else putClientInStorage();
      })
    }
    else putClientInStorage();
  };

  let categories = [];
  React.useEffect(async () => {
    getProducts();

    categories = await APIBitrix.get('products/categories/').then((res) => res);
    if(!categoriesItems.length) dispatch(addCategories(categories));
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
