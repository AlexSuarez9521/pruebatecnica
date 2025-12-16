# CRUD de Productos - Prueba Técnica

Sistema completo de gestión de productos con operaciones CRUD, cálculo de inventario y funcionalidades especiales.

## Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **MySQL 9.x**
- **Maven**

### Frontend
- **React 18**
- **Axios**
- **CSS3 (Variables CSS, Flexbox, Grid)**

### Diseño
- **Paleta de colores**: Basada en la identidad visual de [Comercial Card - PTM](https://www.ptm.com.co/)
- **Colores principales**: Coral/Salmon (#F37B7B), Verde (#2ECC71), Blanco
- **Estilo**: Diseño moderno con gradientes, sombras suaves y efectos hover

## Requisitos Previos

Asegúrate de tener instalado:

- **JDK 17** o superior
- **Maven 3.8+**
- **Node.js 18+** y **npm 9+**
- **MySQL 8.0+**

## Configuración e Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd crud-productos
```

### 2. Configurar la Base de Datos

#### Opción A: Ejecutar el script SQL

```bash
mysql -u root -p < scripts/database.sql
```

#### Opción B: Crear manualmente

```sql
CREATE DATABASE IF NOT EXISTS crud_app;
```

> **Nota:** La aplicación creará automáticamente la tabla `productos` al iniciar gracias a `spring.jpa.hibernate.ddl-auto=update`.

### 3. Configurar Credenciales de MySQL

Si tu MySQL tiene contraseña, edita el archivo `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA
```

### 4. Iniciar el Backend

```bash
cd backend
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 5. Iniciar el Frontend

En una nueva terminal:

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
crud-productos/
├── backend/                          # API REST con Spring Boot
│   ├── src/main/java/
│   │   └── com/pruebatecnica/crudproductos/
│   │       ├── config/               # Configuración CORS
│   │       ├── controller/           # Controladores REST
│   │       ├── dto/                  # Data Transfer Objects
│   │       ├── exception/            # Manejo de excepciones
│   │       ├── model/                # Entidades JPA
│   │       ├── repository/           # Repositorios Spring Data
│   │       ├── service/              # Lógica de negocio
│   │       └── CrudProductosApplication.java
│   ├── src/main/resources/
│   │   └── application.properties    # Configuración
│   └── pom.xml
│
├── frontend/                         # Aplicación React
│   ├── src/
│   │   ├── components/               # Componentes React
│   │   │   ├── ProductoList.js       # Lista con ordenamiento
│   │   │   ├── ProductoForm.js       # Formulario CRUD
│   │   │   ├── InventarioResumen.js  # Resumen de inventario
│   │   │   ├── Combinaciones.js      # Combinaciones de productos
│   │   │   ├── CatFactsModal.js      # Modal datos de gatos
│   │   │   └── UselessFactFooter.js  # Footer con dato inútil
│   │   ├── services/
│   │   │   └── api.js                # Servicios HTTP
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
├── scripts/
│   └── database.sql                  # Script de creación de BD
│
└── README.md
```

## API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |
| GET | `/api/productos/inventario/resumen` | Resumen del inventario |
| GET | `/api/productos/combinaciones/{valor}` | Combinaciones de productos |

### Ejemplo de Producto (JSON)

```json
{
  "nombre": "Laptop HP Pavilion",
  "descripcion": "Laptop HP 15.6 pulgadas",
  "precio": 2500000.00,
  "cantidadStock": 10
}
```

## Funcionalidades

### Backend

1. **CRUD Completo** - Crear, leer, actualizar y eliminar productos
2. **Valor Total del Inventario** - Suma de (precio × cantidad) de todos los productos
3. **Producto con Mayor Valor** - Producto con mayor valor en inventario
4. **Combinaciones de Productos** - Algoritmo que encuentra combinaciones de 2-3 productos cuya suma de precios sea ≤ valor ingresado

### Frontend

1. **Gestión de Productos** - Formulario para agregar/editar/eliminar
2. **Lista Ordenable** - Tabla con ordenamiento por columnas (sin llamar al backend)
3. **Resumen de Inventario** - Muestra valor total y producto con mayor valor
4. **Búsqueda de Combinaciones** - Input para buscar combinaciones por presupuesto
5. **Datos de Gatos** - Modal emergente al cargar con 2 datos sobre gatos (API MeowFacts)
6. **Dato Inútil del Día** - Footer con dato curioso (API Useless Facts)

## APIs Externas Integradas

- **MeowFacts API**: `https://meowfacts.herokuapp.com/?count=2&lang=esp`
- **Useless Facts API**: `https://uselessfacts.jsph.pl/api/v2/facts/today`

## Ejemplo de la Función de Combinaciones

Para productos A, B, C, D con precios 2, 4, 6, 8 respectivamente:

Al ingresar valor máximo **10**, el resultado sería:
```json
[
  ["A", "D", 10],
  ["B", "C", 10],
  ["A", "C", 8],
  ["A", "B", 6]
]
```

## Capturas de Pantalla

La aplicación incluye:
- Header con gradiente coral/salmon
- Tarjetas de resumen con efectos hover
- Tabla de productos con ordenamiento visual
- Modal animado para datos de gatos
- Footer con estilo corporativo

## Solución de Problemas

### El backend no conecta a MySQL

1. Verifica que MySQL esté corriendo:
   ```bash
   brew services list | grep mysql
   ```

2. Verifica las credenciales en `application.properties`

### El frontend no conecta al backend

1. Asegúrate de que el backend esté corriendo en el puerto 8080
2. Verifica que CORS esté configurado correctamente

### Error de puertos en uso

```bash
# Verificar puerto 8080
lsof -i :8080

# Verificar puerto 3000
lsof -i :3000
```

## Autor

Prueba Técnica - Analista Desarrollador

## Licencia

Este proyecto es parte de una prueba técnica.
