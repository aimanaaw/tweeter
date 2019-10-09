$(document).ready(function() {
  $(".textBox").keyup(function(e) {
    const span = $(this).siblings('.counter');
    const counterValue = 140 - e.target.value.length;
    $(span).text(counterValue);
    if (counterValue > 0) {
      $('.counter').css('color', 'green');
    } else {
      $('.counter').css('color', 'red');
    }
  });
});



