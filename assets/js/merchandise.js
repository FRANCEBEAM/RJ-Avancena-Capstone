$(document).ready(function(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        width: 450,
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false
    })

    var spinner = 
        `<div class="container d-flex justify-content-center text-center py-3">
            <div class="spinner-border text-primary small-text" role="status"></div>
        </div>`;
    var spinnergrow = 
        `<div class="container d-flex justify-content-center py-3">
            <div class="spinner-grow spinner-grow-sm m-1 text-info small-text" role="status"></div>
            <div class="spinner-grow spinner-grow-sm m-1 text-info small-text" role="status"></div>
            <div class="spinner-grow spinner-grow-sm m-1 text-info small-text" role="status"></div>
        </div>`;
    var productsPlaceholder = 
        `<div class="row mb-2">
            <div class="col-md-4">
                <div class="container">
                    <div class="row">
                        <div class="col-4 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 product-image rounded bg-primary mb-1"></span>
                            </p>
                        </div>
                        <div class="col-8 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 rounded"></span>
                                <span class="placeholder col-12 bg-danger rounded"></span>
                                <span class="placeholder col-12 bg-info rounded"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="container">
                    <div class="row">
                        <div class="col-4 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 product-image rounded bg-primary mb-1"></span>
                            </p>
                        </div>
                        <div class="col-8 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 rounded"></span>
                                <span class="placeholder col-12 bg-danger rounded"></span>
                                <span class="placeholder col-12 bg-info rounded"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="container">
                    <div class="row">
                        <div class="col-4 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 product-image rounded bg-primary mb-1"></span>
                            </p>
                        </div>
                        <div class="col-8 col-md-12">
                            <p class="placeholder-wave">
                                <span class="placeholder col-12 rounded"></span>
                                <span class="placeholder col-12 bg-danger rounded"></span>
                                <span class="placeholder col-12 bg-info rounded"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    var databaseInfo = {}
    var search = {}
    var transactResponse = {}
    var for_receipt = {}

    class Cart {
        constructor(cartName) {
            this.cartName = cartName
            this.count = 0
            this.ids = []
            this.names = []
            this.prices = []
            this.quantities = []
            this.stocks = []
            this.subtotals = []
            this.images = []
            this.total = 0
            this.change = 0
            this.finaltotal = 0
            this.discount = 0
            this.address = ''
            this.cash = 0
            this.customer = ''
            this.delivery_date = ''
            this.gcashrefnum = ''
            this.cart = {}
        }

        addItem(id, name, price, quantity, stock, subtotal, image) {
            this.ids.push(id)
            this.names.push(name)
            this.prices.push(parseFloat(price))
            this.quantities.push(parseFloat(quantity))
            this.stocks.push(parseFloat(stock))
            this.subtotals.push(parseFloat(subtotal))
            this.images.push(image)
            this.total += parseFloat(subtotal)
            this.count++
            if(this.saveCart()) {
                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="medium-text fw-bold">Added to cart successfully!</h6>'
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="medium-text fw-bold">Error with saving item to cart.</h6>'
                })
            }
        }

        removeItem(id) {
            for(let i = 0; i < this.ids.length; i++) {
                if(id == this.ids[i]) {                    
                    this.count--
                    this.total -= this.subtotals[i]
                    this.ids.splice(i, 1)
                    this.names.splice(i, 1)
                    this.prices.splice(i, 1)
                    this.quantities.splice(i, 1)
                    this.stocks.splice(i, 1)
                    this.subtotals.splice(i, 1)
                    this.images.splice(i, 1)
                }
            }
            if(this.saveCart()) {
                Toast.fire({
                    icon: 'success',
                    title: '<h6 class="medium-text fw-bold">Removed item from cart.</h6>'
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="medium-text fw-bold">Error removing item from cart.</h6>'
                })
            }
            if(this.count == 0) {
                this.total = 0
                this.clearCart()
            }
        }

        editQuantity(id, quantity, stock, subtotal) {
            for(let i = 0; i < this.ids.length; i++) {
                if(id == this.ids[i]) {
                    this.total -= this.subtotals[i]
                    this.quantities[i] = parseInt(quantity)
                    this.stocks[i] = parseInt(stock)
                    this.subtotals[i] = parseFloat(subtotal)
                    this.total += this.subtotals[i]
                }
            }
            if(this.saveCart() == false) {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="medium-text fw-bold">Error saving changes to cart.</h6>'
                })
            }
        }

        compileCart() {
            this.cart = {
                'count' : this.count ,
                'ids' : this.ids ,
                'names' : this.names ,
                'prices' : this.prices ,
                'quantities' : this.quantities,
                'stocks' : this.stocks ,
                'subtotals' : this.subtotals ,
                'images' : this.images,
                'total' : this.total
            }
        }

        sendCart() {
            let res = false
            if(isNaN(this.shipping) && isNaN(this.discount)) {
                this.shipping = 0
                this.discount = 0
                this.finaltotal = this.total
            } else if(isNaN(this.discount)) {
                this.discount = 0
                this.finaltotal = this.total + this.shipping
            } else if(isNaN(this.shipping)) {
                this.shipping = 0
                this.finaltotal = this.total - this.discount
            } else {
                this.finaltotal = (this.total + this.shipping) - this.discount
            }
            this.change = this.cash - this.finaltotal
            this.cart = {
                'ids' : this.ids ,
                'names' : this.names ,
                'quantities' : this.quantities ,
                'subtotals' : this.subtotals ,
                'total' : this.total ,
                'shipping' : this.shipping ,
                'discount' : this.discount ,
                'change' : this.change ,
                'address' : this.address ,
                'finaltotal' : this.finaltotal ,
                'customer' : this.customer ,
                'delivery_date' : this.delivery_date,
                'gcashrefnum' : this.gcashrefnum
            }

            for_receipt = this.cart

            $.ajax({
                url: '/controller/merchandise.php',
                type: 'post',
                dataType: 'json',
                cache: false ,
                data: {order: JSON.stringify(this.cart)},
                success: function(response) {
                    res = true
                    transactResponse = response
                    if(transactResponse.success == true) {
                        Swal.fire({
                            icon: 'success',
                            title: '<h6 class="large-text" id="modal-p-name">Transaction Success</h6>',
                            html: `
                                <div class="container">
                                    <div class="row mb-3">
                                        <div class="container">
                                            <button class="print-receipt btn btn-md btn-primary fw-bold text-m">Print Receipt<div class="d-none" id="print-pdfs-qr"></div></button>
                                        </div>
                                    </div>
                                </div>
                                <h6 class="small-text">Transaction ID : <b>${transactResponse.transaction_id}</b></h6>
                            `,
                            allowOutsideClick: false ,
                            showCloseButton: false ,
                            showCancelButton: false ,
                            focusConfirm: false ,
                            cancelButtonText:
                                '<i class="bi bi-x"></i> Cancel',
                            cancelButtonAriaLabel: 'Thumbs down',
                            confirmButtonText:
                                '<i class="bi bi-check"></i> Back',
                            confirmButtonAriaLabel: 'Thumbs up, great!'
                        }).then((result) => {
                            if(result.isConfirmed) {
                                const doc = new jsPDF('p', 'mm', [100, 57])

                                // var qrcode = new QRCode(qrDiv = document.querySelector("#print-pdfs-qr"), {
                                //     text: transactResponse.transaction_id,
                                //     width: 200,
                                //     height: 200,
                                //     colorDark : "#000000",
                                //     colorLight : "#ffffff",
                                //     correctLevel : QRCode.CorrectLevel.M
                                // })
                            
                                // var qrSrc = qrDiv.children[0].toDataURL("image/png")

                                if(for_receipt.discount == NaN){
                                    for_receipt.discount = 0
                                }
                                if(for_receipt.shipping == NaN){
                                    for_receipt.shipping = 0
                                }
                                if(for_receipt.address == '' || for_receipt.address == null){
                                    for_receipt.address = '[Not For Delivery]'
                                }

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
                                doc.text($('#acc_type').val() + ': ' + $('#acc_name').val(), 38, 20, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(6);
                                doc.text(CurrentDatetimeShort(), 26, 22, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(6);
                                doc.text(''+transactResponse.transaction_id, 33, 24, 'right')

                                let y=28;
                                let x=28;
                                let z=28;

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(7);
                                doc.text('ITEMS PURCHASED | QTY | PRICE', 28, 28, 'center')

                                for(let i = 0; i < for_receipt.names.length; i++){
                                    doc.setFont('Courier', 'normal');
                                    doc.setFontSize(5.5);
                                    doc.text(for_receipt.names[i], 28, y+=2.5, 'right')

                                    doc.setFont('Courier', 'normal');
                                    doc.setFontSize(5.5);
                                    doc.text('x' + for_receipt.quantities[i], 37, x+=2.5, 'right')

                                    doc.setFont('Courier', 'normal');
                                    doc.setFontSize(5.5);
                                    doc.text(for_receipt.subtotals[i].toLocaleString('en-US'), 50, z+=2.5, 'right')
                                }
                                
                                doc.setLineWidth(0.10); 
                                doc.line(6.75, z+1.25, 50, z+1.25);

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('SUBTOTAL', 8, y+=2.5+1)


                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text(for_receipt.total.toLocaleString('en-US'), 50, z+=2.5+1, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('DISCOUNT', 8, y+=2.5)

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('- ' + for_receipt.discount, 50, z+=2.5, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('SHIPPING', 8, y+=2.5)

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('+ ' + for_receipt.shipping, 50, z+=2.5, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('GRAND TOTAL', 8, y+=2.5)

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text(for_receipt.finaltotal.toLocaleString('en-US'), 50, z+=2.5, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('CHANGE', 8, y+=2.5)

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text(for_receipt.change.toLocaleString('en-US'), 50, z+=2.5, 'right')

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text('SHIP TO', 8, y+=2.5)

                                doc.setFont('Courier', 'bold');
                                doc.setFontSize(5.5);
                                doc.text(for_receipt.address.substr(0, 35), 50, z+=5.5, 'right')
                                doc.text(for_receipt.address.substr(36), 50, z+=6.5, 'right')

                                //doc.addImage(qrSrc, 'PNG', 19.5, x+30, 17.5, 17.5);

                                doc.save('receipt_' + transactResponse.transaction_id + '.pdf')
                                //window.open(doc.output('bloburi', 'receipt_' + transactResponse.transaction_id), '_blank')

                                cart.clearCart()
                                $('#cart-space').html('').append(
                                    `<div class="row" id="no-items">
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <div class="container text-center py-5 my-5">
                                                <h6 class="small-text">No items on cart.</h6>
                                            </div>
                                        </div>
                                    </div>`
                                );
                                $('#cart-item-count').html(cart.itemCount());
                                $('#total-price').html(cart.totalPrice());
                                $('.pay').attr('disabled', true);
                                $('.clear').attr('disabled', true);
                                if(cart.itemCount() > 0) {
                                    $('.pay').attr('disabled', false);
                                    $('.clear').attr('disabled', false);
                                    $('#no-items').hide();
                                }
                                $(document).attr('title', 'Merchandise')
                                Toast.fire({
                                    icon: 'success',
                                    title: '<h6 class="medium-text fw-bold">Transaction successful.</h6>'
                                })
                            }
                        })
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: '<h6 class="medium-text fw-bold">Transaction failed.</h6>'
                        })
                    }
                }
            });
            return res
        }

        saveCart() {
            let res = false
            if(localStorage.getItem(this.cartName) == null) {
                this.compileCart()
                localStorage.setItem(this.cartName, JSON.stringify(this.cart))
                res = true
            } else {
                this.compileCart()
                localStorage.setItem(this.cartName, JSON.stringify(this.cart))
                res = true
            }
            return res
        }

        clearCart() {
            localStorage.removeItem(this.cartName)
            this.count = 0
            this.ids = []
            this.names = []
            this.prices = []
            this.quantities = []
            this.stocks = []
            this.subtotals = []
            this.images = []
            this.total = 0
            this.shipping = 0
            this.discount = 0
            this.change = 0
            this.finaltotal = 0
            this.address = ""
            this.customer = ''
            this.delivery_date = ''
            this.gcashrefnum = ''
            this.cart = {}
        }

        loadSavedCart() {
            if((localStorage.getItem(this.cartName) == null) || (localStorage.getItem(this.cartName) == '{}')) {
                localStorage.setItem(this.cartName, JSON.stringify(this.cart))
            } else {
                let temp_cart = localStorage.getItem(this.cartName)
                this.cart = JSON.parse(temp_cart)
                this.count = this.cart.count
                this.ids = this.cart.ids
                this.names = this.cart.names
                this.prices = this.cart.prices
                this.quantities = this.cart.quantities
                this.stocks = this.cart.stocks
                this.subtotals = this.cart.subtotals
                this.images = this.cart.images
                this.total = this.cart.total

                if(this.renderCart()) {
                    
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: '<h6 class="medium-text fw-bold">Error loading saved cart.</h6>'
                    })
                }
            }
        }

        renderCart() {
            let res = true
            $('#cart-space').html('').append(
                `<div class="row" id="no-items">
                    <div class="col d-flex justify-content-center align-items-center">
                        <div class="container text-center py-5 my-5">
                            <h6 class="small-text">No items on cart.</h6>
                        </div>
                    </div>
                </div>`
            );
            
            for(let x = 0; x < this.ids.length; x++) {
                let subtotal = this.prices[x] * this.quantities[x]
                
                    $('#cart-space').append(
                        `<div class="cart-item row mb-2" id="cart-item-${this.ids[x]}">
                            <div class="col-auto cart-item">
                                <img class="product-image-cart rounded object-fit-cover" src="${this.images[x]}">
                            </div>
                            <div class="col cart-item">
                                <h6 class="mb-1 small-text">${this.names[x]}</h6>
                                <input id="cart-unitprice-${this.ids[x]}" type="number" value="${this.prices[x]}" class="d-none">
                                <h6 id="cart-subtotal-${this.ids[x]}" class="mb-1 medium-text fw-bold price">PHP ${subtotal.toLocaleString('en-US')}</h6>
                                <div class="container px-0 mb-2">
                                    <div class="col-6 col-md-9 col-lg-7">
                                        <div class="input-group">
                                            <button type="button" name="${this.ids[x]}" class="cart-minus-one btn btn-md small-text text-light fw-bold bg-secondary">-</button>
                                            <input id="cart-quantity-${this.ids[x]}" type="number" value="${this.quantities[x]}" class="form-control small-text text-center" min="1" max="${this.stocks[x]}" required>
                                            <button type="button" name="${this.ids[x]}" class="cart-plus-one btn btn-md small-text text-light fw-bold bg-secondary">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" name="${this.ids[x]}" class="remove-item btn btn-md small-text bg-danger text-light"><i class="bi bi-trash"></i>&nbsp;&nbsp;Remove</button>
                            </div>
                        </div>`
                    );
            }
            return res
        }

        itemCount() {
            return this.count
        }

        totalPrice() {
            return this.total.toLocaleString('en-US')
        }

        showTable(spmatrix) {
            console.log(spmatrix)
            this.shipping = 0
            let base = parseFloat(spmatrix.base)
            let quantity_limit = parseInt(spmatrix.quantity_limit)
            let item_count_limit = parseInt(spmatrix.item_count_limit)
            let increase = parseFloat(spmatrix.increase)

            this.shipping += base

            if(quantity_limit == 0 && item_count_limit != 0){
                if(parseInt(this.count/item_count_limit) >= 1){
                    this.shipping += increase*parseInt(this.count/item_count_limit)
                }
            } else if(quantity_limit != 0 && item_count_limit == 0){
                if(parseInt(this.count/quantity_limit) >= 1){
                    this.shipping += increase*parseInt(this.count/quantity_limit)
                }
            }

        let html = `
            <table class="table table-striped table-hover text-m">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>`
                    for(let x = 0; x < cart.ids.length; x++) {
                        html +=
                            `<tr>
                                <td>${cart.names[x]}</td>
                                <td>${cart.quantities[x]}</td>
                                <td>${cart.subtotals[x].toLocaleString('en-US')}</td>
                            </tr>`
                    }
                    html +=
                            `</tbody>
                        </table>
                        <div class="row">
                            <div class="container text-start">
                                <div class="row align-items-center mb-2">
                                    <div class="col-auto">
                                        <i class="bi bi-credit-card-fill text-xxl"></i>
                                    </div>
                                    <div class="col">
                                        <h6 class="text-l fw-bold mb-0">Payment</h6>
                                    </div>
                                </div>
                                <p class="text-sm mb-2">Payment-related options.</p>
                                <p class="text-sm mb-0">Choose a discount amount below, or use a custom one.</p>
                                <div class="input-group mb-2">
                                    <select id="predefined-discount" class="form-select text-m">
                                        <option value="0">0</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="150">150</option>
                                        <option value="200">200</option>
                                        <option value="250">250</option>
                                        <option value="500">500</option>
                                    </select>
                                    <input type="number" min="1" id="custom-discount" class="form-control text-m" placeholder="Custom Discount">
                                </div>
                                <p class="text-sm mb-0">Enter the cash amount given by the customer.</p>
                                <div class="input-group mb-2">
                                    <input type="number" id="cash-amount" class="form-control text-m mb-2" min="0" placeholder="Cash Amount">
                                    <input type="text" id="customer-change" class="form-control text-m mb-2" value="" placeholder="Customer change" disabled>
                                </div>
                                <p class="text-sm mb-0">If the amount is paid using GCash QR code on cashier counter. If not, leave it blank.</p>
                                <input type="text" id="gcashrefnum" class="form-control text-m mb-2" placeholder="GCash Reference Number">
                            </div>
                        </div>
                        <div class="row">
                            <div class="container text-start">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <i class="bi bi-truck text-xxl"></i>
                                    </div>
                                    <div class="col-auto">
                                        <h6 class="text-l mb-0 fw-bold">Shipping</h6>
                                    </div>
                                </div>
                                <p class="text-sm mb-1">Check below to fill in delivery details.</p>
                                <div class="form-check mb-3">
                                    <input type="checkbox" id="shipq" class="form-check-input">
                                    <label class="form-check-label text-m" for="shipq">Ship this order</label>
                                </div>
                                <div class="row delivery-details">
                                    <div class="container">
                                        <p class="text-sm mb-0">Enter recepient's name below.</p>
                                        <input type="text" id="customer-name" class="form-control text-m mb-2" placeholder="First Name Last Name">
                                        <p class="text-sm mb-0">Enter recepient's address below.</p>
                                        <input type="text" id="shipping-address" class="form-control text-m mb-2" value="House No./Block/Lot Street Barangay San Jose del Monte, Bulacan">
                                        <p class="text-sm mb-0">Calculated shipping fee, or input a custom one.</p>
                                        <div class="input-group mb-2">
                                            <input type="number" min="1" id="auto-shipping-fee" class="form-control text-m" value="${this.shipping}" disabled>
                                            <input type="number" min="0" id="manual-shipping-fee" class="form-control text-m" placeholder="Custom Shipping Fee">
                                        </div>
                                        <p class="text-sm mb-0">Set delivery date for this order's shipment.</p>
                                        <input type="date" id="delivery-date" class="form-control text-m" placeholder="Set Delivery Date">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                
            return html
        }
    }

    var cart = new Cart('test_user')
    var spmatrix = {}
    
            $.ajax({
                url: '/controller/handler.php',
                type: 'post',
                dataType: 'json',
                cache: false,
                data: { request: JSON.stringify({ 'type': 'shipping-info' }) },
                success: function(response){
                    if(response.success == true){
                        spmatrix = response
    
                        //cart.shipping += base
    
                        // if(quantity_limit == 0 && item_count_limit != 0){
                        //     if(parseInt(cart.count/item_count_limit) >= 1){
                        //         cart.shipping += increase*parseInt(cart.count/item_count_limit)
                        //     }
                        // } else if(quantity_limit != 0 && item_count_limit == 0){
                        //     if(parseInt(cart.count/quantity_limit) >= 1){
                        //         cart.shipping += increase*parseInt(cart.count/quantity_limit)
                        //     }
                        // }
                    } else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Failed to get shipping fee from the server'
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

    databaseFetch();
    $('#search-results').hide()

    $('#search-bar').on('keyup', function(){
        if($(this).val() == ''){
            $('#search-results').fadeIn().html(spinnergrow)
        }
    })

    $('body').on('click', '.print-receipt', function(){
        const doc = new jsPDF('p', 'mm', [100, 57])

        // var qrcode = new QRCode(qrDiv = document.querySelector("#print-pdfs-qr"), {
        //     text: transactResponse.transaction_id,
        //     width: 200,
        //     height: 200,
        //     colorDark : "#000000",
        //     colorLight : "#ffffff",
        //     correctLevel : QRCode.CorrectLevel.M
        // });
    
        // var qrSrc = qrDiv.children[0].toDataURL("image/png")

        if(for_receipt.discount == NaN){
            for_receipt.discount = 0
        }
        if(for_receipt.shipping == NaN){
            for_receipt.shipping = 0
        }
        if(for_receipt.address == '' || for_receipt.address == null){
            for_receipt.address = '[Not For Delivery]'
        }

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
        doc.text($('#acc_type').val() + ': ' + $('#acc_name').val(), 38, 20, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(6);
        doc.text(CurrentDatetimeShort(), 26, 22, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(6);
        doc.text(''+transactResponse.transaction_id, 33, 25, 'right')

        y=28;
        x=28;
        z=28;

        doc.setFont('Courier', 'bold');
        doc.setFontSize(7);
        doc.text('ITEMS PURCHASED | QTY | PRICE', 28, 28, 'center')

        for(i = 0; i < for_receipt.names.length; i++){
            doc.setFont('Courier', 'normal');
            doc.setFontSize(5.5);
            doc.text(for_receipt.names[i], 28, y+=2.5, 'right')

            doc.setFont('Courier', 'normal');
            doc.setFontSize(5.5);
            doc.text('x' + for_receipt.quantities[i], 37, x+=2.5, 'right')

            doc.setFont('Courier', 'normal');
            doc.setFontSize(5.5);
            doc.text(for_receipt.subtotals[i].toLocaleString('en-US'), 50, z+=2.5, 'right')
        }
        
        doc.setLineWidth(0.10); 
        doc.line(6.75, z+1.25, 50, z+1.25);

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('SUBTOTAL', 8, y+=2.5+1)


        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text(for_receipt.total.toLocaleString('en-US'), 50, z+=2.5+1, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('DISCOUNT', 8, y+=2.5)

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('- ' + for_receipt.discount, 50, z+=2.5, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('SHIPPING', 8, y+=2.5)

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('+ ' + for_receipt.shipping, 50, z+=2.5, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('GRAND TOTAL', 8, y+=2.5)

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text(for_receipt.finaltotal.toLocaleString('en-US'), 50, z+=2.5, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('CHANGE', 8, y+=2.5)

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text(for_receipt.change.toLocaleString('en-US'), 50, z+=2.5, 'right')

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text('SHIP TO', 8, y+=2.5)

        doc.setFont('Courier', 'bold');
        doc.setFontSize(5.5);
        doc.text(for_receipt.address.substr(0, 35), 50, z+=5.5, 'right')
        doc.text(for_receipt.address.substr(36), 50, z+=6.5, 'right')

        //doc.addImage(qrSrc, 'PNG', 19.5, x+30, 17.5, 17.5);

        //doc.save('receipt_' + transactResponse.transaction_id + '.pdf')
        window.open(doc.output('bloburi', 'receipt_' + transactResponse.transaction_id), '_blank')
    })

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

    $('.pay').on('click', function(){
        $(document).attr('title', 'Confirm Purchase');
        Swal.fire({
            icon: 'info',
            width: 900,
            title: `<h6 class="text-xxl fw-bold" id="finaltotal">To Pay : PHP ${cart.total.toLocaleString('en-US')}</h6>`,
            html: cart.showTable(spmatrix),
            allowOutsideClick: false,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            reverseButtons: true,
            cancelButtonText:
                '<i class="bi bi-x"></i> Cancel',
            cancelButtonAriaLabel: 'Thumbs down',
            confirmButtonText:
                '<i class="bi bi-check"></i> Save Transaction',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            preConfirm: () => {
                const cash = $('#cash-amount').val()
                const name = $('#customer-name').val()
                //const address = $('#shipping-address').va()
                const date = $('#delivery-date').val()
                if (!cash) {
                    Swal.showValidationMessage(`Please enter cash amount to compute change.`)
                }
                if($('#shipq').prop('checked')){
                    if(!name){
                        Swal.showValidationMessage(`Please enter customer name.`)
                    }
                    // if(!address){
                    //     Swal.showValidationMessage(`Please enter shipping address.`)
                    // }
                    if(!date){
                        Swal.showValidationMessage(`Please enter delivery date.`)
                    }
                }
            }
            }).then((result) => {  
            if (result.isConfirmed) {
                if($('#shipq').prop('checked')){
                    if($('#manual-shipping-fee').val() != ''){
                        cart.shipping = parseFloat($('#manual-shipping').val())
                    } else {
                        if($('#auto-shipping-fee').val() != ''){
                            cart.shipping = parseFloat($('#auto-shipping-fee').val())
                        } else {
                            cart.shipping = 0
                        }
                    }
                    cart.address = $('#shipping-address').val().trim()
                    if($('#customer-name').val() == ''){
                        cart.customer = 'N/A'
                    } else {
                        cart.customer = $('#customer-name').val().trim()
                    }
                    cart.delivery_date = $('#delivery-date').val().trim()
                } else {
                    cart.shipping = 0
                    cart.address = ''
                    cart.delivery_date = ''
                }
                if($('#gcashrefnum').val() == ''){
                    cart.gcashrefnum = 'N/A'
                } else {
                    cart.gcashrefnum = $('#gcashrefnum').val()
                }
                cart.cash = parseFloat($('#cash-amount').val())
                if($('#custom-discount').val() != ''){
                    cart.discount = parseFloat($('#custom-discount').val())
                } else {
                    if($('#predefined-discount').val() != ''){
                        cart.discount = parseFloat($('#predefined-discount').val())
                    } else {
                        cart.discount = 0
                    }
                }
                cart.sendCart()
                databaseFetch()
                cart.clearCart()
                $(document).attr('title', 'Merchandise')
            }
        })

        $('.delivery-details').hide()
    });

    $('body').on('click', '#shipq', function(){
        let pref = $('#predefined-discount').val()
        let cus = $('#custom-discount').val()
        let temp_total = parseFloat(cart.total)

        
        if(cus != ''){
            temp_total -= parseFloat(cus)
        } else {
            if(pref != ''){
                temp_total -= parseFloat(pref)
            }
        }

        if($(this).prop('checked')){
            $('.delivery-details').hide().fadeIn()
            if($('#auto-shipping-fee').val() != ''){
                let shipping = parseFloat($('#auto-shipping-fee').val())
                $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            }
            if($('#manual-shipping-fee').val() != ''){
                let shipping = parseFloat($('#manual-shipping-fee').val())
                $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            }
        } else {
            $('.delivery-details').hide()
            if((temp_total) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total)).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
            $('#finaltotal').html('To Pay : PHP '+temp_total.toLocaleString('en-US'))
        }
    })

    $('body').on('change', '#predefined-discount', function(){
        let prefval = parseFloat($(this).val())
        console.log(prefval)
        let autos = $('#auto-shipping-fee').val()
        let mans = $('#manual-shipping-fee').val()
        let temp_total = parseFloat(cart.total)
        console.log(temp_total-prefval)

        if($('#shipq').prop('checked')){
            if(mans != ''){
                temp_total += parseFloat(mans)
            } else {
                if(autos != ''){
                    temp_total += parseFloat(autos)
                }
            }
        }
        
        if($('#custom-discount').val() != ''){
            $('#finaltotal').html('To Pay : PHP '+(temp_total-parseFloat($('#custom-discount').val())).toLocaleString('en-US'))
            if((temp_total-parseFloat($('#custom-discount').val())) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-parseFloat($('#custom-discount').val()))).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        } else {
            $('#finaltotal').html('To Pay : PHP '+parseFloat(temp_total-prefval).toLocaleString('en-US'))
            if((temp_total-prefval) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-prefval)).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        }
    })

    $('body').on('change', '#custom-discount', function(){
        let autos = $('#auto-shipping-fee').val()
        let mans = $('#manual-shipping-fee').val()
        let temp_total = parseFloat(cart.total)

        if($('#shipq').prop('checked')){
            if(mans != ''){
                temp_total += parseFloat(mans)
            } else {
                if(autos != ''){
                    temp_total += parseFloat(autos)
                }
            }
        }
        
        if($('#custom-discount').val() != ''){
            $('#finaltotal').html('To Pay : PHP '+(temp_total-parseFloat($(this).val())).toLocaleString('en-US'))
            if((temp_total-parseFloat($(this).val())) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-parseFloat($(this).val()))).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        } else {
            $('#finaltotal').html('To Pay : PHP '+(temp_total-parseFloat($('#predefined-discount').val())).toLocaleString('en-US'))
            if((temp_total-parseFloat($('#predefined-discount').val())) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-parseFloat($('#predefined-discount').val()))).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        }
    })

    $('body').on('keyup', '#custom-discount', function(){
        let autos = $('#auto-shipping-fee').val()
        let mans = $('#manual-shipping-fee').val()
        let temp_total = parseFloat(cart.total)

        if($('#shipq').prop('checked')){
            if(mans != ''){
                temp_total += parseFloat(mans)
            } else {
                if(autos != ''){
                    temp_total += parseFloat(autos)
                }
            }
        }
        
        if($('#custom-discount').val() != ''){
            $('#finaltotal').html('To Pay : PHP '+(temp_total-parseFloat($(this).val())).toLocaleString('en-US'))
            if((temp_total-parseFloat($(this).val())) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-parseFloat($(this).val()))).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        } else {
            $('#finaltotal').html('To Pay : PHP '+(temp_total-parseFloat($('#predefined-discount').val())).toLocaleString('en-US'))
            if((temp_total-parseFloat($('#predefined-discount').val())) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total-parseFloat($('#predefined-discount').val()))).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        }
    })

    $('body').on('change', '#manual-shipping-fee', function(){
        let pref = $('#predefined-discount').val()
        let cus = $('#custom-discount').val()
        let temp_total = parseFloat(cart.total)

        
        if(cus != ''){
            temp_total -= parseFloat(cus)
        } else {
            if(pref != ''){
                temp_total -= parseFloat(pref)
            }
        }

        if($('#manual-shipping-fee').val() != ''){
            let shipping = parseFloat($('#manual-shipping-fee').val())
            $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
            if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        } else {
            if($('#auto-shipping-fee').val() != ''){
                let shipping = parseFloat($('#auto-shipping-fee').val())
                $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            } else {
                $('.delivery-details').hide()
                $('#finaltotal').html('To Pay : PHP '+temp_total.toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            }
        }
    })

    $('body').on('keyup', '#manual-shipping-fee', function(){
        let pref = $('#predefined-discount').val()
        let cus = $('#custom-discount').val()
        let temp_total = parseFloat(cart.total)

        
        if(cus != ''){
            temp_total -= parseFloat(cus)
        } else {
            if(pref != ''){
                temp_total -= parseFloat(pref)
            }
        }

        if($('#manual-shipping-fee').val() != ''){
            let shipping = parseFloat($('#manual-shipping-fee').val())
            $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
            if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount')
            }
        } else {
            if($('#auto-shipping-fee').val() != ''){
                let shipping = parseFloat($('#auto-shipping-fee').val())
                $('#finaltotal').html('To Pay : PHP '+(temp_total+shipping).toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total+shipping)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            } else {
                $('.delivery-details').hide()
                $('#finaltotal').html('To Pay : PHP '+temp_total.toLocaleString('en-US'))
                if((temp_total+shipping) <= parseFloat($('#cash-amount').val())){
                    $('#customer-change').val('PHP '+(parseFloat($('#cash-amount').val())-(temp_total)).toLocaleString('en-US'))
                } else {
                    $('#customer-change').val('Not enough amount')
                }
            }
        }
    })

    $('body').on('keyup', '#cash-amount', function(){
        let temp_total = parseFloat(cart.total)
        let pref = $('#predefined-discount').val()
        let cus = $('#custom-discount').val()
        
        if(cus != ''){
            temp_total -= parseFloat(cus)
        } else {
            if(pref != ''){
                temp_total -= parseFloat(pref)
            }
        }

        let autos = $('#auto-shipping-fee').val()
        let mans = $('#manual-shipping-fee').val()

        if($('#shipq').prop('checked')){
            if(mans != ''){
                temp_total += parseFloat(mans)
            } else {
                if(autos != ''){
                    temp_total += parseFloat(autos)
                }
            }
        }

        if($(this).val() != ''){
            let cash = parseFloat($(this).val())

            if(cash >= temp_total){
                $('#customer-change').val('PHP '+(cash-temp_total).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount.')
            }
        } else {
            $('#customer-change').val('')
        }
    })

    $('body').on('change', '#cash-amount', function(){
        let temp_total = parseFloat(cart.total)
        let pref = $('#predefined-discount').val()
        let cus = $('#custom-discount').val()
        
        if(cus != ''){
            temp_total -= parseFloat(cus)
        } else {
            if(pref != ''){
                temp_total -= parseFloat(pref)
            }
        }

        let autos = $('#auto-shipping-fee').val()
        let mans = $('#manual-shipping-fee').val()

        if($('#shipq').prop('checked')){
            if(mans != ''){
                temp_total += parseFloat(mans)
            } else {
                if(autos != ''){
                    temp_total += parseFloat(autos)
                }
            }
        }

        if($(this).val() != ''){
            let cash = parseFloat($(this).val())

            if(cash >= temp_total){
                $('#customer-change').val('PHP '+(cash-temp_total).toLocaleString('en-US'))
            } else {
                $('#customer-change').val('Not enough amount.')
            }
        } else {
            $('#customer-change').val('')
        }
    })

    function success_reload(){
        $.ajax({
            url: '/controller/merchandise.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'key' : 1 }) },
            beforeSend() {
                $('#product-display').html(productsPlaceholder + productsPlaceholder);
            },
            success: function(response) {
                databaseInfo = response
            }
        });
    }

    // $('body').on('keyup', '#shipping-address', function(){
    //     if($(this).val().length < 6) {
    //         $('button.swal2-confirm').attr('disabled', true)
    //     } else {
    //         $('button.swal2-confirm').attr('disabled', false)
    //     }
    // });

    // $('body').on('keyup', '#discount', function(){
    //     let finaltotal = cart.total
    //     if($('#shipping-fee').val() != '') {
    //         finaltotal += parseFloat($('#shipping-fee').val())
    //     }
    //     if($(this).val() != '') {
    //         finaltotal -= parseFloat($(this).val())
    //     }
    //     if(parseFloat($('#confirm-cash').val()) >= finaltotal) {
    //         $('#confirm-change').val('Change : PHP ' + (parseFloat($('#confirm-cash').val()) - finaltotal).toLocaleString('en-US'))
    //     } else {
    //         $('#confirm-change').val('Not enough amount')
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    // });

    // $('body').on('change', '#discount', function(){
    //     let finaltotal = cart.total
    //     if($('#shipping-fee').val() != '') {
    //         finaltotal += parseFloat($('#shipping-fee').val())
    //     }
    //     if($(this).val() != '') {
    //         finaltotal -= parseFloat($(this).val())
    //     }
    //     if(parseFloat($('#confirm-cash').val()) >= finaltotal) {
    //         $('#confirm-change').val('Change : PHP ' + (parseFloat($('#confirm-cash').val()) - finaltotal).toLocaleString('en-US'))
    //     } else {
    //         $('#confirm-change').val('Not enough amount')
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    // });

    // $('body').on('keyup', '#shipping-fee', function(){
    //     let finaltotal = cart.total
    //     if($('#discount').val() != '') {
    //         finaltotal -= parseFloat($('#discount').val())
    //     }
    //     if($(this).val() != '') {
    //         finaltotal += parseFloat($(this).val())
    //         $('#shipping-address').attr('disabled', false)
    //         $('button.swal2-confirm').attr('disabled', true)
    //     } else {
    //         $('#shipping-address').attr('disabled', true)
    //         $('button.swal2-confirm').attr('disabled', false)
    //     }
    //     if(parseFloat($('#confirm-cash').val()) >= finaltotal) {
    //         $('#confirm-change').val('Change : PHP ' + (parseFloat($('#confirm-cash').val()) - finaltotal).toLocaleString('en-US'))
    //     } else {
    //         $('#confirm-change').val('Not enough amount')
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    // });

    // $('body').on('change', '#shipping-fee', function(){
    //     let finaltotal = cart.total
    //     if($('#discount').val() != '') {
    //         finaltotal -= parseFloat($('#discount').val())
    //     }
    //     if($(this).val() != '') {
    //         finaltotal += parseFloat($(this).val())
    //         $('#shipping-address').attr('disabled', false)
    //         $('button.swal2-confirm').attr('disabled', true)
    //     } else {
    //         $('#shipping-address').attr('disabled', true)
    //         $('button.swal2-confirm').attr('disabled', false)
    //     }
    //     if(parseFloat($('#confirm-cash').val()) >= finaltotal) {
    //         $('#confirm-change').val('Change : PHP ' + (parseFloat($('#confirm-cash').val()) - finaltotal).toLocaleString('en-US'))
    //     } else {
    //         $('#confirm-change').val('Not enough amount')
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    // });

    // $('body').on('keyup', '#confirm-cash', function(){
    //     let finaltotal = cart.total
    //     if($('#shipping-fee').val() != '') {
    //         finaltotal += parseFloat($('#shipping-fee').val())
    //     }
    //     if($('#discount').val() != '') {
    //         finaltotal -= parseFloat($('#discount').val())
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    //     if($(this).val() != '') {
    //         if(parseFloat($(this).val()) >= finaltotal) {
    //             $('#confirm-change').val('Change : PHP ' + (parseFloat($(this).val()) - finaltotal).toLocaleString('en-US'))
    //             $('button.swal2-confirm').attr('disabled', false)
    //             $('#shipping-fee').attr('disabled', false)
    //             $('#discount').attr('disabled', false)
    //         } else {
    //             $('#confirm-change').val('Not enough amount')
    //             $('button.swal2-confirm').attr('disabled', true)
    //             $('#shipping-fee').attr('disabled', true)
    //             $('#discount').attr('disabled', true)
    //         }
    //     } else {
    //         $('#confirm-change').val('Change : ')
    //         $('button.swal2-confirm').attr('disabled', true)
    //         $('#shipping-fee').attr('disabled', true)
    //         $('#discount').attr('disabled', true)
    //     }
    // });

    // $('body').on('change', '#confirm-cash', function(){
    //     let finaltotal = cart.total
    //     if($('#shipping-fee').val() != '') {
    //         finaltotal += parseFloat($('#shipping-fee').val())
    //     }
    //     if($('#discount').val() != '') {
    //         finaltotal -= parseFloat($('#discount').val())
    //     }
    //     $('#final-total').val('TOTAL : PHP ' + finaltotal.toLocaleString('en-US'))
    //     if($(this).val() != '') {
    //         if(parseFloat($(this).val()) >= finaltotal) {
    //             $('#confirm-change').val('Change : PHP ' + (parseFloat($(this).val()) - finaltotal).toLocaleString('en-US'))
    //             $('button.swal2-confirm').attr('disabled', false)
    //             $('#shipping-fee').attr('disabled', false)
    //             $('#discount').attr('disabled', false)
    //         } else {
    //             $('#confirm-change').val('Not enough amount')
    //             $('button.swal2-confirm').attr('disabled', true)
    //             $('#shipping-fee').attr('disabled', true)
    //             $('#discount').attr('disabled', true)
    //         }
    //     } else {
    //         $('#confirm-change').val('Change : ')
    //         $('button.swal2-confirm').attr('disabled', true)
    //         $('#shipping-fee').attr('disabled', true)
    //         $('#discount').attr('disabled', true)
    //     }
    // });
    
    $('.clear').on('click', function(){
        cart.clearCart()
        $('#cart-space').html('').append(
            `<div class="row" id="no-items">
                <div class="col d-flex justify-content-center align-items-center">
                    <div class="container text-center py-5 my-5">
                        <h6 class="small-text">No items on cart.</h6>
                    </div>
                </div>
            </div>`
        );
        $('#cart-item-count').html(cart.itemCount());
        $('#total-price').html(cart.totalPrice());
        $('.pay').attr('disabled', true);
        $('.clear').attr('disabled', true);
        if(cart.itemCount() > 0) {
            $('.pay').attr('disabled', false);
            $('.clear').attr('disabled', false);
            $('#no-items').hide();
        }
    });

    $('#search-btn').on('click', function(){
        if($('#search-bar').val() != ''){
            $('#search-results').fadeIn()
            searchProduct();
        } else {
            Toast.fire({
                icon: 'error',
                title: '<h6 class="medium-text fw-bold">Search bar empty.</h6>'
            })
        }
    });

    $('#search-bar').on('blur', function(){
        $(document).attr('title', 'Merchandise');
        if($(this).val() == ''){
            $('#search-results').hide()
        }
    });

    $('#search-bar').on('focus', function(){
        $(document).attr('title', 'Search for Products');
        $('#search-results').fadeIn().html(spinnergrow)
    });

    $('body').on('click', '.view-item-info', function(){
        var id = $(this).attr('name');
        openProductModal(id);
    });

    $('body').on('change', '#categories', function() {
        $('#product-display').html('');
        $('#product-display').html(showProducts($('#categories').val()));
    });

    $('#reload-products').on('click', function(){
        databaseFetch();
    });

    $('body').on('click', 'button.swal2-close', function(){
        $(document).attr('title', 'Merchandise');
    });
    $('body').on('click', 'button.swal2-cancel', function(){
        $(document).attr('title', 'Merchandise');
    });

    let hidden = false;
    $('#expand-products').on('click', function(){
        if(hidden == false) {
            $('.stats').fadeOut();
            $('div.container.mobile').fadeOut();
            hidden = true;
        } else {
            $('.stats').fadeIn();
            $('div.container.mobile').fadeIn();
            hidden = false;
        }
    });

    $('body').on('click', '.add-item', 'click', function(){
        let id = $(this).attr('name');
        for(let i = 0; i < databaseInfo.id.length; i++) {
            if(id == databaseInfo.id[i]) {
                if(document.getElementById("cart-item-"+databaseInfo.id[i])) {
                    Toast.fire({
                        icon: 'error',
                        title: '<h6 class="medium-text fw-bold">Item already on cart.</h6>'
                    })
                } else {
                    addToCart(databaseInfo.id[i], databaseInfo.name[i], databaseInfo.price[i], 1, databaseInfo.stock[i], databaseInfo.image[i]);
                }
            }
        }
    });

    $('body').on('click', '.remove-item', function(){
        let id = $(this).attr('name');
        removeItem(id);
    });

    $('body').on('keyup', '.modal-quantity', function(){
        var currentQty = parseInt($(this).val());
        var maxQty = parseInt($(this).attr('max'));

        if($(this).val() != '') {
            $('button.swal2-confirm').attr('disabled', false);

            if(currentQty > maxQty) {
                $(this).val(maxQty);
            } else if(currentQty < 1) {
                $(this).val(1);
            } else {
                $(this).val(currentQty);
            }
        } else {
            $('button.swal2-confirm').attr('disabled', true);
        }
    });

    $('body').on('change', '.modal-quantity', function(){
        var currentQty = parseInt($(this).val());
        var maxQty = parseInt($(this).attr('max'));

        if($('.modal-quantity').val() == '') {
            $('.modal-minus-one').attr('disabled', true);
            $('.modal-plus-one').attr('disabled', true);
            $('button.swal2-confirm').attr('disabled', true);
        } else {
            $('button.swal2-confirm').attr('disabled', false);
            if(currentQty < 1) {
                $(this).val(1);
                $('.modal-minus-one').attr('disabled', true);
                $('.modal-plus-one').attr('disabled', false);
            } else if(currentQty == 1) {
                $('.modal-minus-one').attr('disabled', true);
                $('.modal-plus-one').attr('disabled', false);
            } else if((currentQty > 1) || (currentQty < maxQty)) {
                $('.modal-minus-one').attr('disabled', false);
                $('.modal-plus-one').attr('disabled', false);
            } else if(currentQty == maxQty) {
                $('.modal-minus-one').attr('disabled', false);
                $('.modal-plus-one').attr('disabled', true);
            } else if(currentQty > maxQty) {
                $(this).val(maxQty)
                $('.modal-minus-one').attr('disabled', false);
                $('.modal-plus-one').attr('disabled', true);
            }
        }
    });

    $('body').on('click', '.modal-minus-one', function(){
        var currentQty = parseInt($('.modal-quantity').val());
        
        if($('.modal-quantity').val() == '') {
            $(this).attr('disabled', true);
            $('button.swal2-confirm').attr('disabled', true);
        } else {
            $('button.swal2-confirm').attr('disabled', false);
            if(currentQty == 1) {
                $(this).attr('disabled', true);
            } else {
                $(this).attr('disabled', false);
                currentQty--;
                $('.modal-quantity').val(currentQty);
                $('.modal-plus-one').attr('disabled', false);
            }
        }
    });

    $('body').on('click', '.modal-plus-one', function(){
        var currentQty = parseInt($('.modal-quantity').val());
        var maxQty = parseInt($('.modal-quantity').attr('max'));
        
        if($('.modal-quantity').val() == '') {
            $(this).attr('disabled', true);
            $('button.swal2-confirm').attr('disabled', true);
        } else {
            $('button.swal2-confirm').attr('disabled', false);
            if(currentQty == maxQty) {
                $(this).attr('disabled', true);
            } else {
                $(this).attr('disabled', false);
                currentQty++;
                $('.modal-quantity').val(currentQty);
                $('.modal-minus-one').attr('disabled', false);
            }
        }
    });

    $('body').on('keyup', '.cart-quantity', function(){
        var id = $(this).attr('name');
        var currentQty = parseInt($(this).val());
        var maxQty = parseInt($(this).attr('max'));

        if($(this).val() != '') {
            if(currentQty > maxQty) {
                $(this).val(maxQty);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * maxQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, maxQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            } else if(currentQty < 1) {
                $(this).val(1);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * 1;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, 1, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            } else {
                $(this).val(currentQty);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * currentQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, currentQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            }
        }
    });

    $('body').on('change', '.cart-quantity', function(){
        var id = $(this).attr('name');
        var currentQty = parseInt($(this).val());
        var maxQty = parseInt($(this).attr('max'));

        if($(this).val() != '') {
            if(currentQty > maxQty) {
                $(this).val(maxQty);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * maxQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, maxQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            } else if(currentQty < 1) {
                $(this).val(1);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * 1;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, 1, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            } else {
                $(this).val(currentQty);
                let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * currentQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                cart.editQuantity(id, currentQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            }
        }
    });

    $('body').on('blur', '.cart-quantity', function(){
        var id = $(this).attr('name');
        var maxQty = parseInt($(this).attr('max'));

        if($(this).val() == '') {
            $(this).val(1);
            let subtotal = parseFloat($('#cart-unitprice-' + id).val()) * 1;
            $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
            $('.cart-minus-one').attr('disabled', true);
            $('.cart-plus-one').attr('disabled', false);
            cart.editQuantity(id, 1, maxQty, subtotal);
            $('#total-price').html(cart.totalPrice());
        }
    });

    $('body').on('click', '.cart-minus-one', function(){
        let id = $(this).attr('name');
        let currentQty = parseInt($('#cart-quantity-' + id).val());
        let maxQty = parseInt($('#cart-quantity-' + id).attr('max'));
        
        if($('#cart-quantity-' + id).val() == '') {
            $(this).attr('disabled', true);
        } else {
            if(currentQty == 1) {
                $(this).attr('disabled', true);
            } else {
                $(this).attr('disabled', false);
                currentQty--;
                $('#cart-quantity-' + id).val(currentQty);
                let unitprice = parseFloat($('#cart-unitprice-' + id).val());
                let subtotal = unitprice * currentQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                $('.cart-plus-one').attr('disabled', false);
                cart.editQuantity(id, currentQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            }
        }
    });

    $('body').on('click', '.cart-plus-one', function(){
        let id = $(this).attr('name');
        let currentQty = parseInt($('#cart-quantity-' + id).val());
        let maxQty = parseInt($('#cart-quantity-' + id).attr('max'));
        
        if($('#cart-quantity-' + id).val() == '') {
            $(this).attr('disabled', true);
        } else {
            if(currentQty == maxQty) {
                $(this).attr('disabled', true);
            } else {
                $(this).attr('disabled', false);
                currentQty++;
                $('#cart-quantity-' + id).val(currentQty);
                let unitprice = parseFloat($('#cart-unitprice-' + id).val());
                let subtotal = unitprice * currentQty;
                $('#cart-subtotal-' + id).html('PHP ' + subtotal.toLocaleString('en-US'));
                $('.cart-minus-one').attr('disabled', false);
                cart.editQuantity(id, currentQty, maxQty, subtotal);
                $('#total-price').html(cart.totalPrice());
            }
        }
    });

    function databaseFetch() {
        $.ajax({
            url: '/controller/merchandise.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { request: JSON.stringify({ 'key' : 1 }) },
            beforeSend() {
                $('#product-display').html(productsPlaceholder + productsPlaceholder);
            },
            success: function(response) {
                databaseInfo = response;
                console.log(response.image[0])

                $('#categories').html(loadCategories());

                cart.loadSavedCart();

                let to_remove = []
                let updated = 0

                for(let x = 0; x < cart.ids.length; x++){
                    let res = false
                    for(let i = 0; i < databaseInfo.id.length; i++){
                        if(databaseInfo.id[i].includes(cart.ids[x]) == true){
                            res = true

                            if(cart.images[x] != databaseInfo.image[i][0]){
                                cart.images[x] != databaseInfo.image[i][0]
                            }

                            if(cart.names[x] != databaseInfo.name[i]){
                                cart.names[x] = databaseInfo.name[i]
                            }

                            if(cart.stocks[x] > databaseInfo.stock[i]){
                                cart.stocks[x] = databaseInfo.stock[i]

                                if(cart.quantities[x] > cart.stocks[x]){
                                    cart.quantities[x] = cart.stocks[x]
                                }
                            }

                            if(cart.prices[x] != databaseInfo.price[i]){
                                cart.prices[x] = databaseInfo.price[i]
                            }

                            cart.subtotals[x] = cart.quantities[x] * cart.prices[x]
                            updated += 1
                        }
                    }
                    if(res != true){
                        to_remove.push(cart.ids[x])
                    }
                }

                if(to_remove.length > 0){
                    for(let i = 0; i < to_remove.length; i++){
                        removeItem(to_remove[i])
                    }
                }

                cart.total = 0

                for(let i = 0; i < cart.ids.length; i++){
                    cart.total += parseFloat(cart.subtotals[i])
                }

                cart.saveCart()
                cart.renderCart()

                $('#cart-item-count').html(cart.itemCount());
                $('#total-price').html(cart.totalPrice());
                $('.pay').attr('disabled', true);
                $('.clear').attr('disabled', true);
                if(cart.itemCount() > 0) {
                    $('.pay').attr('disabled', false);
                    $('.clear').attr('disabled', false);
                    $('#no-items').hide();
                }

                if($('#categories').val() == null){
                    showProducts('ALL')
                } else {
                    showProducts($('#categories').val())
                }
            }
        });
    }

    function searchProduct() {
        $.ajax({
            url: '/controller/merchandise.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: { search: JSON.stringify({ 'word' : $('#search-bar').val().trim() }) },
            beforeSend() {
                $('#search-results').html(spinnergrow)
            },
            success: function(response) {
                if(response.success == true){
                    if(response.id[0] != null){
                        search = response

                        databaseFetch()
                    

                        print_search()
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: '<h6 class="medium-text fw-bold">No results found for : ' + $('#search-bar').val() + '</h6>'
                        })
                    }
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: '<h6 class="medium-text fw-bold">Something went wrong, please try again later.</h6>'
                    })
                }
            },
            error: function() {
                Toast.fire({
                    icon: 'error',
                    title: '<h6 class="medium-text fw-bold">Connection error.</h6>'
                })
            }
        });
    }

    $('body').on('click', '.search.page-link', function(){
        $('#search-results').html('<hr>')
        $('.page-' + $(this).attr('name')).clone().appendTo('#search-results')
        $('#search-results').append('<hr>')
    })

    function print_search(){
        $('#search-results').html('<hr>')

        let x = 0

        for(let i = 0; i < search.id.length; i++){
            if(i%3 == 0){
                x++
            }

            $('#search-results').append(`
                <div class="row result-${x} mb-3 align-items-center">
                    <div class="col-4 d-flex justify-content-center">
                        <img src="${search.image[i]}" class="product-image rounded object-fit-cover">
                    </div>
                    <div class="col">
                        <div class="container">
                            <h6>${search.name[i]}</h6>
                            <h5 class="text-danger fw-bold">PHP ${search.price[i].toLocaleString('en-US')}</h5>
                            <input type="text" class="form-control" value="Stock : ${search.stock[i]}" disabled>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="input-group d-flex justify-content-center align-items-center">
                            <button type="button" name="${search.id[i]}" class="add-item btn btn-md btn-primary">
                                Add
                            </button>
                            <button type="button" name="${search.id[i]}" class="view-item-info btn btn-md btn-secondary">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            `)
        }
    }

    function openProductModal(id) {
        for(let x = 0; x < databaseInfo.id.length; x++) {
            if(id == databaseInfo.id[x]) {
                $(document).attr('title', 'Viewing : ' + databaseInfo.name[x]);
                let price = parseFloat(databaseInfo.price[x]);
                
                    Swal.fire({
                        reverseButtons: true,
                        width: 900,
                        title: '<h6 class="text-xxl fw-bolder" id="modal-p-name">Viewing : ' + databaseInfo.name[x] + '</h6>',
                        html:
                            `<div class="row mb-3">
                                <div id="carouselExampleIndicators" class="carousel slide bg-secondary" data-bs-ride="true">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                    </div>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="${databaseInfo.image[x]}" class="d-block w-100" style="object-fit: contain; height: 350px;" alt="...">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${databaseInfo.slide1[x]}" class="d-block w-100" style="object-fit: contain; height: 350px;" alt="...">
                                        </div> 
                                        <div class="carousel-item">
                                            <img src="${databaseInfo.slide2[x]}" class="d-block w-100" style="object-fit: contain; height: 350px;" alt="...">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${databaseInfo.slide3[x]}" class="d-block w-100" style="object-fit: contain; height: 350px;" alt="...">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="container">
                                    <table class="table table-striped table-hover text-m">
                                        <tbody>
                                            <tr>
                                                <td class="text-start"><b>Product Name : </b></td>
                                                <td class="text-start">${databaseInfo.name[x]}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Size / Color : </b></td>
                                                <td class="text-start">${databaseInfo.size_color[x]}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Unit Price : </b></td>
                                                <td class="text-start">${price.toLocaleString('en-US')}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Available Stock : </b></td>
                                                <td class="text-start">${databaseInfo.stock[x]}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Category : </b></td>
                                                <td class="text-start">${databaseInfo.category[x]}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Supplier : </b></td>
                                                <td class="text-start">${databaseInfo.supplier[x]}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-start"><b>Product Description : </b></td>
                                                <td class="text-start">${databaseInfo.description[x]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-5">
                                    <div class="input-group">
                                        <button type="button" class="modal-minus-one btn btn-md small-text text-light fw-bold bg-secondary">-</button>
                                        <input type="number" value="1" class="form-control small-text text-center modal-quantity" min="1" max="${databaseInfo.stock[x]}" required>
                                        <button type="button" class="modal-plus-one btn btn-md small-text text-light fw-bold bg-secondary">+</button>
                                    </div>
                                </div>
                            </div>`,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        cancelButtonText:
                          '<i class="bi bi-x"></i> Cancel',
                        cancelButtonAriaLabel: 'Thumbs down',
                        confirmButtonText:
                          '<i class="bi bi-check"></i> Add to cart',
                        confirmButtonAriaLabel: 'Thumbs up, great!'
                      }).then((result) => {
                        let quantity = parseInt($('.modal-quantity').val());
                        let maxqty = $('.modal-quantity').attr('max');    
                        
                        if (result.isConfirmed) {
                            if(document.getElementById('cart-item-'+databaseInfo.id[x])) {
                                Toast.fire({
                                    icon: 'error',
                                    title: '<h6 class="medium-text fw-bold">Item already on cart.</h6>'
                                })
                                $(document).attr('title', 'Merchandise');
                            } else {
                                addToCart(databaseInfo.id[x], databaseInfo.name[x], databaseInfo.price[x], quantity, maxqty, databaseInfo.image[0]);
                                $(document).attr('title', 'Merchandise');
                            }
                        }
                    })
                
            }
        }
    }

    function addToCart (id, name, price, quantity, stock, image) {
        let subtotal = parseFloat(price) * parseInt(quantity);
        
            $('#cart-space').append(
                `<div class="cart-item row mb-2" id="cart-item-${id}">
                    <div class="col-auto cart-item">
                        <img class="product-image-cart rounded object-fit-cover" src="${image}">
                    </div>
                    <div class="col cart-item">
                        <h6 class="mb-1 small-text">${name}</h6>
                        <input id="cart-unitprice-${id}" type="number" value="${price}" class="d-none">
                        <h6 id="cart-subtotal-${id}" class="mb-1 medium-text fw-bold price">PHP ${subtotal.toLocaleString('en-US')}</h6>
                        <div class="container px-0 mb-2">
                            <div class="col-6 col-md-9 col-lg-7">
                                <div class="input-group">
                                    <button type="button" name="${id}" class="cart-minus-one btn btn-md small-text text-light fw-bold bg-secondary">-</button>
                                    <input id="cart-quantity-${id}" name="${id}" type="number" value="${quantity}" class="cart-quantity form-control small-text text-center" min="1" max="${stock}" required>
                                    <button type="button" name="${id}" class="cart-plus-one btn btn-md small-text text-light fw-bold bg-secondary">+</button>
                                </div>
                            </div>
                        </div>
                        <button type="button" name="${id}" class="remove-item btn btn-md small-text bg-danger text-light"><i class="bi bi-trash"></i>&nbsp;&nbsp;Remove</button>
                    </div>
                </div>`
            );
            cart.addItem(id, name, price, quantity, stock, subtotal, image);
            $('#cart-item-count').html(cart.itemCount());
            $('#total-price').html(cart.totalPrice());
            if(cart.itemCount() > 0) {
                $('.pay').attr('disabled', false);
                $('.clear').attr('disabled', false);
                $('#no-items').hide();
            } else {
                $('.pay').attr('disabled', true);
                $('.clear').attr('disabled', true);
                $('#no-items').show();
            }
    }

    function removeItem(id) {
        $('#cart-item-' + id).remove();
        cart.removeItem(id)
        $('#cart-item-count').html(cart.itemCount());
        $('#total-price').html(cart.totalPrice());
        if(cart.itemCount() == 0) {
            $('.pay').attr('disabled', true);
            $('.clear').attr('disabled', true);
            $('#no-items').show();
        } else {
            $('.pay').attr('disabled', false);
            $('.clear').attr('disabled', false);
            $('#no-items').hide();
        }
    }

    function showProducts(filter) {
        $('#product-display').html('');

        if(filter == "ALL") {
            let x = 0;
            for(let i = 0; i < databaseInfo.id.length; i++) {
                let price = parseFloat(databaseInfo.price[i]);
                if(x == 0) {
                    $('#product-display').append('<div class="row new-row mb-3 align-items-center">');
                }

                $('.new-row').append(`
                    <div class="col-12 col-md-4 mb-2 py-md-2">
                        <div class="container">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-4 col-md-12 d-flex justify-content-center mb-3 align-items-center">
                                    <img class="product-image object-fit-cover view-item-info rounded mb-2" src="${databaseInfo.image[i]}">
                                </div>
                                <div class="col-8 col-md-12">
                                    <div class="row mb-2">
                                        <h6 class="fw-bold">${databaseInfo.name[i]}</h6>
                                        <h6 class="text-xsm fw-bold">${databaseInfo.size_color[i]}</h6>
                                        <h5 class="mb-1 text-danger fw-bold price">PHP ${price.toLocaleString('en-US')}</h5>
                                        <input type="text" class="form-control" value="Available Stock : ${databaseInfo.stock[i]}" disabled>
                                    </div>
                                    <div class="row mb-4">
                                        <div class="container">
                                            <div class="input-group d-flex justify-content-center align-items-center">
                                                <button type="button" name="${databaseInfo.id[i]}" class="add-item btn btn-md btn-primary fw-bold">
                                                    Add to cart
                                                </button>
                                                <button type="button" name="${databaseInfo.id[i]}" class="view-item-info btn btn-md btn-secondary fw-bold">
                                                    View info
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                if(x%3 == 0) {
                    $('.new-row').append('</div>');
                    x = 0;
                }
                x++;
            }
        } else {
            let x = 0;
            for(let i = 0; i < databaseInfo.id.length; i++) {
                if(filter == databaseInfo.category[i]) {
                    let price = parseFloat(databaseInfo.price[i]);
                    if(x == 0) {
                        $('#product-display').append('<div class="row new-row mb-2 align-items-center">');
                    }
                    
                    $('.new-row').append(`
                        <div class="col-12 col-md-4 mb-2">
                            <div class="container">
                                <div class="row">
                                    <div class="col-4 col-md-12">
                                        <img class="object-fit-cover mb-2 " src="${databaseInfo.image[i][0]}">
                                    </div>
                                    <div class="col-8 col-md-12">
                                        <h6 class="mb-1">${databaseInfo.name[i]}</h6>
                                        <h6 class="mb-1 text-danger fw-bold price">PHP ${price.toLocaleString('en-US')}</h6>
                                        <input type="text" class="form-control" value="${databaseInfo.stock[i]}" disabled>
                                        <button type="button" name="${databaseInfo.id[i]}" class="add-item btn btn-md btn-primary fw-bold m-1">
                                            Add to cart
                                        </button>
                                        <button type="button" name="${databaseInfo.id[i]}" class="view-item-info btn btn-md btn-secondary fw-bold m-1">
                                            View Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    if(x%3 == 0) {
                        $('.new-row').append('</div>');
                        x = 0;
                    }
                    x++;
                }
            }
        }
    }

    function loadCategories() {
        $('#categories').html('<option value="ALL">All</option>');
        for(let i = 0; i < databaseInfo.categories.length; i++) {
            $('#categories').append('<option value="' + databaseInfo.categories[i] + '">' + databaseInfo.categories[i] + '</option>');
        }
    }
})