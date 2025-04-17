const Task = require('../models/task.model');

const getSingleTaskById = (id) => {
    return Task.findById(id);
}

const getSingleTask = (data) => {
    return Task.findOne(data);
}

const getAllTask = (data) => {
    return Task.aggregate([
        // { $limit : 4 } 
        // { $unwind: "$tags" }   
        // { $addFields: { overdue: { $cond: { if: { $lt: ["$dueDate", new Date()] }, then: true, else: false } } } },
        { $addFields: { overdue: new Date('2024-02-23') } }
    ]);
}

const saveTask = (req, id = null) => {
    const { name, description, expire_date } = req.body;
    if (id) {
        var task = getSingleTaskById(id);
        if (!task) return false;
    }else {
        var task = new Task;
        // task.createdBy = req.user.id;
    }
    task.name = name;
    task.description = description;
    task.expireDate = expire_date;
    return task.save();
}

module.exports = { getSingleTaskById, getSingleTask, getAllTask, saveTask }