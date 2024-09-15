import Tasks from "./Tasks";

export default function SelectedWorkBoard({
  project,
  handleDeleteWorkBoard,
  handleDeleteTask,
  handleAddTask,
  tasks,
  handleSetTasks,
}) {
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            {project.title}
          </h1>
          <button
            onClick={() => handleDeleteWorkBoard()}
            className="px-4 py-2 bg-red-700 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Delete
          </button>
        </div>
        <p className="text-gray-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
        tasks={tasks}
        handleSetTasks={handleSetTasks}
        projectId={project.id}
      ></Tasks>
    </div>
  );
}
