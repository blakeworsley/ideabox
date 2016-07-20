var ideas = [];

function Idea (title, body, rank){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.rank = rank;
}


$('.save-button').on('click', function(event) {
  event.preventDefault();
  var userInputTitle = $('.input-title').val();
  var userInputBody = $('.input-body').val();
  var buildNewIdea = new Idea(userInputTitle, userInputBody);
  ideas.push(buildNewIdea);
  $('.all-ideas').prepend(
  '<li class="user-idea">' +
    '<h3 class="user-idea-title">' + userInputTitle + '</h3>' +
    '<img src="img/delete.svg" class="idea-button delete">' +
    '<p class="user-idea-body">' + userInputBody + '</p>' +
    '<img src="img/upvote.svg" class="idea-button upvote">' +
    '<img src="img/downvote.svg" class="idea-button downvote">' +
    '<p class="ranking">ranking: swill</p>' +
  '</li>'
  );
});
