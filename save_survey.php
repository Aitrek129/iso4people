<?php
// save_survey.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
    $design = isset($_POST['design']) ? $_POST['design'] : '';
    $usability = isset($_POST['usability']) ? $_POST['usability'] : '';
    $downloaded = isset($_POST['downloaded']) ? $_POST['downloaded'] : '';
    $project = isset($_POST['project']) ? $_POST['project'] : '';
    $comments = isset($_POST['comments']) ? trim($_POST['comments']) : '';

    // Проверяем обязательные поля
    $errors = [];
    if (empty($fullname)) $errors[] = 'Имя и фамилия обязательны';
    if (empty($design)) $errors[] = 'Ответ на вопрос об оформлении обязателен';
    if (empty($usability)) $errors[] = 'Ответ на вопрос об удобстве обязателен';
    if (empty($downloaded)) $errors[] = 'Ответ на вопрос о скачивании обязателен';
    if (empty($project)) $errors[] = 'Ответ на вопрос о проекте обязателен';

    if (!empty($errors)) {
        echo '<h2>Ошибка</h2><ul>';
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo '</ul><p><a href="survey.html">Вернуться к опросу</a></p>';
        exit;
    }

    // Формируем запись для сохранения
    $date = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    
    $entry = "========================================\n";
    $entry .= "Дата: $date\n";
    $entry .= "IP: $ip\n";
    $entry .= "Имя и фамилия: $fullname\n";
    $entry .= "Оформление: $design\n";
    $entry .= "Удобство: $usability\n";
    $entry .= "Скачивание ISO: $downloaded\n";
    $entry .= "Отношение к проекту: $project\n";
    $entry .= "Комментарии: " . ($comments ?: "нет") . "\n";
    $entry .= "========================================\n\n";

    // Сохраняем в файл
    $filename = 'survey_results.txt';
    
    // Открываем файл для добавления (создаётся автоматически)
    $file = fopen($filename, 'a');
    if ($file) {
        fwrite($file, $entry);
        fclose($file);
        
        // Показываем страницу успеха
        echo '<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Спасибо! | Linux для людей</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <nav>
                    <div class="container nav-container">
                        <a href="index.html" class="logo">Linux для людей</a>
                        <ul class="nav-links">
                            <li><a href="index.html">Главная</a></li>
                            <li><a href="download.html">Скачать</a></li>
                            <li><a href="format.html">Форматирование флешки</a></li>
                            <li><a href="survey.html">Опрос</a></li>
                            <li><button id="theme-switch" class="theme-toggle">🌙 Тёмная</button></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main>
                <div class="container">
                    <div class="success-message">
                        <h1>Спасибо за участие в опросе!</h1>
                        <p>Ваши ответы сохранены. Это поможет сделать проект лучше.</p>
                        <a href="index.html" class="btn">Вернуться на главную</a>
                    </div>
                </div>
            </main>
            <footer>
                <div class="container">
                    <p>© 2025 Linux для людей. Сделано с ❤️ для друзей.</p>
                </div>
            </footer>
            <script src="theme.js"></script>
        </body>
        </html>';
    } else {
        echo '<h2>Ошибка сервера</h2>';
        echo '<p>Не удалось сохранить ответы. Попробуйте позже.</p>';
        echo '<p><a href="survey.html">Вернуться к опросу</a></p>';
    }
} else {
    // Если кто-то зашёл напрямую на PHP-файл
    header('Location: survey.html');
    exit;
}
?>
