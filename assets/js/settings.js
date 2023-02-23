$(function(){

    loadProfile()

    var barangay_list = ["Assumption", "Bagong Buhay I", "Bagong Buhay II", "Bagong Buhay III", "Citrus", "Ciudad Real", "Dulong Bayan", "Fatima I", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "Francisco Homes-Guijo", "Francisco Homes-Mulawin", "Francisco Homes-Narra", "Francisco Homes-Yakal", "Gaya-Gaya", "Graceville I", "Gumaoc-Central", "Gumaoc-East", "Kaybanban", "Kaypian", "Lawang Pari", "Maharlika", "Minuyan I", "Minuyan II", "Minuyan III", "Minuyan IV", "Minuyan V", "Minuyan Proper", "Muzon", "Paradise III", "Poblacion", "Poblacion I", "San Isidro", "San Manuel", "San Martin I", "San Martin II", "San Martin III", "San Martin IV", "San Martin V", "San Pedro", "San Rafael I", "San Rafael II", "San Rafael III", "San Rafael IV", "San Rafael V", "Santo Cristo", "Santo Niño I", "Santo Niño II", "Sapang Palay Proper", "St. Martin de Porres", "Tungkong Mangga"];
    for(i = 0; i < barangay_list.length; i++){
        $('.barangay-list').append(`
            <option value="${barangay_list[i]}">${barangay_list[i]}</option>
        `)
    }

    $('.current-id').val($('#sessionID').val());
    $('.current-user').val($('#User').val());
})


function loadProfile(){
    $.ajax({
        url: '/controller/core-profile.php',
        method: 'post',
        data:{
            sessionID: $('#sessionID').val(),
        },
        success: function(response){
            console.log(response)
            appendProfile(response)
        }
    })
}

function appendProfile(json){
    try{
        const pro = JSON.parse(json)
        $('#account-info-userlevel').val(pro.userlevel)
        $('#account-info-status').val(pro.status)
        $('#account-info-datetime').val(pro.date + ', ' + pro.time)
        $('#account-image').attr('src', pro.profilesrc)
        $('#account-info-fullname').val(pro.firstname + ' ' + pro.lastname)
        $('#account-username').val(pro.username)
        $('#account-firstname').val(pro.firstname)
        $('#account-lastname').val(pro.lastname)
        $('#account-email').val(pro.email)
        $('#account-contact').val(pro.contact)
        $('#account-info-address').val(pro.address)
        $('#account-house').val(pro.house)
        $('#account-street').val(pro.street)
        $('#account-barangay').val(pro.barangay)
    }catch{
        const pro = JSON.parse(JSON.stringify(json))
        $('#account-info-userlevel').val(pro.userlevel)
        $('#account-info-status').val(pro.status)
        $('#account-info-datetime').val(pro.date + ', ' + pro.time)
        $('#account-image').attr('src', pro.profilesrc)
        $('#account-info-fullname').val(pro.firstname + ' ' + pro.lastname)
        $('#account-username').val(pro.username)
        $('#account-firstname').val(pro.firstname)
        $('#account-lastname').val(pro.lastname)
        $('#account-email').val(pro.email)
        $('#account-contact').val(pro.contact)
        $('#account-info-address').val(pro.address)
        $('#account-house').val(pro.house)
        $('#account-street').val(pro.street)
        $('#account-barangay').val(pro.barangay)
    }
}

