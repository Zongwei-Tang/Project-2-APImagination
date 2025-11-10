import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username) {
      axios.post('http://localhost:3001/api/history', { username });
      navigate(`/user/${username}`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Link to="/history" style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        padding: '12px 24px',
        backgroundColor: '#ffb3ba',
        color: 'black',
        textDecoration: 'none',
        borderRadius: '8px'
      }}>
        What others search
      </Link>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{
          backgroundColor: '#b4f4b4',
          padding: '20px 60px',
          borderRadius: '12px',
          marginBottom: '60px'
        }}>
          <h1 style={{ fontSize: '48px', margin: '0' }}>GitHub Finder</h1>
        </div>

        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Username</div>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            width: '400px',
            padding: '12px 20px',
            fontSize: '18px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '30px'
          }}
        />

        <button onClick={handleSearch} style={{
          padding: '12px 60px',
          fontSize: '20px',
          backgroundColor: '#b3e5fc',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Go!
        </button>
      </div>
    </div>
  );
}

export default Home;