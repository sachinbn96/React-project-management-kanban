import { useEffect } from "react";
import NewTask from "./NewTask";
import KanbanBoard from "./KanbanBoard";
import { backend_url } from "../assets/constants";

export default function Tasks({
  tasks,
  handleAddTask,
  handleDeleteTask,
  projectId,
  handleSetTasks,
}) {
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${backend_url}/api/tasks`, {
        method: "GET",
        headers: { Authorization: "Basic " + btoa("admin:admin") },
      });
      const resData = await response.json();
      handleSetTasks(resData);
    }
    fetchTasks();
  }, []);
  // console.log(tasks);
  return (
    <>
      <section className="flex justify-between">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">TASKS</h2>
        <NewTask handleAddTask={handleAddTask} />
      </section>
      <KanbanBoard
        taskList={tasks.filter((task) => task.task_board === projectId)}
      />
    </>
  );
}
