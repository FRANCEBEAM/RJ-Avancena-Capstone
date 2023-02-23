const sidebar = document.querySelector('.sidebar'), closeBtn = document.querySelector('#btn');

closeBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("open");
    menuBtnChange();
});

function menuBtnChange() {
    if(sidebar.classList.contains("open")){
        // closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        closeBtn.classList.replace("bx-menu", "bxs-left-arrow");
        $('.text-nav').css('font-size', '10px');
        // closeBtn.classList.replace("bxs-right-arrow", "bxs-left-arrow");
    }else {
        // closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
        closeBtn.classList.replace("bxs-left-arrow","bx-menu");
        $('.text-nav').css('font-size', '13px');
        // closeBtn.classList.replace("bxs-left-arrow","bxs-right-arrow");
    }
}

function blink(selector) {
    $(selector).fadeOut('slow', function() {
        $(this).fadeIn('slow', function() {
            blink(this);
        });
    });
}

blink('.blink');


// DARK MODE

const body = $('body'), themeTitle = $('.themeTitle'), themeInput = $('#themeInput'), themeToggle = $('#themeIcon');

$(document).ready(function() {
    $('#sidebar').removeClass("close");
    if(body.hasClass('dark')){
        themeInput.val('dark');
        $('.offcanvas').addClass('text-bg-dark');
        $('table').addClass('table-dark');
        $('.btn-canvas').addClass('btn-dark');
        $('.btn-add').addClass('btn-dark');
        $('.text-blue-yellow').addClass('text-warning');
        $('.bg-dynamic').addClass('bg-dark');
        themeTitle.text('Light Mode');
        themeToggle.attr('class','bx bx-sun');
        menuBtnChange();
    }else{
        themeInput.val('light');
        $('.offcanvas').addClass('text-bg-light');
        $('table').addClass('table-light');
        $('.btn-canvas').addClass('btn-light');
        $('.btn-add').addClass('btn-primary');
        $('.text-blue-yellow').addClass('text-primary');
        $('.bg-dynamic').addClass('bg-light');
        themeTitle.text('Dark Mode');
        themeToggle.attr('class','bx bx-moon');
        menuBtnChange();
    }
});


function DarkMode() {
    if(body.hasClass('dark')){
        themeInput.val('dark');
        $('table').addClass('table-dark');
        $('.btn-canvas').addClass('btn-dark');
        $('.offcanvas').addClass('text-bg-dark');
        $('.btn-add').addClass('btn-dark');
        $('.text-blue-yellow').addClass('text-warning');
        $('.bg-dynamic').addClass('bg-dark');
        themeTitle.text('Dark Mode');
        themeToggle.attr('class','bx bx-moon');
        menuBtnChange();
    }else{ 
        themeInput.val('light');
        $('table').addClass('table-light');
        $('.offcanvas').addClass('text-bg-light');
        $('.btn-canvas').addClass('btn-light');
        $('.btn-add').addClass('btn-primary');
        $('.text-blue-yellow').addClass('text-primary');
        $('.bg-dynamic').addClass('bg-light');
        themeTitle.text('Light Mode');
        themeToggle.attr('class','bx bx-sun');
        menuBtnChange();
    }
    $('table').toggleClass('table-dark');
    $('.offcanvas').toggleClass('text-bg-dark');
    $('.btn-canvas').toggleClass('btn-dark');
    $('.btn-add').toggleClass('btn-dark');
    $('.text-blue-yellow').toggleClass('text-warning');
    $('.bg-dynamic').toggleClass('bg-dark');
    body.toggleClass('dark');

    $('#themeInput').val() == 'light' ? val = 'dark' : val = 'light';
    var session = $('#sessionID').val();
    insert = val.toString();
    
    $.ajax({
        url: "/controller/toggle-settings.php",
        method: "POST",
        data: {
            theme: insert, sessionID: session,
        },
        success: function(data) {
            console.log('Theme Toggled: '+insert)
        }
    });
};


$(document).ready(function() {
    $('#btn').click(function() {
        var session = $('#sessionID').val();
        $('.sidebar').hasClass('open') ? val = 'open' : val = 'close';
        var insert = val.toString();
        $.ajax({
            url: "/controller/toggle-settings.php",
            method: "POST",
            data: {
                interface : insert, sessionID : session,
            },
            success: function(data) {
                // console.log(val)
                // console.log(insert)
            }
        });
    });
});

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

