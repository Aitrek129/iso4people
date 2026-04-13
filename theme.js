// theme.js - переключение темы
(function() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    // Проверяем сохранённую тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.textContent = '☀️ Светлая';
    } else {
        themeSwitch.textContent = '🌙 Тёмная';
    }
    
    themeSwitch.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeSwitch.textContent = '🌙 Тёмная';
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeSwitch.textContent = '☀️ Светлая';
        }
    });
})();
