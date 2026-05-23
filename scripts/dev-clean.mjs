import { rmSync, existsSync } from "fs";
import { spawn, execSync } from "child_process";

function killPort(port) {
  if (process.platform !== "win32") return;

  try {
    const out = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });

    const pids = new Set();
    for (const line of out.split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).at(-1);
      if (pid && pid !== "0") pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Proceso ${pid} en puerto ${port} terminado.`);
      } catch {
        /* already stopped */
      }
    }
  } catch {
    /* port not in use */
  }
}

for (const port of [3000, 3001]) {
  killPort(port);
}

if (existsSync(".next")) {
  rmSync(".next", { recursive: true, force: true });
  console.log("Caché .next eliminada.");
}

if (existsSync("node_modules/.cache")) {
  rmSync("node_modules/.cache", { recursive: true, force: true });
  console.log("Caché node_modules/.cache eliminada.");
}

const child = spawn("next", ["dev"], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
