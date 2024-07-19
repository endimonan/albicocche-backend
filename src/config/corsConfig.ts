
// || "http://localhost:5173"
const corsOptions = {
  origin: process.env.FRONTEND_URL ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
