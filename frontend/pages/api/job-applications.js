export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  console.log('=== API Route Called ===');
  console.log('Method:', req.method);
  console.log('Backend URL:', backendUrl);
  console.log('Headers:', req.headers);
  
  if (req.method === 'POST') {
    try {
      console.log('Processing POST request...');
      
      // Collect the request body chunks
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks);
      
      console.log('Body collected, size:', body.length);
      console.log('Content-Type:', req.headers['content-type']);
      
      // Forward the request to the backend
      console.log('Sending request to backend...');
      const response = await fetch(`${backendUrl}/api/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': req.headers['content-type'] || 'multipart/form-data',
          'Content-Length': body.length.toString(),
        },
        body: body,
      });
      
      console.log('Backend response status:', response.status);
      
      const responseData = await response.json();
      console.log('Backend response data:', responseData);
      
      if (!response.ok) {
        console.log('Backend returned error, forwarding to client');
        return res.status(response.status).json(responseData);
      }
      
      console.log('Success! Sending response to client');
      res.status(201).json(responseData);
    } catch (error) {
      console.error('API Error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({ 
        success: false,
        message: error.message || 'Internal Server Error' 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const url = req.query.jobId 
        ? `${backendUrl}/api/job-applications/job/${req.query.jobId}${req.query.status ? `?status=${req.query.status}` : ''}`
        : `${backendUrl}/api/job-applications/job/${req.query.id}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': req.headers.authorization || ''
        }
      });
      
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
