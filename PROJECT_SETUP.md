# L.A.M.A. Medellín Frontend - Setup Guide

## Tecnologías Utilizadas

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP
- **ESLint** - Linter de código

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── common/       # Componentes comunes (Button, Input, etc.)
│   └── layout/       # Componentes de layout (Header, Footer, Layout)
├── pages/            # Páginas de la aplicación
│   ├── Auth/         # Páginas de autenticación
│   ├── Home/         # Página principal
│   └── Members/      # Gestión de miembros
├── services/         # Servicios de API
│   └── api/          # Llamadas a la API
├── context/          # Contextos de React (AuthContext)
├── hooks/            # Custom hooks
├── types/            # Definiciones de tipos TypeScript
├── utils/            # Funciones utilitarias
└── config/           # Configuración y constantes
```

## Instalación

### Prerrequisitos

- Node.js 18+ y npm
- Git

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/JuanSeRestrepoNieto/L.A.M.A.Medellin.Front.git
cd L.A.M.A.Medellin.Front
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_AZURE_AD_CLIENT_ID=tu-client-id
VITE_AZURE_AD_AUTHORITY=https://tu-tenant.b2clogin.com/...
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run lint` - Ejecutar linter
- `npm run preview` - Vista previa de la compilación de producción

## Características Implementadas

### ✅ Estructura del Proyecto
- Estructura de carpetas organizada siguiendo best practices
- Separación de concerns (components, pages, services)
- Configuración de TypeScript

### ✅ Componentes Reutilizables
- Button - Componente de botón con variantes
- Input - Campo de entrada con validación
- Header - Barra de navegación
- Footer - Pie de página
- Layout - Wrapper de layout principal

### ✅ Enrutamiento
- React Router configurado
- Rutas protegidas (requieren autenticación)
- Página 404 con redirect

### ✅ Autenticación
- Context API para gestión de estado de autenticación
- Estructura para integración con Azure AD B2C
- Login con email/password (mock)
- Preparado para login social (Facebook, Google)

### ✅ Gestión de Miembros
- Página de listado de miembros
- Tabla responsive con información de miembros
- Integración con servicio de API (mock data)

### ✅ Servicios de API
- Cliente HTTP configurado con Axios
- Interceptores para tokens de autenticación
- Manejo de errores centralizado
- Servicio de miembros con CRUD completo

### ✅ Estilos
- Tailwind CSS configurado
- Diseño responsive
- Paleta de colores consistente
- Componentes estilizados

### ✅ TypeScript
- Tipos definidos para todas las entidades
- Interfaces para respuestas de API
- Tipado completo en componentes y servicios

## Próximos Pasos

### Integración de Backend
1. Conectar con la API real del backend
2. Implementar manejo de errores de API
3. Agregar loading states y feedback de usuario

### Autenticación con Azure AD B2C
1. Instalar `@azure/msal-react` y `@azure/msal-browser`
2. Configurar MSAL (Microsoft Authentication Library)
3. Implementar login social con Facebook y Google
4. Agregar protección de rutas con tokens

### Funcionalidades Adicionales
1. Búsqueda y filtrado de miembros
2. Formularios de creación/edición de miembros
3. Exportación de datos (CSV, Excel)
4. Importación de datos
5. Dashboard con estadísticas
6. Manejo de roles y permisos

### Testing
1. Configurar Jest y React Testing Library
2. Agregar tests unitarios para componentes
3. Agregar tests de integración
4. Configurar CI/CD

## Buenas Prácticas Implementadas

1. **Organización del Código**
   - Separación clara de responsabilidades
   - Componentes pequeños y reutilizables
   - Custom hooks para lógica compartida

2. **TypeScript**
   - Tipado estricto
   - Interfaces para todas las entidades
   - Type safety en toda la aplicación

3. **Manejo de Estado**
   - Context API para estado global
   - useState para estado local
   - Preparado para Redux/Zustand si es necesario

4. **Estilos**
   - Utility-first con Tailwind CSS
   - Diseño mobile-first
   - Consistencia visual

5. **Seguridad**
   - Variables de entorno para configuración sensible
   - Tokens de autenticación en localStorage
   - Preparado para Azure AD B2C

6. **Performance**
   - Vite para compilación rápida
   - Code splitting con React Router
   - Lazy loading preparado

## Recursos Útiles

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Azure AD B2C Documentation](https://learn.microsoft.com/azure/active-directory-b2c/)

## Contribución

Para contribuir al proyecto:

1. Crear un branch desde `main`
2. Hacer los cambios necesarios
3. Ejecutar linter: `npm run lint`
4. Crear un Pull Request

## Soporte

Para preguntas o problemas, crear un issue en el repositorio de GitHub.
