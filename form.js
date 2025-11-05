document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("l1dlTeSME7gs3f4cs");

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Formulário não encontrado.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // impede recarregar a página
        
        
        const email = form.email.value.trim();
        const emailError = document.getElementById("email-error");
        emailError.textContent = ""; // limpa mensagens anteriores

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = "Por favor, insira um e-mail válido.";
            return; // cancela o envio se o e-mail for inválido
        }

        console.log("Envio iniciado...");
        const formData = new FormData(form);

        // 1️⃣ Envio para Google Sheets
        fetch(form.action, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Dados gravados no Google Sheets:", data);
            })
            .catch(error => {
                console.error("Erro ao enviar para Google Sheets:", error);
            });

        // 2️⃣ Envio para EmailJS
        emailjs.sendForm("service_fng23se", "template_kquq8cj", form)
            .then(() => {
                console.log("Email enviado com sucesso!");
                window.location.href = "https://kelvin-lemos.github.io/geainteriores/thank.html";
            })
            .catch((error) => {
                alert("Ocorreu um erro ao enviar o email. Tente novamente mais tarde.");
                console.log("Erro:", error);
            });
    });
});
