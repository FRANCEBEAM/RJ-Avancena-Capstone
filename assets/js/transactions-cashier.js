$(function(){
    loadTransactions()

    $('#transaction-type').change(function() {
        var category = $('#transaction-type').val();
        $.ajax({
            url: "/controller/toggle-settings.php",
            method: "POST",
            data: {
                transactions : category, sessionID : $('#sessionID').val(),
            },
            success: function(response) {
                console.log(response)
                loadTransactions();
            }
        });
    });
})

function loadTransactions(){
    $.ajax({
        url: "../controller/core-transactions.php",
        method: "POST",
        data: {
            sessionID : $('#sessionID').val(),
        },
        success: function(response) {
            appendTransactions(response);
        },
    });
}

function appendTransactions(json){

    try{
        
        const trn = JSON.parse(json);

        console.log(trn.i_num_rows)
        
        localStorage.setItem('alert', trn.s_alert);
        localStorage.setItem('rowcount', trn.s_rowcount);

        $('#table-category').text(trn.table_category.toUpperCase())
        $('#table-records').text(trn.table_records+'/'+trn.table_total_records)
        $('#table-pages').text(trn.table_page+'/'+trn.table_total_page);
        $('#select-row-count').val(trn.s_rowcount)
        $('#select-alert-type').val(trn.s_alert)

        $('.populate-transactions').empty()
        $('.populate-transactions').append(`<option selected disabled value="" class="dropdown-header">Category</option>`)
        for(z = 0; z < trn.arr_num_rows; z++){
            $('.populate-transactions').append(`
                <option value="${trn.arr_categories[z]}">${trn.arr_categories[z]}</option>
            `)
        }

        $('#transaction-type').val(trn.category)

        var page = parseInt(trn.table_page);
        var total_pages = parseInt(trn.table_total_page);


        

        $('#paginationNext').val(page+1);
        $('#paginationCurr').attr('placeholder', page);
        $('#paginationCurr').attr('max', total_pages);
        $('#paginationCurr').attr('min', 1);
        $('#paginationPrev').val(page-1);

        if(trn.table_total_page == 1){
            $('#paginationCurr').prop('disabled', true);
        }else{
            $('#paginationCurr').prop('disabled', false);
        }


        if(page == trn.table_total_page){
            $('#paginationNext').attr('disabled', 'disabled');
        }else{
            $('#paginationNext').removeAttr('disabled', 'disabled');
        }
        if(page == 1){
            $('#paginationPrev').attr('disabled', 'disabled');
        }else{
            $('#paginationPrev').removeAttr('disabled', 'disabled');
        }
        
        $('#table-transactions-thead').empty()
        $('#table-transactions-tbody').empty()
        $('#table-transactions-thead').append(`
            <tr class="text-truncate">
                <th>No.</th>
                <th>Transaction ID</th>
                <th>Purchased Items</th>
                <th>Total Amount</th>
                <th>Date/Time</th>
                <th>Encoder</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        `)

        if(trn.i_num_rows <= 0){
            $('#table-transactions-tbody').append(`
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
            for(i = 0; i < trn.i_num_rows; i++){
                i_class = (trn.trn_type[i] == 'Online' ? 'badge fs-6 bg-success' : 'badge fs-6 bg-warning')
                i_status = (trn.trn_status[i].substring(0,9) == 'Complete' ? 'badge fs-6 bg-success' : (trn.trn_status[i].substring(0,9) == 'Pending' ? 'badge fs-6 bg-primary' : (trn.trn_status[i].substring(0,9) == 'Cancelled' ? 'badge fs-6 bg-warning' : trn.trn_status[i].substring(0,9) == 'Delivered' ? 'badge fs-6 bg-success' : trn.trn_status[i].substring(0,9) == 'Voided' ? 'badge fs-6 bg-secondary' : trn.trn_status[i].substring(0,9) == 'Confirmed' ? 'badge fs-6 bg-warning' : 'badge fs-6 bg-danger')))

                $('#table-transactions-tbody').append(`
                <tr class="text-truncate">
                    <td>${i+1}</td>
                    <td>${trn.trn_id[i]}</td>
                    <td>${trn.trn_items[i].substring(0,30)+'...'}</td>
                    <td>${new Intl.NumberFormat('en-US',{style: 'currency', currency: 'PHP'}).format(trn.trn_final[i])}</td>
                    <td>${trn.trn_date[i]}</td>
                    <td>${trn.trn_user[i]}</td>
                    <td>
                        <span class="${i_class}">${trn.trn_type[i]}</span>
                    </td>
                    <td>
                        <span class="${i_status}">${trn.trn_status[i].substring(0,9)}</span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewTransaction('${trn.trn_id[i]}','${trn.trn_user[i]}','${trn.trn_items[i]}','${trn.trn_quantity[i]}','${trn.trn_final[i]}','${trn.trn_status[i]}','${trn.trn_customer_name[i]}','${trn.trn_address[i]}','${trn.trn_est_delivery[i]}','${trn.trn_downpayment[i]}','${trn.trn_gcashrefnum[i]}')"></button>
                    </td>
                </tr>
            `)
                
            }
        }
    }catch{
        const trn = JSON.parse(JSON.stringify(json));

        console.log(trn.i_num_rows)
        
        localStorage.setItem('alert', trn.s_alert);
        localStorage.setItem('rowcount', trn.s_rowcount);

        $('#table-category').text(trn.table_category.toUpperCase())
        $('#table-records').text(trn.table_records+'/'+trn.table_total_records)
        $('#table-pages').text(trn.table_page+'/'+trn.table_total_page);
        $('#select-row-count').val(trn.s_rowcount)
        $('#select-alert-type').val(trn.s_alert)

        $('.populate-transactions').empty()
        $('.populate-transactions').append(`<option selected disabled value="" class="dropdown-header">Category</option>`)
        for(z = 0; z < trn.arr_num_rows; z++){
            $('.populate-transactions').append(`
                <option value="${trn.arr_categories[z]}">${trn.arr_categories[z]}</option>
            `)
        }

        $('#transaction-type').val(trn.category)

        var page = parseInt(trn.table_page);
        var total_pages = parseInt(trn.table_total_page);


        

        $('#paginationNext').val(page+1);
        $('#paginationCurr').attr('placeholder', page);
        $('#paginationCurr').attr('max', total_pages);
        $('#paginationCurr').attr('min', 1);
        $('#paginationPrev').val(page-1);

        if(trn.table_total_page == 1){
            $('#paginationCurr').prop('disabled', true);
        }else{
            $('#paginationCurr').prop('disabled', false);
        }


        if(page == trn.table_total_page){
            $('#paginationNext').attr('disabled', 'disabled');
        }else{
            $('#paginationNext').removeAttr('disabled', 'disabled');
        }
        if(page == 1){
            $('#paginationPrev').attr('disabled', 'disabled');
        }else{
            $('#paginationPrev').removeAttr('disabled', 'disabled');
        }
        
        $('#table-transactions-thead').empty()
        $('#table-transactions-tbody').empty()
        $('#table-transactions-thead').append(`
            <tr class="text-truncate">
                <th>No.</th>
                <th>Transaction ID</th>
                <th>Purchased Items</th>
                <th>Total Amount</th>
                <th>Date/Time</th>
                <th>Encoder</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        `)

        if(trn.i_num_rows <= 0){
            $('#table-transactions-tbody').append(`
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
            for(i = 0; i < trn.i_num_rows; i++){
                i_class = (trn.trn_type[i] == 'Online' ? 'badge fs-6 bg-success' : 'badge fs-6 bg-warning')
                i_status = (trn.trn_status[i].substring(0,9) == 'Complete' ? 'badge fs-6 bg-success' : (trn.trn_status[i].substring(0,9) == 'Pending' ? 'badge fs-6 bg-primary' : (trn.trn_status[i].substring(0,9) == 'Cancelled' ? 'badge fs-6 bg-warning' : trn.trn_status[i].substring(0,9) == 'Delivered' ? 'badge fs-6 bg-success' : trn.trn_status[i].substring(0,9) == 'Voided' ? 'badge fs-6 bg-secondary' : trn.trn_status[i].substring(0,9) == 'Confirmed' ? 'badge fs-6 bg-warning' : 'badge fs-6 bg-danger')))

                $('#table-transactions-tbody').append(`
                <tr class="text-truncate">
                    <td>${i+1}</td>
                    <td>${trn.trn_id[i]}</td>
                    <td>${trn.trn_items[i].substring(0,30)+'...'}</td>
                    <td>${new Intl.NumberFormat('en-US',{style: 'currency', currency: 'PHP'}).format(trn.trn_final[i])}</td>
                    <td>${trn.trn_date[i]}</td>
                    <td>${trn.trn_user[i]}</td>
                    <td>
                        <span class="${i_class}">${trn.trn_type[i]}</span>
                    </td>
                    <td>
                        <span class="${i_status}">${trn.trn_status[i].substring(0,9)}</span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewTransaction('${trn.trn_id[i]}','${trn.trn_user[i]}','${trn.trn_items[i]}','${trn.trn_quantity[i]}','${trn.trn_final[i]}','${trn.trn_status[i]}','${trn.trn_customer_name[i]}','${trn.trn_address[i]}','${trn.trn_est_delivery[i]}','${trn.trn_downpayment[i]}','${trn.trn_gcashrefnum[i]}')"></button>
                    </td>
                </tr>
            `)
                
            }
        }
    }

}


function ViewTransaction(id, user, items, qty, total, status, customer, address, est_delivery, downpayment, gcashrefnum){
    if(est_delivery == null){
        est_delivery = 'Confirm this transaction to set a date.'
    }

    let content = `
        <div class="container"> 
            <div class="row mb-3">
                <table class="table table-warning table-striped table-hover text-start">
                    <tbody>
                        <tr>
                            <td><b>Transaction ID : </b></td>
                            <td>${id.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td><b>Type : </b></td>
                            <td>${$('#transaction-type').val()}</td>
                        </tr>
                        <tr>
                            <td><b>Ordered by : </b></td>
                            <td>${customer}</td>
                        </tr>
                        <tr>
                            <td><b>User ID : </b></td>
                            <td>${user.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td><b>Shipping address : </b></td>
                            <td>
                                ${address}
                                <br>
                                <button name="${address}" class="btn btn-md btn-success fw-bold map">Search this on Google Maps</button>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Items Ordered : </b></td>
                            <td>${items}</td>
                        </tr>
                        <tr>
                            <td><b>Total price : </b></td>
                            <td>${total}</td>
                        </tr>
                        <tr>
                            <td><b>Downpayment paid : </b></td>
                            <td>${downpayment}</td>
                        </tr>
                        <tr>
                            <td><b>GCash Reference Number : </b></td>
                            <td>${gcashrefnum}</td>
                        </tr>
                        <tr>
                            <td><b>To pay: </b></td>
                            <td>${total-downpayment}</td>
                        </tr>
                        <tr>
                            <td><b>Order status : </b></td>
                            <td>${status}</td>
                        </tr>
                        <tr>
                            <td><b>Estimated delivery : </b></td>
                            <td>${est_delivery}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `


    Swal.fire({
        title: 'View Transactions',
        html: content,
        icon: 'info',
        width: 900,
        showConfirmButton: false,
        showCloseButton: true
    })
}

function transaction_controls(id, type, date){
    $.ajax({
        url: "/controller/core-transactions.php",
        method: "POST",
        dataType: 'json',
        cache: false,
        data: {
            transaction : JSON.stringify({ 'trn_id' : id, 'type' : type, 'date' : date })
        },
        success: function(response) {
            if(response.success == true){
                if(type == 'void'){
                    Swal.fire({
                        icon: 'success',
                        html: `Voided TRN#:${id} successfully.`
                    })
                } else if(type == 'confirm'){
                    Swal.fire({
                        icon: 'success',
                        html: `Confirmed TRN#:${id} successfully.`
                    })
                } else if(type == 'delivered'){
                    Swal.fire({
                        icon: 'success',
                        html: `Marked as delivered TRN#:${id} successfully.`
                    })
                } else if(type == 'cancel'){
                    Swal.fire({
                        icon: 'success',
                        html: `Rejected TRN#:${id} successfully.`
                    })
                }
                loadTransactions()
            } else {
                Swal.fire({
                    icon: 'warning',
                    html: response.error
                })
            }
        },
        error: function(){
            Swal.fire({
                icon: 'error',
                html: `Connection error.`
            })
        }
    })
}

$(document).ready(function(){
    $('body').on('click', '.void-transact', function(){
        let id = $(this).attr('name')
        transaction_controls(id, 'void', '')
    })

    $('body').on('click', '.confirm-transact', function(){
        let id = $(this).attr('name')
        Swal.fire({
            icon: 'info',
            html: `
                <div class="container">
                    <h6 class="text-l">Enter estimated delivery date</h6>
                    <input id="est-delivery" type="date" class="form-control text-m">
                </div>
            `,
            showConfirmButton: true,
            showCancelButton: true,
            showCloseButton: false,
            focusConfirm: true,
            allowOutsideClick: false,
            reverseButtons: true,
        }).then((result) => {
            if(result.isConfirmed){
                transaction_controls(id, 'confirm', $('#est-delivery').val())
            }
        })
    })

    $('body').on('click', '.mark-delivered-transact', function(){
        let id = $(this).attr('name')
        transaction_controls(id, 'delivered', '')
    })

    $('body').on('click', '.cancel-transact', function(){
        let id = $(this).attr('name')
        transaction_controls(id, 'cancel', '')
    })

    $('body').on('click', '.map', function(){
        let address = $(this).attr('name')
        let encoded_address = ''

        for(let i = 0; i < address.length; i++){
            if(address.charAt(i) == ' '){
                encoded_address += '+'
            } else if(address.charAt(i) == ','){
                encoded_address += '%2C'
            } else {
                encoded_address += address.charAt(i)
            }
        }

        window.open('https://www.google.com/maps/search/?api=1&query=' + encoded_address)
    })
})

$(document).ready(function() {
    $('#paginationNext').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationNext').val();
        $.ajax({
            url: "/controller/core-transactions.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendTransactions(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationPrev').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationPrev').val();
        $.ajax({
            url: "/controller/core-transactions.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendTransactions(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationCurr').keyup(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationCurr').val();
        $.ajax({
            url: "/controller/core-transactions.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#paginationCurr').val('');
                $('#search').val('');
                appendTransactions(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#search').keyup(function(e) {
        var val = $('#search').val();
        var insert = val.toString();
        if (e.key === 'Enter' || e.keyCode === 13) {
            $.ajax({
                url: "/controller/core-transactions.php",
                method: "POST",
                data: {
                    search : insert, sessionID : $('#sessionID').val(),
                },
                success: function(response) {
                    $('#search').val('')
                    // console.log(response)
                    appendTransactions(response)
                }
            });
        }else if(val == ''){
            loadInventory();
        }
    });
});