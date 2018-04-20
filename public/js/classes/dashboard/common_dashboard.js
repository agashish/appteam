/**
 * Created by noida office on 3/14/2018.
 */

//CUSTOM DEFAULT HIDE ELEMENT FUNCTION
let hileDefaultElem = () => {
    $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
    $('.myteam-dropdown-box').find('.myteam-contacts-userpicker').hide()
    $('div.myteam-dropdown-box-search').hide()
    $('div.myteam-dropdown-box-search').find('ul.list-serach').html('')
}

$(function(){

    //#### DEFAULT HIDE ELEMENTS
    hileDefaultElem()

    //#### SET CSRF TOKEN INTO AJAX REQUEST
    $.ajaxSetup({
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //############# CALL DYNAMIC BLADE CONTENT INTO MODAL BOX
    $( document ).on('click', '.staff_create', function(){

        //#### JUST MAKE THE REQUEST TO OPEN MOADL BOX FOR STAFF POPUP
        (new CommonFunctionClass()).openStaffModal()

    })

    //############# SEND DATA TO SERVER TO ADD 
    $( document ).on('click', '.staff_add', function(){

        //#### JUST MAKE THE REQUEST TO OPEN MOADL BOX FOR STAFF POPUP
        (new CommonFunctionClass()).addNewStaff()

    })

    //############# CALL DYNAMIC BLADE CONTENT INTO MODAL BOX
    $( document ).on('click', '.category_create', function(){

        //#### JUST MAKE THE REQUEST TO OPEN MOADL BOX FOR CATEGORY POPUP
        (new CommonFunctionClass()).openCategoryModal()

    })
    
    //######### ADD USER FORM BY AJAX
    $( document ).on('click','.category_add_new' , function() {
        (new CommonFunctionClass()).addCategory()
    })

    //############# CALL DYNAMIC BLADE CONTENT INTO MODAL BOX
    $( document ).on('click', '.project_create', function(){
        (new CommonFunctionClass()).openProjectModal()        
    })

    //#### ADD NEW {PROJECT}
    $( document ).on('click', '.project_add', function(){
       (new CommonFunctionClass()).addProject()
    })

    //#### ADD NEW TASK AND ADD INPUT BOX
    $( "li.myteam-advpTask" ).on('click' , () => {
        (new CommonFunctionClass()).openInputForAddTask()
    })

    //#### IF USER CLICK SOMEWHERE EXCEPT INPUT BOX THEN WILL REVERT IT BACK INSTANTLY
    $('body').click((evt) => {
        if(!$(evt.target).is('.task_name_input')) {
            //event handling code
            $( "li.myteam-advpTask-input" ).not( ".myteam-advpTask" ).find('span.myteam-new-at-task').html('Add New Task')
            $( "li.myteam-advpTask-input" ).not( ".myteam-advpTask" ).addClass('myteam-advpTask').removeClass('myteam-advpTask-input')

        }
        else {

            $('#task_name').keydown(function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();

                    //SAVE ON CLICK ENTER AND SAVE A NEW TASK WITH DEFAULT OPTIONS
                    (new CommonFunctionClass()).addNewTaskOnClick($(this))
                }
            });
        }
    })

    //#### JUST CLICK INVOKINGS
    $("body").on('click','ul li.myteam-task-row',function(){
        (new CommonFunctionClass()).requestForTaskDetail($(this))
    })

    //#### CLICK EVENT ON TEAM ASSIGN DROWDOWN
    $("body").on('click','div.my_team_plus',function(){

        //FOR PRECAUTION
        //#### BLANK HTML
        $('.myteam-dropdown-box').find('ul.list').html('')
        $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
        $('.myteam-dropdown-box').find('.myteam-contacts-userpicker-usr-lst').hide()

        if($('.myteam-dropdown-box span').hasClass('on')){
            $('.myteam-dropdown-box span.on').addClass('off').removeClass('on')
        }

        //#### CHECK VISIBILITY HIDDEN OR NOT
        if($('.myteam-dropdown-box span').hasClass('off'))
        {
            //TRIGGER AJAX
            (new CommonFunctionClass()).requestForAssignUserList($(this))

            setTimeout(() => {
                $('.myteam-dropdown-box').find('.myteam-seacrh-box').show()
                $('.myteam-dropdown-box').find('.myteam-contacts-userpicker-usr-lst').show()
                $('.myteam-dropdown-box .off').addClass('on').removeClass('off')
            }, 500)
        }
        else
        {
            //#### BLANK HTML
            $('.myteam-dropdown-box').find('ul.list').html('')
            $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
            $('.myteam-dropdown-box').find('.myteam-contacts-userpicker-usr-lst').hide()

            if($('.myteam-dropdown-box span').hasClass('on')){
                $('.myteam-dropdown-box span.on').addClass('off').removeClass('on')
            }
        }
    })

    //#### CLICK EVENT ON PROJECT LIST
     $("body").on('click','.chs-tsk-dls-prj-nm-anchor',function(){
         //#### FOR PRECAUTION
         //#### BLANK HTML
         $('.myteam-dropdown-box-prj_off').find('ul.list').html('')
         $('.myteam-dropdown-box-prj_off').find('.myteam-seacrh-box-project').hide()
         $('.myteam-dropdown-box-prj_off').find('.myteam-contacts-userpicker-project-list').hide()

         if($('.myteam-dropdown-box-prj_off span').hasClass('on')){
             $('.myteam-dropdown-box-prj_off span.on').addClass('off').removeClass('on')
         }


         //#### CHECK VISIBILITY HIDDEN OR NOT
         if($('.myteam-dropdown-box-prj_off span').hasClass('off'))
         {
             //#### REMOVE PREV HTML SOURCE FROM WEB
             (new CommonFunctionClass()).requestForProjectList($(this))

             setTimeout(() => {
                 $('.myteam-dropdown-box-prj_off').find('.myteam-seacrh-box-project').show()
                 $('.myteam-dropdown-box-prj_off').find('.myteam-contacts-userpicker-project-list').show()
                 $('.myteam-dropdown-box-prj_off .off').addClass('on').removeClass('off')
             }, 500)
         }
         else
         {
             //#### BLANK HTML
             $('.myteam-dropdown-box-prj_off').find('ul.list').html('')
             $('.myteam-dropdown-box-prj_off').find('.myteam-seacrh-box-project').hide()
             $('.myteam-dropdown-box-prj_off').find('.myteam-contacts-userpicker-project-list').hide()

             if($('.myteam-dropdown-box-prj_off span').hasClass('on')){
                 $('.myteam-dropdown-box-prj_off span.on').addClass('off').removeClass('on')
             }
         }
     })

    //#### SAVE THE COMMENT
    $('body').click((evt) => {
        if(!$(evt.target).is('.team-task-comment')) {
            //event handling code
        }
        else {

            $('.team-task-comment').keydown(function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();

                    //SAVE ON CLICK ENTER AND SAVE A NEW TASK WITH DEFAULT OPTIONS
                    //(new CommonFunctionClass()).addNewTaskOnClick($(this))
                    alert('invoked pressed')
                }
            });
        }
    })

    //#### SELECT NON ASSIGN USER FOR TASK
    $("body").on('click','ul li.assgn-user-select',function(){
        (new CommonFunctionClass()).requestAssignUserToTask($(this))

        //#### REMOVE AND HIDE USER SELECT DROPDOWN WITH INPUT BOX
        $('.myteam-dropdown-box').find('ul.list').html('')
        $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
        $('.myteam-dropdown-box').find('.myteam-contacts-userpicker-usr-lst').hide()

        if($('.myteam-dropdown-box span').hasClass('on')){
            $('.myteam-dropdown-box span.on').addClass('off').removeClass('on')
        }

    })

    //#### SELECT NON ASSIGN FOLDER FOR TASK
    $("body").on('click','ul li.assgn-proj-select',function(){
        (new CommonFunctionClass()).requestAssignProjectToTask($(this))

        //#### REMOVE AND HIDE USER SELECT DROPDOWN WITH INPUT BOX
        $('.myteam-dropdown-box-prj_off').find('ul.list').html('')
        $('.myteam-dropdown-box-prj_off').find('.myteam-seacrh-box-project').hide()
        $('.myteam-dropdown-box-prj_off').find('.myteam-contacts-userpicker-project-list').hide()

        if($('.myteam-dropdown-box-prj_off span').hasClass('on')){
            $('.myteam-dropdown-box-prj_off span.on').addClass('off').removeClass('on')
        }

    })

    //#### SAVE NOTES FOR TASK
    $('body').click((evt) => {
        if(!$(evt.target).is('.team-sv-ntt')) {
            //event handling code
        }
        else {

            $('.team-sv-ntt').keydown(function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    //alert('yep')
                    //SAVE ON CLICK ENTER AND SAVE A NEW TASK WITH DEFAULT OPTIONS
                    (new CommonFunctionClass()).saveNote($(this))
                }
            });
        }
    })

    //#### SEARCH INTO TASK AND COMMENT
    //#### SAVE NOTES FOR TASK
    $('body').click((evt) => {
        if(!$(evt.target).is('.team-srch-tt-cmnt')) {
            //event handling code
            //hide and remove serach list
            $('div.myteam-dropdown-box-search').hide()
            $('div.myteam-dropdown-box-search').find('ul.list-serach').html('')
        }
        else {

            $('.team-srch-tt-cmnt').keydown(function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();

                    //#### GET SEARCH RESULT AFTER PRESSING ENTER TOO
                    $('div.myteam-dropdown-box-search').hide()
                    $('div.myteam-dropdown-box-search').find('ul.list-serach').html('')

                    //#### FRESH RESULT CAME FROM SERVER
                    let getText = $.trim($(this).val()).length
                    //#### check the length first
                    if( getText > 3 )
                        (new CommonFunctionClass()).getSerachResultFromHeadSrch($.trim($(this).val()))
                }
            });
        }
    })

    $('body').click((evt) => {
        if(!$(evt.target).is('.myteam-seacrh-box')) {
            //event handling code
            $('.myteam-dropdown-box-prj_off').find('ul.list').html('')
            $('.myteam-dropdown-box-prj_off').find('.myteam-seacrh-box-project').hide()
            $('.myteam-dropdown-box-prj_off').find('.myteam-contacts-userpicker-project-list').hide()

            if($('.myteam-dropdown-box-prj_off span').hasClass('on')){
                $('.myteam-dropdown-box-prj_off span.on').addClass('off').removeClass('on')
            }

            //event handling code
            //hide and remove serach list
            //#### BLANK HTML
            $('.myteam-dropdown-box').find('ul.list').html('')
            $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
            $('.myteam-dropdown-box').find('.myteam-contacts-userpicker-usr-lst').hide()

            if($('.myteam-dropdown-box span').hasClass('on')){
                $('.myteam-dropdown-box span.on').addClass('off').removeClass('on')
            }
        }
        else {}
    })


    //FOR KEY UP
    //#### SELECT NON ASSIGN USER FOR TASK
    $("body").on('keyup','.team-srch-tt-cmnt',function(){

        let getText = $.trim($(this).val()).length

        //#### check the length first
        if( getText > 3 )
            (new CommonFunctionClass()).getSerachResultFromHeadSrch($.trim($(this).val()))
    })

    //FOR click
    //#### DELETE USER LIST #######
    $("body").on('click','.user-delete',function(){
            (new CommonFunctionClass()).requestForDeleteAssignedUser($(this))
    })


    //FOR click
    //#### DELETE PROJECT LIST #######
    $("body").on('click','.project-delete',function(){
        (new CommonFunctionClass()).requestForDeleteAssignedProject($(this))
    })


    //FOR click
    //#### POPUP FOR UPLOAD ANYTHING #######
    $( document ).on('click', '.upload_form', function(){

        //grab all fields values and arrange to send to serve by our controller
        const userData = null

        //function options for common ajax
        const funcOptions = {
            url: '/dashboard/model/form/upload',
            type: 'post',
            dataType: 'html',
            beforeSend: false,
            contentType: '',
            data: false,
            responseBack: 'modal_content',
            selector: '.', // . | #
            domElem: '', //span , div, etc
            responseElem: {
                domElem: {},
                domSelector: {}
            },
            modelDom: {
                modelDomTitle: '#exampleModalLabel',
                modelDomContent: '.modal_content',
                modelDomTitleText: 'Upload Attachments'
            },
            ajaxModel: true
        }

        //######## CALL AJAX COMMON FUNCTION TO SEND AND RETREIVE RESPONSES
        //params : data
        //params : func
        sendData(userData, funcOptions)

    })


    //FOR click
    //#### DELETE PROJECT LIST #######
    $("body").on('change','#data-status',function(){
        (new CommonFunctionClass()).requestForTaskChangeStatus($(this))
    })

}) 