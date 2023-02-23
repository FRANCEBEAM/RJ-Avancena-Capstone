$(function(){

    var barangay_list = ["Assumption", "Bagong Buhay I", "Bagong Buhay II", "Bagong Buhay III", "Citrus", "Ciudad Real", "Dulong Bayan", "Fatima I", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "Francisco Homes-Guijo", "Francisco Homes-Mulawin", "Francisco Homes-Narra", "Francisco Homes-Yakal", "Gaya-Gaya", "Graceville I", "Gumaoc-Central", "Gumaoc-East", "Kaybanban", "Kaypian", "Lawang Pari", "Maharlika", "Minuyan I", "Minuyan II", "Minuyan III", "Minuyan IV", "Minuyan V", "Minuyan Proper", "Muzon", "Paradise III", "Poblacion", "Poblacion I", "San Isidro", "San Manuel", "San Martin I", "San Martin II", "San Martin III", "San Martin IV", "San Martin V", "San Pedro", "San Rafael I", "San Rafael II", "San Rafael III", "San Rafael IV", "San Rafael V", "Santo Cristo", "Santo Niño I", "Santo Niño II", "Sapang Palay Proper", "St. Martin de Porres", "Tungkong Mangga"];
    for(i = 0; i < barangay_list.length; i++){
        $('.barangay-list').append(`
            <option value="${barangay_list[i]}">${barangay_list[i]}</option>
        `)
    }

    AOS.init()

    $('#step-no').text('1 of 2')

    $("#btn-register-user").click(function(){
        
        $("#btn-register-user").prop('disabled', true)

        setTimeout(function(){
            $("#btn-register-user").prop('disabled', false)
        }, 3000)

        checkUsername()
        checkPassword()
        
        if(checkUsername() && checkPassword()){
            $.ajax({
                url: '/controller/auth-verify.php',
                method: 'post',
                data:{
                    user: $('#input-username').val(),
                    pass: $('#input-password').val()
                },
                success: function(response){



                    console.log(response)
                    
                    if(response == 'password-ok'){

                        $('#submit-username').val($('#input-username').val())
                        $('#submit-password').val($('#input-password').val())

                        $('#step-no').text('2 of 2')

                        $('#btn-return-step-1').removeClass('d-none')

                        $('.content-001').addClass('d-none')
                        $('.content-002').removeClass('d-none')

                        $('#form-title').text('Verification')
                        $('#form-subtitle').html('Please fill-out your one-time-password, <button class="text-decoration-none cursor-pointer p-0 m-0 border-0 bg-transparent text-primary" id="btn-resend-otp" onclick="countdown(1)">resend otp?</button>')

                    }else if(response == 'status-err'){
                        $('#input-username').addClass('is-invalid')
                        $('#input-username').removeClass('is-valid')
                        $('#invalid-username').text('This account has been disabled by the administrator.');

                        $('#input-password').addClass('is-invalid')
                        $('#input-password').removeClass('is-valid')
                        $('#invalid-password').text('');
                    }else if(response == 'password-err'){
                        $('#input-username').addClass('is-invalid')
                        $('#input-username').removeClass('is-valid')
                        $('#invalid-username').text('Your username must be incorrect.');

                        $('#input-password').addClass('is-invalid')
                        $('#input-password').removeClass('is-valid')
                        $('#invalid-password').text('Your password must be incorrect.');
                    }else if(response == 'account-err'){
                        $('#input-username').addClass('is-invalid')
                        $('#input-username').removeClass('is-valid')
                        $('#invalid-username').text('This account does not exist.');

                        $('#input-password').addClass('is-invalid')
                        $('#input-password').removeClass('is-valid')
                        $('#invalid-password').text('');
                    }
                }
            })
            return false;
        }else{
            return false;
        }
    });

    $('#btn-return-step-1').click(function(){
        $('#form-title').text('Welcome back!')
        $('#form-subtitle').text('We\'re happy to see you again, please log-in your credentials.')
        $('#step-no').text('1 of 2')
        $('#btn-return-step-1').addClass('d-none')
        $('.content-001').removeClass('d-none')
        $('.content-002').addClass('d-none')
    })

    $('#btn-forgot-password').click(function(){
        $('#form-title').text('Forgot Password.')
        $('#form-subtitle').text('We\'re happy to serve you in regards to your account.')
        $('#step-no').text('1 of 2')
        $('.content-001').addClass('d-none')
        $('.content-002').addClass('d-none')
        $('.content-003').removeClass('d-none')
        $('.wall-svg').attr('src', '../assets/img/forgot.svg')
    })

    $('#btn-forgot-user').click(function(){

        $('#btn-forgot-user').prop('disabled', true)

        $.ajax({
            url: '/controller/auth-verify.php',
            method: 'post',
            data:{
                UserEmail: $('#input-forgot-username').val(),
            },
            success: function(response){
                
                console.log(response)

                if(checkForgotUser() && response == 1){
                    $('#input-forgot-otp-username').val($('#input-forgot-username').val())
                    $('#form-title').text('Forgot Password.')
                    $('#form-subtitle').text('Please enter your one time password via email.')
                    $('#step-no').text('2 of 2')
                    $('#btn-return-step-1').addClass('d-none')
                    $('.content-001').addClass('d-none')
                    $('.content-002').addClass('d-none')
                    $('.content-003').addClass('d-none')
                    $('.content-004').removeClass('d-none')
                    return false;
                }else{
                    $('#input-forgot-username').addClass('is-invalid')
                    $('#input-forgot-username').removeClass('is-valid')
                    $('#invalid-forgot-username').text('Your email or username does not exist, try again.');

                    setTimeout(function(){
                        $('#btn-forgot-user').prop('disabled', false)
                    }, 3000)

                    return false;
                }
            }
        })
        return false;
    })

    $("form#form-register-otp").submit(function(evt){

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/controller/auth-verify.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                console.log(response)
                if(response == 'ok'){
                    $('#input-final-username').val($('#input-username').val())
                    $('#input-final-password').val($('#input-password').val())
                    $('#input-final-otp').val($('#input-otp').val())

                    $('form#form-final-login').submit()
                }else if(response == 'not'){
                    $('#input-otp').addClass('is-invalid')
                    $('#input-otp').removeClass('is-valid')
                    $('#invalid-otp').text('Your one-time password is incorrect.')
                }

            }
        });
        return false;
    });

    $("form#form-forgot-password-002").submit(function(evt){

        $('#input-forgot-otp-username').val($('#input-forgot-username').val())

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/controller/auth-verify.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {

                if(response == 1){
                    $('.content-001').addClass('d-none')
                    $('.content-002').addClass('d-none')
                    $('.content-003').addClass('d-none')
                    $('.content-004').addClass('d-none')
                    $('.content-005').addClass('d-none')
                    $('.content-006').removeClass('d-none')
                    $('#form-title').text('Recovery Success.')
                    $('#form-subtitle').text('Please check your email for your temporary password.')
                    $('#step-no').text('')
                    $('#step-no').addClass('bi bi-check-lg')
                }else{
                    $('#input-forgot-otp').addClass('is-invalid')
                    $('#input-forgot-otp').removeClass('is-valid')
                    $('#invalid-forgot-otp').text('Your one-time-password is incorrect.');
                }

            }
        });
        return false;
    });
})

