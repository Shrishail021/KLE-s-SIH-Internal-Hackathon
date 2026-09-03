# 🛠️ DevOps Engineering Project — Step-by-Step Guide
**Project:** Containerized Web Application with Automated CI/CD  
**Application:** KLE's P.C. Jabin Internal Hackathon 2026 (React + Vite)  
**Repository:** https://github.com/Shrishail021/KLE-s-SIH-Internal-Hackathon

---

## Prerequisites
Before starting, ensure the following tools are installed on your machine:
- **Git** — https://git-scm.com/downloads
- **Docker Desktop** — https://www.docker.com/products/docker-desktop
- **Node.js (v18+)** — https://nodejs.org
- **AWS Account** — https://aws.amazon.com/free
- **VS Code** (recommended) — https://code.visualstudio.com

---

## Step 1 — Develop the Application

The web application is already built using:
- **React 18** with **Vite** as the bundler
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **@react-three/fiber** for 3D background effects

### Verify the app runs locally:
```bash
# Clone the repository
git clone https://github.com/Shrishail021/KLE-s-SIH-Internal-Hackathon.git
cd KLE-s-SIH-Internal-Hackathon

# Install dependencies
npm install

# Run the development server
npm run dev
```
Open your browser at `http://localhost:5173` to confirm the site loads correctly.

**📸 Screenshot:** Take a screenshot of the running app in the browser.

---

## Step 2 — Push to GitHub

The project is already pushed. If starting fresh:
```bash
git init
git add .
git commit -m "initial: add KLE Jabin Hackathon 2026 web application"
git remote add origin https://github.com/Shrishail021/KLE-s-SIH-Internal-Hackathon.git
git push -u origin main
```
**📸 Screenshot:** Show the GitHub repository page with commits listed.

---

## Step 3 — Create Branches

Good branching strategy is essential for DevOps. Create the following branches:

```bash
# Feature branch (for new features)
git checkout -b feature/docker-ci-cd
git push -u origin feature/docker-ci-cd

# Staging branch (for pre-production testing)
git checkout main
git checkout -b staging
git push -u origin staging
```

### Branch Strategy Used:
| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `staging` | Pre-production testing |
| `feature/*` | New feature development |

**📸 Screenshot:** Show the GitHub repository's "Branches" tab listing all branches.

---

## Step 4 — Write a Dockerfile

Create a `Dockerfile` in the **root of the project**:

```dockerfile
# ── Stage 1: Build ──────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────
FROM nginx:alpine AS production

# Copy built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Also create `nginx.conf` in the root:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Handle React SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

**📸 Screenshot:** Show the Dockerfile open in VS Code alongside the project file tree.

---

## Step 5 — Build a Docker Image

```bash
# Build the Docker image
docker build -t kle-hackathon:latest .

# Verify the image was created
docker images | grep kle-hackathon

# Run the container locally to test it
docker run -d -p 8080:80 --name kle-hackathon-app kle-hackathon:latest

# Open http://localhost:8080 in your browser to verify
```

**📸 Screenshot:** Show `docker images` output in the terminal and the app running on port 8080.

---

## Step 6 — Create GitHub Actions CI/CD Pipeline

Create the directory and file `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD — Build, Test & Deploy

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  # ── Job 1: Build & Test ─────────────────────────────────
  build-and-test:
    name: Build & Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Build application
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  # ── Job 2: Docker Build & Push ──────────────────────────
  docker:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest
            ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:${{ github.sha }}

  # ── Job 3: Deploy to EC2 ────────────────────────────────
  deploy:
    name: Deploy to AWS EC2
    runs-on: ubuntu-latest
    needs: docker
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest
            docker stop kle-app || true
            docker rm kle-app || true
            docker run -d \
              --name kle-app \
              --restart unless-stopped \
              -p 80:80 \
              ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest
            echo "Deployment successful!"
```

**📸 Screenshot:** Show the `.github/workflows/` directory in VS Code, and the GitHub Actions tab showing the pipeline running.

---

## Step 7 — Run Automated Tests

Add a basic test script. Create `test/smoke.test.js`:

```javascript
// Basic smoke test to verify the build output is correct
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');

// Test 1: Verify dist folder exists after build
if (!existsSync(distPath)) {
  console.error('FAIL: dist/ folder not found. Build may have failed.');
  process.exit(1);
}

