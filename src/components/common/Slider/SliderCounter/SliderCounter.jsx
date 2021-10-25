import React from "react";
import clsx from "clsx";
import s from "./SliderCounter.module.scss";

export const SliderCounter = (props) => {
  const { isGallery, counter, counterBottom, currentCount, allCount, prev, next, additionClass, hide } = props;
  return (
    <div className={clsx(s.container, isGallery && s.full, counterBottom && s.bottom, s[additionClass])}>
      {counter && (
        <div className={clsx(s.counter, isGallery && s.large)}>
                  <span>
                     {currentCount < 10 ? `0${currentCount}` : currentCount}
                  </span>
          /
          <span className={s.counterAll}>
                     {allCount < 10 ? `0${allCount}` : allCount}
                  </span>
        </div>
      )}
      {!hide && <div className={s.nav}>
        <button type='button' ref={prev} className={s.prev}>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.65715 0.92888L0.293191 7.29284C-0.0973333 7.68337 -0.0973332 8.31653 0.293191 8.70705L6.65715 15.071C7.04768 15.4615 7.68084 15.4615 8.07137 15.071C8.46189 14.6805 8.46189 14.0473 8.07137 13.6568L2.41451 7.99995L8.07136 2.34309C8.46189 1.95257 8.46189 1.3194 8.07136 0.92888C7.68084 0.538355 7.04768 0.538355 6.65715 0.92888Z"
              fill="#184140"
            />
          </svg>
        </button>
        <button type='button' ref={next} className={s.next}>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538407 1.31946 0.538407 0.928933 0.928932C0.538408 1.31946 0.538408 1.95262 0.928933 2.34315L6.58579 8L0.928932 13.6569C0.538407 14.0474 0.538407 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM7 9L8 9L8 7L7 7L7 9Z"
              fill="#184140"
            />
          </svg>
        </button>
      </div>}

    </div>
  );
};