$(function(){
    $('#btn-edit-account').click(function(){
        $('#btn-save-account').removeClass('d-none')
        $('#btn-edit-account').addClass('d-none')
        $('.account-edit').attr('disabled', false)
        $('.account-edit').removeClass('form-control-plaintext')
        $('.account-edit').addClass('form-control')
    })

    $('#btn-edit-account-002').click(function(){
        $('#btn-save-account-002').removeClass('d-none')
        $('#btn-edit-account-002').addClass('d-none')
        $('.account-info').attr('disabled', false)
        $('.account-info-002').attr('disabled', false)
        $('.account-info-x').addClass('d-none')
        $('.account-info-div').removeClass('d-none')
        $('.account-info').removeClass('form-control-plaintext')
        $('.account-info').addClass('form-control')
    })

    $('#account-image').click(function(){
        $('#account-image-file').trigger('click')
    })

    $('#account-image-file').change(function(e){
        var src = URL.createObjectURL(e.target.files[0])
        $('#account-image').attr('src', src)
        $('form#form-account-image').submit()
    })

    $('form#form-account-image').submit(function(e){
        e.preventDefault()

        Swal.fire({
            title: 'Update Profile?',
            text: "Your previous profile picture will be replaced",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Upload'
        }).then((result) => {
            if (result.isConfirmed) {

                if(($('#account-image-file')[0].files[0].name) != ''){
                    var formData = new FormData($(this)[0]);
            
                    $.ajax({
                        url: '/controller/settings-update.php',
                        type: 'POST',
                        data: formData,
                        async: false,
                        cache: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        processData: false,
                        success: function (response) {
                            console.log(response)
                            
                            $('#accept-image-status').text('Upload Success!')
                            $('#accept-image-status').addClass('text-success')
                            setTimeout(function(){
                                $('#accept-image-status').text('')
                            }, 3000)

                            loadProfile()
                        }
                    });
                }
            }
        })
        
        return false;
    })

    $('#btn-save-account').click(function(){
        $('form#form-account-info').submit()
    })



    $('#account-username').on('input', function () {
        checkUsername();
    });

    $('#account-password').on('input', function () {
        checkPassword();
    });

    $('#account-firstname').on('input', function () {
        checkFirstName()
    });

    $('#account-lastname').on('input', function () {
        checkLastName();
    });

    $('#account-email').on('input', function () {
        checkEmail();
    });

    $('#account-contact').on('input', function () {
        checkContact();
    });

    $('#account-house').on('input', function () {
        checkHouse();
    });

    $('#account-street').on('input', function () {
        checkStreet();
    });

    $('#account-barangay').on('input', function () {
        checkBarangay();
    });

    $('#account-contact').keypress(function(){
        if($(this).val().length == 11){
            return false;
        }
    })

    $('#btn-save-account-002').click(function(){

        $('form#form-personal-info').submit()
    })

    $('form#form-personal-info').submit(function(e){
        e.preventDefault()

        checkFirstName()
        checkLastName()
        checkEmail()
        checkContact()
        checkHouse()
        checkStreet()
        checkBarangay()

        if(checkFirstName() && checkLastName() && checkEmail() && checkHouse() && checkStreet() && checkBarangay()){
            var formData = new FormData($(this)[0]);
    
            $.ajax({
                url: '/controller/settings-update.php',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function (response) {
                    
                    console.log(response)
                    
                    $('#btn-save-account-002').addClass('d-none')
                    $('#btn-edit-account-002').removeClass('d-none')
                    $('.account-info').attr('disabled', true)
                    $('.account-info').addClass('form-control-plaintext')
                    $('.account-info').removeClass('form-control')
                    $('.account-info-div').addClass('d-none')
                    $('.account-info-x').removeClass('d-none')

                    $('#account-firstname, #account-lastname, #account-email, #account-contact, #account-house, #account-street, #account-barangay').removeClass('is-valid')
                    $('#account-firstname, #account-lastname, #account-email, #account-contact, #account-house, #account-street, #account-barangay').removeClass('is-valid')

                    $('#valid-username').text('Success! Your username has been updated.')
                    $('#valid-password').text('Success! Your password has been updated.')

                    setTimeout(function(){
                        $('.account-info').addClass('form-control-plaintext')
                        $('#account-username, #account-password').removeClass('is-valid')
                        $('#account-username, #account-password').removeClass('is-invalid')
                        $('#valid-username, #invalid-username').text('')
                    }, 5000)

                    loadProfile()
                }
            });
        }
        

            return false;
    })

    $('form#form-account-info').submit(function(e){
        e.preventDefault()

        checkUsername()
        checkPassword()

        if(checkUsername() && checkPassword()){
            var formData = new FormData($(this)[0]);
    
            $.ajax({
                url: '/controller/settings-update.php',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function (response) {
                    console.log(response)
                    $('#btn-save-account').addClass('d-none')
                    $('#btn-edit-account').removeClass('d-none')
                    $('.account-edit').attr('disabled', true)
                    $('#account-image-file').prop('disabled', false)
                    $('.account-edit').addClass('form-control-plaintext')

                    $('#valid-username').text('Success! Your username has been updated.')
                    $('#valid-password').text('Success! Your password has been updated.')

                    setTimeout(function(){
                        $('#account-username, #account-password').removeClass('is-valid')
                        $('#account-username, #account-password').removeClass('is-invalid')
                        $('.account-edit').removeClass('form-control')
                        // $('#valid-username, #invalid-username').text('')
                    }, 3000)

                    
                    loadProfile()
                }
            });
        }
        

            return false;
    })


})
function checkPassword(){
    var password = $('#account-password').val()

    if(password != ''){
        if(password.length < 8){
            $('#account-password').addClass('is-invalid')
            $('#account-password').removeClass('is-valid')
            // $('#invalid-password').text('Your password must be greater or equal to 8 characters.');
            return false;
        }else if(password.length >= 8 && password.length < 12){
            $('#account-password').addClass('is-valid')
            $('#account-password').removeClass('is-invalid')
            // $('#valid-password').text('Your password strength is average.');
            
            return true;
        }else if(password.length >= 12){
            $('#account-password').addClass('is-valid')
            $('#account-password').removeClass('is-invalid')
            // $('#valid-password').text('Your password strength is strong.');
            return true;
        }
    }else{
        $('#account-password').addClass('is-invalid')
        $('#account-password').removeClass('is-valid')
        $('#invalid-password').text('Please enter your password.');
        return false;
    }
}

