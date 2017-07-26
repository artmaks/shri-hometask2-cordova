# shri-hometask2-cordova

**Дэмо:**

![Дэмо](https://raw.githubusercontent.com/artmaks/shri-hometask3-cordova/master/cordova.gif)

**Плагины:**
 * cordova-plugin-camera 2.4.1 "Camera"
 * cordova-plugin-statusbar 2.1.3 "StatusBar"
 * cordova-plugin-x-socialsharing 5.1.8 "SocialSharing"

**Библиотеки и технологии:**
 * Phonegap
 * Framework7 + react (with redux)
 * webpack (hotloader)

**Установка:**
 * ``$ git clone "URL" ``
 * ``$ cd "path/to/folder"``
 * ``$ npm i``

**Запуск**
 * ``$ npm start`` (запуск webpack dev server, доступен по адресу localhost:8080)
 * ``$ npm run ios`` (запуск на iOS устройстве)
 * ``$ npm run android`` (запуск на Android устройсве)
 * ``$ npm run build`` (собрать проект)
 * ``$ phonegap serve`` (запустить phonegap сервер)
 
**Возможные проблемы**
 * Ошибка ``Error: Your android platform does not have Api.js`` при сборке проекта:
 
 Наберите в консоле:
   ``$ cordova platform rm android && cordova platform add android && cordova platform rm ios && cordova platform add ios``

**Отдельное спасибо**
 * https://www.airtightinteractive.com/ (алгоритм Glitch эффекта)
