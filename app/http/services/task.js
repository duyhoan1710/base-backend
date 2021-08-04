const { transaction } = require('objection');

const { abort } = require('../../helpers/error');
const { Task, User } = require('../../models');
const taskStatus = require('../../enums/taskStatus');

exports.create = async ({
  userId,
  title,
  description,
}) => {
  try {
    await transaction(Task, User, async (TaskTransaction, UserTransaction) => {
      await TaskTransaction.query().insert({
        user_id: userId,
        title,
        description,
        status: taskStatus.OPEN,
      });

      await UserTransaction.query()
        .findOne('id', userId)
        .increment('task_count', 1);
    });
    return '';
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

exports.update = async ({
  userId,
  taskId,
  title,
  description,
  status,
}) => {
  const task = await Task.query().findById(taskId);

  if (!task) return abort(400, 'Task is not already exists');
  if (task.user_id !== userId) return abort(403, 'Access denied');

  await task.$query()
    .update({
      title,
      description,
      status,
    });
  return '';
};

exports.getList = async ({
  userId,
  status,
  limit,
  offset,
}) => {
  let result;
  try {
    const tasks = await Task.query()
      .where({ user_id: userId, status })
      .select('id', 'title', 'description', 'status')
      .offset(offset)
      .limit(limit)
      .orderBy('id', 'DESC');

    const { task_count: total } = await User.query()
      .findOne('id', userId)
      .select('task_count');
    result = {
      tasks,
      total,
      offset,
      limit,
    };
  } catch (error) {
    return abort(400, 'Params Error');
  }
  return result;
};

exports.remove = async ({ userId, taskId }) => {
  const task = await Task.query().findById(taskId);

  if (!task) return abort(400, 'Task is not already exists');
  if (task.user_id !== userId) return abort(403, 'Access denied');

  try {
    await transaction(Task, User, async (TaskTransaction, UserTransaction) => {
      await TaskTransaction.query().deleteById(taskId);

      await UserTransaction.query()
        .findOne('id', userId)
        .decrement('task_count', 1);
    });
    return '';
  } catch (error) {
    return abort(400, 'Params Error');
  }
};
