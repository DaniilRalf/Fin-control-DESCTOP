## **Запуск в режиме разработки**
1) Установка пакетов npm в разделе **_electron_**  и **_application_** (необходимо в каждой из этих папок выполнить команду) \
`npm i --force`
2) Установка пакетов npm в разделе **_common_** и билд зависомостей \
`npm i --force`
`npm run build`
`npm link`
3) Привязать пакет **_common_** к разделам **_electron_**  и **_application_**(выполнить команду в папках **_electron_**  и **_application_**)  \
   `npm link common`
4) Последовательно запускаем команды в разных терминалах \
`make start-dev-application`(запуск Реакт приложения) \
`make start-dev-electron`(запуск Електрон оболочки) \
Если у Вас стоит операционная система Windows то необходимо прочитать данную статью - 
   [ссылка на материал](https://stackoverflow.com/questions/2532234/how-to-run-a-makefile-in-windows) \






доп. инфа по сборке - [ссылка](https://polyakovdmitriy.ru/create-react-app-electron/)
