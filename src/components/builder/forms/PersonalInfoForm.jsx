import React from "react";

const PersonalInfoForm = ({ data, setData }) => {
  const personal = data.personal;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">
          Let’s start with your identity
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Your professional brand begins with who you are.
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FULL NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={personal.name || ""}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={personal.email || ""}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={personal.phone || ""}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={personal.location || ""}
            onChange={handleChange}
            placeholder="Guwahati, Assam"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* LINKEDIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            value={personal.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* PORTFOLIO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio / Website
          </label>
          <input
            type="text"
            name="portfolio"
            value={personal.portfolio || ""}
            onChange={handleChange}
            placeholder="johndoe.dev"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* AI SUGGESTION CARD */}
      <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
        💡 <span className="font-medium">AI Insight:</span> Keep LinkedIn and
        portfolio links updated so recruiters can quickly verify your work.
      </div>
    </div>
  );
};

export default PersonalInfoForm;