var user = '';

function checkUsername(){
    var username = $('#account-username').val()
    var pattern = /^[a-zA-Z0-9]*$/;
    var validUsername = pattern.test(username);
    var accountNum = $('#sessionID').val()

    if(validUsername && username == '' && username.length < 6){
        $('#account-username').addClass('is-invalid')
        $('#account-username').removeClass('is-valid')
        $('#invalid-username').text('Please enter your username.');
        return false;
    }else if(validUsername && username != '' && username.length >= 6){
        $.ajax({
            url: '/controller/auth-verify.php',
            method: 'post',
            data:{
                username: $('#account-username').val(),
                session: accountNum,
            },
            success: function(response){
                if(response == 1){
                    $('#account-username').addClass('is-invalid')
                    $('#account-username').removeClass('is-valid')
                    // $('#invalid-username').text('This username is already taken.')
                    user = false;
                }else{
                    $('#account-username').addClass('is-valid')
                    $('#account-username').removeClass('is-invalid')
                    // $('#valid-username').text('Your username is valid.')
                    user = true;
                }
            }
        });
        return user;
    }else if(validUsername && username != '' && username.length <= 6){
        $('#account-username').addClass('is-invalid')
        $('#account-username').removeClass('is-valid')
        $('#invalid-username').text('Your username must be greater than 6 characters.');
        return false;
    }else if(!validUsername){
        $('#account-username').addClass('is-invalid')
        $('#account-username').removeClass('is-valid')
        $('#invalid-username').text('Your username must be alphanumeric.');
        return false;
    }else if(username == ''){
        $('#account-username').addClass('is-invalid')
        $('#account-username').removeClass('is-valid')
        $('#invalid-username').text('Please enter your username.');
        return false;
    }
}

function checkFirstName() {
    var pattern = /^[a-zA-Z\s]*$/;
    var firstName = $('#account-firstname').val();
    var validuser = pattern.test(firstName);
        if (!validuser) {
            $('#account-firstname').addClass('is-invalid')
            $('#account-firstname').removeClass('is-valid')
            // $('#invalid-firstname').text('Your name is invalid.');
            return false;
        }else if(firstName == ''){
            $('#account-firstname').addClass('is-invalid')
            $('#account-firstname').removeClass('is-valid')
            // $('#invalid-firstname').text('Please enter your name.');
            return false;
        }else {
            $('#account-firstname').addClass('is-valid')
            $('#account-firstname').removeClass('is-invalid')
            // $('#valid-firstname').text('Your name is valid.');
            return true;
        }
}

function checkLastName() {
    var pattern = /^[a-zA-Z\s]*$/;
    var lastname = $('#account-lastname').val();
    var validuser = pattern.test(lastname);
    
        if (!validuser) {
            $('#account-lastname').addClass('is-invalid')
            $('#account-lastname').removeClass('is-valid')
            // $('#invalid-lastname').text('Your name is invalid.');
            return false;
        }else if(lastname == ''){
            $('#account-lastname').addClass('is-invalid')
            $('#account-lastname').removeClass('is-valid')
            // $('#invalid-lastname').text('Please enter your name.');
            return false;
        }else {
            $('#account-lastname').addClass('is-valid')
            $('#account-lastname').removeClass('is-invalid')
            // $('#valid-lastname').text('Your name is valid.');
            return true;
        }
}

