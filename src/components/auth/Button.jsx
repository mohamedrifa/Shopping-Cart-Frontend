export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-linear-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
    >
      {text}
    </button>
  );
}
