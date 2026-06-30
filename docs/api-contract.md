# API CONTRACT
# RoboClean Landing Page

Version: 1.0

---

# 1. Overview

Base URL

```
/api/v1
```

Protocol

HTTPS

Data Format

JSON

Encoding

UTF-8

Time Format

ISO-8601 (UTC)

```
2026-06-30T07:50:00Z
```

Authentication

None

---

# 2. API Conventions

## Request Headers

```
Content-Type: application/json
Accept: application/json
```

---

## Success Response

```json
{
    "success": true,
    "message": "",
    "data": {}
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "",
    "errors": {}
}
```

---

# 3. HTTP Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created|
|204|No Content|
|400|Validation Error|
|404|Resource Not Found|
|409|Conflict|
|500|Internal Server Error|

---

# 4. Endpoints

---

## 4.1 Get Products

### Endpoint

```
GET /products
```

Description

Return all active products.

### Query Parameters

| Name | Required | Description |
|------|----------|-------------|
|page|No|Page number|
|size|No|Page size|

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "RoboClean Pro X",
      "sku": "ROBO-X",
      "price": 12990000,
      "originalPrice": 14990000,
      "description": "...",
      "imageUrl": "...",
      "specifications": {
        "suctionPower": "6000Pa",
        "battery": "5200mAh"
      }
    }
  ]
}
```

---

## 4.2 Subscribe Newsletter

### Endpoint

```
POST /subscribers
```

### Request

```json
{
    "fullName":"Nguyen Van A",
    "email":"abc@gmail.com",
    "phone":"0123456789"
}
```

### Validation

| Field | Rules |
|------|---------|
|fullName|required|
|email|required, email|
|phone|optional|

### Response

```json
{
    "success":true,
    "message":"Subscription successful.",
    "data":{
        "id":"uuid",
        "status":"ACTIVE"
    }
}
```

---

## 4.3 Send Chat Message

### Endpoint

```
POST /chat
```

### Request

```json
{
    "sessionId":"session-id",
    "message":"Robot này có tự giặt giẻ không?"
}
```

### Response

```json
{
    "success":true,
    "data":{
        "reply":"Có, RoboClean hỗ trợ..."
    }
}
```

---

## 4.4 Tracking Event

### Endpoint

```
POST /tracking/events
```

### Request

```json
{
    "sessionId":"uuid",
    "eventType":"CLICK",
    "page":"/",
    "target":"btn-buy-now",
    "metadata":{
        "screenWidth":1440,
        "screenHeight":900
    }
}
```

### Supported Events

```
CLICK

SCROLL

VIEW_PRODUCT

ADD_TO_CART

ADD_TO_WISHLIST

CHAT_OPEN
```

### Response

```json
{
    "success":true,
    "message":"Tracking event recorded."
}
```

---

## 4.5 Get Reviews

### Endpoint

```
GET /reviews
```

### Response

```json
{
    "success":true,
    "data":[
        {
            "customerName":"John",
            "rating":5,
            "comment":"Amazing product."
        }
    ]
}
```

---

## 4.6 Get FAQ

### Endpoint

```
GET /faq
```

### Response

```json
{
    "success":true,
    "data":[
        {
            "question":"Robot có bảo hành không?",
            "answer":"24 tháng."
        }
    ]
}
```

---

# 5. Error Responses

## Validation Error

```json
{
    "success":false,
    "message":"Validation failed.",
    "errors":{
        "email":"Invalid email."
    }
}
```

---

## Resource Not Found

```json
{
    "success":false,
    "message":"Product not found."
}
```

---

## Internal Server Error

```json
{
    "success":false,
    "message":"Unexpected server error."
}
```

---

# 6. API Naming Rules

Resources

```
/products

/reviews

/subscribers

/chat

/tracking/events

/faq
```

Use plural nouns.

Use kebab-case when necessary.

No verbs in endpoint names.

---

# 7. Versioning

Current Version

```
v1
```

Future versions

```
/api/v2
```

---

# 8. Idempotency

GET

Safe

POST

Non-idempotent

---

# 9. Rate Limiting

Not enabled in current version.

Reserved for future implementation.

---

# 10. API Flow

Newsletter

```
Frontend

↓

POST /subscribers

↓

Validation

↓

Database

↓

Webhook

↓

Response
```

Chat

```
Frontend

↓

POST /chat

↓

Gemini

↓

Response
```

Tracking

```
Frontend

↓

POST /tracking/events

↓

Database

↓

Webhook
```