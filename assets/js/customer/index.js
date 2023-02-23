$(document).ready(function () {
    
    $('#address1').prop('disabled', true)
    
        $('#address2').keyup(function(){
        
        
        console.log($(this).val(), $('#account-id').val())
        
        $.ajax({
            url: '/controller/settings-update.php',
            method: 'post',
            data: {
                address2: $(this).val(),
                userNo: $('#account-id').val(),
                action: 'change',
            },
            success: function(response){
                console.log(response, $('#account-id').val())
            }
        })
    })
        
                
    var db = {}
    var sr = {}
    var cart = {}
    var item_count = 0
    var search_count = 0
    var cart_count = 0
    var cart_to_save = {}
    var cart_ids = []
    var cart_names = []
    var cart_quantities = []
    var cart_subtotals = []
    var cart_total = 0
    var cart_shipping = 0
    var cart_address = ''
    var orders = {}
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        iconColor: 'white',
        width: 450,
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false
    })
    let empty_search = `
        <div class="border rounded empty-search py-5">
            <h6 class="text-m mb-0">No items found.</h6>
        </div>
    `

    if($('body').attr('class') == 'dark'){
        $('.invertable').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-dark text-light')
        $('.offcanvas.offcanvas-end').addClass('text-bg-dark')
        $('.offcanvas.offcanvas-start').addClass('text-bg-dark')
        $('#modal-quantity').addClass('bg-dark text-light')

        $('#theme').html('<option value="dark">Dark Mode</option><option value="light">Light Mode</option>')
    } else {
        $('.invertable').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-light text-dark')
        $('#theme').html('<option value="light">Light Mode</option><option value="dark">Dark Mode</option>')
    }

    $('body').on('change', '#theme', function(){
        if($(this).val() == 'light'){
            lightmode()
        } else {
            darkmode()
        }

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type' : 'theme', 'theme' : $(this).val() }) },
        })
    })

    $('body').on('change', '#address', function(){
        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type' : 'address', 'address' : $(this).val() }) },
        })
    })

    function lightmode(){
        $('body').removeClass('dark').addClass('light')
        $('link[href="/src/css/dark.min.css"]').attr('href', '/src/css/sweetalert2.min.css')
        $('.form-control').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-light text-dark')
        $('.offcanvas.offcanvas-end').removeClass('text-bg-dark')
        $('.offcanvas.offcanvas-start').removeClass('text-bg-dark')
        $('#modal-quantity').removeClass('bg-dark text-light')
        $('.invertable').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-light text-dark')
        $('#theme').html('<option value="light">Light Mode</option><option value="dark">Dark Mode</option>')
    }

    function darkmode(){
        $('body').removeClass('light').addClass('dark')
        $('link[href="/src/css/sweetalert2.min.css"]').attr('href', '/src/css/dark.min.css')
        $('.form-control').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-dark text-light')
        $('.invertable').removeClass('bg-dark bg-light text-dark text-light').addClass('bg-dark text-light')
        $('.offcanvas.offcanvas-end').addClass('text-bg-dark')
        $('.offcanvas.offcanvas-start').addClass('text-bg-dark')
        $('#modal-quantity').addClass('bg-dark text-light')
        $('#theme').html('<option value="dark">Dark Mode</option><option value="light">Light Mode</option>')
    }

    function fetch_db() {
        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'products', 'key': 1 }) },
            beforeSend() {
                loading_screen()
            },
            success: function (response) {
                db = response

                console.log(db)

                print_products(db)

                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="text-m fw-bold">Loaded successfully.</h6>'
                })
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="text-m fw-bold">Connection error.</h6>'
                })
            }
        })
    }

    function print_products(data) {
        let count_limit = item_count + 15

        let theme = $('body').attr('class')
        let bg = 'bg-'
        let text = 'text-'


        if ((theme == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'dark') || (theme == 'dark swal2-shown swal2-height-auto')) {
            bg += 'dark'
            text += 'light'
        } else if ((theme == 'light swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'light') || (theme == 'light swal2-shown swal2-height-auto')) {
            bg += 'light'
            text += 'dark'
        }

        for (let i = 0; i < data.categories.length; i++) {
            $('#categories').append(`
                <option value="${data.categories[i]}">${data.categories[i]}</option>
            `)
        }

        for (let i = item_count; i <= count_limit; i++) {
            if (i == count_limit) {
                $('.product-display').append(`
                    <div class="row mb-2 load-more">
                        <div class="container d-flex justify-content-center">
                            <button class="btn btn-md btn-outline-primary text-m">
                                <i class="bi bi-arrow-down-circle"></i>&nbsp;&nbsp;Load more
                            </button>
                        </div>
                    </div>
                `)
                break
            }
            if (i == 0) {
                $('.product-display').append('<div class="row new-row py-1"></div>')
            }
            if (data.id[i] == null) {
                $('.product-display').append(`
                    <div class="row mb-2 text-center py-3">
                        <h6 class="text-m fw-bolder">End of results</h6>
                    </div>
                `)
                break
            } else {
                if(data.stock[i] != 0){
                    $('.new-row').append(`
                        <div class="col-12 col-md-4 col-lg-3 col-xxl-2 mb-4">
                            <div class="container">
                                <div class="row align-items-center">
                                <div class="col-5 col-md-12 mb-md-2">
                                    <img src="${data.image[i]}" name="${data.id[i]}" class="product-image rounded add-item" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                </div>
                                <div class="col-7 col-md text-start">
                                    <h6 class="text-m fw-bold">${text_trimmer(data.name[i])}</h6>
                                    <h6 class="text-xsm fw-bold">${text_trimmer(data.size_color[i])}</h6>
                                    <h6 class="text-l fw-bolder text-danger">PHP ${data.price[i].toLocaleString('en-US')}</h6>
                                    <input type="text" value="Stock : ${data.stock[i]}" class="form-control ${bg} ${text} text-m fw-bold mb-2" disabled>
                                    <h6 class="text-sm fw-bolder text-sold">${data.sold[i]} sold</h6>
                                    <button type="button" name="${data.id[i]}" class="add-item btn btn-md btn-primary fw-bold text-m w-100" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                        Add to cart
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    `)
                }
            }

            item_count++
        }
    }

    $('body').on('change', '#categories', function () {
        let selected = $(this).val()

        $('.product-display').html('')

        item_count = 0

        if (selected == 'all') {
            $('#categories').html('<option value="all">All</option>')
            print_products(db)
        } else {
            
            filter_products(db, selected)
        }
    })

    $('body').on('click', '.refresh-all', function () {
        $('.product-display').html('')
        $('#categories').html('<option value="all">All</option>')

        item_count = 0

        fetch_db()
    })

    function filter_products(data, filter) {
        let count_limit = item_count + 15
        let theme = $('body').attr('class')
        let bg = 'bg-'
        let text = 'text-'

        if ((theme == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'dark') || (theme == 'dark swal2-shown swal2-height-auto')) {
            bg += 'dark'
            text += 'light'
        } else if ((theme == 'light swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'light') || (theme == 'light swal2-shown swal2-height-auto')) {
            bg += 'light'
            text += 'dark'
        }

        for (let i = item_count; i < data.id.length; i++) {
            if (i == 0) {
                $('.product-display').append('<div class="row new-row py-1"></div>')
            }

            if (filter == data.category[i]) {
                if (item_count == count_limit) {
                    $('.product-display').append(`
                        <div class="row mb-2 load-more">
                            <div class="container d-flex justify-content-center">
                                <button class="btn btn-md btn-outline-primary text-m">
                                    <i class="bi bi-arrow-down-circle"></i>&nbsp;&nbsp;Load more
                                </button>
                            </div>
                        </div>
                    `)
                    break
                }
                if (data.id[i] == null) {
                    $('.product-display').append(`
                        <div class="row mb-2 text-center py-3">
                            <h6 class="text-m fw-bolder">End of results</h6>
                        </div>
                    `)
                    break
                } else {
                    if(document.getElementById(data.name[i])){
                        
                    } else {
                        if(data.stock[i] != 0){
                            $('.new-row').append(`
                                <div class="col-12 col-md-4 col-lg-3 col-xxl-2 mb-4">
                                    <div class="container">
                                        <div class="row align-items-center">
                                        <div class="col-5 col-md-12 mb-md-2">
                                            <img src="${data.image[i]}" name="${data.id[i]}" class="add-item product-image rounded" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                        </div>
                                        <div class="col-7 col-md text-start">
                                            <h6 id="${data.name[i]}" class="text-m fw-bold">${text_trimmer(data.name[i])}</h6>
                                            <h6 class="text-l fw-bolder text-danger">PHP ${data.price[i].toLocaleString('en-US')}</h6>
                                            <input type="text" value="Stock : ${data.stock[i]}" class="form-control ${bg} ${text} text-m fw-bold mb-2" disabled>
                                            <h6 class="text-sm fw-bolder text-sold">${data.sold[i]} sold</h6>
                                            <button type="button" name="${data.id[i]}" class="add-item btn btn-md btn-primary fw-bold text-m w-100" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                                Add to cart
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                    }
                }

                item_count++
            }

            if (i == (data.id.length - 1)) {
                $('.product-display').append(`
                    <div class="row mb-2 text-center py-3">
                        <h6 class="text-m fw-bolder">End of results</h6>
                    </div>
                `)
                break
            }
        }
    }

    if ($('.changing-content').attr('name') == 'home') {
        fetch_db()
        if (($('body').attr('class') == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'dark') || ($('body').attr('class')  == 'dark swal2-shown swal2-height-auto')) {
            darkmode()
        } else if (($('body').attr('class')  == 'light swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'light') || ($('body').attr('class')  == 'light swal2-shown swal2-height-auto')) {
            lightmode()
        }
    } else if($('.changing-content').attr('name') == 'cart'){
        init_load_cart()
        if (($('body').attr('class') == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'dark') || ($('body').attr('class')  == 'dark swal2-shown swal2-height-auto')) {
            darkmode()
        } else if (($('body').attr('class')  == 'light swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'light') || ($('body').attr('class')  == 'light swal2-shown swal2-height-auto')) {
            lightmode()
        }
    } else if($('.changing-content').attr('name') == 'orders'){
        init_load_orders()
        if (($('body').attr('class') == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'dark') || ($('body').attr('class')  == 'dark swal2-shown swal2-height-auto')) {
            darkmode()
        } else if (($('body').attr('class')  == 'light swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'light') || ($('body').attr('class')  == 'light swal2-shown swal2-height-auto')) {
            lightmode()
        }
    }

    $('.open-cart').on('click', function () {
        loading_screen()

        $('.paste-here').load('/customer/cart.php .changing-content', function (response, status, etc) {
            window.history.pushState(null, '', '/customer/cart.php')

            if (status == 'error') {
                $(document).attr('title', 'Error : My Cart')
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="text-m fw-bold">' + etc.statusText + ' ' + etc.status + '</h6>'
                })
            } else {
                $(document).attr('title', 'My Cart')

                

                init_load_cart()

                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="text-m fw-bold">Loaded successfully.</h6>'
                })
            }
        })
    })

    $('.open-orders').on('click', function () {
        loading_screen()

        $('.paste-here').load('/customer/orders.php .changing-content', function (response, status, etc) {
            window.history.pushState(null, '', '/customer/orders.php')

            if (status == 'error') {
                $(document).attr('title', 'Error : My Orders')
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="text-m fw-bold">' + etc.statusText + ' ' + etc.status + '</h6>'
                })
            } else {
                $(document).attr('title', 'My Orders')

                init_load_orders()

                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="text-m fw-bold">Loaded successfully.</h6>'
                })
            }
        })
    })

    $('body').on('click', '.back', function () {
        if ($('.changing-content').attr('name') != 'home') {
            loading_screen()

            $('.paste-here').load('/customer/index.php .changing-content', function (response, status, etc) {
                window.history.pushState(null, '', '/customer/index.php')

                if (status == 'error') {
                    $(document).attr('title', 'Error : Home')
                    Toast.fire({
                        icon: 'error',
                        title: '<h6 class="text-m fw-bold">' + etc.statusText + ' ' + etc.status + '</h6>'
                    })
                } else {
                    $(document).attr('title', 'Home')

                    fetch_db()
                    item_count = 0

                    Toast.fire({
                        icon: 'success',
                        title: '<h6 class="text-m fw-bold">Loaded successfully.</h6>'
                    })

                    if ($('body').attr('class') == 'dark') {
                        $('.offcanvas.offcanvas-end').addClass('text-bg-dark')
                        $('#modal-quantity').addClass('bg-dark text-light')
                    }
                }
            })
        }
    })

    $('body').on('click', '.load-more', function () {
        $(this).remove()

        if ($('#categories').val() == 'all') {
            $('#categories').html('<option value="all">All</option>')
            print_products(db)
        } else {
            filter_products(db, $('#categories').val())
        }

    })

    $('body').on('click', '.search-load-more', function () {
        $(this).remove()
        print_search(sr)
    })

    $(window).on('popstate', function () {
        loading_screen()

        $('.paste-here').load(window.location + ' .changing-content', function (response, status, etc) {
            if (status == 'error') {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="text-m fw-bold">' + etc.statusText + ' ' + etc.status + '</h6>'
                })
            } else {
                if ($('.changing-content').attr('name') == 'home') {
                    if ($('body').attr('class') == 'dark') {
                        $('.offcanvas.offcanvas-end').addClass('text-bg-dark')
                        $('#modal-quantity').addClass('bg-dark text-light')
                    }
                    fetch_db()
                    item_count = 0
                } else if($('.changing-content').attr('name') == 'cart'){
                    init_load_cart()
                } else if($('.changing-content').attr('name') == 'orders'){
                    init_load_orders()
                }

                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="text-m fw-bold">Loaded successfully.</h6>'
                })
            }
        })
    })

    function loading_screen() {
        Swal.fire({
            title: '',
            html: `
                <div class="row mb-2">
                    <div class="container d-flex justify-content-center text-center py-3">
                        <div class="spinner-border text-info text-l" role="status"></div>
                    </div>
                </div>
                <div class="row">
                    <h6 class="text-l">Loading</h6>
                </div>
            `,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: false
        })
    }

    function text_trimmer(words) {
        let trimmed = ''
        let chlimit = 20

        if ((screen.width <= 1024) && (screen.width >= 800)) {
            chlimit = 18
        } else if ((screen.width <= 799) && (screen.width >= 600)) {
            chlimit = 18
        } else if ((screen.width <= 599) && (screen.width > 200)) {
            chlimit = 18
        }

        for (let i = 0; i < chlimit; i++) {
            if (words.charAt(i) != null) {
                trimmed += words.charAt(i)
            } else {
                break
            }
        }

        if (words.length >= chlimit) {
            trimmed += '...'
        }

        return trimmed
    }

    function search(word, filter, sort) {
        let search = { 'type': 'search', 'word': word, 'filter': filter, 'sort': sort }

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify(search) },
            beforeSend: function () {
                $('.empty-search').hide()
                $('.success').remove()
                $('.search-load-more').remove()
                $('.search-results').append(`
                    <div class="spinner-border text-info text-center fw-bold" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                `)
            },
            success: function (response) {
                if (response.success == true) {
                    let results = response

                    $('.spinner-border').remove()

                    if (response.id[0] == null) {
                        $('.empty-search').show()
                    } else {

                        sr = results

                        print_search(response)
                    }
                } else {
                    $('.empty-search').hide()
                    $('.error-search').remove()
                    $('.search-results').append(`
                        <div class="border text-danger rounded error-search py-5">
                            <h6 class="text-m mb-0 fw-bolder">Something went wrong, please try again later.</h6>
                        </div>
                    `)
                }

            },
            error: function () {
                $('.empty-search').hide()
                $('.error-search').remove()
                $('.search-results').append(`
                    <div class="border text-danger rounded error-search py-5">
                        <h6 class="text-m mb-0 fw-bolder">Something went wrong, please try again later.</h6>
                    </div>
                `)
            }
        })
    }

    function print_search(results) {
        let count_limit = search_count + 15
        let theme = $('body').attr('class')
        let bg = 'bg-'
        let text = 'text-'

        if ((theme == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'dark') || (theme == 'dark swal2-shown swal2-height-auto')) {
            bg += 'dark'
            text += 'light'
        } else if ((theme == 'light swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'light') || (theme == 'light swal2-shown swal2-height-auto')) {
            bg += 'light'
            text += 'dark'
        }

        for (let i = search_count; i <= count_limit; i++) {
            if (i == count_limit) {
                $('.search-results').append(`
                    <div class="row mb-2 search-load-more">
                        <div class="container d-flex justify-content-center">
                            <button class="btn btn-md btn-outline-primary text-m">
                                <i class="bi bi-arrow-down-circle"></i>&nbsp;&nbsp;Load more
                            </button>
                        </div>
                    </div>
                `)
                break
            }

            if (i == 0) {
                $('.search-results').append(`
                    <div class="row success mb-3 align-items-center"></div>
                `)
            }

            if (results.id[i] == null) {
                $('.search-results').append(`
                    <div class="row success my-3 text-center">
                        <h6 class="text-m fw-bolder">End of results</h6>
                    </div>
                `)
                break
            } else {
                if(results.stock[i] != 0){
                    $('.success').append(`
                        <div class="col-12 col-md-4 col-lg-3 mb-4">
                            <div class="container">
                                <div class="row align-items-center">
                                <div class="col-5 col-md-12 mb-md-2">
                                    <img src="${results.image[i]}" name="${results.id[i]}" class="add-item product-image rounded" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                </div>
                                <div class="col-7 col-md text-start">
                                    <h6 class="text-m">${text_trimmer(results.name[i])}</h6>
                                    <h6 class="text-xsm fw-bold">${text_trimmer(results.size_color[i])}</h6>
                                    <h6 class="text-m fw-bold text-danger">PHP ${results.price[i].toLocaleString('en-US')}</h6>
                                    <input type="text" value="Stock : ${results.stock[i]}" class="form-control ${bg} ${text} text-m fw-bold mb-2" disabled>
                                    <h6 class="text-sm fw-bolder text-sold">${results.sold[i]} sold</h6>
                                    <button type="button" name="${results.id[i]}" class="add-item btn btn-md btn-primary fw-bold text-sm w-100" data-bs-toggle="offcanvas" data-bs-target="#add-to-cart-modal" aria-controls="add-to-cart-modal">
                                        Add to cart
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    `)
                }
            }

            search_count++
        }
    }

    $('body').on('click', '.open-search', function () {
        let theme = $('body').attr('class')
        let bg = 'bg-'
        let text = 'text-'
        let categories = '<option value="all">All</all>'

        for (let i = 0; i < db.categories.length; i++) {
            categories += '<option value="' + db.categories[i] + '">' + db.categories[i] + '</option>'
        }

        if ((theme == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'dark')) {
            bg += 'dark'
            text += 'light'
        } else if ((theme == 'light swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'light')) {
            bg += 'light'
            text += 'dark'
        }

        Swal.fire({
            width: 900,
            html: `
                <div class="container">
                    <div class="row text-start mb-3">
                        <h6 class="text-l fw-bold">Search Products</h6>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <div class="container d-flex flex-row gap-1">
                            <input type="text" id="search-bar" class="form-control ${bg} ${text} text-m fw-bold" placeholder="Type something">
                            <button type="button" class="start-search btn btn-md btn-primary text-m">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <div class="col-4 col-md-auto">
                            <h6 class="text-sm mb-0">Filter by category :</h6>
                        </div>
                        <div class="col-8 col-md">
                            <select class="form-select ${bg} ${text} text-sm mb-1 mb-md-0" id="search-filter">
                                ${categories}
                            </select>
                        </div>
                        <div class="col-4 col-md-auto">
                            <h6 class="text-sm mb-0">Sort by :</h6>
                        </div>
                        <div class="col-8 col-md-auto">
                            <select class="form-select ${bg} ${text} text-sm" id="search-sort">
                                <option value="popular">Best-Selling/Popular</option>
                                <option value="pricelow">Price: Low to High</option>
                                <option value="pricehigh">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container search-results">${empty_search}</div>
                    </div>
                </div>
            `,
            allowOutsideClick: false,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            reverseButtons: true,
            cancelButtonText:
                '<i class="bi bi-x"></i> Cancel',
            cancelButtonAriaLabel: 'Thumbs down',
            confirmButtonText:
                '<i class="bi bi-check"></i> Save',
            confirmButtonAriaLabel: 'Thumbs up, great!'
        })
    })

    $('body').on('keyup', '#search-bar', function (e) {
        let filter = $('#search-filter').val()
        let word = $('#search-bar').val().trim()
        let sort = $('#search-sort').val()

        if (word == '') {
            $('.empty-search').show()
            $('.error-search').remove()
            $('.success').remove()
        } else {
            if (e.keyCode == 13) {
                search_count = 0
                search(word, filter, sort)
            }
        }
    })

    $('body').on('click', '.start-search', function () {
        let filter = $('#search-filter').val()
        let word = $('#search-bar').val().trim()
        let sort = $('#search-sort').val()

        if (word != '') {
            search_count = 0
            search(word, filter, sort)
        } else {
            $('.empty-search').show()
            $('.error-search').remove()
            $('.success').remove()
        }
    })

    $('body').on('change', '#search-filter', function () {
        let filter = $('#search-filter').val()
        let word = $('#search-bar').val().trim()
        let sort = $('#search-sort').val()

        if (word != '') {
            search_count = 0
            search(word, filter, sort)
        }
    })

    $('body').on('change', '#search-sort', function () {
        let sort = $('#search-sort').val()
        let word = $('#search-bar').val().trim()
        let filter = $('#search-filter').val().trim()

        if (word != '') {
            search_count = 0
            search(word, filter, sort)
        }
    })

    $('body').on('click', '.add-item', function () {
        let id = $(this).attr('name')

        for (let i = 0; i < db.id.length; i++) {
            if (id == db.id[i]) {
                $('#modal-image-1').attr('src', db.image[i])
                $('#modal-image-2').attr('src', db.slide1[i])
                $('#modal-image-3').attr('src', db.slide2[i])
                $('#modal-image-4').attr('src', db.slide3[i])
                $('#modal-name').html(db.name[i])
                $('#modal-size-color').html(db.size_color[i])
                $('#modal-price').html('PHP ' + db.price[i].toLocaleString('en-US'))
                $('#modal-sold').html(db.sold[i] + ' sold')
                $('#modal-category').html('Category : ' + db.category[i])
                $('#modal-stock').html('Available stock : ' + db.stock[i])
                $('#modal-description').html(db.description[i])
                $('#modal-quantity').val(1)
                $('#modal-quantity').attr('max', db.stock[i])
                $('.save-item').attr('name', db.id[i])
            }
        }
    })

    $('body').on('keyup', '#modal-quantity', function () {
        if ($(this).val() != '') {
            $('.modal-plus-one').attr('disabled', false)
            $('.modal-minus-one').attr('disabled', false)

            let cqty = parseInt($(this).val())
            let max = parseInt($(this).attr('max'))

            if (cqty > max) {
                $(this).val(max)
            } else if (cqty < 1) {
                $(this).val(1)
            }

            $('.save-item').attr('disabled', false)
        } else if ($(this).val() == '') {
            $('.modal-plus-one').attr('disabled', true)
            $('.modal-minus-one').attr('disabled', true)
            $('.save-item').attr('disabled', true)
        }
    })

    $('body').on('change', '#modal-quantity', function () {
        if ($(this).val() != '') {
            $('.modal-plus-one').attr('disabled', false)
            $('.modal-minus-one').attr('disabled', false)

            let cqty = parseInt($(this).val())
            let max = parseInt($(this).attr('max'))

            if (cqty > max) {
                $(this).val(max)
            } else if (cqty < 1) {
                $(this).val(1)
            }

            $('.save-item').attr('disabled', false)
        } else if ($(this).val() == '') {
            $('.modal-plus-one').attr('disabled', true)
            $('.modal-minus-one').attr('disabled', true)
            $('.save-item').attr('disabled', true)
        }
    })

    $('body').on('click', '.modal-plus-one', function () {
        let cqty = parseInt($('#modal-quantity').val())
        let max = parseInt($('#modal-quantity').attr('max'))

        if (cqty < max) {
            cqty += 1
            $('#modal-quantity').val(cqty)
        }
    })

    $('body').on('click', '.modal-minus-one', function () {
        let cqty = parseInt($('#modal-quantity').val())

        if (cqty > 1) {
            cqty -= 1
            $('#modal-quantity').val(cqty)
        }
    })

    function minimal_toast(text){
        $('.min-toast').removeClass('d-none').hide().fadeIn(500)
        $('#status-text').html(text)
    }

    function hide_minimal_toast(){
        $('.min-toast').fadeOut(2000)
    }

    $('body').on('click', '.save-item', function () {
        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'add', 'key': 1, 'id': $(this).attr('name'), 'quantity': parseInt($('#modal-quantity').val()) }) },
            beforeSend: function (){
                minimal_toast('Saving to cart...')
            },
            success: function (response) {
                if (response.success == true) {
                    minimal_toast(response.status)
                    hide_minimal_toast()
                } else {
                    minimal_toast('Something went wrong, please try again later.')
                    hide_minimal_toast()
                }
            },
            error: function () {
                minimal_toast('Connection error.')
                hide_minimal_toast()
            }
        })
    })

    function init_load_cart(){
        cart_count = 0
        cart_ids = []
        cart_names = []
        cart_quantities = []
        cart_subtotals = []
        cart_total = 0
        cart_shipping = 0
        cart_address = ''

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'show-cart', 'key': 1 }) },
            beforeSend: function (){
                loading_screen()
            },
            success: function (response) {

                console.log(response)

                if (response.success == true) {
                    Toast.fire({
                        icon: 'success',
                        html: '<h6 class="text-m fw-bold mb-0">' + response.status + '</h6>'
                    })

                    cart = response

                    print_cart(cart)
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: '<h6 class="text-m fw-bold mb-0">Failed to load saved cart.</h6>'
                    })
                }
            },
            error: function () {
                

                Toast.fire({
                    icon: 'error',
                    html: '<h6 class="text-m fw-bold mb-0">Connection error.</h6>'
                })
                
            }
        })
    }

    function print_cart(data){
        console.log(data.image)
        let theme = $('body').attr('class')
        let bg = 'bg-'
        let text = 'text-'
        let hidden = 0


        if ((theme == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'dark') || (theme == 'dark swal2-shown swal2-height-auto')) {
            bg += 'dark'
            text += 'light'
        } else if ((theme == 'light swal2-shown swal2-height-auto swal2-toast-shown') || (theme == 'light') || (theme == 'light swal2-shown swal2-height-auto')) {
            bg += 'light'
            text += 'dark'
        }

        if(data.id[0] != null){

            for(let i = 0; i < data.id.length; i++){
                if(i == 0){
                    $('.cart-display').append(`
                        <div class="row cart-new-row"></div>
                    `)
                }

                if(data.stock[i] != 0){
                    if(data.quantity[i] == 0){
                        data.quantity[i] = 1
                    }

                    $('.cart-new-row').append(`
                        <div class="cart-item-${data.id[i]} row align-items-center justify-content-center mb-3">
                            <div class="col-2 col-md-2 d-flex justify-content-center">
                                <input type="checkbox" name="${data.id[i]}" class="form-check-input text-xxl cart-select">
                            </div>
                            <div class="col-4 col-md-2">
                                <img src="${data.image[i]}" class="rounded cart-image" style="width: 100%; height: auto;">
                            </div>
                            <div class="col-6 col-md-6">
                                <div class="container mb-2 py-2 py-md-4">
                                    <div class="row mb-2">
                                        <h6 class="text-m fw-bold">${data.name[i]}</h6>
                                        <h6 class="text-xsm fw-bolder">${data.size_color[i]}</h6>
                                        <h6 id="cart-subtotal-${data.id[i]}" class="text-l fw-bolder text-danger">PHP ${(parseInt(data.quantity[i]) * parseFloat(data.price[i])).toLocaleString('en-US')}</h6>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="container d-flex">
                                            <div class="input-group">
                                                <button type="button" name="${data.id[i]}" class="cart-minus-one btn btn-secondary fw-bold btn-md text-m">-</button>
                                                <input id="cart-quantity-${data.id[i]}" name="${data.id[i]}" type="number" min="1" max="${data.stock}" class="form-control text-m text-center ${bg} ${text} cart-quantity fw-bold" style="width: 60px;" value="${data.quantity[i]}" placeholder="Input Quantity" required>
                                                <button type="button" name="${data.id[i]}" class="cart-plus-one btn btn-secondary fw-bold btn-md text-m">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="container">
                                            <button name="${data.id[i]}" type="button" class="remove-cart-item btn btn-md btn-danger text-m">
                                                <i class="bi bi-trash-fill"></i>&nbsp;&nbsp;Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                } else {
                    hidden++
                }
            }
        }

        if(hidden != 0){
            Toast.fire({
                icon: 'warning',
                title: `<h6 class="text-m fw-bold">${hidden} unavailable products have been hidden.</h6>`
            })
        }
        
        if($('.cart-select').length != 0){
            $('.cart-empty').hide();
        }
    }

    $('body').on('keyup', '.cart-quantity', function(){
        if ($(this).val() != '') {
            let cqty = parseInt($(this).val())
            let max = parseInt($(this).attr('max'))

            if (cqty > max) {
                $(this).val(max)
            } else if (cqty < 1) {
                $(this).val(1)
            }

            let id = $(this).attr('name')

            for(let i = 0; i < cart.id.length; i++){
                if(id == cart.id[i]){
                    $('#cart-subtotal-'+id).html('PHP '+ parseFloat(cart.price[i]) * parseInt($(this).val()))
                }
            }

            if($('.cart-select[name="' + id + '"]').prop('checked') == true){
                for(let i = 0; i < cart_ids.length; i++){
                    if(id == cart_ids[i]){
                        cart_quantities[i] = parseInt($(this).val())

                        let price = 0

                        for(let x = 0; x < cart.id.length; x++){
                            if(id == cart.id[x]){
                                price = cart.price[x]
                            }
                        }

                        cart_total -= cart_subtotals[i]
                        cart_subtotals[i] = parseFloat(price) * cart_quantities[i]
                        cart_total += cart_subtotals[i]
                    }
                }
            }
        }
    })

    $('body').on('change', '.cart-quantity', function(){
        if ($(this).val() != '') {
            let cqty = parseInt($(this).val())
            let max = parseInt($(this).attr('max'))

            if (cqty > max) {
                $(this).val(max)
            } else if (cqty < 1) {
                $(this).val(1)
            }

            let id = $(this).attr('name')

            for(let i = 0; i < cart.id.length; i++){
                if(id == cart.id[i]){
                    $('#cart-subtotal-'+id).html('PHP '+ parseFloat(cart.price[i]) * parseInt($(this).val()))
                }
            }

            if($('.cart-select[name="' + id + '"]').prop('checked') == true){
                for(let i = 0; i < cart_ids.length; i++){
                    if(id == cart_ids[i]){
                        cart_quantities[i] = parseInt($(this).val())

                        let price = 0

                        for(let x = 0; x < cart.id.length; x++){
                            if(id == cart.id[x]){
                                price = cart.price[x]
                            }
                        }

                        cart_total -= cart_subtotals[i]
                        cart_subtotals[i] = parseFloat(price) * cart_quantities[i]
                        cart_total += cart_subtotals[i]
                    }
                }
            }
        }

        $('#final-total').html('PHP ' + (cart_total).toLocaleString('en-US'))
        $('#cart-count').html(cart_count + ' items selected.')

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'add', 'key': 1, 'id': $(this).attr('name'), 'quantity': parseInt($(this).val()) }) },
            success: function (response) {
                if (response.success == true) {
                    Toast.fire({
                        icon: 'success',
                        html: '<h6 class="text-m fw-bold mb-0">Updated quantity successfully.</h6>'
                    })
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: '<h6 class="text-m fw-bold mb-0">Failed to update quantity.</h6>'
                    })
                }
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    html: '<h6 class="text-m fw-bold mb-0">Connection error.</h6>'
                })
            }
        })
    })

    $('body').on('click', '.cart-plus-one', function(){
        let id = $(this).attr('name')

        let cqty = parseInt($('#cart-quantity-'+id).val())
        let max = parseInt($('#cart-quantity-'+id).attr('max'))

        if (cqty < max) {
            cqty += 1
            $('#cart-quantity-'+id).val(cqty)
        }

        for(let i = 0; i < cart.id.length; i++){
            if(id == cart.id[i]){
                $('#cart-subtotal-'+id).html('PHP '+ parseFloat(cart.price[i]) * parseInt($('#cart-quantity-'+id).val()))
            }
        }

        if($('.cart-select[name="' + id + '"]').prop('checked') == true){
            for(let i = 0; i < cart_ids.length; i++){
                if(id == cart_ids[i]){
                    cart_quantities[i] = parseInt($('#cart-quantity-'+id).val())

                    let price = 0

                    for(let x = 0; x < cart.id.length; x++){
                        if(id == cart.id[x]){
                            price = cart.price[x]
                        }
                    }

                    cart_total -= cart_subtotals[i]
                    cart_subtotals[i] = parseFloat(price) * cart_quantities[i]
                    cart_total += cart_subtotals[i]
                }
            }
        }

        $('#final-total').html('PHP ' + (cart_total).toLocaleString('en-US'))
        $('#cart-count').html(cart_count + ' items selected.')

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'add', 'key': 1, 'id': id, 'quantity': parseInt($('#cart-quantity-'+id).val()) }) },
            success: function (response) {
                if (response.success == true) {
                    Toast.fire({
                        icon: 'success',
                        html: '<h6 class="text-m fw-bold mb-0">Quantity updated successfully.</h6>'
                    })
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: '<h6 class="text-m fw-bold mb-0">Failed to update quantity.</h6>'
                    })
                }
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    html: '<h6 class="text-m fw-bold mb-0">Connection error.</h6>'
                })
            }
        })
    })

    $('body').on('click', '.cart-minus-one', function(){
        let id = $(this).attr('name')

        let cqty = parseInt($('#cart-quantity-'+id).val())
        let max = parseInt($('#cart-quantity-'+id).attr('max'))

        if (cqty > 1) {
            cqty -= 1
            $('#cart-quantity-'+id).val(cqty)
        }

        for(let i = 0; i < cart.id.length; i++){
            if(id == cart.id[i]){
                $('#cart-subtotal-'+id).html('PHP '+ parseFloat(cart.price[i]) * parseInt($('#cart-quantity-'+id).val()))
            }
        }

        if($('.cart-select[name="' + id + '"]').prop('checked') == true){
            for(let i = 0; i < cart_ids.length; i++){
                if(id == cart_ids[i]){
                    cart_quantities[i] = parseInt($('#cart-quantity-'+id).val())

                    let price = 0

                    for(let x = 0; x < cart.id.length; x++){
                        if(id == cart.id[x]){
                            price = cart.price[x]
                        }
                    }

                    cart_total -= cart_subtotals[i]
                    cart_subtotals[i] = parseFloat(price) * cart_quantities[i]
                    cart_total += cart_subtotals[i]
                }
            }
        }

        $('#final-total').html('PHP ' + (cart_total).toLocaleString('en-US'))
        $('#cart-count').html(cart_count + ' items selected.')

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'add', 'key': 1, 'id': id, 'quantity': parseInt($('#cart-quantity-'+id).val()) }) },
            success: function (response) {
                if (response.success == true) {
                    Toast.fire({
                        icon: 'success',
                        html: '<h6 class="text-m fw-bold mb-0">Quantity updated successfully.</h6>'
                    })
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: '<h6 class="text-m fw-bold mb-0">Failed to update quantity.</h6>'
                    })
                }
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    html: '<h6 class="text-m fw-bold mb-0">Connection error.</h6>'
                })
            }
        })
    })

    $('body').on('change', '.cart-select', function(){
        let id = $(this).attr('name')

        if($('#cart-quantity-'+id).val() == 0){
            $('#cart-quantity-'+id).val(1)

            for(let i = 0; i < cart.id.length; i++){
                if(id == cart.id[i]){
                    $('#cart-subtotal-'+id).html('PHP '+ parseFloat(cart.price[i]) * 1)
                }
            }
        }

        if($(this).prop('checked')){
            for(let i = 0; i < cart.id.length; i++){
                if(id == cart.id[i]){
                    cart_count++
                    cart_ids.push(cart.id[i])
                    cart_names.push(cart.name[i])
                    cart_quantities.push(parseInt($('#cart-quantity-'+cart.id[i]).val()))
                    cart_subtotals.push(parseInt($('#cart-quantity-'+cart.id[i]).val()) * parseFloat(cart.price[i]))
                    cart_total += parseInt($('#cart-quantity-'+cart.id[i]).val()) * parseFloat(cart.price[i])
                    
                }
            }
        } else {
            for(let i = 0; i < cart_ids.length; i++){
                if(id == cart_ids[i]){
                    cart_count--
                    cart_ids.splice(i, 1)
                    cart_names.splice(i, 1)
                    cart_quantities.splice(i, 1)
                    cart_total -= cart_subtotals[i]
                    cart_subtotals.splice(i, 1)
                }
            }
        }

        $('#final-total').html('PHP ' + (cart_total).toLocaleString('en-US'))
        $('#cart-count').html(cart_count + ' items selected.')

        if(cart_count != 0){
            $('.confirm-order').attr('disabled', false)
        } else {
            $('.confirm-order').attr('disabled', true)
        }
    })

    $('body').on('click', '.remove-cart-item', function(){
        let id = $(this).attr('name')

        $('.cart-item-'+id).remove()

        for(let i = 0; i < cart_ids.length; i++){
            if(id == cart_ids[i]){
                cart_count--
                cart_ids.splice(i, 1)
                cart_names.splice(i, 1)
                cart_quantities.splice(i, 1)
                cart_total -= cart_subtotals[i]
                cart_subtotals.splice(i, 1)
                
            }
        }

        let to_splice = []

        for(let i = 0; i < cart.id.length; i++){
            if(id == cart.id[i]){
                to_splice.push(i)
            }
        }

        for(let i = 0; i < to_splice.length; i++){
            //cart.id.splice(to_splice[i], 1)
            //cart.image.splice(to_splice[i], 1)
            //cart.name.splice(to_splice[i], 1)
            //cart.description.splice(to_splice[i], 1)
            //cart.price.splice(to_splice[i], 1)
            //cart.stock.splice(to_splice[i], 1)
            //cart.sold.splice(to_splice[i], 1)
            //cart.category.splice(to_splice[i], 1)
            //cart.quantity.splice(to_splice[i], 1)
        }

        $('#final-total').html('PHP ' + (cart_total).toLocaleString('en-US'))
        $('#cart-count').html(cart_count + ' items selected.')

        if($('.cart-select').length != 0){
            $('.confirm-order').attr('disabled', false)
            $('.cart-empty').hide()
        } else {
            $('.confirm-order').attr('disabled', true)
            $('.cart-empty').show()
        }

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'delete', 'key': 1, 'id': $(this).attr('name') }) },
            success: function (response) {
                if (response.success == true) {
                    Toast.fire({
                        icon: 'success',
                        html: '<h6 class="text-m fw-bold mb-0">Item removed from cart successfully.</h6>'
                    })
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: '<h6 class="text-m fw-bold mb-0">Failed to remove item from cart.</h6>'
                    })
                }
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    html: '<h6 class="text-m fw-bold mb-0">Connection error.</h6>'
                })
            }
        })
    })

    $('body').on('click', '.confirm-order', function(){
        cart_shipping = 0
        let base = 0
        let quantity_limit = 0
        let item_count_limit = 0
        let increase = 0

        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'shipping-info' }) },
            success: function(response){
                if(response.success == true){
                    base = parseFloat(response.base)
                    quantity_limit = parseInt(response.quantity_limit)
                    item_count_limit = parseInt(response.item_count_limit)
                    increase = parseFloat(response.increase)

                    cart_shipping += base

                    if(quantity_limit == 0 && item_count_limit != 0){
                        if(parseInt(cart_count/item_count_limit) >= 1){
                            cart_shipping += increase*parseInt(cart_count/item_count_limit)
                        }
                    } else if(quantity_limit != 0 && item_count_limit == 0){
                        if(parseInt(cart_count/quantity_limit) >= 1){
                            cart_shipping += increase*parseInt(cart_count/quantity_limit)
                        }
                    }

                    let content = `
                        <div class="container">
                            <div class="row mb-3">
                                <div class="container">
                                    <table class="text-m table table-striped table-hover">
                                        <tbody>
                                            <tr>
                                                <td class="text-start"><b>Price :</b></td>
                                                <td class="text-end"><span id="table-total">PHP ${cart_total.toLocaleString('en-US')}</span></td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Shipping fee :</b></td>
                                                <td class="text-end"><span id="table-shipping">PHP ${cart_shipping.toLocaleString('en-US')}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="alert alert-info rounded d-flex align-items-center justify-content-center">
                                        <i class="bi bi-info-circle-fill text-xl"></i>&nbsp;&nbsp;
                                        <h6 class="text-sm mb-0">Shipping fee calculation may change depending on the shipping matrix implemented.</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="container text-start">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <i class="bi bi-credit-card-fill text-xxl"></i>
                                        </div>
                                        <div class="col">
                                            <h6 class="text-l fw-bold mb-0">Payment Method</h6>
                                        </div>
                                    </div>
                                    <p class="text-sm">Choose an option to pay for your order.</p>
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <div class="container">
                                                <input type="radio" class="btn-check" name="options-payment" id="cod-option" autocomplete="off" checked>
                                                <label class="btn btn-outline-primary" for="cod-option">
                                                    <div class="row align-items-center justify-content-center">
                                                        <div class="col-12 col-md-auto">
                                                            <i class="bi bi-truck text-xxl"></i>
                                                        </div>
                                                        <div class="col-12 col-md">
                                                            <h6 class="text-l fw-bold">Cash-on-delivery / Pay Online</h6>
                                                            <p class="text-sm">Get your orders delivered at your doorstep. Shipping address and shipping address will be required.</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="container">
                                                <input type="radio" class="btn-check" name="options-payment" id="pickup-option" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="pickup-option">
                                                    <div class="row align-items-center justify-content-center">
                                                        <div class="col-12 col-md-auto">
                                                            <i class="bi bi-truck text-xxl"></i>
                                                        </div>
                                                        <div class="col-12 col-md">
                                                            <h6 class="text-l fw-bold">Pickup Order On Shop</h6>
                                                            <p class="text-sm">Get your orders at the hardware store and pay the amount there. Present the corresponding transaction number/s to pickup your orders.</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3 shipping-method">
                                <div class="container text-start">
                                    <div class="row mb-2">
                                        <div class="alert alert-info rounded">
                                            <h6 class="text-l fw-bold">Downpayment</h6>
                                            <p class="text-sm">Required for COD option. Please pay 50% or pay the whole amount.</p>
                                            <div class="form-check form-check-inline align-items-center">
                                                <input type="radio" class="form-check-input text-m" name="downpay-choices" id="fifty-percent" checked>
                                                <label class="form-check-label text-m" for="fifty-percent">
                                                    <input type="text" class="form-control text-m fw-bold" value="PHP ${parseFloat((cart_total+cart_shipping)*0.5).toLocaleString('en-US')}" disabled>
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline align-items-center">
                                                <input type="radio" class="form-check-input text-m" name="downpay-choices" id="hundred-percent">
                                                <label class="form-check-label text-m mb-2" for="hundred-percent">
                                                    <input type="text" class="form-control text-m fw-bold" value="PHP ${parseFloat(cart_total+cart_shipping).toLocaleString('en-US')}" disabled>
                                                </label>
                                            </div>
                                            <input type="hidden" id="downpayment-amount" value="${parseFloat((cart_total+cart_shipping)*0.5).toLocaleString('en-US')}">
                                            <hr>
                                            <h6 class="text-m fw-bold">GCash Reference Number</h6>
                                            <p class="text-sm">Open your GCash app first and pay your selected amount above to <b class="bg-warning">09123456789</b>, then go back here.</p>
                                            <input type="text" id="gcash-ref-num" class="form-control mb-2 text-m" placeholder="Paste here the reference number here">
                                            <p class="text-xsm">Pay using your GCash and paste the reference number for transaction here. The administrator will verify if the payment is received before approving your order.</p>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <i class="bi bi-geo-alt-fill text-xxl"></i>
                                        </div>
                                        <div class="col">
                                            <h6 class="text-l fw-bold mb-0">Shipping Address</h6>
                                        </div>
                                    </div>
                                    <p class="text-sm">Choose address to ship your order.</p>
                                    <div class="form-check form-check-inline align-items-center">
                                        <input type="radio" class="form-check-input text-m" name="address-choices" id="main-address" checked>
                                        <label class="form-check-label text-m" for="main-address">Main address</label>
                                    </div>
                                    <div class="form-check form-check-inline align-items-center">
                                        <input type="radio" class="form-check-input text-m" name="address-choices" id="secondary-address">
                                        <label class="form-check-label text-m mb-2" for="secondary-address">Secondary address</label>
                                    </div>
                                    <div class="form-check form-check-inline align-items-center mb-3">
                                        <input type="radio" class="form-check-input text-m" name="address-choices" id="custom-address">
                                        <label class="form-check-label text-m" for="custom-address">Custom address</label>
                                    </div>
                                    <textarea rows="2" id="address-container" type="text" class="text-m form-control" disabled></textarea>
                                </div>
                            </div>
                            <div class="row mb-2 pickup-method">
                                <div class="container text-start">
                                    <div class="alert alert-info rounded d-flex align-items-center justify-content-center">
                                        <i class="bi bi-info-circle-fill text-xl"></i>&nbsp;&nbsp;
                                        <h6 class="text-sm mb-0"><b>No shipping fee</b> will be added. <b>Once the order is approved, a pickup date will be shown</b> on your order detail. Please <b>come to the store and present the corresponding Transaction Number</b> that will be generated after placing this order. Go to <b>My Orders page</b> to see your transaction numbers.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `

                    Swal.fire({
                        width: 900,
                        title: `
                            To Pay : <span id="place-order-total">PHP ${(cart_total+cart_shipping).toLocaleString('en-US')}</span>
                        `,
                        icon: 'info',
                        html: content,
                        allowOutsideClick: false,
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        reverseButtons: true,
                        cancelButtonText:
                            'Cancel',
                        cancelButtonAriaLabel: 'Thumbs down',
                        confirmButtonText:
                            'Place Order',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        preConfirm: () => {
                            
                            const cash = $('#gcash-ref-num').val()
                            
                            if($('#cod-option').prop('checked')){
                                if (!cash) {
                                  Swal.showValidationMessage(`Please enter GCash Reference Number.`)
                                }
                            }

                        }
                    }).then((result) => {
                        if(result.isConfirmed){
                            let downpayment = parseFloat($('#downpayment-amount').val())
                            let gcashrefnum = $('#gcash-ref-num').val()
                            cart_address = $('#address-container').val()

                            if($('#pickup-option').prop('checked')){
                                cart_shipping = 0
                                cart_address = 'pickup'
                                gcashrefnum = ''
                                downpayment = 0
                            }

                            cart_to_save = {
                                'customer' : $('#customer-name').val(),
                                'gcash_ref_num' : gcashrefnum,
                                'downpayment' : downpayment,
                                'id' : cart_ids,
                                'name' : cart_names,
                                'quantity' : cart_quantities, 
                                'subtotal' : cart_subtotals, 
                                'total' : cart_total,
                                'shipping' : cart_shipping,
                                'address' : cart_address
                            }

                            $.ajax({
                                url: '/controller/handler.php',
                                type: 'post',
                                dataType: 'json',
                                cache: false,
                                data: { request: JSON.stringify({ 'type': 'place-order', 'key': 1, 'cart': cart_to_save }) },
                                beforeSend: function(){
                                    loading_screen()
                                },
                                success: function (response) {
                                    if (response.success == true) {
                                        Toast.fire({
                                            icon: 'success',
                                            title: '<h6 class="text-m fw-bold">Order successful.</h6>'
                                        })

                                        for(let y = 0; y < cart_ids.length; y++){
                                            $('.cart-item-'+cart_ids[y]).remove()

                                            cart_count--
                                        }

                                        cart_ids = []
                                        cart_names = []
                                        cart_quantities = []
                                        cart_total = 0
                                        cart_subtotals = []
                                        cart_shipping = 0

                                        $('#cart-total').html('PHP ' + cart_total.toLocaleString('en-US') + ' - Total')
                                        $('#cart-shipping').html('PHP ' + cart_shipping.toLocaleString('en-US') + ' - Shipping')
                                        $('#final-total').html('PHP ' + (cart_total+cart_shipping).toLocaleString('en-US'))
                                        $('#cart-count').html(cart_count + ' items selected.')

                                        if($('.cart-select').length != 0){
                                            $('.confirm-order').attr('disabled', false)
                                            $('.cart-empty').hide()
                                        } else {
                                            $('.confirm-order').attr('disabled', true)
                                            $('.cart-empty').show()
                                        }
                                    } else {
                                        Toast.fire({
                                            icon: 'warning',
                                            title: '<h6 class="text-m fw-bold">Transaction failed.</h6>'
                                        })
                                    }
                                },
                                error: function () {
                                    Toast.fire({
                                        icon: 'error',
                                        title: '<h6 class="text-m fw-bold">Connection error.</h6>'
                                    })
                                }
                            })
                        }
                    })

                    if($('#main-address').prop('checked')){
                        $('#address-container').html($('#address-1').val())
                    }

                    $('.pickup-method').hide()
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Failed to get shipping fee information from the server.'
                    })
                }
            },
            error: function(){
                Toast.fire({
                    icon: 'error',
                    title: 'Connection error.'
                })
            }
        })
    })

    $('body').on('click', '#fifty-percent', function(){
        if($(this).prop('checked')){
            $('#downpayment-amount').val(parseFloat((cart_total+cart_shipping)*0.5))
        }
    })

    $('body').on('click', '#hundred-percent', function(){
        if($(this).prop('checked')){
            $('#downpayment-amount').val(parseFloat(cart_total+cart_shipping))
        }
    })

    $('body').on('click', '#cod-option', function(){
        if($(this).prop('checked')){
            $('#place-order-total').html('PHP '+ (cart_total+cart_shipping).toLocaleString('en-US'))
            $('#table-shipping').html('PHP '+(cart_shipping).toLocaleString('en-US'))
            $('.pickup-method').hide()
            $('.shipping-method').hide().fadeIn()
        }
    })

    $('body').on('click', '#pickup-option', function(){
        if($(this).prop('checked')){
            $('#place-order-total').html('PHP '+ (cart_total).toLocaleString('en-US'))
            $('#table-shipping').html('PHP 0')
            $('.shipping-method').hide()
            $('.pickup-method').hide().fadeIn()
        }
    })

    $('body').on('click', '#main-address', function(){
        if($(this).prop('checked')){
            $('#address-container').val($('#address-1').val()).attr('disabled', true)
        }
    })

    $('body').on('click', '#secondary-address', function(){
        if($(this).prop('checked')){
            $('#address-container').val($('#address-2').val()).attr('disabled', true)
        }
    })

    $('body').on('click', '#custom-address', function(){
        if($(this).prop('checked')){
            $('#address-container').val('(Block/Lot/House No.) (Street Name) (Barangay) San Jose del Monte, Bulacan').attr('disabled', false)
        }
    })

    function init_load_orders(){
        $.ajax({
            url: '/controller/handler.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'type': 'show-orders', 'key': 1 }) },
            beforeSend: function(){
                loading_screen()
            },
            success: function (response) {
                if(response.success == true){
                    Toast.fire({
                        icon: 'success',
                        title: '<h6 class="text-m fw-bold">Loaded orders successfully.</h6>'
                    })

                    orders = response

                    print_orders(orders, 'all')
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: '<h6 class="text-m fw-bold">Failed to load orders.</h6>'
                    })
                }
            },
            error: function () {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="text-m fw-bold">Connection error.</h6>'
                })
            }
        })
    }

    function print_orders(data, filter){
        if(data.transaction_id[0] != null){
            for(let i = 0; i < data.transaction_id.length; i++){
                if(data.status[i] == 'pending' || data.status[i] == 'confirmed' || data.status[i] == 'rejected' || data.status[i] == 'delivered'){
                    if(data.est_delivery[i] == null){
                        if(data.status == 'rejected'){
                            data.est_delivery[i] = 'Your order has been rejected by the admin.'
                        } else {
                            data.est_delivery[i] = 'Waiting for admin review and approval.'
                        }
                    }

                    $('.no-orders').hide()

                    if(filter == 'all'){
                        $('.orders-display').append(`
                            <div class="row mb-4 order-item order-item-${i} justify-content-center align-items-center">
                                <div class="col-4 col-md-3">
                                    <div class="row text-center align-items-center">
                                        <i class="bi bi-bag-check-fill order-icon-${i}" style="font-size: 100px;"></i>
                                    </div>
                                </div>
                                <div class="col-8 col-md-7">
                                    <div class="container order-item-${i} py-3">
                                        <h6 class="text-m"><b>Transaction No. :</b> ${data.transaction_id[i].toUpperCase()}</h6>
                                        <h6 class="text-sm"><b>Estimated delivery date :</b> ${data.est_delivery[i]}</h6>
                                        <h6 class="text-l fw-bolder text-danger">PHP ${(data.finalprice[i]-data.downpayment[i]).toLocaleString('en-US')}</h6>
                                        <h6 class="text-xsm fw-bold">Paid : PHP ${data.downpayment[i].toLocaleString('en-US')} via GCash</h6>
                                        <input type="text" class="form-control ${data.status[i]} text-sm mb-2 status-${i}" value="Order Status : ${data.status[i]}" disabled>
                                        <div class="row">
                                            <div class="container cancellable-${i}">
                                                <button class="btn btn-primary order-info text-sm" name="${i}">View Info</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `)

                        if(data.status[i] == 'pending'){
                            $('.cancellable-'+i).append('<button id="'+i+'" class="cancel-order btn btn-md btn-outline-secondary text-sm" name="' + data.transaction_id[i] + '">Cancel Order</button>')
                        } else if (data.status[i] == 'delivered'){
                            $('.status-'+i).addClass('border-success text-success')
                            $('.order-item-'+i).addClass('border-success')
                            $('.order-icon-'+i).addClass('text-success')
                        } else if (data.status[i] == 'confirmed'){
                            $('.status-'+i).addClass('border-success text-success')
                            $('.order-item-'+i).addClass('border-success')
                            $('.order-icon-'+i).addClass('text-success')
                        } else if (data.status[i] == 'rejected'){
                            $('.status-'+i).addClass('border-danger text-danger')
                            $('.order-item-'+i).addClass('border-danger')
                            $('.order-icon-'+i).addClass('text-danger').removeClass('bi bi-bag-check-fill').addClass('bi bi-bag-x-fill')
                            $('.order-info[name="'+i+'"]').removeClass('btn-primary').addClass('btn-danger')
                        }
                    } else {
                        if(filter == data.status[i]){
                            $('.orders-display').append(`
                                <div class="row mb-4 order-item order-item-${i} justify-content-center align-items-center">
                                    <div class="col-4 col-md-3">
                                        <div class="row text-center align-items-center">
                                            <i class="bi bi-bag-check-fill order-icon-${i}" style="font-size: 100px;"></i>
                                        </div>
                                    </div>
                                    <div class="col-8 col-md-7">
                                        <div class="container order-item-${i} py-3">
                                            <h6 class="text-m"><b>Transaction No. :</b> ${data.transaction_id[i].toUpperCase()}</h6>
                                            <h6 class="text-m"><b>Estimated delivery date :</b> ${data.est_delivery[i]}</h6>
                                            <h6 class="text-l fw-bolder text-danger">PHP ${data.finalprice[i].toLocaleString('en-US')}</h6>
                                            <input type="text" class="form-control ${data.status[i]} text-sm mb-2 status-${i}" value="Order Status : ${data.status[i]}" disabled>
                                            <h6 class="text-sm mb-2">Ordered at ${data.transaction_date[i]}</h6>
                                            <div class="row">
                                                <div class="container cancellable-${i}">
                                                    <button class="btn btn-primary order-info text-sm" name="${i}">View Info</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `)

                            if(data.status[i] == 'pending'){
                                $('.cancellable-'+i).append('<button id="'+i+'" class="cancel-order btn btn-md btn-outline-secondary text-sm" name="' + data.transaction_id[i] + '">Cancel Order</button>')
                            } else if (data.status[i] == 'delivered'){
                                $('.status-'+i).addClass('border-success text-success')
                                $('.order-item-'+i).addClass('border-success')
                                $('.order-icon-'+i).addClass('text-success')
                            } else if (data.status[i] == 'confirmed'){
                                $('.status-'+i).addClass('border-success text-success')
                                $('.order-item-'+i).addClass('border-success')
                                $('.order-icon-'+i).addClass('text-success')
                            } else if (data.status[i] == 'rejected'){
                                $('.status-'+i).addClass('border-danger text-danger')
                                $('.order-item-'+i).addClass('border-danger')
                                $('.order-icon-'+i).addClass('text-danger').removeClass('bi bi-bag-check-fill').addClass('bi bi-bag-x-fill')
                                $('.order-info[name="'+i+'"]').removeClass('btn-primary').addClass('btn-danger')
                            }
                        }
                    }
                }
            }
        } else {
            $('.no-orders').show()
        }
    }

    $('body').on('change', '#status-filter', function(){
        let filter = $(this).val()
        $('.order-item').remove()
        print_orders(orders, filter)
        if($('.order-item').length == 0){
            $('.no-orders').show()
        }
    })

    $('body').on('click', '.cancel-order', function(){
        let id = $(this).attr('name')
        let index = $(this).attr('id')
        let bg = 'bg-'
        let text = 'text-'

        if (($('body').attr('class') == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'dark') || ($('body').attr('class')  == 'dark swal2-shown swal2-height-auto')) {
            bg += 'dark'
            text += 'light'
        } else if (($('body').attr('class')  == 'light swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'light') || ($('body').attr('class')  == 'light swal2-shown swal2-height-auto')) {
            bg += 'light'
            text += 'dark'
        }

        Swal.fire({
            icon: 'question',
            html: `
                <div class="container">
                    <div class="row mb-2">
                        <h6 class="text-m mb-2 fw-bold">Choose a reason for cancellation of order</h6>
                        <select class="mb-2 form-select text-m ${bg} ${text} fw-bold" id="reason">
                            <option value="Change Payment Method">Change payment method</option>
                            <option value="Change Quantity Item">Change of quantity/item</option>
                        </select>
                        <div class="alert alert-info rounded d-flex align-items-center justify-content-center">
                            <i class="bi bi-info-circle-fill text-xl"></i>&nbsp;&nbsp;
                            <h6 class="text-sm mb-0">Orders are only cancellable while their status is still pending.</h6>
                        </div>
                    </div>
                </div>
            `,
            allowOutsideClick: false,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: true,
            reverseButtons: true,
            cancelButtonText:
                'Back',
            cancelButtonAriaLabel: 'Thumbs down',
            confirmButtonText:
                'Cancel Order',
            confirmButtonAriaLabel: 'Thumbs up, great!'
        }).then((result) => {
            if(result.isConfirmed){
                $.ajax({
                    url: '/controller/handler.php',
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data: { request: JSON.stringify({ 'type': 'cancel-order', 'id': id, 'reason' : $('#reason').val() }) },
                    beforeSend: function(){
                        loading_screen()
                    },
                    success: function (response) {
                        if(response.success == true){
                            $('.order-item-'+index).remove()

                            if($('.order-item').length == 0){
                                $('.no-orders').show()
                            }

                            Toast.fire({
                                icon: 'success',
                                title: '<h6 class="text-m fw-bold">Cancelled order successfully.</h6>'
                            })
                        } else {
                            Toast.fire({
                                icon: 'warning',
                                title: '<h6 class="text-m fw-bold">Failed to cancel order.</h6>'
                            })
                        }
                    },
                    error: function () {
                        Toast.fire({
                            icon: 'error',
                            title: '<h6 class="text-m fw-bold">Connection error.</h6>'
                        })
                    }
                })
            }
        })
    })

    $('body').on('click', '.order-info', function(){
        let index = $(this).attr('name')
        let temp = JSON.parse(orders.items[index])

        $.ajax({
            url: "/controller/handler.php",
            method: "POST",
            dataType: 'json',
            cache: false,
            data: {
                request : JSON.stringify({ 'type' : 'extra-image', 'items' : temp })
            },
            success: function(response) {
                if(response.success == true){
                    let bg = 'bg-'
                    let text = 'text-'

                    if (($('body').attr('class') == 'dark swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'dark') || ($('body').attr('class')  == 'dark swal2-shown swal2-height-auto')) {
                        bg += 'dark'
                        text += 'light'
                    } else if (($('body').attr('class')  == 'light swal2-shown swal2-height-auto swal2-toast-shown') || ($('body').attr('class')  == 'light') || ($('body').attr('class')  == 'light swal2-shown swal2-height-auto')) {
                        bg += 'light'
                        text += 'dark'
                    }
                    let info = `
                        <div class="container">
                            <div class="row mb-3 pt-5 justify-content-center">
                                <div class="col-md-9 alert alert-info mb-4 rounded text-start">
                                    <h6 class="text-m"><b>Customer name :</b> ${orders.customer[index]}</h6>
                                    <h6 class="text-m"><b>To be delivered at :</b> ${orders.address[index]}</h6>
                                    <h6 class="text-m mb-2"><b>Ordered at :</b> ${orders.transaction_date[index]}</h6>
                                    <h6 class="text-m mb-2"><b>GCash Reference Number :</b> ${orders.gcash_ref_num[index]}</h6>
                                </div>
                                <h6 class="text-l fw-bolder mb-0">Items Ordered :</h6>
                            </div>
                    `

                    for(let i = 0; temp.ids[i] != null; i++){
                        info += `
                            <div class="row my-3 pt-3 justify-content-center align-items-center">
                                <div class="col-5 col-md-4">
                                    <img src="${response.image[i]}" class="product-image rounded">
                                </div>
                                <div class="col-7 col-md-5">
                                    <div class="container text-start">
                                        <h6 class="text-m fw-bold">${temp.names[i]}</h6>
                                        <h6 class="text-xsm fw-bolder">${response.size_color[i]}</h6>
                                        <input type="text" disabled value="Quantity : ${temp.quantities[i]}" class="form-control mb-2 ${bg} ${text} text-sm fw-bold">
                                        <h6 class="text-l text-danger fw-bolder">PHP ${temp.subtotals[i].toLocaleString('en-US')}</h6>
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    info += '</div>'
                    
                    Swal.fire({
                        title: '',
                        html: info,
                        showConfirmButton: false,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        width: 800,
                    })
                } else {
                    Toast.fire({
                        icon: 'warning',
                        html: response.error
                    })
                }
            },
            error: function(){
                Toast.fire({
                    icon: 'error',
                    html: `Connection error.`
                })
            }
        })
    })
})