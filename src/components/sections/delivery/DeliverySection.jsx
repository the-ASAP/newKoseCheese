import React from 'react';
import { Tabs } from 'components/layout/Tabs/Tabs';
import { TabButton } from 'components/buttons/TabButton/TabButton';
import { useTabs } from 'hooks';
import { delivery } from 'api/content';
import s from './DeliverySection.module.scss';

export const DeliverySection = ({ deliveryTitles }) => {
  const { activeId, toggleActiveId } = useTabs(deliveryTitles[0].id, false);
  const [activeCategory, setActiveCategory] = React.useState({});
  const [deliveryContent, setDeliveryContent] = React.useState(0);
  React.useEffect(() => {
    if (deliveryTitles) setActiveCategory(deliveryTitles.find(({ id }) => id === activeId));
  }, [activeId, deliveryTitles]);
  const getContent = async () => {
    const { data: content } = await delivery.getDeliveryContent(activeCategory?.id);
    if (content) setDeliveryContent(content);
  };

  React.useEffect(() => {
    if (activeCategory) getContent();
  }, [activeCategory]);
  return (
    <>
      <Tabs>
        {deliveryTitles.map(({ name, id }) => (
          <TabButton
            text={name}
            key={id}
            index={id}
            active={activeId}
            toggleActive={toggleActiveId}
          />
        ))}
      </Tabs>
      <div className={s.container}>
        {deliveryContent &&
          deliveryContent.map((item, i) => (
            <div className={s.block} key={i}>
              <span className={s.subtitle} dangerouslySetInnerHTML={{ __html: item.previewText }} />
              <div className={s.content} dangerouslySetInnerHTML={{ __html: item.detailText }} />
              <div className={s.content__imageWrap}>
                {item.gallery &&
                  item.gallery.map((imageSrc, j) => {
                    // let host = 'https://co-ko.asap-lp.ru/';
                    // host = host + imageSrc;
                    return <img src={imageSrc} key={j} className={s.content__image} />;
                  })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
