/**
 * GitHub API client
 */
let github_Api;

(function() {
	'use strict';

	/**
	 * Make a request to GitHub public API
	 * @param {string} URL of endpoint
	 * @param {Function} Function for handle success request
	 * @param {Function} Function for handle errors
	 * @returns {Promise<Response>} Data received from endpoint
	 * @throws {string} If something go wrong
	 */
	function call(url, handleSuccess, handleError) {
		Promise.resolve()
			.then(() => {
				return fetch(url);
			})
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					throw new Error(res.status);
				}
			})
			.then(handleSuccess)
			.catch(handleError);
	}

	github_Api = {
		/**
		 * Main URL of endpoint
		 */
		baseUrl: 'https://api.github.com/',

		/**
		 * Search user
		 * @param {string} query - User to search
		 * @param {Function} handleResults - Handles the results
		 * @param {Function} handleError - Handles an error
		 */
		searchUser: function(query, handleResults, handleError) {
			call(
				this.baseUrl + 'users/' + query,
				results => handleResults(results),
				handleError
			);
		},

		/**
		 * Search repos of user
		 * @param {string} query - User to search
		 * @param {Function} handleResults - Handles the results
		 * @param {Function} handleError - Handles an error
		 */
		searchReposOfUser: function(query, handleResults, handleError) {
			call(
				this.baseUrl + 'users/' + query + '/repos',
				results => handleResults(results),
				handleError
			);
		}
	};

})();
