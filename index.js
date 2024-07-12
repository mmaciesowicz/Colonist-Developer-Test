var spans = document.querySelectorAll('span.btn-title');
var titles = document.querySelectorAll('.btn-text-top');
const letterSpacingDiff = 0.15;

async function buttonTwoAction() {
	let apiResult = await getAPIResult();
	console.log(apiResult);
	let ids = apiResult.slice(0, 5).map(item => item.id);
	console.log("First 5 room ids: " + ids);
}

async function getAPIResult() {
	let apiResult =  await sendAPIRequest().then(data => {
		return data;
	  });
	return apiResult.games;
}

async function sendAPIRequest() {
	const url = 'https://colonist.io/api/game-list';

	return await fetch(url)
    .then(response => {
		if (!response.ok) {
        	throw new Error('Error retrieving response from server.');
      	}
      	return response.json(); // This returns a promise
	})
    .catch(error => console.error('Error:', error));
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

	e.style.textShadow = "0px 0px 0.1rem black";
	marginExtraSpace(-1,letterSpacingDiff, Array.from(e));
}

function buttonMouseOut(e) {
	const titleText = e.querySelector('span.btn-title');
	const textContainer = e.querySelector('.btn-text-top');

	e.style.textShadow = "none";
	marginExtraSpace(1,letterSpacingDiff, Array.from(e));
}

// Adds/Subtracts the margin difference from when text lettering is expanded to normal
// sign is either 1/-1 and marginDifference is a number
// spans is an array of the title(s) we want to change
function marginExtraSpace(sign, marginDifference, spans) {
	const numLetters = Array.from(spans).map(span => span.innerText.length);
	var extraSpace = [];
	// Total extra space = Letter spacing difference x (number of characters - 1)
	for (let i=0; i<spans.length; i++) {
		extraSpace[i] = (marginDifference * (numLetters[i] - 1))/2;
		titles[i].style.marginLeft = String(sign * extraSpace[i]) + "em";
		titles[i].style.marginRight =String(sign * extraSpace[i]) + "em";
	}
}

marginExtraSpace(1,letterSpacingDiff, spans);