/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
var popupAdress, hrefWay;

document.body.addEventListener('click', function(event) {
    if (event.target.className == 'popup-link') _onMouseClick(event);
}, false)

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
		dataMessage = link.dataset.message.replace(/'%s'/g, link);

	hrefWay = link;

	if (popupAdress != undefined){
		popupAdress.style.display = 'block';
		popupAdress.children[0].innerHTML = dataTitle;
		popupAdress.children[1].innerHTML = dataMessage;
	} else{
		createPopup(dataTitle, dataMessage);
	}
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
	boxMessage.className = 'boxM';
	boxMessage.innerHTML = '<div class="box-title">' + title + '</div> \
							<div class="box-message">'+ message + '</div> \
							<div id="butt"><button>Да</button> \
							<button>Нет</button></div>';
	document.body.appendChild(boxMessage);
	popupAdress = document.body.lastChild;

	popupAdress.children[2].children[1].addEventListener('click', function(){ 
		return popupAdress.style.display = 'none'
	}, false);

	popupAdress.children[2].children[0].addEventListener('click', function(){
		return location.assign(hrefWay);
	} , false);
};