import React from "react";

const PersonalInfoForm = ({ data, setData }) => {

  const personal = data.personal;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value
      }
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
        <input
          type="text"
          name="name"
          value={personal.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={personal.title}
          onChange={handleChange}
          placeholder="Professional Title"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
        />

      </div>

      {/* AI SUGGESTION CARD */}
      <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
        💡 <span className="font-medium">AI Insight:</span> Use a role-specific title like
        “Frontend Developer Intern” instead of generic titles.
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={personal.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          value={personal.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
        />

      </div>

      {/* LOCATION */}
      <input
        type="text"
        name="location"
        value={personal.location}
        onChange={handleChange}
        placeholder="Location (City, Country)"
        className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
      />

    </div>
  );
};

export default PersonalInfoForm;