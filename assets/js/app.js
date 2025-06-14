window.addEventListener("DOMContentLoaded", () => {
  const output = document.createElement("div");
  output.style.fontFamily = "Arial, sans-serif";
  output.style.fontSize = "16px";
  output.style.padding = "20px";
  document.body.appendChild(output);

  if (!window.Telegram || !window.Telegram.WebApp) {
    output.innerHTML = "❌ Telegram WebApp API не доступен. Открой мини-приложение из Telegram.";
    console.error("Telegram WebApp API не доступен. Открой из Telegram.");
    return;
  }

  const tg = window.Telegram.WebApp;
  tg.ready(); // сообщаем Telegram, что всё загружено

  const user = tg.initDataUnsafe?.user;

  if (!user) {
    output.innerHTML = "⚠️ Пользователь Telegram не найден.";
    console.warn("Пользователь не определён, initDataUnsafe:", tg.initDataUnsafe);
    return;
  }

  // Выводим данные
  output.innerHTML = `
    <b>✅ Telegram API подключен</b><br><br>
    <b>ID:</b> ${user.id}<br>
    <b>Имя:</b> ${user.first_name} ${user.last_name ?? ""}<br>
    <b>Username:</b> @${user.username ?? "—"}
  `;

  console.log("Пользователь Telegram:", user);
});
