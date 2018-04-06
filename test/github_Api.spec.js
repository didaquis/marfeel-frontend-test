
describe('github_Api', () => {

	describe('github_Api will be load', () => {

		it('should load object', () => {
			expect(typeof github_Api).toBe('object');
		});

		it('should load functions', () => {
			expect(typeof github_Api.searchReposOfUser).toBe('function');
			expect(typeof github_Api.searchUser).toBe('function');
		});
	});


	describe('should receive data of user', function() {
		let result;
		beforeEach(function(done) {
			github_Api.searchUser(
				'didaquis', 
				(res) => {
					result = res;
					done();
				},
				() => done());
		});

		it('we receive data', function() {
			expect(result).not.toBeUndefined();
		});
	});


	describe('should receive data of repos', function() {
		let results;
		beforeEach(function(done) {
			github_Api.searchReposOfUser(
				'didaquis', 
				(res) => {
					results = res;
					done();
				},
				() => done());
		});

		it('we receive data', function() {
			expect(results).not.toBeUndefined();
		});

		it('we expect results with length greater than 0', function() {
			expect(results.length > 0).toBeTruthy();
		});
	});
});
