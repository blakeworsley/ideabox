var ideas = [];
var userInputTitle = $('.input-title');
var userInputBody = $('.input-body');

function Idea (title, body, rank){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.rank = rank;
}

function createOutput(title, body) {
$('.all-ideas').prepend(
  `<li class="user-idea">
    <h3 class="user-idea-title">${title}</h3>
    <button class="id-button delete" type="button"></button>
    <p class="user-idea-body">${body}</p>
    <footer class="idea-footer">
    <button class="id-button upvote" type="button"></button>
    <button class="id-button downvote" type="button"></button>
    <p class="ranking">quality: swill</p>
    </footer>
   </li>`
  );
};

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var title = userInputTitle.val();
  var body = userInputBody.val();
  var buildNewIdea = new Idea(userInputTitle, userInputBody);
  ideas.push(buildNewIdea);
  var userIdeas = createOutput(title, body);
});
