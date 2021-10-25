import React from "react";
import { ProfileButton } from "components/buttons/ProfileButton/ProfileButton";
import Dropdown from "react-dropdown";
import { windowSize } from "constants.js";
import { useClientSide } from "hooks";
import s from "./ProfileAside.module.scss";

export const ProfileAside = ({ categories, active, setActive }) => {
  const isClientSide = useClientSide();
  return (
    <aside className={s.wrapper}>
      <nav className={s.nav}>
        {
          isClientSide && windowSize < 768 ?
            <Dropdown
              options={categories.map(category => category.title)}
              className={s.field}
              controlClassName={s.control}
              menuClassName={s.menu}
              value={categories[0].title}
              arrowOpen={<span className={s.arrowOpen}/>}
              arrowClosed={<span className={s.arrowClosed}/>}
              onChange={(e) => {
                const activeChapter = categories.find(category => category.title === e.value);
                setActive(activeChapter.id);
              }}/>
            :
            categories.map(({ id, title }) => (
              <ProfileButton
                active={active}
                setActive={setActive}
                key={id}
                id={id}
              >
                {title}
              </ProfileButton>
            ))
        }
      </nav>
    </aside>
  );
};


