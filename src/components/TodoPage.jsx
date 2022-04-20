import { useEffect, useState, useContext } from "react";
import { getProjects } from "../utils/todoist-api";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import TasksList from "./TasksList";
import { UserContext } from "../utils/UserContext";

const TodoPage = ({ onSignout }) => {
  const user = useContext(UserContext);

  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const match = useRouteMatch("/projects/:projectId");
  const projectId = match?.params?.projectId;

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(projects);
        history.replace({
          pathname: `/projects/${projects[0].id}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  return (
    <UserContext.Provider value={user}>
      {/* Пример замечания:
        Можно лучше: Данная обертка является лишней. Советую обратиться к 
        документации для изучения примеров использования фрагментов: 
        https://ru.reactjs.org/docs/fragments.html
      */}
      <>
        <div className="page">
          <Header email="email" onSignout={onSignout} />
          <section className="todolist">
            <div className="projects">
              <p className="projects__title">Проекты: </p>
              <div className="projects__list">
                {projects.map((project) => {
                  return (
                    <NavLink
                      /* Пример замечания:
                        Отлично: использование id в качестве ключа в листе - верный подход!
                      */
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="projects__project"
                      activeClassName="projects__project_active"
                    >
                      {project.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            {projectId && <TasksList projectId={projectId} />}
          </section>
        </div>
      </>
    </UserContext.Provider>
  );
};

export default TodoPage;