$(function(){
    $('#input-otp').keypress(function(){
        if($(this).val().length == 6){
            return false;
        }
    })
    $('#input-forgot-otp').keypress(function(){
        if($(this).val().length == 6){
            return false;
        }
    })

    $('#input-password').on('input', function(){
        checkPassword()
    })

    $('#input-username').on('input', function(){
        checkUsername()
    })

    $('#input-forgot-username').on('input', function(){
        checkForgotUser()
    })
})

function checkPassword(){
    var password = $('#input-password').val()
    if(password != ''){
        if(password.length < 8){
            $('#input-password').addClass('is-invalid')
            $('#input-password').removeClass('is-valid')
            $('#invalid-password').text('Your password must be greater or equal to 8 characters.');
            return false;
        }else if(password.length >= 8){
            $('#input-password').addClass('is-valid')
            $('#input-password').removeClass('is-invalid')
            // $('#valid-password').text('Your password is good.');
            return true;
        }
    }else if(password == ''){
        $('#input-password').addClass('is-invalid')
        $('#input-password').removeClass('is-valid')
        $('#invalid-password').text('Please enter your password.');
        return false;
    }
}


var user = '';
function checkUsername(){
    var username = $('#input-username').val()
    var pattern = /^[a-zA-Z0-9]*$/;
    var validUsername = pattern.test(username);
    if(validUsername && username == '' && username.length > 6){
        $('#input-username').addClass('is-invalid')
        $('#input-username').removeClass('is-valid')
        $('#invalid-username').text('Please enter your username.');
        return false;
    }else if(validUsername && username != '' && username.length > 6){
        $('#input-username').addClass('is-valid')
        $('#input-username').removeClass('is-invalid')
        // $('#valid-username').text('Your username is valid.')
        return true;
    }else if(validUsername && username != '' && username.length <= 6){
        $('#input-username').addClass('is-invalid')
        $('#input-username').removeClass('is-valid')
        $('#invalid-username').text('Your username must be greater than 6 characters.');
        return false;
    }else if(!validUsername){
        $('#input-username').addClass('is-invalid')
        $('#input-username').removeClass('is-valid')
        $('#invalid-username').text('Your username must be alphanumeric.');
        return false;
    }else{
        $('#input-username').addClass('is-invalid')
        $('#input-username').removeClass('is-valid')
        $('#invalid-username').text('Please enter your username.');
        return false;
    }
}

