# Campus & Crema — React: Cafetería con Carrito de Compras y Checkout

> Migración y evolución del proyecto Campus & Crema de HTML/CSS/JS vanilla a React + Vite. Este proyecto ahora incluye una **funcionalidad completa de carrito de compras y un flujo de checkout simulado**, sentando las bases para una futura integración de e-commerce. Sirve como un portfolio que demuestra la arquitectura de componentes, la gestión de estado avanzada con `useReducer` y la integración de `React Router`.

**Demo:** https://campus-crema-react.vercel.app/  
**GitHub Pages:** https://anudoranador87.github.io/campus-crema-react/

---

## ¿Por qué la migración y evolución?

La versión vanilla de Campus & Crema, aunque funcional, presentaba limitaciones en cuanto a la interactividad y la escalabilidad. La migración a React permitió una reestructuración del proyecto hacia una **arquitectura de componentes reutilizables y una gestión de estado centralizada**, facilitando la implementación de funcionalidades complejas como el carrito de compras y el proceso de checkout. Esta evolución transforma el proyecto en una aplicación web más robusta y dinámica, preparada para futuras expansiones como un sistema de e-commerce completo.

---

## Stack Tecnológico

El proyecto está construido con las siguientes tecnologías:

-   **React 18**: Biblioteca principal para la construcción de la interfaz de usuario.
-   **Vite**: Herramienta de construcción rápida para proyectos frontend.
-   **CSS por componente**: Estilos modularizados para cada componente, sin el uso de frameworks CSS.
-   **React Router DOM**: Para la gestión de la navegación y las rutas de la aplicación.
-   **Vercel**: Plataforma utilizada para el despliegue continuo y automático del proyecto.
-   **GitHub Pages**: Alternativa de despliegue para la demo del proyecto.

---

## Estructura del Proyecto

La estructura del directorio `src/` organiza los componentes, datos y contextos de la aplicación de manera modular:

```
src/
├── components/             # Componentes reutilizables de la interfaz de usuario
│   ├── Carousel.jsx        # Carrusel de imágenes con gestión de estado local
│   ├── Footer.jsx          # Pie de página estático
│   ├── FormularioDomicilio.jsx # Formulario para pedidos a domicilio
│   ├── FormularioRecoger.jsx   # Formulario para pedidos de recogida en tienda
│   ├── Hero.jsx            # Sección principal de bienvenida
│   ├── Horarios.jsx        # Componente para mostrar los horarios
│   ├── Menu.jsx            # Componente principal del menú y gestión del carrito/checkout
│   ├── Nav.jsx             # Componente de navegación (posiblemente un subcomponente de Navbar)
│   ├── Navbar.jsx          # Barra de navegación responsive con menú hamburguesa
│   ├── PagoSimulado.jsx    # Componente para la simulación de pago
│   ├── PantallaConfirmacion.jsx # Pantalla final de confirmación del pedido
│   ├── ReservationForm.jsx # Formulario de reservas (funcionalidad independiente)
│   ├── ResumenTicket.jsx   # Muestra el resumen del pedido/ticket
│   ├── SobreNosotros.jsx   # Página con información sobre la cafetería
│   └── TextComponent.jsx   # Componente de texto genérico (uso a revisar)
├── context/                # Contextos de React para la gestión de estado global
│   └── ThemeContext.jsx    # Contexto para la gestión de temas o configuraciones globales
├── Data/                   # Archivos de datos estáticos o mock data
│   └── Horarios.js         # Datos de horarios de la cafetería
├── App.jsx                 # Componente raíz que orquesta la aplicación y define las rutas
├── App.css                 # Estilos globales de la aplicación
└── main.jsx                # Punto de entrada de la aplicación (renderizado de React)
```

---

## Componentes y Decisiones de Arquitectura

El proyecto utiliza una arquitectura basada en componentes con una gestión de estado que combina el estado local de los componentes con un estado global gestionado por `useReducer` para el carrito de compras y el flujo de checkout. La siguiente tabla detalla algunos componentes clave y sus decisiones de estado:

| Componente          | ¿Gestión de Estado? | Variable/Hook Principal | Descripción                                                              |
| :------------------ | :------------------ | :---------------------- | :----------------------------------------------------------------------- |
| `Navbar`            | Sí                  | `isMenuOpen`            | Controla la visibilidad del menú hamburguesa en dispositivos móviles.    |
| `Hero`              | No                  | —                       | Componente estático para la presentación inicial.                       |
| `Carousel`          | Sí                  | `currentIndex`          | Gestiona la imagen actualmente visible en el carrusel.                  |
| `Menu`              | Sí (`useReducer`)   | `state`, `dispatch`     | **Componente central para el carrito de compras y el flujo de checkout.** Gestiona el estado global del ticket, categoría de productos, paso actual del checkout, tipo de entrega y datos del formulario. |
| `ReservationForm`   | Sí                  | `formData`              | Captura y valida los datos del usuario para reservas.                   |
| `Footer`            | No                  | —                       | Contenido estático con información de contacto y dirección.              |
| `FormularioDomicilio` | No (recibe `dispatch`) | —                       | Recibe `dispatch` del `Menu` para actualizar el estado del formulario de domicilio. |
| `FormularioRecoger` | No (recibe `dispatch`) | —                       | Recibe `dispatch` del `Menu` para actualizar el estado del formulario de recogida. |
| `PagoSimulado`      | No (recibe `dispatch`) | —                       | Recibe `dispatch` del `Menu` para avanzar al siguiente paso del checkout. |

