import React from "react";
import { wrapper } from "redux/store";

import "nprogress/nprogress.css";
import "styles/global.scss";
import "swiper/swiper.scss";
import NProgress from "nprogress";
import Router from "next/router";
import { Header } from "components/common/Header/Header";
import { Main } from "components/layout/Main/Main";
import { Footer } from "components/common/Footer/Footer";
import { AllModals } from "components/modals/AllModals/AllModals";
import { Submenu } from "components/common/Submenu/Submenu";
import { windowSize } from "constants.js";
import { useClientSide } from "hooks.js";
import APIBitrix from "api/APIBitrix";
import { useDispatch } from "react-redux";
import { addUserId } from "../redux/slices/user";
import { reqGetProducts } from "../redux/slices/cart";

const MyApp = ({ Component, pageProps, router }) => {


  // preloader
  NProgress.configure({ easing: "ease", speed: 500 });

  Router.onRouteChangeStart = () => {
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    NProgress.done();
  };


  const isClientSide = useClientSide();
  const dispatch = useDispatch();

  const putClientInStorage = async () => {
    const getClientId = await APIBitrix.get("users/fuser-id/").then(res => res.fuser_id);
    localStorage.setItem("fuser_id", getClientId);
    dispatch(addUserId(localStorage.getItem("fuser_id")));
  };

  const getProducts = async () => {
    if (!localStorage.getItem("fuser_id")) {
      await putClientInStorage();
    }
    await dispatch(addUserId(localStorage.getItem("fuser_id")));
    await dispatch(reqGetProducts());
  }


  React.useEffect(() => {

    getProducts();

    // избранное


  }, []);

  return (
    <>
      <Header router={router}/>
      <Main router={router}>
        <Component {...pageProps} />
        <AllModals/>
        {isClientSide && windowSize < 768 && <Submenu/>}
      </Main>
      <Footer/>
    </>
  );
};

export default wrapper.withRedux(MyApp);

