import React, { useState, useEffect } from 'react';

function ResourceDirectory() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuotes = quotes.filter((quote) =>
    quote.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container my-5">
      <h1>Resource Directory</h1>
      <p>Discover qoutes</p>

      <section id="search-resources">
        <h2>Search Resources</h2>
        <form className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search resources..."
              aria-label="Search resources"
              aria-describedby="search-button"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button type="submit" className="btn btn-primary" id="search-button">
              Search
            </button>
          </div>
        </form>
      </section>

      <section id="quotes" className="mt-5">
        <h2>Inspirational Quotes</h2>
        <div className="row">
          {filteredQuotes.map((quote, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mb-4">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{quote.text}</p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">{quote.author || 'Anonymous'}</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ResourceDirectory;