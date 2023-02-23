function loadAccounts(){
    $.ajax({
        url: "/controller/core-accounts.php",
        method: "POST",
        data: {
            sessionID : $('#sessionID').val(),
        },
        success: function(response) {
            console.log(response)
            appendAccounts(response);
        }
    });
}

$(function(){
    loadAccounts()

    var barangay_list = ["Assumption", "Bagong Buhay I", "Bagong Buhay II", "Bagong Buhay III", "Citrus", "Ciudad Real", "Dulong Bayan", "Fatima I", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "Francisco Homes-Guijo", "Francisco Homes-Mulawin", "Francisco Homes-Narra", "Francisco Homes-Yakal", "Gaya-Gaya", "Graceville I", "Gumaoc-Central", "Gumaoc-East", "Kaybanban", "Kaypian", "Lawang Pari", "Maharlika", "Minuyan I", "Minuyan II", "Minuyan III", "Minuyan IV", "Minuyan V", "Minuyan Proper", "Muzon", "Paradise III", "Poblacion", "Poblacion I", "San Isidro", "San Manuel", "San Martin I", "San Martin II", "San Martin III", "San Martin IV", "San Martin V", "San Pedro", "San Rafael I", "San Rafael II", "San Rafael III", "San Rafael IV", "San Rafael V", "Santo Cristo", "Santo Niño I", "Santo Niño II", "Sapang Palay Proper", "St. Martin de Porres", "Tungkong Mangga"];
    for(i = 0; i < barangay_list.length; i++){
        $('.barangay-list').append(`
            <option value="${barangay_list[i]}">${barangay_list[i]}</option>
        `)
    }

    for(x = 1; x <= 31; x++){
        $('.date-day').append(`
            <option value="${x}">${x}</option>
        `)
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for(z = 0; z < months.length; z++){
        $('.date-month').append(`
            <option value="${z}">${months[z]}</option>
        `)
    }

    year_start  = 1940;
    year_end = new Date().getFullYear();

    for(year = year_start; year <= year_end; year++) {
        $('.date-year').append(`
            <option value="${year}">${year}</option>
        `)
    }
})

function appendAccounts(json){


   try{
        const acc = JSON.parse(json);

         
        localStorage.setItem('alert', acc.s_alert);
        localStorage.setItem('rowcount', acc.s_rowcount);

        // const JSONdata = JSON.stringify(json);
        // const inv = JSON.parse(JSONdata);
        $('#table-category-text').text(acc.table_category.toUpperCase())
        $('#table-record-text').text(acc.table_records+'/'+acc.table_total_records)
        $('#table-page-total-pages').text(acc.table_page+'/'+acc.table_total_page);
        $('#select-row-count').val(acc.s_rowcount)
        $('#select-alert-type').val(acc.s_alert)

        $('.populate-userlevel').empty()
        $('.populate-userlevel').append(`<option selected disabled value="" class="dropdown-header">Userlevel</option>`)
        for(z = 0; z < acc.arr_num_rows; z++){
            $('.populate-userlevel').append(`
                <option value="${acc.arr_categories[z]}">${acc.arr_categories[z]}</option>
            `)
        }
        $('#accounts-category').val(acc.category)
        var page = parseInt(acc.table_page);
        var total_pages = parseInt(acc.table_total_page);
        

        $('#paginationNext').val(page+1);
        $('#paginationCurr').attr('placeholder', page);
        $('#paginationCurr').attr('max', total_pages);
        $('#paginationCurr').attr('min', 1);
        $('#paginationPrev').val(page-1);

        if(acc.table_total_page == 1){
            $('#paginationCurr').prop('disabled', true);
        }else{
            $('#paginationCurr').prop('disabled', false);
        }


        if(page == acc.table_total_page){
            $('#paginationNext').attr('disabled', 'disabled');
        }else{
            $('#paginationNext').removeAttr('disabled', 'disabled');
        }
        if(page == 1){
            $('#paginationPrev').attr('disabled', 'disabled');
        }else{
            $('#paginationPrev').removeAttr('disabled', 'disabled');
        }

        if(acc.primary == false){
            $('#edit-account-status-disabled').remove()
        }
        
        $('#table-accounts-thead').empty()
        $('#table-accounts-tbody').empty()
        $('#table-accounts-thead').append(`
            <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Status</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
        `)

        if(acc.i_num_rows <= 0){
            $('#table-accounts-tbody').append(`
                <tr class="text-truncate">
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                </tr>
            `)
        }else{
            for(i = 0; i < acc.i_num_rows; i++){
                i_class = (acc.i_status[i] == 'Active' ? 'badge fs-6 bg-success' : (acc.i_status[i] == 'Inactive' ? 'badge fs-6 bg-danger' : 'badge fs-6 bg-secondary'))
                i_user = (acc.i_userlevel[i] == 'Administrator' ? 'badge fs-6 bg-info' : (acc.i_userlevel[i] == 'Cashier' ? 'badge fs-6 bg-success' : 'badge fs-6 bg-warning'))

                if(acc.primary == true){
                    $('#table-accounts-tbody').append(`
                    <tr class="text-truncate">
                        <td>${i+1}</td>
                        <td>${acc.i_firstname[i]} ${acc.i_lastname[i]}</td>
                        <td>${acc.i_username[i]}</td>
                        <td>${acc.i_email[i]}</td>
                        <td>${acc.i_contact[i]}</td>
                        <td>${acc.i_barangay[i]}</td>
                        <td>
                            <span class="${i_class}">${acc.i_status[i]}</span>
                        </td>
                        <td>
                            <span class="${i_user}">${acc.i_userlevel[i]}</span>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewAccount('${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_birthdate[i]}','${acc.i_contact[i]}','${acc.i_status[i]}','${acc.i_address[i]}','${acc.i_userlevel[i]}','${acc.i_date[i]}','${acc.i_time[i]}','${acc.i_profilesrc[i]}','${acc.i_account[i]}')"></button>
                            <button class="btn btn-success btn-sm bi bi-pencil-square" onclick="EditAccount('${acc.i_id[i]}','${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_contact[i]}','${acc.i_birthday[i]}','${acc.i_birthmonth[i]}','${acc.i_birthyear[i]}','${acc.i_house[i]}','${acc.i_street[i]}','${acc.i_barangay[i]}','${acc.i_city[i]}','${acc.i_province[i]}','${acc.i_status[i]}','${acc.i_userlevel[i]}', ${acc.primary}, '${acc.s_userlevel}')"></button>
                            <button class="btn btn-danger btn-sm bi bi-slash-circle" onclick="DisableAccount('${acc.i_id[i]}','${acc.i_username[i]}','${acc.i_userlevel[i]}')"></button>
                        </td>
                    </tr>
                `)
                }else{
                    $('#table-accounts-tbody').append(`
                        <tr class="text-truncate">
                            <td>${i+1}</td>
                            <td>${acc.i_firstname[i]} ${acc.i_lastname[i]}</td>
                            <td>${acc.i_username[i]}</td>
                            <td>${acc.i_email[i]}</td>
                            <td>${acc.i_contact[i]}</td>
                            <td>${acc.i_barangay[i]}</td>
                            <td>
                            <span class="${i_class}">${acc.i_status[i]}</span>
                            </td>
                            <td>
                                <span class="${i_user}">${acc.i_userlevel[i]}</span>
                            </td>
                            <td>
                            <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewAccount('${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_birthdate[i]}','${acc.i_contact[i]}','${acc.i_status[i]}','${acc.i_address[i]}','${acc.i_userlevel[i]}','${acc.i_date[i]}','${acc.i_time[i]}','${acc.i_profilesrc[i]}','${acc.i_account[i]}')"></button>
                                <button class="btn btn-success btn-sm bi bi-pencil-square" onclick="EditAccount('${acc.i_id[i]}','${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_contact[i]}','${acc.i_birthday[i]}','${acc.i_birthmonth[i]}','${acc.i_birthyear[i]}','${acc.i_house[i]}','${acc.i_street[i]}','${acc.i_barangay[i]}','${acc.i_city[i]}','${acc.i_province[i]}','${acc.i_status[i]}','${acc.i_userlevel[i]}', ${acc.primary}, '${acc.s_userlevel}')"></button>
                            </td>
                        </tr>
                    `)
                }
            }
        }
   }catch{
    const acc = JSON.parse(JSON.stringify(json))
    localStorage.setItem('alert', acc.s_alert);
    localStorage.setItem('rowcount', acc.s_rowcount);

    // const JSONdata = JSON.stringify(json);
    // const inv = JSON.parse(JSONdata);
    $('#table-category-text').text(acc.table_category.toUpperCase())
    $('#table-record-text').text(acc.table_records+'/'+acc.table_total_records)
    $('#table-page-total-pages').text(acc.table_page+'/'+acc.table_total_page);
    $('#select-row-count').val(acc.s_rowcount)
    $('#select-alert-type').val(acc.s_alert)

    $('.populate-userlevel').empty()
    $('.populate-userlevel').append(`<option selected disabled value="" class="dropdown-header">Userlevel</option>`)
    for(z = 0; z < acc.arr_num_rows; z++){
        $('.populate-userlevel').append(`
            <option value="${acc.arr_categories[z]}">${acc.arr_categories[z]}</option>
        `)
    }
    $('#accounts-category').val(acc.category)
    var page = parseInt(acc.table_page);
    var total_pages = parseInt(acc.table_total_page);
    

    $('#paginationNext').val(page+1);
    $('#paginationCurr').attr('placeholder', page);
    $('#paginationCurr').attr('max', total_pages);
    $('#paginationCurr').attr('min', 1);
    $('#paginationPrev').val(page-1);

    if(acc.table_total_page == 1){
        $('#paginationCurr').prop('disabled', true);
    }else{
        $('#paginationCurr').prop('disabled', false);
    }


    if(page == acc.table_total_page){
        $('#paginationNext').attr('disabled', 'disabled');
    }else{
        $('#paginationNext').removeAttr('disabled', 'disabled');
    }
    if(page == 1){
        $('#paginationPrev').attr('disabled', 'disabled');
    }else{
        $('#paginationPrev').removeAttr('disabled', 'disabled');
    }

    if(acc.primary == false){
        $('#edit-account-status-disabled').remove()
    }
    
    $('#table-accounts-thead').empty()
    $('#table-accounts-tbody').empty()
    $('#table-accounts-thead').append(`
        <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Status</th>
            <th>Type</th>
            <th>Action</th>
        </tr>
    `)

    if(acc.i_num_rows <= 0){
        $('#table-accounts-tbody').append(`
            <tr class="text-truncate">
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
            </tr>
        `)
    }else{
        for(i = 0; i < acc.i_num_rows; i++){
            i_class = (acc.i_status[i] == 'Active' ? 'badge fs-6 bg-success' : (acc.i_status[i] == 'Inactive' ? 'badge fs-6 bg-danger' : 'badge fs-6 bg-secondary'))
            i_user = (acc.i_userlevel[i] == 'Administrator' ? 'badge fs-6 bg-info' : (acc.i_userlevel[i] == 'Cashier' ? 'badge fs-6 bg-success' : 'badge fs-6 bg-warning'))
            console.log(i)
            if(acc.primary == true){
                $('#table-accounts-tbody').append(`
                <tr class="text-truncate">
                    <td>${i+1}</td>
                    <td>${acc.i_firstname[i]} ${acc.i_lastname[i]}</td>
                    <td>${acc.i_username[i]}</td>
                    <td>${acc.i_email[i]}</td>
                    <td>${acc.i_contact[i]}</td>
                    <td>${acc.i_barangay[i]}</td>
                    <td>
                        <span class="${i_class}">${acc.i_status[i]}</span>
                    </td>
                    <td>
                        <span class="${i_user}">${acc.i_userlevel[i]}</span>
                    </td>
                    <td>
                    <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewAccount('${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_birthdate[i]}','${acc.i_contact[i]}','${acc.i_status[i]}','${acc.i_address[i]}','${acc.i_userlevel[i]}','${acc.i_date[i]}','${acc.i_time[i]}','${acc.i_profilesrc[i]}','${acc.i_account[i]}')"></button>
                        <button class="btn btn-success btn-sm bi bi-pencil-square" onclick="EditAccount('${acc.i_id[i]}','${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_contact[i]}','${acc.i_birthday[i]}','${acc.i_birthmonth[i]}','${acc.i_birthyear[i]}','${acc.i_house[i]}','${acc.i_street[i]}','${acc.i_barangay[i]}','${acc.i_city[i]}','${acc.i_province[i]}','${acc.i_status[i]}','${acc.i_userlevel[i]}', ${acc.primary}, '${acc.s_userlevel}')"></button>
                        <button class="btn btn-danger btn-sm bi bi-slash-circle" onclick="DisableAccount('${acc.i_id[i]}','${acc.i_username[i]}','${acc.i_userlevel[i]}')"></button>
                    </td>
                </tr>
            `)
            }else{
                $('#table-accounts-tbody').append(`
                    <tr class="text-truncate">
                        <td>${i+1}</td>
                        <td>${acc.i_firstname[i]} ${acc.i_lastname[i]}</td>
                        <td>${acc.i_username[i]}</td>
                        <td>${acc.i_email[i]}</td>
                        <td>${acc.i_contact[i]}</td>
                        <td>${acc.i_barangay[i]}</td>
                        <td>
                        <span class="${i_class}">${acc.i_status[i]}</span>
                        </td>
                        <td>
                            <span class="${i_user}">${acc.i_userlevel[i]}</span>
                        </td>
                        <td>
                        <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewAccount('${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_birthdate[i]}','${acc.i_contact[i]}','${acc.i_status[i]}','${acc.i_address[i]}','${acc.i_userlevel[i]}','${acc.i_date[i]}','${acc.i_time[i]}','${acc.i_profilesrc[i]}','${acc.i_account[i]}')"></button>
                            <button class="btn btn-success btn-sm bi bi-pencil-square" onclick="EditAccount('${acc.i_id[i]}','${acc.i_firstname[i]}','${acc.i_lastname[i]}','${acc.i_username[i]}','${acc.i_email[i]}','${acc.i_contact[i]}','${acc.i_birthday[i]}','${acc.i_birthmonth[i]}','${acc.i_birthyear[i]}','${acc.i_house[i]}','${acc.i_street[i]}','${acc.i_barangay[i]}','${acc.i_city[i]}','${acc.i_province[i]}','${acc.i_status[i]}','${acc.i_userlevel[i]}', ${acc.primary}, '${acc.s_userlevel}')"></button>
                        </td>
                    </tr>
                `)
            }
        }
    }
   }
}


$(function(){
    $("form#form-add-account").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/account-cashier-admin-add.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {

                console.log(response)
                $('.input-clear-form').val('')
                $('#add-account-modal').modal('hide')
                AlertPrompt(response)
                loadAccounts()
            }
        });
        return false;
    });

    $("form#form-edit-account").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/account-update.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {

                console.log(response)
                    
                $('#edit-account-modal').modal('hide')

                loadAccounts()

                AlertPrompt(response)
            }
        });
        return false;
    });

    $('#edit-account-submit').click(function(){
        $('form#form-edit-account').submit()
    })

})

