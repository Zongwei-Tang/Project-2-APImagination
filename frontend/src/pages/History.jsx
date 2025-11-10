import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/history')
      .then(response => setHistory(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Link to="/" style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        padding: '12px 32px',
        backgroundColor: '#b3e5fc',
        color: 'black',
        textDecoration: 'none',
        borderRadius: '8px'
      }}>
        Home
      </Link>

      <div style={{ padding: '100px 80px' }}>
        <div style={{
          backgroundColor: '#b4f4b4',
          padding: '20px 60px',
          borderRadius: '12px',
          marginBottom: '40px',
          display: 'inline-block'
        }}>
          <h1 style={{ fontSize: '40px', margin: '0' }}>All History</h1>
        </div>

        <div>
          {history.length === 0 ? (
            <div style={{
              backgroundColor: '#e8e8e8',
              padding: '24px 32px',
              borderRadius: '8px',
              border: '2px solid #d0d0d0'
            }}>
              No searches yet
            </div>
          ) : (
            history.map((item) => (
              <Link key={item.id} to={`/user/${item.username}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  padding: '24px 32px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  border: '2px solid #d0d0d0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '22px' }}>{item.username}</span>
                  <span style={{ fontSize: '22px', color: '#666' }}>2 min ago</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default History;