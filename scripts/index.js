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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oYSkge1xuICB2YXIgYmdfdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmctdmlkZW8nKTtcblxuICAvLyBEZXRlY3QgdGhlIG1vYmlsZSBkZXZpY2VcbiAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKSB7XG4gICAgYmdfdmlkZW8ucmVtb3ZlKCk7XG4gIH1cblxufSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAvL3NldCBhbmltYXRpb24gdGltaW5nXG4gIHZhciBhbmltYXRpb25EZWxheSA9IDI1MDAsXG4gICAgLy9sb2FkaW5nIGJhciBlZmZlY3RcbiAgICBiYXJBbmltYXRpb25EZWxheSA9IDM4MDAsXG4gICAgYmFyV2FpdGluZyA9IGJhckFuaW1hdGlvbkRlbGF5IC0gMzAwMCwgLy8zMDAwIGlzIHRoZSBkdXJhdGlvbiBvZiB0aGUgdHJhbnNpdGlvbiBvbiB0aGUgbG9hZGluZyBiYXIgLSBzZXQgaW4gdGhlIHNjc3MvY3NzIGZpbGVcbiAgICAvL2xldHRlcnMgZWZmZWN0XG4gICAgbGV0dGVyc0RlbGF5ID0gNTAsXG4gICAgLy90eXBlIGVmZmVjdFxuICAgIHR5cGVMZXR0ZXJzRGVsYXkgPSAxNTAsXG4gICAgc2VsZWN0aW9uRHVyYXRpb24gPSA1MDAsXG4gICAgdHlwZUFuaW1hdGlvbkRlbGF5ID0gc2VsZWN0aW9uRHVyYXRpb24gKyA4MDAsXG4gICAgLy9jbGlwIGVmZmVjdFxuICAgIHJldmVhbER1cmF0aW9uID0gNjAwLFxuICAgIHJldmVhbEFuaW1hdGlvbkRlbGF5ID0gMTUwMDtcblxuICB2YXIgc2luZ2xlTGV0dGVycyA9IGZ1bmN0aW9uKCR3b3Jkcykge1xuICAgICR3b3Jkcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHdvcmQgPSAkKHRoaXMpLFxuICAgICAgICBsZXR0ZXJzID0gd29yZC50ZXh0KCkuc3BsaXQoJycpLFxuICAgICAgICBzZWxlY3RlZCA9IHdvcmQuaGFzQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgIGZvciAodmFyIGkgaW4gbGV0dGVycykge1xuICAgICAgICBpZiAod29yZC5wYXJlbnRzKCcucm90YXRlLTInKS5sZW5ndGggPiAwKSBsZXR0ZXJzW2ldID0gJzxlbT4nICsgbGV0dGVyc1tpXSArICc8L2VtPic7XG4gICAgICAgIGxldHRlcnNbaV0gPSAoc2VsZWN0ZWQpID8gJzxpIGNsYXNzPVwiaW5cIj4nICsgbGV0dGVyc1tpXSArICc8L2k+JyA6ICc8aT4nICsgbGV0dGVyc1tpXSArICc8L2k+JztcbiAgICAgIH1cbiAgICAgIHZhciBuZXdMZXR0ZXJzID0gbGV0dGVycy5qb2luKCcnKTtcbiAgICAgIHdvcmQuaHRtbChuZXdMZXR0ZXJzKS5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgYW5pbWF0ZUhlYWRsaW5lID0gZnVuY3Rpb24oJGhlYWRsaW5lcykge1xuICAgIHZhciBkdXJhdGlvbiA9IGFuaW1hdGlvbkRlbGF5O1xuICAgICRoZWFkbGluZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWFkbGluZSA9ICQodGhpcyk7XG5cbiAgICAgIGlmIChoZWFkbGluZS5oYXNDbGFzcygnbG9hZGluZy1iYXInKSkge1xuICAgICAgICBkdXJhdGlvbiA9IGJhckFuaW1hdGlvbkRlbGF5O1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGhlYWRsaW5lLmZpbmQoJy5jZC13b3Jkcy13cmFwcGVyJykuYWRkQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgfSwgYmFyV2FpdGluZyk7XG4gICAgICB9IGVsc2UgaWYgKGhlYWRsaW5lLmhhc0NsYXNzKCdjbGlwJykpIHtcbiAgICAgICAgdmFyIHNwYW5XcmFwcGVyID0gaGVhZGxpbmUuZmluZCgnLmNkLXdvcmRzLXdyYXBwZXInKSxcbiAgICAgICAgICBuZXdXaWR0aCA9IHNwYW5XcmFwcGVyLndpZHRoKCkgKyAxMDtcbiAgICAgICAgc3BhbldyYXBwZXIuY3NzKCd3aWR0aCcsIG5ld1dpZHRoKTtcbiAgICAgIH0gZWxzZSBpZiAoIWhlYWRsaW5lLmhhc0NsYXNzKCd0eXBlJykpIHtcbiAgICAgICAgLy9hc3NpZ24gdG8gLmNkLXdvcmRzLXdyYXBwZXIgdGhlIHdpZHRoIG9mIGl0cyBsb25nZXN0IHdvcmRcbiAgICAgICAgdmFyIHdvcmRzID0gaGVhZGxpbmUuZmluZCgnLmNkLXdvcmRzLXdyYXBwZXIgYicpLFxuICAgICAgICAgIHdpZHRoID0gMDtcbiAgICAgICAgd29yZHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgd29yZFdpZHRoID0gJCh0aGlzKS53aWR0aCgpO1xuICAgICAgICAgIGlmICh3b3JkV2lkdGggPiB3aWR0aCkgd2lkdGggPSB3b3JkV2lkdGg7XG4gICAgICAgIH0pO1xuICAgICAgICBoZWFkbGluZS5maW5kKCcuY2Qtd29yZHMtd3JhcHBlcicpLmNzcygnd2lkdGgnLCB3aWR0aCk7XG4gICAgICB9XG5cbiAgICAgIC8vdHJpZ2dlciBhbmltYXRpb25cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGhpZGVXb3JkKGhlYWRsaW5lLmZpbmQoJy5pcy12aXNpYmxlJykuZXEoMCkpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBoaWRlV29yZCA9IGZ1bmN0aW9uKCR3b3JkKSB7XG4gICAgdmFyIG5leHRXb3JkID0gdGFrZU5leHQoJHdvcmQpO1xuXG4gICAgaWYgKCR3b3JkLnBhcmVudHMoJy5jZC1oZWFkbGluZScpLmhhc0NsYXNzKCd0eXBlJykpIHtcbiAgICAgIHZhciBwYXJlbnRTcGFuID0gJHdvcmQucGFyZW50KCcuY2Qtd29yZHMtd3JhcHBlcicpO1xuICAgICAgcGFyZW50U3Bhbi5hZGRDbGFzcygnc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnd2FpdGluZycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyZW50U3Bhbi5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgJHdvcmQucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnaXMtaGlkZGVuJykuY2hpbGRyZW4oJ2knKS5yZW1vdmVDbGFzcygnaW4nKS5hZGRDbGFzcygnb3V0Jyk7XG4gICAgICB9LCBzZWxlY3Rpb25EdXJhdGlvbik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBzaG93V29yZChuZXh0V29yZCwgdHlwZUxldHRlcnNEZWxheSk7XG4gICAgICB9LCB0eXBlQW5pbWF0aW9uRGVsYXkpO1xuXG4gICAgfSBlbHNlIGlmICgkd29yZC5wYXJlbnRzKCcuY2QtaGVhZGxpbmUnKS5oYXNDbGFzcygnbGV0dGVycycpKSB7XG4gICAgICB2YXIgYm9vbCA9ICgkd29yZC5jaGlsZHJlbignaScpLmxlbmd0aCA+PSBuZXh0V29yZC5jaGlsZHJlbignaScpLmxlbmd0aCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBoaWRlTGV0dGVyKCR3b3JkLmZpbmQoJ2knKS5lcSgwKSwgJHdvcmQsIGJvb2wsIGxldHRlcnNEZWxheSk7XG4gICAgICBzaG93TGV0dGVyKG5leHRXb3JkLmZpbmQoJ2knKS5lcSgwKSwgbmV4dFdvcmQsIGJvb2wsIGxldHRlcnNEZWxheSk7XG5cbiAgICB9IGVsc2UgaWYgKCR3b3JkLnBhcmVudHMoJy5jZC1oZWFkbGluZScpLmhhc0NsYXNzKCdjbGlwJykpIHtcbiAgICAgICR3b3JkLnBhcmVudHMoJy5jZC13b3Jkcy13cmFwcGVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHdpZHRoOiAnMnB4J1xuICAgICAgfSwgcmV2ZWFsRHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICBzd2l0Y2hXb3JkKCR3b3JkLCBuZXh0V29yZCk7XG4gICAgICAgIHNob3dXb3JkKG5leHRXb3JkKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICgkd29yZC5wYXJlbnRzKCcuY2QtaGVhZGxpbmUnKS5oYXNDbGFzcygnbG9hZGluZy1iYXInKSkge1xuICAgICAgJHdvcmQucGFyZW50cygnLmNkLXdvcmRzLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgc3dpdGNoV29yZCgkd29yZCwgbmV4dFdvcmQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaGlkZVdvcmQobmV4dFdvcmQpO1xuICAgICAgfSwgYmFyQW5pbWF0aW9uRGVsYXkpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJHdvcmQucGFyZW50cygnLmNkLXdvcmRzLXdyYXBwZXInKS5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgfSwgYmFyV2FpdGluZyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoV29yZCgkd29yZCwgbmV4dFdvcmQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaGlkZVdvcmQobmV4dFdvcmQpO1xuICAgICAgfSwgYW5pbWF0aW9uRGVsYXkpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2hvd1dvcmQgPSBmdW5jdGlvbigkd29yZCwgJGR1cmF0aW9uKSB7XG4gICAgaWYgKCR3b3JkLnBhcmVudHMoJy5jZC1oZWFkbGluZScpLmhhc0NsYXNzKCd0eXBlJykpIHtcbiAgICAgIHNob3dMZXR0ZXIoJHdvcmQuZmluZCgnaScpLmVxKDApLCAkd29yZCwgZmFsc2UsICRkdXJhdGlvbik7XG4gICAgICAkd29yZC5hZGRDbGFzcygnaXMtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcblxuICAgIH0gZWxzZSBpZiAoJHdvcmQucGFyZW50cygnLmNkLWhlYWRsaW5lJykuaGFzQ2xhc3MoJ2NsaXAnKSkge1xuICAgICAgJHdvcmQucGFyZW50cygnLmNkLXdvcmRzLXdyYXBwZXInKS5hbmltYXRlKHtcbiAgICAgICAgJ3dpZHRoJzogJHdvcmQud2lkdGgoKSArIDEwXG4gICAgICB9LCByZXZlYWxEdXJhdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGlkZVdvcmQoJHdvcmQpO1xuICAgICAgICB9LCByZXZlYWxBbmltYXRpb25EZWxheSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGhpZGVMZXR0ZXIgPSBmdW5jdGlvbigkbGV0dGVyLCAkd29yZCwgJGJvb2wsICRkdXJhdGlvbikge1xuICAgICRsZXR0ZXIucmVtb3ZlQ2xhc3MoJ2luJykuYWRkQ2xhc3MoJ291dCcpO1xuXG4gICAgaWYgKCEkbGV0dGVyLmlzKCc6bGFzdC1jaGlsZCcpKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBoaWRlTGV0dGVyKCRsZXR0ZXIubmV4dCgpLCAkd29yZCwgJGJvb2wsICRkdXJhdGlvbik7XG4gICAgICB9LCAkZHVyYXRpb24pO1xuICAgIH0gZWxzZSBpZiAoJGJvb2wpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGhpZGVXb3JkKHRha2VOZXh0KCR3b3JkKSk7XG4gICAgICB9LCBhbmltYXRpb25EZWxheSk7XG4gICAgfVxuXG4gICAgaWYgKCRsZXR0ZXIuaXMoJzpsYXN0LWNoaWxkJykgJiYgJCgnaHRtbCcpLmhhc0NsYXNzKCduby1jc3N0cmFuc2l0aW9ucycpKSB7XG4gICAgICB2YXIgbmV4dFdvcmQgPSB0YWtlTmV4dCgkd29yZCk7XG4gICAgICBzd2l0Y2hXb3JkKCR3b3JkLCBuZXh0V29yZCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzaG93TGV0dGVyID0gZnVuY3Rpb24oJGxldHRlciwgJHdvcmQsICRib29sLCAkZHVyYXRpb24pIHtcbiAgICAkbGV0dGVyLmFkZENsYXNzKCdpbicpLnJlbW92ZUNsYXNzKCdvdXQnKTtcblxuICAgIGlmICghJGxldHRlci5pcygnOmxhc3QtY2hpbGQnKSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2hvd0xldHRlcigkbGV0dGVyLm5leHQoKSwgJHdvcmQsICRib29sLCAkZHVyYXRpb24pO1xuICAgICAgfSwgJGR1cmF0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCR3b3JkLnBhcmVudHMoJy5jZC1oZWFkbGluZScpLmhhc0NsYXNzKCd0eXBlJykpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkd29yZC5wYXJlbnRzKCcuY2Qtd29yZHMtd3JhcHBlcicpLmFkZENsYXNzKCd3YWl0aW5nJyk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgICB9XG4gICAgICBpZiAoISRib29sKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGlkZVdvcmQoJHdvcmQpO1xuICAgICAgICB9LCBhbmltYXRpb25EZWxheSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB0YWtlTmV4dCA9IGZ1bmN0aW9uKCR3b3JkKSB7XG4gICAgcmV0dXJuICghJHdvcmQuaXMoJzpsYXN0LWNoaWxkJykpID8gJHdvcmQubmV4dCgpIDogJHdvcmQucGFyZW50KCkuY2hpbGRyZW4oKS5lcSgwKTtcbiAgfTtcblxuICB2YXIgdGFrZVByZXYgPSBmdW5jdGlvbigkd29yZCkge1xuICAgIHJldHVybiAoISR3b3JkLmlzKCc6Zmlyc3QtY2hpbGQnKSkgPyAkd29yZC5wcmV2KCkgOiAkd29yZC5wYXJlbnQoKS5jaGlsZHJlbigpLmxhc3QoKTtcbiAgfTtcblxuICB2YXIgc3dpdGNoV29yZCA9IGZ1bmN0aW9uKCRvbGRXb3JkLCAkbmV3V29yZCkge1xuICAgICRvbGRXb3JkLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xuICAgICRuZXdXb3JkLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICB9O1xuXG4gIHZhciBpbml0SGVhZGxpbmUgPSBmdW5jdGlvbigpIHtcbiAgICAvL2luc2VydCA8aT4gZWxlbWVudCBmb3IgZWFjaCBsZXR0ZXIgb2YgYSBjaGFuZ2luZyB3b3JkXG4gICAgc2luZ2xlTGV0dGVycygkKCcuY2QtaGVhZGxpbmUubGV0dGVycycpLmZpbmQoJ2InKSk7XG4gICAgLy9pbml0aWFsaXNlIGhlYWRsaW5lIGFuaW1hdGlvblxuICAgIGFuaW1hdGVIZWFkbGluZSgkKCcuY2QtaGVhZGxpbmUnKSk7XG4gIH07XG5cbiAgaW5pdEhlYWRsaW5lKCk7XG5cbiAgLy8gdmFyIHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ZpZGVvJylbMF07XG4gIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsZnVuY3Rpb24oKXtcbiAgLy8gICB2aWRlby5wbGF5KCk7XG4gIC8vIH0sIGZhbHNlKTtcblxuICB2YXIgc2xpZGVOYXZVcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vICQoJyNuYXYtbWFpbicpLnZlbG9jaXR5KHtcbiAgICAvLyAgIHRyYW5zbGF0ZVk6ICcwJSdcbiAgICAvLyB9KTtcbiAgICAkKCcjbmF2LW1haW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gIH07XG5cbiAgdmFyIHNsaWRlTmF2RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vICQoJyNuYXYtbWFpbicpLnZlbG9jaXR5KHtcbiAgICAvLyAgIHRyYW5zbGF0ZVk6ICc4MCUnXG4gICAgLy8gfSk7XG4gICAgJCgnI25hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9O1xuXG4gIHZhciBvcGVuTmF2RHJhd2VyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gJCgnI25hdi1tYWluJykudmVsb2NpdHkoe1xuICAgIC8vICAgdHJhbnNsYXRlWDogJzAlJ1xuICAgIC8vIH0pO1xuICAgICQoJyNuYXYtbWFpbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCcubmF2LWJ0biBidXR0b24nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnLm5hdi1idG4gYnV0dG9uJykub2ZmKCdjbGljaycpO1xuICAgICQoJy5uYXYtYnRuIGJ1dHRvbicpLm9uKCdjbGljaycsIGNsb3NlTmF2RHJhd2VyKTtcbiAgfTtcblxuICB2YXIgY2xvc2VOYXZEcmF3ZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyAkKCcjbmF2LW1haW4nKS52ZWxvY2l0eSh7XG4gICAgLy8gICB0cmFuc2xhdGVYOiAnLTEwMCUnXG4gICAgLy8gfSk7XG4gICAgJCgnI25hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoJy5uYXYtYnRuIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCcubmF2LWJ0biBidXR0b24nKS5vZmYoJ2NsaWNrJyk7XG4gICAgJCgnLm5hdi1idG4gYnV0dG9uJykub24oJ2NsaWNrJywgb3Blbk5hdkRyYXdlcik7XG4gIH07XG5cbiAgdmFyIG5hdlNsaWRlQmluZCA9IGZhbHNlO1xuICB2YXIgbmF2RHJhd2VyQmluZCA9IGZhbHNlO1xuXG4gIHZhciBpbml0TmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgdmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICBpZiAod2lkdGggPj0gNzY4KSB7XG4gICAgICAvLyAkKCcjbmF2LW1haW4nKVxuICAgICAgLy8gICAudmVsb2NpdHkoe1xuICAgICAgLy8gICAgIHRyYW5zbGF0ZVg6ICcwJSdcbiAgICAgIC8vICAgfSwgeyBkdXJhdGlvbjogJ2Zhc3QnIH0pXG4gICAgICAvLyAgIC8vIC52ZWxvY2l0eSh7XG4gICAgICAvLyAgIC8vICAgdHJhbnNsYXRlWTogJzAlJ1xuICAgICAgLy8gICAvLyB9LCBcImVhc2VcIilcbiAgICAgIC8vICAgLnZlbG9jaXR5KHtcbiAgICAgIC8vICAgICB0cmFuc2xhdGVZOiAnODAlJ1xuICAgICAgLy8gICB9LCB7IGR1cmF0aW9uOiAnZmFzdCcgfSk7XG5cbiAgICAgICQoJy5uYXYtYnRuIGJ1dHRvbicpLnVuYmluZCgnY2xpY2snLCBvcGVuTmF2RHJhd2VyKTtcbiAgICAgIC8vICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgY2xvc2VOYXZEcmF3ZXIpO1xuICAgICAgbmF2RHJhd2VyQmluZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoIW5hdlNsaWRlQmluZCkge1xuICAgICAgICAkKCcjbmF2LW1haW4nKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgJCgnI25hdi1tYWluJykub2ZmKCdtb3VzZWxlYXZlJyk7XG4gICAgICAgICQoJyNuYXYtbWFpbicpLm9uKCdtb3VzZWVudGVyJywgc2xpZGVOYXZVcCk7XG4gICAgICAgICQoJyNuYXYtbWFpbicpLm9uKCdtb3VzZWxlYXZlJywgc2xpZGVOYXZEb3duKTtcbiAgICAgICAgbmF2U2xpZGVCaW5kID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyAkKCcjbmF2LW1haW4nKVxuICAgICAgLy8gICAudmVsb2NpdHkoe1xuICAgICAgLy8gICAgIHRyYW5zbGF0ZVk6ICcwJSdcbiAgICAgIC8vICAgfSwgeyBkdXJhdGlvbjogJ2Zhc3QnIH0pXG4gICAgICAvLyAgIC52ZWxvY2l0eSh7XG4gICAgICAvLyAgICAgdHJhbnNsYXRlWDogJy0xMDAlJ1xuICAgICAgLy8gICB9LCB7IGR1cmF0aW9uOiAnZmFzdCcgfSk7XG5cbiAgICAgICQoJyNuYXYtbWFpbicpLnVuYmluZCgnbW91c2VlbnRlcicsIHNsaWRlTmF2VXApO1xuICAgICAgJCgnI25hdi1tYWluJykudW5iaW5kKCdtb3VzZWxlYXZlJywgc2xpZGVOYXZEb3duKTtcbiAgICAgIG5hdlNsaWRlQmluZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoIW5hdkRyYXdlckJpbmQpIHtcbiAgICAgICAgJCgnLm5hdi1idG4gYnV0dG9uJykub2ZmKCdjbGljaycpO1xuICAgICAgICAkKCdib2R5Jykub2ZmKCdjbGljaycpO1xuICAgICAgICAkKCcubmF2LWJ0biBidXR0b24nKS5vbignY2xpY2snLCBvcGVuTmF2RHJhd2VyKTtcbiAgICAgICAgLy8gJCgnYm9keScpLm9uKCdjbGljaycsIGNsb3NlTmF2RHJhd2VyKTtcbiAgICAgICAgbmF2RHJhd2VyQmluZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJCgnI25hdi1tYWluJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGluaXROYXZiYXIoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gIH0pO1xuXG4gIGluaXROYXZiYXIoKTtcblxuICB2YXIgaW5pdE5ld3NCbG9jayA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zbGljayh7XG4gICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgY2VudGVyUGFkZGluZzogJzYwcHgnLFxuICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgLy8gYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgYnJlYWtwb2ludDogNzcwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNDBweCcsXG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNDBweCcsXG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSk7XG4gIH07XG5cbiAgaW5pdE5ld3NCbG9jaygkKCcubmV3cy1zbGljaycpKTtcblxuICAvLyBTY3JvbGwgdG8gZGl2IGV2ZW50XG4gIHZhciBpbml0U2Nyb2xsRXZlbnQgPSBmdW5jdGlvbiAoY2xpY2tFbCwgdG9FbCkge1xuICAgICQoY2xpY2tFbCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAkKHRvRWwpLnZlbG9jaXR5KCdzY3JvbGwnLCB7XG4gICAgICAgIHNjcm9sbFRvcDogdG9FbC5vZmZzZXQoKS50b3AgLSAxMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBpbml0U2Nyb2xsRXZlbnQoJCgnLm5hdi1uZXdzJyksICQoJ3NlY3Rpb24ubmV3cycpKTtcbiAgaW5pdFNjcm9sbEV2ZW50KCQoJy5uYXYtc3BlYWtlcnMnKSwgJCgnc2VjdGlvbi5zcGVha2VycycpKTtcbiAgaW5pdFNjcm9sbEV2ZW50KCQoJy5uYXYtcGFydG5lcnMnKSwgJCgnc2VjdGlvbi5wYXJ0bmVycycpKTtcbiAgaW5pdFNjcm9sbEV2ZW50KCQoJy5uYXYtc3RhZmYnKSwgJCgnc2VjdGlvbi5zdGFmZicpKTtcbiAgaW5pdFNjcm9sbEV2ZW50KCQoJy5uYXYtbG9jYXRpb24nKSwgJCgnc2VjdGlvbi5sb2NhdGlvbicpKTtcblxuICB2YXIgZWxldmF0b3IgPSBuZXcgRWxldmF0b3Ioe1xuICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbGV2YXRvci1idG4nKSxcbiAgICBtYWluQXVkaW86ICcvbXVzaWMvZWxldmF0b3IubXAzJyxcbiAgICBlbmRBdWRpbzogJy9tdXNpYy9kaW5nLm1wMydcbiAgfSk7XG5cbiAgdmFyIGxheXpyID0gbmV3IExheXpyKCk7XG59KTtcbiJdLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy9zY3JpcHRzIn0=