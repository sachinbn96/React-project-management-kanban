import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index }) {
  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white mt-4 p-3 rounded-lg shadow hover:bg-gray-50 cursor-grab"
        >
          <h1>{task.title}</h1>
          <p>{task.due_date}</p>
        </div>
      )}
    </Draggable>
  );
}
