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
        /*
        Тут прописан переход history.push("/projects"); хотя ТЗ требует переход "на страницу входа"
        Можно лучше: сделать переход в точности по описанию задания на страницу входа.
        */
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
      /*
      "checkToken(jwt)" выполняет асинхронный запрос на удаленный ресурс и пока запрос не окончен браузер
      покажет пользователю текущую страницу (обращение к удаленному ресурсу может потребовать 10-30 секунд),
      а после окончания запроса этот код перенаправит браузер на другую страницу.
      Нужно изменить: показывать визуальную индикацию и блокировать интерфейс на время выполнения любых запросов.
      См https://stackoverflow.com/questions/38670610/how-to-block-the-ui-for-a-long-running-javascript-loop
      */
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
  Отлично: вместо явной передачи через props используется Context для передачи значений на глубокие уровни компонентов
  */
  /*
  Сделаны разные имена для логически связанных элементов логина: 
  LoginPage/signin/auth-page, RegisterPage/signup/form-auth, TodoPage/projects
  Такие отличия в названиях названия затрудняют навигацию по коду
  Можно лучше: использовать одинаковые названия для элементов одной логической группы
  */
  /*
  Используется react-router v5, хотя сейчас уже вышел router v6, который упрощает кодирование некоторых ситуаций
  Можно лучше: использовать react-router v6
  См https://habr.com/ru/company/kts/blog/598835/
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
