import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const Header = ({ onSignout }) => {
  const user = useContext(UserContext);

  return (
    <header className="header">
      <h1 className="header__logo">Todo List</h1>
      <p className="header__user">{user?.email}</p>
      <p onClick={onSignout} className="header__signout">
        Выход
      </p>
    </header>
  );
};

export default Header;
