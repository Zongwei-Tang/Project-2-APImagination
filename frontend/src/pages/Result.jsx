import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Result() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/repos/${username}`)
      .then(response => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Link to="/" style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        padding: '12px 32px',
        backgroundColor: '#d4a5ff',
        color: 'black',
        textDecoration: 'none',
        borderRadius: '8px'
      }}>
        Home
      </Link>

      <div style={{ padding: '100px 80px' }}>
        <div style={{
          backgroundColor: '#b3f4f4',
          padding: '20px 60px',
          borderRadius: '12px',
          marginBottom: '40px',
          display: 'inline-block'
        }}>
          <h1 style={{ fontSize: '40px', margin: '0' }}>Repos</h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
              <div style={{
                backgroundColor: '#fff9c4',
                padding: '40px',
                borderRadius: '12px',
                border: '2px solid #f0e68c',
                textAlign: 'center',
                minHeight: '200px'
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '30px' }}>{repo.name}</h3>
                <div>
                  <span style={{ fontSize: '36px', color: '#d3d3d3' }}>★</span>
                  <span style={{ fontSize: '28px', marginLeft: '10px' }}>{repo.stargazers_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;