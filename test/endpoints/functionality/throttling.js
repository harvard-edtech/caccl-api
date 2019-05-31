const genInstructorAPI = require('../../common/genInstructorAPI.js');

describe('Endpoints > Functionality > Throttling', function () {
  it('Retries throttled requests', function () {
    this.timeout(50000);

    const api = genInstructorAPI();

    // Queue 100 requests (we know that this will be throttled)
    const requests = [];
    for (let i = 0; i < 100; i++) {
      requests.push(api.user.self.getProfile());
    }

    // Make sure all 100 requests eventually resolve
    return Promise.all(requests);
  });
});
