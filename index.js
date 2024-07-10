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
