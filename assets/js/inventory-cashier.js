

$(function() {

    loadInventory();

    $('#file-trigger').click(function(){
        $('#file-upload').trigger('click');
    });

    $('#add-select-category').change(function(){
        if($(this).val() == 'Custom'){
            $('#custom-input').show()
        }else{
            $('#custom-input').hide()
        }
    })

    $('#file-upload').change(function(e){
        var src = URL.createObjectURL(e.target.files[0])
        $('#edit-image').attr('src', src)
    })

    $('#input-main-001').click(function(){

        $('#file-main-001').trigger('click')
        
        $('#file-main-001').change(function(e){
            var src = URL.createObjectURL(e.target.files[0])
            $('#image-main-001').attr('src', src)
            var filename = $('#file-main-001')[0].files[0].name;
            $('#input-main-001').val(filename)
        })
    })

    $('#input-slides-001').click(function(){

        $('#file-slides-001').trigger('click')
        
        $('#file-slides-001').change(function(e){
            var src = URL.createObjectURL(e.target.files[0])
            $('#image-slides-001').attr('src', src)
            var filename = $('#file-slides-001')[0].files[0].name;
            $('#input-slides-001').val(filename)
        })
    })

    $('#input-slides-002').click(function(){

        $('#file-slides-002').trigger('click')
        
        $('#file-slides-002').change(function(e){
            var src = URL.createObjectURL(e.target.files[0])
            $('#image-slides-002').attr('src', src)
            var filename = $('#file-slides-002')[0].files[0].name;
            $('#input-slides-002').val(filename)
        })
    })
    
    $('#input-slides-003').click(function(){

        $('#file-slides-003').trigger('click')
        
        $('#file-slides-003').change(function(e){
            var src = URL.createObjectURL(e.target.files[0])
            $('#image-slides-003').attr('src', src)
            var filename = $('#file-slides-003')[0].files[0].name;
            $('#input-slides-003').val(filename)
        })
    })
});


$('#print-pdfs').click(function(){

    const doc = new jsPDF('p', 'mm', [100, 57]);

    var qrcode = new QRCode(qrDiv = document.querySelector("#print-pdfs-qr"), {
        text: "696969",
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });


    var qrSrc = qrDiv.children[0].toDataURL("image/png")


    doc.setFont('Courier', 'bold');
    doc.setFontSize(7);
    doc.text('RJ Avanceña Enterprises', 28, 10, 'center')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(7);
    doc.text('Kadiwa Rd. Area B', 28, 12.5, 'center')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(7);
    doc.text('CSJDM, Bulacan', 28, 15, 'center')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(6);
    doc.text('CASHIER: JED TERRAZOLA', 33.75, 20, 'right')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(6);
    doc.text('TRN ID: #6969696969', 30, 22.5, 'right')

    y=28;
    x=28;
    z=28;

    doc.setFont('Courier', 'bold');
    doc.setFontSize(7);
    doc.text('ITEMS PURCHASED | QTY | PRICE', 28, 28, 'center')

    for(i = 0; i < 10; i++){
        doc.setFont('Courier', 'normal');
        doc.setFontSize(5.5);
        doc.text(CurrentDatetimeShort(), 28, y+=2.5, 'right')

        doc.setFont('Courier', 'normal');
        doc.setFontSize(5.5);
        doc.text('x69', 37, x+=2.5, 'right')

        doc.setFont('Courier', 'normal');
        doc.setFontSize(5.5);
        doc.text('1250.00', 50, z+=2.5, 'right')
    }
    
    doc.setLineWidth(0.10); 
    doc.line(6.75, z+1.25, 50, z+1.25);

    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('SUBTOTAL', 8, y+=2.5+1)

    // doc.setFont('Courier', 'bold');
    // doc.setFontSize(5.5);
    // doc.text('690', 38, x+=2.5+1, 'right')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('1250.00', 50, z+=2.5+1, 'right')


    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('DISCOUNT', 8, y+=2.5)

    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('- 1250.00', 50, z+=2.5, 'right')

    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('GRAND TOTAL', 8, y+=2.5)

    doc.setFont('Courier', 'bold');
    doc.setFontSize(5.5);
    doc.text('1000.00', 50, z+=2.5, 'right')

    doc.addImage(qrSrc, 'PNG', 19.5, x+15, 17.5, 17.5);

    doc.save('a4.pdf')
})


