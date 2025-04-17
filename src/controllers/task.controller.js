const { saveTaskService, getTaskService, deleteTaskService, getNotificationService } = require('../services/task.service');
const { validator, successStatus, errorStatus } = require('../helpers/helper');

const getTask = async (req, res) => {
    try {
        let result = await getTaskService(req);
        if (result) {
            successStatus(res, result);
        }else {
            errorStatus(res, 404, 'Task not found');
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const saveTask = async (req, res) => {
    try {
        if (!validator(req, res)) {
            const result = await saveTaskService(req);
            if (result) {
                successStatus(res, result);
            }else {
                errorStatus(res, 404, 'Task not found');
            }
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const deleteTask = async (req, res) => {
    try {
        let result = await deleteTaskService(req);
        if (result) {
            successStatus(res, result);
        }else {
            errorStatus(res, 404, 'Task not found');
        }
    }catch (error) {
        errorStatus(res, 500, 'Internal server error');
    }
}

const getNotification = async (req, res) => {
    try {
        let result = await getNotificationService(req);
        if (result) {
            successStatus(res, result);
        }
    }catch (error) {
        errorStatus(res, 500, 'Inernal server error', error.message);
    }
}

module.exports = { getTask, saveTask, deleteTask, getNotification, getNotificationService };