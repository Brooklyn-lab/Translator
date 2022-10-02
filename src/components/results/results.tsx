import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getResultsFromLocalStorage, removeResultsFromLocalStorage } from '../../store/translator/translatorSlice'
import { ROUTES } from '../../constants';
import deleteBasket from '../../assets/images/delete-basket.svg';
import './results.scss';

function Results():JSX.Element {
  const dispatch = useAppDispatch();
  const { countAnswer } = useAppSelector(({ translator }) => translator);
  
  const removeResults = () => dispatch(removeResultsFromLocalStorage());
  
  useEffect(() => {
    dispatch(getResultsFromLocalStorage());
  }, []);
  
  return (
    <ul className="results">
      {countAnswer.length ?
        <>
          <button className="reset-btn" onClick={removeResults}>
            <img className="reset-btn__icon" src={deleteBasket} alt='Delete button'/>
          </button>
          {countAnswer.map((testResult, index) => (
            <li className='results__item' key={index}>{testResult}</li>
          ))}
        </>
      :
        (<NavLink to={ROUTES.Test}>Поки результатів немає, пройди тест.</NavLink>)}
    </ul>
  );
}

export default Results;
