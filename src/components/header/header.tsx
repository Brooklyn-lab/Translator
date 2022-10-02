import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAppDispatch } from '../../store/store';
import userPhoto from "../../assets/images/user-photo.jpg";
import "./header.scss";
import { increment } from '../../store/translator/translatorSlice'

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  
  return (
    <header className="header">
      <div className="container header__container">
        <div  className="logo">
          <p className="logo__image">Brаnd</p>
        </div>
        <nav className="nav">
          <ul className="nav__body">
            <li className="nav__item">
              <NavLink className="nav__link" to={ROUTES.Home}>
                Домашня сторінка
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to={ROUTES.NewWords}>
                Додати слова
              </NavLink>
            </li>
            <li className="nav__item" onClick={() => dispatch(increment())}>
              <NavLink className="nav__link" to={ROUTES.Test}>
                Пройти тест
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to={ROUTES.Results}>
                Результати
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user">
          <div className="user__photo">
            <img className="user__photo-img" src={userPhoto} alt="User photo" />
          </div>
          <p>Тарас Григорьевич Шевченко</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
