/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

document.body.onclick = function(event){
	if (event.target.className == 'popup-link') _onMouseClick(event);
}

// Переменная e - содержит Event событие клика по ссылке с классом 'popup-link'. 
// 'e' задана в данном шаблоне функции _onMouseClick, и не изменена :)
function _onMouseClick(e) { 
        if (e.preventDefault) e.preventDefault(); // Если метод существует, то отменяем его действие
        return openPopupFromLink(e.target);
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */

function openPopupFromLink(link) {
	var dataTitle = link.dataset.title,
		dataMessage = link.dataset.message;

	dataMessage = dataMessage.replace(/'%s'/g, link); //Проверяем на спец символ, и заменяем на ссылку

	if (document.getElementById('popup')){
		document.getElementById('popup').style.display = 'block';
		document.getElementById('popup').innerHTML ='<div class="box-title">' + dataTitle + '</div> \
													<div class="box-message">'+ dataMessage + '</div> \
													<div class="butt"><button id="btrue">Да</button> \
													<button id="bfalse">Нет</button></div>';
	} else{
		createPopup(dataTitle, dataMessage);
	}

	var goLink = function(){ // Функция для кнопки 'да'
		return location.assign(link);
	};
	var noLink = function(){ // Функция для кнопки 'нет'
		return document.getElementById('popup').style.display = 'none'
	};

	var b_yes = document.getElementById('btrue'),
		b_no = document.getElementById('bfalse');

	b_yes.addEventListener('click', goLink, false);
	b_no.addEventListener('click', noLink, false);

};

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */

function createPopup(title, message) {
	var boxMessage = document.createElement('div');

	boxMessage.innerHTML ='	<div class="box-title">' + title + '</div> \
							<div class="box-message">'+ message + '</div> \
							<div class="butt"><button id="btrue">Да</button> \
							<button id="bfalse">Нет</button></div>';
	boxMessage.id = 'popup';
	return document.body.appendChild(boxMessage);
};