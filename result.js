const scoreEl = document.getElementById('iq-score');
const textEl = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');

const defaultQuestions = [
    {"correct": 3}, {"correct": 2}, {"correct": 0}, {"correct": 2}, {"correct": 3}, {"correct": 2}, {"correct": 1}, {"correct": 1}, {"correct": 2}, {"correct": 0}, {"correct": 2}, {"correct": 3}, {"correct": 1}, {"correct": 1}, {"correct": 2}, {"correct": 2}, {"correct": 2}, {"correct": 0}, {"correct": 2}, {"correct": 1}, {"correct": 2}, {"correct": 1}, {"correct": 1}, {"correct": 3}, {"correct": 2}, {"correct": 1}, {"correct": 1}, {"correct": 1}, {"correct": 0}, {"correct": 1}, {"correct": 1}, {"correct": 1}, {"correct": 2}, {"correct": 1}, {"correct": 1}, {"correct": 2}, {"correct": 1}, {"correct": 1}, {"correct": 0}, {"correct": 2}
];
const profile = JSON.parse(localStorage.getItem('brightIQProfile') || 'null') || {name: 'Player', group: '18+'};
document.getElementById('profile-name').textContent = profile.name;
const questionOrder = JSON.parse(localStorage.getItem('iqQuestionOrder') || 'null') || Array.from({length: 40}, (_, index) => index);
const questionBank = QUESTION_BANKS[profile.group] || QUESTION_BANKS['18+'];
const questions = questionOrder.map((questionIndex) => questionBank[questionIndex]);
const raw = localStorage.getItem('iqQuizAnswers');
const answers = raw ? JSON.parse(raw) : Array(40).fill(null);
let correct = 0;
answers.forEach((answer, index) => {
  if (answer !== null && answer === questions[index].correct) correct += 1;
});
const percentage = (correct / questions.length) * 100;
const percentText = `${Math.round(percentage)}%`;
scoreEl.textContent = percentText;

if (percentage >= 80) {
  textEl.textContent = 'Excellent! Your logic and reasoning are highly advanced.';
} else if (percentage >= 60) {
  textEl.textContent = 'Great result! You have strong analytical thinking and problem-solving skills.';
} else if (percentage >= 40) {
  textEl.textContent = 'Good work! Your thinking is solid, and there is room to improve further.';
} else if (percentage >= 20) {
  textEl.textContent = 'Nice effort! Practice more and your reasoning skills will grow quickly.';
} else {
  textEl.textContent = 'Every challenge helps. Keep practicing and your IQ score will improve over time.';
}

restartBtn.addEventListener('click', () => {
  localStorage.setItem('iqQuizAnswers', JSON.stringify(Array(40).fill(null)));
  window.location.href = 'index.html';
});
