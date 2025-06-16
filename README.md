# Spring Boot & Next.js Chat Application

This is a real-time chat application built with a Spring Boot backend and a Next.js frontend. It uses WebSockets for instant message delivery.

## Project Structure

- `/backend-springboot`: Contains the Spring Boot application for the chat server.
- `/frontend-nextjs`: Contains the Next.js application for the chat client.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 21** or later
- **Apache Maven**
- **Node.js** (which includes npm) or **Yarn** / **pnpm** / **Bun**

## Getting Started

### 1. Backend (Spring Boot)

The backend server handles WebSocket connections, user management, and message broadcasting.

**To run the backend:**

1.  Navigate to the backend directory:
    ```bash
    cd backend-springboot
    ```
2.  Run the Spring Boot application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    The backend server will typically start on `http://localhost:8080`.

### 2. Frontend (Next.js)

The frontend provides the user interface for chatting.

**To run the frontend:**

1.  Navigate to the frontend directory:
    ```bash
    cd frontend-nextjs
    ```
2.  Install the dependencies:
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    # or
    # bun install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    # or
    # bun dev
    ```
    The frontend application will typically start on `http://localhost:3000`. Open this URL in your browser.

## Technologies Used

### Backend:

- Java 21
- Spring Boot 3
- Spring WebSocket
- Maven
- Lombok

### Frontend:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- SockJS Client
- StompJS
- Shadcn/ui (components like Card, Button, Input, etc.)

## How It Works

1.  The Next.js frontend connects to the Spring Boot backend via WebSockets (using SockJS and StompJS).
2.  Users enter a username to join the chat.
3.  When a user sends a message, it\'s sent to the backend over the WebSocket connection.
4.  The backend broadcasts the message to all connected clients.
5.  The frontend receives the message and displays it in the chat interface.

## Features

- Real-time messaging using WebSockets.
- User-friendly interface built with Next.js and Tailwind CSS.
- Simple username-based entry to chat rooms.
- Scalable backend built with Spring Boot.
- Modern tech stack including Java 21, Next.js 15, and React 19.
