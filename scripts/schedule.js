(function () {
  var navbarBtn = $('.navbar-btn');
  navbarBtn.bind('click', function (event) {
    console.log(event);
    $('.nav-menu').toggleClass('active');
  });

  var tabsList = document.querySelectorAll('.day-tab li');
  for (var i = 0; i < tabsList.length; i++) {
    tabsList[i].addEventListener('click', function (event) {
      var content = $('.list.' + this.getAttribute('data-target'));
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      content.siblings('.list').removeClass('active');
      content.addClass('active');
    });
  }

  var schedule = $('.schedule');
  var dayTab = $('.day-tab');

  var scrollEvent = function (event) {
    if ( $(window).scrollTop() > schedule.offset().top && !dayTab.hasClass('fixed') ) {
      // dayTab.classList.add('fixed');
      dayTab.addClass('fixed');
    } else if ( $(window).scrollTop() < schedule.offset().top && dayTab.hasClass('fixed') ) {
      // dayTab.classList.remove('fixed');
      dayTab.removeClass('fixed');
    }

  };
  $(window).on('scroll', scrollEvent);

  var layzr = new Layzr();
}) ();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2hlZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICB2YXIgbmF2YmFyQnRuID0gJCgnLm5hdmJhci1idG4nKTtcbiAgbmF2YmFyQnRuLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICQoJy5uYXYtbWVudScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG5cbiAgdmFyIHRhYnNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRheS10YWIgbGknKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHRhYnNMaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgY29udGVudCA9ICQoJy5saXN0LicgKyB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSk7XG4gICAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICBjb250ZW50LnNpYmxpbmdzKCcubGlzdCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIGNvbnRlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHNjaGVkdWxlID0gJCgnLnNjaGVkdWxlJyk7XG4gIHZhciBkYXlUYWIgPSAkKCcuZGF5LXRhYicpO1xuXG4gIHZhciBzY3JvbGxFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICggJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2NoZWR1bGUub2Zmc2V0KCkudG9wICYmICFkYXlUYWIuaGFzQ2xhc3MoJ2ZpeGVkJykgKSB7XG4gICAgICAvLyBkYXlUYWIuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcbiAgICAgIGRheVRhYi5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICB9IGVsc2UgaWYgKCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPCBzY2hlZHVsZS5vZmZzZXQoKS50b3AgJiYgZGF5VGFiLmhhc0NsYXNzKCdmaXhlZCcpICkge1xuICAgICAgLy8gZGF5VGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpeGVkJyk7XG4gICAgICBkYXlUYWIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgfVxuXG4gIH07XG4gICQod2luZG93KS5vbignc2Nyb2xsJywgc2Nyb2xsRXZlbnQpO1xuXG4gIHZhciBsYXl6ciA9IG5ldyBMYXl6cigpO1xufSkgKCk7XG4iXSwiZmlsZSI6InNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvc2NyaXB0cyJ9