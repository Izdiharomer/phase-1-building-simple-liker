// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!


// Select all the like buttons
const likeButtons = document.querySelectorAll('.like');

// Attach click event listener to each like button
likeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if the heart is already liked or not
    const isLiked = button.classList.contains('activated');

    // Call the server to mimic liking/unliking the post
    mimicServerCall()
      .then(() => {
        // If the server call is successful, toggle the appearance of the heart
        if (isLiked) {
          // Unlike the post
          button.classList.remove('activated');
          button.querySelector('.like-glyph').innerHTML = EMPTY_HEART;
        } else {
          // Like the post
          button.classList.add('activated');
          button.querySelector('.like-glyph').innerHTML = FULL_HEART;
        }
      })
      .catch(error => {
        // If the server call fails, show the error message in the modal
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = error;
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 3000);
      });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
