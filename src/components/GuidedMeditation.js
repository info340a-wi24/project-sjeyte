import React, { useState } from 'react';
import stressRelief from '../img/stress-relief.jpeg';
import anxiety from '../img/anxiety.png';
import sleep from '../img/sleep-mediation.jpeg';
import breathIn from '../img/breath-in.jpg';
import body from '../img/body.jpeg';
import mindful from '../img/mindful.png';
import mindfulWalking from '../img/mindful.jpeg';
import love from '../img/loving.png';
import muscle from '../img/selfcare.jpeg';

function GuidedMeditation() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const meditations = [
    {
      id: 1,
      title: 'Breathe In, Breathe Out',
      description: 'A simple breathing meditation to calm your mind.',
      category: 'Stress Relief',
      image: breathIn,
      link: 'https://www.mindful.org/a-five-minute-breathing-meditation/',
    },
    {
      id: 2,
      title: 'Mindful Walking',
      description: 'Bring your awareness to the present moment with this walking meditation.',
      category: 'Anxiety Relief',
      image: mindfulWalking,
      link: 'https://www.mindful.org/6-ways-to-get-the-benefits-of-mindful-walking/',
    },
    {
      id: 3,
      title: 'Body Scan Meditation',
      description: 'A guided meditation to increase awareness of your body and release tension.',
      category: 'Stress Relief',
      image: body,
      link: 'https://www.mindful.org/beginners-body-scan-meditation/',
    },
    {
      id: 4,
      title: 'Loving-Kindness Meditation',
      description: 'Cultivate compassion and self-acceptance with this meditation.',
      category: 'Anxiety Relief',
      image: love,
      link: 'https://www.mindful.org/this-loving-kindness-meditation-is-a-radical-act-of-love/'
    },
    {
      id: 5,
      title: 'Progressive Muscle Relaxation',
      description: 'Systematically relax your body and mind with this guided technique.',
      category: 'Sleep',
      image: muscle,
      link: 'https://www.anxietycanada.com/articles/how-to-do-progressive-muscle-relaxation/'
    },
    {
      id: 6,
      title: 'Mindful Eating Meditation',
      description: 'Develop a healthy relationship with food through mindful eating practices.',
      category: 'Stress Relief',
      image: mindful,
      link: 'https://www.headspace.com/mindfulness/mindful-eating'
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredMeditations = selectedCategory
    ? meditations.filter((meditation) => meditation.category === selectedCategory)
    : meditations;

  return (
    <main className="container my-5" style={{ paddingTop: '80px' }}>
      <h1>Guided Meditation Library</h1>
      <p>Explore our collection of guided meditations to find relaxation and inner peace.</p>
      <section id="meditation-categories">
        <h2>Meditation Categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <img src={stressRelief} alt="Stress Relief Meditation" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Stress Relief</h5>
                <p className="card-text">Meditations to help you relax and reduce stress.</p>
                <button
                  className={`btn ${selectedCategory === 'Stress Relief' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleCategoryChange('Stress Relief')}
                >
                  View Meditations
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src={anxiety} alt="Anxiety Relief Meditation" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Anxiety Relief</h5>
                <p className="card-text">Meditations to calm your mind and ease anxiety.</p>
                <button
                  className={`btn ${selectedCategory === 'Anxiety Relief' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleCategoryChange('Anxiety Relief')}
                >
                  View Meditations
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src={sleep} alt="Sleep Meditation" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Sleep</h5>
                <p className="card-text">Meditations to help you relax and fall asleep.</p>
                <button
                  className={`btn ${selectedCategory === 'Sleep' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleCategoryChange('Sleep')}
                >
                  View Meditations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="featured-meditations" className="mt-5">
        <h2>Featured Meditations</h2>
        <div className="row">
          {filteredMeditations.map((meditation) => (
            <div className="col-md-4" key={meditation.id}>
              <div className="card mb-4">
                <img src={meditation.image} alt={meditation.title} className="card-img-top meditation-image" />
                <div className="card-body">
                  <h5 className="card-title">{meditation.title}</h5>
                  <p className="card-text">{meditation.description}</p>
                  <a href={meditation.link} className="btn btn-primary">Start Meditation</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default GuidedMeditation;