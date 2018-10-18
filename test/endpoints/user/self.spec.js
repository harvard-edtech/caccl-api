const utils = require('../../helpers/utils.js');
const studentAPI = require('../../helpers/genStudentAPI.js')();
const studentInfo = require('../../environment.js').students[0];

describe('Endpoints > User > Self', function () {
  it('Gets the current user', function () {
    return studentAPI.user.getCurrentUser()
      .then((currentUser) => {
        const comparison = utils.checkTemplate({
          id: studentInfo.canvasId,
          name: studentInfo.first + ' ' + studentInfo.last,
          sortable_name: studentInfo.last + ', ' + studentInfo.first,
        }, currentUser);

        if (!comparison.isMatch) {
          throw new Error('The current user info we got wasn\'t what we expected:\n' + comparison.description);
        }
      });
  });
});
