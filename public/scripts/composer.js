$(document).ready(function() {
  let prevScrollY = 0;
  $(this).on('scroll', function(e){
    if (window.scrollY !== 0 && prevScrollY === 0) $('.to-top img').animate({ width: 'show', height: 'show' })//.slideDown();
    if (window.scrollY === 0 && prevScrollY !== 0) $('.to-top img').animate({ width: 'hide', height: 'hide' })//.slideUp();
    prevScrollY = window.scrollY;
  })

  $('.to-top img').click(function() {
    window.scrollTo(0, 0)
    $('#new-tweet').slideDown(500);
  })

})