var interval = 0;
function HideShowDiv() {
    interval++;
    if(interval <= 5){
        $('#contentA').show();
        $('#contentB').hide();
    }else{
        $('#contentA').hide();
        $('#contentB').show();
        interval = interval == 10 ? 0 : interval;
    }
    setTimeout(HideShowDiv, 1000)
}

function datetime() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daily = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var x = new Date()
    var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
    hours = x.getHours( ) % 12;
    hours = hours ? hours : 12;
    hours=hours.toString().length == 1? 0+hours.toString() : hours;
    
    var minutes = x.getMinutes().toString()
    minutes = minutes.length == 1 ? 0+minutes : minutes;
    
    var seconds = x.getSeconds().toString()
    seconds = seconds.length == 1 ? 0+seconds : seconds;
    
    var month = (x.getMonth() +1).toString();
    month = month.length == 1 ? 0+month : month;
    
    var dt=x.getDate().toString();
    dt = dt.length == 1 ? 0+dt : dt;
    
    var date = months[x.getMonth()] + " " + dt + ", " + x.getFullYear();
    
    var time = hours + ":" +  minutes + ":" +  seconds + " " + ''+ampm+'';
    var dateTime = month + "-" + dt + "-" + x.getFullYear() + " | " + time; 
    $('.date').text(date);
    $('.date-time').text(dateTime);
    $('.time').text(time);
    $('.time').text(time);

    
    cycle();
}

function cycle(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('datetime()', refresh)
}
$(function() {
    HideShowDiv();
    cycle();
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$('#password').on('mouseenter', function(){
    $('#password').attr('type', 'text')
}).on('mouseleave', function(){
    $('#password').attr('type', 'password')
});

$('#password1').on('mouseenter', function(){
    $('#password1').attr('type', 'text')
}).on('mouseleave', function(){
    $('#password1').attr('type', 'password')
});

$('#password2').on('mouseenter', function(){
    $('#password2').attr('type', 'text')
}).on('mouseleave', function(){
    $('#password2').attr('type', 'password')
});

$('#password3').on('mouseenter', function(){
    $('#password3').attr('type', 'text')
}).on('mouseleave', function(){
    $('#password3').attr('type', 'password')
});

$(function() {
    if(document.title == 'Dashboard'){
        $('.dashboard-tab').addClass('active')
    }else if(document.title == 'Merchandise'){
        $('.merchandise-tab').addClass('active')
    }else if(document.title == 'Online Orders'){
        $('.online-orders-tab').addClass('active')
    }else if(document.title == 'Accounts'){
        $('.accounts-tab').addClass('active')
    }else if(document.title == 'Inventory'){
        $('.inventory-tab').addClass('active')
    }else if(document.title == 'Transactions'){
        $('.transactions-tab').addClass('active')
    }else if(document.title == 'Messages'){
        $('.messages-tab').addClass('active')
    }else if(document.title == 'Settings'){
        $('.settings-tab').addClass('active')
    }
});

function AlertPrompt(json){

    const alertType = localStorage.getItem('alert');

    try{
        const alert = JSON.parse(json);
        const titles = alert.msg_title, prompt = alert.msg_prompt, notification = alert.msg_notification, icons = alert.msg_icon;
    
        if(alertType == 'prompt'){
            Swal.fire(titles, prompt, icons);
        }else{
            Swal.fire({ icon: icons, html: notification, toast: true, position: 'bottom-end', width: '500px', showConfirmButton: false, timer: 3000, timerProgressBar: true, });
        }
    }catch{
        const alert = JSON.parse(JSON.stringify(json));
        const titles = alert.msg_title, prompt = alert.msg_prompt, notification = alert.msg_notification, icons = alert.msg_icon;
    
        if(alertType == 'prompt'){
            Swal.fire(titles, prompt, icons);
        }else{
            Swal.fire({ icon: icons, html: notification, toast: true, position: 'bottom-end', width: '500px', showConfirmButton: false, timer: 3000, timerProgressBar: true, });
        }
    }

}

