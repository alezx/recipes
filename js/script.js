$(document).ready(function(){



  $('#photos_inner img').click(
    function() {
      var src = $(this).attr('src');
      console.log(src);
      var start = src.lastIndexOf("/");
      var end = src.lastIndexOf(".");
      var folder = src.substring(start+1,end);
      console.log('folder = '+folder);
      $('.foto-ricetta img').attr('src',src);
      $.get('content/primi/'+folder+'/ingredienti.html', function(data) {
        $('.ingredienti div').html(data);
      });
      $.get('content/primi/'+folder+'/nome.html', function(data) {
        $('.ingredienti h3').html(data);
      });

      $.ajax({
        url: 'content/primi/'+folder+'/ricetta.html',
        type: 'GET',
        success: function(data){
          $('.ricetta div').html(data);
        },
        error: function(data) {
          $('.ricetta div').html(data);
        }
      });


    });




  $('.slider-right').click(function(){
    var scrollAmount = $('#photos_inner').width() - $('#photos_inner').parent().width();
    var currentPos = Math.abs(parseInt($('#photos_inner').css('left'),10));
    var remainingScroll = scrollAmount - currentPos;

    var nextScroll = Math.floor($('#photos_inner').parent().width() / 2);

    if (remainingScroll < nextScroll) {
      nextScroll = remainingScroll;
    }

    if (currentPos < scrollAmount) {

      $('#photos_inner').animate({'left':'-=' + nextScroll}, 'slow');
    }
    else {
      $('#photos_inner').animate({'left':'0'}, 'fast');
    }
  });


  $('.slider-right').hover(function() {
    var toScroll = Math.floor($('#photos_inner').parent().width());
    $('#photos_inner').stop().animate({'left':'-=' + toScroll}, 5000);
  },function() {
    $('#photos_inner').stop();
  });

  $('.slider-left').hover(function() {
    var toScroll = Math.floor($('#photos_inner').parent().width());
    $('#photos_inner').stop().animate({'left':'+=' + toScroll}, 5000);
  },function() {
    $('#photos_inner').stop().css('left',0);
  });

});
