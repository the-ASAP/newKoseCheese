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
    console.log();
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
              <span className={s.subtitle}>{item.previewText}</span>
              {/* <ul className={s.list}> */}
              {console.log(JSON.stringify(item.detailText))}
              <div className={s.content} dangerouslySetInnerHTML={{ __html: item.detailText }} />
              {/* {item.listItems.map((li) => (
                <li className={s.item} key={li}>{li}</li>
              ))} */}
              {/* </ul> */}
            </div>
          ))}
      </div>
    </>
  );
};
