    // Важно! Убедитесь, что Telegram.WebApp определён — 
    // это будет работать только в Telegram WebApp, запущенном через бота.
    const webApp = window.Telegram.WebApp;

    // В initDataUnsafe содержатся данные о пользователе, среди них user.id
    const userData = webApp.initDataUnsafe.user;
    console.log("Telegram объект:", window.Telegram);
    if (userData) {
        const userId = userData.id;
        console.log("User ID:", userId);
        // Далее используете userId, как вам нужно
    } else {
        // Если запуск веб-аппа не из Telegram, userData может быть не определён
        console.log("Webhook launched outside Telegram or user not found");
    }

    // Можно «развернуть» webapp на весь экран (опционально)
    webApp.expand();

