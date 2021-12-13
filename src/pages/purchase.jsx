import React, { useEffect } from 'react';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { OrderingSection } from 'components/sections/purchase/OrderingSection/OrderingSection';
import { CartSection } from 'components/sections/purchase/CartSection/CartSection';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderFormData, orderFormDataSelector } from 'redux/slices/order';
import Head from 'next/head';
import { userIdSelector } from '../redux/slices/user';

import g from '../styles/Main.module.scss';

const Purchase = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const { data: formData } = useSelector(orderFormDataSelector);
  const [cost, setCost] = React.useState('');
  // useEffect(() => {
  //   console.log('ya', yandex);
  // }, []);
  useEffect(() => {
    // if (!formData?.products?.length) Router.push('/');
  }, [formData]);
  useEffect(() => {
    if (userId) dispatch(getOrderFormData());
  }, [userId]);

  return (
    <>
      <Head>
        <title>Оформление заказа</title>
        <script
          async
          src={`https://api-maps.yandex.ru/2.1/?apikey=22831a61-cd4e-43d4-a56e-13b907784078&lang=ru_RU`}
          type="text/javascript"
        />
      </Head>
      <Section margin="none">
        <Wrapper>
          <div className={g.flex}>
            <OrderingSection cost={cost} setCost={setCost} formData={formData} />
            <CartSection cost={cost} />
          </div>
        </Wrapper>
      </Section>
    </>
  );
};

export default Purchase;

//
// export const getServerSideProps = async () => {
//   const userData = await APIBitrix.post('order/data-step-one/', {
//     is_guest:
//     user_id: ''
//   })
// }
