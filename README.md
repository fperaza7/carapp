# CarApp - Sistema de Gestión de Autos

Sistema de gestión de autos con autenticación JWT, construido con Spring Boot (backend) y React + TypeScript + Tailwind CSS (frontend).

## Características

### Funcionalidades Implementadas

#### Autenticación
- Registro de usuario
- Login con JWT
- Protección de rutas con token

#### Gestión de Autos
- Crear auto con marca, modelo, año, placa, color
- Listar todos los autos del usuario
- Editar datos de un auto
- Eliminar auto
- Búsqueda por placa
- Búsqueda por modelo
- Búsqueda por año
- Búsqueda por marca

#### Interfaz de Usuario
- Diseño responsive
- Componentes estilizados con Tailwind CSS

## Tecnologías Utilizadas

### Backend
- **Java 25** con Spring Boot 3
- **Spring Security** con JWT
- **Spring Data JPA** / Hibernate
- **SQL Server** como base de datos
- **Maven** para gestión de dependencias

### Frontend
- **React 19** con TypeScript
- **Vite** como build tool
- **React Router DOM** para navegación
- **Axios** para peticiones HTTP
- **Tailwind CSS** para estilos
- **Context API** para gestión de estado

## Instalación y Configuración

### 1. Backend (Spring Boot)

#### Configuración de Base de Datos

Asegúrate de tener SQL Server corriendo y configura las credenciales en `application.properties`:


```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=carapp_db;encrypt=true;trustServerCertificate=true
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```

Compilar y ejecutar
```bash
cd carapp-api

./mvnw clean install
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8881`

### Iniciar la base de datos con Docker (opcional)

Levanta SQL Server con docker-compose (incluye scripts que crean la base y el usuario):

```bash
# desde la raíz del repo
docker compose up -d
```

Configura las credenciales en `application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=carapp_db;encrypt=true;trustServerCertificate=true
spring.datasource.username=carapp_user
spring.datasource.password=Password123*
spring.jpa.hibernate.ddl-auto=update
```


### 2. Frontend (React)

```bash
cd carapp-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`



## Endpoints de la API

Se incluye una colección de Postman en la raíz del proyecto (`CarApp.postman_collection.json`) que contiene requests para registro, login y las operaciones de autos.

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login

### Gestión de Autos (requieren token JWT)
- `GET /api/cars` - Listar todos los autos del usuario
- `POST /api/cars` - Crear nuevo auto
- `PUT /api/cars/{id}` - Actualizar auto
- `DELETE /api/cars/{id}` - Eliminar auto
- `GET /api/cars/search?plateNumber=ABC` - Buscar por placa
- `GET /api/cars/search?model=Corolla` - Buscar por modelo
- `GET /api/cars/search?year=2020` - Buscar por año
- `GET /api/cars/search?brand=Toyota` - Buscar por marca
