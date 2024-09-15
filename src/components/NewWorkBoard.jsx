import Input from "./input";
import Modal from "./Modal";

export default function NewWorkBoard({
  handleSaveAddWorkBoard,
  handleCancelAddWorkBoard,
  handleAddWorkBoardModalClose,
  newWorkBoardModalOpen,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    handleAddWorkBoardModalClose();
    handleSaveAddWorkBoard({
      title: data.enteredTitle,
      description: data.enteredDesc,
    });
  }

  return (
    <>
      <Modal
        showModal={newWorkBoardModalOpen}
        onClose={handleAddWorkBoardModalClose}
      >
        <form className="p-4 " onSubmit={handleSubmit}>
          <div className="w-[35rem] mt-16">
            <div>
              <Input
                type="text"
                id="enteredTitle"
                name="enteredTitle"
                labelName="Title"
                required
              />
              <Input
                id="enteredDesc"
                name="enteredDesc"
                required={false}
                labelName="Description"
                isTextArea
              />
            </div>
            <menu className="flex items-center justify-end gap-4 my-4">
              <li>
                <button
                  onClick={handleCancelAddWorkBoard}
                  className="text-stone-800 hover:text-stone-950"
                >
                  Cancel
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                >
                  Save
                </button>
              </li>
            </menu>
          </div>
        </form>
      </Modal>
    </>
  );
}
