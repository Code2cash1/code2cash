export default function handler(req, res) {
  // Proxy requests to backend
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // Handle different methods
  switch (req.method) {
    case 'GET':
      // Build query string for backend
      const queryString = new URLSearchParams();
      
      // Add all query parameters except 'id' which we handle separately
      Object.keys(req.query).forEach(key => {
        if (key !== 'id' && req.query[key]) {
          queryString.append(key, req.query[key]);
        }
      });
      
      const url = req.query.id 
        ? `${backendUrl}/api/jobs/${req.query.id}`
        : `${backendUrl}/api/jobs${queryString.toString() ? '?' + queryString.toString() : ''}`;
      
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch jobs');
          }
          return response.json();
        })
        .then(data => res.status(200).json(data))
        .catch(error => {
          console.error('Jobs API Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    
    case 'POST':
      return fetch(`${backendUrl}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization || ''
        },
        body: JSON.stringify(req.body)
      })
        .then(response => response.json())
        .then(data => res.status(201).json(data))
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    
    case 'PUT':
      return fetch(`${backendUrl}/api/jobs/${req.query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization || ''
        },
        body: JSON.stringify(req.body)
      })
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    
    case 'DELETE':
      return fetch(`${backendUrl}/api/jobs/${req.query.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': req.headers.authorization || ''
        }
      })
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    
    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
