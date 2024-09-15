import { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";

export default function NewTask({ handleAddTask }) {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  function handleAddTaskModalOpen() {
    setNewTaskModalOpen(true);
  }

  function handleAddTaskModalClose() {
    setNewTaskModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    handleAddTaskModalClose();
    handleAddTask(data);
  }
  return (
    <>
      {newTaskModalOpen && (
        <Modal showModal={newTaskModalOpen} onClose={handleAddTaskModalClose}>
          <form className="p-4 " onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add New Task
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="title"
                  name="title"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="description"
                  name="description"
                  required={false}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="status"
                >
                  Status:
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="status"
                  name="status"
                >
                  <option value="TODO">To do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Task
              </button>
              <button
                onClick={handleAddTaskModalClose}
                className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Button
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={handleAddTaskModalOpen}
      >
        Add Task
      </Button>
    </>
  );
}
