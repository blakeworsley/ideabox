var userInputTitle = $('.input-title');
var userInputBody = $('.input-body');
var searchValue = $('.search-input');
var allIdeas = [];
var qualities = ['swill', 'plausible', 'genius'];
//                  0           1          2

//push adds to array. push removes from array


function Idea (title, body){
  this.title = title;
  this.body = body;
  this.quality = qualities[0];
  this.id = Date.now();
}
// Idea.prototype.newQuality = function() {
//   this.arrayNumber = function upvote() {
//     if (current < 2) {
//       current++;
//     }
//   current =
//   this.quality = qualities[current];
//   }

function deleteIdeas() {
    $('.delete').on('click', function(){
      $(this).parent().remove();
    });
  }
//TODO: Disable Downvote function disableDownvote()


// .map

function currentQuality(i) {
  for (var i = 0; i < qualities.length; i++) {
    if (qualities[i] === 2) {return 'genius'};
    if (qualities[i] === 1) {return 'genius'};
    if (qualities[i] === 0) {return 'plausible'};
    }
  }
}

function upvotedQuality() {
  var currentQuality = this.quality;
  console.log(currentQuality);
}

function upvoteIdeas() {
  $('.upvote').on('click', function(){
    $(this).siblings('.quality').text('quality: ' + upvotedQuality());
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

function getIdeasFromStorageAndAppendThem() {
  var ideas = returnIdeas();
  for (var i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    createOutput(idea.title, idea.body);
  }
  deleteIdeas();
  upvoteIdeas();
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
