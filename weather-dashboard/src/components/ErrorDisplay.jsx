export default function ErrorDisplay({ message }) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
        <p>{message}</p>
      </div>
    );
  }