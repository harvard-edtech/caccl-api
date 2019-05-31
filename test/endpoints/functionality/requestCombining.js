const genInstructorAPI = require('../../common/genInstructorAPI.js');

describe('Endpoints > Functionality > Request Combining', function () {
  it('Combines simultaneous requests to the same endpoint', function () {
    this.timeout(50000);

    // Create a process:
    const apiCombined = genInstructorAPI({ cacheType: 'memory' });
    const apiNotCombined = genInstructorAPI({ cacheType: 'memory' });
    const compareProcess = () => {
      const requests = [];
      const combinedRequests = [];
      for (let i = 0; i < 300; i++) {
        requests.push(apiCombined.user.self.getProfile({
          disableRequestCombining: true,
        }));
        combinedRequests.push(apiNotCombined.user.self.getProfile());
      }

      return Promise.all([
        Promise.all(combinedRequests).then(() => { return Date.now(); }),
        Promise.all(requests).then(() => { return Date.now(); }),
      ]).then((times) => {
        const [timeCombined, timeNotCombined] = times;
        const diff = timeNotCombined - timeCombined;

        if (diff <= 0) {
          throw new Error('Time combined was not faster');
        } else if (diff < 500) {
          throw new Error('Time combined was not more than 500ms faster');
        }
      });
    };

    // Run this process 3 times to be sure:
    return compareProcess();
  });
});
