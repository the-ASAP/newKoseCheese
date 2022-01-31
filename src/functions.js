import React from 'react';

export const formatPhone = (phone) => phone.replace(/[^0-9.]/gim, '');
export const formatPhoneDephis = (phone) => phone.replace(/^(\d+-?)+\d+$/, '');
export const stringFromArray = (array, field) => array.map((el) => el[field]).join(', ');
export const useOutsideClicker = (ref, action) => {
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getOffsetTop = () => {
  let scrollTop = 0;

  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }

  return scrollTop;
};

export const addFavorite = (product) => {
  if (!localStorage.getItem('itemsInFavorite')) {
    localStorage.setItem('itemsInFavorite', JSON.stringify([product]));
  } else {
    let favorite = JSON.parse(localStorage.getItem('itemsInFavorite'));
    if (!favorite.some((item) => item.id === product.id)) favorite.push(product);
    localStorage.setItem('itemsInFavorite', JSON.stringify(favorite));
  }
};

export const removeFavorite = (product) => {
  let favorite = JSON.parse(localStorage.getItem('itemsInFavorite'));
  favorite = favorite.filter((item) => item.id !== product.id);
  localStorage.setItem('itemsInFavorite', JSON.stringify(favorite));
};


export const sortProductsFunction = (productsArr, sortKey, sortBy) => {
  return productsArr.sort((a,b) => {
    if(sortBy === 'DESC') {
      if (+a[sortKey] > +b[sortKey]) {
        return -1;
      }
      if (+a[sortKey] < +b[sortKey]) {
        return 1;
      }
      return 0;
    }                        
    if(sortBy === "ASC") {
      if (+a[sortKey] > +b[sortKey]) {
        return 1;
      }
      if (+a[sortKey] < +b[sortKey]) {
        return -1;
      }
      return 0;
    }
  })
}