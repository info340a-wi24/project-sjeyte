import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../index';
import { useAuth } from '../contexts/AuthContext';
import surveyQuestions from '../Data/survey.json';
import wellnessImage from '../img/mental-health-wellness.png';

function Home() {
  const { currentUser } = useAuth();
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const surveyRef = db.ref(`users/${currentUser.uid}/survey`);
      surveyRef.once('value', (snapshot) => {
        const surveyData = snapshot.val();
        if (surveyData) {
          setSurveySubmitted(true);
          setRecommendations(surveyData.recommendations);
        }
      });
    }
  }, [currentUser]);

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurveyAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const surveyRef = db.ref(`users/${currentUser.uid}/survey`);
      await surveyRef.set({
        answers: surveyAnswers,
        recommendations: [
          { text: 'Mindfulness for Stress Relief — Expert A' },
          { text: 'Improving Sleep Quality Through Exercise — Expert B' },
        ],
      });
      setSurveySubmitted(true);
      setRecommendations([
        { text: 'Mindfulness for Stress Relief — Expert A' },
        { text: 'Improving Sleep Quality Through Exercise — Expert B' },
      ]);
    }
  };

  const handleGetStarted = () => {
    if (currentUser) {
      document.getElementById('initial-survey').scrollIntoView();
    } else {
      navigate('/signin');
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1>Welcome to Harmony</h1>
              <p className="lead">Your personal mental wellness companion.</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleGetStarted}
                disabled={surveySubmitted}
              >
                Get Started
              </button>
            </div>
            <div className="col-lg-6">
              <img src={wellnessImage} alt="Mental Health Illustration" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      {currentUser && !surveySubmitted && (
        <section id="initial-survey" className={`container py-5 ${surveySubmitted ? '' : 'active'}`}>
          <h2>Initial Survey</h2>
          <p>Please complete this brief survey to help us understand your needs and provide personalized recommendations.</p>
          <form onSubmit={handleSurveySubmit}>
            {surveyQuestions.map((question) => (
              <div className="mb-3" key={question.id}>
                <label htmlFor={question.id} className="form-label">{question.question}</label>
                <select
                  id={question.id}
                  name={question.id}
                  className="form-select"
                  value={surveyAnswers[question.id]}
                  onChange={handleSurveyChange}
                  required
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </section>
      )}
      {currentUser && surveySubmitted && recommendations.length > 0 && (
        <section id="recommendations" className="container py-5">
          <h2>Your Recommendations</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec.text}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Home;