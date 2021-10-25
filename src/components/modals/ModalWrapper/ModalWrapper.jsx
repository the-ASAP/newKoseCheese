import React from "react";
import s from "components/modals/ModalWrapper/ModalWrapper.module.scss";
import clsx from "clsx";

export const ModalWrapper = (props) => {
  const { show, children, closeModal, animation: { animationShow, animationHide }, classes: { boxClass, containerClass }, additionClass, stopScroll = false } = props;
  const [shouldRender, setRender] = React.useState(show);

  const closeModalOnEscape = React.useCallback((e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  }, [show]);

  React.useEffect(() => {
    if (show) {
      setRender(true);
      document.addEventListener("keydown", closeModalOnEscape);
    }

    document.body.style.overflow = stopScroll && show ? "hidden" : "unset";

    return () => document.removeEventListener("keydown", closeModalOnEscape)
  }, [show]);



  const onAnimationEnd = (e) => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div className={s[boxClass]} onClick={() => closeModal()}
           style={{ animation: `${show ? "fadeIn" : "fadeOut"} forwards .4s` }}>
        <div className={clsx(s[containerClass], s[additionClass])} onClick={(e) => e.stopPropagation()}
             style={{ animation: `${show ? animationShow : animationHide} forwards .4s` }}
             onAnimationEnd={(e) => onAnimationEnd(e)}>
          {children}
        </div>
      </div>
    )
  );
};

//
// const closeModalOnEscape = e => {
//   if (e.key === "Escape" && show) {
//     closeModal();
//   }
// }