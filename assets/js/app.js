// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, запущено ли в Telegram Mini App
  if (window.Telegram?.WebApp) {
    const webApp = Telegram.WebApp;
    webApp.expand(); // Раскрываем на весь экран
    
    // Получаем данные пользователя
    const user = webApp.initDataUnsafe?.user;
    if (user) {
      updateUserInfo(user);
    } else {
      // Пробуем разобрать initData вручную, если user не доступен
      parseInitDataManually(webApp.initData);
    }
  } else {
    // Режим разработки (если открыто в браузере)
    showDevModeMessage();
  }
});

// Обновляем информацию о пользователе в интерфейсе
function updateUserInfo(user) {
  const usernameElement = document.querySelector('.username');
  const serviceList = document.getElementById('serviceList');
  
  // Выводим имя и ID
  if (usernameElement) {
    usernameElement.textContent = `${user.first_name} (ID: ${user.id})`;
    
    // Добавляем значок Premium, если есть
    if (user.is_premium) {
      const premiumBadge = document.createElement('span');
      premiumBadge.className = 'premium-badge';
      premiumBadge.textContent = '⭐️';
      usernameElement.appendChild(premiumBadge);
    }
  }
  
  // Добавляем информацию о сервисах
  if (serviceList) {
    serviceList.innerHTML = `
      <div class="service-item">
        <div class="service-name">Пример сервиса 1 (User ID: ${user.id})</div>
        <div class="service-actions">
          <button class="action-btn">🗑️</button>
        </div>
      </div>
    `;
  }
}

// Парсим initData вручную
function parseInitDataManually(initData) {
  try {
    const params = new URLSearchParams(initData);
    const userJson = params.get('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      updateUserInfo(user);
    }
  } catch (e) {
    console.error("Ошибка при разборе initData:", e);
  }
}

// Сообщение в режиме разработки
function showDevModeMessage() {
  const usernameElement = document.querySelector('.username');
  if (usernameElement) {
    usernameElement.textContent = "Режим разработки (ID не доступен)";
  }
  
  const serviceList = document.getElementById('serviceList');
  if (serviceList) {
    serviceList.innerHTML = `
      <div class="service-item">
        <div class="service-name">Пример сервиса 1 (Demo Mode)</div>
      </div>
    `;
  }
}