$(function() {
    $('#content-delete').hide()
    $('.input-category-delete').attr('disabled', true)
    $('.input-category-edit').attr('required', true)
    $('#edit-delete-selector').change(function() {
        if($('#edit-delete-selector').val() == 'edit'){
            $('#content-delete').hide()
            $('#content-edit').show()
            $('.input-category-delete').attr('disabled', true)
            $('.input-category-edit').attr('disabled', false)
            $('.input-category-delete').val('')
        }else{
            $('#content-delete').show()
            $('#content-edit').hide()
            $('.input-category-delete').attr('disabled', false)
            $('.input-category-edit').attr('disabled', true)
            $('.input-category-edit').val('')
        }
    });

});

$(document).ready(function() {
    $('#edit-category-submit').click(function(){
        if($('#edit-delete-selector').val() == 'edit'){
            $('#delete-category-username').val('');
            $('#delete-category-password').val('');
            if($('#edit-category-input').val() == ''){
                document.querySelector('#edit-category-input').setCustomValidity("Please enter new category name for CATEGORY '"+$('#edit-category-select option:selected').text()+"'")
                document.querySelector('#edit-category-input').reportValidity();
            }else{
                $.ajax({
                    url: "/controller/inventory-category.php",
                    method: "POST",
                    data: {
                        action: 'edit',
                        category: $('#category-select option:selected').text(),
                        prefix: $('#category-select').val(),
                        value: $('#edit-category-input').val(),
                        sessionID: $('#sessionID').val(),
                    },
                    success: function(response) {
                        $('#category-settings-modal').modal('hide')
                        $('#edit-category-input').val('')
                        loadInventory()
                        AlertPrompt(response)
                    }
                });
            }
        }else{
            $('#edit-category-input').val('');
            if($('#delete-category-username').val() == '' && $('#delete-category-password').val() == ''){
                document.querySelector('#delete-category-password').setCustomValidity('Please enter your credentials.')
                document.querySelector('#delete-category-password').reportValidity();
            }else if($('#delete-category-password').val() == '' && $('#delete-category-username').val() != ''){
                document.querySelector('#delete-category-password').setCustomValidity('Please enter your password.')
                document.querySelector('#delete-category-password').reportValidity();
            }else if($('#delete-category-username').val() == '' && $('#delete-category-password').val() != ''){
                document.querySelector('#delete-category-username').setCustomValidity('Please enter your username.')
                document.querySelector('#delete-category-username').reportValidity();
            }else{
                $.ajax({
                    url: "/controller/inventory-category.php",
                    method: "POST",
                    data: {
                        action: 'delete',
                        category: $('#category-select option:selected').text(),
                        prefix: $('#category-select').val(),
                        username: $('#delete-category-username').val(),
                        password: $('#delete-category-password').val(),
                        sessionID: $('#sessionID').val(),
                    },
                    success: function(response) {
                        $('#category-settings-modal').modal('hide')
                        $('#edit-category-input').val('')
                        $('#edit-delete-selector option').prop('selected', function () {
                            return this.defaultSelected;
                        });
                        $('#delete-category-username').val(''),
                        $('#delete-category-password').val(''),
                        loadInventory()
                        AlertPrompt(response)
                    }
                });
            }
        }
    });
});

$(document).ready(function() {
    $('#search').keyup(function(e) {
        var val = $('#search').val();
        var insert = val.toString();
        if (e.key === 'Enter' || e.keyCode === 13) {
            $.ajax({
                url: "/controller/core-inventory.php",
                method: "POST",
                data: {
                    search : insert, sessionID : $('#sessionID').val(),
                },
                success: function(response) {
                    $('#search').val('')
                    // console.log(response)
                    appendInventory(response)
                }
            });
        }else if(val == ''){
            loadInventory();
        }
    });
});

$(document).ready(function() {
    $('#inventory-category').change(function() {
        var category = $('#inventory-category').val();
        $.ajax({
            url: "/controller/toggle-settings.php",
            method: "POST",
            data: {
                inventory : category, sessionID : $('#sessionID').val(),
            },
            success: function(response) {
                // console.log(response)
                loadInventory();
            }
        });
    });
});

function loadInventory(){
    $.ajax({
        url: "/controller/core-inventory.php",
        method: "POST",
        data: {
            sessionID : $('#sessionID').val(),
        },
        success: function(response) {
            console.log(response)
            // console.log($('#sessionID').val())
            appendInventory(response);
        }
    });
}

