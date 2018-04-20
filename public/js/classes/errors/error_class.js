/**
 * Created by noida office on 3/26/2018.
 */

//#### ERROR CLASS
class ErrorResponseBack {

    constructor() {}

    //#### SEND ERROR BACK TO FORM
    customErrorBack(err , errorClass) {

        //#### CUSTOM ERROR BLANK
        $('.'+errorClass).html('')

        if(jQuery.isEmptyObject(err) == false)
        {
            for (var key of Object.keys(err)) {
                //#### STE THE ERROR FROM RESPONSE ONTO THE FORM
                $('.' + key).html(err[key])
            }
        }
    }
}