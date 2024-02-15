import React from 'react';
import { Link } from 'react-router-dom';

function Score({ score, correct, wrong, total }) {
  return (
    <div className='score-container'>
      <h2 className='score-heading'>Your Score: {score}</h2>
      <p className='score-info'>Correct Answers: {correct}</p>
      <p className='score-info'>Wrong Answers: {wrong}</p>
      <p className='score-info'>Total Questions: {total}</p>
      <p className='feedback-link'>
        <Link to="/feedback" className='feedback-link-text'>Leave Feedback</Link>
      </p>
    </div>
  );
}

export default Score;
