import { Switch, Route, useHistory, Redirect } from "react-router";
import { useEffect, useState } from "react";

import TodoPage from "./TodoPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { login, register, checkToken } from "../utils/auth-api";
import { UserContext } from "../utils/UserContext";

const App = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(null);

  const onLogin = (data) => {
    /*
    Сейчас функция для "then" будет выполняться всегда, и при успешном логине, и при ошибке.
    Нужно исправить: добавить обработку ошибки при логине.
    */
    login(data)
      .then(() => {
        setUserData({ email: data.email });
        history.push("/projects");
      })
  };

  const onRegister = (data) => {
    /*
    Сейчас функция для "then" будет выполняться всегда, и при успешной регистрации, и при ошибке.
    Нужно исправить: добавить обработку ошибки при регистрации.
    */
    register(data)
      .then(() => {
        history.push("/projects");
      })
  };

  const onSignout = () => {
    setUserData(null);
    localStorage.removeItem("jwt")
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((user) => {
          setUserData(user);
          history.push("/projects");
        })
    }
    /*
    Логика выполнения кода зависит от значения jwt,
    но хук будет вызываться только при изменении значения history.
    Нужно исправить: перечислить использованные переменные в списке зависимостей или изменить алгоритм
    и не использовать их в обработчике хука.
    */
  }, [history]);

  /*
  Отлично: используется Context для передачи значений на глубокие уровни компонентов
  */
  /*
  Сделаны разные имена для элементов логина: "signin", "LoginPage", "onLogin"
  Можно лучше: использовать одинаковые названия для path/component/event/callback
  */
  return (
    <UserContext.Provider value={userData}>
      <Switch>
        <Route path="/signin">
          <LoginPage onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <RegisterPage onRegister={onRegister} />
        </Route>
        <ProtectedRoute path="/projects">
          <TodoPage onSignout={onSignout}/>
        </ProtectedRoute>
        <Route path="*">
          {userData ? <Redirect to="/projects" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;
