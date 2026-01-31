document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("early-access-form");
  const confirmationMessage = document.querySelector(".confirmation-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche la redirection par défaut

    // Affiche un message de chargement
    confirmationMessage.textContent =
      "⏳ Envoi en cours, veuillez patienter...";
    confirmationMessage.style.display = "block";
    confirmationMessage.style.color = "#004085";
    confirmationMessage.style.backgroundColor = "#cce5ff";
    confirmationMessage.style.border = "1px solid #b8daff";
    confirmationMessage.style.padding = "15px";
    confirmationMessage.style.borderRadius = "5px";
    confirmationMessage.style.marginTop = "20px";

    // Récupère les données du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Envoie les données au webhook via fetch
      const response = await fetch(
        "https://n8n.swayup-artisan.com/webhook/cab9c92d-9be0-4255-8e6f-68cd39938805",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        // Affiche un message de succès
        confirmationMessage.textContent =
          "✅ Votre formulaire a bien été envoyé ! Regardez vos messages dans les prochaines heures 😉";
        confirmationMessage.style.color = "#155724";
        confirmationMessage.style.backgroundColor = "#d4edda";
        confirmationMessage.style.border = "1px solid #c3e6cb";
        form.reset(); // Réinitialise le formulaire
      } else {
        throw new Error("Erreur lors de l'envoi du formulaire.");
      }
    } catch (error) {
      // Affiche un message d'erreur
      confirmationMessage.textContent =
        "❌ Une erreur est survenue. Veuillez réessayer plus tard.";
      confirmationMessage.style.color = "#721c24";
      confirmationMessage.style.backgroundColor = "#f8d7da";
      confirmationMessage.style.border = "1px solid #f5c6cb";
    }
  });
});
