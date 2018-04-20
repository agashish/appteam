/**
 * Created by noida office on 3/26/2018.
 */

//import CustomWork from './common_classes';

class CustomWork {

    //#### CUSTOM DATE SAVE FOR TASK
    fromToDateSaveForTask(startDate, endDate, taskID) {
        const Data = {
            startDate: startDate,
            endDate: endDate,
            taskID: taskID
        }

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/task/update/daterange',
            type: 'post',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'myteam-new-at-task',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            addInput: false,
        }

        //params : data
        //params : func
        sendData(Data, funcOptions)
    }

}

//####################### ES6 CLASS FEATURES ############################
class CommonFunctionClass extends CustomWork {

    //#### FOR INHERITS
    constructor(){
        super()
    }

    //#### INVOKE TO OPEN MODAL BOX FOR TEAM
    openStaffModal(){
    
        //grab all fields values and arrange to send to serve by our controller
        const userData = null

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/model/form/user',
            type: 'post',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'modal-content',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {
                modelDomTitle: '#exampleModalLabel',
                modelDomContent: '.modal-content',
                modelDomTitleText: 'Add Team Member'
            },
            ajaxModel: true
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        sendData(userData, funcOptions)

    }

    //#### ADD NEW STAFF BY MODAL
    addNewStaff() {

        //grab all fields values and arrange to send to serve by our controller
        const userData = JSON.stringify({
            firstname: $('#firstname').val(),
            email: $('#email').val()
        })
        
        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/add/user',
            type: 'POST',
            dataType: 'json',
            beforeSend: false,
            contentType: 'application/json',
            data: true,
            responseBack: 'staff_menu_list',
            selector: '.', // . | #
            domElem: 'ul'
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        var sendDataResponse = sendData(userData, funcOptions)

        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const userDataList = null

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/user/list',
            type: 'GET',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'staff_menu_list',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            domManipulation: true,
            domClick: 'ul.team li a',
            domCloseClass: '.close',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false
        }

        if(parseInt(sendDataResponse) == 200){
            sendData(userDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }

    }


    //#### OPEN MODAL FOR CATEGORY ADD
    openCategoryModal() {

        //grab all fields values and arrange to send to serve by our controller
        const userData = null

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/model/form/category',
            type: 'post',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'modal-content',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {
                modelDomTitle: '#categoryModalLabel',
                modelDomContent: '.modal-content',
                modelDomTitleText: 'Add New Category'
            },
            ajaxModel: true
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        //params : cb
        sendData(userData, funcOptions, (err, response) => {

            //#### BEFORE TRIGGER AJAX, FLUSH HTML IF IT WAS BEFORE ADDED
            $('.modal-content').html()
            $('#categoryModalLabel').html()

            if(err) {
                $('#categoryModalLabel').html('Error occurred ... ')
                $('.modal-content').html(err)
            }

            //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
            //params : data
            //params : func
            sendData(userData, funcOptions)

        })
    }

    //#### ADD CATEGORY
    addCategory() {

        //grab all fields values and arrange to send to serve by our controller
        const categoryData = JSON.stringify({
            category_name: $('#category_name').val()
        })

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/add/category',
            type: 'POST',
            dataType: 'json',
            beforeSend: false,
            contentType: 'application/json',
            data: true,
            responseBack: 'category_list',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            responseBool: false
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        var sendDataResponse = sendData(categoryData, funcOptions)
        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const userDataList = null

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/category/list',
            type: 'GET',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'category_list',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            domManipulation: true,
            domClick: 'ul.category li a',
            domCloseClass: '.close',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false
        }

        if(parseInt(sendDataResponse) == 200){
            sendData(userDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }

    }

    openProjectModal() {

        //grab all fields values and arrange to send to serve by our controller
        var userData = null

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/model/form/project',
            type: 'post',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'modal-content',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {
                modelDomTitle: '#projectModalLabel',
                modelDomContent: '.modal-content',
                modelDomTitleText: 'Add New Project'
            },
            ajaxModel: true
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        sendData(userData, funcOptions)

    }
    
    addProject() {

        //grab all fields values and arrange to send to serve by our controller
        const categoryData = JSON.stringify({
            name: $('#name').val()
        })

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/add/project',
            type: 'POST',
            dataType: 'json',
            beforeSend: false,
            contentType: 'application/json',
            data: true,
            responseBack: 'prj_all',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            responseBool: false
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        var sendDataResponse = sendData(categoryData, funcOptions)
        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const userDataList = null

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/project/list',
            type: 'GET',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'prj_all',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            domManipulation: true,
            domClick: 'ul.projectsAll li a',
            domCloseClass: '.close',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false
        }

