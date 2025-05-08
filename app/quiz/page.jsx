"use client";
import Head from 'next/head';
import { useEffect, useState } from 'react';
const HealthQuiz = () => {
  useEffect(() => {
      document.title = 'medMagic - Quiz'
    }, [])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const questions = [
    {
      id: 1,
      question: "How many servings of fruits and vegetables do you typically eat per day?",
      options: [
        "Less than 2 servings",
        "3-4 servings",
        "5 or more servings"
      ],
      scores: [1, 3, 5]
    },
    {
      id: 2,
      question: "How often do you engage in moderate to vigorous exercise?",
      options: [
        "Rarely or never",
        "1-3 times per week",
        "4 or more times per week"
      ],
      scores: [1, 3, 5]
    },
    {
      id: 3,
      question: "How many hours do you sleep on average each night?",
      options: [
        "Less than 6 hours",
        "6-7 hours",
        "7-9 hours",
        "More than 9 hours"
      ],
      scores: [1, 3, 5, 2]
    },
    {
      id: 4,
      question: "How would you rate your stress levels?",
      options: [
        "Constantly stressed",
        "Frequently stressed",
        "Occasionally stressed",
        "Rarely stressed"
      ],
      scores: [1, 2, 4, 5]
    },
    {
      id: 5,
      question: "How often do you consume processed or fast food?",
      options: [
        "Daily",
        "Several times a week",
        "Once a week",
        "Rarely or never"
      ],
      scores: [1, 2, 4, 5]
    }
  ];

  const handleAnswer = (questionId, answerIndex, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer: questions[currentQuestion].options[answerIndex],
        score: score
      }
    }));
    setError('');
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      setError('Please select an answer to continue');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateHealthScore();
    }
  };

  const calculateHealthScore = () => {
    setLoading(true);
    setTimeout(() => {
      const totalScore = Object.values(answers).reduce((sum, item) => sum + item.score, 0);
      const maxPossibleScore = questions.length * 5;
      const calculatedScore = Math.round((totalScore / maxPossibleScore) * 100);
      setHealthScore(calculatedScore);
      setQuizComplete(true);
      setLoading(false);
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
    setHealthScore(0);
    setError('');
  };

  const getHealthAssessment = () => {
    if (healthScore >= 80) return "Excellent";
    if (healthScore >= 60) return "Good";
    if (healthScore >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getHealthColor = () => {
    if (healthScore >= 80) return "bg-emerald-100 text-emerald-800";
    if (healthScore >= 60) return "bg-blue-100 text-blue-800";
    if (healthScore >= 40) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (answers[1]?.score < 3) {
      recommendations.push({
        icon: "🍎",
        text: "Increase fruit & vegetable intake to at least 5 servings daily"
      });
    }
    
    if (answers[2]?.score < 3) {
      recommendations.push({
        icon: "🏃",
        text: "Aim for at least 150 minutes of moderate exercise weekly"
      });
    }
    
    if (answers[3]?.score < 3) {
      recommendations.push({
        icon: "😴",
        text: "Establish a regular sleep schedule for 7-9 hours nightly"
      });
    }
    
    if (answers[4]?.score < 3) {
      recommendations.push({
        icon: "🧘",
        text: "Practice stress-reduction techniques like meditation"
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        icon: "🌟",
        text: "Keep up the great work! Consider adding mindfulness practices"
      });
    }
    
    return recommendations;
  };

  return (
    <>
    <Head>
      <meta name="description" content="Take a health quiz and get personalized recommendations" />
    </Head>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Health Assessment</h1>
        <p className="text-gray-600">Complete this quick quiz to get personalized health insights</p>
        
        {!quizComplete && (
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700">Analyzing your responses with AI...</p>
        </div>
      ) : quizComplete ? (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-6 rounded-xl ${getHealthColor()} text-center`}>
            <h2 className="text-2xl font-bold mb-2">Your Health Score</h2>
            <div className="text-5xl font-extrabold my-4">{healthScore}/100</div>
            <p className="text-lg font-semibold">{getHealthAssessment()}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h3>
            <div className="space-y-4">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-2xl">{rec.icon}</span>
                  <p className="text-gray-700">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Responses</h3>
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="border-b border-gray-200 pb-3">
                  <p className="font-medium text-gray-700">{q.question}</p>
                  <p className="text-gray-600">{answers[q.id]?.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <span className="font-semibold">Question {currentQuestion + 1}/{questions.length}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{questions[currentQuestion].question}</h2>
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(questions[currentQuestion].id, index, questions[currentQuestion].scores[index])}
                className={`w-full text-left p-4 border rounded-lg transition duration-200 ${
                  answers[questions[currentQuestion].id]?.answer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center animate-shake">
              {error}
            </div>
          )}
          
          <div className="flex justify-between pt-2">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ← Previous
              </button>
            )}
            <div className="flex-1"></div>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              disabled={!answers[questions[currentQuestion].id]}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default HealthQuiz;