function ViewAccount(firstname, lastname, username, email, birthday, contact, status, address, userlevel, date, time, profilesrc, account){

    text = (status == 'Active' ? 'text-success' : (status == 'Inactive' ? 'text-danger' : 'text-secondary'))

    $('#view-account-image').attr('src', profilesrc)
    $('#view-account-fullname').val(firstname + ' ' + lastname)
    $('#view-account-username').val(username)
    $('#view-account-email').val(email)
    $('#view-account-contact').val(contact)
    $('#view-account-status').val(status)
    $('#view-account-birthday').val(birthday)
    $('#view-account-address').text(address)
    $('#view-account-userlevel').val(userlevel)
    $('#view-account-status').addClass(text)
    $('#view-account-date').val(date)
    $('#view-account-time').val(time)

    if(userlevel == 'Customer'){
        $('.view-unnecessary').show()
    }else{
        $('.view-unnecessary').hide()
    }

    $('#view-account-modal').modal('show')

    $('#view-account-transaction').click(function(){

        $('#view-account-modal').modal('hide')
        $('#view-transactions-modal').modal('show')

        $.ajax({
            url: "/controller/core-accounts.php",
            method: "POST",
            data: {
                userID : account,
            },
            success: function(response) {
                console.log(response)
                console.log(account)
                appendTransactions(response)
            }
        });

        $('#view-transactions-return').click(function(){
            $('#view-transactions-modal').modal('hide')
            $('#view-account-modal').modal('show')
        })
    })

}


