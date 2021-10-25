import React from "react";
import { H1 } from "components/layout/H1/H1";
import { Wrapper } from "components/layout/Wrapper/Wrapper";
import { AuthSection } from "components/sections/auth/AuthSection/AuthSection";

const Registration = () => {
  return (
    <Wrapper>
      <H1 additionClass="profile">Личный кабинет</H1>
      <AuthSection/>
    </Wrapper>
  );
};

export default Registration;