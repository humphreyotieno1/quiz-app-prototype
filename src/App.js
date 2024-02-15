import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Question from './components/Question';
import Score from './components/Score';
import Feedback from './components/Feedback';
import About from './components/About';
import { useFormik } from 'formik';
import './App.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const formik = useFormik({
    initialValues: {
      answers: {},
    },
    onSubmit: () => {
      const newScore = Object.values(formik.values.answers).reduce(
        (acc, answer) => (answer ? acc + 1 : acc),
        0
      );
      setScore(newScore);
    },
  });

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4000/questions/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const sampledQuestions = sampleQuestions(data, 5);
        setQuestions(sampledQuestions);
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const sampleQuestions = (questions, count) => {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, count);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/questions"
            element={
              questions?.length > 0 ? (
                <Question
                  questions={questions}
                  formik={formik}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  score={score}
                  setScore={setScore}
                />
              ) : <p>No questions available.</p>
            }
          />
          <Route path="/score" element={<Score score={score} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<p>Welcome to the Quiz App!</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
