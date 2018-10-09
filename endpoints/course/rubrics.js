module.exports = [

  /**
   * Creates a new rubric
   * @param {number} courseId - Canvas course Id to get info on
   * @return Course (see: https://canvas.instructure.com/doc/api/courses.html#Course)
   */
  {
    name: 'createRubric',
    action: 'create a new rubric in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '',
        method: 'GET',
        params: {
        },
      });
    },
  },

];
