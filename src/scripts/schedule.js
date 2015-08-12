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
