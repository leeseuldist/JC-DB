export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, company, phone, message } = req.body;

    const scriptURL = "https://script.google.com/macros/s/AKfycbxh_1oPMtn113PZiYmdvFxYiOzt46tFRQQyd9EH_ES9xtdVtBlAwL49YIoaBG1Jz1OI/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, phone, message }),
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
