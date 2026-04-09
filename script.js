document.addEventListener('DOMContentLoaded', () => {
    const isoListContainer = document.getElementById('iso-list');
    if (!isoListContainer) return;

    fetch('iso.json')
        .then(response => {
            if (!response.ok) throw new Error('Не удалось загрузить список ISO');
            return response.json();
        })
        .then(isoList => {
            if (isoList.length === 0) {
                isoListContainer.innerHTML = '<p>Пока нет доступных сборок. Загляните позже!</p>';
                return;
            }

            isoListContainer.innerHTML = '';
            isoList.forEach(iso => {
                const card = document.createElement('div');
                card.className = 'iso-card';
                card.innerHTML = `
                    <h3>${escapeHtml(iso.name)}</h3>
                    <div class="meta">
                        <span>📦 Размер: ${escapeHtml(iso.size)}</span> |
                        <span>📅 Добавлено: ${escapeHtml(iso.date)}</span>
                    </div>
                    <div class="description">${escapeHtml(iso.description)}</div>
                    <a href="iso/${encodeURIComponent(iso.filename)}" class="download-link" download>Скачать ISO</a>
                `;
                isoListContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки ISO:', error);
            isoListContainer.innerHTML = '<p>Ошибка загрузки списка. Попробуйте обновить страницу позже.</p>';
        });
});

// Простая защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}
