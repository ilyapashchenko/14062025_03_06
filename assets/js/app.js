// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Проверяем, что мы в Telegram Mini App
  if (window.Telegram?.WebApp) {
    const webApp = Telegram.WebApp;
    
    // 2. Пробуем получить ID пользователя (3 способа)
    let userId = null;
    
    // Способ 1: Из initDataUnsafe (самый простой)
    if (webApp.initDataUnsafe?.user?.id) {
      userId = webApp.initDataUnsafe.user.id;
    } 
    // Способ 2: Ручной разбор initData
    else if (webApp.initData) {
      try {
        const params = new URLSearchParams(webApp.initData);
        const userJson = params.get('user');
        if (userJson) {
          userId = JSON.parse(userJson).id;
        }
      } catch (e) {
        console.error("Ошибка разбора initData:", e);
      }
    }
    
    // 3. Выводим ID на экран
    if (userId) {
      // Заменяем весь контент страницы на ID
      document.body.innerHTML = `
        <div style="
          font-size: 24px;
          text-align: center;
          margin-top: 50px;
        ">
          Ваш ID: <strong>${userId}</strong>
        </div>
      `;
    } else {
      document.body.innerHTML = "ID не получен. Откройте Mini App через Telegram.";
    }
    
  } else {
    document.body.innerHTML = "Это не Telegram Mini App.";
  }
});
