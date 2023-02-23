$(function(){
    
    AOS.init()

    var barangay_list = ["Assumption", "Bagong Buhay I", "Bagong Buhay II", "Bagong Buhay III", "Citrus", "Ciudad Real", "Dulong Bayan", "Fatima I", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "Francisco Homes-Guijo", "Francisco Homes-Mulawin", "Francisco Homes-Narra", "Francisco Homes-Yakal", "Gaya-Gaya", "Graceville I", "Gumaoc-Central", "Gumaoc-East", "Kaybanban", "Kaypian", "Lawang Pari", "Maharlika", "Minuyan I", "Minuyan II", "Minuyan III", "Minuyan IV", "Minuyan V", "Minuyan Proper", "Muzon", "Paradise III", "Poblacion", "Poblacion I", "San Isidro", "San Manuel", "San Martin I", "San Martin II", "San Martin III", "San Martin IV", "San Martin V", "San Pedro", "San Rafael I", "San Rafael II", "San Rafael III", "San Rafael IV", "San Rafael V", "Santo Cristo", "Santo Niño I", "Santo Niño II", "Sapang Palay Proper", "St. Martin de Porres", "Tungkong Mangga"];
    for(i = 0; i < barangay_list.length; i++){
        $('.barangay-list').append(`
            <option value="${barangay_list[i]}">${barangay_list[i]}</option>
        `)
    }
    
    $('#step-no').text('1 of 2')

    $("#btn-register-user").click(function(){   

        checkFirstName()
        checkLastName()
        checkUsername()
        checkEmail()
        checkPassword()
        checkContact()

        if(checkFirstName() && checkLastName() && checkUsername() && checkEmail() && checkPassword() && checkContact()){
            
            $('#step-no').text('2 of 2')

            $('#btn-return-step-1').removeClass('d-none')

            $('.content-001').addClass('d-none')
            $('.content-002').removeClass('d-none')

            $('#form-title').text('Location')
            $('#form-subtitle').text('Please fill-out your shipping information.')

            return false;
        }else{

            return false;
        }


    });

    $("form#form-register-shipping").submit(function(evt){

        checkHouse()
        checkStreet()
        checkBarangay()
        
        if(checkHouse() && checkStreet() && checkBarangay()){

            $('#submit-firstname').val($('#input-firstname').val())
            $('#submit-lastname').val($('#input-lastname').val())
            $('#submit-email').val($('#input-email').val())
            $('#submit-contact').val($('#input-contact').val())
            $('#submit-username').val($('#input-username').val())
            $('#submit-password').val($('#input-password').val())

            evt.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: '/controller/account-customer-add.php',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function (response) {
                    console.log(response)

                    $('#btn-register-shipping').prop('disabled', true)
                    
                    if(response == 'ok'){
                        
                        $('#btn-return-step-1').addClass('d-none', true)
                        $('.content-001').addClass('d-none')
                        $('.content-002').addClass('d-none')
                        $('.content-003').removeClass('d-none')
                        $('#form-title').text('Registration Success.')
                        $('#form-subtitle').text('Please check your email for your account details.')
                    }
    
                }
            });

            return false;

        }else{

            return false;
        }
    })

    $('#btn-return-step-1').click(function(){
        $('#form-title').text('Create New Account')
        $('#form-subtitle').text('Please fill-out your personal information.')
        $('#step-no').text('1 of 2')
        $('#btn-return-step-1').addClass('d-none')
        $('.content-001').removeClass('d-none')
        $('.content-002').addClass('d-none')
    })

    $('#btn-agree').click(function() {
        if($(this).is(':checked')) {
            $('#btn-register-shipping').prop('disabled', false);
        } else {
            $('#btn-register-shipping').prop('disabled', true);
        }
    })

    $('.terms-and-conditions').on('mouseenter', function(e){
        if($('#input-house').val() != '' && $('#input-street').val() != '' && $('select#input-barangay option:selected').val() != ''){
            $('#modal-terms-agreement').modal('show')
            $('#btn-agree').unbind(e)
        }
    })

    $('input').keypress(function(){
        if($('#input-house').val() != '' && $('#input-street').val() != '' && $('select#input-barangay option:selected').val() != ''){
            $('#btn-agree').prop('disabled', false)
        }else{
            $('#btn-agree').prop('disabled', true)
        }
    })

    $('#modal-terms-agreement .modal-body').scroll(function () {
        if($('.agreement').height() <= ($(this).scrollTop() + $(this).height())) {         
            $('#check').removeAttr('disabled');
        }
    })

    $('#check').click(function(){
        $('#modal-terms-agreement').modal('hide')
        if($(this).is(':checked')){
            $('#btn-agree').prop('checked', true)
            $('#btn-register-shipping').prop('disabled', false);
        }else{
            $('#btn-agree').prop('checked', false)
            $('#btn-register-shipping').prop('disabled', true);
        }
    })
})