function EditAccount(id, firstname, lastname, username, email, contact, day, month, year, house, street, barangay, city, province, status, userlevel, primary){
    
    text = (userlevel == 'Administrator' ? 'text-primary' : (userlevel == 'Cashier' ? 'text-success' : 'text-warning'))

    if(primary == true){
        $('#edit-account-id').val(id)
        $('#edit-account-status').val(status)
        $('#edit-account-firstname').val(firstname)
        $('#edit-account-lastname').val(lastname)
        $('#edit-account-username').val(username)
        $('#edit-account-email').val(email)
        $('#edit-account-contact').val(contact)
        $('#edit-account-day').val(day)
        $('#edit-account-month').val(month)
        $('#edit-account-year').val(year)
        $('#edit-account-house').val(house)
        $('#edit-account-street').val(street)
        $('#edit-account-barangay').val(barangay)
        $('#edit-account-city').val(city)
        $('#edit-account-province').val(province)
        $('#edit-account-userlevel').text(userlevel)
        $('#edit-account-userlevel').addClass(text)

        $('#edit-account-footer').empty()
        $('#edit-account-footer').removeClass('text-center text-danger h5 d-block')
        $('#edit-account-footer').append(`
            <button type="submit" id="edit-account-submit" class="btn btn-primary w-25">Save</button>
            <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
        `)

        $('#edit-account-id').prop('disabled', false)
        $('#edit-account-status').prop('disabled', false)
        $('#edit-account-firstname').prop('disabled', false)
        $('#edit-account-lastname').prop('disabled', false)
        $('#edit-account-username').prop('disabled', false)
        $('#edit-account-email').prop('disabled', false)
        $('#edit-account-contact').prop('disabled', false)
        $('#edit-account-day').prop('disabled', false)
        $('#edit-account-month').prop('disabled', false)
        $('#edit-account-year').prop('disabled', false)
        $('#edit-account-house').prop('disabled', false)
        $('#edit-account-street').prop('disabled', false)
        $('#edit-account-barangay').prop('disabled', false)
        $('#edit-account-city').prop('disabled', false)
        $('#edit-account-province').prop('disabled', false)
        $('#edit-account-userlevel').prop('disabled', false)

    }else if(primary == false && userlevel == 'Administrator'){
        $('#edit-account-id').val(id)
        $('#edit-account-status').val(status == 'Disabled' ? 'Inactive' : status)
        $('#edit-account-firstname').val(firstname)
        $('#edit-account-lastname').val(lastname)
        $('#edit-account-username').val(username)
        $('#edit-account-email').val(email)
        $('#edit-account-contact').val(contact)
        $('#edit-account-day').val(day)
        $('#edit-account-month').val(month)
        $('#edit-account-year').val(year)
        $('#edit-account-house').val(house)
        $('#edit-account-street').val(street)
        $('#edit-account-barangay').val(barangay)
        $('#edit-account-city').val(city)
        $('#edit-account-province').val(province)
        $('#edit-account-userlevel').text(userlevel)
        $('#edit-account-userlevel').addClass(text)

        $('#edit-account-id').prop('disabled', true)
        $('#edit-account-status').prop('disabled', true)
        $('#edit-account-firstname').prop('disabled', true)
        $('#edit-account-lastname').prop('disabled', true)
        $('#edit-account-username').prop('disabled', true)
        $('#edit-account-email').prop('disabled', true)
        $('#edit-account-contact').prop('disabled', true)
        $('#edit-account-day').prop('disabled', true)
        $('#edit-account-month').prop('disabled', true)
        $('#edit-account-year').prop('disabled', true)
        $('#edit-account-house').prop('disabled', true)
        $('#edit-account-street').prop('disabled', true)
        $('#edit-account-barangay').prop('disabled', true)
        $('#edit-account-city').prop('disabled', true)
        $('#edit-account-province').prop('disabled', true)
        $('#edit-account-userlevel').prop('disabled', true)

        $('#edit-account-footer').empty()
        $('#edit-account-footer').addClass('text-center text-danger h5 d-block')
        $('#edit-account-footer').append(`
            You are not authorize to modify other Administrator.
        `)
    }else{
        $('#edit-account-id').val(id)
        $('#edit-account-status').val(status)
        $('#edit-account-firstname').val(firstname)
        $('#edit-account-lastname').val(lastname)
        $('#edit-account-username').val(username)
        $('#edit-account-email').val(email)
        $('#edit-account-contact').val(contact)
        $('#edit-account-day').val(day)
        $('#edit-account-month').val(month)
        $('#edit-account-year').val(year)
        $('#edit-account-house').val(house)
        $('#edit-account-street').val(street)
        $('#edit-account-barangay').val(barangay)
        $('#edit-account-city').val(city)
        $('#edit-account-province').val(province)
        $('#edit-account-userlevel').text(userlevel)
        $('#edit-account-userlevel').addClass(text)

        $('#edit-account-footer').empty()
        $('#edit-account-footer').removeClass('text-center text-danger h5 d-block')
        $('#edit-account-footer').append(`
            <button type="submit" id="edit-account-submit" class="btn btn-primary w-25">Save</button>
            <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
        `)

        $('#edit-account-id').prop('disabled', false)
        $('#edit-account-status').prop('disabled', false)
        $('#edit-account-firstname').prop('disabled', false)
        $('#edit-account-lastname').prop('disabled', false)
        $('#edit-account-username').prop('disabled', false)
        $('#edit-account-email').prop('disabled', false)
        $('#edit-account-contact').prop('disabled', false)
        $('#edit-account-day').prop('disabled', false)
        $('#edit-account-month').prop('disabled', false)
        $('#edit-account-year').prop('disabled', false)
        $('#edit-account-house').prop('disabled', false)
        $('#edit-account-street').prop('disabled', false)
        $('#edit-account-barangay').prop('disabled', false)
        $('#edit-account-city').prop('disabled', false)
        $('#edit-account-province').prop('disabled', false)
        $('#edit-account-userlevel').prop('disabled', false)
        
    }
    $('#edit-account-submit').click(function(){
        $('form#form-edit-account').submit()
    })

    $('#edit-account-modal').modal('show')
}

