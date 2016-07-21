'use strict'

const userInputTitle = $('.input-title');
const userInputBody = $('.input-body');
const searchValue = $('.search-input');

function checkIdeas() {
  let currentIdeas = localStorage.getItem("ideas");
  if (currentIdeas === null || currentIdeas === undefined) {
    localStorage.setItem("ideas", JSON.stringify([]))
  }
}

function Idea (title, body, quality){
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.id = Date.now();
}

Idea.prototype.storeIdea = function (idea) {
  let newIdeas = JSON.parse(localStorage.getItem("ideas"))
  newIdeas.push(idea)
  localStorage.setItem("ideas", JSON.stringify(newIdeas))
}

const deleteIdeaFromStorage = function(ideaId) {
  let currentIdeas = JSON.parse(localStorage.getItem('ideas'))
  currentIdeas.forEach(function(idea, index) {
    if (idea.id === ideaId) {
      currentIdeas.splice(index, 1)
      localStorage.setItem('ideas', JSON.stringify(currentIdeas))
    }
  })
}

function getAndParseIdeas() {
  return JSON.parse(localStorage.getItem('ideas'));
}

function deleteIdeasFromDom() {
  $('.delete').on('click', function(){
    let $idea = $(this).parent()
    deleteIdeaFromStorage($idea.data("id"))
    $idea.remove();
  });
}


function getIdeasFromStorageAndAppendThem() {
  let ideas = getAndParseIdeas();
  if (typeof ideas[0] !== "object") {
    console.log("NOTHINGGG");
  } else {
    for (let i = 0; i < ideas.length; i++) {
      let idea = ideas[i]
      createOutput(idea.title, idea.body, idea.id);
    }
    deleteIdeasFromDom()
  }
}

function createOutput(title, body, ideaId) {
  $('.all-ideas').prepend(
    `<li class="user-idea" data-id=${ideaId}>
      <h3 class="user-idea-title">${title}</h3>
      <button class="idea-button delete" type="button"></button>
      <p class="user-idea-body">${body}</p>
      <footer class="idea-footer">
      <button class="idea-button upvote" type="button"></button>
      <button class="idea-button downvote" type="button"></button>
      <p class="quality">quality: swill</p>
      </footer>
     </li>`
  );
};

$('.save-button').on('click', function(event) {
  event.preventDefault();
  const title = userInputTitle.val();
  const body = userInputBody.val();
  const newIdea = new Idea(title, body);
  createOutput(title, body, newIdea.id);
  newIdea.storeIdea(newIdea);
  deleteIdeasFromDom();
});

checkIdeas();
getIdeasFromStorageAndAppendThem()


// $('.search-input').on('keyup', function() {
//   var searchedValue = $('.layout-section-user-output').has('.user-idea-title').val(searchValue.val());
//   // allIdeas.title = searchedValue;
// });
