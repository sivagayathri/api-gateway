# 🛒 Product Service

This is a microservice that manages products in an e-commerce or inventory system. It handles product creation and sends events to a Redis-backed message queue (using BullMQ) for further asynchronous processing like sending notifications, syncing with other services, etc.

---

## ⚙️ Tech Stack

- **Node.js + Express** – REST API framework
- **MongoDB** – Database for storing products
- **Mongoose** – MongoDB ORM
- **Redis + BullMQ** – Message queue for async event processing

---

## 📁 Folder Structure
