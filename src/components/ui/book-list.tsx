import type { Book } from "@/types/book";

interface BookListProps {
  books: Book[];
  onUpdate: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookList({ books, onUpdate, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12 bg-white rounded-lg border border-slate-200">
        No books yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                {book.name}
              </h2>
              <p className="text-slate-600">{book.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onUpdate(book)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(book)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
