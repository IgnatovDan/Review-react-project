import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFromData] = useState({});

  const handleChange = (evt) => {
    setFromData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="auth-page">
      <form className="form-auth" onSubmit={handleSubmit}>
        <h1 className="form-auth__header">Вход</h1>
        <input
          name="email"
          /* Пример замечания:
            Надо исправить: Для полей ввода, предназначенных для email следует использовать 
            соответствующий тип: type="email". О других типах инпута вы можете почитать 
            здесь: https://developer.mozilla.org/ru/docs/Web/HTML/Element/Input
           */
          type="text"
          className="form-auth_input"
          placeholder="Введите email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="text"
          className="form-auth_input"
          placeholder="Введите пароль"
          onChange={handleChange}
          minlength={6}
          maxlength={20}
          required
        />
        <button type="submit" className="todolist-form_submit">
          Войти
        </button>
        <p className="auth-page_link">
          Ещё не зарегистрированы?
          <a href="/signup">Регистрация</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
