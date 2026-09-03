# DevOps Engineering Project Report

**Title:** Containerized Web Application with Automated CI/CD  
**Project Application:** KLE's P.C. Jabin Internal Hackathon 2026  
**Technology Stack:** React, Vite, Docker, GitHub Actions, AWS EC2  
**Repository:** https://github.com/Shrishail021/KLE-s-SIH-Internal-Hackathon  

---

| Sl No | Topic | Page No |
|---|---|---|
| 1 | Introduction | 1 |
| 2 | Hardware and Software Requirements | 2 |
| 3 | Git & GitHub – Repository, Commits, Branching and Merging | 3 – 4 |
| 4 | Dockerfile & Image Creation | 5 |
| 5 | Docker Compose – Container Execution & Configuration | 6 – 10 |
| 6 | Conclusion | 11 |

---

## 1. Introduction
*(Page 1)*

### 1.1 Project Overview

This project demonstrates the implementation of a complete **DevOps pipeline** for a real-world web application. The application chosen is the **KLE's P.C. Jabin Science College Internal Hackathon 2026** registration website — a production-ready, single-page application built using React 18 and Vite.

The project covers the full DevOps lifecycle, from writing a production-ready web application, containerizing it using **Docker**, automating the build and deployment process using **GitHub Actions**, and finally deploying it to the cloud using **AWS EC2**.

### 1.2 Objectives

- Understand the purpose and benefits of containerization using Docker
- Learn how to write a production-grade multi-stage Dockerfile
- Implement a complete CI/CD pipeline using GitHub Actions
- Deploy a containerized application to a cloud server (AWS EC2)
- Practice version control best practices including branching strategies, commits, and pull requests
- Understand rollback strategies for failed deployments

### 1.3 Project Architecture

```
Developer Machine
       │
       │  git push
       ▼
┌─────────────────────────────┐
│   GitHub Repository         │
│   (main / staging branches) │
└───────────┬─────────────────┘
            │ triggers
            ▼
┌─────────────────────────────┐
│   GitHub Actions CI/CD      │
│   1. npm install & build    │
│   2. Run smoke tests        │
│   3. Docker build & push    │
│   4. Deploy to EC2 via SSH  │
└───────────┬─────────────────┘
            │ docker pull & run
            ▼
┌─────────────────────────────┐
│   AWS EC2 (Ubuntu 22.04)    │
│   Docker Container          │
│   Nginx serving on Port 80  │
└─────────────────────────────┘
            │
            ▼
     Public Internet
   http://<EC2-PUBLIC-IP>
```

### 1.4 Application Structure

The web application (KLE Hackathon 2026) is a fully responsive, static React application with the following sections:
- **Hero** — Event title, date, venue, and CTA buttons
- **Guidelines** — Team size, eligibility, and code of conduct
- **Problem Statements** — 6 interactive domain cards with hover effects
- **Registration** — 4-step registration guide with deadline information
- **Footer** — Contact details, social links, and location

**📸 Screenshot:** *Insert screenshot of the running web application homepage*

---

## 2. Hardware and Software Requirements
*(Page 2)*

### 2.1 Hardware Requirements

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 |
| RAM | 4 GB | 8 GB or higher |
| Storage | 10 GB free space | 20 GB SSD |
| Network | Stable internet connection | Broadband (10+ Mbps) |
| Display | 1280 x 720 | 1920 x 1080 |

### 2.2 AWS EC2 Instance (Cloud Server)

| Attribute | Value |
|---|---|
| Instance Type | t2.micro (Free Tier eligible) |
| Operating System | Ubuntu Server 22.04 LTS |
| vCPUs | 1 |
| RAM | 1 GB |
| Storage | 8 GB EBS (gp2) |
| Inbound Ports | 22 (SSH), 80 (HTTP) |

### 2.3 Software Requirements — Developer Machine

| Software | Version | Purpose |
|---|---|---|
| Operating System | Windows 10/11, macOS, or Ubuntu | Development environment |
| Git | 2.40+ | Version control |
| Node.js | 18.x LTS | Run the React application locally |
| npm | 9.x+ | Package manager |
| Docker Desktop | 24.x | Build and run containers locally |
| VS Code | Latest | Code editor |
| Web Browser | Chrome / Firefox / Edge | Testing |

### 2.4 Software Requirements — Cloud/CI Tools

| Tool/Service | Version/Tier | Purpose |
|---|---|---|
| GitHub | Free | Code hosting & GitHub Actions CI/CD |
| GitHub Actions | Free (2000 min/month) | Automated build, test, deploy |
| Docker Hub | Free | Container image registry |
| AWS EC2 | t2.micro Free Tier | Cloud deployment server |
| Docker Engine | 24.x | Container runtime on EC2 |
| Nginx | 1.24 (alpine) | Web server inside Docker container |

---

## 3. Git & GitHub – Repository, Commits, Branching and Merging
*(Pages 3 – 4)*

### 3.1 Repository Initialization

The project repository was initialized and pushed to GitHub using the following commands:

