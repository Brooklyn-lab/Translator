import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch } from "../../store/store";
import { addNewWords, addWordsListToLocalStorage, getWordsListFromLocalStorage } from '../../store/translator/translatorSlice'
import "./form.scss";

function Form(): JSX.Element {
  const dispatch = useAppDispatch();
  const [word, setWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getWordsListFromLocalStorage());
  }, []);
  
  function handleSubmit(evt: FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    if (word !== "" && translation !== "") {
      dispatch(addNewWords({
        en: word,
        uk: translation,
      }));
      dispatch(addWordsListToLocalStorage());
      setIsValid(false);
      setWord("");
      setTranslation("");
    } else {
      setIsValid(true);
    }
  }

  function getWordValue(evt: ChangeEvent<HTMLInputElement>) {
    setWord(evt.target.value);
  }

  function getTranslationValue(evt: ChangeEvent<HTMLInputElement>) {
    setTranslation(evt.target.value);
  }

  return (
    <form className="form">
      <div className="form__wrapper">
        <input
          className="form__layout form__input"
          onChange={getWordValue}
          value={word}
          type="text"
          name="word"
          placeholder="Слово"
          required
        />
        <input
          className="form__layout form__input"
          onChange={getTranslationValue}
          value={translation}
          type="text"
          name="word-translation"
          placeholder="Переклад"
          required
        />
        {isValid ? (<p className="invalid-text">Заповни обидва поля</p>) : ""}
      </div>
      <button className="form__layout form__btn button" onClick={handleSubmit}>
        Додати нове слово
      </button>
    </form>
  );
}

export default Form;
