# Тестовое задание для "ЗАО НПЦ ИРС" - Fullstack программист-разработчик WEB-приложений (NodeJS, React, PostgreSQL)


Ссылка на репозиторий: [https://github.com/varushchi/test-irs](https://github.com/varushchi/test-irs)

---

## Установка и запуск проекта

### 1. Клонируем репозиторий и переходим в папку проекта

```bash
git clone https://github.com/varushchi/test-irs
cd test-irs
```

> `git clone` — копирует проект с GitHub на ваш компьютер
> `cd test-irs` — переходим в папку проекта для работы с файлами

---

### 2. Устанавливаем зависимости и создаём файл окружения

```bash
npm i
cp .env.example .env
```

> `npm i` — устанавливает все зависимости для проекта
> `cp .env.example .env` — создаёт файл `.env` на основе примера, который содержит настройки сервера и базы данных. (Для теста оба файла идентичны).

---

### 3. Запускаем проект

```bash
npm start
```

> Запускает докер с сервером и клиентом

---

## Доступ к проекту

* **Сервер**: [http://localhost:8000](http://localhost:8000)

* **Клиент**: [http://localhost:3000](http://localhost:3000)
