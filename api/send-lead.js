export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, project, ai_summary } = req.body;

  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        firstname: name,
        email,
        phone,
        interested_projects: project || "Otro",
        resumen_chatbot: ai_summary,
      },
    }),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
