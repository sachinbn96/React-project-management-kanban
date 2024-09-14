import { useEffect } from "react";
import NewTask from "./NewTask";
import KanbanBoard from "./kanbanBoard";

export default function Tasks({
  tasks,
  handleAddTask,
  handleDeleteTask,
  projectId,
  handleSetTasks,
}) {
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:8000/api/tasks", {
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
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">TASKS</h2>
        <NewTask handleAddTask={handleAddTask} />
        {
          tasks && tasks.length === 0 && (
            <p className="text-stone-800 my-4">
              This Project doesn't have any tasks.
            </p>
          )
          // <ul className="p-4 mt-8 rounded-md bg-stone-100">
          //   {tasks &&
          //     tasks
          //       .filter((task) => task.task_board === projectId)
          //       .map((task) => (
          //         <li key={task.id} className="flex justify-between my-4">
          //           <span>{task.title}</span>
          //           <button
          //             onClick={() => handleDeleteTask(task.taskId)}
          //             className="text-stone-700 hover:text-red-500"
          //           >
          //             Clear
          //           </button>
          //         </li>
          //       ))}
          // </ul>
          // )
        }
      </section>
      <KanbanBoard
        taskList={tasks.filter((task) => task.task_board === projectId)}
      />
    </>
  );
}
