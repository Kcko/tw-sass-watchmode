$(function () {

  $.nette.ext('test', {

    before: function (jqXHR, settings) {
      //console.log($(settings.nette.el)[0].id);
    },
    success: function (payload) {

      //console.log("payload:", payload);
    }
  });

  $.nette.init();


	$('.m-modal').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
  });
  

  $('.popup-gallery').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      }
    });  
  });


  if ($('#inactivity-logout').length) {

    var logoutInterval; 
    var debounce;
  
    var logout = function () {
      console.log('spousti se timeout na odhlaseni');
      logoutInterval = setTimeout(function () { 
        console.log('ODHLASENI');
        window.location.href = $('#inactivity-logout').data('url');
      }, $('#inactivity-logout').data('time'));
    };
  
    logout();
  
    $(document).on('keyup mousemove paste change click focus scroll', function (e) {
      clearTimeout(debounce);
      clearTimeout(logoutInterval);
      console.log('clear');
      debounce = setTimeout(function () {
        logout();
      }, 500);
    });
  }


  
});



