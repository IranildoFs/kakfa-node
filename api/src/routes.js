import express from "express";
const routes = express.Router();

routes.get("/certifications", async (req, res) => {
  const message = {
    user: { id: 1, name: "iranildo" },
    course: "fullcycle",
    grade: 10,
  };

  await req.producer.send({
    topic: "topic-certification",
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });

  await req.producer.send({
    topic: "topic-pdf",
    messages: [
      {
        value: "Era pra ser PDF",
      },
    ],
  });
  return res.json({ ok: true });
});

export default routes;
