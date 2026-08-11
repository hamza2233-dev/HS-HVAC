export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { caller_id } = req.body;

  if (!caller_id) {
    return res.status(400).json({ error: 'Missing caller_id' });
  }

  const payload = new URLSearchParams({
    lp_campaign_id: '6a73b1137e33f',
    lp_campaign_key: 'dyTzJqYBrpWKnRC6Xg4P',
    caller_id: caller_id
  });

  try {
    const response = await fetch('https://track.edmleadnetwork.com/call-preping.do', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString()
    });

    const resultText = await response.text();
    return res.status(200).send(resultText);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
