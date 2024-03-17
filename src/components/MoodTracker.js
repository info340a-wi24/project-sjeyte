import React, { useState, useEffect } from 'react';
import { db } from '../index';

function MoodTracker() {
  const [moods, setMoods] = useState([]);
  const [newMood, setNewMood] = useState({
    date: '',
    mood: '',
    notes: '',
  });

  useEffect(() => {
    const unsubscribe = db.ref('moods').on('value', (snapshot) => {
      const moodData = snapshot.val();
      if (moodData) {
        const moodList = Object.entries(moodData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setMoods(moodList);
      } else {
        setMoods([]);
      }
    }, (error) => {
      console.error('Error fetching mood data:', error);
    });

    return () => {
      db.ref('moods').off('value', unsubscribe);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMood((prevMood) => ({
      ...prevMood,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMood.date && newMood.mood) {
      const moodRef = db.ref('moods').push();
      moodRef.set(newMood)
        .then(() => {
          setNewMood({
            date: '',
            mood: '',
            notes: '',
          });
        })
        .catch((error) => {
          console.error('Error adding mood:', error);
        });
    }
  };

  const handleDelete = (moodId) => {
    db.ref(`moods/${moodId}`).remove()
      .catch((error) => {
        console.error('Error deleting mood:', error);
      });
  };

  return (
    <main className="container my-5" style={{ paddingTop: '80px' }}>
      <h1>Mood Tracker</h1>
      <p>Track your daily moods and emotions to gain insights into your mental well-being.</p>
      <section id="mood-form">
        <h2>Log Your Mood</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={newMood.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mood" className="form-label">Mood:</label>
            <select
              id="mood"
              name="mood"
              className="form-select"
              value={newMood.mood}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your mood</option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Anxious">Anxious</option>
              <option value="Angry">Angry</option>
              <option value="Neutral">Neutral</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              rows="3"
              value={newMood.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Log Mood</button>
        </form>
      </section>
      <section id="mood-history" className="mt-5">
        <h2>Mood History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Mood</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moods.map((mood) => (
              <tr key={mood.id}>
                <td>{mood.date}</td>
                <td>{mood.mood}</td>
                <td>{mood.notes}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(mood.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default MoodTracker;