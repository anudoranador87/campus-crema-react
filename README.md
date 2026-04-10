# Campus & Crema — React Migration

> Migración del proyecto Campus & Crema de HTML/CSS/JS vanilla a React + Vite.  
> El objetivo es convertirlo en mi proyecto portfolio definitivo con arquitectura de componentes, estado, y futura integración de e-commerce.

**Demo:** https://campus-crema-react.vercel.app/  
**GitHub Pages:** https://anudoranador87.github.io/campus-crema-react/

---

## ¿Por qué la migración?

La versión vanilla de Campus & Crema funcionaba, pero tenía límites claros: el carrusel, el acordeón y el formulario eran scripts independientes sin comunicación entre sí. Migrar a React me permite estructurar el proyecto como lo haría en un entorno profesional — componentes reutilizables, estado centralizado, y una base sobre la que seguir construyendo.

---

## Stack

- React 18
- Vite
- CSS por componente (sin frameworks)
- Vercel (deploy automático)
- GitHub Pages

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx        # Menú con estado isMenuOpen (hamburguesa)
│   ├── Hero.jsx          # Banner principal — sin estado
│   ├── Carousel.jsx      # Carrusel con estado currentIndex
│   ├── Menu.jsx          # Grid de productos — sin estado
│   ├── ReservationForm.jsx  # Formulario con estado formData
│   └── Footer.jsx        # Pie de página — sin estado
├── App.jsx               # Componente raíz — orquesta todos los componentes
├── App.css               # Estilos globales
└── main.jsx              # Punto de entrada
```

---

## Componentes y decisiones de arquitectura

| Componente | ¿Estado? | Variable | Razón |
|---|---|---|---|
| Navbar | Sí | `isMenuOpen` | Controla apertura/cierre del menú hamburguesa |
| Hero | No | — | Solo muestra contenido estático |
| Carousel | Sí | `currentIndex` | Necesita recordar qué foto está activa |
| Menu | No | — | Renderiza un array fijo de productos |
| ReservationForm | Sí | `formData` | Captura y controla los datos del usuario |
| Footer | No | — | Contenido estático |

**Decisión clave:** el estado se mantiene local en cada componente. Ningún componente comparte datos con otro en esta fase, por lo que subir el estado a `App.jsx` sería complejidad innecesaria.

---

## Funcionalidades actuales

- Navbar responsive con menú hamburguesa
- Hero con imagen y texto superpuesto
- Carrusel de imágenes con navegación
- Menú en grid con imagen, descripción y precio por producto
- Formulario de reservas con validación de campos
- Footer con dirección y contacto

---

## Próximos pasos

- [ ] Añadir `MenuRenderer` y `Carrito` como clases para el carrito de compra
- [ ] Migrar a Vercel para deploys automáticos por push
- [ ] Integrar React Router para navegación entre páginas
- [ ] Fase final: integración e-commerce

---

## Aprendizajes de la migración

- Las rutas de imágenes cambian: en React las estáticas van en `public/` y se referencian desde la raíz (`/imagen.jpg`)
- Cada componente importa su propio CSS — si no se importa, no se aplica
- Node.js 16 es incompatible con Vite moderno — requiere Node 20+
- Un error de mayúscula en un import rompe el servidor de desarrollo completamente

---

## Proyecto original (vanilla)

La versión HTML/CSS/JS vanilla sigue disponible como referencia:  
[Campus & Crema — Vanilla](https://github.com/anudoranador87)

---

*Parte del reto #365DaysOfCode — aprendizaje autodidacta de desarrollo frontend.*  
*José · Málaga · 2026*
