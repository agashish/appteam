/**
 * Created by Noida office on 3/14/2018.
 */

/*

 @param1 : post data
 @param2 : ajax options

 */


let ajaxResponse = ''
let globalBool = {
    forHtml: false
}

let sendData = ( sendDataObject , ajaxOptionObject ) => {

    //###### create ajax instance
    if( ajaxOptionObject.data == true && ajaxOptionObject.dataType == 'json' ){        
        return ajaxInstanceWithData(sendDataObject , ajaxOptionObject )
    }
    else if( ajaxOptionObject.data == true && ajaxOptionObject.dataType == '' ){
        return ajaxInstanceWithData(sendDataObject , ajaxOptionObject )
    }
    else if( ajaxOptionObject.data == true && ajaxOptionObject.dataType == 'html' ){
        return ajaxInstanceNoData(sendDataObject , ajaxOptionObject )
    }
   /* else if( ajaxOptionObject.data == true && ajaxOptionObject.fileUpload == true ){
        return ajaxInstanceWithData(sendDataObject , ajaxOptionObject )
    }
    else if( ajaxOptionObject.data == true && ajaxOptionObject.dataType == 'json' ){

        return ajaxInstanceWithData(sendDataObject , ajaxOptionObject )
    }*/


    //###### create ajax instance
    if( ajaxOptionObject.data == false ){
        return ajaxInstanceNoData(sendDataObject , ajaxOptionObject )
    }


    //ajaxResponse = ajaxResponse

}

//######## SET AJAX RESPONSE BACK
let getResponseBack = (returnResponse) => {
    ajaxResponse = returnResponse
}

//######## IF DOM MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let domManipulate = (ajaxOptionObject, response) => {
    if(ajaxOptionObject.domManipulation == true) {

        //#### CHECK IS ACTIVE INTO ACCORDIAN
        if($(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).parent().prev().hasClass('active')){

            //#### OPEN TEAM MENU WITH LIST
            $(ajaxOptionObject.domClick).click()
        }

        //#### ADD NEW REFERESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)

        //#### OPEN TEAM MENU WITH LIST
        $(ajaxOptionObject.domClick).click()

        //#### CLOSE MODAL AFTER ADDING THE DATA
        $(ajaxOptionObject.domCloseClass).click()
    }
}

//######## IF ADD INPUT MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let addInputInDom = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.addInput == true) {

        //#### CHECK ONCE IF CLASS EXISTS OR NOT
        let getClassResultBool = $(ajaxOptionObject.rmvSelector.origClassSelector+ajaxOptionObject.rmvSelector.origClassClicked).hasClass('myteam-advpTask')
        if(getClassResultBool == false)
            return false

        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)

        //#### REPLACE THE CLASS ON WHICH WE CLICKED TO ADD INPUT BOX
        $(ajaxOptionObject.rmvSelector.origClassSelector+ajaxOptionObject.rmvSelector.origClassClicked).addClass('myteam-advpTask-input').removeClass('myteam-advpTask')

        //#### ADD FOCUS AFTER ADD INPUT BOX
        //$('#task_name').focus()

    }
}

//######## IF ADD INPUT MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let showAllTask = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.taskList == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
    }
}

//######## IF ADD NON ASSIGN USER LIST MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let showAllNonAssginUserList = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.nonAssgnUser == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
    }
}

//######## IF ADD NON ASSIGN USER LIST MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let refereshAssignUserList = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.refereshAssignUserList == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)

        //USE DEFAULT TO HIDE DROPDOWN OF NON-ASSIGN USER LIST
        //#### BLANK HTML
        $('.myteam-dropdown-box').find('ul.list').html('')
        $('.myteam-dropdown-box').find('.myteam-seacrh-box').hide()
        $('.myteam-dropdown-box').find('.myteam-contacts-userpicker').hide()
        $('.myteam-dropdown-box .on').addClass('off').removeClass('on')
    }
}

//######## IF ADD NON ASSIGN USER LIST MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let refereshCommentForResponseTick = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.descriptionResponse == true) {
        //#### ADD NEW REFRESH DATA
        //$(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
        console.log('Waiting for response tick into editor area but will do later')
    }
}

//######## IF ADD NON ASSIGN USER LIST MANIPULATION IS TRUE THEN WILL TRIGGER DIFFERENT FUNCTION
let refereshNotesList = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.notesDisplay == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
        //console.log('Waiting for response tick into editor area but will do later')
    }
}

//######## Referesh Search List
let searchRefresh = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.searchRefresh == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
        //console.log('Waiting for response tick into editor area but will do later')
    }
}

