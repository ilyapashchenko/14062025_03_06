window.onload = function () {
  console.log("Mini app loaded");

  if (window.Telegram && window.Telegram.WebApp) {
    console.log("Telegram.WebApp доступен");
    const tg = window.Telegram.WebApp;

    try {
      tg.ready();
      console.log("tg.ready() вызван");

      const user = tg.initDataUnsafe?.user;
      if (user) {
        console.log("Пользователь найден:", user);
        document.body.innerHTML = `<h1>ID пользователя: ${user.id}</h1>`;
      } else {
        console.warn("Пользователь не найден в initDataUnsafe");
        document.body.innerHTML = `<h1>Пользователь не найден в initDataUnsafe</h1>`;
      }
    } catch (e) {
      console.error("Ошибка при работе с Telegram WebApp API:", e);
      document.body.innerHTML = `<h1>Ошибка в Telegram WebApp API. Проверь консоль.</h1>`;
    }

  } else {
    console.error("Telegram WebApp API не доступен");
    document.body.innerHTML = `<h1>❌ Telegram WebApp API не доступен. Открой мини-приложение из Telegram.</h1>`;
  }
};
