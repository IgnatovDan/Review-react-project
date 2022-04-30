const BASE_URL = 'https://auth.nomoreparties.co';

/*
getResponse объявлена в файлах auth-api.js и todoist-api.js
Можно лучше: вынести дублирующийся код в общий файл
*/
const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(getResponse)
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
};
export const login = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(getResponse)
  .then((data) => {
    localStorage.setItem('jwt', data.token)
    return data;
  })
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
}