        if(parseInt(sendDataResponse) == 200){
            sendData(userDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }

    }

    //#### OPEN INPUT BOX TO ADD NEW TASK
    openInputForAddTask() {

        //grab all fields values and arrange to send to serve by our controller
        const userData = null

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/task/add/input',
            type: 'post',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'myteam-new-at-task',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            addInput: true,
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            rmvSelector: {
                origClassClicked: 'myteam-advpTask',
                origClassSelector: '.'
            }
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        sendData(userData, funcOptions)

    }

    //#### INVOKE SAVE NEW TASK BY DEFAULT
    addNewTaskOnClick(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = JSON.stringify({
            task_name: ref.val()
        })

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/add/new/task',
            type: 'post',
            dataType: 'json',
            beforeSend: false,
            contentType: 'application/json',
            data: true,
            responseBack: 'myteam-new-at-task',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            addInput: false,
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            rmvSelector: {}
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        var getTaskResponse = sendData(taskData, funcOptions)

        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const TaskDataList = null

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/tasks/list',
            type: 'GET',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'taskList',
            selector: '.', // . | #
            domElem: 'ul', //span , div, etc
            domManipulation: false,
            domClick: 'ul.projectsAll li a',
            domCloseClass: '.close',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: true
        }

        if(parseInt(getTaskResponse) == 200){

            //#### INVOKE AUTO RENDER
            this.autoRender()

            //#### INVOKE SEND DATA
            //sendData(TaskDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }
    }

    //#### AUTO CLICK AND RENDER
    autoRender() {
        $('.auto_rend').trigger('click');
    }

    //#### GET TASK DETAIL VIEW WHEN RECEIVE TASK ID FROM MIDDLE PANEL
    requestForTaskDetail(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller

        const taskData = {
            id: ref.data('id')
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/tasks/detail',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'myteam-task-details-up',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: true
        }

        sendData(taskData,funcOptionsUserList)
    }

    //#### INVOKE GET USER LIST BY DEFAULT
    requestForAssignUserList(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            id: ref.attr('data-task-id')
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/assign/user/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'users',
            selector: '#', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false,
            nonAssgnUser: true,
            nonAssgnUserList: {
                manipulateNow: true,
                customClass: '.myteam-dropdown-box'
            }
        }

