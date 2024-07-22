import { v4 as uuid } from 'uuid';
import validate from "../utils/validate.js";

const tasksList = [];

export default {
  getTasks(req, res) {
    try {
      const errors = validate.getTasks(req);

      if (errors.haveErrors) {
        res.status(422).json({
          errors: errors.fields,
          message: 'Validation error',
        });
        return;
      }

      const {
        page = 1
      } = req.query;

      let list = [...tasksList];

      list.sort((a, b) => {
        return new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime();
      });

      const limit = 10;
      const maxPageCount = Math.ceil(list.length / limit);

      if(+page > maxPageCount) {
        res.status(422).json({
          message: 'Invalid page number',
        });
        return;
      }

      const offset = (page - 1) * limit;
      const endOffset = offset + limit;

      list = list.slice(offset, endOffset);

      res.status(200).json({
        message: 'tasks list',
        list,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: e.message,
      })
    }
  },

  createTask(req, res) {
    try {
      const errors = validate.createTask(req);

      if (errors.haveErrors) {
        res.status(422).json({
          errors: errors.fields,
          message: 'Validation error',
        });
        return;
      }

      const {
        title,
        description,
        taskDate,
      } = req.body;

      const allowToCreate = checkTaskDate(taskDate);

      if (!allowToCreate) {
        res.status(422).json({
          message: 'You can create a task for same day max 3 times.',
        });
        return;
      }

      const newTask = {
        id: uuid(),
        title,
        description,
        taskDate,
        completed: false,
      }

      tasksList.push(newTask);

      res.status(200).json({
        message: 'Task successfully created',
        tasksList,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: e.message,
      })
    }
  }
}


function checkTaskDate(taskDate) {
  let count = 0;

  tasksList.forEach((task) => {
    if (task.taskDate === taskDate) {
      count++;
    }
  });

  return count < 3;
}
