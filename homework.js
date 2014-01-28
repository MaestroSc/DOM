/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

var e = document.getElementsByClassName('popup-link');

for(var i = 0; i < e.length; i++){
	e[i].onclick = function() {return false};
	e[i].addEventListener('click', openPopupFromLink, false);
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */

function openPopupFromLink() {
	if (document.getElementById('popup') != null) 
		document.getElementById('popup').parentNode.removeChild(ocument.getElementById('popup'));

	var dataTitle = this.getAttribute('data-title'),
		dataMessage = this.getAttribute('data-message'),
		getHref = this.getAttribute('href');

	dataMessage = dataMessage.replace(/%s/g, getHref);

	var goLink = function(){
					return location.assign(getHref);
				};
	return createPopup(dataTitle, dataMessage, goLink);
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */

function createPopup(title, message, onOk) {
	var boxMessage = document.createElement('div');

	boxMessage.innerHTML =' <div class="boxM"> \
								<div class="box-title">' + title + '</div> \
								<div class="box-message">'+ message + '</div> \
								<div class="butt"><button id="btrue">Да</button> \
								<button id="bfalse">Нет</button></div> \
							</div>';

	boxMessage.style.position = 'absolute';
	boxMessage.style.top = 250 + 'px';
	boxMessage.id = 'popup';
	boxMessage.style.left = Math.floor(document.body.clientWidth/2) - 175 + 'px';
	document.body.appendChild(boxMessage);

	document.getElementById('btrue').onclick = onOk;
	document.getElementById('bfalse').onclick = function(){
		return boxMessage.parentNode.removeChild(boxMessage);
	};
	return true;
}