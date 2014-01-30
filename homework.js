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

function setLayer (name, text){ // Блок задания параметров popup вынесен в функцию
	return '<div class="box-title">' + name + '</div> \
			<div class="box-message">'+ text + '</div> \
			<div id="butt"><button>Да</button> \
			<button>Нет</button></div>';
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
		document.getElementById('popup').innerHTML = setLayer(dataTitle, dataMessage);
	} else{
		createPopup(dataTitle, dataMessage);
	}

	/*var b_yes = document.getElementById('butt').firstChild, Первый вариант - обратиться к кнопке черз
		b_no = document.getElementById('butt').lastChild;     родителя кнопок, div*/

	var b_yes = document.getElementsByTagName('button')[0], //Второй вариант - обращение к кнопкам 
		b_no = document.getElementsByTagName('button')[1];	//напрямую, через тег.

	b_yes.addEventListener('click',function(){
		return location.assign(link);
	}, false);

	b_no.addEventListener('click', function(){ 
		return document.getElementById('popup').style.display = 'none'
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
	boxMessage.id = 'popup';
	return document.body.appendChild(boxMessage);
};