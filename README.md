# ⚡ Energy Impact Planner

Aplicación completa (Frontend + Backend + Base de datos) para planificar acciones de ahorro energético, calcular su impacto en **kWh**, **CO₂ evitado** y **ahorro económico anual**, y presentarlo de forma clara y visual.

Permite a hogares, empresas y organizaciones medir el impacto real de sus estrategias de eficiencia energética.

---

## 🚀 Características principales

### ✔ Define acciones de ahorro energético
Cada acción incluye:
- Nombre de la acción  
- Categoría (Hogar, Oficina, Producción, Transporte…)  
- Consumo actual (kWh/año)  
- Reducción estimada (%)  
- Precio de la energía (€/kWh)  
- Factor de emisión (kg CO₂/kWh)  
- Número de personas afectadas

### ✔ Cálculos automáticos
La app calcula:

- 🔋 **Ahorro energético** (kWh/año)  
- 🌍 **CO₂ evitado** (kg/año)  
- 💶 **Ahorro económico anual** (€)  
- 👥 **Impacto por personas afectadas**

### ✔ Resumen global del plan
Incluye:
- Suma total de kWh ahorrados
- Total de CO₂ evitado
- Ahorro anual acumulado
- Filtrado por categoría
- Eliminación de una acción o de todo el plan
- Persistencia de datos en MongoDB

---

# 🧩 Tecnologías utilizadas

### **Frontend**
- HTML + CSS (estático)
- JavaScript modular (ES Modules)
- Consumo de API vía `fetch`
- Servido con **Nginx** dentro de Docker

### **Backend**
- Node.js + Express
- Arquitectura escalable por capas:
  - `routes/`
  - `controllers/`
  - `services/`
  - `repositories/`
  - `models/`
- Mongoose (MongoDB)
- Cálculo automático de impacto de cada acción

### **Infraestructura**
- Docker + Docker Compose
- Contenedores para:
  - `mongo`
  - `backend`
  - `frontend`
---

# 🐳 Ejecución con Docker

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/kerrifai/energy-impact
cd energy-impact
```

### 2️⃣ Levanta todos los servicios

```bash
docker compose up --build
```

| Servicio | Puerto   | Descripción             |
| -------- | -------- | ----------------------- |
| frontend | **5500** | Interfaz visual (Nginx) |
| backend  | **4000** | API REST (Node.js)      |
| mongo    | 27017    | Base de datos           |

### 3️⃣ Abre la aplicación web
```bash
http://localhost:5500
```
