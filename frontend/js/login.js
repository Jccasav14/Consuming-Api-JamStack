document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!data.ok) {
      message.textContent = data.message;
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/content.html";

  } catch (err) {
    message.textContent = "Error de conexión";
  }
});
