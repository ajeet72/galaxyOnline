'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });


export default function AdminPage() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    coverImage: '',
    author: '',
    content: '',
  });

  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  // ✅ Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const hasEmpty = Object.values(form).some((v) => !v || v.trim() === '');
    if (hasEmpty) {
      setMessage('❌ All fields are required');
      return;
    }

    const res = await fetch('/api/admin/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || '✅ Post saved!');
  }

  // ✅ Clean image upload logic
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalPreview(URL.createObjectURL(file)); // handled outside rendering
    setUploading(true);
    setMessage('⏳ Uploading image...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setUploading(false);

      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, coverImage: data.url }));
        setMessage('✅ Image uploaded successfully');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setUploading(false);
      setMessage(`❌ Image upload failed: ${err.message}`);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Inputs */}
        <input
          type="text"
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          required
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          required
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          required
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />

          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

          {/* ✅ Image Preview handled in JSX only */}
          {localPreview ? (
            <img
              src={localPreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded shadow"
            />
          ) : form.coverImage ? (
            <img
              src={form.coverImage}
              alt="Uploaded Cover"
              className="w-full h-40 object-cover rounded shadow"
            />
          ) : null}
        </div>

        {/* Blog Body */}
        <textarea
          required
          placeholder="Blog content (Markdown/MDX)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded h-60"
        />
        <div className="border rounded p-2 bg-white dark:bg-gray-900">
            <label className="block mb-1 text-sm font-medium">Blog Content</label>
            <MDEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val || '' })}
            height={400}
            />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Post
        </button>
      </form>
    </main>
  );
}
