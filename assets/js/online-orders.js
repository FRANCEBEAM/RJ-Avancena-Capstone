$(function(){
    loadTransactions()

    $('#transaction-type').change(function() {
        var category = $('#transaction-type').val();
        $.ajax({
            url: "/controller/toggle-settings.php",
            method: "POST",
            data: {
                orders : category, sessionID : $('#sessionID').val(),
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
        url: "../controller/core-online-orders.php",
        method: "POST",
        data: {
            sessionID : $('#sessionID').val(),
        },
        success: function(response) {
            console.log(response)
            console.log($('#sessionID').val())
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
                i_status = (trn.trn_status[i].substring(0,9) == 'Complete' ? 'badge fs-6 bg-success' : (trn.trn_status[i].substring(0,9) == 'Pending' ? 'badge fs-6 bg-secondary' : (trn.trn_status[i].substring(0,9) == 'Cancelled' ? 'badge fs-6 bg-warning' : 'badge fs-6 bg-danger')))

                $('#table-transactions-tbody').append(`
                <tr class="text-truncate">
                    <td>${i+1}</td>
                    <td>${trn.trn_id[i]}</td>
                    <td>${trn.trn_items[i].substring(0,30)+'...'}</td>
                    <td>${new Intl.NumberFormat('en-US',{style: 'currency', currency: 'PHP'}).format(trn.trn_total[i])}</td>
                    <td>${trn.trn_date[i]}</td>
                    <td>${trn.trn_user[i]}</td>
                    <td>
                        <span class="${i_class}">${trn.trn_type[i]}</span>
                    </td>
                    <td>
                        <span class="${i_status}">${trn.trn_status[i].substring(0,9)}</span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm bi bi-eye-fill" onclick="ViewTransaction('${trn.trn_id[i]}','${trn.trn_user[i]}','${trn.trn_items[i]}','${trn.trn_quantity[i]}','${trn.trn_final[i]}','${trn.trn_status[i]}',)"></button>
                    </td>
                </tr>
            `)
                
            }
        }
    }catch{
        const trn = JSON.parse(JSON.stringify(json));

        }

}

// $data['trn_id'][$i] = $row['transaction_id'];
// $data['trn_user'][$i] = ucwords($row['user_id']);
// $data['trn_type'][$i] = ucwords($row['type']);
// $data['trn_date'][$i] = date('M j, Y g:i A', strtotime($row['transaction_date']));
// $data['trn_items'][$i] = implode(", ", json_decode($row['purchased_items'])->names);
// $data['trn_quantity'][$i] = json_decode($row['purchased_items'])->quantities;
// $data['trn_subtotal'][$i] = json_decode($row['purchased_items'])->subtotals;
// $data['trn_shipping'][$i] = json_decode($row['purchased_items'])->shipping;
// $data['trn_discount'][$i] = json_decode($row['purchased_items'])->discount;
// $data['trn_rec_addr'][$i] = json_decode($row['purchased_items'])->address;
// $data['trn_total'][$i] = json_decode($row['purchased_items'])->finaltotal;
// $data['trn_ids'][$i] = json_decode($row['purchased_items'])->ids;
// $data['trn_status'][$i] = ucwords($row['status']);
// $data['trn_total'][$i] = $row['total_price'];
// $data['trn_shipping'][$i] = $row['shipping'];
// $data['trn_discount'][$i] = $row['discount']; 
// $data['trn_final'][$i] = $row['finalprice'];
// $data['trn_address'][$i] = $row['address'];
// $data['trn_change'][$i] = $row['cashchange'];

function ViewTransaction(id, user, items, qty, total, status){
    console.log(id, user, items, qty, total, status)

    Swal.fire({
        title: 'View Transaction',
        html: `<div class="text-start ms-5"><b>TRN ID: </b>${id}<br><b>USER:</b> ${user}<br><b>ITEMS: </b>${items}<br><b>TOTAL: </b>${total}<br><b>STATUS: </b>${status}</div>

        
        
        `,
        icon: 'info',
        width:1000,
    })
}

$(document).ready(function() {
    $('#paginationNext').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationNext').val();
        $.ajax({
            url: "/controller/core-online-orders.php",
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
            url: "/controller/core-online-orders.php",
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
            url: "/controller/core-online-orders.php",
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
                url: "/controller/core-online-orders.php",
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