"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiStar,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { Property, Testimonial } from "@/lib/types";
import {
  loadProperties,
  saveProperties,
  DEFAULT_PROPERTIES,
} from "@/lib/properties";
import {
  loadTestimonials,
  saveTestimonials,
} from "@/lib/testimonials";
import { PropertyFormModal, INITIAL_FORM } from "@/components/admin/PropertyFormModal";
import { TestimonialFormModal } from "@/components/admin/TestimonialFormModal";

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

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [properties, setProperties] = useState<Property[]>(() => loadProperties());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [filterType, setFilterType] = useState<"all" | "buy" | "rent">("all");
  const [tab, setTab] = useState<"properties" | "testimonials">("properties");

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadTestimonials());
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", rating: "5", text: "" });

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: "", role: "", rating: "5", text: "" });
    setEditingTestimonialId(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("admin_token");
          router.push("/admin/login");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
  };

  const openEdit = (property: Property) => {
    const padImages = (arr: string[]) => {
      const padded = [...arr];
      while (padded.length < 6) padded.push("");
      return padded.slice(0, 6);
    };
    setForm({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      type: property.type,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description,
      featured: property.featured,
      images: property.images.length > 0 ? padImages(property.images) : ["", "", "", "", "", ""],
      amenities:
        property.amenities && property.amenities.length > 0
          ? property.amenities
          : [""],
      furnishing: property.furnishing || "unfurnished",
      yearBuilt: property.yearBuilt?.toString() || "",
      referenceNumber: property.referenceNumber || "",
      status: property.status || "available",
    });
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location) {
      toast.error("Please fill in required fields");
      return;
    }

    const propertyData = {
      title: form.title,
      price: Number(form.price),
      location: form.location,
      type: form.type,
      propertyType: form.propertyType,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      description: form.description,
      featured: form.featured,
      images: form.images.filter(Boolean),
      amenities: form.amenities.filter(Boolean),
      furnishing: form.furnishing,
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
      referenceNumber: form.referenceNumber || undefined,
      status: form.status,
    };

    let updatedProperties: Property[];

    if (editingId) {
      updatedProperties = properties.map((p) =>
        p.id === editingId ? { ...p, ...propertyData } : p
      );
      toast.success("Property updated!");
    } else {
      const newProperty: Property = {
        id: Date.now().toString(),
        ...propertyData,
        createdAt: Date.now(),
      };
      updatedProperties = [newProperty, ...properties];
      toast.success("Property added!");
    }

    setProperties(updatedProperties);
    saveProperties(updatedProperties);
    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const updated = properties.filter((p) => p.id !== id);
      setProperties(updated);
      saveProperties(updated);
      toast.success("Property deleted");
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Reset all properties to defaults? This will delete all your changes."
      )
    ) {
      const defaults = [...DEFAULT_PROPERTIES];
      setProperties(defaults);
      saveProperties(defaults);
      toast.success("Reset to default properties");
    }
  };

  const [uploading, setUploading] = useState<number | null>(null);

  const handleFileUpload = async (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setUploading(index);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const updated = [...form.images];
      updated[index] = data.url;
      setForm({ ...form, images: updated });
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(null);
    }
  };

  const handleTestimonialSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.text) {
      toast.error("Name and testimonial text are required");
      return;
    }
    const data = {
      name: testimonialForm.name,
      role: testimonialForm.role,
      rating: Number(testimonialForm.rating),
      text: testimonialForm.text,
    };
    let updated: Testimonial[];
    if (editingTestimonialId) {
      updated = testimonials.map((t) =>
        t.id === editingTestimonialId ? { ...t, ...data } : t
      );
      toast.success("Testimonial updated!");
    } else {
      updated = [{ id: Date.now().toString(), ...data }, ...testimonials];
      toast.success("Testimonial added!");
    }
    setTestimonials(updated);
    saveTestimonials(updated);
    resetTestimonialForm();
    setShowTestimonialForm(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm("Delete this testimonial?")) {
      const updated = testimonials.filter((t) => t.id !== id);
      setTestimonials(updated);
      saveTestimonials(updated);
      toast.success("Testimonial deleted");
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price);

  const filteredProperties = properties.filter(
    (p) => filterType === "all" || p.type === filterType
  );

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="text-black font-bold text-xs">S</span>
            </div>
            <span className="font-heading text-lg font-bold text-white">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              Property Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {properties.length} properties total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-2 px-4 py-2.5 border border-card-border text-gray-400 rounded-sm hover:text-white hover:border-gray-500 transition-colors text-sm"
            >
              <FiRefreshCw className="w-4 h-4" />
              Reset Defaults
            </button>
            <motion.button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors text-sm"
            >
              <FiPlus className="w-4 h-4" />
              Add Property
            </motion.button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("properties")}
            className={`px-5 py-2.5 text-sm rounded-sm transition-colors ${
              tab === "properties"
                ? "bg-gold text-black font-semibold"
                : "bg-card border border-card-border text-gray-400 hover:text-white"
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setTab("testimonials")}
            className={`px-5 py-2.5 text-sm rounded-sm transition-colors ${
              tab === "testimonials"
                ? "bg-gold text-black font-semibold"
                : "bg-card border border-card-border text-gray-400 hover:text-white"
            }`}
          >
            Testimonials
          </button>
        </div>

        {tab === "properties" && (
          <>
            <div className="flex gap-2 mb-6">
              {(["all", "rent", "buy"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                    filterType === t
                      ? "bg-gold text-black font-semibold"
                      : "bg-card border border-card-border text-gray-400 hover:text-white"
                  }`}
                >
                  {t === "all" ? "All" : t === "rent" ? "For Rent" : "For Sale"}
                </button>
              ))}
            </div>

            <div className="bg-card border border-card-border rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-right px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((property) => (
                      <tr
                        key={property.id}
                        className="border-b border-card-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-9 rounded-sm bg-cover bg-center shrink-0"
                              style={{
                                backgroundImage: `url("${property.images[0] || ""}")`,
                              }}
                            />
                            <span className="text-white text-sm font-medium truncate max-w-[200px]">
                              {property.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-sm max-w-[200px] truncate">
                          {property.location}
                        </td>
                        <td className="px-5 py-4 text-gold text-sm font-medium">
                          {formatPrice(property.price)}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-sm ${
                              property.type === "buy"
                                ? "bg-gold/20 text-gold"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {property.type === "buy" ? "Sale" : "Rent"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {property.featured && (
                              <span className="flex items-center gap-1 text-xs text-red-400">
                                <FiStar className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                            {property.status && property.status !== "available" && (
                              <span className="text-xs text-yellow-400 capitalize">
                                {property.status.replace("-", " ")}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(property)}
                              className="p-2 text-gray-400 hover:text-gold transition-colors"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(property.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProperties.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-500">
                          No properties found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "testimonials" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-white">
                Testimonials
              </h2>
              <motion.button
                onClick={() => {
                  resetTestimonialForm();
                  setShowTestimonialForm(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors text-sm"
              >
                <FiPlus className="w-4 h-4" />
                Add Testimonial
              </motion.button>
            </div>

            <div className="bg-card border border-card-border rounded-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Text</th>
                    <th className="text-right px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t.id} className="border-b border-card-border last:border-b-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-white text-sm font-medium">{t.name}</td>
                      <td className="px-5 py-4 text-gray-400 text-sm">{t.role}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-xs ${i < t.rating ? "text-gold" : "text-gray-700"}`}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-sm max-w-[300px] truncate">{t.text}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setTestimonialForm({ name: t.name, role: t.role, rating: t.rating.toString(), text: t.text });
                              setEditingTestimonialId(t.id);
                              setShowTestimonialForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-gold transition-colors"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500">No testimonials yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <PropertyFormModal
          show={showForm}
          editingId={editingId}
          form={form}
          onClose={() => { resetForm(); setShowForm(false); }}
          onFormChange={setForm}
          onSubmit={handleSubmit}
          uploading={uploading}
          onFileUpload={handleFileUpload}
        />

        <TestimonialFormModal
          show={showTestimonialForm}
          editingId={editingTestimonialId}
          form={testimonialForm}
          onClose={() => { resetTestimonialForm(); setShowTestimonialForm(false); }}
          onFormChange={setTestimonialForm}
          onSubmit={handleTestimonialSubmit}
        />
      </div>
    </div>
  );
}
