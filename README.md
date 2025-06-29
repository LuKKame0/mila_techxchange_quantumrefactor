# Quantum Refactor Auditor

A quantum security assessment tool that analyzes web applications for post-quantum cryptography readiness using advanced AI models.

## Features

- **Multi-AI Service Support**: Choose between Google Gemini and NVIDIA NIM (IBM Granite) for analysis
- **Quantum Security Focus**: Specialized in post-quantum cryptography assessment
- **Real-time Analysis**: Get detailed security reports with actionable recommendations
- **Modern UI**: Clean, responsive interface with dark theme
- **Secure Backend**: All API calls are proxied through a secure backend server

## Run Locally

**Prerequisites:** Node.js

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm install --prefix server
```

### 2. Set up Environment Variables

Create a `server/.env` file for the backend:
```bash
# NVIDIA NIM API Key
NVIDIA_API_KEY=yor_nvidia_api_key_here

# Google Gemini API Key (optional)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Servers

**Terminal 1 - Start the backend server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the frontend:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/` and the backend at `http://localhost:3001/`.

## AI Services

### Google Gemini
- Uses Google's Gemini 2.5 Flash model
- Fast and reliable analysis
- Requires Gemini API key in `server/.env`
- **Securely proxied through backend server**

### NVIDIA NIM (IBM Granite)
- Uses IBM's Granite 3.3-8B model via NVIDIA NIM
- Advanced reasoning capabilities
- Requires NVIDIA NIM API key in `server/.env`
- **Securely proxied through backend server**

## Usage

1. Select your preferred AI service (Gemini or NVIDIA NIM)
2. Enter a URL to analyze
3. Click "Analyze" to generate a quantum security report
4. Review the detailed analysis and recommendations

## Build for Production

```bash
npm run build
```

## Architecture

- **Frontend**: React + Vite application running on port 5173
- **Backend**: Express.js server running on port 3001
- **Security**: All API keys are kept secure on the backend server
- **Endpoints**: 
  - `POST /api/nim-audit` - NVIDIA NIM IBM's Granite 3.3-8B model analysis
  - `POST /api/gemini-audit` - Google Gemini analysis

---

**Made by Mila Zurbriggen for IBM TechXChange - 29 June 2025**
