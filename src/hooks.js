import React from "react";

export const useModal = (init = false, stopScroll = true) => {
  const [isShowed, setIsShowed] = React.useState(init);

  const hideModal = () => setIsShowed(false);
  const showModal = () => setIsShowed(true);

  // eslint-disable-next-line consistent-return
  // React.useEffect(() => {
  //   if (stopScroll) {
  //     document.body.style.overflow = isShowed ? "hidden" : "unset";
  //     document.addEventListener("keydown", (e) => {
  //       if (e.key === "Escape") hideModal();
  //     });
  //     return () => {
  //       document.removeEventListener("keydown", hideModal, false);
  //     };
  //   }
  // }, [isShowed]);

  return { isShowed, hideModal, showModal };
};


export const useTabs = (init = null, isRemovable = true) => {
  const [activeId, setActiveId] = React.useState(init);

  const toggleActiveId = (id) => {
    setActiveId(id);
    if (isRemovable && id === activeId) setActiveId(null);
  };

  return { activeId, setActiveId, toggleActiveId };
};

export const useClientSide = () => {
  const [isRender, setIsRender] = React.useState(false);
  React.useEffect(() => {
    setIsRender(true);
  }, []);
  return isRender;
};

export const useDebounce = (value, delay) => {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}
