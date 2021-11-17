import React, { useState, useEffect } from 'react';

import { SubcategoryButton } from 'components/buttons/SubcategoryButton/SubcategoryButton';
import { Purchase } from 'components/common/Purchase/Purchase';
import { useTabs } from 'hooks';
import { useSelector } from 'react-redux';
import { favoriteItemsSelector } from 'redux/slices/favorite';
import APIBitrix from 'api/APIBitrix';
import { ModalBody } from '../ModalBody/ModalBody';
import s from './Favorite.module.scss';

export const Favorite = ({ closeModal }) => {
  const { activeId, toggleActiveId } = useTabs(1, false);
  const itt = useSelector(favoriteItemsSelector);
  const itemsInFavorite = [
    ...itt,
    {
      addition: 'с томатами ',
      additionClass: '',
      category_id: '43',
      category_name: 'Соусы',
      code: '',
      count: 0,
      detailImage: '/upload/iblock/08d/nossqn8sdjc9q5juz6jyetd2stzbg4i6/DSC_8152.JPG',
      id: '86',
      name: 'Песто Россо',
      parent_category_id: '9',
      parent_category_name: 'тест',
      previewImage: '/upload/iblock/08d/nossqn8sdjc9q5juz6jyetd2stzbg4i6/DSC_8152.JPG',
      previewText: '',
      price: '1.00',
      quantity: 1,
      sort: '500',
      status: false
    }
  ];
  const [cats, setCats] = useState([]);
  useEffect(() => {
    APIBitrix.get('products/categories/').then((res) => {
      if (res?.length) {
        const arr = res.filter((category) =>
          itemsInFavorite.find((item) => category.id === item.parent_category_id)
        );
        setCats(arr);
      }
    });
  }, []);
  useEffect(() => {
    if (cats?.length) toggleActiveId(cats[0].id);
  }, [cats]);
  return (
    <ModalBody closeModal={closeModal} title="Избранное">
      <div className={s.subcategories}>
        {cats.length > 0 &&
          cats.map((favorite) => (
            <SubcategoryButton
              {...favorite}
              title={favorite.name}
              key={favorite.id}
              active={activeId}
              toggleActive={toggleActiveId}
            />
          ))}
      </div>
      <div>
        {itemsInFavorite.map(
          (item) =>
            activeId === item.parent_category_id && (
              <Purchase inFavorite key={item.id} params={item} />
            )
        )}
      </div>
    </ModalBody>
  );
};
