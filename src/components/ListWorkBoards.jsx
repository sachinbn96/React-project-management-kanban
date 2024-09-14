import { useEffect } from "react";
import Button from "./Button";

export default function ListWorkBoards({
  handleAddWorkBoardButton,
  workBoards,
  handleSelectWorkBoard,
  selectedWorkBoardId,
  handleSetWorkBoards,
}) {
  useEffect(() => {
    async function fetchWorkBoards() {
      const response = await fetch("http://localhost:8000/api/taskboards", {
        method: "GET",
        headers: { Authorization: "Basic " + btoa("admin:admin") },
      });
      // const response = await fetch("http://localhost/api/taskboards");
      const resData = await response.json();
      // console.log(resData);
      handleSetWorkBoards(resData);
    }
    fetchWorkBoards();
  }, []);

  return (
    <div className="flex">
      {/* // <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl"> */}

      <Button
        onClick={handleAddWorkBoardButton}
        className="bg-white text-gray-500 border-gray-500 border-2 p-12 mx-6 rounded-xl h-12 w-12 flex items-center justify-center hover:bg-gray-200"
      >
        <span className="text-2xl">+</span>
      </Button>

      {workBoards.map((eachWorkBoard) => {
        let cssClasses =
          "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
        if (eachWorkBoard.id === selectedWorkBoardId) {
          cssClasses += " bg-stone-800 text-stone-200";
        } else {
          cssClasses += "  text-stone-400";
        }

        return (
          <div key={eachWorkBoard.id}>
            <button
              onClick={() => handleSelectWorkBoard(eachWorkBoard.id)}
              className={cssClasses}
            >
              {eachWorkBoard.title}
            </button>
          </div>
        );
      })}
    </div>
  );
}
