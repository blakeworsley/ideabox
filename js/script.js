var $userInputTitle = $('.input-title-js');
var $userInputBody = $('.input-body-js');
var $searchValue = $('.search-input-js');
var qualities = ['swill', 'plausible', 'genius'];

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

Idea.prototype.storeIdea = function(idea) {
  var newIdeas = getAndParseIdeas();
  newIdeas.push(idea);
  localStorage.setItem("ideas", JSON.stringify(newIdeas));
};

function checkIdeas() {
  var currentIdeas = localStorage.getItem("ideas");
  if (currentIdeas === null || currentIdeas === undefined) {
    localStorage.setItem("ideas", JSON.stringify([]));
  }
}

function getAndParseIdeas() {
  return JSON.parse(localStorage.getItem('ideas'));
}

function deleteIdeaFromStorage(ideaId) {
  var currentIdeas = getAndParseIdeas();
  currentIdeas.forEach(function(idea, index) {
    if (idea.id === ideaId) {
      currentIdeas.splice(index, 1);
      localStorage.setItem('ideas', JSON.stringify(currentIdeas));
    }
  });
}

function deleteIdeasFromDom() {
  $('.delete-js').on('click', function() {
    var $idea = $(this).parent();
    deleteIdeaFromStorage($idea.data("id"));
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
  $('.all-ideas-js').prepend(
    `<li class="user-idea-js user-idea" data-id=${idea.id}>
    <h3 contenteditable id=${idea.id} class="user-idea-title-js-${idea.id} user-search-content-js user-idea-title user-search-content">${idea.title}</h3>
    <button class="idea-button-js delete-js idea-button delete" type="button"></button>
    <p contenteditable id=${idea.id} class="user-idea-body-js-${idea.id} user-search-content-js user-idea-body user-search-content">${idea.body}</p>
    <footer class="idea-footer-js idea-footer">
    <button class="idea-button-js upvote-js idea-button upvote" type="button"></button>
    <button class="idea-button-js downvote-js idea-button downvote" type="button"></button>
    <p class="quality-js quality">quality: ${idea.quality}</p>
    </footer>
    </li>`
  );
  $('.save-button-js').prop('disabled', true);
}

function upvoteIdea() {
  $('.upvote-js').on('click', function(event) {
    var $ideaId = $(this).parents('li').data('id');
    var ideas = getAndParseIdeas();
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id === $ideaId) {
        ideas[i].quality = incrementQuality(ideas[i]);
        localStorage.setItem('ideas', JSON.stringify(ideas));
      }
    }
    $('.all-ideas-js').children().remove();
    getIdeasFromStorageAndAppendThem();
  });
}

function incrementQuality(idea) {
  if (idea.quality !== 'genius') {
    for (var i = 0; i < qualities.length; i++) {
      if (idea.quality === qualities[i]) {
        return qualities[i + 1];
      }
    }
  } else {
    return qualities[2];
  }
}

function downvoteIdea() {
  $('.downvote-js').on('click', function(event) {
    var $ideaId = $(this).parents('li').data('id');
    var ideas = getAndParseIdeas();
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id === $ideaId) {
        ideas[i].quality = decrementQuality(ideas[i]);
        localStorage.setItem('ideas', JSON.stringify(ideas));
      }
    }
    $('.all-ideas-js').children().remove();
    getIdeasFromStorageAndAppendThem();
  });
}

function decrementQuality(idea) {
  if (idea.quality !== 'swill') {
    for (var i = 0; i < qualities.length; i++) {
      if (idea.quality === qualities[i]) {
        return qualities[i - 1];
      }
    }
  } else {
    return qualities[0];
  }
}


$('.save-button-js').on('click', function(event) {
  event.preventDefault();
  var title = $userInputTitle.val();
  var body = $userInputBody.val();
  var newIdea = new Idea(title, body);
  newIdea.storeIdea(newIdea);
  $('.all-ideas-js').children().remove();
  getIdeasFromStorageAndAppendThem();
  $userInputTitle.val('');
  $userInputBody.val('');
});

$('.search-input-js').on('keyup', function(event) {
  event.preventDefault();
  var $searchBox = $(this).val().toLowerCase();
  var ideas = $('.all-ideas-js').children();
  ideas.show();
  var hideIdeas = ideas.filter(function() {
    var allIdeas = $(this).children('.user-search-content-js').text();
    var search = (allIdeas).toLowerCase();
    return !(search.includes($searchBox));
  });
  hideIdeas.hide();
});

$('.input-field-size-js').on('keyup', function(event) {
  event.preventDefault();
  if ($userInputTitle.val().length > 0 && $userInputBody.val().length > 0) {
    $('.save-button-js').prop('disabled', false);
  } else {
    $('.save-button-js').prop('disabled', true);
  }
});

$('.all-ideas-js').on('click', '.user-search-content-js', function(event) {
  var $ideaId = parseInt(this.id);
  var $ideaTitle = $(this).text();
  var $ideaBody = $(this).text();
  var ideas = getAndParseIdeas();
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === $ideaId) {
      ideas[i].title = $ideaTitle;
      ideas[i].body = $ideaBody;
      }
    };
  localStorage.setItem('ideas', JSON.stringify(ideas));
  console.log(localStorage.getItem('ideas'));
});

// $('.all-ideas-js').on('blur', 'user-search-content-js', function(event){
//     var $ideaId = parseInt(this.id);
//     var ideas = getAndParseIdeas();
//     for (var i = 0; i < ideas.length; i++) {
//       if (ideas[i].id === $ideaId) {
//         ideas[i].title = $(`.user-idea-title-js-${$ideaId}`).text()
//         ideas[i].body = $(`.user-idea-body-js-${$ideaId}`).text()
//       }
//     }
//     localStorage.setItem('ideas', JSON.stringify(ideas));
//   });


// $('.all-ideas-js').on('click', '.user-search-content-js', function(event) {
//   var self = this;
//   $('.user-search-content-js').prop('contenteditable', true);
//   $('.all-ideas-js').keypress(function(e) {
//     var $ideaId = parseInt(self.id);
//     var ideas = getAndParseIdeas();
//     for (var i = 0; i < ideas.length; i++) {
//       if (ideas[i].id === $ideaId) {
//         ideas[i].title = $(`.user-idea-title-js-${$ideaId}`).text()
//         ideas[i].body = $(`.user-idea-body-js-${$ideaId}`).text()
//       }
//     }
//     localStorage.setItem('ideas', JSON.stringify(ideas));
//   });
// });
//
// $('.all-ideas-js').keypress(function(e) {
//   if (e.which === 13) {
//     $('.user-search-content-js').prop('contenteditable', false);
//     setTimeout(function() {
//       $('.user-search-content-js').prop('contenteditable', true);
//     }, 1);
//   }
// });

checkIdeas();
getIdeasFromStorageAndAppendThem();
