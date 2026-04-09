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
o
[
    {
        "type": "official",
        "name": "Ubuntu 22.04 LTS",
        "description": "Один из самых популярных дистрибутивов для новичков и профессионалов. Стабильный, с большим сообществом.",
        "url": "https://releases.ubuntu.com/22.04/ubuntu-22.04.3-desktop-amd64.iso",
        "size": "4.8 GB",
        "date": "2023-08-10"
    },
    {
        "type": "official",
        "name": "Fedora Workstation 38",
        "description": "Современный дистрибутив с новейшим ПО. Отлично подходит для разработки и работы.",
        "url": "https://download.fedoraproject.org/pub/fedora/linux/releases/38/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-38-1.6.iso",
        "size": "2.1 GB",
        "date": "2023-04-18"
    },
    {
        "type": "official",
        "name": "Linux Mint 21.2",
        "description": "Дружелюбный дистрибутив на базе Ubuntu. Идеален для перехода с Windows.",
        "url": "https://mirrors.kernel.org/linuxmint/stable/21.2/linuxmint-21.2-cinnamon-64bit.iso",
        "size": "2.8 GB",
        "date": "2023-07-15"
    },
    {
        "type": "custom",
        "name": "MyLinux v1.0 для разработки",
        "filename": "mylinux-dev-1.0.iso",
        "size": "2.3 GB",
        "description": "Кастомная сборка для веб-разработки с предустановленными инструментами (VS Code, Docker, Node.js, Python).",
        "date": "2025-03-15"
    },
    {
        "type": "custom",
        "name": "MyLinux v1.0 для игр",
        "filename": "mylinux-gaming-1.0.iso",
        "size": "3.1 GB",
        "description": "Оптимизированная сборка для игр с драйверами NVIDIA, Steam, Lutris и Wine.",
        "date": "2025-03-10"
    }
]
