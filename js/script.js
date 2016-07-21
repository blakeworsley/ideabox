var userInputTitle = $('.input-title');
var userInputBody = $('.input-body');
var searchValue = $('.search-input');
var allIdeas = [];
var qualities = ['swill', 'plausible', 'genius'];
//                  0           1          2

//push adds to array. push removes from array


function Idea (title, body, quality){
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.id = Date.now();
}

function deleteIdeas() {
  $('.delete').on('click', function(){
    $(this).parent().remove();
  });
}

//TODO: Disable Downvote function disableDownvote()

// function currentI() {
//   if (this.quality === "swill"){
//     return 0;
//   }
//   if (this.quality === "plausible"){
//     return 1;
//   }
//   if (this.quality === "genius"){
//     return 2;
//   }
// }

// var i = currentI()
function currentQuality(i) {
  for ( i; i < qualities.length; i++) {
    if (i === 2) {
      return 'genius';
    }
    if (i === 1) {
      i++;
      return 'genius';
    }
    if (i === 0) {
      i++;
      return 'plausible';
    }
  }
}

function upvoteIdeas() {
  var i = 0
  $('.upvote').on('click', function(){
    $(this).siblings('.quality').text('quality: ' + currentQuality(i));
    //select the .quality and change quality to
  });
}

//TODO: if you add new idea to current stored ideas / stored ideas are deleted
Idea.prototype.storeIdea = function () {
  localStorage.setItem('ideas', JSON.stringify(allIdeas));
};

function returnIdeas() {
  return JSON.parse(localStorage.getItem('ideas'));
}
//
// function getIdeasFromStorageAndAppendThem() {
//   var ideas = returnIdeas();
//   for (var idea of ideas) {
//     createOutput(idea.title, idea.body);
//   }
//   deleteIdeas()
// }


function getIdeasFromStorageAndAppendThem() {
  var ideas = returnIdeas();
  for (var i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    createOutput(idea.title, idea.body);
  }
  deleteIdeas();
  upvoteIdeas();
}
// Block.prototype.moveRight = function () {
//   this.x = this.x + 1;
//   return this;

function createOutput(title, body) {
  $('.all-ideas').prepend(
    `<li class="user-idea">
      <h3 class="user-idea-title">${title}</h3>
      <button class="idea-button delete" type="button"></button>
      <p class="user-idea-body">${body}</p>
      <footer class="idea-footer">
      <button class="idea-button upvote" type="button"></button>
      <button class="idea-button downvote" type="button"></button>
      <p class="quality">quality: ${qualities[0]}</p>
      </footer>
     </li>`
  );
}

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var title = userInputTitle.val();
  var body = userInputBody.val();
  var buildNewIdea = new Idea(title, body);
  var userIdeas = createOutput(title, body);
  allIdeas.push(buildNewIdea);
  buildNewIdea.storeIdea();
  deleteIdeas();
  upvoteIdeas();
});

getIdeasFromStorageAndAppendThem();
// $('.search-input').on('keyup', function() {
//   var searchedValue = $('.layout-section-user-output').has('.user-idea-title').val(searchValue.val());
//   // allIdeas.title = searchedValue;
// });
