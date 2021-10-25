import React from "react";
import s from "components/modals/Subscribe/Subscribe.module.scss";
import { DaysList } from "components/common/DaysList/DaysList";
import { Input } from "components/forms/Input/Input";
import { FormContainer } from "components/forms/FormContainer/FormContainer";
import { PROFILE_VALIDATION_SCHEMA, subscribeDays } from "/src/constants.js";
import { Purchase } from "components/common/Purchase/Purchase";
import { ModalFooter } from "components/modals/ModalFooter/ModalFooter";
import { useSelector } from "react-redux";
import { cartItemsSelector } from "redux/slices/cart";
import { ModalBody } from "../ModalBody/ModalBody";
import { MultipleDropdown } from "components/common/MultipleDropdown/MultipleDropdown";


export const Subscribe = ({ closeModal }) => {

  const itemsInCart = useSelector(cartItemsSelector);

  const pushDaysInSelect = (day, ...rest) => {
    const [selectValue, setSelectValue] = rest;
    const updatedDays = [...selectValue];
    if (!updatedDays.some((el => el.title === day.title))) {
      updatedDays.push(day);
      setSelectValue(updatedDays.sort((a, b) => a.index - b.index));
    } else {
      setSelectValue(updatedDays.filter((el) => el.title !== day.title));
    }
  };

  return (
    <ModalBody title="Подписка" closeModal={closeModal}>
      <FormContainer enableReinitialize initialValues={{}} validationScheme={PROFILE_VALIDATION_SCHEMA}
                     className="fullWidth">
        {() =>
          <>
            <p className={s.subtitle}>Выберите дни по которым будет осуществляться доставка</p>
            <MultipleDropdown options={subscribeDays} pushingHandler={pushDaysInSelect}/>
            {/*<DaysList/>*/}
            <div className={s.dates}>
              <Input id="dateFrom" name="dateFrom" type="date" label="от" containerClass="subscribe"
                     additionClass="dateInput"/>
              <Input id="dateTo" name="dateTo" type="date" label="до" containerClass="subscribe"
                     additionClass="dateInput"/>
            </div>
            {itemsInCart.map(item => <Purchase inCart key={item.item_id} params={item}/>)}
            <ModalFooter/>
          </>
        }
      </FormContainer>
    </ModalBody>
  );
};

