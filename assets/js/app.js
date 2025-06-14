// === Supabase Setup ===
const SUPABASE_URL = 'https://ojeupytgwjyyjplwdyyh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZXVweXRnd2p5eWpwbHdkeXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NDc2OTQsImV4cCI6MjA2NTMyMzY5NH0.jXB0N2DT98YOgPEeZe-_FPBvmNmRCcPpqwrikQXP2bI';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === Telegram Setup ===
const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user;
const userId = user?.id;

// === Проверка и добавление пользователя ===
async function checkOrCreateUser() {
  if (!userId) {
    console.error('Не удалось получить Telegram user ID');
    return;
  }

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // Пользователя нет — добавляем
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: userId }]);

    if (insertError) {
      console.error('Ошибка при добавлении пользователя:', insertError.message);
    } else {
      console.log('Новый пользователь добавлен');
    }
  } else if (error) {
    console.error('Ошибка при проверке пользователя:', error.message);
  } else {
    console.log('Пользователь уже существует');
  }
}

// === Вызов при старте приложения ===
checkOrCreateUser();

// --- Далее твои функции и остальной код ---


// == UI Logic ==
const services = [];
const serviceList = document.getElementById('serviceList');

function renderServices() {
  serviceList.innerHTML = '';
  services.forEach(service => {
    const item = document.createElement('div');
    item.className = 'service-item';
    item.innerHTML = `
      <div class="service-name">
        ${service.place_name} — ${service["1_service_name"]}
      </div>
      <button class="button" onclick="onBook('${service.place_name}')">Записаться</button>
    `;
    serviceList.appendChild(item);
  });
}

function onBook(serviceName) {
  alert(`Запись на ${serviceName}`);
}

function openModal() {
  document.getElementById('addModal').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// function addByQR() {
//   closeModal();
//   const place_name = prompt("Введите название места (QR):");
//   const service_name = prompt("Введите название услуги:");
//   const service_id = prompt("Введите ID услуги:");

//   if (place_name && service_name && service_id) {
//     addServiceToDB(place_name, service_id, service_name);
//   }
// }

function addByID() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('idInputModal').style.display = 'flex';
}

async function submitId() {
  const input = document.getElementById('serviceIdInput');
  const id = input.value.trim();
  if (id) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('place_id', id)
      .single();

    if (error || !data) {
      alert('Место с таким ID не найдено.');
    } else {
      services.push(data);
      renderServices();
    }

    input.value = '';
    closeModal();
  } else {
    alert('Пожалуйста, введите ID');
  }
}

// === Получить все сервисы из БД при старте ===
async function loadServicesFromDB() {
  const { data, error } = await supabase
    .from('services')
    .select('*');

  if (error) {
    console.error('Ошибка загрузки:', error.message);
    return;
  }

  services.push(...data);
  renderServices();
}

// === Добавить сервис в базу данных ===
async function addServiceToDB(place_name, service_id, service_name) {
  const { data, error } = await supabase
    .from('services')
    .insert([
      {
        place_name,
        "1_service_ID": service_id,
        "1_service_name": service_name
      }
    ]);

  if (error) {
    alert('Ошибка при добавлении: ' + error.message);
    return;
  }

  services.push(...data);
  renderServices();
}

// === Запуск ===
loadServicesFromDB();
