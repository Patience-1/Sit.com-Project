
# Babysitting App API Documentation

---

## 1. Auth Routes  
**Base Path:** `/api/auth`

| Method | Endpoint       | Description                        | Auth Required | Request Body / Params                                      | Responses                                |
| POST   | `/register`    | Register new user (parent or sitter) | No            | `{ name, email, password, role?, profilePic?, location?, numberOfChildren? }` | 201 Created / 400 / 500                      |
| POST   | `/login`       | Login user (parent)               | No            | `{ email, password }`                                      | 200 OK (token) / 400 / 500                   |
| POST   | `/logout`      | Logout user (client-side token removal) | Yes           | None                                                      | 200 OK (confirmation)                        |
| POST   | `/refresh`     | Refresh JWT token                 | Yes           | None                                                      | 200 OK (new token)                           |
| GET    | `/me`          | Get logged-in user profile       | Yes           | None                                                      | 200 OK (user data) / 500                      |
| PUT    | `/me`          | Update logged-in user profile    | Yes           | JSON fields to update                                     | 200 OK (updated user) / 400 / 500            |
| DELETE | `/me`          | Delete logged-in user account    | Yes           | None                                                      | 200 OK (confirmation) / 500                   |

---

## 2. User Routes  
**Base Path:** `/api/users`

| Method | Endpoint         | Description                      | Auth Required | Request Body / Params                                   | Responses                                  |
| GET    | `/:id`           | Get user by ID                  | No            | URL param: user ID                                     | 200 OK (user data) / 404 / 500            |
| PUT    | `/:id`           | Update user data                | No            | JSON with any user fields                              | 200 OK (updated user) / 404 / 500         |

---

## 3. Sitter Routes  
**Base Path:** `/api/sitters`

| Method | Endpoint         | Description                     | Auth Required | Request Body / Params                                  | Responses                                  |
| POST   | `/register`      | Register new sitter             | No            | Sitter registration data                              | 201 Created / 400 / 500                    |
| POST   | `/login`         | Login sitter                   | No            | `{ email, password }`                                 | 200 OK (token) / 400 / 500                 |
| GET    | `/`              | Get all sitters                | No            | None                                                  | 200 OK (array of sitters) / 500            |
| GET    | `/:id`           | Get sitter by ID               | Yes           | URL param sitter ID                                   | 200 OK / 404 / 403 / 500                   |
| PUT    | `/:id`           | Update sitter profile          | Yes           | JSON fields to update                                 | 200 OK (updated sitter) / 403 / 404 / 500  |
| DELETE | `/:id`           | Delete sitter profile          | Yes           | URL param sitter ID                                   | 200 OK (deletion confirmation) / 403 / 404 / 500 |

---

## 4. Booking Routes  
**Base Path:** `/api/bookings`

| Method | Endpoint           | Description                      | Auth Required | Request Body / Params                                   | Responses                                  |
| POST   | `/secure`          | Create booking (with sitter match and email confirmation) | Yes           | `{ sitterId, userId, date (ISO) }`                     | 201 Created / 400 / 403 / 404 / 500       |
| GET    | `/`                | Get all bookings for current user | Yes           | None                                                  | 200 OK (array of bookings) / 500            |
| GET    | `/:id`             | Get booking by ID              | Yes           | URL param booking ID                                  | 200 OK / 403 / 404 / 500                   |
| PUT    | `/:id`             | Update booking                | Yes           | JSON fields (e.g., date, status)                       | 200 OK (updated booking) / 400 / 403 / 404 / 500 |
| DELETE | `/:id`             | Cancel booking                | Yes           | URL param booking ID                                  | 200 OK (cancellation confirmation) / 403 / 404 / 500 |

---

# Notes:
- All routes that modify or fetch user-specific data require JWT **authentication** (`protect` middleware).
- `authRoutes` handle registration, login, logout, token refresh, and profile management.
- `bookingRoutes` enforce sitter availability, location, and experience checks on booking creation.
- Nodemailer sends emails on booking creation, update, and cancellation.
- Validation is included on email, date, and role fields.
- Sitter and User models are linked via relations, assumed in Sequelize or your ORM.

---
