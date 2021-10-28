import React, { useEffect } from 'react';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { OrderingSection } from 'components/sections/purchase/OrderingSection/OrderingSection';
import { CartSection } from 'components/sections/purchase/CartSection/CartSection';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderFormData, orderFormDataSelector } from 'redux/slices/order';
import { userIdSelector } from '../redux/slices/user';
import g from '../styles/Main.module.scss';

const Purchase = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const { data: formData } = useSelector(orderFormDataSelector);
  useEffect(() => {
    if (userId) dispatch(getOrderFormData());
  }, [userId]);
  return (
    <>
      <Section margin="none">
        <Wrapper>
          <div className={g.flex}>
            <OrderingSection formData={formData} />
            <CartSection />
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