function appendInventory(json){

    try{

        const inv = JSON.parse(json);

        $('#select-row-count').val(inv.s_rowcount)
        $('#select-alert-type').val(inv.s_alert)
        $('#tCategory').text(String(inv.table_category).toUpperCase());
        $('#tRecords').text(inv.table_records+'/'+inv.table_total_records);
        $('#tAssets').text(new Intl.NumberFormat('en-US',{style: 'currency', currency: 'PHP'}).format(inv.table_total_price_qty));
        $('#tPage').text(inv.table_page+'/'+inv.table_total_page);
        $('#rLow').text(inv.r_low);
        $('#rCrit').text(inv.r_critical);
        $('#rTotal').text(inv.r_total);
        $('#aEncoder').val($('#User').val());
        $('.acc').val($('#sessionID').val());
        $('.user').val($('#User').val());
    
        localStorage.setItem('alert', inv.s_alert);
        localStorage.setItem('rowcount', inv.s_rowcount);
    
        
        $('.inventory-category').empty();
        $('#table-inventory-thead').empty();
        $('#table-inventory-tbody').empty();
        $('#reorderContainer').empty();
    
        if(parseInt(inv.r_total) == 0){
            $('#rTotal').removeClass('blink');
            $('#rTotal').addClass('d-none');
        }
        // console.log(inv.table_category.toUpperCase())
        if(inv.table_category.toUpperCase() == 'NO RESULTS'){
            $('#search').attr('disabled', 'disabled')
        }else{
            $('#search').removeAttr('disabled')
        }
    
        var page = parseInt(inv.table_page);
        var total_pages = parseInt(inv.table_total_page);
    
        $('#paginationNext').val(page+1);
        $('#paginationCurr').attr('placeholder', page);
        $('#paginationCurr').attr('max', total_pages);
        $('#paginationCurr').attr('min', 1);
        $('#paginationPrev').val(page-1);
    
        if(inv.table_total_page == 1){
            $('#paginationCurr').prop('disabled', true);
        }else{
            $('#paginationCurr').prop('disabled', false);
        }
    
    
        if(page == inv.table_total_page){
            $('#paginationNext').attr('disabled', 'disabled');
        }else{
            $('#paginationNext').removeAttr('disabled', 'disabled');
        }
        if(page == 1){
            $('#paginationPrev').attr('disabled', 'disabled');
        }else{
            $('#paginationPrev').removeAttr('disabled', 'disabled');
        }
    
        $('.inventory-category').append(`<option disabled value="" class="dropdown-header">Category</option>`);
        for(i = 0; i < inv.arr_num_rows; i++){
            $('.inventory-category').append(`<option value="${inv.arr_prefix[i]}">${inv.arr_category[i]}</option>`);
        }
    
        $('.aCategory').empty();
        
        $("select#inventory-category option").each(function(){
            if($(this).text() == inv.table_category){
                $(this).attr("selected","selected");
            }
        });
        
        $('.aCategory').append(`<option disabled value="" class="dropdown-header">New Category</option>
        <option value="Custom">- Custom - </option>`);
    
        if(inv.table_records != 0 && inv.table_total_records != 0){
            $('.aCategory').append(`<option disabled value="" class="dropdown-header">Category</option>`);
        }
    
        $('#table-category-thead').empty()
        $('#table-category-tbody').empty()
    
        if(inv.arr_num_rows <= 0){
            
    
        }else{
            for(i = 0; i < inv.arr_num_rows; i++){
                $('.aCategory').append(`<option value="${inv.arr_prefix[i]}">${inv.arr_category[i]}</option>`);
            }
        }
    
    
        if(inv.i_num_rows > 0){
            $('table#table-inventory thead').append(`
            <tr class="h5 text-center">
                <th>No.</th>
                <th>Serial</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            `);
            for(i = 0; i < inv.i_num_rows; i++){
                $('#exportBtn').removeAttr('disabled', 'disabled');
                $('#inventory-category').removeAttr('disabled', 'disabled');
    
                $('table#table-inventory tbody').append(`
                <tr class="${inv.i_serial[i]}">
                    <td>${i+1}</td>
                    <td>${inv.i_serial[i]}</td>
                    <td>${inv.i_product[i]}</td>
                    <td>${inv.i_supplier[i]}</td>
                    <td>${inv.i_price[i]}</td>
                    <td>${inv.i_quantity[i]}</td>
                    <td class="text-truncate mw-0">${inv.i_specs[i]}</td>
                    <td><span class="badge fs-6 bg-${inv.i_class[i]}">${inv.i_status[i]}</span></td>
                    <td>
                        <button class="btn btn-primary py-1 bi-eye-fill btn-sm" type="button" onclick="ViewProduct('${inv.i_serial[i]}','${inv.i_product[i]}','${inv.i_supplier[i]}','${inv.i_category[i]}','${inv.i_price[i]}','${inv.i_quantity[i]}','${inv.i_specs[i]}','${inv.i_class[i]}','${inv.i_filesrc[i]}','${inv.i_filename[i]}','${inv.i_encoder[i]}')"></button>
                    </td>
                
                `);
            }
        }else{
            $('#exportBtn').attr('disabled', 'disabled');
            $('#inventory-category').attr('disabled', 'disabled');
            $('#paginationNext').attr('disabled', 'disabled');
            
            $('#table-inventory-thead').append(`
                <tr>
                    <th>No.</th>
                    <th>Serial</th>
                    <th>Product</th>
                    <th>Supplier</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Specification</th>
                    <th>Status</th>
                </tr>
            `);
            $('#table-inventory-tbody').append(`
                <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                </tr>
            `);
        }
        

        if(inv.r_num_rows > 0){

    
        for(r = 0; r < inv.r_num_rows; r++){
    
            $('#reorderContainer').append(`
                <div class="alert alert-${inv.r_class[r]}">
                    <div class="row">
                        <div class="col-sm-12 h5 mb-0">
                            <span class="fw-bolder">${inv.r_product[r]}</span><br>
                            <h6>[ <span class="fw-bolder h6">${inv.r_category[r]}</span> ]</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9 h6 text-truncate">
                            SN: <span class="fw-bolder">${inv.r_serial[r]}</span><br>
                            PRICE: <span class="fw-bolder">${inv.r_price[r]}</span><br>
                            STOCK: <span class="fw-bolder">${inv.r_quantity[r]}</span><br>
                            SPECS: <span class="fw-bolder">${inv.r_specs[r]}</span><br>
                        </div>
                        <div class="col-sm-3 text-center">
                            <button class="btn btn-danger h-100 w-100 me-1 ms-1" type="button" data-bs-dismiss="offcanvas" data-bs-target="#RestockOffcanvas" onclick="EditProduct('${inv.r_id[r]}','${inv.r_serial[r]}','${inv.r_product[r]}','${inv.r_supplier[r]}','${inv.r_category[r]}','${inv.r_price[r]}','${inv.r_quantity[r]}','${inv.r_reorder[r]}','${inv.r_specs[r]}','${inv.r_class[r]}','${inv.r_filesrc[r]}','${inv.r_filename[i]}')">
                                <span class="bi bi-pencil-square"></span>
                            </button>
                        </div>
                    </div>
                </div>
            `);
            }
        }else{
            $('#btn-export-restock').attr('disabled', 'disabled')
    
            $('#reorderContainer').append(`
                    <div class="alert alert-success">
                        <div class="row">
                            <div class="col-sm-12 h6 fw-bold text-center">Good job! No restocking is needed.</div>
                        </div>
                    </div>
            `);
        }
    
    
    }catch{

        const inv = JSON.parse(JSON.stringify(json));
    
        
        $('#select-row-count').val(inv.s_rowcount)
        $('#select-alert-type').val(inv.s_alert)
        $('#tCategory').text(String(inv.table_category).toUpperCase());
        $('#tRecords').text(inv.table_records+'/'+inv.table_total_records);
        $('#tAssets').text(new Intl.NumberFormat('en-US',{style: 'currency', currency: 'PHP'}).format(inv.table_total_price_qty));
        $('#tPage').text(inv.table_page+'/'+inv.table_total_page);
        $('#rLow').text(inv.r_low);
        $('#rCrit').text(inv.r_critical);
        $('#rTotal').text(inv.r_total);
        $('#aEncoder').val($('#User').val());
        $('.acc').val($('#sessionID').val());
        $('.user').val($('#User').val());
    
        localStorage.setItem('alert', inv.s_alert);
        localStorage.setItem('rowcount', inv.s_rowcount);
    
        
        $('.inventory-category').empty();
        $('#table-inventory-thead').empty();
        $('#table-inventory-tbody').empty();
        $('#reorderContainer').empty();
    
        if(parseInt(inv.r_total) == 0){
            $('#rTotal').removeClass('blink');
            $('#rTotal').addClass('d-none');
        }
        // console.log(inv.table_category.toUpperCase())
        if(inv.table_category.toUpperCase() == 'NO RESULTS'){
            $('#search').attr('disabled', 'disabled')
        }else{
            $('#search').removeAttr('disabled')
        }
    
        var page = parseInt(inv.table_page);
        var total_pages = parseInt(inv.table_total_page);
    
        $('#paginationNext').val(page+1);
        $('#paginationCurr').attr('placeholder', page);
        $('#paginationCurr').attr('max', total_pages);
        $('#paginationCurr').attr('min', 1);
        $('#paginationPrev').val(page-1);
    
        if(inv.table_total_page == 1){
            $('#paginationCurr').prop('disabled', true);
        }else{
            $('#paginationCurr').prop('disabled', false);
        }
    
    
        if(page == inv.table_total_page){
            $('#paginationNext').attr('disabled', 'disabled');
        }else{
            $('#paginationNext').removeAttr('disabled', 'disabled');
        }
        if(page == 1){
            $('#paginationPrev').attr('disabled', 'disabled');
        }else{
            $('#paginationPrev').removeAttr('disabled', 'disabled');
        }
    
        $('.inventory-category').append(`<option disabled value="" class="dropdown-header">Category</option>`);
        for(i = 0; i < inv.arr_num_rows; i++){
            $('.inventory-category').append(`<option value="${inv.arr_prefix[i]}">${inv.arr_category[i]}</option>`);
        }
    
        $('.aCategory').empty();
        
        $("select#inventory-category option").each(function(){
            if($(this).text() == inv.table_category){
                $(this).attr("selected","selected");
            }
        });
        
        $('.aCategory').append(`<option disabled value="" class="dropdown-header">New Category</option>
        <option value="Custom">- Custom - </option>`);
    
        if(inv.table_records != 0 && inv.table_total_records != 0){
            $('.aCategory').append(`<option disabled value="" class="dropdown-header">Category</option>`);
        }
    
        $('#table-category-thead').empty()
        $('#table-category-tbody').empty()
    
        if(inv.arr_num_rows <= 0){
            
    
        }else{
            for(i = 0; i < inv.arr_num_rows; i++){
                $('.aCategory').append(`<option value="${inv.arr_prefix[i]}">${inv.arr_category[i]}</option>`);
            }
        }
    
    
        if(inv.i_num_rows > 0){
            $('table#table-inventory thead').append(`
            <tr class="h5 text-center">
                <th>No.</th>
                <th>Serial</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            `);
            for(i = 0; i < inv.i_num_rows; i++){
                $('#exportBtn').removeAttr('disabled', 'disabled');
                $('#inventory-category').removeAttr('disabled', 'disabled');
    
                $('table#table-inventory tbody').append(`
                <tr class="${inv.i_serial[i]}">
                    <td>${i+1}</td>
                    <td>${inv.i_serial[i]}</td>
                    <td>${inv.i_product[i]}</td>
                    <td>${inv.i_supplier[i]}</td>
                    <td>${inv.i_price[i]}</td>
                    <td>${inv.i_quantity[i]}</td>
                    <td class="text-truncate mw-0">${inv.i_specs[i]}</td>
                    <td><span class="badge fs-6 bg-${inv.i_class[i]}">${inv.i_status[i]}</span></td>
                    <td>
                        <button class="btn btn-primary py-1 bi-eye-fill btn-sm" type="button" onclick="ViewProduct('${inv.i_serial[i]}','${inv.i_product[i]}','${inv.i_supplier[i]}','${inv.i_category[i]}','${inv.i_price[i]}','${inv.i_quantity[i]}','${inv.i_specs[i]}','${inv.i_class[i]}','${inv.i_filesrc[i]}','${inv.i_filename[i]}','${inv.i_encoder[i]}')"></button>
                    </td>
                
                `);
            }
        }else{
            $('#exportBtn').attr('disabled', 'disabled');
            $('#inventory-category').attr('disabled', 'disabled');
            $('#paginationNext').attr('disabled', 'disabled');
            
            $('#table-inventory-thead').append(`
                <tr>
                    <th>No.</th>
                    <th>Serial</th>
                    <th>Product</th>
                    <th>Supplier</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Specification</th>
                    <th>Status</th>
                </tr>
            `);
            $('#table-inventory-tbody').append(`
                <tr>
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
            `);
        }
        
        if(inv.r_num_rows > 0){

    
        for(r = 0; r < inv.r_num_rows; r++){
    
            $('#reorderContainer').append(`
                <div class="alert alert-${inv.r_class[r]}">
                    <div class="row">
                        <div class="col-sm-12 h5 mb-0">
                            <span class="fw-bolder">${inv.r_product[r]}</span><br>
                            <h6>[ <span class="fw-bolder h6">${inv.r_category[r]}</span> ]</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9 h6 text-truncate">
                            SN: <span class="fw-bolder">${inv.r_serial[r]}</span><br>
                            PRICE: <span class="fw-bolder">${inv.r_price[r]}</span><br>
                            STOCK: <span class="fw-bolder">${inv.r_quantity[r]}</span><br>
                            SPECS: <span class="fw-bolder">${inv.r_specs[r]}</span><br>
                        </div>
                        <div class="col-sm-3 text-center">
                            <button class="btn btn-danger h-100 w-100 me-1 ms-1" type="button" data-bs-dismiss="offcanvas" data-bs-target="#RestockOffcanvas" onclick="EditProduct('${inv.r_id[r]}','${inv.r_serial[r]}','${inv.r_product[r]}','${inv.r_supplier[r]}','${inv.r_category[r]}','${inv.r_price[r]}','${inv.r_quantity[r]}','${inv.r_reorder[r]}','${inv.r_specs[r]}','${inv.r_class[r]}','${inv.r_filesrc[r]}','${inv.r_filename[i]}')">
                                <span class="bi bi-pencil-square"></span>
                            </button>
                        </div>
                    </div>
                </div>
            `);
            }
        }else{
            $('#btn-export-restock').attr('disabled', 'disabled')
    
            $('#reorderContainer').append(`
                    <div class="alert alert-success">
                        <div class="row">
                            <div class="col-sm-12 h6 fw-bold text-center">Good job! No restocking is needed.</div>
                        </div>
                    </div>
            `);
        }
    }
}



