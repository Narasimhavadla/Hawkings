import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function WallPostManager() {
  const api = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    modalType: "WELCOME",
  });

  /* ---------------- FETCH POSTS ---------------- */
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${api}/wall-posts`);
      setPosts(res.data.data || []);
    } catch {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ---------------- TOGGLE PUBLISH ---------------- */
  const togglePublish = async (post) => {
    try {
      const url = post.published
        ? `${api}/wall-posts/${post.id}/unpublish`
        : `${api}/wall-posts/${post.id}/publish`;

      await axios.put(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        post.published
          ? "Post unpublished"
          : "Post published"
      );

      fetchPosts();
    } catch {
      toast.error("Action failed");
    }
  };

  /* ---------------- DELETE ---------------- */
  const deletePost = async () => {
    try {
      await axios.delete(
        `${api}/wall-posts/${deletePostId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Post deleted");
      setDeletePostId(null);
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  /* ---------------- CREATE ---------------- */
  const createPost = async () => {
    if (!form.title || !form.content) {
      toast.warning("Title & Content required");
      return;
    }

    try {
      setCreating(true);

      await axios.post(`${api}/wall-posts`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Wall post created");

      setForm({
        title: "",
        content: "",
        image: "",
        modalType: "WELCOME",
      });

      setShowModal(false);
      fetchPosts();
    } catch {
      toast.error("Failed to create post");
    } finally {
      setCreating(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Loading Wall Posts...
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wall Advertisements
          </h2>
          <p className="text-sm text-gray-500">
            Manage publish & visibility
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow hover:scale-105 transition"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Post
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -6 }}
            className={`rounded-2xl overflow-hidden shadow-md bg-white border transition relative ${
              post.published
                ? "border-green-500"
                : "border-gray-200"
            }`}
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-100 overflow-hidden">
              {post.image ? (
                <img
                  src={post.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* LIVE BADGE */}
            {post.published && (
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <FontAwesomeIcon icon={faCircleCheck} /> Live
              </span>
            )}

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {post.content}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => setPreviewPost(post)}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>

                <button
                  onClick={() => togglePublish(post)}
                  className={`px-3 py-1 rounded-lg text-white text-sm ${
                    post.published
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {post.published ? (
                    <>
                      <FontAwesomeIcon icon={faCircleXmark} />{" "}
                      Unpublish
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCircleCheck} />{" "}
                      Publish
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setDeletePostId(post.id)
                  }
                  className="bg-red-600 text-white px-3 rounded-lg"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------------- CREATE MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
          >
            <h3 className="font-bold text-lg mb-4">
              Create Wall Post
            </h3>

            {/* TITLE */}
            <input
              placeholder="Post title"
              className="border p-2 w-full mb-3 rounded-lg"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            {/* CONTENT */}
            <textarea
              placeholder="Post content"
              className="border p-2 w-full mb-3 rounded-lg"
              rows={3}
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
            />

            {/* IMAGE */}
            <input
              placeholder="Image URL (optional)"
              className="border p-2 w-full mb-3 rounded-lg"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
            />

            {/* IMAGE PREVIEW */}
            {form.image && (
              <img
                src={form.image}
                className="h-32 w-full object-cover rounded mb-3"
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={createPost}
                disabled={creating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {creating
                  ? "Creating..."
                  : "Create"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletePostId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center">
            <h3 className="font-bold mb-3">
              Delete this post?
            </h3>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() =>
                  setDeletePostId(null)
                }
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={deletePost}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h2 className="font-bold text-xl mb-3">
              {previewPost.title}
            </h2>

            {previewPost.image && (
              <img
                src={previewPost.image}
                className="w-full h-52 object-cover rounded mb-3"
              />
            )}

            <p>{previewPost.content}</p>

            <button
              onClick={() =>
                setPreviewPost(null)
              }
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
