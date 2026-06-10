"use client";

import { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface TestimonialFormState {
  name: string;
  role: string;
  rating: string;
  text: string;
}

interface Props {
  show: boolean;
  editingId: string | null;
  form: TestimonialFormState;
  onClose: () => void;
  onFormChange: (form: TestimonialFormState) => void;
  onSubmit: (e: FormEvent) => void;
}

export function TestimonialFormModal({
  show,
  editingId,
  form,
  onClose,
  onFormChange,
  onSubmit,
}: Props) {
  const setForm = onFormChange;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 pb-10 px-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full max-w-xl bg-card border border-card-border rounded-sm p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-white">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  placeholder="e.g. Home Buyer, Property Investor"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: e.target.value })
                  }
                  className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Testimonial Text *
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) =>
                    setForm({ ...form, text: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 resize-none"
                  placeholder="What the client says..."
                />
              </div>

              <div className="flex gap-3 pt-2 border-t border-card-border">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
                >
                  {editingId ? "Update Testimonial" : "Add Testimonial"}
                </motion.button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-card-border text-gray-400 rounded-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
