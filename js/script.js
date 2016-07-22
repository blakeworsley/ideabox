var $userInputTitle = $('.input-title');
var $userInputBody = $('.input-body');
var $searchValue = $('.search-input');
var qualities = ['swill', 'plausible', 'genius'];

function checkIdeas() {
  var currentIdeas = localStorage.getItem("ideas");
  if (currentIdeas === null || currentIdeas === undefined) {
    localStorage.setItem("ideas", JSON.stringify([]))
  }
}

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

Idea.prototype.storeIdea = function(idea) {
  var newIdeas = getAndParseIdeas();
  newIdeas.push(idea)
  localStorage.setItem("ideas", JSON.stringify(newIdeas))
}

var deleteIdeaFromStorage = function(ideaId) {
  var currentIdeas = getAndParseIdeas();
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
  $('.delete').on('click', function() {
    var $idea = $(this).parent()
    deleteIdeaFromStorage($idea.data("id"))
    $idea.remove();
  });
}


function getIdeasFromStorageAndAppendThem() {
  var ideas = getAndParseIdeas();
  if (typeof ideas[0] !== "object") {
  } else {
    for (var i = 0; i < ideas.length; i++) {
      createOutput(ideas[i]);
    }
  }
  deleteIdeasFromDom();
  downvoteIdea();
  upvoteIdea();
}

function createOutput(idea) {
  $('.all-ideas').prepend(
    `<li class="user-idea" data-id=${idea.id}>
      <h3 class="user-idea-title user-search-content">${idea.title}</h3>
      <button class="idea-button delete" type="button"></button>
      <p class="user-idea-body user-search-content">${idea.body}</p>
      <footer class="idea-footer">
      <button class="idea-button upvote" type="button"></button>
      <button class="idea-button downvote" type="button"></button>
      <p class="quality">quality: ${idea.quality}</p>
      </footer>
     </li>`
  );
};

function upvoteIdea() {
  $('.upvote').on('click', function(event) {
    var $ideaId = $(this).parent().parent().data('id');
    var ideas = getAndParseIdeas();
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id === $ideaId) {
        ideas[i].quality = incrementQuality(ideas[i]);
        localStorage.setItem('ideas', JSON.stringify(ideas));
      }
    };
    $('.all-ideas').children().remove();
    getIdeasFromStorageAndAppendThem();
  });
}

function incrementQuality(idea) {
  if (idea.quality !== 'genius') {
    for (var i = 0; i < qualities.length; i++) {
      if (idea.quality === qualities[i]) {
        return qualities[i + 1];
      }
    };
  } else {
    return 'genius';
  };
}

function downvoteIdea() {
  $('.downvote').on('click', function(event) {
    var $ideaId = $(this).parent().parent().data('id');
    var ideas = getAndParseIdeas();
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id === $ideaId) {
        ideas[i].quality = decrementQuality(ideas[i]);
        localStorage.setItem('ideas', JSON.stringify(ideas));
      }
    };
    $('.all-ideas').children().remove();
    getIdeasFromStorageAndAppendThem();
  });
}

function decrementQuality(idea) {
  if (idea.quality !== 'swill') {
    for (var i = 0; i < qualities.length; i++) {
      if (idea.quality === qualities[i]) {
        return qualities[i - 1];
      }
    };
  } else {
    return 'swill';
  };
}

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var title = $userInputTitle.val();
  var body = $userInputBody.val();
  var newIdea = new Idea(title, body);
  newIdea.storeIdea(newIdea);
  $('.all-ideas').children().remove();
  getIdeasFromStorageAndAppendThem();
  $userInputTitle.val('');
  $userInputBody.val('');
});

$('.search-input').on('keyup', function(event) {
  event.preventDefault();
  var $searchBox = $(this).val().toLowerCase();
  var ideas = $('.all-ideas').children();
  ideas.show();
  var hideIdeas = ideas.filter(function() {
    var allIdeas = $(this).children('.user-search-content').text();
    var search = (allIdeas).toLowerCase();
    return !(search.includes($searchBox));
  })
  hideIdeas.hide();
});

checkIdeas();
getIdeasFromStorageAndAppendThem();
