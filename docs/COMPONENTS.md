# Guía de Componentes y Estado Global

Este documento describe la arquitectura de los componentes clave y la gestión de estado de **Campus & Crema**.

---

## 1. Gestión de Estado Global (Contexts)

### ThemeContext
Permite gestionar de manera global el tema visual (Claro/Oscuro) en toda la aplicación, almacenando la preferencia en `localStorage`.

- **Provider**: `ThemeProvider` (en `src/main.jsx`)
- **Hook**: `useTheme`
- **Uso**:
  ```jsx
  import { useTheme } from '../context/ThemeContext.jsx';

  function MyComponent() {
    const { theme, toggleTheme } = useTheme();
    return (
      <button onClick={toggleTheme}>
        Modo actual: {theme}
      </button>
    );
  }
  ```

### CartContext
Centraliza el carrito de compras, la navegación del checkout (stepper) y la información de la entrega.

- **Provider**: `CartProvider` (en `src/main.jsx`)
- **Hook**: `useCart`
- **Valores devueltos**:
  - `state`: Objeto de estado que contiene `{ ticket, categoria, paso, tipoEntrega, formulario, ultimoPedido }`.
  - `dispatch`: Función reductora para disparar acciones (`añadir`, `cambiarCantidad`, `setCategoria`, `setPaso`, `setTipoEntrega`, `setFormulario`, `confirmar`, `reiniciar`).
  - `subtotal`: Subtotal calculado del carrito.
  - `iva`: Importe del IVA (10%).
  - `total`: Importe total (Subtotal + IVA).
  - `cartCount`: Cantidad total de artículos en el carrito.
- **Uso**:
  ```jsx
  import { useCart } from '../context/CartContext.jsx';

  function CartBadge() {
    const { cartCount } = useCart();
    return <span>Artículos: {cartCount}</span>;
  }
  ```

---

## 2. Componentes Reutilizables

### TextExpander
Componente que recorta un bloque de texto largo y añade un botón interactivo para mostrar u ocultar el contenido restante.

- **Fichero**: `src/components/TextExpander.jsx`
- **Propiedades (Props)**:
  | Propiedad | Tipo | Por defecto | Descripción |
  | :--- | :--- | :--- | :--- |
  | `collapsedNumWords` | `Number` | `10` | Número de palabras visibles cuando está contraído. |
  | `expandButtonText` | `String` | `"Mostrar menos"` | Texto del botón cuando el componente está expandido. |
  | `collapseButtonText` | `String` | `"Mostrar mas"` | Texto del botón cuando el componente está contraído. |
  | `buttonColor` | `String` | `"#b5541a"` | Color personalizado para el botón. |
  | `expanded` | `Boolean` | `false` | Si debe iniciar en estado expandido. |
  | `className` | `String` | `undefined` | Clase CSS opcional para el contenedor. |

- **Ejemplo**:
  ```jsx
  <TextExpander collapsedNumWords={5} collapseButtonText="Ver más" expandButtonText="Ver menos">
    Este es un texto sumamente largo sobre el café de especialidad y su tueste.
  </TextExpander>
  ```

### LoadingSpinner
Spinner animado premium que actúa como indicador visual de carga durante la transición de rutas o la carga asíncrona de componentes (`Suspense`).

- **Fichero**: `src/components/LoadingSpinner.jsx`
- **Uso**:
  ```jsx
  import React, { Suspense, lazy } from 'react';
  import LoadingSpinner from './components/LoadingSpinner.jsx';

  const LazyComponent = lazy(() => import('./LazyComponent.jsx'));

  function App() {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    );
  }
  ```

---

## 3. Pruebas Unitarias

Las pruebas están escritas con **Vitest** y **React Testing Library**. Para ejecutar las pruebas de los componentes de forma unitaria, utiliza:

```bash
# Ejecutar todas las pruebas una vez
npm run test

# Ejecutar las pruebas en modo de observación (watch mode)
npm run test:watch
```

Las pruebas validan el renderizado del texto colapsado inicial, la interacción del botón para expandirse, y el retorno a su estado colapsado tras volver a pulsarse.
