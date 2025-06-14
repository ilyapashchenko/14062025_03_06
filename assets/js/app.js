const telegram = window.Telegram.WebApp;

// Инициализация приложения
telegram.ready();

// Получение данных пользователя
const user = telegram.initDataUnsafe.user;
if (user) {
  const usernameElement = document.querySelector('.username');
  usernameElement.textContent = user.first_name || 'User';
  console.log('User ID:', user.id); // Для отладки
} else {
  console.error('User data not available');
  document.querySelector('.username').textContent = 'Unknown User';
}

// Функция для открытия модального окна
function openModal() {
  document.getElementById('addModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Функция для открытия модального окна ввода ID
function addByID() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Заглушка для добавления по QR-коду
function addByQR() {
  alert('Функция сканирования QR-кода пока не реализована');
}

// Заглушка для отправки ID
function submitId() {
  const serviceId = document.getElementById('serviceIdInput').value;
  if (serviceId) {
    alert(`Добавлен сервис с ID: ${serviceId}`);
    closeModal();
  } else {
    alert('Пожалуйста, введите ID');
  }
}
