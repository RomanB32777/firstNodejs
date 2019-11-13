// $(function() {
//
//   // var editor = new MediumEditor('#post-body', {
//   //   placeholder: {
//   //     text: '',
//   //     hideOnClick: true
//   //   }
//   // });
//
//   // clear
//   $('.post-form input, #post-body').on('focus', function() {
//     $('.post-form p.error').remove();
//     $('.post-form input, #post-body').removeClass('error');
//   });
//
//   // publish
//   $('.publish-button').on('click', function(e) {
//     e.preventDefault();
//
//     var data = {
//       title: $('#post-title').val(),
//       body: $('#post-body').val()
//     };
//
//     $.ajax({
//       type: 'POST',
//       data: JSON.stringify(data),
//       contentType: 'application/json',
//       url: '/post/add'
//     }).done(function(data) {
//       console.log(data);
//       if (!data.ok) {
//         $('.post-form h2').after('<p class="error">' + data.error + '</p>');
//         if (data.fields) {
//           data.fields.forEach(function(item) {
//             $('#post-' + item).addClass('error');
//           });
//         }
//       } else {
//         // $('.register h2').after('<p class="success">Отлично!</p>');
//         $(location).attr('href', '/');
//       }
//     });
//   });
// });






$(function() {
  // remove errors
  function removeErrors() {
    $('.post-form p.error').remove();
    $('.post-form input, #post-body').removeClass('error');
  }

  // clear
  $('.post-form input, #post-body').on('focus', function() {
    removeErrors();
  });

  // publish
  $('.publish-button, .save-button').on('click', function(e) {
    e.preventDefault();
    removeErrors();

    var isDraft =
      $(this)
        .attr('class')
        .split(' ')[0] === 'save-button';

    var data = {
      title: $('#post-title').val(),
      body: $('#post-body').val(),
      isDraft: isDraft,
      postId: $('#post-id').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/post/add'
    }).done(function(data) {
      console.log(data);
      if (!data.ok) {
        $('.post-form h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('#post-' + item).addClass('error');
          });
        }
      } else {
        // $('.register h2').after('<p class="success">Отлично!</p>');
        // $(location).attr('href', '/');
        if (isDraft) {
          $(location).attr('href', '/post/edit/' + data.post.id);
        } else {
          $(location).attr('href', '/posts/' + data.post.url);
        }
      }
    });
  });




  // upload
  $('#file').on('change', function() {
    // e.preventDefault();

    var formData = new FormData();
    formData.append('postId', $('#post-id').val());
    formData.append('file', $('#file')[0].files[0]);

    $.ajax({
      type: 'POST',
      url: '/upload/image',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log(data);
        $('#fileinfo').prepend(
          '<div class="img-container"><img src="' +
            data.filePath +
            '" alt="" /></div><div class="del_photo">X</div>'
        );
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

$('.del_photo').on('click', function () {
  // e.preventDefault();
 var removeDivPhoto = '#' + $(this).parent().attr('id');
 console.log(removeDivPhoto);
 //let photo = $(this).parent().find('img').data('id');

 var data = {
    photo: $(this).parent().find('img').data('id'),
    post: $('#post-id').val(),
    path: $(this).parent().find('img').attr('src')
 }



//  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/delete/image',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(data) {
     console.log(data);
    // $('#fileinfo').remove($(this));
     //console.log();
      $(removeDivPhoto).remove();
    },
    error: function(e) {
      //console.log(e);
    }
  });
});

$('.DeletePost').on('click', function () {

  var data = {
    postId: $('#post-id').val()
  };

  $.ajax({
    type: 'POST',
    url: '/delete/post',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
 console.log(data);
    },
    error: function () {

    }
  });

});


});
