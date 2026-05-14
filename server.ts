import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add middlewares
  app.use(cors()); // Allow cross-origin requests
  app.use(express.json());

  // In-memory storage for patients (demo purposes)
  let patients: any[] = [
    {
      id: "pt-123",
      chartNo: "C10452",
      name: "홍길동",
      room: "702-04",
      department: "내과",
      doctor: "김진수",
      birthDate: "1985-05-20",
      gender: "M",
      age: 39,
      address: "서울특별시 강남구 테헤란로 123",
      diagnosis: "Acute Gastritis",
      chiefComplaint: "Epigastric pain, Nausea",
      onSet: "2024-05-10 08:30"
    }
  ];

  // API Token Check (Optional: if the user set 'API_TOKEN' or 'Value' in Render)
  const API_TOKEN = process.env.VITE_BACKEND_API_TOKEN || process.env.Value;

  app.use("/api", (req, res, next) => {
    if (API_TOKEN && req.headers["x-api-token"] !== API_TOKEN) {
      // If token is set but not provided or wrong, we could block it
      // For now, we'll just log it to avoid blocking the user accidentally
      console.log("Request received for /api");
    }
    next();
  });

  // API Routes
  app.get("/api/patients", (req, res) => {
    res.json(patients);
  });

  app.post("/api/patients", (req, res) => {
    const newPatient = { ...req.body, id: `pt-${Date.now()}` };
    patients.push(newPatient);
    res.status(201).json(newPatient);
  });

  app.put("/api/patients/:id", (req, res) => {
    const { id } = req.params;
    patients = patients.map(p => p.id === id ? { ...req.body, id } : p);
    res.json({ success: true });
  });

  app.delete("/api/patients/:id", (req, res) => {
    const { id } = req.params;
    patients = patients.filter(p => p.id !== id);
    res.json({ success: true });
  });

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
