# Microservices Advanced

A full-stack ticketing platform built to explore **microservice architecture, event-driven communication, distributed systems, authentication, payments, caching, background jobs, and Kubernetes**.

The project is primarily a learning project where I have focused on understanding how independently deployable services communicate and how common distributed-system problems can be solved in practice.

## 🚀 Overview

The application allows users to browse and reserve tickets for events.

Instead of implementing the entire backend as one application, the system is divided into multiple services. Each service owns a specific responsibility and communicates with other services through APIs and asynchronous events.

The project currently includes services for:

- Authentication
- Tickets
- Orders
- Payments
- Order expiration
- Client/frontend
- Shared libraries and infrastructure

The architecture is designed to simulate a production-style distributed application rather than a traditional monolithic backend.

## 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │     Client      │
                         │    Next.js      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Ingress      │
                         │   Kubernetes    │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
       │    Auth     │     │   Tickets   │     │    Orders   │
       │   Service   │     │   Service   │     │   Service   │
       └─────────────┘     └──────┬──────┘     └──────┬──────┘
                                  │                   │
                                  │                   │
                                  ▼                   ▼
                           ┌─────────────────────────────┐
                           │       Event Bus             │
                           │    NATS Streaming           │
                           └──────────────┬──────────────┘
                                          │
                           ┌──────────────┼──────────────┐
                           │              │              │
                           ▼              ▼              ▼
                    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                    │  Payments   │ │  Expiration │ │    Other    │
                    │   Service   │ │   Service   │ │  Consumers  │
                    └─────────────┘ └─────────────┘ └─────────────┘

                    ┌─────────────┐       ┌─────────────┐
                    │    Redis    │       │   MongoDB   │
                    │   Caching   │       │ Persistence │
                    └─────────────┘       └─────────────┘
```

## 🧩 Services

### Auth Service

Responsible for user authentication and authorization.

Responsibilities include:

- User registration
- User login
- Authentication
- JWT-based authorization
- Publishing authentication-related events

### Tickets Service

Responsible for creating and managing tickets.

Responsibilities include:

- Creating tickets
- Updating tickets
- Publishing ticket events
- Preventing tickets from being sold when they are no longer available

### Orders Service

Responsible for creating and managing ticket orders.

When an order is created, an event is published so other services can react independently.

### Payments Service

Handles payment-related operations.

The service demonstrates how payment processing can be separated from the order workflow and communicate asynchronously with the rest of the system.

### Expiration Service

Responsible for expiring orders that have not been completed within a specified period.

This service demonstrates how delayed/background processing can be used in a distributed system.

### Client

The frontend application provides the user interface for interacting with the ticketing platform.

The frontend communicates with the backend services through the Kubernetes ingress.

## 🔄 Event-Driven Architecture

One of the main goals of this project is learning **event-driven architecture (EDA)**.

Instead of tightly coupling services together through synchronous HTTP requests, services publish events when something important happens.

For example:

```text
User creates order
        │
        ▼
 Orders Service
        │
        │ OrderCreated
        ▼
   Event Bus
     /     \
    /       \
   ▼         ▼
Payments   Expiration
 Service    Service
```

The `OrderCreated` event can be consumed independently by multiple services.

This means the Orders service does not need to know the internal implementation of Payments or Expiration.

### Example event flow

```text
Ticket Reserved
      │
      ▼
Order Created
      │
      ├──────────────► Payment Service
      │
      └──────────────► Expiration Service
                              │
                              ▼
                       Order Expired
                              │
                              ▼
                       Ticket Released
```

This helped me understand concepts such as:

- Event producers and consumers
- Eventual consistency
- Service boundaries
- Asynchronous communication
- Event contracts
- Idempotent event handling
- Distributed workflows

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript

### Backend

- Node.js
- TypeScript
- Express.js
- REST APIs

### Architecture

- Microservices
- Event-Driven Architecture
- Asynchronous messaging
- Distributed systems

### Messaging & Background Processing

- NATS Streaming
- Bull
- Redis

### Databases

- MongoDB
- Mongoose

### Infrastructure

- Docker
- Kubernetes
- Kubernetes Ingress
- Skaffold

### CI/CD

- GitHub Actions

### Payments

- Stripe

## 🐳 Docker & Kubernetes

The services are containerized using Docker and orchestrated locally with Kubernetes.

Kubernetes is used to explore concepts such as:

- Pods
- Deployments
- Services
- Secrets
- ConfigMaps
- Ingress
- Service-to-service communication

Skaffold is used during development to simplify the Kubernetes development workflow.

## ⚡ Redis

Redis is used for fast in-memory operations and caching.

The project also uses Redis as part of background processing and demonstrates how an in-memory data store can be used alongside a persistent database.

This helped me understand the difference between:

- Persistent storage
- Temporary state
- Caching
- Distributed application state

## ⏱️ Background Jobs & Expiration

Orders need to expire when a payment is not completed within a specific period.

The project uses background processing to handle delayed work.

A simplified flow is:

```text
Order Created
     │
     ▼
Schedule expiration
     │
     ▼
Payment not completed
     │
     ▼
Expiration job executes
     │
     ▼
Order Expired
     │
     ▼
Ticket becomes available again
```

This was an important part of learning how asynchronous work can be separated from the request/response lifecycle.

## 🔐 Authentication

Authentication is implemented as a separate service.

The system uses JWT-based authentication and service-level authorization to protect resources.

Separating authentication from the other business services allowed me to explore how authentication can work in a microservice environment instead of being embedded directly into every service.

## 💳 Payments

The payment workflow uses Stripe to simulate a real payment process.

The order and payment responsibilities are separated so that the Orders service does not directly contain the payment implementation.

This separation makes it possible to evolve the payment functionality independently from the rest of the application.

## 🔄 CI/CD

GitHub Actions are used to automate parts of the development workflow.

The project uses automated workflows for tasks such as:

- Building services
- Running checks
- Building Docker images
- Working with Kubernetes deployments

The goal was to gain practical experience with CI/CD rather than only developing and running everything locally.

## 📁 Project Structure

The repository is organized around independently deployable services and shared infrastructure.

```text
.
├── auth/
├── tickets/
├── orders/
├── payments/
├── expiration/
├── client/
├── common/
├── infra/
├── .github/
└── skaffold.yaml
```

The exact structure may evolve as the project continues to develop.

## 🎯 What I Learned

The main purpose of this project was not simply to build a ticketing application, but to understand the engineering problems that appear when an application is split into multiple services.

Through the project I have gained practical experience with:

- Designing service boundaries
- REST API development
- Event-driven communication
- Asynchronous processing
- Database-per-service concepts
- Distributed application state
- Caching with Redis
- Background jobs
- Authentication and authorization
- Payment integration
- Docker containerization
- Kubernetes
- Ingress
- CI/CD with GitHub Actions
- Working with shared event contracts
- Handling eventual consistency

The project also made me interested in learning more about messaging systems such as **RabbitMQ and Apache Kafka**, as well as cloud-native development and distributed-system design.

## 📚 Project Status

This is an ongoing learning project.

The architecture and implementation are continuously improved as I learn more about microservices, event-driven architecture, Kubernetes, cloud infrastructure, and distributed systems.

## 👨‍💻 About Me

I am a web developer primarily focused on TypeScript, React, Next.js, Angular and Node.js.

I build projects independently to expand my knowledge beyond frontend development and am particularly interested in backend development, cloud-native applications, DevOps, microservices and event-driven systems.

More projects and experiments are available on my GitHub profile:

**GitHub:** https://github.com/vladinson009
