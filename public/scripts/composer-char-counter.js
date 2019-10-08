$(document).ready(function() {
  $(".textBox").keyup(function(e) {
    const span = $(this).siblings('.counter');
    console.log($(span))
    const counterValue = 140 - e.target.value.length;
    $(span).text(counterValue);
    if (counterValue < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter');
    }
  });
});



