document.addEventListener("DOMContentLoaded", () => {
    const counterDisplay = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentList = document.getElementById('list');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
  
    let counterValue = 0;
    let timer;
  
    function incrementCounter() {
      counterValue++;
      counterDisplay.textContent = counterValue;
    }
  
    function decrementCounter() {
      counterValue--;
      counterDisplay.textContent = counterValue;
    }
  
    function likeNumber() {
      const existingLike = likesList.querySelector(`[data-number="${counterValue}"]`);
      if (existingLike) {
        const likeCount = parseInt(existingLike.dataset.likes);
        existingLike.dataset.likes = likeCount + 1;
        existingLike.textContent = `${counterValue} has been liked ${likeCount + 1} times`;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.number = counterValue;
        newLike.dataset.likes = 1;
        newLike.textContent = `${counterValue} has been liked 1 time`;
        likesList.appendChild(newLike);
      }
    }
  
    function pauseCounter() {
      clearInterval(timer);
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
      pauseButton.textContent = 'resume';
      pauseButton.removeEventListener('click', pauseCounter);
      pauseButton.addEventListener('click', resumeCounter);
    }
  
    function resumeCounter() {
      timer = setInterval(incrementCounter, 1000);
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
      pauseButton.textContent = 'pause';
      pauseButton.removeEventListener('click', resumeCounter);
      pauseButton.addEventListener('click', pauseCounter);
    }
  
    function addComment(comment) {
      const commentItem = document.createElement('div');
      commentItem.textContent = comment;
      commentList.appendChild(commentItem);
    }
  
    minusButton.addEventListener('click', decrementCounter);
    plusButton.addEventListener('click', incrementCounter);
    heartButton.addEventListener('click', likeNumber);
    pauseButton.addEventListener('click', pauseCounter);
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentText = commentInput.value;
      addComment(commentText);
      commentInput.value = '';
    });
  
    // Start the timer
    timer = setInterval(incrementCounter, 1000);
  });
  