import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaInfoCircle,
  FaSignOutAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaUsers,
  FaDiscord,
  FaWhatsapp,
  FaCheckCircle,
  FaChevronRight,
  FaLightbulb,
  FaTimes,
  FaPlus,
  FaBookOpen,
  FaCode,
  FaBrain,
  FaRobot,
  FaSearch,
  FaDatabase,
  FaBars,
  FaHome,
  FaTrash,
  FaCommentAlt
} from "react-icons/fa";

const QUIZ_QUESTIONS = [
  {
    q: "What does RAG stand for in the context of Large Language Models?",
    options: [
      "Robotic Automated Gateways",
      "Retrieval-Augmented Generation",
      "Refined Analytical Graphs",
      "Random Access Generator"
    ],
    answer: 1
  },
  {
    q: "Which architecture introduced in 2017 forms the foundation of modern LLMs (like GPT and Claude)?",
    options: [
      "Recurrent Neural Networks (RNN)",
      "Convolutional Neural Networks (CNN)",
      "Transformer Architecture",
      "Decision Trees"
    ],
    answer: 2
  },
  {
    q: "What is the primary function of the 'temperature' parameter in an LLM API call?",
    options: [
      "Controls output randomness/creativity",
      "Sets the server processing speed",
      "Measures the temperature of GPU cores",
      "Controls the token limit of the response"
    ],
    answer: 0
  },
  {
    q: "Which of the following describes an autonomous AI Agent?",
    options: [
      "A system that strictly translates text",
      "An AI that can perceive its environment, make decisions, and execute actions to achieve a goal",
      "A database that stores vector embeddings",
      "A script that runs cron jobs"
    ],
    answer: 1
  },
  {
    q: "What is the purpose of 'Vector Embeddings' in modern AI search systems?",
    options: [
      "To compress files into smaller sizes",
      "To convert words or concepts into numerical vectors representing semantic meaning",
      "To display 3D graphic representations on websites",
      "To verify email addresses"
    ],
    answer: 1
  }
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Layout state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User Dashboard State
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledLoading, setEnrolledLoading] = useState(true);
  const [snapTestHistory, setSnapTestHistory] = useState([]);
  const [snapHistoryLoading, setSnapHistoryLoading] = useState(true);

  // Student Dashboard Active Tab ('overview', 'snapTest', 'community')
  const [studentTab, setStudentTab] = useState("overview");

  // Snap Test (Quiz) Engine State
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Admin Dashboard State
  const [adminData, setAdminData] = useState({
    users: [],
    contacts: [],
    inquiries: [],
    enrollments: [],
    snapTests: [],
    courses: [],
    applications: [],
    posts: []
  });
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  // Admin Add Course Modal State
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    level: "Beginner",
    description: "",
    is_technical: "true",
    image_url: "",
    icon_name: "FaCode"
  });

  // Admin Comment Moderation Modal State
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostComments, setSelectedPostComments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setToken(storedToken);

    if (parsedUser.role === "admin") {
      fetchAdminData(storedToken);
    } else {
      fetchEnrolledCourses(storedToken);
      fetchSnapTestHistory(storedToken);
    }
  }, [navigate]);

  const fetchEnrolledCourses = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/my-courses`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch enrolled courses");
      }
      const data = await response.json();
      setEnrolledCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolledLoading(false);
    }
  };

  const fetchSnapTestHistory = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/my-snap-tests`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch snap test history");
      }
      const data = await response.json();
      setSnapTestHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSnapHistoryLoading(false);
    }
  };

  const fetchAdminData = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error("Unauthorized or server error");
      }
      const data = await response.json();
      setAdminData(data);
    } catch (err) {
      setAdminError(err.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  // Quiz handlers
  const startQuiz = () => {
    setActiveQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (optionIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === QUIZ_QUESTIONS[currentQuestionIndex].answer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmitQuiz = async () => {
    setSubmittingQuiz(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/snap-tests/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          score: quizScore,
          totalQuestions: QUIZ_QUESTIONS.length,
          topic: "AI & Modern Tech"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit test results");
      }

      alert("Quiz score submitted successfully!");
      setActiveQuiz(false);
      fetchSnapTestHistory(token);
      setStudentTab("overview"); // Back to overview tab
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  // Admin Course Creation handler
  const handleCourseInputChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      alert("Please fill in the title and description.");
      return;
    }

    setCourseSubmitting(true);
    try {
      const payload = {
        ...courseForm,
        is_technical: courseForm.is_technical === "true"
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add course");
      }

      alert("Course added successfully!");
      setShowAddCourseModal(false);
      setCourseForm({
        title: "",
        level: "Beginner",
        description: "",
        is_technical: "true",
        image_url: "",
        icon_name: "FaCode"
      });
      fetchAdminData(token);
    } catch (err) {
      alert(err.message);
    } finally {
      setCourseSubmitting(false);
    }
  };

  // Admin Post Status update handler
  const handleUpdatePostStatus = async (postId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/posts/${postId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      alert(`Post status successfully updated to ${newStatus}`);
      fetchAdminData(token);
    } catch (err) {
      alert(err.message);
    }
  };

  // Admin Comments Moderation Handlers
  const handleManageComments = async (postId) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
    setCommentsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setSelectedPostComments(data);
      } else {
        throw new Error("Failed to load comments");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete comment");
      }

      alert("Comment deleted successfully.");
      // Filter from state
      setSelectedPostComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Sidebar dynamic navigation render
  const renderSidebarContent = () => {
    const isAdmin = user.role === "admin";
    return (
      <div className="flex flex-col h-full">
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/20">
            D
          </span>
          <div>
            <h1 className="font-extrabold text-white text-base leading-none">Divijix Academy</h1>
            <span className="text-[10px] text-gray-500 tracking-wider font-semibold uppercase">Management Portal</span>
          </div>
        </div>

        {/* PROFILE HEADER */}
        <div className="bg-[#121824] rounded-2xl p-4 mb-6 border border-gray-800/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="truncate">
            <p className="text-white text-xs font-bold truncate">{user.name}</p>
            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="flex-1 space-y-1.5 overflow-y-auto">
          {isAdmin ? (
            /* Admin navigation */
            <>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-2">SYSTEM AUDITS</p>
              {[
                { id: "users", label: "Registered Users", icon: <FaUsers /> },
                { id: "courses", label: "Manage Courses", icon: <FaBookOpen /> },
                { id: "enrollments", label: "Enrollments", icon: <FaGraduationCap /> },
                { id: "snapTests", label: "Snap Test Scores", icon: <FaCheckCircle /> },
                { id: "posts", label: "Community Posts", icon: <FaUsers /> },
                { id: "applications", label: "Applications", icon: <FaEnvelope /> },
                { id: "contacts", label: "Contact submissions", icon: <FaEnvelope /> },
                { id: "inquiries", label: "Course Inquiries", icon: <FaInfoCircle /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </>
          ) : (
            /* Student navigation */
            <>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-2">STUDENT CENTER</p>
              {[
                { id: "overview", label: "My Enrolled Courses", icon: <FaBookOpen /> },
                { id: "snapTest", label: "AI & Tech Snap Test", icon: <FaLightbulb /> },
                { id: "community", label: "Learning Community", icon: <FaUsers /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setStudentTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    studentTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* BOTTOM LOGOUT */}
        <div className="pt-6 border-t border-gray-800/60 mt-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition mb-2"
          >
            <FaHome className="text-base" /> Back to Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <FaSignOutAlt className="text-base" /> Log Out
          </button>
        </div>
      </div>
    );
  };

  // ================= ADMIN VIEW RENDER =================
  const renderAdminContent = () => {
    if (adminLoading) {
      return (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (adminError) {
      return (
        <div className="bg-red-50/50 text-red-600 p-8 rounded-3xl text-center border border-red-200 shadow-sm max-w-lg mx-auto mt-10">
          <FaInfoCircle className="mx-auto text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>{adminError}</p>
          <button onClick={handleLogout} className="mt-5 bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition">
            Sign In Again
          </button>
        </div>
      );
    }

    const stats = [
      { label: "Total Students", value: adminData.users.filter(u => u.role !== 'admin').length, icon: <FaUser />, bg: "from-indigo-500 to-indigo-600" },
      { label: "Active Courses", value: adminData.courses.length, icon: <FaBookOpen />, bg: "from-violet-500 to-violet-600" },
      { label: "Course Enrollments", value: adminData.enrollments.length, icon: <FaGraduationCap />, bg: "from-emerald-500 to-emerald-600" },
      { label: "Admissions Applied", value: adminData.applications.length, icon: <FaEnvelope />, bg: "from-fuchsia-500 to-fuchsia-600" }
    ];

    const iconMap = {
      FaCode: <FaCode />,
      FaBrain: <FaBrain />,
      FaRobot: <FaRobot />,
      FaSearch: <FaSearch />,
      FaDatabase: <FaDatabase />
    };

    return (
      <div className="space-y-10">
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-[2rem] bg-gradient-to-br ${stat.bg} text-white shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:-translate-y-1 transition duration-300 relative overflow-hidden flex items-center gap-5`}>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
                {stat.icon}
              </div>
              <div className="relative z-10">
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-0.5">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* TAB TITLE AND ACTION BANNER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">
              {activeTab === "users" && "System Users Directory"}
              {activeTab === "courses" && "Published Programs"}
              {activeTab === "enrollments" && "Student Enrollments Log"}
              {activeTab === "snapTests" && "Snap Assessment Scores"}
              {activeTab === "posts" && "Community Forums Moderation"}
              {activeTab === "applications" && "Admissions Applications Inbox"}
              {activeTab === "contacts" && "General Enquiries"}
              {activeTab === "inquiries" && "Program Specific Inquiries"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Audit, register, and update system entries.</p>
          </div>
          
          {activeTab === "courses" && (
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3.5 rounded-xl transition shadow-md shadow-indigo-600/10"
            >
              <FaPlus /> Add New Program
            </button>
          )}
        </div>

        {/* TAB DETAILS CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md shadow-slate-200/40 overflow-hidden">
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-5">Name</th>
                    <th className="p-5">Email</th>
                    <th className="p-5">Role</th>
                    <th className="p-5">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {adminData.users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-5 font-bold text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-5 text-slate-500 font-semibold">{u.email}</td>
                      <td className="p-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                          u.role === 'admin' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-5 text-slate-400 text-xs font-semibold">
                        {new Date(u.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="overflow-x-auto">
              {adminData.courses.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No programs available. Click "+ Add New Program" to register one.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Course Title</th>
                      <th className="p-5">Difficulty Level</th>
                      <th className="p-5">Category</th>
                      <th className="p-5">Display specifications</th>
                      <th className="p-5">Detailed Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800">{course.title}</td>
                        <td className="p-5">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                            {course.level}
                          </span>
                        </td>
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                            course.is_technical ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {course.is_technical ? "AI Specialization" : "Foundation Career Track"}
                          </span>
                        </td>
                        <td className="p-5">
                          {course.is_technical ? (
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                              {iconMap[course.icon_name] || <FaCode />} Icon: {course.icon_name || "FaCode"}
                            </span>
                          ) : (
                            <span className="truncate block max-w-[180px] text-xs text-slate-500 font-semibold" title={course.image_url}>
                              Image URL: Provided
                            </span>
                          )}
                        </td>
                        <td className="p-5 text-slate-400 font-medium max-w-xs truncate" title={course.description}>
                          {course.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "enrollments" && (
            <div className="overflow-x-auto">
              {adminData.enrollments.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No active students enrollments found.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Student Details</th>
                      <th className="p-5">Student Email</th>
                      <th className="p-5">Enrolled Course</th>
                      <th className="p-5">Date of registration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.enrollments.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800">{e.user_name}</td>
                        <td className="p-5 text-slate-500 font-semibold">{e.user_email}</td>
                        <td className="p-5 font-bold text-indigo-600">{e.course_title}</td>
                        <td className="p-5 text-slate-400 text-xs font-semibold">
                          {new Date(e.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "snapTests" && (
            <div className="overflow-x-auto">
              {adminData.snapTests.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No test metrics reported yet.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Student Name</th>
                      <th className="p-5">Student Email</th>
                      <th className="p-5">Quiz Topic</th>
                      <th className="p-5">Score Metric</th>
                      <th className="p-5">Assessment Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.snapTests.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800">{st.user_name}</td>
                        <td className="p-5 text-slate-500 font-semibold">{st.user_email}</td>
                        <td className="p-5 text-slate-800 font-bold">{st.topic}</td>
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${
                            st.score >= 4 ? 'bg-green-50 text-green-600' : st.score >= 2 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {st.score} / {st.total_questions} ({(st.score/st.total_questions * 100).toFixed(0)}%)
                          </span>
                        </td>
                        <td className="p-5 text-slate-400 text-xs font-semibold">
                          {new Date(st.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "posts" && (
            <div className="overflow-x-auto">
              {adminData.posts.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No community posts submitted yet.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Author</th>
                      <th className="p-5">Title</th>
                      <th className="p-5">Content Snippet</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5">
                          <p className="font-bold text-slate-800">{post.author_name}</p>
                          <p className="text-[10px] text-slate-400">{post.author_email}</p>
                        </td>
                        <td className="p-5 font-semibold text-slate-800">{post.title}</td>
                        <td className="p-5 text-slate-400 font-medium max-w-xs truncate" title={post.content}>
                          {post.content}
                        </td>
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            post.status === 'approved' 
                              ? 'bg-green-50 text-green-600' 
                              : post.status === 'rejected' 
                                ? 'bg-red-50 text-red-600' 
                                : 'bg-amber-50 text-amber-600'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="p-5 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleManageComments(post.id)}
                            className="border border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-650 font-bold text-xs px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
                          >
                            <FaCommentAlt size={10} /> Comments
                          </button>
                          {post.status !== 'approved' && (
                            <button
                              onClick={() => handleUpdatePostStatus(post.id, 'approved')}
                              className="border border-green-500 hover:bg-green-500 hover:text-white text-green-650 font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
                            >
                              Approve
                            </button>
                          )}
                          {post.status !== 'rejected' && (
                            <button
                              onClick={() => handleUpdatePostStatus(post.id, 'rejected')}
                              className="border border-red-500 hover:bg-red-500 hover:text-white text-red-600 font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
                            >
                              Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "applications" && (
            <div className="overflow-x-auto">
              {adminData.applications.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No student applications submitted yet.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Applicant</th>
                      <th className="p-5">Contact Info</th>
                      <th className="p-5">University & Class</th>
                      <th className="p-5">Social Profile</th>
                      <th className="p-5">Submit Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-650 text-white flex items-center justify-center font-bold text-xs">
                            {app.name.charAt(0)}
                          </div>
                          {app.name}
                        </td>
                        <td className="p-5 text-slate-500 space-y-1">
                          <p className="font-semibold">{app.email}</p>
                          <p className="text-xs text-slate-400">Ph: {app.phone}</p>
                        </td>
                        <td className="p-5 space-y-1">
                          <p className="font-bold text-slate-800">{app.college}</p>
                          <p className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md inline-block font-semibold">Class of {app.passout}</p>
                        </td>
                        <td className="p-5">
                          <a
                            href={app.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-indigo-650 font-extrabold hover:underline"
                          >
                            View LinkedIn
                          </a>
                        </td>
                        <td className="p-5 text-slate-400 text-xs font-semibold">
                          {new Date(app.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="overflow-x-auto">
              {adminData.contacts.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No contact messages received.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">Sender</th>
                      <th className="p-5">Contact Details</th>
                      <th className="p-5">Subject Line</th>
                      <th className="p-5">Message Body</th>
                      <th className="p-5">Send Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800">{c.name}</td>
                        <td className="p-5 text-slate-500 space-y-0.5">
                          <p className="font-semibold">{c.email}</p>
                          {c.phone && <p className="text-xs text-slate-400">Ph: {c.phone}</p>}
                        </td>
                        <td className="p-5 font-bold text-slate-800">{c.subject || "General Inquiry"}</td>
                        <td className="p-5 text-slate-400 font-medium max-w-xs truncate" title={c.message}>{c.message}</td>
                        <td className="p-5 text-slate-400 text-xs font-semibold">
                          {new Date(c.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="overflow-x-auto">
              {adminData.inquiries.length === 0 ? (
                <p className="p-10 text-center text-slate-500">No course inquiries filed.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-5">User</th>
                      <th className="p-5">Contact</th>
                      <th className="p-5">Target Program</th>
                      <th className="p-5">Student Goals</th>
                      <th className="p-5">Submit Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {adminData.inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-5 font-bold text-slate-800">{inq.name}</td>
                        <td className="p-5 text-slate-500 space-y-0.5">
                          <p className="font-semibold">{inq.email}</p>
                          {inq.phone && <p className="text-xs text-slate-400">Ph: {inq.phone}</p>}
                        </td>
                        <td className="p-5 font-bold text-indigo-650">{inq.course}</td>
                        <td className="p-5 text-slate-400 font-medium max-w-xs truncate" title={inq.message}>{inq.message}</td>
                        <td className="p-5 text-slate-400 text-xs font-semibold">
                          {new Date(inq.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* ADMIN ADD COURSE MODAL */}
        {showAddCourseModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
              >
                <FaTimes size={18} />
              </button>
              
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-slate-850">Publish Program</h3>
                <p className="text-xs text-slate-400 mt-1">Make a new course available on the public specializations portal.</p>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-5 text-left">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={courseForm.title}
                    onChange={handleCourseInputChange}
                    placeholder="e.g. AI Workflow Automation"
                    className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Difficulty Level</label>
                    <select
                      name="level"
                      value={courseForm.level}
                      onChange={handleCourseInputChange}
                      className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Foundation">Foundation</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Course Category</label>
                    <select
                      name="is_technical"
                      value={courseForm.is_technical}
                      onChange={handleCourseInputChange}
                      className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition bg-white"
                    >
                      <option value="true">AI Technical Specialization</option>
                      <option value="false">Foundation Career Track</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Description Summary</label>
                  <textarea
                    name="description"
                    value={courseForm.description}
                    onChange={handleCourseInputChange}
                    placeholder="Provide a detailed summary of what the course covers, key technologies taught, and prerequisites..."
                    rows="3"
                    className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition resize-none"
                    required
                  ></textarea>
                </div>

                {/* Conditional fields based on selection */}
                {courseForm.is_technical === "true" ? (
                  /* Technical icon select */
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Icon Representation</label>
                    <select
                      name="icon_name"
                      value={courseForm.icon_name}
                      onChange={handleCourseInputChange}
                      className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition bg-white"
                    >
                      <option value="FaCode">Code & Tech (FaCode)</option>
                      <option value="FaBrain">Deep Learning / AI (FaBrain)</option>
                      <option value="FaRobot">Agentic / Robotics (FaRobot)</option>
                      <option value="FaSearch">Search & RAG (FaSearch)</option>
                      <option value="FaDatabase">Database & SQL (FaDatabase)</option>
                    </select>
                  </div>
                ) : (
                  /* Foundation image url */
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-550 uppercase tracking-wide">Cover Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={courseForm.image_url}
                      onChange={handleCourseInputChange}
                      placeholder="e.g. https://images.unsplash.com/... (optional)"
                      className="w-full border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none rounded-xl p-3.5 text-sm transition"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddCourseModal(false)}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-5 py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={courseSubmitting}
                    className="bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md shadow-indigo-600/10"
                  >
                    {courseSubmitting ? "Publishing..." : "Publish Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADMIN MANAGE COMMENTS MODAL */}
        {showCommentsModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative border border-slate-100 max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setShowCommentsModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
              >
                <FaTimes size={18} />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-slate-850">Manage Post Comments</h3>
                <p className="text-xs text-slate-400 mt-1">Review and delete student discussion replies.</p>
              </div>

              {commentsLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-650"></div>
                </div>
              ) : selectedPostComments.length === 0 ? (
                <p className="text-sm text-slate-500 py-6 text-center italic">No comments submitted on this post.</p>
              ) : (
                <div className="divide-y divide-slate-100 max-h-[50vh] overflow-y-auto pr-2 space-y-4">
                  {selectedPostComments.map((comment) => (
                    <div key={comment.id} className="flex justify-between items-start gap-4 pt-4 first:pt-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">{comment.author_name}</span>
                          <span className="text-[10px] text-slate-400">{comment.author_email}</span>
                          <span className="text-[9px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                            {new Date(comment.created_at).toLocaleDateString(undefined, { dateStyle: 'short' })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-5">{comment.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition shrink-0"
                        title="Delete Comment"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="bg-black text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= STUDENT VIEW RENDER =================
  const renderStudentContent = () => {
    return (
      <div className="space-y-10">
        {studentTab === "overview" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">Active Registrations</h2>
                <p className="text-xs text-slate-400 mt-1">Study your enrolled specialization courses.</p>
              </div>
              <span className="text-xs bg-slate-100 px-3.5 py-2 rounded-xl text-slate-600 font-extrabold">
                {enrolledCourses.length} {enrolledCourses.length === 1 ? "Program" : "Programs"}
              </span>
            </div>

            {enrolledLoading ? (
              <div className="flex justify-center items-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100/80 p-12 text-center shadow-md shadow-slate-200/50">
                <FaGraduationCap className="mx-auto text-5xl text-slate-300 mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No active enrollments</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm leading-6">
                  Subscribe to any of our advanced AI, Data Science, and Digital Marketing training programs to access class lectures.
                </p>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition text-xs shadow-md shadow-indigo-600/10"
                >
                  Browse Specializations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-md shadow-slate-200/40 p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
                    <div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-3 py-1.5 rounded-lg mb-4 inline-block uppercase tracking-wider">
                        {course.level}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{course.title}</h3>
                      <p className="text-slate-500 text-xs leading-5 mb-6 line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 py-3 rounded-xl text-xs font-bold transition border border-slate-100">
                      Access Modules
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {studentTab === "snapTest" && (
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-md shadow-slate-200/30 space-y-6">
            {!activeQuiz ? (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Assess Skills
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-800">AI & Tech Snap Test</h3>
                  <p className="text-slate-500 text-xs max-w-lg leading-6">
                    Assess your understanding of Large Language Models, prompt engineering parameters, RAG systems, and neural agents in a quick 5-question snap test.
                  </p>
                </div>
                <button
                  onClick={startQuiz}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-4 rounded-xl transition shadow-md shadow-orange-500/10 shrink-0"
                >
                  Start Snap Test
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {!quizFinished ? (
                  <>
                    {/* Quiz Progress header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-extrabold text-slate-850 text-lg">Technology Snap Test</h4>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Topic: AI & Modern Tech</p>
                      </div>
                      <span className="text-xs bg-orange-50 text-orange-600 font-bold px-3 py-1.5 rounded-lg">
                        Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                      </span>
                    </div>

                    {/* Question body */}
                    <div className="space-y-4">
                      <p className="font-bold text-slate-800 text-base md:text-lg">
                        {QUIZ_QUESTIONS[currentQuestionIndex].q}
                      </p>
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, oIdx) => {
                          const isSelected = selectedAnswer === oIdx;
                          const isCorrect = oIdx === QUIZ_QUESTIONS[currentQuestionIndex].answer;
                          
                          let optStyle = "border-slate-200 hover:bg-slate-50 text-slate-700";
                          if (selectedAnswer !== null) {
                            if (isSelected) {
                              optStyle = isCorrect 
                                ? "bg-green-50 border-green-300 text-green-700 font-bold" 
                                : "bg-red-50 border-red-300 text-red-700 font-bold";
                            } else if (isCorrect) {
                              optStyle = "bg-green-50 border-green-200 text-green-700 font-semibold";
                            } else {
                              optStyle = "opacity-60 border-slate-100 text-slate-400";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={selectedAnswer !== null}
                              onClick={() => handleSelectOption(oIdx)}
                              className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {selectedAnswer !== null && isCorrect && <FaCheckCircle className="text-green-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <FaLightbulb className="text-amber-400" />
                        <span>Submit answer to proceed.</span>
                      </div>
                      <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className={`flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-xs font-bold transition ${
                          selectedAnswer === null ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-800"
                        }`}
                      >
                        {currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? "Finish Test" : "Next Question"}
                        <FaChevronRight className="text-xs" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-6">
                    <FaCheckCircle className="mx-auto text-6xl text-green-500 animate-bounce" />
                    <div>
                      <h4 className="text-2xl font-bold text-slate-800">Quiz Completed!</h4>
                      <p className="text-slate-400 text-xs mt-1">Excellent effort! Ready to log your score?</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 max-w-xs mx-auto border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Your Score</p>
                      <h3 className="text-4xl font-black text-slate-850 mt-1">
                        {quizScore} <span className="text-lg text-slate-400">/ {QUIZ_QUESTIONS.length}</span>
                      </h3>
                      <p className="text-[10px] text-indigo-600 font-bold mt-2 uppercase tracking-wide">
                        {quizScore >= 4 ? "AI Specialist Rank" : quizScore >= 2 ? "Intermediate Practitioner" : "Beginner Level"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveQuiz(false)}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-6 py-3.5 rounded-xl transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        disabled={submittingQuiz}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md shadow-orange-500/10"
                      >
                        {submittingQuiz ? "Submitting..." : "Submit Score"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Test History list */}
            {snapTestHistory.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Your Test History</h4>
                <div className="space-y-2">
                  {snapTestHistory.map((history) => (
                    <div key={history.id} className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <p className="font-bold text-slate-700">{history.topic}</p>
                        <p className="text-slate-400 mt-0.5 text-[10px]">
                          {new Date(history.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold ${
                        history.score >= 4 ? 'bg-green-50 text-green-600' : history.score >= 2 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                        Score: {history.score} / {history.total_questions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {studentTab === "community" && (
          <div className="bg-gradient-to-br from-[#0c1020] to-[#161c30] rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden border border-[#1e2540]">
            <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3.5 mb-4">
              <FaUsers className="text-3xl text-indigo-400" />
              <h3 className="text-2xl font-black">Join Learning Community</h3>
            </div>
            <p className="text-slate-300 text-xs leading-6 mb-8 max-w-xl">
              Connect with fellow developers, get 24/7 coding assistance, share project work, and access hackathons.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#5865F2] hover:bg-[#4752C4] py-4 rounded-xl text-xs font-bold transition shadow-md shadow-indigo-650/20"
              >
                <FaDiscord className="text-lg" /> Join Discord Server
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20ba5a] py-4 rounded-xl text-xs font-bold transition shadow-md shadow-emerald-500/20"
              >
                <FaWhatsapp className="text-lg" /> Join WhatsApp Group
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex relative overflow-x-hidden">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0b0f19] text-gray-400 p-6 min-h-screen border-r border-gray-800/40 shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* MOBILE DRAWER SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          ></div>
          {/* Sidebar Drawer */}
          <div className="relative flex flex-col w-72 bg-[#0b0f19] text-gray-400 p-6 min-h-screen z-10 border-r border-gray-800 animate-slide-in">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2"
            >
              <FaTimes size={18} />
            </button>
            {renderSidebarContent()}
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* MOBILE HEADER TOPBAR */}
        <header className="flex md:hidden items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 text-slate-650 hover:bg-slate-50 rounded-xl border border-slate-100 transition"
            >
              <FaBars size={18} />
            </button>
            <h1 className="font-extrabold text-slate-800 text-sm tracking-tight">
              {user.role === "admin" ? "Admin Console" : "Student Portal"}
            </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0)}
          </div>
        </header>

        {/* PAGE DESKTOP HEADER HERO */}
        <header className="hidden md:block bg-white border-b border-slate-100 py-6 px-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <span className="text-[10px] text-indigo-600 font-extrabold tracking-widest uppercase">
                {user.role === "admin" ? "System Control" : "Personal Workspace"}
              </span>
              <h1 className="text-2xl font-black text-slate-805 mt-0.5">
                {user.role === "admin" ? "Admin Command Console" : `Welcome Back, ${user.name.split(" ")[0]}!`}
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-2.5">
              <span className="text-slate-600 font-bold text-xs">
                Status: <span className="text-green-600">Active</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
            </div>
          </div>
        </header>

        {/* CONTAINER CONTENT */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 md:p-10 lg:p-12">
          {user.role === "admin" ? renderAdminContent() : renderStudentContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
