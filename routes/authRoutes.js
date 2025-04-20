const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://techno-backend-76p3.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.role === "student") {
        navigate("/dashboard");
      } else {
        setError("Unknown role.");
      }
    } else {
      setError("Invalid ID or Password.");
    }
  } catch (err) {
    console.error(err);
    setError("Server error. Please try again later.");
  }
};