function DisableAccount(id, username, userlevel){

    text = (userlevel == 'Administrator' ? 'text-primary' : (userlevel == 'Cashier' ? 'text-success' : 'text-warning'))

        Swal.fire({
            title: 'Disable ' + userlevel,
            html: 'Do you want to disable <span class="fw-bolder '+text+'">' + username + '</span>?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed){

                $.ajax({
                    url: '/controller/account-disable.php',
                    method: 'post',
                    data:{
                        sessionID: $('#sessionID').val(),
                        id: id,
                        action: 'disable',
                        username: username,
                    },
                    success: function(response){
                        console.log(response)

                        loadAccounts()

                        const res = JSON.parse(response)
                        
                        AlertPrompt(response)

                    }
                })


            }
        })

}

$(document).ready(function() {
    $('#page-search-account').keyup(function(e) {
        var val = $('#page-search-account').val();
        var insert = val.toString();
        if (e.key === 'Enter' || e.keyCode === 13) {
            $.ajax({
                url: "/controller/core-accounts.php",
                method: "POST",
                data: {
                    search : insert,
                    sessionID : $('#sessionID').val(),
                },
                success: function(response) {
                    $('#search').val('')
                    // console.log(response)
                    appendAccounts(response)
                }
            });
        }else if(val == ''){
            loadAccounts()
        }
    });
});

