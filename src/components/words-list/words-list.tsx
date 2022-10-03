import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { NavLink } from 'react-router-dom';
import { addWordsListToLocalStorage, getWordsListFromLocalStorage, addNewWords } from '../../store/translator/translatorSlice';
import { ROUTES, WORDLIST } from '../../constants';
import { getAllPropValues } from '../../utils/utils';
import addBtn from "../../assets/images/add-btn.svg";
import "./word-list.scss";

function WordsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector(({ translator }) => translator);
  const [enWordsList, setEnWordsList] = useState<string[]>([]);
  const [ukWordsList, setUkWordsList] = useState<string[]>([]);

  const addTestWordsList = () => {
    WORDLIST.forEach((listItem) => {
      dispatch(addNewWords(listItem));
    });
    dispatch(addWordsListToLocalStorage());
  };
  
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
        (
          <>
            <NavLink to={ROUTES.NewWords}>Поки немає слів. Додай нові слова і починай вивчати. Або натисни додати в правому кутку, додай відразу 10 слів і починай тест одразу.</NavLink>
            <button className="reset-btn" onClick={addTestWordsList}>
              <img className="reset-btn__icon" src={addBtn} alt='Add button'/>
            </button>
          </>
        )
      }
    </>
  );
}

export default WordsList;
