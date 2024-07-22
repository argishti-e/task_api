export default {
  getTasks(req) {
    const {
      page = 1,
    } = req.query;

    const fields = {};

    if (!/^\d{1,99999}$/.test(page) || +page < 1) {
      fields.page = 'Invalid page param: integer min 1 max 99999';
    }

    return {
      fields,
      haveErrors: Object.keys(fields).length > 0
    };
  },

  createTask(req) {
    const {
      title = null,
      description = null,
      taskDate = null,
    } = req.body;

    const titleAndDescRegex = /^([a-zA-Z0-9]( )?)+$/;
    const dateRegex = /^20\d{2}-\d{2}-\d{2}$/;

    const fields = {}

    if (!title || title.length < 3 || title.length > 100) {
      fields.title = 'Title field is required (min 3, max 100 characters)';
    } else if (!titleAndDescRegex.test(title)) {
      fields.title = 'Invalid title value allow only text, number and space (max space count between word are one space)'
    }

    if (!description || description.length < 3 || description.length > 5000) {
      fields.description = 'Description field is required (min 3, max 5000 characters)';
    } else if (!titleAndDescRegex.test(description)) {
      fields.description = 'Invalid description value allow only text, number and space (max space count between word are one space)'
    }

    if (!dateRegex.test(taskDate)) {
      fields.taskDate = 'Invalid date format: YYYY-mm-dd';
    } else if (new Date() > new Date(taskDate)) {
      fields.taskDate = 'Pls provide date in future';
    }

    return {
      fields,
      haveErrors: Object.keys(fields).length > 0
    };
  }
}