function ViewProduct(serial, product, supplier, category, price, quantity, specs, iclass, filesrc, filename, encoder){

    $("#vIMG").attr("title", filename);
    $("#vIMG").attr("src", filesrc);
    $("#vCaption").text(specs);
    $('#vProduct').val(product);
    $('#vSupplier').val(supplier);
    $('#vCategory').val(category);
    $('#vPrice').val(price);
    $('#vQuantity').val(quantity);
    $('#vSpecs').val(specs);
    $('#vEncoder').val(encoder);
    $('#vTitle').text(serial);
    $('#vTitle').addClass('text-'+iclass);
    

    $('#view-product-modal').modal('show');

    $('#btn-view-qr-code').click(function(){


        Swal.fire({
            showConfirmButton: false,
            html:`
                <div class="qr-code">
                    <div id="view-qr-code" class="text-center d-block ms-auto me-auto">
                    </div>
                </div>
                
                <div class="fw-bolder h3 mb-3 mt-2">Export As</div>
                
                <a class="btn btn-primary w-25 text-truncate" href="" id="href-view-qr-code">PNG</a>
            `,
          })
          
          var qrcode = new QRCode(qrDiv = document.getElementById("view-qr-code"), {
            text: "https://rjaenterprise.000webhostapp.com/qr-code/view-product.php?sku="+serial,
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.M
        });

        var qrSrc = qrDiv.children[0].toDataURL("image/png")
        $('#href-view-qr-code').attr('href', qrSrc)
        $('#href-view-qr-code').attr('download', serial)

    });
}

