document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const message = document.getElementById("message");

  message.textContent = "";

  if (!username || !password) {
    message.textContent = "Por favor, completa todos los campos.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Registro exitoso. Ahora puedes iniciar sesión.";
      setTimeout(() => (window.location.href = "index.html"), 1500);
    } else {
      message.textContent = "❌ " + (data.message || "Error al registrar.");
    }
  } catch (err) {
    message.textContent = "❌ Error de conexión con el servidor.";
  }
});
