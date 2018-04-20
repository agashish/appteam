const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    task_name: {
        require: true,
        unique: 1,
        minlength: 1,
        maxlength: 100,
        type: String
    },
    user_id: {
        require: true,
        type: Number
    },
    project_id: {
        type: Number,
        default: 0
    },
    task_id: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    is_deleted: {
        type: Number,
        default: 1
    },
    date: {
        type: date 
    }
})

/*//#### SAVE THROUGH USER MODEL
            $taskModel->task_name = trim($task_name);
            $taskModel->user_id = $this->user()->id;
            $taskModel->project_id = 0;
            $taskModel->task_id = 0;
            $taskModel->status = 1;
            $taskModel->is_deleted = 1;
            $taskModel->date = date('Y-m-d');*/