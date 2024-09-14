import { useState } from "react";

import NewWorkBoard from "./components/NewWorkBoard";
import SelectedWorkBoard from "./components/SelectedWorkBoard";
import ListWorkBoards from "./components/ListWorkBoards";
// import NoWorkBoardSelected from "./components/NoWorkBoardSelected";
import Header from "./components/Header";

function App() {
  const [projectsState, setWorkBoardsState] = useState({
    addWorkBoardModalOpened: false,
    selectedWorkBoardId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(taskData) {
    taskData.task_board = projectsState.selectedWorkBoardId;

    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkBoardsState((prev) => {
          const newTask = {
            ...taskData,
            id: data.id,
          };
          return {
            ...prev,
            tasks: [newTask, ...prev.tasks],
          };
        });
      });
  }

  function handleSetWorkBoards(value) {
    setWorkBoardsState((prev) => ({ ...prev, projects: value }));
  }

  function handleSetTasks(value) {
    setWorkBoardsState((prev) => ({ ...prev, tasks: value }));
  }

  function handleDeleteTask(id) {
    setWorkBoardsState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleAddWorkBoardButton() {
    setWorkBoardsState((prev) => {
      return {
        ...prev,
        selectedWorkBoardId: undefined,
        addWorkBoardModalOpened: true,
      };
    });
  }

  function handleCancelAddWorkBoard() {
    setWorkBoardsState((prev) => {
      return {
        ...prev,
        addWorkBoardModalOpened: false,
      };
    });
  }

  function handleSelectWorkBoard(id) {
    setWorkBoardsState((prev) => {
      return {
        ...prev,
        selectedWorkBoardId: id,
      };
    });
  }

  function handleSaveAddWorkBoard(projectData) {
    fetch("http://localhost:8000/api/taskboards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      // .then((data) => console.log(data));
      .then((data) => {
        setWorkBoardsState((prev) => {
          return {
            ...prev,
            selectedWorkBoardId: data.id,
            projects: [...prev.projects, data],
          };
        });
      });
  }

  function handleDeleteWorkBoard() {
    setWorkBoardsState((prev) => {
      return {
        addWorkBoardModalOpened: false,
        selectedWorkBoardId: undefined,
        projects: prev.projects.filter(
          (project) => project.id !== prev.selectedWorkBoardId
        ),
        tasks: prev.tasks.filter(
          (task) => task.projectId !== prev.selectedWorkBoardId
        ),
      };
    });
  }

  const selectedWorkBoard = projectsState.projects.find(
    (project) => project.id === projectsState.selectedWorkBoardId
  );
  const content = projectsState.selectedWorkBoardId ? (
    <SelectedWorkBoard
      project={selectedWorkBoard}
      handleDeleteWorkBoard={handleDeleteWorkBoard}
      handleAddTask={handleAddTask}
      handleDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
      handleSetTasks={handleSetTasks}
    />
  ) : projectsState.addWorkBoardModalOpened ? (
    <NewWorkBoard
      handleSaveAddWorkBoard={handleSaveAddWorkBoard}
      handleCancelAddWorkBoard={handleCancelAddWorkBoard}
    />
  ) : null;
  return (
    <main className="h-screen my-8 gap-8">
      <Header />
      <ListWorkBoards
        handleAddWorkBoardButton={handleAddWorkBoardButton}
        workBoards={projectsState.projects}
        handleSetWorkBoards={handleSetWorkBoards}
        handleSelectWorkBoard={handleSelectWorkBoard}
        selectedWorkBoardId={projectsState.selectedWorkBoardId}
      />
      {content}
    </main>
  );
}

export default App;
