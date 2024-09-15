export default function NoProjectSelected({ handleAddProjectButton }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No WorkBoard Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a work board or get started with a new one
      </p>
    </div>
  );
}
