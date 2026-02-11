# API Gateway

The central entry point for all client requests in the Shopverse microservices architecture. Built with NestJS.

## Overview

The API Gateway handles:
- Request routing to appropriate microservices
- User management proxy (via Redis RPC to User Service)
- Product creation queue management (via BullMQ)
- API documentation (Swagger)

## Port

- **Default**: 3000
- **Configurable via**: `PORT` environment variable

## Prerequisites

- Node.js >= 18.x
- Redis server running
- User Service running (for user endpoints)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of this service:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
```

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| REDIS_URL | Redis connection URL | redis://localhost:6379 |

## Running the Service

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Service health check |

### User Endpoints (Proxied to User Service)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /user | Create new user |
| POST | /user/login | User login |
| GET | /user/:id | Get user by ID |
| PATCH | /user/:id | Update user |
| DELETE | /user/:id | Delete user |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /products-service | Queue product creation job |

## Swagger Documentation

Access Swagger UI at: `http://localhost:3000/api`

## Architecture

```
                     API GATEWAY
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │    User     │  │  Product    │  │   Queue     │      │
│  │  Controller │  │ Controller  │  │   Module    │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │
│         │                │                │              │
│         ▼                ▼                ▼              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │    User     │  │   Queue     │  │   BullMQ    │      │
│  │   Service   │  │   Service   │  │   Config    │      │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘      │
│         │                │                               │
└─────────┼────────────────┼───────────────────────────────┘
          │                │
          ▼                ▼
   ┌─────────────┐  ┌─────────────┐
   │    Redis    │  │    Redis    │
   │  (RPC to    │  │  (BullMQ    │
   │User Service)│  │   Queue)    │
   └─────────────┘  └─────────────┘
```

## Request/Response Examples

### Create User

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400001"
    }
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Queue Product Creation

```bash
curl -X POST http://localhost:3000/products-service \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD-001",
    "name": "Sample Product",
    "description": "A sample product",
    "category": "Electronics",
    "price": 999,
    "stock": 100
  }'
```

## Dependencies

| Package | Purpose |
|---------|---------|
| @nestjs/core | NestJS framework |
| @nestjs/microservices | Redis transport for microservices |
| @nestjs/bullmq | BullMQ integration |
| @nestjs/swagger | API documentation |
| @nestjs/config | Environment configuration |
| ioredis | Redis client |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start in production mode |
| `npm run start:dev` | Start in development mode with hot reload |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start compiled production build |
| `npm run build` | Build the application |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |

## Troubleshooting

### Redis Connection Issues
- Ensure Redis is running: `redis-cli ping`
- Check REDIS_URL format: `redis://host:port`

### User Service Not Responding
- Verify User Service is running
- Check Redis connectivity between services
- Review User Service logs for errors

### BullMQ Queue Issues
- Verify Redis connection
- Check queue names match between services
- Monitor queue using Redis CLI or Bull Dashboard
