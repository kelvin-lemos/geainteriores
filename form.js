src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"

emailjs.init("l1dlTeSME7gs3f4cs");
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // prevenimos o comportamento padrão para controlar ambos os envios

    const form = this;
    const formData = new FormData(form);

    // 1️⃣ Envio para o Google Sheets via Apps Script
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
            // redireciona para página de agradecimento
            window.location.href = "https://kelvin-lemos.github.io/geainteriores/thank.html";
        }, (error) => {
            alert("Ocorreu um erro ao enviar o email. Tente novamente mais tarde.");
            console.log("Erro:", error);
        });
});
