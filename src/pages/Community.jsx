import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaTimes, FaUser, FaClock, FaHeart, FaComment, FaPaperPlane } from "react-icons/fa";
import { API_BASE_URL } from "../config";

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Comments mapping: { [postId]: [comments_list] }
  const [commentsMap, setCommentsMap] = useState({});
  // Expanded posts mapping: { [postId]: boolean }
  const [expandedComments, setExpandedComments] = useState({});
  // New comment inputs mapping: { [postId]: { author_name, author_email, content } }
  const [newCommentInputs, setNewCommentInputs] = useState({});

  // Main Post Form State
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    title: "",
    content: ""
  });

  const fetchApprovedPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Error fetching approved posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author_name || !formData.author_email || !formData.title || !formData.content) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit post");
      }

      alert("Post submitted successfully! It will appear on the feed once approved by an admin.");
      setFormData({
        author_name: "",
        author_email: "",
        title: "",
        content: ""
      });
      setShowModal(false);
      fetchApprovedPosts();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Like a post
  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
        method: "POST"
      });
      if (response.ok) {
        const data = await response.json();
        // Update local state for likes count
        setPosts(prevPosts =>
          prevPosts.map(p => (p.id === postId ? { ...p, likes: data.likes } : p))
        );
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Toggle comments expand
  const handleToggleComments = async (postId) => {
    const isExpanded = !expandedComments[postId];
    setExpandedComments(prev => ({ ...prev, [postId]: isExpanded }));

    if (isExpanded) {
      fetchComments(postId);
    }
  };

  // Fetch comments
  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setCommentsMap(prev => ({ ...prev, [postId]: data }));
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Comment inputs change handler
  const handleCommentInputChange = (postId, field, value) => {
    setNewCommentInputs(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: value
      }
    }));
  };

  // Submit comment
  const handleSubmitComment = async (e, postId) => {
    e.preventDefault();
    const commentInput = newCommentInputs[postId] || {};
    const { author_name, author_email, content } = commentInput;

    if (!author_name || !author_email || !content) {
      alert("Please fill in all comment fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ author_name, author_email, content })
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Reset input form
      setNewCommentInputs(prev => ({
        ...prev,
        [postId]: {
          author_name: "",
          author_email: "",
          content: ""
        }
      }));

      // Refresh comments
      fetchComments(postId);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        {/* HERO HEADER */}
        <header className="bg-black text-white py-16 md:py-24 px-5 md:px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-red-500/10 opacity-70"></div>
          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <span className="text-[10px] bg-red-650 text-white font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
              Academy Forum
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Divijix Community Hub
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-6">
              Share tech ideas, ask coding questions, and discuss cutting-edge AI technologies with fellow learners.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-4 rounded-xl transition shadow-lg shadow-red-600/10"
              >
                <FaPlus /> Write a Post
              </button>
            </div>
          </div>
        </header>

        {/* POSTS LISTING */}
        <main className="max-w-4xl mx-auto px-5 py-12 md:py-16">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-650"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-2">No posts available yet</h3>
              <p className="text-slate-500 text-xs mb-6 max-w-sm mx-auto leading-5">
                Be the first to start a conversation! Submit a post detailing your AI projects or coding queries.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-lg transition"
              >
                Write First Post
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => {
                const isExpanded = expandedComments[post.id];
                const comments = commentsMap[post.id] || [];
                const cInput = newCommentInputs[post.id] || { author_name: "", author_email: "", content: "" };

                return (
                  <div
                    key={post.id}
                    className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-650 flex items-center justify-center font-bold text-xs shrink-0">
                          {post.author_name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-none">{post.author_name}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{post.author_email}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                        <FaClock />
                        <span>{new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-3">{post.title}</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-6 whitespace-pre-wrap mb-6">{post.content}</p>

                    {/* POST INTERACTIONS */}
                    <div className="flex items-center gap-4 border-t border-slate-50 pt-4 text-xs font-bold">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <FaHeart className="text-red-400" />
                        <span>{post.likes || 0} Likes</span>
                      </button>
                      <button
                        onClick={() => handleToggleComments(post.id)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-650 transition-colors"
                      >
                        <FaComment className="text-indigo-400" />
                        <span>{isExpanded ? "Hide Discussions" : "Discussions"}</span>
                      </button>
                    </div>

                    {/* COMMENTS LIST & FORM */}
                    {isExpanded && (
                      <div className="mt-6 border-t border-slate-100 pt-6 space-y-6">
                        {/* Comments Feed */}
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-450">Student Discussions</h4>
                          {comments.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No replies yet. Start the discussion below.</p>
                          ) : (
                            <div className="space-y-4 pl-3 border-l-2 border-slate-100">
                              {comments.map((comment) => (
                                <div key={comment.id} className="space-y-1">
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="font-bold text-slate-800">{comment.author_name}</span>
                                    <span className="text-[10px] text-slate-400">
                                      {new Date(comment.created_at).toLocaleDateString(undefined, { dateStyle: 'short' })}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 text-xs leading-5">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Comment Form */}
                        <form onSubmit={(e) => handleSubmitComment(e, post.id)} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-450">Reply to this thread</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={cInput.author_name || ""}
                              onChange={(e) => handleCommentInputChange(post.id, "author_name", e.target.value)}
                              className="border border-slate-200 outline-none rounded-xl p-2.5 text-xs bg-white"
                              required
                            />
                            <input
                              type="email"
                              placeholder="Your Email"
                              value={cInput.author_email || ""}
                              onChange={(e) => handleCommentInputChange(post.id, "author_email", e.target.value)}
                              className="border border-slate-200 outline-none rounded-xl p-2.5 text-xs bg-white"
                              required
                            />
                          </div>
                          <div className="relative">
                            <textarea
                              placeholder="Add to the discussion..."
                              value={cInput.content || ""}
                              onChange={(e) => handleCommentInputChange(post.id, "content", e.target.value)}
                              rows="2"
                              className="w-full border border-slate-200 outline-none rounded-xl p-3 text-xs bg-white resize-none pr-10"
                              required
                            ></textarea>
                            <button
                              type="submit"
                              className="absolute right-3.5 bottom-4 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                            >
                              <FaPaperPlane size={10} />
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* CREATE POST MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            >
              <FaTimes size={18} />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-slate-850">Write a Community Post</h3>
              <p className="text-xs text-slate-400 mt-1">Submit your post. It will go live once reviewed by an admin.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Author Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition"
                  required
                />
              </div>

              {/* Author Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Your Email</label>
                <input
                  type="email"
                  name="author_email"
                  value={formData.author_email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition"
                  required
                />
              </div>

              {/* Post Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Building an autonomous customer support agent"
                  className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition"
                  required
                />
              </div>

              {/* Post Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Describe your tech stack, post code snippets, or ask questions here..."
                  rows="5"
                  className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition resize-none"
                  required
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-5 py-3 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md shadow-indigo-600/10"
                >
                  {submitting ? "Submitting..." : "Submit Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