function EditProduct(id, serial, product, supplier, category, price, quantity, restock, specs, iclass, filesrc, filename){

    $("#edit-image").attr("title", filename);
    $("#edit-image").attr("src", filesrc);
    $('#edit-title').text(serial);
    $('#edit-title').addClass('text-'+iclass);
    $('#edit-id').val(id);
    $('#edit-serial').val(serial);
    $('#edit-product').val(product);
    $('#edit-supplier').val(supplier);
    $('#edit-price').val(price);
    $('#edit-reorder').val(restock);
    $('#edit-quantity').val(quantity);
    $('#edit-specs').val(specs);
    $('#edit-restock').val(restock);

    $("select#eCategory option").each(function(){
        if ($(this).text() == category){
            $(this).attr("selected","selected");
        }
    });

    $('#edit-product-modal').modal('show');

    $('#btn-edit-qr-code').click(function(){


        Swal.fire({
            showConfirmButton: false,
            html:`
                <div class="qr-code">
                    <div id="view-qr-code" class="text-center d-block ms-auto me-auto">
                    </div>
                </div>
                
                <div class="fw-bolder h3 mb-3 mt-2">Export As</div>
                
                <a class="btn btn-primary w-25 text-truncate" href="" id="href-view-qr-code">PNG</a>
            `,
          })
          
          var qrcode = new QRCode(qrDiv = document.getElementById("view-qr-code"), {
            text: "https://rjaenterprise.000webhostapp.com/qr-code/view-product.php?sku="+serial,
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.M
        });

        var qrSrc = qrDiv.children[0].toDataURL("image/png")
        $('#href-view-qr-code').attr('href', qrSrc)
        $('#href-view-qr-code').attr('download', serial)

    });

}

