// Ждём загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.style.fontSize = '18px';
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(container);

  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const user = tg.initDataUnsafe?.user;
    if (user && user.id) {
      container.textContent = `✅ Ваш Telegram user ID: ${user.id}`;
    } else {
      container.textContent = '⚠️ Не удалось получить данные пользователя Telegram.';
    }
  } else {
    container.textContent = '❌ Telegram WebApp API не доступен. Откройте мини-приложение из Telegram.';
  }
});
