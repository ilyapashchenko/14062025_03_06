document.addEventListener('DOMContentLoaded', () => {
  // Проверим, доступен ли Telegram WebApp
  if (!window.Telegram || !window.Telegram.WebApp) {
    document.body.insertAdjacentHTML('beforeend', `<p style="color:red;">❌ Telegram WebApp API не доступен. Открой из Telegram.</p>`);
    return;
  }

  const tg = window.Telegram.WebApp;
  tg.expand();

  const user = tg.initDataUnsafe?.user;

  if (!user) {
    document.body.insertAdjacentHTML('beforeend', `<p style="color:red;">⚠️ Пользователь не определён. initDataUnsafe.user = null</p>`);
    return;
  }

  const userId = user.id;
  const username = user.username || 'без username';

  // Покажем на странице ID
  document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
      document.body.insertAdjacentHTML('beforeend', `<p style="color:red;">❌ Telegram WebApp API не доступен. Открой из Telegram.</p>`);
      return;
    }
    // ... дальше ваш код ...
  }, 300); // 300 мс задержки
});
