const tailWindClasses =
  "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function Input({ labelName, isTextArea, ...props }) {
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-gray-700">
        {labelName}
      </label>
      {isTextArea ? (
        <textarea className={tailWindClasses} {...props} />
      ) : (
        <input className={tailWindClasses} {...props} />
      )}
    </p>
  );
}
