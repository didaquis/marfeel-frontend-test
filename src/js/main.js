/**
 * Add listener to search form
 */
addEvtLister(document.querySelector('form'), 'submit', getResults);

/**
 * Add event listener to HTMLElement
 * @param {HTMLElement} e 
 * @param {string} type - tipe of event listener
 * @param {function} handler - callback function
 */
function addEvtLister(e, type, handler) {
	if (e.attachEvent) {
		e.attachEvent('on' + type, handler);
	} else {
		e.addEventListener(type, handler);
	}
}

/**
 * Get data using API client
 */
function getResults(event) {
	event.preventDefault();
	resetResults();
	const query = document.querySelector('#searchInput').value.trim();
	github_Api.searchUser(query, showUserData, notResults);
	github_Api.searchReposOfUser(query, showReposData, undefined);
}

/**
 * Remove previous results in browser
 */
function resetResults() {
	const noRes = document.querySelector('#no-res');
	while (noRes.firstChild) {
		noRes.removeChild(noRes.firstChild);
	}
	noRes.classList.remove('no-res');

	const userData = document.querySelector('#user-box');
	while (userData.firstChild) {
		userData.removeChild(userData.firstChild);
	}
	userData.classList.remove('user-box');

	const repos = document.querySelector('#repos-box');
	while (repos.firstChild) {
		repos.removeChild(repos.firstChild);
	}
	repos.classList.remove('repos-box');
}

/**
 * Show in browser not results found
 */
function notResults() {
	const parent = document.querySelector('#no-res');

	const div = document.createElement('div');
	addClass(div, 'alert-box');
	div.innerHTML = 'Does not exist';

	parent.appendChild(div);
	addClass(parent, 'no-res');
}

/**
 * Show in browser user retrieved
 * @param {Object} data - Results received from endpoint 
 */
function showUserData(data) {
	const parent = document.querySelector('#user-box');

	const avatar = document.createElement('img');
	addClass(avatar, 'avatar');
	avatar.src = data.avatar_url;
	parent.appendChild(avatar);

	const nickName = document.createElement('p');
	addClass(nickName, 'nickName');
	nickName.innerHTML = `@${data.login}`;
	parent.appendChild(nickName);

	const fullName = document.createElement('h1');
	addClass(fullName, 'fullName');
	fullName.innerHTML = data.name;
	parent.appendChild(fullName);

	const bio = document.createElement('p');
	addClass(bio, 'bio');
	bio.innerHTML = data.bio || '';

	parent.appendChild(bio);
	addClass(parent, 'user-box');
}

/**
 * Show in browser repositories retrieved
 * @param {Array} data - Results received from endpoint 
 */
function showReposData(data) {
	const parent = document.querySelector('#repos-box');
	const table = document.createElement('table');
	const firstRow = table.insertRow();
	firstRow.insertCell().innerHTML = 'Repositories';
	
	let row, secondCell;
	data.forEach((repo) => {
		row = table.insertRow();
		row.insertCell().innerHTML = reduceString(repo.name, 24);
		secondCell = row.insertCell();
		secondCell.innerHTML = `<img src="img/star.svg" alt="stars">&nbsp;<small>${repo.stargazers_count}</small>`;
		secondCell.innerHTML += `&nbsp;<img src="img/fork.svg" alt="forks">&nbsp;<small>${repo.forks_count}</small>`;
	});
	
	parent.appendChild(table);
	addClass(parent, 'repos-box');
}

/**
 * Add CSS class to HTMLElement
 * @param {HTMLElement} e 
 * @param {string} className 
 */
function addClass(e, className) {
	e.classList.add(className);
}

/**
 * Split sentence at specific length
 * @param {string} str - Sentence target
 * @param {integer} maxChars - Limit of length
 * @returns {string} - Sentence splited
 */
function reduceString(str,maxChars) {
	if (str.length > maxChars) {
		return `${str.substr(0,maxChars-3)}...`;
	}
	return str;
}