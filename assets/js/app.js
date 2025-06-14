// ===== Глобальные переменные =====
let currentUser = null;

// ===== Основной код =====
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, что Mini App запущена в Telegram
  if (window.Telegram?.WebApp) {
    const webApp = Telegram.WebApp;
    webApp.expand(); // Раскрываем на весь экран
    
    // Пробуем получить данные пользователя
    initUserData(webApp);
    
    // Инициализируем сервисы (пример)
    initServices();
  } else {
    // Режим разработки (если открыто в браузере)
    console.log("Режим разработки: нет доступа к Telegram WebApp");
    mockUserData();
    initServices();
  }
});

// ===== Функции для работы с пользователем =====
function initUserData(webApp) {
  const user = webApp.initDataUnsafe?.user;
  
  if (user) {
    currentUser = {
      id: user.id,
      name: user.first_name || 'Пользователь',
      username: user.username,
      isPremium: user.is_premium || false
    };
    
    updateUserHeader();
  } else {
    console.log("Данные пользователя не получены");
  }
}

function mockUserData() {
  // Заглушка для разработки в браузере
  currentUser = {
    id: 123456789,
    name: "Иван Тестовый",
    username: "ivan_test",
    isPremium: true
  };
  updateUserHeader();
}

function updateUserHeader() {
  if (!currentUser) return;
  
  const nameElement = document.querySelector('.username');
  const avatarElement = document.querySelector('.avatar');
  
  if (nameElement) {
    nameElement.textContent = currentUser.name;
    if (currentUser.isPremium) {
      nameElement.innerHTML += ' <span class="premium">⭐️</span>';
    }
  }
  
  if (avatarElement) {
    // Здесь можно добавить аватар (например, через Telegram.WebApp.initDataUnsafe.user.photo_url)
    avatarElement.style.background = '#0088cc';
    avatarElement.innerHTML = currentUser.name.charAt(0);
  }
}

// ===== Функции для сервисов =====
function initServices() {
  // Загрузка сервисов из localStorage или API
  const serviceList = document.getElementById('serviceList');
  if (serviceList) {
    serviceList.innerHTML = `
      <div class="service-item">
        <div class="service-name">Пример сервиса 1</div>
        <div class="service-actions">
          <button class="action-btn">🗑️</button>
        </div>
      </div>
    `;
  }
}

// ===== Модальные окна =====
function openModal() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('addModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'none';
}

function addByQR() {
  closeModal();
  // Здесь логика для QR-кода
  alert("QR-код: функция в разработке");
}

function addByID() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'block';
}

function submitId() {
  const input = document.getElementById('serviceIdInput');
  if (input && input.value) {
    alert(`Добавлен сервис с ID: ${input.value}`);
    input.value = '';
    closeModal();
  } else {
    alert("Введите ID сервиса");
  }
}

// ===== Дополнительно =====
// Для Telegram WebApp можно добавить обработчик событий
if (window.Telegram?.WebApp) {
  Telegram.WebApp.onEvent('viewportChanged', () => {
    console.log("Viewport changed");
  });
}
