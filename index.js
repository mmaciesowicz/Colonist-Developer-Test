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