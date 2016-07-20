var userInputTitle = $('.input-title');
var userInputBody = $('.input-body');
var allIdeas = [];

function getIdeas() {
}

function Idea (title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
}

function createOutput(title, body) {
$('.all-ideas').prepend(
  `<li class="user-idea">
    <h3 class="user-idea-title">${title}</h3>
    <button class="idea-button delete" type="button"></button>
    <p class="user-idea-body">${body}</p>
    <footer class="idea-footer">
    <button class="idea-button upvote" type="button"></button>
    <button class="idea-button downvote" type="button"></button>
    <p class="ranking">quality: swill</p>
    </footer>
   </li>`
  );
};

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var title = userInputTitle.val();
  var body = userInputBody.val();
  var buildNewIdea = new Idea(title, body);
  allIdeas.push(buildNewIdea);
  var userIdeas = createOutput(title, body);
  localStorage.setItem('ideas', JSON.stringify(allIdeas));
  JSON.parse(localStorage.getItem('ideas'));
});
