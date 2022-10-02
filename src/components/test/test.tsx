import { NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addNewRating, addResultsToLocalStorage,
  getWordsListFromLocalStorage, increment
} from '../../store/translator/translatorSlice'
import { ROUTES } from "../../constants";
import { getAllPropValues, randomArrayItem, randomArrayWords } from "../../utils/utils";
import { objectType } from '../../types/types';
import resetBtn from "../../assets/images/reset-btn.svg";
import "./test.scss";

interface AnswersRef {
  rightAnswer: string;
  allAnswers: Array<string>;
}

function Test(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { words, countInitialTest } = useAppSelector(({ translator }) => translator);
  const [randomWords, setRandomWords] = useState<objectType[]>([]);
  const [randomWord, setRandomWord] = useState<objectType[]>([]);
  const answersRef = useRef<AnswersRef>({
    rightAnswer: "",
    allAnswers: [],
  });
  const [listAnswers, setListAnswers] = useState<Array<string>>([]);
  const [counterRightAnswers, setCounterRightAnswers] = useState<number>(0);

  const init = () => setRandomWords(randomArrayItem(words, 10));
  
  useEffect(() => {
    dispatch(getWordsListFromLocalStorage());
    dispatch(increment());
  }, []);
  
  useEffect(() => {
    init();
  }, [countInitialTest]);

  useEffect(() => {
    setRandomWord(randomArrayItem(randomWords, 1));

    if (!answersRef.current.allAnswers.length) {
      answersRef.current.allAnswers = getAllPropValues(randomWords, "uk");
    }
  }, [randomWords]);

  useEffect(() => {
    answersRef.current.rightAnswer = !!randomWord?.[0] && Object.values(getAllPropValues(randomWord, "uk"))?.[0];
    setListAnswers(randomArrayWords(answersRef.current.allAnswers, 3, answersRef.current.rightAnswer));
  }, [randomWord]);

  function changeWord(evt: React.MouseEvent<HTMLButtonElement>) {
    const button = evt.target as HTMLElement;
    const currentWord = !!randomWord?.[0] && Object.values(getAllPropValues(randomWord, "en"))?.[0];
    const newArrRandWords = randomWords.filter((obj) => {
      for (let key in obj) {
        if (key === "en") {
          if (obj[key] !== currentWord) return obj;
        }
      }
    });

    if (button.innerText === answersRef.current.rightAnswer) {
      setCounterRightAnswers((prevState) => prevState + 1);
    }

    if (newArrRandWords.length >= 1) {
      setRandomWords(newArrRandWords);
    } else {
      const date = new Date();
      dispatch(
        addNewRating(
          `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)} - ${
            counterRightAnswers + 1
          }0% answers`
        )
      );
      dispatch(addResultsToLocalStorage());
      navigate(ROUTES.Results);
    }
  }

  return (
    <>
      {(words.length >= 10) ?
        <>
          <h1 className="current-name">{!!randomWord?.[0] && Object.values(getAllPropValues(randomWord, "en"))?.[0]}</h1>
  
          <div className="answers">
            {listAnswers.map((btnText) => (
              <button key={btnText} onClick={(evt) => changeWord(evt)} className="answers__button button">
                {btnText}
              </button>
            ))}
          </div>
  
          <button className="reset-btn" onClick={init}>
            <img className="reset-btn__icon" src={resetBtn} alt='Reset button'/>
          </button>
        </>
        :
        (words.length >= 1 && words.length < 10) ?
          (<NavLink to={ROUTES.NewWords}>Мало слів. Додай ще {`${10 - words.length}`} слів i розпочни тест.</NavLink>)
          :
          (<NavLink to={ROUTES.NewWords}>Поки немає доданих слів. Додай слова і пройди тест.</NavLink>)
      }
    </>
  );
}

export default Test;
