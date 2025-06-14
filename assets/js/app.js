window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    console.error('Telegram WebApp не доступен');
    return;
  }

  tg.expand(); // Открывает окно Telegram WebApp на весь экран

  const user = tg.initDataUnsafe?.user;

  if (user) {
    console.log('Пользователь Telegram:', user);
    document.body.innerHTML += `
      <div style="padding: 20px;">
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Имя:</strong> ${user.first_name} ${user.last_name || ''}</p>
        <p><strong>Username:</strong> @${user.username || '—'}</p>
      </div>
    `;
  } else {
    console.warn('Пользователь Telegram не найден');
  }
});