function SlideshowProduct(id, serial, _class, main, slide_1, slide_2, slide_3){

    $('#slides-id').val(id)
    $('#slides-title').text(serial)
    $('#slides-title').addClass('text-'+_class)

    $('#image-main-001').attr('src', main)
    $('#image-slides-001').attr('src', slide_1)
    $('#image-slides-002').attr('src', slide_2)
    $('#image-slides-003').attr('src', slide_3)

    $('#slides-product-modal').modal('show');
}

$(document).ready(function() {
    $('#paginationNext').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationNext').val();
        $.ajax({
            url: "/controller/core-inventory.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendInventory(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationPrev').click(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationPrev').val();
        $.ajax({
            url: "/controller/core-inventory.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#search').val('');
                appendInventory(response);
            }
        });
    });
});

$(document).ready(function() {
    $('#paginationCurr').keyup(function() {
        var session = $('#sessionID').val();
        pageNo = $('#paginationCurr').val();
        $.ajax({
            url: "/controller/core-inventory.php",
            method: "POST",
            data: {
                page : pageNo, sessionID : session,
            },
            success: function(response) {
                $('#paginationCurr').val('');
                $('#search').val('');
                appendInventory(response);
            }
        });
    });
});

$(function(){
    $('#btn-export-inventory').click(function(){

        TableToExcel.convert(document.querySelector("table#table-inventory"), {
            name: 'Inventory-Report-'+String($('#tCategory').text()).replace(' ', '-')+'-'+CurrentDatetime()+'.xlsx',
            sheet: {
                name: "Inventory-Report"
            }
        });
    })

    $('#btn-export-restock, #btn-export-restock-two').click(function(){

        TableToExcel.convert(document.querySelector("table#table-restock"), {
            name: 'Low-Critical-Report-'+CurrentDatetime()+'.xlsx',
            sheet: {
                name: "Inventory-Report-of-Low-and-Critical"
            }
        });
    })

    $('#btn-export-category').click(function(){

        TableToExcel.convert(document.querySelector("table#table-category"), {
            name: 'Inventory-Category-'+CurrentDatetime()+'.xlsx',
            sheet: {
                name: "Inventory-Category"
            }
        });
    })

})

