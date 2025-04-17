const { getSingleUserById } = require('../dbServices/user.dbService');
const { getAllTask, saveTask } = require('../dbServices/task.dbService');
const {  differenceInMilliseconds } = require('date-fns');
const Task = require('../models/task.model');

const getTaskService = async (req) => {
    // const user = await getSingleUserById(req.user.id);
    // if (user.role == 'super-admin') var tasks = await getAllTask({ createdBy: {$ne: user.id }});
    const tasks = await getAllTask();
    
    return tasks;
}

const saveTaskService = async (req) => {
    const { id } = req.body;
    if (id) {
        saveTask(req, id);
        var message = 'Task update successfully';
    } else {
        saveTask(req);
        message = 'Task create successfully';
    }

    return message;
}

const deleteTaskService = async (req) => {
    const task = await Task.findByIdAndDelete(req.body.id);
    if (!task) return false;

    return 'Task deleted successfully';
}

const getNotificationService = async (req) => {
    const tasks = await getAllTask({ createdBy: req.user.id });
    let limit = req.params.limit ? req.params.limit : 5;
    let getTask = tasks.slice(0, limit);

    let result = getTask.map(task => {
        let createdDate = new Date(task.createdAt);
        let expireDate = new Date(task.expireDate);
        const diffMilliseconds = differenceInMilliseconds(expireDate, createdDate);
    
        const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);
    
        let remainingTime = '';
        if (diffDays > 0) remainingTime += diffDays + ' Day(s) ';
        if (diffHours > 0) remainingTime += diffHours + ':';
        if (diffMinutes > 0) remainingTime += diffMinutes + ':';
        if (diffSeconds > 0) remainingTime += diffSeconds;
    
        return { task, remainingTime: remainingTime.trim() };
    });
    
    return result;
}

module.exports = { saveTaskService, getTaskService, deleteTaskService, getNotificationService };