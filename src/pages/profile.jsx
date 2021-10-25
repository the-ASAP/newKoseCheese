import React from "react";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { useTabs } from "hooks";
import { windowSize } from "constants.js";

import {
  ProfileHeader,
  ProfileAside,
  ProfilePersonal,
  ProfileWrapper,
  ProfileDelivery,
  ProfileOrders,
  ProfileLoyalty,
  ProfileFeedback,
  ProfileReturn,
  ProfileBody,
  ProfileHistory,
  ProfileSubscribe
} from "components/sections/profile";
import { BackButton } from "components/buttons/BackButton/BackButton";

const profileData = [
  {
    id: 1,
    title: "Заказы",
    component: <ProfileOrders/>
  },
  {
    id: 2,
    title: "Подписки",
    component: <ProfileSubscribe/>
  },
  {
    id: 3,
    title: "Адреса доставки",
    component: <ProfileDelivery/>
  },
  {
    id: 4,
    title: "Личные данные",
    component: <ProfilePersonal/>
  },
  {
    id: 5,
    title: "Отправка отзыва",
    component: <ProfileFeedback/>
  },
  {
    id: 6,
    title: "Программа лояльности",
    component: <ProfileLoyalty/>
  },
  {
    id: 7,
    title: "Возврат товара",
    component: <ProfileReturn/>
  }
];

const Profile = () => {

  const { activeId, toggleActiveId, setActiveId } = useTabs(1, false);

  const [activePage, setActivePage] = React.useState(profileData.find(component => component.id === activeId));

  const [prevPage, setPrevPage] = React.useState(null);

  React.useEffect(() => {
    setActivePage(prev => {
      setPrevPage(prev);
      return profileData.find(component => component.id === activeId);
    });
  }, [activeId]);

  const backButtonHandler = () => {
    setActiveId(prevPage.id);
    return true;
  };

  return (
    <Wrapper>
      <ProfileHeader/>
      <ProfileWrapper>
        {
          activePage.id === 7 && windowSize <= 1200 && windowSize >= 768 ?
            <BackButton
              clickHandler={backButtonHandler}
              additionClass="profile"
            />
            :
            <ProfileAside
              categories={profileData}
              active={activeId}
              setActive={toggleActiveId}
            />
        }
        <ProfileBody
          title={activePage.title}
          id={activeId}
          additionClass={activePage.id === 7 && "orderReturn"}
        >
          {activePage.component}
        </ProfileBody>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Profile;