const Task = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <>
      <article className="todolist-item">
        <span className="todolist-item__text">{task.content}</span>
        <button className="todolist-item__del" onClick={handleDelete}></button>
      </article>
    </>
  );
};

export default Task;
