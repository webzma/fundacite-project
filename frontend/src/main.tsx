import "./index.css";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes.tsx";

createRoot(document.getElementById("root")!).render(<AppRoutes />);