$(document).ready(function() {
    $('#paginationNext').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationNext').val();
        $.ajax({
            url: "/controller/core-accounts.php",
            method: "POST",
            data: {
                page : pageNo,
                sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendAccounts(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationPrev').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationPrev').val();
        $.ajax({
            url: "/controller/core-accounts.php",
            method: "POST",
            data: {
                page : pageNo,
                sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendAccounts(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationCurr').keyup(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationCurr').val();
        $.ajax({
            url: "/controller/core-accounts.php",
            method: "POST",
            data: {
                page : pageNo,
                sessionID : session,
            },
            success: function(response) {
                $('#paginationCurr').val('');
                $('#search').val('');
                appendAccounts(response);
            }
        });
    });
});


$(document).ready(function() {
    $('#accounts-category').change(function() {
        var category = $('#accounts-category').val();
        $.ajax({
            url: "/controller/toggle-settings.php",
            method: "POST",
            data: {
                accounts : category,
                sessionID : $('#sessionID').val(),
            },
            success: function(response) {
                console.log(category)
                loadAccounts()
            }
        });
    });
});

$(function(){
    $('#select-row-count').change(function(){
        $.ajax({
            url: '/controller/toggle-settings.php',
            method: 'post',
            data:{
                sessionID: $('#sessionID').val(),
                row_acc: $('select#select-row-count option:selected').val(),
            },
            success: function(response){
                // $('#table-settings-modal').modal('hide')
                // console.log(response)

                loadAccounts()
            }
        })
    });

    $('#select-alert-type').change(function(){
        $.ajax({
            url: '/controller/toggle-settings.php',
            method: 'post',
            data:{
                sessionID: $('#sessionID').val(),
                alert: $('select#select-alert-type option:selected').val(),
            },
            success: function(response){
                $('#table-settings-modal').modal('hide')
                // console.log(response)
                if(localStorage.getItem('alert') != 'prompt'){
                    Swal.fire({title:'Update Success!', html: 'ALERT <span class="text-danger fw-bolder">Notification</span> > <span class="text-success fw-bolder">Prompt</span>', icon: 'success'})
                }else{
                    Swal.fire({ icon: 'success', html: '<span class="text-dark fw-bolder">Update Success!</span><br>ALERT <span class="text-danger fw-bolder">Prompt</span> > <span class="text-success fw-bolder">Notification</span>', toast: true, position: 'bottom-end', width: '480px', showConfirmButton: false, timer: 2500, timerProgressBar: true, });
                }
                loadAccounts()
            }
        })
    })

    $('#toggle-password-one').click(function(){
        val = $('#password-one').attr('type') == 'password' ? 'text' : 'password'

        $('#password-one').attr('type', val)

        if(val == 'password'){
            $('#toggle-password-one').removeClass('bi-eye-fill')
            $('#toggle-password-one').addClass('bi-eye-slash')
        }else{
            $('#toggle-password-one').addClass('bi-eye-fill')
            $('#toggle-password-one').removeClass('bi-eye-slash')
        }
    })

    $('#toggle-password-two').click(function(){
        val = $('#password-two').attr('type') == 'password' ? 'text' : 'password'

        $('#password-two').attr('type', val)

        if(val == 'password'){
            $('#toggle-password-two').removeClass('bi-eye-fill')
            $('#toggle-password-two').addClass('bi-eye-slash')
        }else{
            $('#toggle-password-two').addClass('bi-eye-fill')
            $('#toggle-password-two').removeClass('bi-eye-slash')
        }
    })

    $('#toggle-password-three').click(function(){
        val = $('#password-three').attr('type') == 'password' ? 'text' : 'password'

        $('#password-three').attr('type', val)

        if(val == 'password'){
            $('#toggle-password-three').removeClass('bi-eye-fill')
            $('#toggle-password-three').addClass('bi-eye-slash')
        }else{
            $('#toggle-password-three').addClass('bi-eye-fill')
            $('#toggle-password-three').removeClass('bi-eye-slash')
        }
    })

    
    $('#toggle-password-four').click(function(){
        val = $('#password-four').attr('type') == 'password' ? 'text' : 'password'

        $('#password-four').attr('type', val)

        if(val == 'password'){
            $('#toggle-password-four').removeClass('bi-eye-fill')
            $('#toggle-password-four').addClass('bi-eye-slash')
        }else{
            $('#toggle-password-four').addClass('bi-eye-fill')
            $('#toggle-password-four').removeClass('bi-eye-slash')
        }
    })

    $('#toggle-password-five').click(function(){
        val = $('#password-five').attr('type') == 'password' ? 'text' : 'password'

        $('#password-five').attr('type', val)

        if(val == 'password'){
            $('#toggle-password-five').removeClass('bi-eye-fill')
            $('#toggle-password-five').addClass('bi-eye-slash')
        }else{
            $('#toggle-password-five').addClass('bi-eye-fill')
            $('#toggle-password-five').removeClass('bi-eye-slash')
        }
    })
})

function appendTransactions(json){

    try{
        const trn = JSON.parse(json)

        $('#table-transactions-thead').empty()
        $('#table-transactions-thead').append(`
            <tr>
                <th>Transaction No.</th>
                <th>Purchased Products</th>
                <th>Amount</th>
            </tr>
        `)
        $('#table-transactions-tbody').empty()
        if(trn.rowlimit > 0){
            for(i = 0; i < trn.rowlimit; i++ ){
                $('#table-transactions-tbody').append(`
                    <tr>
                        <td>${trn.trn_id[i]}</td>
                        <td>${trn.purchased[i]}</td>
                        <td>${trn.amount[i]}</td>
                    </tr>
                `)
            }
        }else{
            $('#table-transactions-tbody').append(`
                <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                </tr>
            `)
        }
    }catch{

        const trn = JSON.parse(JSON.stringify(json))

        $('#table-transactions-thead').empty()
        $('#table-transactions-thead').append(`
            <tr>
                <th>Transaction No.</th>
                <th>Purchased Products</th>
                <th>Amount</th>
            </tr>
        `)
        $('#table-transactions-tbody').empty()
        if(trn.rowlimit > 0){
            for(i = 0; i < trn.rowlimit; i++ ){
                $('#table-transactions-tbody').append(`
                    <tr>
                        <td>${trn.trn_id[i]}</td>
                        <td>${trn.purchased[i]}</td>
                        <td>${trn.amount[i]}</td>
                    </tr>
                `)
            }
        }else{
            $('#table-transactions-tbody').append(`
                <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                </tr>
            `)
        }
    }
    
    

}

function CurrentDatetime(){
    const calendar = new Date();
    var mm = String(calendar.getMonth()+1).padStart(2, '0');
    var dd = String(calendar.getDate()).padStart(2, '0');
    var yyyy = calendar.getFullYear();
    var min = String(calendar.getMinutes()).padStart(2, '0');
    var hr = String(Math.abs(calendar.getHours()-12)).padStart(2, '0');
    var meridiem = (calendar.getHours() < 12 ? 'AM' : 'PM');

    return mm+dd+yyyy+'-'+hr+min+meridiem;

}