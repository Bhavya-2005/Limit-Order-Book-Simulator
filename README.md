# Limit Order Book Simulator

A real-time trading system simulator inspired by modern electronic exchanges.

## Features

- Buy and Sell order handling
- FIFO order matching
- FastAPI backend
- React frontend
- Redis integration
- Real-time execution engine
- Event-driven architecture

---

## Tech Stack

### Backend
- Python
- FastAPI
- Redis

### Frontend
- React
- Vite

### Other Technologies
- Kafka concepts
- Distributed systems architecture

---

## Project Structure

```text
lob-simulator/
│
├── backend/
├── frontend/
├── screenshots/
├── README.md
└── requirements.txt
```

---

## System Architecture

```text
Frontend -> FastAPI -> Matching Engine -> Order Book -> Trade Execution
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Limit-Order-Book-Simulator.git
```

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

- WebSocket live updates
- Partial order fills
- Market orders
- Order cancellation
- Docker deployment
- Kubernetes deployment
- Latency monitoring

---

## Screenshots

(Add screenshots here later)

---

## Author

Bhavya B