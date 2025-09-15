/*================================================================================
	Item Name: Platinum - Simple & Clean Bootstrap 4 Admin Template
	Version: 1.0
	Author: Native Theme
	Author URL: http://www.themeforest.net/user/native-theme
================================================================================*/

"use strict";$(function(){if($('.side-nav').length){$('.side-nav').find('.main-menu').find('a').each(function(){if($(this).parent().find('ul').length>0){$(this).attr('href','javascript:;')}
$(this).on('click',function(){var li=$(this).parent()
if($(li).parent().parent().hasClass('main-menu')){if(!$(li).hasClass('active')){$('.side-nav').find('.main-menu > ul > li').removeClass('active')
$(li).addClass('active')}else{$(li).removeClass('active')}}})})}
function hideAllMenu(){$('body').removeClass('mask')
$('.user-profile').hide()
$('.side-nav').hide()}
$('.side-nav-mobile').on('click',function(){if($('.side-nav').is(':visible')){$('body').removeClass('mask')
$('.side-nav').hide()}else{hideAllMenu()
$('body').addClass('mask')
$('.side-nav').show()}})
$('.profile-nav-mobile').on('click',function(){if($('.user-profile').is(':visible')){$('body').removeClass('mask')
$('.user-profile').hide()}else{hideAllMenu()
$('body').addClass('mask')
$('.user-profile').show()}})
function hideAllNotifications(){$('body').removeClass('mask')
$('.quick-link').find('ul').hide()
$('.user-profile').find('.dropdown').hide()
$('.messages').find('.messages-box').hide()
$('.notification').find('.notification-box').find('.notification-content').hide()}
$('.quick-link').on('click',function(){if($(this).find('ul').is(':visible')){$('body').removeClass('mask')
$(this).find('ul').hide()}else{hideAllNotifications()
$('body').addClass('mask')
$(this).find('ul').show()}})
$('.messages').on('click',function(){if($(this).find('.messages-box').is(':visible')){$('body').removeClass('mask')
$(this).find('.messages-box').hide()}else{hideAllNotifications()
$('body').addClass('mask')
$(this).find('.messages-box').show()}})
$('.notification').find('.notification-box').each(function(){$(this).on('click',function(){if($(this).find('.notification-content').is(':visible')){$('body').removeClass('mask')
$(this).find('.notification-content').hide()}else{hideAllNotifications()
$('body').addClass('mask')
$(this).find('.notification-content').show()}})})
$('.user-profile').on('click',function(){if($(window).width()>1100){if($(this).find('.dropdown').is(':visible')){$('body').removeClass('mask')
$(this).find('.dropdown').hide()}else{hideAllNotifications()
$('body').addClass('mask')
$(this).find('.dropdown').show()}}})
$('.messages').find('.content').slimScroll({color:'rgb(142, 142, 142)',height:250})
$('.notification').find('.notification-box').each(function(){$(this).find('.content').slimScroll({color:'rgb(142, 142, 142)',height:270})})
if($(window).width()<=1100){$('.side-nav').find('.side-nav-box').slimScroll({color:'rgb(142, 142, 142)',height:$(window).height()-60})}
if($('#line-chart').length){var lineChart=$("#line-chart");var lineData={labels:["02.00","02.30","03.00","03.30","04.00","04.30","02.00","02.30","03.00","02.00","02.30"],datasets:[{label:"Visitors Graph",borderColor:"#535a6f",pointRadius:4,borderWidth:1,backgroundColor:"#263238",pointBackgroundColor:"#cccccc",data:[1,5,10,4,20,5,10,2,12,5,1]},{label:"Visitors Graph",borderColor:"#535a6f",pointRadius:4,borderWidth:1,backgroundColor:"#48527270",pointBackgroundColor:"#333",data:[5,32,5,42,50,59,5,32,5,40,5]}]};var myLineChart=new Chart(lineChart,{type:'line',data:lineData,options:{legend:{display:false},scales:{xAxes:[{ticks:{fontSize:'11',fontColor:'#969da5'},gridLines:{color:'#f2f4f8',zeroLineColor:'#f2f4f8'}}],yAxes:[{gridLines:{color:'#f2f4f8',zeroLineColor:'#f2f4f8'},ticks:{fontSize:'11',fontColor:'#969da5'}}]}}});}
if($('.owl-carousel').length){$('.owl-carousel').owlCarousel({loop:true,margin:30,nav:false,dots:true,autoplay:true,singleItems:true,responsive:{0:{items:1},600:{items:1},1000:{items:1}}})}
if($('#full-calendar').length){var calendar,d,date,m,y;date=new Date();d=date.getDate();m=date.getMonth();y=date.getFullYear();calendar=$("#full-calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},selectable:true,selectHelper:true,select:function select(start,end,allDay){var title;title=prompt("Event Title:");if(title){calendar.fullCalendar("renderEvent",{title:title,start:start,end:end,allDay:allDay},true);}
return calendar.fullCalendar("unselect");},editable:true,events:[{title:"Long Event",start:new Date(y,m,3,12,0),end:new Date(y,m,7,14,0)},{title:"Lunch",start:new Date(y,m,d,12,0),end:new Date(y,m,d+2,14,0),allDay:false},{title:"Click for Google",start:new Date(y,m,28),end:new Date(y,m,29),url:"http://google.com/"}]});}
if($('#donut-chart').length){var donutChart=$("#donut-chart");var data={labels:["Red","Yellow","Green","Blue"],datasets:[{data:[80,120,80,50],backgroundColor:["#ff4141","#FBC02D","#71c21a","#5797fc"],hoverBackgroundColor:["#ff5c5c","#fdcd54","#89da32","#6ca4fb"],borderWidth:0}]};new Chart(donutChart,{type:'doughnut',data:data,options:{legend:{display:false},animation:{animateScale:true},cutoutPercentage:80}});}
if($('#bar-chart').length){var barChart1=$("#bar-chart");var barData1={labels:["02.00","02.30","03.00","03.30","04.00","04.30","02.00","02.30","03.00","02.00","02.30"],datasets:[{label:"Visitors Graph",borderColor:"#535a6f",pointRadius:4,borderWidth:1,backgroundColor:"#263238",pointBackgroundColor:"#cccccc",data:[1,5,10,4,20,5,10,2,12,5,1]},{label:"Visitors Graph",borderColor:"#535a6f",pointRadius:4,borderWidth:1,backgroundColor:"#48527270",pointBackgroundColor:"#fbd500",data:[5,32,5,42,50,59,5,32,5,40,5]}]};new Chart(barChart1,{type:'bar',data:barData1,options:{scales:{xAxes:[{display:false,ticks:{fontSize:'11',fontColor:'#969da5'},gridLines:{color:'rgba(0,0,0,0.05)',zeroLineColor:'rgba(0,0,0,0.05)'}}],yAxes:[{ticks:{beginAtZero:true},gridLines:{color:'rgba(0,0,0,0.05)',zeroLineColor:'#6896f9'}}]},legend:{display:false},animation:{animateScale:true}}});}
if($('#ckeditor').length){CKEDITOR.replace('ckeditor')}
if($('.datatable').length){$('.datatable').DataTable()}
if($('.select2').length){$('.select2').select2()}
if($('input.single-daterange').length){$('input.single-daterange').daterangepicker({"singleDatePicker":true})}
if($('input.multi-daterange').length){$('input.multi-daterange').daterangepicker({"startDate":"03/28/2017","endDate":"04/06/2017"})}
if($('#form-validate').length){$('#form-validate').validator()}
if($('.form-wizard-nav').length){$('.form-wizard-nav').find('.step').each(function(){var next_step=$(this).next()
var prev_step=$(this).prev()
var content=$(this).attr('data-form')
$(content).hide()
$(content).find('.prev-action').on('click',function(){go(prev_step)})
$(content).find('.next-action').on('click',function(){go(next_step)})})
var content=$('.form-wizard-nav').find('.step').first()
$($(content).attr('data-form')).show()
$(content).addClass('active').addClass('complete')
$('.form-wizard-nav').find('.step').each(function(){$(this).on('click',function(){go(this)})})}
function go(el){if($(el).prev().hasClass('complete')&&!$(el).hasClass('complete')){$(el).prev().removeClass('active')
$(el).addClass('complete').addClass('active')
var prev_content=$(el).prev().attr('data-form')
$(prev_content).hide()
var next_content=$(el).attr('data-form')
$(next_content).show()}
if($(el).hasClass('complete')&&$(el).next().hasClass('active')){$(el).addClass('complete').addClass('active')
$(el).next().removeClass('complete').removeClass('active')
var prev_content=$(el).next().attr('data-form')
$(prev_content).hide()
var next_content=$(el).attr('data-form')
$(next_content).show()}}
if($('.chat-list').length){$('.chat-list').slimScroll({color:'rgb(142, 142, 142)',height:650})}
var nanobar=new Nanobar();nanobar.go(30);nanobar.go(76);setTimeout(()=>{nanobar.go(100);},1000)})