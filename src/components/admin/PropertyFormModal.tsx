"use client";

import { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import { LOCATIONS } from "@/lib/constants";

interface FormState {
  title: string;
  price: string;
  location: string;
  type: "buy" | "rent";
  propertyType: "apartment" | "villa" | "commercial" | "studio";
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  featured: boolean;
  images: string[];
  amenities: string[];
  furnishing: "furnished" | "unfurnished" | "semi-furnished";
  yearBuilt: string;
  referenceNumber: string;
  status: "available" | "sold" | "rented" | "under-offer";
}

const BEDROOM_OPTIONS = [
  { value: "0", label: "Studio" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedroom" },
  { value: "3", label: "3 Bedroom" },
  { value: "4", label: "4 Bedroom" },
  { value: "5", label: "5+ Bedroom" },
];

export const INITIAL_FORM: FormState = {
  title: "",
  price: "",
  location: "",
  type: "rent",
  propertyType: "apartment",
  bedrooms: "0",
  bathrooms: "0",
  area: "0",
  description: "",
  featured: false,
  images: ["", "", "", "", "", ""],
  amenities: [""],
  furnishing: "unfurnished",
  yearBuilt: "",
  referenceNumber: "",
  status: "available",
};

const FURNISHING_OPTIONS = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "furnished", label: "Furnished" },
];

const STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "under-offer", label: "Under Offer" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
];

interface Props {
  show: boolean;
  editingId: string | null;
  form: FormState;
  onClose: () => void;
  onFormChange: (form: FormState) => void;
  onSubmit: (e: FormEvent) => void;
  uploading: number | null;
  onFileUpload: (index: number, file: File) => void;
}

export function PropertyFormModal({
  show,
  editingId,
  form,
  onClose,
  onFormChange,
  onSubmit,
  uploading,
  onFileUpload,
}: Props) {
  const setForm = onFormChange;

  const addImageField = () => {
    if (form.images.length >= 6) return;
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index: number) => {
    const updated = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updated.length === 0 ? [""] : updated });
  };

  const updateImageField = (index: number, value: string) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const addAmenityField = () => {
    setForm({ ...form, amenities: [...form.amenities, ""] });
  };

  const removeAmenityField = (index: number) => {
    const updated = form.amenities.filter((_, i) => i !== index);
    setForm({ ...form, amenities: updated.length === 0 ? [""] : updated });
  };

  const updateAmenityField = (index: number, value: string) => {
    const updated = [...form.amenities];
    updated[index] = value;
    setForm({ ...form, amenities: updated });
  };

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
            className="w-full max-w-3xl bg-card border border-card-border rounded-sm p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-white">
                {editingId ? "Edit Property" : "Add Property"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    placeholder="e.g. Luxury Villa with Pool"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    placeholder="40000"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Location *
                  </label>
                  <select
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="">Select location...</option>
                    {LOCATIONS.filter((l) => l.value !== "all").map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Listing Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as "buy" | "rent",
                      })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="rent">For Rent</option>
                    <option value="buy">For Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => {
                      const val = e.target.value as
                        | "apartment"
                        | "villa"
                        | "commercial"
                        | "studio";
                      setForm({
                        ...form,
                        propertyType: val,
                        bedrooms: val === "studio" ? "0" : form.bedrooms,
                      });
                    }}
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="studio">Studio</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {form.propertyType !== "studio" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      Bedrooms
                    </label>
                    <select
                      value={form.bedrooms}
                      onChange={(e) =>
                        setForm({ ...form, bedrooms: e.target.value })
                      }
                      className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    >
                      {BEDROOM_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {form.propertyType === "studio" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      Bedrooms
                    </label>
                    <div className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-gray-500 text-sm">
                      Studio (0 bedrooms)
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={form.bathrooms}
                    onChange={(e) =>
                      setForm({ ...form, bathrooms: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Area (sqft)
                  </label>
                  <input
                    type="number"
                    value={form.area}
                    onChange={(e) =>
                      setForm({ ...form, area: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Furnishing
                  </label>
                  <select
                    value={form.furnishing}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        furnishing: e.target.value as
                          | "furnished"
                          | "unfurnished"
                          | "semi-furnished",
                      })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  >
                    {FURNISHING_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as
                          | "available"
                          | "sold"
                          | "rented"
                          | "under-offer",
                      })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Year Built
                  </label>
                  <input
                    type="number"
                    value={form.yearBuilt}
                    onChange={(e) =>
                      setForm({ ...form, yearBuilt: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    placeholder="e.g. 2010"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    value={form.referenceNumber}
                    onChange={(e) =>
                      setForm({ ...form, referenceNumber: e.target.value })
                    }
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                    placeholder="e.g. SKY-ST-001"
                  />
                </div>
              </div>

              <div className="border-t border-card-border pt-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm text-gray-400">
                    Images
                  </label>
                  <div className="flex items-center gap-2">
                    {form.images.length < 6 && (
                      <button
                        type="button"
                        onClick={addImageField}
                        className="flex items-center gap-1 text-xs text-gold hover:text-gold-light"
                      >
                        <FiPlus className="w-3 h-3" />
                        Add Image URL
                      </button>
                    )}
                    <span className="text-xs text-gray-600">
                      {form.images.filter(Boolean).length}/6 images
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {form.images.map((url, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) =>
                              updateImageField(i, e.target.value)
                            }
                            className="flex-1 bg-black border border-card-border rounded-sm px-3 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
                            placeholder="/images/example.webp"
                          />
                          <label className="shrink-0 cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading === i}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onFileUpload(i, file);
                                e.target.value = "";
                              }}
                            />
                            <span className="flex items-center gap-1 px-3 py-2 text-xs text-gold border border-gold/30 rounded-sm hover:bg-gold/10 transition-colors">
                              {uploading === i ? (
                                <span className="w-3 h-3 border border-gold border-t-transparent rounded-full animate-spin" />
                              ) : (
                                "Browse"
                              )}
                            </span>
                          </label>
                          {form.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(i)}
                              className="p-2 text-gray-500 hover:text-red-400"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {url && (
                          <div className="mt-2 w-full h-20 rounded-sm overflow-hidden bg-black/50">
                            <div
                              className="w-full h-full bg-cover bg-center"
                              style={{
                                backgroundImage: `url("${url}")`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Type a URL path or click <strong>Browse</strong> to upload
                  an image from your computer.
                </p>
              </div>

              <div className="border-t border-card-border pt-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm text-gray-400">
                    Amenities
                  </label>
                  <button
                    type="button"
                    onClick={addAmenityField}
                    className="flex items-center gap-1 text-xs text-gold hover:text-gold-light"
                  >
                    <FiPlus className="w-3 h-3" />
                    Add Amenity
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {form.amenities.map((amenity, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={amenity}
                        onChange={(e) => updateAmenityField(i, e.target.value)}
                        className="flex-1 bg-black border border-card-border rounded-sm px-3 py-2 text-white text-sm focus:outline-none focus:border-gold/50"
                        placeholder="e.g. Swimming Pool"
                      />
                      {form.amenities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAmenityField(i)}
                          className="p-1 text-gray-500 hover:text-red-400"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-card-border pt-5">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-black border border-card-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 resize-none"
                    placeholder="Describe the property..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 py-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="w-4 h-4 accent-gold"
                  />
                  <span className="text-sm text-gray-300">
                    Mark as Featured Property
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-2 border-t border-card-border">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
                >
                  {editingId ? "Update Property" : "Add Property"}
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
