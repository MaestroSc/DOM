/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

document.body.addEventListener('click', function(event) {
    if (event.target.className == 'popup-link') _onMouseClick(event);
}, true)

function _onMouseClick(e) { 
        if (e.preventDefault) e.preventDefault(); // Если метод существует, то отменяем его действие
        return openPopupFromLink(e.target);
}

function setLayer (name, text){ // Блок задания параметров popup вынесен в функцию
	return '<div id="boxM"> \
				<div class="box-title">' + name + '</div> \
				<div class="box-message">'+ text + '</div> \
				<div id="butt"><button>Да</button> \
				<button>Нет</button></div> \
			</div>';
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */

function openPopupFromLink(link) {
	var dataTitle = link.dataset.title,
		dataMessage = link.dataset.message.replace(/'%s'/g, link),
		popupBox = document.body.lastChild; 

	if (document.getElementById('boxM')){
		popupBox.style.display = 'block';
		popupBox.innerHTML = setLayer(dataTitle, dataMessage);
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

	boxMessage.innerHTML = setLayer(title, message);
	return document.body.appendChild(boxMessage);
};