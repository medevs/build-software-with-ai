// quiz.js — tiny self-check widget, shared across all lessons.
// <div class="quiz" data-answer="1" data-why="...">
//   <p class="q">?</p><button>a</button><button>b</button><p class="fb"></p></div>
document.querySelectorAll('.quiz').forEach(function (q) {
  var correct = parseInt(q.getAttribute('data-answer'), 10);
  var fb = q.querySelector('.fb');
  var btns = [].slice.call(q.querySelectorAll('button'));
  btns.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.disabled = true; });
      btn.classList.add(i === correct ? 'correct' : 'wrong');
      if (i !== correct) btns[correct].classList.add('correct');
      fb.textContent = (i === correct ? 'Correct. ' : 'Not quite. ') + (q.getAttribute('data-why') || '');
    });
  });
});