$(function(){
    $('#input-firstname').on('input', function () {
        checkFirstName();
    });
    $('#input-lastname').on('input', function () {
        checkLastName();
    });

    $('#input-username').on('input', function () {
        checkUsername();
    });

    $('#input-email').on('input', function () {
        checkEmail();
    });

    $('#input-password').on('input', function () {
        checkPassword();
    });

    $('#input-house').on('input', function () {
        checkHouse();
    });

    $('#input-street').on('input', function () {
        checkStreet();
    });

    
    $('#input-contact').on('input', function () {
        checkContact();
    });

    $('#input-barangay').change(function(){
        checkBarangay()
    })
})

function checkFirstName() {
    var pattern = /^[a-zA-Z\s]*$/;
    var firstName = $('#input-firstname').val();
    var validuser = pattern.test(firstName);
        if (!validuser) {
            $('#input-firstname').addClass('is-invalid')
            $('#input-firstname').removeClass('is-valid')
            $('#invalid-firstname').text('Your name is invalid.');
            return false;
        }else if(firstName == ''){
            $('#input-firstname').addClass('is-invalid')
            $('#input-firstname').removeClass('is-valid')
            $('#invalid-firstname').text('Please enter your name.');
            return false;
        }else {
            $('#input-firstname').addClass('is-valid')
            $('#input-firstname').removeClass('is-invalid')
            $('#valid-firstname').text('Your name is valid.');
            return true;
        }
}

function checkLastName() {
    var pattern = /^[a-zA-Z\s]*$/;
    var lastname = $('#input-lastname').val();
    var validuser = pattern.test(lastname);
        if (!validuser) {
            $('#input-lastname').addClass('is-invalid')
            $('#input-lastname').removeClass('is-valid')
            $('#invalid-lastname').text('Your surname is invalid.');
            return false;
        }else if(lastname == ''){
            $('#input-lastname').addClass('is-invalid')
            $('#input-lastname').removeClass('is-valid')
            $('#invalid-lastname').text('Please enter your surname.');
            return false;
        }else {
            $('#input-lastname').addClass('is-valid')
            $('#input-lastname').removeClass('is-invalid')
            $('#valid-lastname').text('Your surname is valid.');
            return true;
        }
}

