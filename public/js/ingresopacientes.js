document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-completo");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que se envíe el formulario por defecto

    // Obtener valores del formulario
    const name = document.getElementById("nombre").value;
    const surname = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("telefono").value;
    const date_of_birth = document.getElementById("fechanacimiento").value;
    const address = document.getElementById("direccion").value;
    const national_id = document.getElementById("dni").value;

    // Enviar datos al backend
    fetch("http://localhost:3000/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        phone_number: phone_number,
        date_of_birth: date_of_birth,
        address: address,
        national_id: national_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });
  });
});
