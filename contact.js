document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const topic = document.getElementById("topic");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");
  const formResult = document.getElementById("formResult");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showResult(text, success) {
    if (!formResult) return;
    const className = success ? "alert-success" : "alert-danger";
    formResult.innerHTML = '<div class="alert ' + className + ' mb-0">' + text + '</div>';
  }

  function isEmailValid(value) {
    return emailRegex.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValue = fullName ? fullName.value.trim() : "";
    const emailValue = email ? email.value.trim() : "";
    const phoneValue = phone ? phone.value.trim() : "";
    const topicValue = topic ? topic.value : "";
    const messageValue = message ? message.value.trim() : "";
    const consentValue = consent ? consent.checked : false;

    if (nameValue.length < 2) {
      showResult("Skriv ett namn med minst 2 bokstäver.", false);
      return;
    }

    if (!isEmailValid(emailValue)) {
      showResult("Skriv en giltig e-postadress.", false);
      return;
    }

    if (phoneValue.length > 0 && phoneValue.length < 7) {
      showResult("Telefonnummer är för kort.", false);
      return;
    }

    if (topicValue === "") {
      showResult("Välj ett ämne.", false);
      return;
    }

    if (messageValue.length < 10) {
      showResult("Meddelandet måste vara minst 10 tecken.", false);
      return;
    }

    if (!consentValue) {
      showResult("Du måste godkänna villkoret.", false);
      return;
    }

    showResult("Tack! Ditt meddelande är skickat (demo).", true);
    form.reset();
  });

  form.addEventListener("reset", function () {
    if (formResult) formResult.innerHTML = "";
  });
});