// Test 2: Verify index.html exists
const indexPath = join(distPath, 'index.html');
if (!existsSync(indexPath)) {
  console.error('FAIL: dist/index.html not found.');
  process.exit(1);
}

// Test 3: Verify index.html is not empty
const indexContent = readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('<div id="root">')) {
  console.error('FAIL: index.html does not contain the React root div.');
  process.exit(1);
}

console.log('PASS: All smoke tests passed!');
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx",
  "preview": "vite preview",
  "test": "node test/smoke.test.js"
}
```

Run the test locally:
```bash
npm run build && npm test
```

**📸 Screenshot:** Show the terminal with `PASS: All smoke tests passed!` output.

---

## Step 8 — Deploy to AWS EC2

### 8a. Launch EC2 Instance
1. Log into AWS Console → EC2 → **Launch Instance**
2. Choose **Ubuntu Server 22.04 LTS**
3. Select **t2.micro** (Free Tier eligible)
4. Create a new Key Pair → download the `.pem` file
5. In Security Group, allow inbound:
   - **Port 22** (SSH) from Your IP
   - **Port 80** (HTTP) from Anywhere (0.0.0.0/0)
6. Launch the instance and note the **Public IP**

### 8b. Install Docker on EC2
```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Install Docker
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu
newgrp docker
```

### 8c. Run the Application on EC2
```bash
# Pull and run the Docker image
docker pull <YOUR_DOCKERHUB_USERNAME>/kle-hackathon:latest
docker run -d \
  --name kle-app \
  --restart unless-stopped \
  -p 80:80 \
  <YOUR_DOCKERHUB_USERNAME>/kle-hackathon:latest
```

Visit `http://<EC2_PUBLIC_IP>` in your browser.

**📸 Screenshot:** Show the EC2 dashboard with the instance "Running" state, and the website loaded in the browser via the EC2 public IP.

---

## Step 9 — Configure Environment Variables & Secrets

### Add GitHub Secrets for the CI/CD pipeline:
1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. Add the following:

| Secret Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Your Docker Hub access token |
| `EC2_HOST` | EC2 Public IP address |
| `EC2_SSH_KEY` | Full contents of your `.pem` private key file |

**📸 Screenshot:** Show the GitHub Secrets page (values will be hidden automatically).

---

## Step 10 — Monitor Logs

### Monitor Docker container logs on EC2:
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# View live streaming logs
docker logs -f kle-app

# View last 50 lines of logs
docker logs --tail 50 kle-app

# Check container CPU/Memory stats
docker stats kle-app

# Check container running status
docker ps
```

### View CI/CD pipeline logs on GitHub:
- Navigate to your repo → **Actions** tab
- Click on any workflow run to see detailed step-by-step logs

**📸 Screenshot:** Show `docker logs -f kle-app` with nginx access logs appearing.

---

## Step 11 — Perform a New Release

```bash
# Make a small change (e.g., update version in package.json or a text change)
git add .
git commit -m "feat: v1.1.0 release improvements"

# Tag the release
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main --tags
```

This automatically triggers the GitHub Actions pipeline, which builds a new Docker image tagged with `v1.1.0` and deploys to EC2.

**📸 Screenshot:** Show the GitHub Actions workflow triggered by the tag push, and the GitHub Releases page.

---

## Step 12 — Demonstrate Rollback

If a deployment fails, roll back to the previous stable version using the image tagged with its commit SHA:

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Stop and remove the broken container
docker stop kle-app
docker rm kle-app

# Run the previous stable image (replace <PREVIOUS_SHA> with the old commit hash)
docker run -d \
  --name kle-app \
  --restart unless-stopped \
  -p 80:80 \
  <YOUR_DOCKERHUB_USERNAME>/kle-hackathon:<PREVIOUS_SHA>

# Verify rollback worked
docker ps
echo "Rollback complete — previous version is live!"
```

**📸 Screenshot:** Show the rollback commands in terminal, and the site working correctly in the browser after rollback.

---

## Summary of Tools Used

| Tool | Purpose |
|---|---|
| React + Vite | Web Application Framework |
| Git & GitHub | Version Control & Code Repository |
| Docker | Application Containerization |
| Nginx | Production Web Server inside container |
| GitHub Actions | CI/CD Pipeline Automation |
| AWS EC2 | Cloud Server / Deployment Target |
| Docker Hub | Container Image Registry |
