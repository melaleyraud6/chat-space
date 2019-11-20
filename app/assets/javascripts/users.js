$(function() {

  function addUser(user) {
    var html = `
                <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= "${user.id}" data-user-name = "${user.name}">追加</a>
                </div>
               `;
               
    $("#user-search-result").append(html);
  }
  function addNoUser() {
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">該当するユーザーが見つかりません</p>
                </div>
               `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    var html = `
                <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-3265">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div> `;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    let input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            addUser(user);
            
          });
        } else if ( input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  });
  $(document).on("click",".chat-group-user__btn--add",function(){
      //  console.log("イベント発火");
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click",".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  })
});