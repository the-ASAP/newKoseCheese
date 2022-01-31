import React from 'react';
import { SearchIcon, CloseIcon } from 'components/SVG/Icons';
import Link from 'next/link';
import { useDebounce } from 'hooks';
import axios from 'axios';
import clsx from 'clsx';
import s from './SearchPanel.module.scss';
import { SearchLoader } from '../SearchLoader/SearchLoader';
import { windowSize } from '../../../constants';
import { useDispatch } from "react-redux";
import { closeAllModals } from "redux/slices/modals";

const initialValue = {
  search: ''
};

const fakeResults = [
  {
    url: '/',
    name: 'Камамбер козий',
    weight: 210
  },
  {
    url: '/',
    name: 'Сыр Бюш Де Шевр коровий с прованскими травами',
    weight: 210
  },
  {
    url: '/',
    name: 'Камамбер козий',
    weight: 210
  },
  {
    url: '/',
    name: 'Сыр Бюш Де Шевр коровий с прованскими травами',
    weight: 210
  }
];

export const SearchPanel = ({ setOpen }) => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = React.useState('');

  const [results, setResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const wrapperRef = React.useRef(null);

  const closePanelHandler = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      if (windowSize > 768) {
        setOpen(false);
      } else {
        setSearchTerm('');
        setResults([]);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closePanelHandler);
    return () => document.removeEventListener('click', closePanelHandler);
  }, [wrapperRef]);

  React.useEffect(() => {
    setIsSearching(!!searchTerm);
  }, [searchTerm]);

  React.useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        // setIsSearching(true);
        // Сделать запрос к АПИ
        axios.post(`https://koico.ru/api/search/`, { query: searchTerm }).then((res) => {
          let { data } = res.data;
          // Выставить состояние в false, так-как запрос завершен
          setIsSearching(false);
          // Выставит состояние с результатом
          if (data.length) {
            setResults(data);
          } else {
            setResults([
              {
                id: 1,
                name: 'К сожалению ничего не найдено'
              }
            ]);
          }
        });
      } else {
        setResults([]);
      }
    },
    // Это массив зависимостей useEffect
    // Хук useEffect сработает только если отложенное значение изменится ...
    // ... и спасибо нашему хуку, что оно изменится только тогда ...
    // когда значение searchTerm не менялось на протяжении 500ms.
    [debouncedSearchTerm]
  );

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        s.item,
        searchTerm && s.itemOpen,
        windowSize > 768 && s.itemBorder
      )}
    >
      <input
        autoFocus={windowSize > 768}
        type="text"
        name="search"
        className={s.input}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" className={s.icon} onClick={() => setSearchTerm('')}>
        {searchTerm ? (
          <CloseIcon color={windowSize > 768 ? '#184240' : '#FFF3E7'} />
        ) : (
          <SearchIcon color={windowSize > 768 ? '#184240' : '#FFF3E7'} />
        )}
      </button>
      {searchTerm && (
        <div className={clsx(s.results, windowSize > 768 && s.resultsPromo)}>
          {isSearching ? (
            <SearchLoader />
          ) : (
            results.map(({ id, name }) => (
              <Link key={id} href={`/products/${id}`}>
                <a className={s.link} onClick={() => dispatch(closeAllModals())}>{name}</a>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
