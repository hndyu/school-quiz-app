import { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: "太陽系で最も大きい惑星は？",
    options: ["地球", "火星", "金星", "木星"],
    correct: "木星",
  },
  {
    question: "次のうち、哺乳類でない動物は？",
    options: ["カンガルー", "ゴリラ", "ペンギン", "カバ"],
    correct: "ペンギン",
  },
  {
    question: "モナリザを描いた画家は？",
    options: ["レオナルド・ダ・ヴィンチ", "ミケランジェロ", "フィンセント・ファン・ゴッホ", "クロード・モネ"],
    correct: "レオナルド・ダ・ヴィンチ",
  },
  {
    question: "一般的に果物として認識されていないのは？",
    options: ["トマト", "りんご", "ぶどう", "ブロッコリー", "バナナ"],
    correct: "ブロッコリー",
  }
];

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 答え合わせ画面のState管理
  const [next, setNext] = useState(false);

  // ユーザーの解答履歴のState管理
  const [answers, setAnswers] = useState([]);

  // Score
  const [score, setScore] = useState(0);

  // 〇か×か
  const [feedback, setFeedback] = useState(null);

  // Score画面の管理 trueでScoreページを表示
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswer = {
      // 問題
      question: quizData[currentQuestion].question,

      // 自分の解答
      answer: answer,

      // 正否(bool) ユーザーの解答とquizDataのcorrectの比較結果
      correct: answer === quizData[currentQuestion].correct,
    };

    if (newAnswer.correct) {
      // 正解の場合スコアを+1
      setScore((prevScore) => prevScore + 1);
      setFeedback("〇");
    } else {
      // 不正解の場合
      setFeedback("×");
    }
    setAnswers([...answers, newAnswer]);

    // 答え合わせ画面のStateをtrueに変更
    setNext(true)
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

    setNext(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className='score-section'>
          <h1>スコア</h1>
          <h2>{score}/{quizData.length}</h2>
          <table className="answer-table">
            <thead>
              <tr>
                <td>質問</td>
                <td>あなたの解答</td>
                <td>正否</td>
              </tr>
            </thead>
            <tbody>
              {answers.map((item) => (
                <tr className={item.correct ? "correct" : "wrong" }>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? "〇" : "×"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="question-section">
          <h1>問題 {currentQuestion + 1}/{quizData.length}</h1>
          <h2>{quizData[currentQuestion].question}</h2>

          {next ? (
            <div className='feedback-section'>
              {/* 正否を表示 */}
              <h2 className="large-feedback">{feedback}</h2>
              <p>正解は</p>
              <p>{quizData[currentQuestion].correct}</p>
              <button onClick={goToNextQuestion}>次の問題へ</button>
            </div>
          ) : (
            <div className="answer-section">
              {quizData[currentQuestion].options.map((item, index) => {
                return <button key={index} onClick={() => handleAnswer(item)} className={`quiz-option-button option-${index}`}>{item}</button>
              })}
            </div>
          )}
        </div>
      )}
    </div >
  );
}
export default App;
