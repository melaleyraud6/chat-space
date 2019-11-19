$(function(){
  function buildMessage(message){
    var body = message.body ? `${message.body}` : "";
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message">
                <div class="message__upper-info">
                <div class="message__upper-info__talker">
                ${message.user_name}
                </div>
                <div class="message__upper-info__date">
                ${message.created_at}
                </div>
                </div>
                <div class="message_text">
                <p class="message_text__content">
                  <div>
                  ${body}
                  </div>
                  ${image}
                </p>
                
                </div>
                </div>`
    return html;
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $("#new_message")[0].reset('');
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
       alert("メッセージ送信に失敗しました");
    })
  })
});