window.onload = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    if (user) {
      document.body.innerHTML = `<h1>Привет, ${user.first_name}!</h1><p>Твой ID: ${user.id}</p>`;
      console.log("User ID:", user.id);
    } else {
      document.body.innerHTML = "<p>Пользователь не определён (user пуст).</p>";
      console.log("User не определён.");
    }
  } else {
    document.body.innerHTML = "<p>Telegram WebApp API не доступен. Открой мини-приложение из Telegram.</p>";
    console.log("Telegram WebApp API не доступен.");
  }
};
