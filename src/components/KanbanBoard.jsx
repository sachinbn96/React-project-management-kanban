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

  //   console.log(toDoList);

  function handleDragEnd(dragResult) {
    // console.log(dragResult);
    // update state
    // api call to update in backend
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {/* to do */}
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              key="todo"
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
        <Droppable droppableId="in_progress">
          {(provided) => (
            <div
              key="in_progress"
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

        {/* completed */}
        <Droppable droppableId="completed">
          {(provided) => (
            <div
              key="completed"
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
