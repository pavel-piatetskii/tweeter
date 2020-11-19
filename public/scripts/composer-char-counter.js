$(document).ready(function() {

  // Count chars as user inputs them into the 'new tweet'
  // text field and change the counter accordingly
  $('#tweet-text').on('input', function() {
    const $tweetField = $(this);
    const counter = $tweetField.parent().children('div').children('.counter');

    const charsLeft = 140 - $tweetField.val().length;
    if (charsLeft < 0) counter.css('color', 'red');
    if (charsLeft >= 0) counter.css('color', '#545149');

    counter.val(charsLeft);
  });
});