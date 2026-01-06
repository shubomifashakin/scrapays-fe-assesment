import type React from "react";

import { useState } from "react";

interface CreateBookModalProps {
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  isCreating: boolean;
}

export default function CreateBookModal({
  onClose,
  onSubmit,
  isCreating,
}: CreateBookModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSubmit(name, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Create New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Book Name
            </label>
            <input
              type="text"
              value={name}
              disabled={isCreating}
              placeholder="Enter book name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              disabled={isCreating}
              placeholder="Enter book description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {isCreating ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
