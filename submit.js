
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, company, phone, message } = req.body;

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxh_1oPMtn113PZiYmdvFxYiOzt46tFRQQyd9EH_ES9xtdVtBlAwL49YIoaBG1Jz1OI/exec';

    const formData = new URLSearchParams({
      'name': name,
      'company': company,
      'phone': phone,
      'message': message,
      'timestamp': new Date().toISOString(),
    });

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const text = await response.text();

    res.status(200).json({ message: 'Success', detail: text });
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
