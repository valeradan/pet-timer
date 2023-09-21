document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('publish-form1');
    let targetDate; // Переменная для хранения искомой даты

    // Функция отправки данных с формы в таймер
    form.onsubmit = function (event) {
        event.preventDefault(); // Отменяем стандартное действие формы

        const message = this.message.value;
        const dateStr = this.datehere.value;

        // Парсим строку даты и времени
        targetDate = new Date(dateStr.replace("T", " "));

        // Проверяем, что дата успешно распарсилась. Можно опустить
        if (isNaN(targetDate)) {
            alert("Ошибка: некорректная дата и время.");
            return;
        }

        // Проверяем, что в названии есть текст
        if (message.trim() === "") {
            alert("Вы не назвали таймер :(");
            return;
        }

        // Сохраняем данные в локальное хранилище
        localStorage.setItem('page2_message', message);
        localStorage.setItem('page2_date', dateStr);

        // Обновляем таймер с новой датой
        updateTimer();

        // Обновляем заголовок таймера
        document.getElementById('headline').innerText = message;
    };

    // Функция обновления таймера
    function updateTimer() {
        const now = new Date();
        const counter = targetDate - now;

        if (counter < 0) {
            document.getElementById('headline').innerText = "Таймер закончился";
            document.getElementById('countdown').style.display = "none";
            return;
        }

        const seconds = Math.floor((counter / 1000) % 60); // из миллисекунд в секунды
        const minutes = Math.floor((counter / 1000 / 60) % 60);
        const hours = Math.floor((counter / 1000 / 60 / 60) % 24);
        const days = Math.floor(counter / (1000 * 60 * 60 * 24));

        if (!isNaN(targetDate)) {
            document.getElementById('seconds').innerText = seconds;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('hours').innerText = hours;
            document.getElementById('days').innerText = days;
        } else {
            document.getElementById('seconds').innerText = "--";
            document.getElementById('minutes').innerText = "--";
            document.getElementById('hours').innerText = "--";
            document.getElementById('days').innerText = "--";
        }
    }

    // Проверяем, есть ли сохраненные данные в локальном хранилище при загрузке страницы
    const savedMessage = localStorage.getItem('page2_message');
    const savedDate = localStorage.getItem('page2_date');

    if (savedMessage && savedDate) {
        document.getElementById('message').value = savedMessage;
        document.getElementById('datehere').value = savedDate;

        // Парсим строку даты и времени
        targetDate = new Date(savedDate.replace("T", " "));

        // Запускаем таймер с восстановленной датой
        updateTimer();
        setInterval(updateTimer, 1000);

        // Обновляем заголовок таймера
        document.getElementById('headline').innerText = savedMessage;
    };

    let counterCount = 1;
    const maxCounterCount = 3;
    const minCounterCount = 1;
    
    // Функция для обновления отображения счетчика
    function updateCounterDisplay() {
        document.getElementById('count').innerText = counterCount;
    }
    
    // Функция для открытия новых таймеров
    document.querySelector('.newtimers').onclick = () => {
        if (counterCount < maxCounterCount) {
            counterCount++;
            const newTimerId = `newtimer${counterCount}`;
            document.getElementById(newTimerId).style.display = "block";
    
            // Обновляем значение счетчика и сохраняем его в локальное хранилище
            updateCounterDisplay();
            localStorage.setItem('count', counterCount);
    
            // Сохраняем состояние нового таймера в локальное хранилище
            localStorage.setItem(newTimerId, "block");
        } else {
            alert('Извините, вы достигли максимального количества таймеров.');
        }
    }
    
    // Функция для удаления таймеров
    document.querySelector('.deletetimers').onclick = () => {
        if (counterCount > minCounterCount) {
            const currentTimerId = `newtimer${counterCount}`;
            document.getElementById(currentTimerId).style.display = "none";
            counterCount--;
    
            // Обновляем значение счетчика и сохраняем его в локальное хранилище
            updateCounterDisplay();
            localStorage.setItem('count', counterCount);
    
            // Сохраняем состояние удаленного таймера в локальное хранилище
            localStorage.setItem(currentTimerId, "none");
        } else {
            alert('Извините, у вас должен остаться хотя бы один таймер.');
        }
    }
    
    // Загрузка данных из локального хранилища при загрузке страницы
    window.addEventListener('DOMContentLoaded', () => {
        // Загружаем значение счетчика из локального хранилища
        const savedCount = localStorage.getItem('count');
        if (savedCount) {
            counterCount = parseInt(savedCount, 10);
            updateCounterDisplay();
        }
    
        // Загружаем состояние таймеров из локального хранилища и обновляем их отображение
        for (let i = 1; i <= maxCounterCount; i++) {
            const timerId = `newtimer${i}`;
            const savedTimerState = localStorage.getItem(timerId);
            if (savedTimerState) {
                document.getElementById(timerId).style.display = savedTimerState;
            }
        }
    });
    
});