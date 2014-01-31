/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

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
		dataMessage = link.dataset.message.replace(/'%s'/g, link),
		getBox = document.getElementById('boxM');

	if (getBox){
		document.body.lastChild.style.display = 'block';
		getBox.children[0].innerHTML = dataTitle;
		getBox.children[1].innerHTML = dataMessage;
	} else{
		createPopup(dataTitle, dataMessage);
	}

	document.getElementsByTagName('button')[0].addEventListener('click',function(){
		return location.assign(link);
	}, false);

	document.getElementsByTagName('button')[1].addEventListener('click', function(){ 
		return document.body.lastChild.style.display = 'none'
	}, false);

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

	boxMessage.innerHTML = '<div id="boxM"> \
								<div class="box-title">' + title + '</div> \
								<div class="box-message">'+ message + '</div> \
								<div id="butt"><button>Да</button> \
								<button>Нет</button></div> \
							</div>';
	return document.body.appendChild(boxMessage);
};