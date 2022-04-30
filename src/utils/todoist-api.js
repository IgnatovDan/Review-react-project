
const todoistApiConfig = {
  baseUrl: 'https://api.todoist.com/rest/v1',
  /*
  Токен доступа 'Bearer 793d9154e5507916cddbc96268c87fd082c634c6' опубликован в исходниках и передается на клиент.
  Это позволяет получить доступ к данным без логина в приложение.
  Нужно исправить: добавить свой сервер, который будет получать запросы от браузера, делать из них запросы на api.todoist.com
  и хранить этот токен только на сервере в защищенном хранилище.
  */
  headers: {
    'Authorization': 'Bearer 793d9154e5507916cddbc96268c87fd082c634c6',
    'Content-Type': 'application/json'
  }
}

/*
getResponse объявлена в файлах auth-api.js и todoist-api.js
Можно лучше: вынести дублирующийся код в общий файл
*/
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

export const getProjects = () => {
  return fetch(`${todoistApiConfig.baseUrl}/projects`, {
    headers: todoistApiConfig.headers
  }).then(getResponse)
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
}

export const getProjectTasks = (projectId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks?project_id=${projectId}`, {
    headers: todoistApiConfig.headers
  }).then(getResponse)
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
}

export const addTask = (taskText, projectId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks`, {
    method: 'POST',
    headers: todoistApiConfig.headers,
    body: JSON.stringify({
      content: taskText,
      project_id: projectId
    })
  }).then(getResponse)
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
}

export const deleteTask = (taskId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: todoistApiConfig.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`ошибка ${res.status}`);
  })
  .catch((err) => {
    /*
    Такой код выведет ошибку в консоль браузера и сделает вызов функции "успешным".
    Необходимо изменить: возвращать результат "произошла ошибка" и добавить его обработку в вызывающий код.
    Например, можно удалить catch из этого метода и использовать его только в вызывающем коде.
    */
    console.log(err);
  });
}
