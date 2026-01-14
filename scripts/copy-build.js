import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDist = path.join(__dirname, "..", "contacts-frontend", "dist");
const backendDist = path.join(__dirname, "..", "contacts-backend", "dist");

function rmDir(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

if (!fs.existsSync(frontendDist)) {
  console.error("Frontend dist folder not found. Run frontend build first.");
  process.exit(1);
}

rmDir(backendDist);
copyDir(frontendDist, backendDist);

console.log("Copied contacts-frontend/dist → contacts-backend/dist");
