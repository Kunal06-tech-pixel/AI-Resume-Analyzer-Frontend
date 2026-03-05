import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">

      {/* NAVBAR — FULL WIDTH, FAR RIGHT LOGOUT */}
      <nav className="w-full bg-linear-to-r from-blue-50 via-white to-pink-50 backdrop-blur-md border-b border-gray-200/60">
        <div className="flex items-center justify-end px-6 py-4">
          <button
            onClick={logout}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center text-center mt-14 px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="block text-gray-900">
            Smart feedback for your
          </span>

          {/* GRADIENT TEXT */}
          <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            DREAM JOB
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-sm text-gray-500">
          Drop your resume to get an ATS score, detailed insights, and
          improvement suggestions tailored to your job role.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">

          <div className="space-y-5">

            <div>
              <label className="text-xs text-gray-500">Company Name</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Job Title</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Job title"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Job Description</label>
              <textarea
                rows={4}
                placeholder="Write a clear & concise job description with responsibilities & expectations..."
                className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Upload Box */}
            <div>
              <label className="text-xs text-gray-500">Upload Resume</label>
              <div className="mt-2 flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 text-center cursor-pointer">
                <div className="mb-2 text-xl">📄</div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PDF, PNG or JPG (max. 10MB)
                </p>
              </div>
            </div>

            {/* GRADIENT BUTTON */}
            <button className="mt-4 w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition">
              Save & Analyze Resume
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;