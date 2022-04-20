import { useState } from "react";

const NewTaskForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputValue, () => setInputValue(""));
  };

  return (
    <>
      <form className="todolist-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todolist-form_input"
          placeholder="Введите текст задачи"
          onChange={handleInputChange}
        />
        <button type="submit" className="todolist-form_submit">
          Добавить
        </button>
      </form>
    </>
  );
};

export default NewTaskForm;
