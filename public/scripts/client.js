/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  console.log($('#tweet-feed article'))
  $('#tweet-feed article').hover(function() {
    $(this).css('box-shadow', '10px 10px 0 0 lightsteelblue')
    $(this).children('header').children('div.author-account').css('color', 'lightsteelblue')
  },function() {
    $(this).css('box-shadow', '')
    $(this).children('header').children('div.author-account').css('color', '#f4f1ec')
  })
})