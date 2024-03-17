import React, { useState, useEffect } from 'react';

function ResourceDirectory() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${searchTerm}`
      );
      const data = await response.json();
      const cleanedResults = data.Result.Resources.Resource.map((result) => ({
        id: result.Id,
        title: result.Title,
        content: result.Sections.section[0].Content.replace(/<\/?[^>]+(>|$)/g, ''),
        url: result.AccessibleVersion,
      }));
      setSearchResults(cleanedResults);
    } catch (error) {
      setError('Error searching for mental health topics');
      console.error('Error searching for mental health topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuotes = quotes.filter((quote) =>
    quote.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container my-5" style={{ paddingTop: '80px' }}>
      <h1>Resource Directory</h1>
      <p>Search for mental health topics and discover inspirational quotes.</p>

      <section id="search-resources">
        <h2>Search Resources</h2>
        <form className="mb-4" onSubmit={handleSearch}>
          <div className="input-group">
            <label htmlFor="search-input" className="visually-hidden">
              Search mental health topics
            </label>
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Search mental health topics..."
              aria-describedby="search-button"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" id="search-button">
              Search
            </button>
          </div>
        </form>
      </section>

      <section id="search-results" className="mt-5">
        <h2>Search Results</h2>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>{result.content}</p>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found. Please try a different search term.</p>
        )}
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