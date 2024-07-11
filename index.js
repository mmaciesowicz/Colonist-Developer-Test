function buttonTwoAction() {
	let apiResult = getAPIResult();
}

function getAPIResult() {
	return 'resultPlaceholder';
}

function buttonOneAction() {
	window.location.href = generateRoomURL();
}

function generateRoomURL() {
	roomID = generateRoomID();
	return "https://colonist.io/#" + roomID;
}

function generateRoomID(numChars = 4) {
 return Math.random().toString(36).substring(2,numChars+2);
}

function buttonMouseOver(e) {
	const titleText = e.querySelector('span.btn-title');
	const textContainer = e.querySelector('.btn-text-top');

	// increase title spacing animation on hover
	titleText.style.letterSpacing = '0.2em';
	e.style.textShadow = "0px 0px 0.1rem black";
}

function buttonMouseOut(e) {
	const titleText = e.querySelector('span.btn-title');
	const textContainer = e.querySelector('.btn-text-top');

	titleText.style.letterSpacing = '0.1em';
	e.style.textShadow = "none";
}