```bash
# Initialize a local Git repository
git init

# Add all project files to staging area
git add .

# Create the first commit
git commit -m "initial: add KLE Jabin Hackathon 2026 web application"

# Add the remote GitHub repository
git remote add origin https://github.com/Shrishail021/KLE-s-SIH-Internal-Hackathon.git

# Push the code to the main branch
git push -u origin main
```

**📸 Screenshot:** *Insert screenshot of the GitHub repository page showing the initial commit*

### 3.2 Meaningful Commit History

Commits were made throughout the project following the **Conventional Commits** specification for clear and readable history:

```
feat:     A new feature was added
fix:      A bug was fixed
style:    UI / formatting changes
content:  Text or copy changes
docs:     Documentation changes
```

### Sample Commit History:
```
feat: add beautiful OG image for social sharing links (WhatsApp preview)
fix: delay scroll navigation to allow mobile menu to close
style: fix wrapping of college name in desktop navbar
content: update step 4 description with whatsapp instructions
fix: mobile navbar border radius when menu is open
style: reduce vertical gap between sections
feat: apply UI and copy updates (dates, links, mobile layout)
```

**📸 Screenshot:** *Insert screenshot of the GitHub commits page showing the commit history with messages*

### 3.3 Branching Strategy

The **GitHub Flow** branching model was adopted:

```
main ──────────────────────────────────────────► (production)
  │
  ├── staging ────────────────────────────────► (pre-production)
  │
  └── feature/docker-ci-cd ──────────────────► (feature work)
```

#### Creating Branches:
```bash
# Create and switch to a new feature branch
git checkout -b feature/docker-ci-cd

# Push the branch to GitHub
git push -u origin feature/docker-ci-cd

# Create staging branch
git checkout main
git checkout -b staging
git push -u origin staging
```

**📸 Screenshot:** *Insert screenshot of the GitHub "Branches" tab showing all three branches*

### 3.4 Pull Requests & Merging

Once feature work is complete, a Pull Request (PR) is opened from `feature/docker-ci-cd` into `main`:

1. Go to GitHub repo → **Pull Requests** → **New Pull Request**
2. Set **base:** `main` ← **compare:** `feature/docker-ci-cd`
3. Write a description of the changes made
4. Click **Create Pull Request**
5. Review the changes, resolve any conflicts, and merge

```bash
# After PR is merged on GitHub, sync locally:
git checkout main
git pull origin main

# Delete the feature branch (cleanup)
git branch -d feature/docker-ci-cd
git push origin --delete feature/docker-ci-cd
```

**📸 Screenshot:** *Insert screenshot of an open or merged Pull Request on GitHub*

---

## 4. Dockerfile & Image Creation
*(Page 5)*

### 4.1 Why Docker?

Docker solves the classic **"it works on my machine"** problem by packaging the application and all its dependencies into a portable, self-contained **container image**. This ensures the app behaves identically on any machine — developer laptops, CI servers, and AWS EC2.

### 4.2 Multi-Stage Dockerfile

A **multi-stage build** was used to keep the final image as small as possible. Stage 1 builds the React app using Node.js; Stage 2 copies only the compiled output into a lightweight Nginx image — no Node.js is included in production.

**File: `Dockerfile`**
```dockerfile
# ── Stage 1: Build the React app ─────────────────
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ────────────────────
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**File: `nginx.conf`**
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### 4.3 Building the Docker Image

```bash
# Build the image (run from project root)
docker build -t kle-hackathon:latest .

# View all available images
docker images

# Run the container locally on port 8080
docker run -d -p 8080:80 --name kle-app-test kle-hackathon:latest
```

Expected output from `docker images`:
```
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
kle-hackathon   latest    a3f2b1c4d5e6   2 minutes ago    28.4MB
```

> **Note:** The final image is only ~28 MB because we use Alpine Linux and the multi-stage build removes Node.js from the production image.

**📸 Screenshot:** *Insert screenshot of `docker images` output in terminal, and the site running on localhost:8080*

### 4.4 Pushing the Image to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag the image with your Docker Hub username
docker tag kle-hackathon:latest <YOUR_USERNAME>/kle-hackathon:latest

# Push the image to Docker Hub registry
docker push <YOUR_USERNAME>/kle-hackathon:latest
```

**📸 Screenshot:** *Insert screenshot of the image listed on your Docker Hub repository page*

---

## 5. Docker Compose – Container Execution & Configuration
*(Pages 6 – 10)*

### 5.1 What is Docker Compose?

**Docker Compose** is a tool that allows you to define and run **multi-container** Docker applications using a single `docker-compose.yml` file. While this project is a single-container application, Docker Compose provides a cleaner, more manageable way to configure the container — especially for local development.

### 5.2 Docker Compose File

Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  web:
    image: kle-hackathon:latest
    build:
      context: .
      dockerfile: Dockerfile
    container_name: kle-hackathon-app
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
    labels:
      - "app.name=kle-hackathon"
      - "app.version=1.0.0"
      - "app.description=KLE Jabin Internal Hackathon 2026"
```

### 5.3 Docker Compose Commands

```bash
# Build the image and start the container
docker-compose up --build -d

# View running containers
docker-compose ps

