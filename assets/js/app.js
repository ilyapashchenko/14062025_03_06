// === Получение Telegram ID пользователя ===
window.addEventListener('DOMContentLoaded', () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand(); // разворачивает мини-приложение

    const user = tg.initDataUnsafe?.user;

    if (user && user.id) {
      const userId = user.id;
      console.log('✅ Telegram ID пользователя:', userId);
      document.body.innerHTML += `<p>✅ Telegram ID: ${userId}</p>`;
    } else {
      console.warn('⚠️ Не удалось получить информацию о пользователе');
      document.body.innerHTML += `<p>⚠️ Пользователь не найден</p>`;
    }
  } else {
    console.error('❌ Telegram WebApp API не доступен');
    document.body.innerHTML += `<p>❌ Telegram WebApp API не доступен. Открой мини-приложение из Telegram.</p>`;
  }
});
