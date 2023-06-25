var questions = document.querySelectorAll('.question');
var answers = document.querySelectorAll('.question-answer');
questions.forEach((question) => {
    question.addEventListener('click', showAnswer);
  });

  function showAnswer(){

    let questionId = this.id;
    let answerId = 'answer-'+ questionId;
    let answer = document.getElementById(answerId);
    for(let m = 0; m < questions.length;m++)
    {
      questions[m].classList.remove('active');
    }
    for(let i = 0; i < answers.length; i++){
        answers[i].classList.remove('visible');
    }
    answer.classList.add('visible');
    this.classList.add('active');
  }