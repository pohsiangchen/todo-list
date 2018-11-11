$(function () {
  $('.check-todo').change(function() {
    var chkbx=$(this);
    $.ajax({
      url: '/todos',
      type: 'PATCH',
      data : {
        done: chkbx.is(':checked'),
        id: chkbx.data().id
      },
      success: function(result) {
        console.log(result);
        if (chkbx.is(':checked')) {
          $('#' + chkbx.data().id).replaceWith("<s id=" + chkbx.data().id + ">" + chkbx.data().name +"</s>");
        } else {
          $('#' + chkbx.data().id).replaceWith("<span id=" + chkbx.data().id + ">" + chkbx.data().name +"</span>");
        }
      }
    });
  });
});