**Decisión clave de estado:** El componente `Menu.jsx` centraliza la lógica del carrito de compras y el checkout utilizando el hook `useReducer`. Esto permite una gestión de estado predecible y escalable para las interacciones del usuario con el menú, la adición/eliminación de productos, y el avance a través de los diferentes pasos del proceso de compra. Los componentes relacionados con el checkout (`FormularioDomicilio`, `FormularioRecoger`, `PagoSimulado`) reciben la función `dispatch` y partes del `state` del `Menu` para interactuar con el estado global sin gestionarlo directamente.

---

## Funcionalidades Actuales

El proyecto Campus & Crema — React ofrece las siguientes funcionalidades:

-   **Navegación Responsive**: Barra de navegación adaptable con un menú hamburguesa para dispositivos móviles.
-   **Sección Hero**: Presentación visual atractiva con imagen de fondo y texto superpuesto.
-   **Carrusel de Imágenes**: Un carrusel interactivo para destacar productos o ambientes.
-   **Menú Interactivo**: Visualización de productos en una cuadrícula, filtrable por categorías (café, salado, dulce).
-   **Carrito de Compras**: Los usuarios pueden añadir productos al carrito, ajustar cantidades y ver un resumen detallado del pedido.
-   **Flujo de Checkout Completo**: Implementación de un proceso de compra en varios pasos:
    1.  **Selección de Tipo de Entrega**: Opción de elegir entre `A domicilio` o `Recoger en tienda`.
    2.  **Formularios Dinámicos**: Formularios específicos para cada tipo de entrega (domicilio con dirección, recogida con nombre y teléfono).
    3.  **Pago Simulado**: Un paso de pago simulado para demostración, sin transacciones reales.
    4.  **Pantalla de Confirmación**: Resumen final del pedido con los detalles de la compra y la información de entrega.
-   **Cálculo de Precios**: Cálculo automático de subtotal, IVA (10%) y total del pedido.
-   **Página "Sobre Nosotros"**: Información detallada sobre la cafetería.
-   **Sección de Horarios**: Muestra los horarios de apertura.
-   **Formulario de Reservas**: Un formulario independiente para gestionar reservas.
-   **Footer**: Pie de página con información de contacto y dirección.

---

## Próximos Pasos

El proyecto continúa en desarrollo, con los siguientes objetivos a futuro:

-   **Integración de Base de Datos/Backend**: Implementar un backend para la gestión persistente de pedidos, usuarios y productos.
-   **Sistema de Autenticación**: Añadir funcionalidades de registro e inicio de sesión para usuarios.
-   **Pasarela de Pago Real**: Integrar una pasarela de pago para procesar transacciones reales.
-   **Gestión de Pedidos en Tiempo Real**: Desarrollar un panel para que el personal de la cafetería pueda gestionar los pedidos entrantes.
-   **Optimización de Rendimiento**: Mejoras continuas en la carga y renderizado de la aplicación.

---

## Aprendizajes de la Migración

La migración y el desarrollo en React han proporcionado valiosos aprendizajes:

-   **Gestión de Rutas de Imágenes**: En React, las imágenes estáticas deben ubicarse en `public/` y referenciarse desde la raíz (`/imagen.jpg`).
-   **Modularización de CSS**: Cada componente importa su propio archivo CSS, asegurando que los estilos se apliquen solo donde son necesarios.
-   **Compatibilidad de Entornos**: La importancia de utilizar versiones de Node.js compatibles con las herramientas de desarrollo (ej. Node 20+ para Vite moderno).
-   **Sensibilidad a Mayúsculas/Minúsculas**: Un error en la capitalización de un `import` puede causar fallos críticos en el servidor de desarrollo.

---

## Proyecto Original (Vanilla)

La versión original del proyecto, construida con HTML, CSS y JavaScript vanilla, sigue disponible como referencia:
[Campus & Crema — Vanilla](https://github.com/anudoranador87/campus-crema-web)

---

## 👨‍💻 Autor

**Jose María Aparicio**
Recepcionista de hotel en transición a frontend developer.
42 días de código documentados en Dev Log 365.

🌐 **Portfolio** → [https://anudoranador87.github.io/JoseMaria-Frondtend-Portfolio/](https://anudoranador87.github.io/JoseMaria-Frondtend-Portfolio/)
📓 **Dev Log** → [https://anudoranador87.github.io/Mi-Camino-Web-365/](https://anudoranador87.github.io/Mi-Camino-Web-365/)
