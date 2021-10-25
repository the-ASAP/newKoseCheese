import React from "react";

import { Step } from "components/common/Step/Step";
import { WrapperNarrow } from "components/layout/WrapperNarrow/WrapperNarrow";
import { BASE_SITE_URL } from "constants.js";
import s from "./StepsSection.module.scss";


export const StepsSection = ({ stages }) => {
  const { promo, steps } = stages;
  return (
    <section className={s.section}>
      <WrapperNarrow>
        <h2>Этапы</h2>
        <img className={s.promo} src={BASE_SITE_URL + promo} alt=""/>
        <div>
          {steps && steps[0].map((step, index) => <Step index={index} key={index} {...step}/>)}
        </div>
      </WrapperNarrow>
    </section>
  );
};