function checkForgotUser(){
    var username = $('#input-forgot-username').val()
    var pattern = /^[a-zA-Z0-9@._]*$/;
    var validUsername = pattern.test(username);
    if(validUsername && username == '' && username.length < 6){
        $('#input-forgot-username').addClass('is-invalid')
        $('#input-forgot-username').removeClass('is-valid')
        $('#invalid-forgot-username').text('Please enter your email or username.');
        return false;
    }else if(validUsername && username != '' && username.length >= 6){
        $('#input-forgot-username').addClass('is-valid')
        $('#input-forgot-username').removeClass('is-invalid')
        // $('#valid-username').text('Your username is valid.')
        return true;
    }else if(validUsername && username != '' && username.length < 6){
        $('#input-forgot-username').addClass('is-invalid')
        $('#input-forgot-username').removeClass('is-valid')
        $('#invalid-forgot-username').text('Your email or username must be greater than 6 characters.');
        return false;
    }else if(!validUsername){
        $('#input-forgot-username').addClass('is-invalid')
        $('#input-forgot-username').removeClass('is-valid')
        $('#invalid-forgot-username').text('Your username or email must be valid.');
        return false;
    }else{
        $('#input-forgot-username').addClass('is-invalid')
        $('#input-forgot-username').removeClass('is-valid')
        $('#invalid-forgot-username').text('Please enter your email or username.');
        return false;
    }
}

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    $.ajax({
        url: '/controller/auth-verify.php',
        method: 'post',
        data:{
            otp: 'resend',
            userName: $('#input-username').val()
        },
        success: function(response){

        }
    })
    function tick(){
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        var counter = document.getElementById("btn-resend-otp");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString().padStart(2, '0') + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if(seconds>0) {
            counter.setAttribute('disabled', 'disabled')
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);       
            }
            counter.removeAttribute('disabled', 'disabled')
            clearTimeout(tick)
            counter.innerHTML = "resend otp?"
        }

    }
    tick();
}

var count = false;
function checkUserEmail(){
    $.ajax({
        url: '/controller/auth-verify.php',
        method: 'post',
        data:{
            UserEmail: $('#input-forgot-username').val(),
        },
        success: function(response){
            console.log(response)
            if(response == 1){
                count = true;
            }else{
                count = false;
            }
        }
    })
    console.log(count)
    return count;
}

    