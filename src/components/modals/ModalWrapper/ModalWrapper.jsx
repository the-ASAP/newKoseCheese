// @ts-nocheck
import React from 'react';
import s from 'components/modals/ModalWrapper/ModalWrapper.module.scss';
import clsx from 'clsx';
import { windowSize } from '../../../constants'

export const ModalWrapper = (props) => {
  const {
    show,
    children,
    closeModal,
    animation: { animationShow, animationHide },
    classes: { boxClass, containerClass },
    additionClass,
    stopScroll = false
  } = props;
  const [shouldRender, setRender] = React.useState(show);

  const closeModalOnEscape = React.useCallback(
    (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    },
    [show]
  );

  React.useEffect(() => {
    if (show) {
      setRender(true);
      if(windowSize < 768) document.body.style.overflow = "hidden"
      // document.body.style.paddingRight = `${scrollbarWidth}px`
      document.addEventListener('keydown', closeModalOnEscape);
    }
    else {
      if(windowSize < 768) document.body.style.overflow = "auto"
      // document.body.style.paddingRight = `0`
    }

    let documentWidth = parseInt(document.documentElement.clientWidth)
    let windowsWidth = parseInt(window.innerWidth)
    let scrollbarWidth = windowsWidth - documentWidth;

    return () => document.removeEventListener('keydown', closeModalOnEscape);
  }, [show]);

  const onAnimationEnd = (e) => {
    if (!show) {
      setRender(false);
    }
  };
  
  return (
    shouldRender && (
      <div
        className={s[boxClass]}
        onClick={() => closeModal()}
        style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} forwards .4s` }}
      >
        <div
          className={clsx(s[containerClass], s[additionClass])}
          onClick={(e) => e.stopPropagation()}
          style={{ animation: `${show ? animationShow : animationHide} forwards .4s` }}
          onAnimationEnd={(e) => onAnimationEnd(e)}
        >
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
