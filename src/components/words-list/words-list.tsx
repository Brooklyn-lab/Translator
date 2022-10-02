import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store'
import { NavLink } from 'react-router-dom';
import { getWordsListFromLocalStorage } from '../../store/translator/translatorSlice';
import { ROUTES } from '../../constants';
import { getAllPropValues } from '../../utils/utils';
import "./word-list.scss";

function WordsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector(({ translator }) => translator);
  const [enWordsList, setEnWordsList] = useState<string[]>([]);
  const [ukWordsList, setUkWordsList] = useState<string[]>([]);
  
  useEffect(() => {
    dispatch(getWordsListFromLocalStorage());
  }, []);

  useEffect(() => {
    setEnWordsList(getAllPropValues(words, "en"));
    setUkWordsList(getAllPropValues(words, "uk"));
  }, [words]);
  
  return (
    <>
      {(words.length) ?
        (<div className='words'>
          <ul className="words__list">
            {enWordsList.map((word) => <li className="words__item" key={word}>{word}</li>)}
          </ul>
          <ul className="words__list">
            {ukWordsList.map((word) => <li className="words__item" key={word}>{word}</li>)}
          </ul>
        </div>)
        :
        (<NavLink to={ROUTES.NewWords}>Поки немає слів. Додай нові слова і починай вивчати.</NavLink>)
      }
    </>
  );
}

export default WordsList;
