import { useEffect } from "react";

import Button from "./Button";
import { backend_url } from "../assets/constants";

export default function ListWorkBoards({
  handleAddWorkBoardButton,
  workBoards,
  handleSelectWorkBoard,
  selectedWorkBoardId,
  handleSetWorkBoards,
  handleAddWorkBoardModalOpen,
}) {
  useEffect(() => {
    async function fetchWorkBoards() {
      const response = await fetch(`${backend_url}/api/taskboards`, {
        method: "GET",
        headers: { Authorization: "Basic " + btoa("admin:admin") },
      });
      const resData = await response.json();
      handleSetWorkBoards(resData);
    }
    fetchWorkBoards();
  }, []);

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleAddWorkBoardButton}
        className="bg-white text-gray-500 border-gray-500 border-2 p-12 ml-6 mr-2 rounded-xl h-12 w-12 flex items-center justify-center hover:bg-gray-200"
      >
        <span className="text-2xl">+</span>
      </Button>

      {workBoards.map((eachWorkBoard) => {
        let cssClasses =
          " p-12 mx-2 rounded-xl h-12 w-12 border-gray-500 border-2 flex items-center justify-center hover:text-stone-200 hover:bg-stone-800";
        if (eachWorkBoard.id === selectedWorkBoardId) {
          cssClasses += " bg-stone-800 text-stone-200";
        } else {
          cssClasses += "  text-gray-700";
        }

        return (
          <div key={eachWorkBoard.id}>
            <button
              onClick={() => handleSelectWorkBoard(eachWorkBoard.id)}
              className={cssClasses}
            >
              <span className="text-2xl">{eachWorkBoard.title}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
