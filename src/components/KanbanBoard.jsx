import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";

export default function KanbanBoard({ taskList }) {
  const [toDoList, setToDoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    setToDoList(taskList.filter((task) => task.status === "TODO"));
    setInProgressList(taskList.filter((task) => task.status === "IN_PROGRESS"));
    setCompletedList(taskList.filter((task) => task.status === "DONE"));
  }, [taskList]);

  function handleDragEnd(dragResult) {
    // update state
    // reorder if same column
    if (dragResult.source.droppableId === dragResult.destination.droppableId) {
      if (dragResult.source.droppableId === "TODO") {
        setToDoList((prev) => {
          const [reorderedItem] = prev.splice(dragResult.source.index, 1);
          prev.splice(dragResult.destination.index, 0, reorderedItem);
          return prev;
        });
      } else if (dragResult.source.droppableId === "IN_PROGRESS") {
        setInProgressList((prev) => {
          const [reorderedItem] = prev.splice(dragResult.source.index, 1);
          prev.splice(dragResult.destination.index, 0, reorderedItem);
          return prev;
        });
      } else if (dragResult.source.droppableId === "DONE") {
        setCompletedList((prev) => {
          const [reorderedItem] = prev.splice(dragResult.source.index, 1);
          prev.splice(dragResult.destination.index, 0, reorderedItem);
          return prev;
        });
      }
    }
    // dropping to different column
    else {
      switch (dragResult.destination.droppableId) {
        case "IN_PROGRESS":
          if (dragResult.source.droppableId === "TODO") {
            let reorderedItem;
            setToDoList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setInProgressList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          if (dragResult.source.droppableId === "DONE") {
            let reorderedItem;
            setCompletedList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setInProgressList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          break;
        case "DONE":
          if (dragResult.source.droppableId === "TODO") {
            let reorderedItem;
            setToDoList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setCompletedList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          if (dragResult.source.droppableId === "IN_PROGRESS") {
            let reorderedItem;
            setInProgressList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setCompletedList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          break;
        case "TODO":
          if (dragResult.source.droppableId === "IN_PROGRESS") {
            let reorderedItem;
            setInProgressList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setToDoList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          if (dragResult.source.droppableId === "DONE") {
            let reorderedItem;
            setCompletedList((prev) => {
              [reorderedItem] = prev.splice(dragResult.source.index, 1);
              return prev;
            });
            setToDoList((prev) => {
              prev.splice(dragResult.destination.index, 0, reorderedItem);
              return prev;
            });
          }
          break;
      }
    }

    // api call to update in backend
    const draggedTask = taskList.find(
      (elem) => elem.id === +dragResult.draggableId
    );
    draggedTask.status = dragResult.destination.droppableId;
    fetch(`http://localhost:8000/api/tasks/${draggedTask.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify(draggedTask),
    });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* to do */}
        <Droppable droppableId="TODO">
          {(provided) => (
            <div
              key="TODO"
              className="bg-gray-200 rounded-lg p-4 shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-xl font-semibold text-center bg-blue-500 text-white p-2 rounded">
                To do's
              </h2>
              {toDoList.map((taskItem, index) => {
                return (
                  <TaskCard key={taskItem.id} task={taskItem} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* in progress */}
        <Droppable droppableId="IN_PROGRESS">
          {(provided) => (
            <div
              key="IN_PROGRESS"
              className="bg-gray-200 rounded-lg p-4 shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-xl font-semibold text-center bg-yellow-500 text-white p-2 rounded">
                In Progress
              </h2>
              {inProgressList.map((taskItem, index) => {
                return (
                  <TaskCard key={taskItem.id} task={taskItem} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* DONE */}
        <Droppable droppableId="DONE">
          {(provided) => (
            <div
              key="DONE"
              className="bg-gray-200 rounded-lg p-4 shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-xl font-semibold text-center bg-green-500 text-white p-2 rounded">
                Completed
              </h2>
              {completedList.map((taskItem, index) => {
                return (
                  <TaskCard key={taskItem.id} task={taskItem} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