# View live logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop and remove containers + images
docker-compose down --rmi all
```

**📸 Screenshot:** *Insert screenshot of `docker-compose up --build` running in terminal*

### 5.4 GitHub Actions CI/CD Pipeline

**File: `.github/workflows/ci-cd.yml`**

```yaml
name: CI/CD — Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Build & Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test

  docker:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: build-and-test
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest

  deploy:
    name: Deploy to AWS EC2
    runs-on: ubuntu-latest
    needs: docker
    steps:
      - uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest
            docker stop kle-app || true
            docker rm kle-app || true
            docker run -d --name kle-app --restart unless-stopped -p 80:80 \
              ${{ secrets.DOCKERHUB_USERNAME }}/kle-hackathon:latest
```

**📸 Screenshot:** *Insert screenshot of the GitHub Actions tab showing a successful green pipeline run*

### 5.5 AWS EC2 Deployment

#### Launching the EC2 Instance:
1. AWS Console → EC2 → **Launch Instance**
2. Name: `kle-hackathon-server`
3. AMI: **Ubuntu Server 22.04 LTS**
4. Instance type: **t2.micro**
5. Key pair: Create new → download `.pem` file
6. Security Group rules:
   - SSH (port 22) — My IP
   - HTTP (port 80) — Anywhere

**📸 Screenshot:** *Insert screenshot of the EC2 instance in "Running" state in the AWS Console*

#### Setting Up Docker on EC2:
```bash
# SSH into the instance
ssh -i kle-hackathon-key.pem ubuntu@<EC2_PUBLIC_IP>

# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu
```

**📸 Screenshot:** *Insert screenshot of `docker --version` output after installation on EC2*

#### Running the Application:
```bash
docker pull <USERNAME>/kle-hackathon:latest
docker run -d --name kle-app --restart unless-stopped -p 80:80 \
  <USERNAME>/kle-hackathon:latest
docker ps
```

**📸 Screenshot:** *Insert screenshot of the live website at http://<EC2_PUBLIC_IP>*

### 5.6 Environment Variables & GitHub Secrets

| Secret | Where Set | Used In |
|---|---|---|
| `DOCKERHUB_USERNAME` | GitHub → Settings → Secrets | CI/CD workflow |
| `DOCKERHUB_TOKEN` | GitHub → Settings → Secrets | CI/CD workflow |
| `EC2_HOST` | GitHub → Settings → Secrets | SSH deployment step |
| `EC2_SSH_KEY` | GitHub → Settings → Secrets | SSH deployment step |

**📸 Screenshot:** *Insert screenshot of GitHub Secrets page with all 4 secrets listed*

### 5.7 Monitoring & Rollback

#### Monitor Logs:
```bash
# Live application logs
docker logs -f kle-app

# Container resource usage
docker stats kle-app
```

#### Perform a Rollback:
```bash
# Stop and remove current container
docker stop kle-app && docker rm kle-app

# Run previous version using its commit SHA tag
docker run -d --name kle-app --restart unless-stopped -p 80:80 \
  <USERNAME>/kle-hackathon:<PREVIOUS_SHA>
```

**📸 Screenshot:** *Insert screenshot of rollback commands and site restored*

---

## 6. Conclusion
*(Page 11)*

This project successfully demonstrated a complete **DevOps engineering pipeline** for a real-world production web application.

### Key Achievements

| Task | Status |
|---|---|
| Web Application Developed (React + Vite) | ✅ Complete |
| Source Code Pushed to GitHub | ✅ Complete |
| Branching Strategy Implemented | ✅ Complete |
| Dockerfile Written (Multi-stage) | ✅ Complete |
| Docker Image Built and Pushed to Docker Hub | ✅ Complete |
| GitHub Actions CI/CD Pipeline Created | ✅ Complete |
| Automated Tests Implemented | ✅ Complete |
| Application Deployed to AWS EC2 | ✅ Complete |
| Environment Variables / GitHub Secrets Configured | ✅ Complete |
| Application Logs Monitored | ✅ Complete |
| New Release Performed via Tags | ✅ Complete |
| Rollback Demonstrated | ✅ Complete |

### Learning Outcomes

Through this project, students gained hands-on experience with:
1. **Docker** — Containerizing a modern web application using a multi-stage build strategy
2. **CI/CD** — Automating the entire build → test → push → deploy cycle using GitHub Actions
3. **Cloud Deployment** — Provisioning and managing an AWS EC2 server for production hosting
4. **Security Best Practices** — Managing secrets safely using GitHub's encrypted secrets store
5. **DevOps Culture** — Understanding how modern software teams deliver applications continuously and reliably

### Real-World Impact

The deployed application (`https://klepcjsihinternalhackathon.vercel.app`) is a live, production web application used by students of KLE Society's P.C. Jabin Science College to register their teams for the Internal Smart India Hackathon 2026. This project demonstrates that DevOps practices are not just theoretical — they are actively used to deliver real software to real users.

---

*Document prepared for DevOps Engineering Lab — KLE Society's P.C. Jabin Science College, Department of Computer Applications, Hubli.*
