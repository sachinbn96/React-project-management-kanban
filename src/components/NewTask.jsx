import { useState, useRef } from "react";

import Modal from "./Modal";

export default function NewTask({ handleAddTask }) {
  const modal = useRef();
  // const [taskData, setTaskData] = useState({
  //   title: "",
  //   description: "",
  //   status: "TODO",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setTaskData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  function handleSubmit(e) {
    e.preventDefault();
    // if (enteredTask.trim() === "") {
    //   modal.current.open();
    //   return;
    // }
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    // console.log(data);
    handleAddTask(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
      </Modal>
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            type="text"
            id="title"
            name="title"
            // onChange={handleChange}
            // value={taskData.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            id="description"
            name="description"
            // value={taskData.description}
            // onChange={handleChange}
            required={false}
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            id="status"
            name="status"
            // value={taskData.status}
            // onChange={handleChange}
          >
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>
      <button type="submit" className="text-stone-700 hover:text-stone-950">
        Add Task
      </button>
    </form>
  );
}
