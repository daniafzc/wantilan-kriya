"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const BADGE_OPTIONS = [
  "Teknik & Bahan",
  "Tradisi & Makna",
  "Pasar & Bisnis",
  "Kolaborasi",
];

const COLOR_OPTIONS = [
  { value: "green", label: "Hijau" },
  { value: "terracotta", label: "Terracotta" },
  { value: "plum", label: "Plum" },
  { value: "teal", label: "Teal" },
  { value: "gold", label: "Gold" },
];

const TYPE_LABELS: Record<string, string> = {
  story: "Cerita",
  question: "Pertanyaan",
};

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface Submission {
  id: string;
  type: string;
  name: string;
  location: string;
  title: string;
  content: string;
  category: string;
  status: string;
  curator_notes: string | null;
  created_at: string;
}

interface PublishForm {
  slug: string;
  author_role: string;
  excerpt: string;
  badge: string;
  image_color: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [publishForms, setPublishForms] = useState<Record<string, PublishForm>>(
    {},
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "err") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const url = filter
        ? `${API_BASE}/submit/?status=${filter}`
        : `${API_BASE}/submit/`;
      const res = await fetch(url);
      const data = await res.json();
      setSubmissions(data);
    } catch {
      showToast("Gagal memuat submission", "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const initForm = (s: Submission): PublishForm => ({
    slug: slugify(s.title),
    author_role: s.type === "story" ? "Pengrajin" : "Anggota Komunitas",
    excerpt: s.content.slice(0, 120) + "...",
    badge: BADGE_OPTIONS[0],
    image_color: "green",
  });

  const toggleExpand = (id: string, s: Submission) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      if (!publishForms[id]) {
        setPublishForms((prev) => ({ ...prev, [id]: initForm(s) }));
      }
    }
  };

  const updateForm = (id: string, key: keyof PublishForm, val: string) => {
    setPublishForms((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: val },
    }));
  };

  const handleReject = async (id: string) => {
    setActionLoading(id + "-reject");
    try {
      await fetch(`${API_BASE}/submit/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      showToast("Submission ditolak", "ok");
      fetchSubmissions();
      setExpanded(null);
    } catch {
      showToast("Gagal menolak submission", "err");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePublish = async (s: Submission) => {
    const form = publishForms[s.id];
    if (!form) return;
    setActionLoading(s.id + "-publish");
    try {
      // 1. Update status submission jadi approved
      await fetch(`${API_BASE}/submit/${s.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });

      // 2. POST artikel baru dari data submission
      const res = await fetch(`${API_BASE}/artikel/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          judul: s.title,
          author: s.name,
          author_initial: s.name.charAt(0).toUpperCase(),
          author_role: form.author_role,
          daerah: s.location ?? null,
          excerpt: form.excerpt,
          content: s.content,
          badge: form.badge,
          image_color: form.image_color,
          diterbitkan: true,
          kategori_id: null,
          komunitas_id: null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail ?? "Gagal membuat artikel");
      }

      showToast("✓ Artikel berhasil diterbitkan!", "ok");
      fetchSubmissions();
      setExpanded(null);
    } catch (e) {
      showToast((e as Error).message, "err");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === "ok"
              ? "bg-green-600 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">
            Wantilan Kriya
          </p>
          <h1 className="text-xl font-semibold text-stone-800">
            Kurasi Submission
          </h1>
        </div>
        <a
          href="/"
          className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          ← Kembali ke Web
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["pending", "approved", "rejected", ""].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === s
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
              }`}
            >
              {s === "" ? "Semua" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button
            onClick={fetchSubmissions}
            className="ml-auto px-4 py-1.5 rounded-full text-sm text-stone-500 border border-stone-200 hover:border-stone-400 bg-white transition-all"
          >
            ↻ Refresh
          </button>
        </div>

        {/* List */}
        {loading ? (
          <p className="text-stone-400 text-sm">Memuat...</p>
        ) : submissions.length === 0 ? (
          <p className="text-stone-400 text-sm">Tidak ada submission.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
              >
                {/* Card header */}
                <button
                  className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-stone-50 transition-colors"
                  onClick={() => toggleExpand(s.id, s)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          STATUS_STYLE[s.status] ??
                          "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {s.status}
                      </span>
                      {s.type && (
                        <span className="text-xs text-stone-400">
                          {TYPE_LABELS[s.type] ?? s.type}
                        </span>
                      )}
                      <span className="text-xs text-stone-300">
                        {new Date(s.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="font-semibold text-stone-800 truncate">
                      {s.title}
                    </p>
                    <p className="text-sm text-stone-400">
                      {s.name}
                      {s.location ? ` · ${s.location}` : ""}
                    </p>
                  </div>
                  <span className="text-stone-300 text-lg mt-1">
                    {expanded === s.id ? "↑" : "↓"}
                  </span>
                </button>

                {/* Expanded detail + form */}
                {expanded === s.id && (
                  <div className="border-t border-stone-100 px-6 py-5">
                    {/* Isi konten */}
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-2">
                      Isi Submission
                    </p>
                    <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap mb-6 max-h-48 overflow-y-auto">
                      {s.content}
                    </div>

                    {s.status === "pending" && (
                      <>
                        <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-3">
                          Lengkapi untuk Terbitkan
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="text-xs text-stone-500 mb-1 block">
                              Slug URL
                            </label>
                            <input
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-stone-400"
                              value={publishForms[s.id]?.slug ?? ""}
                              onChange={(e) =>
                                updateForm(s.id, "slug", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs text-stone-500 mb-1 block">
                              Peran Author
                            </label>
                            <input
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
                              value={publishForms[s.id]?.author_role ?? ""}
                              onChange={(e) =>
                                updateForm(s.id, "author_role", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-xs text-stone-500 mb-1 block">
                            Excerpt (ringkasan)
                          </label>
                          <textarea
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400 resize-none"
                            rows={2}
                            value={publishForms[s.id]?.excerpt ?? ""}
                            onChange={(e) =>
                              updateForm(s.id, "excerpt", e.target.value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div>
                            <label className="text-xs text-stone-500 mb-1 block">
                              Badge Kategori
                            </label>
                            <select
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400 bg-white"
                              value={publishForms[s.id]?.badge ?? ""}
                              onChange={(e) =>
                                updateForm(s.id, "badge", e.target.value)
                              }
                            >
                              {BADGE_OPTIONS.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-stone-500 mb-1 block">
                              Warna Card
                            </label>
                            <select
                              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400 bg-white"
                              value={publishForms[s.id]?.image_color ?? ""}
                              onChange={(e) =>
                                updateForm(s.id, "image_color", e.target.value)
                              }
                            >
                              {COLOR_OPTIONS.map((c) => (
                                <option key={c.value} value={c.value}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleReject(s.id)}
                            disabled={actionLoading !== null}
                            className="px-4 py-2 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === s.id + "-reject"
                              ? "..."
                              : "Tolak"}
                          </button>
                          <button
                            onClick={() => handlePublish(s)}
                            disabled={actionLoading !== null}
                            className="px-5 py-2 rounded-xl text-sm bg-stone-800 text-white hover:bg-stone-700 transition-colors disabled:opacity-50 font-medium"
                          >
                            {actionLoading === s.id + "-publish"
                              ? "Menerbitkan..."
                              : "✓ Terbitkan Artikel"}
                          </button>
                        </div>
                      </>
                    )}

                    {s.status !== "pending" && (
                      <p className="text-sm text-stone-400 italic">
                        Submission ini sudah{" "}
                        {s.status === "approved" ? "disetujui" : "ditolak"}.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