var addr = '';
function checkEmail() {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $('#input-email').val();
    var validEmail = pattern.test(email);

    if (!validEmail){
        $('#input-email').addClass('is-invalid')
        $('#input-email').removeClass('is-valid')
        $('#invalid-email').text('Your email address is invalid.');
        return false;
    }else if(email == ''){
        $('#input-email').addClass('is-invalid')
        $('#input-email').removeClass('is-valid')
        $('#invalid-email').text('Please enter your email address.');
        return false;
    }else {
        
        $.ajax({
            url: '/controller/auth-verify.php',
            method: 'post',
            data:{
                email: $('#input-email').val()
            },
            success: function(response){
    
                if(response == 1){
                    $('#input-email').addClass('is-invalid')
                    $('#input-email').removeClass('is-valid')
                    $('#invalid-email').text('This email address is already taken.')
                    addr = false;
                }else{
                    $('#input-email').addClass('is-valid')
                    $('#input-email').removeClass('is-invalid')
                    $('#valid-email').text('Your email address is valid.')
                    addr = true;

                }

            }
        });
        return addr;
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
        $('#invalid-username').text('Please enter your surname.');
        return false;
    }else if(validUsername && username != '' && username.length > 6){
        $.ajax({
            url: '/controller/auth-verify.php',
            method: 'post',
            data:{
                username: $('#input-username').val(),
                action: 'edit-username',
            },
            success: function(response){
                if(response == 1){
                    $('#input-username').addClass('is-invalid')
                    $('#input-username').removeClass('is-valid')
                    $('#invalid-username').text('This username is already taken.')
                    user = false;
                }else{
                    $('#input-username').addClass('is-valid')
                    $('#input-username').removeClass('is-invalid')
                    $('#valid-username').text('Your username is valid.')
                    user = true;
                }
            }
        });
        return user;
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

function checkPassword(){
    var password = $('#input-password').val()

    if(password != ''){
        if(password.length < 8){
            $('#input-password').addClass('is-invalid')
            $('#input-password').removeClass('is-valid')
            $('#invalid-password').text('Your password must be greater or equal to 8 characters.');
            return false;
        }else if(password.length >= 8 && password.length < 12){
            $('#input-password').addClass('is-valid')
            $('#input-password').removeClass('is-invalid')
            $('#valid-password').text('Your password strength is average.');
            return true;
        }else if(password.length >= 12){
            $('#input-password').addClass('is-valid')
            $('#input-password').removeClass('is-invalid')
            $('#valid-password').text('Your password strength is strong.');
            return true;
        }
    }else if(password == ''){
        $('#input-password').addClass('is-invalid')
        $('#input-password').removeClass('is-valid')
        $('#invalid-password').text('Please enter your password.');
        return false;
    }
}


function checkHouse() {
    var pattern = /^[a-zA-Z0-9 -,.#]*$/;
    var house = $('#input-house').val();
    var validHouse = pattern.test(house);
        if(!validHouse){
            $('#input-house').addClass('is-invalid')
            $('#input-house').removeClass('is-valid')
            $('#invalid-house').text('Your house address is invalid.');
            return false;
        }else if(house == ''){
            $('#input-house').addClass('is-invalid')
            $('#input-house').removeClass('is-valid')
            $('#invalid-house').text('Please enter your house address.');
            return false;
        }else{
            $('#input-house').addClass('is-valid')
            $('#input-house').removeClass('is-invalid')
            $('#valid-house').text('Your house address is valid.');
            return true;
        }
}

function checkStreet() {
    var pattern = /^[a-zA-Z0-9 -,.#]*$/;
    var street = $('#input-street').val();
    var validStreet = pattern.test(street);
        if(!validStreet){
            $('#input-street').addClass('is-invalid')
            $('#input-street').removeClass('is-valid')
            $('#invalid-street').text('Your house street is invalid.');
            return false;
        }else if(street == ''){
            $('#input-street').addClass('is-invalid')
            $('#input-street').removeClass('is-valid')
            $('#invalid-street').text('Please enter your house street.');
            return false;
        }else{
            $('#input-street').addClass('is-valid')
            $('#input-street').removeClass('is-invalid')
            $('#valid-street').text('Your house street is valid.');
            return true;
        }
}

function checkBarangay(){
    var street = $('select#input-barangay option:selected').val();
    if(street == ''){
        $('#input-barangay').addClass('is-invalid')
        $('#input-barangay').removeClass('is-valid')
        $('#invalid-barangay').text('Please select your barangay.');
        return false;
    }else{
        $('#input-barangay').addClass('is-valid')
        $('#input-barangay').removeClass('is-invalid')
        $('#valid-barangay').text('Your barangay is valid.');
        return true;
    }
}

function checkContact() {
    var pattern = /[09]{2}[0-9]{9}/gm;
    var contact = $('#input-contact').val();
    var validContact = pattern.test(contact);
        if(!validContact){
            $('#input-contact').addClass('is-invalid')
            $('#input-contact').removeClass('is-valid')
            $('#invalid-contact').text('Your contact number is invalid.');
            return false;
        }else if(contact == ''){
            $('#input-contact').addClass('is-invalid')
            $('#input-contact').removeClass('is-valid')
            $('#invalid-contact').text('Please enter your contact number.');
            return false;
        }else{
            $('#input-contact').addClass('is-valid')
            $('#input-contact').removeClass('is-invalid')
            $('#valid-contact').text('Your contact number is valid.');
            return true;
        }
}