function CurrentDate(x){
    const calendar = new Date();
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const month = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    var mm = String(calendar.getMonth()+1).padStart(2, '0');
    var dd = String(calendar.getDate()).padStart(2, '0');
    var yyyy = calendar.getFullYear();

    if(x == 'short'){
        return mm+'-'+dd+'-'+yyyy;
    }else{
        return weekday[calendar.getDay()]+' | '+month[parseInt(mm)-1]+' '+dd+', '+yyyy;
    }  
}

function CurrentTime(x){
    const calendar = new Date();

    var min = String(calendar.getMinutes()).padStart(2, '0');
    var hr = String(Math.abs(calendar.getHours()-12)).padStart(2, '0');
    var sec = String(Math.abs(calendar.getSeconds())).padStart(2, '0');
    var meridiem = (calendar.getHours() < 12 ? 'AM' : 'PM');

    if(x == 'short'){
        return hr+':'+min+' '+meridiem;
    }else{
        return hr+':'+min+':'+sec+'' +meridiem;
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

function CurrentDatetimeShort(){
    const calendar = new Date();
    var mm = String(calendar.getMonth()+1).padStart(2, '0');
    var dd = String(calendar.getDate()).padStart(2, '0');
    var yyyy = calendar.getFullYear();
    var min = String(calendar.getMinutes()).padStart(2, '0');
    var hr = String(Math.abs(calendar.getHours()-12)).padStart(2, '0');
    var meridiem = (calendar.getHours() < 12 ? 'AM' : 'PM');

    return mm+'/'+dd+'/'+yyyy+' '+hr+':'+min+meridiem;

}

function singleDelete(that){
    var deleteID = that.value;
    // let deleteInput = document.getElementById('deleteInput').value = deleteID;
    
    Swal.fire({
    title: 'Are you sure?',
    html: "Do you want to delete <span class='fw-bolder text-danger h5'>" + deleteID + "</span>?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            $('.'+deleteID).remove();
            $.ajax({
                url: "/controller/inventory-delete.php",
                method: "POST",
                data: {
                    serial : deleteID, sessionID : $('#sessionID').val(),
                },
                success: function(response){

                    loadInventory();

                    AlertPrompt(response);
                }
            });
        }
    });
}




function MultiDelete(){

    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked').length;

    var ids = [];
    $(".form-check-input").each(function(){
        if ($(this).is(":checked")) {
            ids.push($(this).val());
        }
    });

    if(checkboxes > 0){
        Swal.fire({
        title: 'Are you sure?',
        html: "Do you want to delete <span class='fw-bolder text-danger h5'>" + checkboxes   + " item/s</span>?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed){
            $.ajax({
                url: "/controller/inventory-delete.php",
                method: "POST",
                data: {
                    id : ids,
                },
                success: function(response){

                    loadInventory();
                    
                    AlertPrompt(response);

                }
            });
        }
      });
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Delete Error!',
        html: 'There is no <span class=\'fw-bolder text-danger h5\'>row</span> that is selected.'
      })
    }
}


