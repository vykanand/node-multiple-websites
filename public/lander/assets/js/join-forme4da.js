function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

//.............................debut code for contact form @5nov2015 @avinashtiwari..........................
$('#join-us-partner-btn').on('click', function () {



    var fName = $('#fullName').val();
    var emailId = $('#emailAdd').val();
    var textArea = $('#messg').val();

    slctEnqryPage = slctEnqry;//'Enquiry';//$('#slctENquiry').val();    
    function checkName() {
        if (fName != '') {
            $('#fullName-error').text('');
            $('#fullName-error').removeClass('error');
            return true;
        } else {
            $('#fullName-error').text('This field is required.');
            $('#fullName-error').addClass('error');
            return false;
        }
    }
    function checkEmailId() {
        if (emailId != '') {
            if (!ValidateEmail(emailId)) {
                $('#emailAdd-error').text('PLEASE FILL RIGHT FORMAT OF EMAIL.');
                $('#emailAdd-error').addClass('error');
                return false;
            } else {
                $('#emailAdd-error').text('');
                $('#emailAdd-error').removeClass('error');
                return true;
            }
        } else {
            $('#emailAdd-error').text('This field is required.');
            $('#emailAdd-error').addClass('error');
            return false;
        }
    }


    function checkMessage() {
        if (textArea != '') {
            $('#messg-error').text('');
            $('#messg-error').removeClass('error');
            return true;
        } else {
            $('#messg-error').text('This field is required.');
            $('#messg-error').addClass('error');
            return false;
        }
    }

    //.............................debut code for contact form @10nov2015 @avinashtiwari..........................     
    if (checkName() & checkEmailId() & checkMessage()) {


        var d = new Date();
        var n = -d.getTimezoneOffset() / 60;
//         alert ('ok'+n);
//        return false;
        $.ajax({
            url: 'pass-join.php',
            type: 'GET',
            data: {action: 'submit_contact', fName: fName, emailId: emailId, textArea: textArea, slctEnqry: slctEnqryPage, secureKey: "apps_join_us", timeZone: "GMT " + n},
            beforeSend: function () {
               // console.log($('#join-us-partner-form').css("height"))
                $('#join-us-partner-btn').attr("disabled", "disabled");
                $('#join-us-partner-btn').html('Please Wait...');
            },
            success: function (response) {

                //alert("responce" + response);

                if (response != 'result') {
                    $('#errorZone').html('');
                    response = JSON.parse(response);
                    /*check server side email validation*/
                    if (response.ename) {
                        $("#fullName-error").addClass('error').text(response.ename);
                    } else {
                        $("#fullName-error").removeClass('error').text('');
                    }
                    /*check server side email validation*/
                    if (response.emailId) {
                        $("#emailAdd-error").addClass('error').text(response.emailId);
                    } else {
                        $("#emailAdd-error").removeClass('error').text('');
                    }
                    $('#join-us-partner-form').removeAttr('disabled');
                    ;
                    $('#join-us-partner-form').val('SEND MESSAGE');

                    return false;
                } else {
                    $('#fullName').val('');
                    $('#emailAdd').val('');
                    $('#messg').val('');
                    //$('#slctENquiry').val('');
                    //window.location.href = 'thanks.php';
                    $('.block-intro').css('display', 'none');
                    $(".msg-thank").css('display', 'block');

                    return true;
                }
                $('#fullName').val('');
                $('#emailAdd').val('');
                $('#messg').val('');
            },
            complete: function () {
            },
            error: function (err) {
                //alert(err);
            }
        });
    } else {

        return false;
    }
    return false;
});        