var addr = '';
function checkEmail() {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $('#account-email').val();
    var validEmail = pattern.test(email);
    var accountNum = $('#sessionID').val()

    if (!validEmail){
        $('#account-email').addClass('is-invalid')
        $('#account-email').removeClass('is-valid')
        // $('#invalid-email').text('Your email address is invalid.');
        return false;
    }else if(email == ''){
        $('#account-email').addClass('is-invalid')
        $('#account-email').removeClass('is-valid')
        // $('#invalid-email').text('Please enter your email address.');
        return false;
    }else {
        
        $.ajax({
            url: '/controller/auth-verify.php',
            method: 'post',
            data:{
                email: $('#account-email').val(),
                session: accountNum,
            },
            success: function(response){
                console.log(response)
                if(response == 0){
                    $('#account-email').addClass('is-invalid')
                    $('#account-email').removeClass('is-valid')
                    // $('#invalid-email').text('This email address is already taken.')
                    addr = false;
                }else{
                    $('#account-email').addClass('is-valid')
                    $('#account-email').removeClass('is-invalid')
                    // $('#valid-email').text('Your email address is valid.')
                    addr = true;

                }

            }
        });
        return addr;
    }
}

function checkContact() {
    var pattern = /[09]{2}[0-9]{9}/gm;
    var contact = $('#account-contact').val();
    var validContact = pattern.test(contact);
        if(!validContact){
            $('#account-contact').addClass('is-invalid')
            $('#account-contact').removeClass('is-valid')
            // $('#invalid-contact').text('Your contact number is invalid.');
            return false;
        }else if(contact == ''){
            $('#account-contact').addClass('is-invalid')
            $('#account-contact').removeClass('is-valid')
            // $('#invalid-contact').text('Please enter your contact number.');
            return false;
        }else{
            $('#account-contact').addClass('is-valid')
            $('#account-contact').removeClass('is-invalid')
            // $('#valid-contact').text('Your contact number is valid.');
            return true;
        }
}

function checkHouse() {
    var pattern = /^[a-zA-Z0-9 -,.#]*$/;
    var house = $('#account-house').val();
    var validHouse = pattern.test(house);
        if(!validHouse){
            $('#account-house').addClass('is-invalid')
            $('#account-house').removeClass('is-valid')
            // $('#invalid-house').text('Your house address is invalid.');
            return false;
        }else if(house == ''){
            $('#account-house').addClass('is-invalid')
            $('#account-house').removeClass('is-valid')
            // $('#invalid-house').text('Please enter your house address.');
            return false;
        }else{
            $('#account-house').addClass('is-valid')
            $('#account-house').removeClass('is-invalid')
            // $('#valid-house').text('Your house address is valid.');
            return true;
        }
}

function checkStreet() {
    var pattern = /^[a-zA-Z0-9 -,.#]*$/;
    var street = $('#account-street').val();
    var validStreet = pattern.test(street);
        if(!validStreet){
            $('#account-street').addClass('is-invalid')
            $('#account-street').removeClass('is-valid')
            // $('#invalid-street').text('Your house street is invalid.');
            return false;
        }else if(street == ''){
            $('#account-street').addClass('is-invalid')
            $('#account-street').removeClass('is-valid')
            // $('#invalid-street').text('Please enter your house street.');
            return false;
        }else{
            $('#account-street').addClass('is-valid')
            $('#account-street').removeClass('is-invalid')
            // $('#valid-street').text('Your house street is valid.');
            return true;
        }
}

function checkBarangay(){
    var street = $('select#account-barangay option:selected').val();
    if(street == ''){
        $('#account-barangay').addClass('is-invalid')
        $('#account-barangay').removeClass('is-valid')
        // $('#invalid-barangay').text('Please select your barangay.');
        return false;
    }else{
        $('#account-barangay').addClass('is-valid')
        $('#account-barangay').removeClass('is-invalid')
        // $('#valid-barangay').text('Your barangay is valid.');
        return true;
    }
}