$(function(){
    $('#btn-import-inventory').click(function(){
        $('input#input-import-inventory').trigger('click');
    });

    $('input#input-import-inventory').change(function(){
        $("form#inventory-import-data").submit()
    })
    
    $("form#inventory-import-data").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/inventory-import.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                console.log(response);      
                    
                $('#import-export-modal').modal('hide')

                const res = JSON.parse(response)
                Swal.fire({
                    title: res.title_1,
                    html: res.html_1,
                    icon: res.icon_1,
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'View Status Report',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: res.title_2,
                            html: res.html_2,
                            icon: res.icon_2,
                            allowOutsideClick: false,
                        })
                    }
                })

                loadInventory()
            }
            });


            return false;

    });

    $("form#form-add-product").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/inventory-add.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                console.log(response);      

                $('.input-clear-form').val('')
                $('#add-select-category').val('Custom')
                $('#AddProductModal').modal('hide')

                loadInventory()

                AlertPrompt(response)
            }
            });

            return false;
    }); 

    $("form#form-edit-delete-category").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/inventory-category.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {

                console.log(response) 

                $('.input-category-delete').val('')
                $('.input-category-edit').val('')

                $('#content-delete').hide()
                $('#edit-delete-selector').val('edit')
                $('.input-category-delete').attr('disabled', true)
                $('.input-category-edit').attr('required', true)
                
                $('#category-settings-modal').modal('hide')

                loadInventory()

                AlertPrompt(response)
            }
            });

            return false;
    }); 

    $("form#form-edit-product").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/inventory-update.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                console.log(response);      

                $('#edit-product-modal').modal('hide')

                AlertPrompt(response)
                
                loadInventory()


            }
            });

            return false;
    });

    $("form#form-slides-product").submit(function(evt){   

        evt.preventDefault();
        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/inventory-slideshow.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                console.log(response);      

                loadInventory()

                $('#slides-product-modal').modal('hide')

                $('form#form-slides-product')[0].reset()

                AlertPrompt(response)
            }
            });

            return false;
    }); 
})

$(function(){
    $('#select-row-count').change(function(){
        $.ajax({
            url: '/controller/toggle-settings.php',
            method: 'post',
            data:{
                sessionID: $('#sessionID').val(),
                row_inv: $('select#select-row-count option:selected').val(),
            },
            success: function(response){
                // $('#table-settings-modal').modal('hide')
                // console.log(response)

                loadInventory()
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
                loadInventory()
            }
        })
    });
})



