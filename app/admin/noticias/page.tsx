"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, X, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MOCK_POSTS, CATEGORY_META, type Post, type Category } from "@/lib/posts";

const EMPTY_POST: Omit<Post, "id"> = {
  title: "",
  category: "historia",
  date: new Date().toISOString().split("T")[0],
  cover_url: "",
  excerpt: "",
  body: "",
  featured: false,
  published: false,
  author: "",
};

const inputCls = "w-full bg-white border border-gray-200 focus:border-[#C8197A] rounded-xl px-4 py-2.5 font-sans text-sm text-[#3D3D3D] outline-none transition-colors placeholder:text-gray-300";

export default function AdminNoticiasPage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  // TODO: reemplazar por fetch/insert a Supabase tabla `posts`

  const openNew = () => {
    setEditing({ id: crypto.randomUUID(), ...EMPTY_POST });
    setIsNew(true);
    setSaved(false);
  };

  const openEdit = (post: Post) => {
    setEditing({ ...post });
    setIsNew(false);
    setSaved(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setPosts((prev) => [editing, ...prev]);
    } else {
      setPosts((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
    }
    setSaved(true);
    setTimeout(() => {
      setEditing(null);
      setSaved(false);
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggle = (id: string, field: "published" | "featured") => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p)));
  };

  const setField = (field: keyof Post, value: string | boolean) => {
    setEditing((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  /* ── Form ── */
  if (editing) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={16} /> Volver
            </button>
            <h1 className="font-heading text-2xl text-[#3D3D3D]">
              {isNew ? "Nueva publicación" : "Editar publicación"}
            </h1>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col gap-6">

            {/* Título */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Título *</label>
              <input className={inputCls} placeholder="Escribe el título de la publicación" value={editing.title} onChange={(e) => setField("title", e.target.value)} />
            </div>

            {/* Categoría + Fecha */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría *</label>
                <select className={inputCls} value={editing.category} onChange={(e) => setField("category", e.target.value as Category)}>
                  {Object.entries(CATEGORY_META).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha *</label>
                <input className={inputCls} type="date" value={editing.date} onChange={(e) => setField("date", e.target.value)} />
              </div>
            </div>

            {/* Autor */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Autor</label>
              <input className={inputCls} placeholder="Ej: Equipo Escuchar" value={editing.author ?? ""} onChange={(e) => setField("author", e.target.value)} />
            </div>

            {/* Foto de portada */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">URL Foto de portada *</label>
              <input className={inputCls} placeholder="https://..." value={editing.cover_url} onChange={(e) => setField("cover_url", e.target.value)} />
              {editing.cover_url && (
                <div className="rounded-xl overflow-hidden aspect-video mt-1">
                  <img src={editing.cover_url} alt="preview" className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                </div>
              )}
            </div>

            {/* Extracto */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Extracto * <span className="normal-case font-normal text-gray-400">(aparece en las cards)</span></label>
              <textarea className={inputCls} rows={3} placeholder="2-3 líneas que resumen la historia..." value={editing.excerpt} onChange={(e) => setField("excerpt", e.target.value)} />
            </div>

            {/* Cuerpo */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contenido completo * <span className="normal-case font-normal text-gray-400">(soporta **negrita** y *cursiva*)</span>
              </label>
              <textarea className={`${inputCls} font-mono`} rows={12} placeholder="Escribe el artículo completo aquí..." value={editing.body} onChange={(e) => setField("body", e.target.value)} />
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#C8197A]" checked={editing.published} onChange={(e) => setField("published", e.target.checked)} />
                <span className="font-sans text-sm text-[#3D3D3D]">Publicado</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#C8197A]" checked={editing.featured} onChange={(e) => setField("featured", e.target.checked)} />
                <span className="font-sans text-sm text-[#3D3D3D]">Destacado (hero)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={!editing.title || !editing.cover_url || !editing.excerpt || !editing.body}
                className="flex items-center gap-2 bg-[#C8197A] text-white font-sans font-medium px-7 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {saved ? <><Check size={16} /> Guardado</> : "Guardar publicación"}
              </button>
              <button onClick={() => setEditing(null)} className="text-gray-400 font-sans text-sm hover:text-gray-600 px-4">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── List ── */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-sm font-sans text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-1">
              <ArrowLeft size={14} /> Admin
            </Link>
            <h1 className="font-heading text-3xl text-[#3D3D3D]">Noticias e Impacto</h1>
            <p className="text-gray-400 font-sans text-sm mt-1">{posts.filter(p => p.published).length} publicadas · {posts.filter(p => !p.published).length} borradores</p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-[#C8197A] text-white font-sans font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Nueva publicación
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-4 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Publicación</th>
                <th className="text-left px-4 py-4 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Fecha</th>
                <th className="text-center px-4 py-4 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="text-center px-4 py-4 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Destacado</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const meta = CATEGORY_META[post.category];
                return (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 hidden sm:block">
                          <img src={post.cover_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span
                            className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full mb-1 inline-block"
                            style={{ color: meta.color, backgroundColor: meta.bg }}
                          >
                            {meta.label}
                          </span>
                          <p className="font-sans font-medium text-sm text-[#3D3D3D] leading-snug line-clamp-1">{post.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="font-sans text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggle(post.id, "published")}
                        className={`inline-flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1.5 rounded-full transition-colors ${
                          post.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {post.published ? "Publicado" : "Borrador"}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggle(post.id, "featured")}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors ${
                          post.featured ? "bg-yellow-100 text-yellow-500" : "text-gray-200 hover:text-yellow-400"
                        }`}
                      >
                        <Star size={16} fill={post.featured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(post)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-sans text-sm">
              No hay publicaciones todavía.{" "}
              <button onClick={openNew} className="text-[#C8197A] underline">Crear la primera</button>
            </div>
          )}
        </div>

        <p className="text-center text-xs font-sans text-gray-300 mt-6">
          Los cambios se guardan en memoria. Conecta Supabase tabla <code className="bg-gray-100 px-1 rounded">posts</code> para persistir.
        </p>
      </div>
    </div>
  );
}
