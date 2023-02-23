$(function(){
    AOS.init();

    loadItems()

    $('#inventory-category').change(function(){
        $.ajax({
            url: "/controller/core-home.php",
            method: "POST",
            data: {
                action: 'category',
                // category: $('#inventory-search').val(),
                category: $('select#inventory-category option:selected').val(),
            },
            success: function(response) {
                console.log(response)
                
                appendItems(response);
            }
        }); 
    })

    $('#inventory-search').keyup(function() {
        $.ajax({
            url: "/controller/core-home.php",
            method: "POST",
            data: {
                action: 'search',
                search: $('#inventory-search').val(),
            },
            success: function(response) {
                console.log(response)
                
                appendItems(response);
            }
        });
    });

})  

function loadItems(){
    $.ajax({
        url: "/controller/core-home.php",
        method: "POST",
        data: {
            action: 'fetch',
        },
        success: function(response) {
            console.log(response)
            
            appendItems(response);
        }
    });

}

function appendItems(json){
    try{

        const item = JSON.parse(json)
        
        $('#inventory-category').empty()
        $('#inventory-category').append(`<option value="" disabled selected class="dropdown-header">Category</option>`)
        for(i = 0; i < item.arr_num_rows; i++){
            $('#inventory-category').append(`
                <option value="${item.arr_prefix[i]}">${item.arr_category[i]}</option>
            `)
        }

        $('#inventory-category').val(item.category)

        
        $('#product-lists').empty()
        if(item.i_num_rows <= 0){
            $('#product-lists').append(`
            <div class="col-lg-12 text-center p-5">
                <div class="text-dark h4">No product found.</div>
            </div>
        `)
        }else{
            for(x=0;x<item.i_num_rows;x++){
                $('#product-lists').append(`
                    <div class="col-lg-3">
                        <figure class="text-center" onclick="ViewProduct('${item.i_serial[x]}','${item.i_product[x]}','${item.i_category[x]}','${item.i_supplier[x]}','${item.i_price[x]}','${item.i_filesrc[x]}','${item.i_quantity[x]}','${item.i_specs[x]}','${item.i_slides_001[x]}','${item.i_slides_002[x]}','${item.i_slides_003[x]}')">
                            <img data-enlargable src="${item.i_filesrc[x]}" class="mb-2 object-fit-cover">
                            <figcaption class="h5 mb-0 fw-bolder">${item.i_price[x]}</figcaption>
                            <figcaption class="h5 text-secondary mb-0">${item.i_product[x]}</figcaption>
                            <figcaption class="h6 text-secondary">${item.i_supplier[x]}</figcaption>
                        </figure>
                    </div>
                `)
            }
        }
    }catch{

        const item = JSON.parse(JSON.stringify(json))
        $('#inventory-category').empty()
        $('#inventory-category').append(`<option value="" disabled selected class="dropdown-header">Category</option>`)
        for(i = 0; i < item.arr_num_rows; i++){
            $('#inventory-category').append(`
                <option value="${item.arr_prefix[i]}">${item.arr_category[i]}</option>
            `)
        }

        $('#inventory-category').val(item.category)

        
        $('#product-lists').empty()
        if(item.i_num_rows <= 0){
            $('#product-lists').append(`
            <div class="col-lg-12 text-center p-5">
                <div class="text-dark h4">No product found.</div>
            </div>
        `)
        }else{
            for(x=0;x<item.i_num_rows;x++){
                $('#product-lists').append(`
                    <div class="col-lg-3">
                        <figure class="text-center" onclick="ViewProduct('${item.i_serial[x]}','${item.i_product[x]}','${item.i_category[x]}','${item.i_supplier[x]}','${item.i_price[x]}','${item.i_filesrc[x]}','${item.i_quantity[x]}','${item.i_specs[x]}','${item.i_slides_001[x]}','${item.i_slides_002[x]}','${item.i_slides_003[x]}')">
                            <img data-enlargable src="${item.i_filesrc[x]}" class="mb-2 object-fit-cover">
                            <figcaption class="h5 mb-0 fw-bolder">${item.i_price[x]}</figcaption>
                            <figcaption class="h5 text-secondary mb-0">${item.i_product[x]}</figcaption>
                            <figcaption class="h6 text-secondary">${item.i_supplier[x]}</figcaption>
                        </figure>
                    </div>
                `)
            }
        }
    }

}

function TextTruncate(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}

function ViewProduct(serial, product, category, supplier, price, src, quantity, specs, slide_1, slide_2, slide_3){

    $('#view-product-title').text(category)
    $('#view-product-title').addClass('text-danger')
    
    $('#view-product-display-name').text(product)
    $('#view-product-display-supplier').text(supplier)
    $('#view-product-display-category').text(category)
    $('#view-product-display-price').text(price)
    $('#view-product-display-quantity').text(quantity)
    $('#view-product-display-specs').text(TextTruncate(specs, 750))
    $('#view-product-display-specs').css('text-indent', '75px')
    $('#view-display-image').attr('src', src)
    $('#view-display-slides-001').attr('src', src)
    $('#view-display-slides-002').attr('src', slide_1)
    $('#view-display-slides-003').attr('src', slide_2)
    $('#view-display-slides-004').attr('src', slide_3)

    $('#view-display-image').attr('src', src)
    $('#view-display-image').attr('src', src)

    $('#view-value-serial').attr('max', quantity)
    // $('#view-value-name').val(serial)
    // $('#view-value-supplier').val(supplier)
    // $('#view-value-category').val(price)
    // $('#view-value-price').val(price)
    // $('#view-value-quantity').val(quantity)
    // $('#view-value-specs').val(specs)

    

    $('#view-product-modal').modal('show')
}



$('img[data-enlargable]').addClass('img-enlargable').click(function(){
    var src = $(this).attr('src');
    $('<div>').css({
        background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        $(this).remove();
    }).appendTo('body');
});


//Get the button
var mybutton = document.getElementById("topFunctionBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