        sendData(taskData,funcOptionsUserList)
    }

    //#### INVOKE ASIGN USER TASK BY DEFAULT
    requestAssignUserToTask(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            id: ref.data('ut-id'),
            task_id: $('div.my_team_add_team').attr('data-tt-dflt')
        }

        //function options for common ajax
        const funcOptionsUser = {
            url: '/dashboard/assign/user/task',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            async: false,
            responseBack: 'my_team_add_team',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false
        }

        var getTaskResponse = sendData(taskData, funcOptionsUser)
        this.refreshAssignUserListToTask(getTaskResponse)

    }

    requestUpdateDescriptionByTaskId(refHtml) {
        //console.log(decodeURIComponent(refHtml))
        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            id: $('div.my_team_add_team').data('tt-dflt'),
            description: decodeURIComponent(refHtml)
        }

        //function options for common ajax
        const funcOptionsUser = {
            url: '/dashboard/update/task/description',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: '',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false,
            descriptionResponse: false,
            responseTick:''
        }
        sendData(taskData, funcOptionsUser)
    }

    //#### INVOKE SAVE NEW NOTE BY TASK ID
    saveNote(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            id: $('div.my_team_add_team').data('tt-dflt'),
            comment: ref.val()
        }

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/task/add/notes',
            type: 'post',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: '',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            addInput: false,
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            rmvSelector: {}
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        var getTaskResponse = sendData(taskData, funcOptions)

        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const NotesDataList = {
            id: $('div.my_team_add_team').data('tt-dflt'),
        }

        //function options for common ajax
        const funcOptionsNoteList = {
            url: '/dashboard/task/notes/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'tk-ntts',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false,
            notesDisplay: true
        }

        if(parseInt(getTaskResponse) == 200){

            //#### INVOKE SEND DATA
            sendData(NotesDataList, funcOptionsNoteList )

            //#### REMOVE COMMENT TEXT
            ref.val('')
            return false
        } else {
            console.log('error invoked')
            return false
        }
    }

    //#### INVOKE GET USER LIST BY DEFAULT
    getSerachResultFromHeadSrch(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            searchText: ref
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/search/result/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'srch-rslt',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false,
            nonAssgnUser: false,
            searchRefresh: true
        }

        sendData(taskData,funcOptionsUserList)
        //#### SHOW THE SEARCH BOX AFTER GETTING RESULT OR NOT
        $('div.myteam-dropdown-box-search').show()
    }

    //#### INVOKE GET PROJECT LIST BY DEFAULT
    requestForProjectList(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller

        const taskData = {
            id: ref.attr('data-task-id')
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/task/project/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'projectList',
            selector: '#', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false,
            nonAssgnProjects: true
        }

        sendData(taskData,funcOptionsUserList)
    }


    //REQUEST FOR DELETE ASSIGNED USER
    requestForDeleteAssignedUser(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const assignedUserID = {
            id: ref.attr('data-id')
        }

        //function options for common ajax
        const funcDeleteAssignedUserDelete = {
            url: '/dashboard/task/assigned/user/delete',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'assignee-name',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            ajaxModel: false
        }

        var response = sendData(assignedUserID,funcDeleteAssignedUserDelete)
        this.refreshAssignUserListToTask(response)
    }

    //#### REFRESH ASSIGN USER LIST
    refreshAssignUserListToTask(getTaskResponse) {
        //#### GET THE USER LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const TaskDataList = {
            task_id: $('div.my_team_add_team').attr('data-tt-dflt')
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/assigned/user/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'my_team_add_team',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: true,
            refereshAssignUserList: true
        }

        if(parseInt(getTaskResponse) == 200){
            //#### INVOKE SEND DATA
            sendData(TaskDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }
    }

    //REQUEST FOR DELETE ASSIGNED PROJECT
    requestForDeleteAssignedProject(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const assignedProjectID = {
            id: ref.attr('data-id')
        }

        //function options for common ajax
        const funcDeleteAssignedProject = {
            url: '/dashboard/task/assigned/project/delete',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: '',
            selector: '', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            ajaxModel: false
        }

        var response = sendData(assignedProjectID, funcDeleteAssignedProject)

        this.refreshAssignProjectListToTask(response)
    }

    //#### INVOKE ASIGN PROJECT TASK BY DEFAULT
    requestAssignProjectToTask(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const taskData = {
            id: ref.data('ut-id'),
            task_id: $('div.my_team_add_project').attr('data-tp-dflt')
        }

        //function options for common ajax
        const funcOptionsUser = {
            url: '/dashboard/assign/project/task',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            async: false,
            responseBack: 'my_team_add_project',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            taskList: false
        }

        var response = sendData(taskData, funcOptionsUser)
        this.refreshAssignProjectListToTask(response)

    }

    //#### REFRESH ASSIGN PROJECT LIST
    refreshAssignProjectListToTask(getTaskResponse) {
        //#### GET THE PROJECT LIST
        //#### ADD HTML TYPE TO SET THE DATA AGAIN
        const TaskDataList = {
            task_id: $('div.my_team_add_project').attr('data-tp-dflt')
        }

        //function options for common ajax
        const funcOptionsUserList = {
            url: '/dashboard/assigned/project/list',
            type: 'POST',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'my_team_add_project',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            domClick: '',
            domCloseClass: '',
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {},
            ajaxModel: false,
            refereshAssignProjectList: true
        }

        if(parseInt(getTaskResponse) == 200){
            //#### INVOKE SEND DATA
            sendData(TaskDataList, funcOptionsUserList)
            return false
        } else {
            console.log('error invoked')
            return false
        }
    }


    //REQUEST FOR CHANGE STATUS OF TASK // '0>deactive, 1>active, 2>Complete, 3>Deferred, 4>Cancelled'
    requestForTaskChangeStatus(ref) {

        //#### INVOKE SEND DATA THROUGH DEFAULT OPTIONS
        //grab all fields values and arrange to send to serve by our controller
        const TaskData = {
            status: ref.val(),
            task_id: $('div.my_team_add_project').attr('data-tp-dflt')
        }

        //function options for common ajax
        const funcTaskChangeStatus = {
            url: '/dashboard/task/update/status',
            type: 'POST',
            dataType: '',
            beforeSend: false,
            contentType: '',
            data: true,
            responseBack: 'assignee-name',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            domManipulation: false,
            ajaxModel: false
        }

        sendData(TaskData,funcTaskChangeStatus)
    }
}





