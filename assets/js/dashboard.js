$(document).ready(function(){
    loadDashboard();
})

function loadDashboard(){
    $.ajax({
        url: "/controller/core-dashboard.php",
        method: "POST",
        data: {
            sessionID : $('#sessionID').val(),
        },
        success: function(response) {
            console.log(response)
            console.log($('#sessionID').val())
            dashboardJSON(response, true)
        }
    });
}

function dashboardJSON(response, anima){
    const pallete = ($('body').hasClass('dark') ? 'office.Expo6' : 'office.Exhibit6')
    const textcolor = ($('body').hasClass('dark') ? '#ffffff' : '#000000')
    const daily = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekly = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const monthly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    Chart.defaults.global.defaultFontColor = textcolor;


    try{
    const res = JSON.parse(response)
    console.log(response)

    var customers = $('#customers')
    var sales = $('#sales')
    var expenses = $('#expenses')
    var profits = $('#profits')
    var profitStatus = $('#profitStatus')
    var pie_employee = $('#TopEmployee')
    var pie_products = $('#TopProduct')
    var pie_category = $('#TopCategory')
    var list_employee = $('#TopEmployeeList')
    var list_products = $('#TopProductList')
    var list_category = $('#TopCategoryList')
    var dSales = $('#dSales')
    var daSales = $('#daSales')
    var wSales = $('#wSales')
    var waSales = $('#waSales')
    var mSales = $('#mSales')
    var maSales = $('#maSales')
    var chart1 = $('#YearlySales')
    var chart2 = $('#DailySales')
    var chart3 = $('#WeeklySales')

    $('#MWeek').text(monthly[0])
    $('#MDaily').text(weekly[0])

    $('#LYear').attr('title', 'Prev: 2021')
    $('#MYear').text('2022')
    $('#MYear').attr('title', 'Current: 2022')
    $('#RYear').attr('title', 'Next: 2023')

    a = 1;

    customer_text = (res.d_customers != 0 ? res.d_customers : '0')
    customers.text(customer_text)
    sales_text = (res.d_final_total != 0 ? res.d_final_total : '0.00')
    sales.text(sales_text)
    expenses_text = (res.d_discounts != 0 ? res.d_discounts : '0.00')
    expenses.text(expenses_text)
    profit_percentage = (a == 0 ? 'WALK-IN':'WALK-IN'+'')
    profitStatus.text(profit_percentage)
    profits_text = (a == 0 ? '0' : '0.00')
    profits.text(res.d_customers)
    

    dSales.text(res.d_daily != 0 ? res.d_daily : '0.00')
    wSales.text(res.d_final_total != 0 ? res.d_final_total : '0.00')
    mSales.text(res.d_final_total != 0 ? res.d_final_total : '0.00')



    if(a == 0){
        chart1.css('display', 'none')
        chart2.css('display', 'none')
        chart3.css('display', 'none')
    }else{
        chart1.removeClass('d-none')
        chart2.removeClass('d-none')
        chart3.removeClass('d-none')
        pie_products.removeClass('d-none')
        pie_category.removeClass('d-none')
        pie_employee.removeClass('d-none')
        $('.placeholder').css('display', 'none')
        $('.loading').css('display', 'none')
    }

    if(res.d_category != null){
        // dSales.empty()
        // daSales.empty()
        // wSales.empty()
        // waSales.empty()
        // mSales.empty()
        // maSales.empty()
    }

    if(res.d_product != null){
        list_products.empty()
        for(i = 1; i < 11; i++){
            product = (res.d_product[i-1] == null ? '-' : res.d_product[i-1]);
            list_products.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+product+`</div>
                </div>
            `)
        }
    }else{
        list_products.empty()
        for(i = 1; i < 11; i++){
            list_products.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
                </div>
            `)
        }
    }

    if(res.d_category != null){
        list_category.empty()
        for(i = 1; i < 11; i++){
            category = (res.d_category[i-1] == null ? '-' : res.d_category[i-1]);
            list_category.append(`
            <div class="row h6 text-uppercase">
                <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+category+`</div>
            </div>
            `)
        }
    }else{
        list_category.empty()
        for(i = 1; i < 11; i++){
            list_category.append(`
            <div class="row h6 text-uppercase">
                <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
            </div>
            `)
        }
    }

    if(res.d_price != null){
        list_employee.empty()
        for(i = 1; i < 11; i++){
            employee = (res.d_price[i-1] == null ? '-' : res.d_price[i-1]);
            list_employee.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+employee+`</div>
                </div>
            `)
        }
    }else{
        list_employee.empty()
        for(i = 1; i < 11; i++){
            list_employee.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
                </div>
            `)
        }
    }

    sales = [0,0,0,0,0,0,0,0,0,0,0,0]
    expenses = [0,0,0,0,0,0,0,0,0,0,0,0]
    profit = [sales[0]-expenses[0],sales[1]-expenses[1],sales[2]-expenses[2],sales[3]-expenses[3],sales[4]-expenses[4],sales[5]-expenses[5],sales[6]-expenses[6],sales[7]-expenses[7],sales[8]-expenses[8],sales[9]-expenses[9],sales[10]-expenses[10],sales[11]-expenses[11],]

    animationTrue = {},
    animationFalse = {
        duration: 0
    };

    animationBool = anima == true ? animationTrue : animationFalse

    lineOptions = {
        animation: animationBool,
        responsive: true,
        title: {
        display: true,
        text: '',
        },
        tooltips: {
        mode: 'label',
        },
        hover: {
        mode: 'nearest',
        intersect: true
        },
        plugins: {
            colorschemes: {
                scheme: pallete,
            },
        },
        layout: {
            padding: {
                top: -30
            }
        },
        scales: {
        xAxes: [{
            display: true,
            gridLines: {
            display: false,
            color: textcolor
            },
            scaleLabel: {
            display: false,
            labelString: 'Year -'
            }
        }],
        yAxes: [{
            display: true,
            gridLines: {
            display: false,
            color: textcolor
            },
            scaleLabel: {
            display: false,
            labelString: 'Value'
            },
        }]
        }
    };

    pieOptions = {
        animation: animationBool,
        responsive: true,
        plugins: {
            colorschemes: {
                scheme: pallete,
            },
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: textcolor,
            usePointStyle: false,
            boxWidth: 10,
            // fontStyle : 'bold'
          }
        },
    };

    var canvas1config = {
        type: 'line',
        data: {
            labels: monthly,
            datasets: [
            // {
            //     label: 'Sales',
            //     data: sales,
            //     fill: false,
            // }, {
            //     label: 'Expenses',
            //     fill: false,
            //     data: expenses,
            // },
            {
                label: 'Sales',
                fill: true,
                data: res.d_yearly,
            }
        ]
        },
        options: lineOptions,
    };

    var canvas2config = {
        type: 'bar',
        data: {
            labels: daily,
            datasets: [
                {
                    label: "Sales",
                    data: sales
                }
            ]
        },
        options: {
            animation: animationBool,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
              legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Week -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var canvas3config = {
        type: 'bar',
        data: {
            labels: weekly,
            datasets: [
                {
                    label: "Sales",
                    data: sales
                }
            ]
        },
        options: {
            animation: animationBool,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
              legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Month -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var TopProductConfig =  {
        type: 'pie',
        data: {
        labels: res.d_product,
        datasets: [
            {
            label: 'Top Products',
            data: res.d_quantity,
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };

    var TopCategoryConfig =  {
        type: 'pie',
        data: {
        labels: res.d_category,
        datasets: [
            {
            label: 'Top Category',
            data: res.d_count,
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };


    var TopEmployeeConfig =  {
        type: 'pie',
        data: {
        labels: (profit == 0 ? ['0'] : ['No Data']),
        datasets: [
            {
            label: 'Top Products',
            data: (profit == 0 ? ['0'] : [null]),
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };
    }catch{
    const res = JSON.parse(JSON.stringify(response))
    console.log(response)

    var customers = $('#customers')
    var sales = $('#sales')
    var expenses = $('#expenses')
    var profits = $('#profits')
    var profitStatus = $('#profitStatus')
    var pie_employee = $('#TopEmployee')
    var pie_products = $('#TopProduct')
    var pie_category = $('#TopCategory')
    var list_employee = $('#TopEmployeeList')
    var list_products = $('#TopProductList')
    var list_category = $('#TopCategoryList')
    var dSales = $('#dSales')
    var daSales = $('#daSales')
    var wSales = $('#wSales')
    var waSales = $('#waSales')
    var mSales = $('#mSales')
    var maSales = $('#maSales')
    var chart1 = $('#YearlySales')
    var chart2 = $('#DailySales')
    var chart3 = $('#WeeklySales')

    $('#MWeek').text(monthly[0])
    $('#MDaily').text(weekly[0])

    $('#LYear').attr('title', 'Prev: 2021')
    $('#MYear').text('2022')
    $('#MYear').attr('title', 'Current: 2022')
    $('#RYear').attr('title', 'Next: 2023')

    a = 1;

    customer_text = (res.d_customers != 0 ? res.d_customers : '0')
    customers.text(customer_text)
    sales_text = (res.d_final_total != 0 ? res.d_final_total : '0.00')
    sales.text(sales_text)
    expenses_text = (res.d_discounts != 0 ? res.d_discounts : '0.00')
    expenses.text(expenses_text)
    profit_percentage = (a == 0 ? 'WALK-IN':'WALK-IN'+'')
    profitStatus.text(profit_percentage)
    profits_text = (a == 0 ? '0' : '0.00')
    profits.text(res.d_customers)


    dSales.text(res.d_daily != '' ? res.d_daily : '0.00')
    wSales.text(res.d_final_total != 0 ? res.d_final_total : '0.00')
    mSales.text(res.d_final_total != '' ? res.d_final_total : '0.00')


    if(a == 0){
        chart1.css('display', 'none')
        chart2.css('display', 'none')
        chart3.css('display', 'none')
    }else{
        chart1.removeClass('d-none')
        chart2.removeClass('d-none')
        chart3.removeClass('d-none')
        pie_products.removeClass('d-none')
        pie_category.removeClass('d-none')
        pie_employee.removeClass('d-none')
        $('.placeholder').css('display', 'none')
        $('.loading').css('display', 'none')
    }

    if(res.d_category != null){
        // dSales.empty()
        // daSales.empty()
        // wSales.empty()
        // waSales.empty()
        // mSales.empty()
        // maSales.empty()
    }

    if(res.d_product != null){
        list_products.empty()
        for(i = 1; i < 11; i++){
            product = (res.d_product[i-1] == null ? '-' : res.d_product[i-1]);
            list_products.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+product+`</div>
                </div>
            `)
        }
    }else{
        list_products.empty()
        for(i = 1; i < 11; i++){
            list_products.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
                </div>
            `)
        }
    }

    if(res.d_category != null){
        list_category.empty()
        for(i = 1; i < 11; i++){
            category = (res.d_category[i-1] == null ? '-' : res.d_category[i-1]);
            list_category.append(`
            <div class="row h6 text-uppercase">
                <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+category+`</div>
            </div>
            `)
        }
    }else{
        list_category.empty()
        for(i = 1; i < 11; i++){
            list_category.append(`
            <div class="row h6 text-uppercase">
                <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
            </div>
            `)
        }
    }

    if(res.d_price != null){
        list_employee.empty()
        for(i = 1; i < 11; i++){
            employee = (res.d_price[i-1] == null ? '-' : res.d_price[i-1]);
            list_employee.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+employee+`</div>
                </div>
            `)
        }
    }else{
        list_employee.empty()
        for(i = 1; i < 11; i++){
            list_employee.append(`
                <div class="row h6 text-uppercase">
                    <div class="col-sm-1 col-md-1 col-lg-1 fw-bolder text-center">`+rewardIcon(i)+`</div>
                    <div class="col-sm-2 col-md-2 col-lg-2 fw-bolder text-center">`+i+`</div>
                    <div class="col-sm-9 col-md-9 col-lg-8 text-truncate">`+'-'+`</div>
                </div>
            `)
        }
    }

    sales = [0,0,0,0,0,0,0,0,0,0,0,0]
    expenses = [0,0,0,0,0,0,0,0,0,0,0,0]
    profit = [sales[0]-expenses[0],sales[1]-expenses[1],sales[2]-expenses[2],sales[3]-expenses[3],sales[4]-expenses[4],sales[5]-expenses[5],sales[6]-expenses[6],sales[7]-expenses[7],sales[8]-expenses[8],sales[9]-expenses[9],sales[10]-expenses[10],sales[11]-expenses[11],]

    animationTrue = {},
    animationFalse = {
        duration: 0
    };

    animationBool = anima == true ? animationTrue : animationFalse

    lineOptions = {
        animation: animationBool,
        responsive: true,
        title: {
        display: true,
        text: '',
        },
        tooltips: {
        mode: 'label',
        },
        hover: {
        mode: 'nearest',
        intersect: true
        },
        plugins: {
            colorschemes: {
                scheme: pallete,
            },
        },
        layout: {
            padding: {
                top: -30
            }
        },
        scales: {
        xAxes: [{
            display: true,
            gridLines: {
            display: false,
            color: textcolor
            },
            scaleLabel: {
            display: false,
            labelString: 'Year -'
            }
        }],
        yAxes: [{
            display: true,
            gridLines: {
            display: false,
            color: textcolor
            },
            scaleLabel: {
            display: false,
            labelString: 'Value'
            },
        }]
        }
    };

    pieOptions = {
        animation: animationBool,
        responsive: true,
        plugins: {
            colorschemes: {
                scheme: pallete,
            },
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: textcolor,
            usePointStyle: false,
            boxWidth: 10,
            // fontStyle : 'bold'
          }
        },
    };

    var canvas1config = {
        type: 'line',
        data: {
            labels: monthly,
            datasets: [
            // {
            //     label: 'Sales',
            //     data: sales,
            //     fill: false,
            // }, {
            //     label: 'Expenses',
            //     fill: false,
            //     data: expenses,
            // },
            {
                label: 'Sales',
                fill: true,
                data: res.d_yearly,
            }
        ]
        },
        options: lineOptions,
    };

    var canvas2config = {
        type: 'bar',
        data: {
            labels: daily,
            datasets: [
                {
                    label: "Sales",
                    data: sales
                }
            ]
        },
        options: {
            animation: animationBool,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
              legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Week -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var canvas3config = {
        type: 'bar',
        data: {
            labels: weekly,
            datasets: [
                {
                    label: "Sales",
                    data: sales
                }
            ]
        },
        options: {
            animation: animationBool,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
              legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Month -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var TopProductConfig =  {
        type: 'pie',
        data: {
        labels: res.d_product,
        datasets: [
            {
            label: 'Top Products',
            data: res.d_quantity,
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };

    var TopCategoryConfig =  {
        type: 'pie',
        data: {
        labels: res.d_category,
        datasets: [
            {
            label: 'Top Category',
            data: res.d_count,
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };


    var TopEmployeeConfig =  {
        type: 'pie',
        data: {
        labels: (profit == 0 ? ['0'] : ['No Data']),
        datasets: [
            {
            label: 'Top Products',
            data: (profit == 0 ? ['0'] : [null]),
            borderColor: textcolor,
            }
        ]
        },
        options: pieOptions
    };
    }

    var canvas1 = document.querySelector('#YearlySales').getContext('2d');
    new Chart(canvas1, canvas1config);
    // var canvas2 = document.querySelector('#DailySales').getContext('2d');
    // new Chart(canvas2, canvas2config);
    // var canvas3 = document.querySelector('#WeeklySales').getContext('2d');
    // new Chart(canvas3, canvas3config);
    var canvas4 = document.querySelector('#TopProduct').getContext('2d');
    new Chart(canvas4, TopProductConfig);
    var canvas5 = document.querySelector('#TopCategory').getContext('2d');
    new Chart(canvas5, TopCategoryConfig);
    var canvas6 = document.querySelector('#TopEmployee').getContext('2d');
    new Chart(canvas6, TopEmployeeConfig);

}




function rewardIcon(i){
    if(i == 1){
        return reward = '🏆';
    }else if(i == 2){
        return reward = '🥈';
    }else if(i == 3){
        return reward = '🥉';
    }else{
        return reward = '🎖️';
    }
}

$(function(){
    $('input[name=datefrom], input[name=dateto]').prop('max', (new Date).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date).getDate())

    $('input[name=datefrom]').keyup(function(){
        $('input[name=dateto]').prop('min', $(this).val()).prop('disabled', false)
    })
    
    $('#select-report-type').change(function(){
        if($('select#select-report-type option:selected').val() == 'General'){
            console.log('General Report')
            $('.custom-report').addClass('d-none')
            $('.custom-input').prop('required', false).prop('disabled', true)
        }else if($('select#select-report-type option:selected').val() == 'Custom'){
            console.log('Custom Report')
            $('.custom-report').removeClass('d-none')
            $('.custom-input').prop('required', true).prop('disabled', false)
        }
    })

    $('form#form-generate-report').submit(function(e){
        e.preventDefault()

        var formData = new FormData($(this)[0]);
    
        $.ajax({
            url: '/controller/generate-report.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            dataType: 'json',
            success: function (response) {
                console.log(response);      

                $('.date-start').text($('#date-from').val())
                $('.date-end').text($('#date-to').val())
                loadGenerated(response)

                
            }
        })

        return false;
    })
})



function loadGenerated(json){

    const pallete = ($('body').hasClass('dark') ? 'office.Expo6' : 'office.Exhibit6')
    const textcolor = ($('body').hasClass('dark') ? '#ffffff' : '#000000')
    const daily = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekly = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const monthly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    Chart.defaults.global.defaultFontColor = textcolor;

    var data_year = json.month;
    var data_week = json.week;
    var data_month = json.day;
    var today_sales = json.today_s;
    var today_customer = json.walkin;
    var today_online = json.online;

    var figyear = {
        type: 'line',
        data: {
            labels: monthly,
            datasets: [
            {
                label: 'Sales',
                fill: true,
                data: data_year,
            }
        ]
        },
        options: {
            animation: false,
            responsive: true,
            title: {
            display: true,
            text: '',
            },
            tooltips: {
            mode: 'label',
            },
            hover: {
            mode: 'nearest',
            intersect: true
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
            layout: {
                padding: {
                    top: -30
                }
            },
            scales: {
            xAxes: [{
                display: true,
                gridLines: {
                display: false,
                color: textcolor
                },
                scaleLabel: {
                display: false,
                labelString: 'Year -'
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                display: false,
                color: textcolor
                },
                scaleLabel: {
                display: false,
                labelString: 'Value'
                },
            }]
            }
        }
    };

    var figmonth = {
        type: 'bar',
        data: {
            labels: daily,
            datasets: [
                {
                    label: "Sales",
                    data: data_month,
                }
            ]
        },
        options: {
            animation: false,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
            legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Week -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var figweek = {
        type: 'bar',
        data: {
            labels: weekly,
            datasets: [
                {
                    label: "Sales",
                    data: data_week
                }
            ]
        },
        options: {
            animation: false,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 5
                }
            },
            plugins: {
                colorschemes: {
                    scheme: pallete,
                },
            },
            legend: {
                labels: {
                usePointStyle: false,
                boxWidth: 10
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Month -'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                    display: false,
                    color: textcolor
                    },
                    scaleLabel: {
                    display: false,
                    labelString: 'Value'
                    },
                }]
            },
        },
    };

    var year = document.querySelector('#canvas-year').getContext('2d');
    new Chart(year, figyear);
    var month = document.querySelector('#canvas-month').getContext('2d');
    new Chart(month, figmonth);
    var week = document.querySelector('#canvas-week').getContext('2d');
    new Chart(week, figweek);

    $('#yearly-sales').val(data_year.join(', '))
    $('#weekly-sales').val(data_week.join(', '))
    $('#monthly-sales').val(data_month.join(', '))

    $('#today-sales').val(today_sales)

    $('#today-customer').val(today_customer)
    $('#today-online').val(today_online)

    $('#export-tbody').empty()
    if(json.rowlimit > 0){
        for(i=0; i<json.rowlimit; i++){
            $('#export-tbody').append(`
                <tr>
                    <td>${json.trn_date}</td>
                    <td>${json.trn_count}</td>
                    <td>${json.trn_final}</td>
                </tr>
            `)
        }
    }else{
        $('#export-tbody').append(`
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `)

    }
    html2canvas(document.querySelector('#generate-report')).then(function (canvas) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        document.getElementById("previewImage").appendChild(canvas);
        a.download = $('select#select-report-type option:selected').val() == 'Custom' ?  "Report-"+$('#date-from').val()+"x"+$('#date-to').val()+".jpg" : "Report-"+(new Date).getFullYear()+"-"+(new Date).getMonth()+"-"+(new Date).getDate();
        a.href = canvas.toDataURL();
        a.target = '_blank';
        a.click();
    }).then(() => {
        TableToExcel.convert(document.querySelector("table#export-table"), {
            name: 'General-Report-'+(new Date).getFullYear()+"-"+(new Date).getMonth()+"-"+(new Date).getDate()+'.xlsx',
            sheet: {
                name: "General-Report"
            }
        });
    })
}

$('#customerDiv').on('mouseenter', function(){
    blink('.customers');
}).on('mouseleave', function(){
    $('#customerIcon').empty()
    $('#customerIcon').append(`<span class="fa-solid fa-users customers"></span>`)
});
$('#salesDiv').on('mouseenter', function(){
    blink('.sales');
}).on('mouseleave', function(){
    $('#salesIcon').empty()
    $('#salesIcon').append(`<span class="fa-solid fa-coins sales"></span>`)
});
$('#expenseDiv').on('mouseenter', function(){
    blink('.expenses');
}).on('mouseleave', function(){
    $('#expenseIcon').empty()
    $('#expenseIcon').append(`<span class="fa-solid fa-circle-dollar-to-slot expenses"></span>`)
});
$('#profitDiv').on('mouseenter', function(){
    blink('.profits');
}).on('mouseleave', function(){
    $('#profitIcon').empty()
    $('#profitIcon').append(`<span class="fa-solid fa-money-bill-trend-up profits"></span>`)
});

$(document).ready( function(){
    $('#themeDiv').click( function(){
        loadDashboard()
    });
});