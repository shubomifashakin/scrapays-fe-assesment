import type { Book } from "../../../types/book";

interface DeleteBookModalProps {
  book: Book;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteBookModal({
  book,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteBookModalProps) {
  const handleConfirm = async () => {
    onConfirm(book.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Book</h2>
        <p className="text-slate-600 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{book.name}</span>? This action cannot
          be undone.
        </p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>

          <button
            disabled={isDeleting}
            onClick={handleConfirm}
            className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
