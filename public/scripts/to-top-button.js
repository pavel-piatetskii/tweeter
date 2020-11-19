/**
 * Show the button in the bottom-right corner, animate it appearance.
 * The prevScrollY variable is used to avoid toggle the 'top' button
 * every time a user scrolls, so the animation fires only near the top
 */
const showToTopButton = function() {
  
  let prevScrollY = 0;

  $(this).on('scroll', function(e){
    if (window.scrollY !== 0 && prevScrollY === 0) $('.to-top img').animate({ width: 'show', height: 'show' })
    if (window.scrollY === 0) $('.to-top img').animate({ width: 'hide', height: 'hide' })
    prevScrollY = window.scrollY;
  });

};


/**
 * When the button is clicked it returns
 * view to the top and opens the 'new tweet' section
 */
const clickToTopButton = function() {

  $('.to-top img').click(function() {
    window.scrollTo(0, 0)
    $('#new-tweet').slideDown(500);
  });

};


$(document).ready(function() {

  showToTopButton();
  clickToTopButton();

})