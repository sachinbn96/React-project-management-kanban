import { useState } from "react";

import Header from "./components/Header";
import NewWorkBoard from "./components/NewWorkBoard";
import ListWorkBoards from "./components/ListWorkBoards";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedWorkBoard from "./components/SelectedWorkBoard";
import { backend_url } from "./assets/constants";

function App() {
  const [projectsState, setWorkBoardsState] = useState({
    addWorkBoardModalOpened: false,
    selectedWorkBoardId: undefined,
    projects: [],
    tasks: [],
  });
  const [newWorkBoardModalOpen, setNewWorkBoardModalOpen] = useState(false);

  function handleAddWorkBoardModalOpen() {
    setNewWorkBoardModalOpen(true);
  }

  function handleAddWorkBoardModalClose() {
    setNewWorkBoardModalOpen(false);
  }

  function handleAddTask(taskData) {
    taskData.task_board = projectsState.selectedWorkBoardId;
    fetch(`${backend_url}/api/tasks/`, {
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
    handleAddWorkBoardModalOpen();
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
    fetch(`${backend_url}/api/taskboards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
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
    // api call to delete in backend
    console.log(projectsState.selectedWorkBoardId);
    const { id: requiredId } = projectsState.projects.find(
      (elem) => elem.id == projectsState.selectedWorkBoardId
    );
    fetch(`${backend_url}/api/taskboards/${requiredId}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa("admin:admin"),
      },
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
      handleAddWorkBoardModalClose={handleAddWorkBoardModalClose}
      newWorkBoardModalOpen={newWorkBoardModalOpen}
    />
  ) : (
    <NoProjectSelected handleAddProjectButton={handleAddWorkBoardButton} />
  );
  return (
    <div className="flex justify-center">
      <main className="h-screen my-8 gap-8  justify-center">
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
    </div>
  );
}

export default App;