//######## Referesh Search List
let nonAssgnProjects = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.nonAssgnProjects == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
        //console.log('Waiting for response tick into editor area but will do later')
    }
}

//######## Referesh ASSIGN Project List
let refereshAssignProjectList = (ajaxOptionObject , response) => {
    if(ajaxOptionObject.refereshAssignProjectList == true) {
        //#### ADD NEW REFRESH DATA
        $(ajaxOptionObject.domElem+ajaxOptionObject.selector+ajaxOptionObject.responseBack).html(response)
        //console.log('Waiting for response tick into editor area but will do later')
    }
}


//######## SET RESPONSE INTO HTML
let setResponseHtml = (response , ajaxOptionObject) => {

    if(ajaxOptionObject.domManipulation == true) {domManipulate(ajaxOptionObject, response)}

    if(ajaxOptionObject.addInput == true) {addInputInDom(ajaxOptionObject,response)}

    if(ajaxOptionObject.taskList ==  true){showAllTask(ajaxOptionObject,response)}

    if(ajaxOptionObject.nonAssgnUser ==  true){showAllNonAssginUserList(ajaxOptionObject,response)}

    if(ajaxOptionObject.refereshAssignUserList ==  true){refereshAssignUserList(ajaxOptionObject,response)}

    if(ajaxOptionObject.descriptionResponse == true){refereshCommentForResponseTick(ajaxOptionObject,response)}

    if(ajaxOptionObject.notesDisplay == true){refereshNotesList(ajaxOptionObject,response)}

    if(ajaxOptionObject.searchRefresh == true){searchRefresh(ajaxOptionObject,response)}

    if(ajaxOptionObject.nonAssgnProjects == true){nonAssgnProjects(ajaxOptionObject,response)}

    if(ajaxOptionObject.refereshAssignProjectList == true){refereshAssignProjectList(ajaxOptionObject,response)}

}

//######## SET RESPONSE BACK
let setResponseBack = (response , ajaxOptionObject) => {

    //#### SUCCESS RESPONSE BACK ACCORDING TO ajaxModel
    if(ajaxOptionObject.ajaxModel == true){
        
        $(ajaxOptionObject.modelDom.modelDomContent).html(response)
        $(ajaxOptionObject.modelDom.modelDomTitle).html(ajaxOptionObject.modelDom.modelDomTitleText)        

    } else {
        if(ajaxOptionObject.dataType == 'html'){
            setResponseHtml(response , ajaxOptionObject)
        }
        else{
            if(response.status != 200) {
                //#### SET ERROR RESPONSE IF CAME AFTER VALIDATION OR FROM SERVER WITHOUT STATUS 200
                //(new ErrorResponseBack()).customErrorBack(response.data , 'hidden_error')
                //#### CUSTOM ERROR BLANK
                let errorClass = 'hidden_error'
                $('.'+errorClass).html('')

                if(jQuery.isEmptyObject(response) == false)
                {
                    (new ErrorResponseBack()).customErrorBack(response.data , 'hidden_error')
                }
                return response.status
            } else {
                return response.status
            }
        }
    }
}

//######### Invoke when data comes with true
let ajaxInstanceWithData = (sendDataObject , ajaxOptionObject) => {
    let ajaxResult = $.ajax({
        type: ajaxOptionObject.type,
        url: ajaxOptionObject.url,
        dataType: ajaxOptionObject.dataType,
        data: sendDataObject,
        contentType: ajaxOptionObject.contentType,
        async: false,
        success: (response , status , xhr) => {
            boolResult = setResponseBack(response,ajaxOptionObject)
        },
        error: (response) => {
            alert('3 error')
            boolResult = setResponseBack(response,ajaxOptionObject)
        }
    })

    if(ajaxOptionObject.dataType == '')
    {
        var resp = JSON.parse(ajaxResult.responseText)
        return resp.status
    }

    if(ajaxOptionObject.dataType == 'json')
    {
        var resp = JSON.parse(ajaxResult.responseText)
        return resp.status
    }

}

//######### Invoke when data comes with false
let ajaxInstanceNoData = (sendDataObject , ajaxOptionObject) => {

    //#### USER PROMISES TO HANDLE THE DATA
    let ajaxResult = $.ajax({
        type: ajaxOptionObject.type,
        url: ajaxOptionObject.url,
        dataType: ajaxOptionObject.dataType,
        data: sendDataObject,
    })
    .done(function(response) {
        setResponseBack(response,ajaxOptionObject)
    })
    .fail(function(response) {
        setResponseBack(response,ajaxOptionObject)
    })
}

