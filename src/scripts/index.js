(function(a) {
  var bg_video = document.getElementById('bg-video');

  // Detect the mobile device
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
    bg_video.remove();
  }

})(navigator.userAgent || navigator.vendor || window.opera);

$(document).ready(function() {
  //set animation timing
  var animationDelay = 2500,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect
    revealDuration = 600,
    revealAnimationDelay = 1500;

  var singleLetters = function($words) {
    $words.each(function() {
      var word = $(this),
        letters = word.text().split(''),
        selected = word.hasClass('is-visible');
      for (var i in letters) {
        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
      }
      var newLetters = letters.join('');
      word.html(newLetters).css('opacity', 1);
    });
  };

  var animateHeadline = function($headlines) {
    var duration = animationDelay;
    $headlines.each(function() {
      var headline = $(this);

      if (headline.hasClass('loading-bar')) {
        duration = barAnimationDelay;
        setTimeout(function() {
          headline.find('.cd-words-wrapper').addClass('is-loading');
        }, barWaiting);
      } else if (headline.hasClass('clip')) {
        var spanWrapper = headline.find('.cd-words-wrapper'),
          newWidth = spanWrapper.width() + 10;
        spanWrapper.css('width', newWidth);
      } else if (!headline.hasClass('type')) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find('.cd-words-wrapper b'),
          width = 0;
        words.each(function() {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find('.cd-words-wrapper').css('width', width);
      }

      //trigger animation
      setTimeout(function() {
        hideWord(headline.find('.is-visible').eq(0));
      }, duration);
    });
  };

  var hideWord = function($word) {
    var nextWord = takeNext($word);

    if ($word.parents('.cd-headline').hasClass('type')) {
      var parentSpan = $word.parent('.cd-words-wrapper');
      parentSpan.addClass('selected').removeClass('waiting');
      setTimeout(function() {
        parentSpan.removeClass('selected');
        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
      }, selectionDuration);
      setTimeout(function() {
        showWord(nextWord, typeLettersDelay);
      }, typeAnimationDelay);

    } else if ($word.parents('.cd-headline').hasClass('letters')) {
      var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
      hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        width: '2px'
      }, revealDuration, function() {
        switchWord($word, nextWord);
        showWord(nextWord);
      });

    } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
      $word.parents('.cd-words-wrapper').removeClass('is-loading');
      switchWord($word, nextWord);
      setTimeout(function() {
        hideWord(nextWord);
      }, barAnimationDelay);
      setTimeout(function() {
        $word.parents('.cd-words-wrapper').addClass('is-loading');
      }, barWaiting);

    } else {
      switchWord($word, nextWord);
      setTimeout(function() {
        hideWord(nextWord);
      }, animationDelay);
    }
  };

  var showWord = function($word, $duration) {
    if ($word.parents('.cd-headline').hasClass('type')) {
      showLetter($word.find('i').eq(0), $word, false, $duration);
      $word.addClass('is-visible').removeClass('is-hidden');

    } else if ($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({
        'width': $word.width() + 10
      }, revealDuration, function() {
        setTimeout(function() {
          hideWord($word);
        }, revealAnimationDelay);
      });
    }
  };

  var hideLetter = function($letter, $word, $bool, $duration) {
    $letter.removeClass('in').addClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function() {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function() {
        hideWord(takeNext($word));
      }, animationDelay);
    }

    if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  };

  var showLetter = function($letter, $word, $bool, $duration) {
    $letter.addClass('in').removeClass('out');

    if (!$letter.is(':last-child')) {
      setTimeout(function() {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents('.cd-headline').hasClass('type')) {
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('waiting');
        }, 200);
      }
      if (!$bool) {
        setTimeout(function() {
          hideWord($word);
        }, animationDelay);
      }
    }
  };

  var takeNext = function($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  };

  var takePrev = function($word) {
    return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  };

  var switchWord = function($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  };

  var initHeadline = function() {
    //insert <i> element for each letter of a changing word
    singleLetters($('.cd-headline.letters').find('b'));
    //initialise headline animation
    animateHeadline($('.cd-headline'));
  };

  initHeadline();

  // var video = document.getElementsByTagName('video')[0];
  // document.body.addEventListener('touchstart',function(){
  //   video.play();
  // }, false);

  var slideNavUp = function (event) {
    // $('#nav-main').velocity({
    //   translateY: '0%'
    // });
    $('#nav-main').addClass('active');
  };

  var slideNavDown = function (event) {
    // $('#nav-main').velocity({
    //   translateY: '80%'
    // });
    $('#nav-main').removeClass('active');
  };

  var openNavDrawer = function (event) {
    event.stopPropagation();
    // $('#nav-main').velocity({
    //   translateX: '0%'
    // });
    $('#nav-main').addClass('active');
    $('.nav-btn button').addClass('active');
    $('.nav-btn button').off('click');
    $('.nav-btn button').on('click', closeNavDrawer);
  };

  var closeNavDrawer = function (event) {
    // $('#nav-main').velocity({
    //   translateX: '-100%'
    // });
    $('#nav-main').removeClass('active');
    $('.nav-btn button').removeClass('active');
    $('.nav-btn button').off('click');
    $('.nav-btn button').on('click', openNavDrawer);
  };

  var navSlideBind = false;
  var navDrawerBind = false;

  var initNavbar = function() {
    var width = $(window).width();
    var height = $(window).height();
    if (width >= 768) {
      // $('#nav-main')
      //   .velocity({
      //     translateX: '0%'
      //   }, { duration: 'fast' })
      //   // .velocity({
      //   //   translateY: '0%'
      //   // }, "ease")
      //   .velocity({
      //     translateY: '80%'
      //   }, { duration: 'fast' });

      $('.nav-btn button').unbind('click', openNavDrawer);
      // $('body').unbind('click', closeNavDrawer);
      navDrawerBind = false;

      if (!navSlideBind) {
        $('#nav-main').off('mouseenter');
        $('#nav-main').off('mouseleave');
        $('#nav-main').on('mouseenter', slideNavUp);
        $('#nav-main').on('mouseleave', slideNavDown);
        navSlideBind = true;
      }

    } else {
      // $('#nav-main')
      //   .velocity({
      //     translateY: '0%'
      //   }, { duration: 'fast' })
      //   .velocity({
      //     translateX: '-100%'
      //   }, { duration: 'fast' });

      $('#nav-main').unbind('mouseenter', slideNavUp);
      $('#nav-main').unbind('mouseleave', slideNavDown);
      navSlideBind = false;

      if (!navDrawerBind) {
        $('.nav-btn button').off('click');
        $('body').off('click');
        $('.nav-btn button').on('click', openNavDrawer);
        // $('body').on('click', closeNavDrawer);
        navDrawerBind = true;
      }
    }

    $('#nav-main').on('click', function (event) {
      event.stopPropagation();
    });
  };

  $(window).resize(function (event) {
    initNavbar();
    // console.log(event);
  });

  initNavbar();

  var initNewsBlock = function (element) {
    element.slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 5000,
      // adaptiveHeight: true,
      // variableWidth: true,
      responsive: [{
        breakpoint: 770,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          centerMode: false,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });
  };

  initNewsBlock($('.news-slick'));

  // Scroll to div event
  var initScrollEvent = function (clickEl, toEl) {
    $(clickEl).on('click', function (event) {
      $(toEl).velocity('scroll', {
        scrollTop: toEl.offset().top - 100,
        duration: 1000
      });
    });
  };

  initScrollEvent($('.nav-news'), $('section.news'));
  initScrollEvent($('.nav-speakers'), $('section.speakers'));
  initScrollEvent($('.nav-partners'), $('section.partners'));
  initScrollEvent($('.nav-staff'), $('section.staff'));
  initScrollEvent($('.nav-location'), $('section.location'));

  var elevator = new Elevator({
    element: document.querySelector('#elevator-btn'),
    mainAudio: '/music/elevator.mp3',
    endAudio: '/music/ding.mp3'
  });

  var layzr = new Layzr();
});
