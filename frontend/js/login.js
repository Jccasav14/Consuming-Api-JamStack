document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();


    if (res.status !== 200) {
      message.textContent = data.message || "Credenciales incorrectas";
      return;
    }

 
    sessionStorage.setItem("user", JSON.stringify({
      id: data.id,
      username: data.username,
      role: data.role
    }));


    window.location.href = "content.html";

  } catch (err) {
    message.textContent = "Error de conexión";
  }
});
