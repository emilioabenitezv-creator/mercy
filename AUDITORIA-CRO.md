# Auditoría CRO / UX / eCommerce — MERCY

**Consultoría ejecutiva · Junio 2026**
Sitio auditado: aplicación **MERCY (MercyFit)** — código fuente del repositorio (React SPA sobre Base44).

> **Nota metodológica.** No se proporcionó una URL en vivo, por lo que la auditoría se realizó sobre el **código fuente real** del sitio (que *es* el sitio): páginas, componentes, copy, estructura, estilos, configuración de SEO y rendimiento. Donde una afirmación depende de datos que solo se ven en producción (Core Web Vitals reales, analítica), lo indico como **supuesto**. Todas las recomendaciones se justifican con principios de UX/CRO, economía del comportamiento o evidencia ampliamente aceptada (Baymard, NN/g, CXL, Google).

---

## 0. Resumen ejecutivo (TL;DR)

MERCY tiene un **branding y una dirección de arte excelentes** (nicho claro, estética de combate coherente, voz de marca fuerte) montados sobre una base técnica que, **antes de esta intervención, no podía vender**: el botón *“Proceder al pago”* no tenía ninguna acción asociada. Es decir, el embudo terminaba en un callejón sin salida. Ese es —con diferencia— el hallazgo #1.

Junto a eso, los enlaces legales del footer apuntaban a páginas inexistentes (404), no había mensajería de devoluciones/garantía/MSI (meses sin intereses), la prueba social estaba escondida y el sitio, al ser una SPA renderizada en cliente, era casi invisible para SEO.

**En esta sesión ya implementé los arreglos críticos** (ver §15). Lo demás queda priorizado en el roadmap.

| Dimensión | Score (0–100) base | Comentario |
|---|---|---|
| UX | 62 | Buena arquitectura; lastrada por checkout muerto y prueba social oculta |
| UI | 78 | **Fortaleza real.** Sistema visual cohesivo y distintivo |
| CRO | 38 | Embudo roto, sin urgencia ni palancas de AOV |
| Copywriting | 70 | Gran voz; faltan manejo de objeciones y garantías |
| Confianza | 45 | Links rotos, elementos placeholder, sin política de devoluciones |
| Branding | 82 | **Fortaleza real.** Posicionamiento nítido |
| Mobile | 60 | Responsive pero sin CTA fijo, marquee, bundle pesado |
| SEO para conversión | 30 | CSR sin metadatos por ruta ni datos estructurados |
| Velocidad percibida | 48 | Bundle 632 KB, hero PNG, fuentes bloqueantes |
| Accesibilidad | 42 | Contraste y labels insuficientes |
| Potencial de crecimiento | 85 | Base excelente, nicho con demanda |
| **GLOBAL** | **~57** | Producto con techo alto y bloqueadores muy concretos |

**Estimación de uplift** (ver §18): habilitar el checkout es **existencial** (pasa de 0 a poder vender). Sobre una tienda ya funcional, el paquete priorizado puede aportar de forma agregada un **+25 % a +45 % de tasa de conversión relativa**. Es una estimación basada en buenas prácticas, no una garantía.

---

## 1. Diagnóstico de negocio

| Pregunta | Respuesta (inferida del sitio) | ¿Claro en el sitio? |
|---|---|---|
| ¿Qué vende? | Rashguards y shorts de alto rendimiento para artes marciales (BJJ, MMA, No-Gi). Ediciones limitadas. | ✅ Sí |
| ¿Cliente ideal? | Practicante de grappling/MMA en México, 18–40, entrena varias veces/semana, valora identidad y estética. | ✅ Sí |
| ¿Qué problema resuelve? | Equipo de competencia con diseño que representa identidad mexicana (vs. marcas genéricas/importadas). | ✅ Sí |
| ¿Propuesta de valor? | “Calidad de competencia + arte/identidad mexicana, hecho por atletas”. | 🟡 Comunicada en copy pero **no cuantificada** (no hay garantías, no hay prueba dura) |
| ¿Emociones? | Pertenencia, garra, disciplina, orgullo, intimidación/estatus en el tatami. | ✅ Bien transmitidas |
| ¿Tipo de compra? | **Híbrida**: impulso por diseño/identidad (emocional) + racional por ajuste/material/talla. | — |

**Implicación CRO:** al ser compra mitad emocional/mitad racional, hay que **bajar la ansiedad del lado racional** (tallas, devoluciones, materiales, pago en cuotas) sin matar el impulso emocional (escasez de ediciones limitadas, identidad, estatus). El sitio hoy explota bien lo emocional y **descuida lo racional**.

> El propio nombre **“Mercy”** (en jiu-jitsu, “rendirse / tap”) es un activo narrativo potentísimo y **no se explica en ningún lado**. Es una oportunidad de storytelling desperdiciada (ver §6).

---

## 2. Hallazgos críticos (los que mueven la aguja)

| # | Hallazgo | Evidencia en código | Impacto | Estado |
|---|---|---|---|---|
| 1 | **El checkout no existía.** El botón *PROCEDER AL PAGO* no tenía `onClick`; *COMPRAR AHORA* en PDP solo abría el carrito. **No se podía comprar.** | `CartDrawer.jsx` botón sin handler; `ProductDetail.handleBuyNow` solo `setIsCartOpen(true)` | 🔴 Existencial | ✅ **Corregido** (página `/checkout` funcional) |
| 2 | **Enlaces legales rotos (404).** Footer enlazaba `/contacto`, `/privacidad`, `/terminos` sin rutas. | `Footer.jsx` vs `App.jsx` (rutas inexistentes) | 🔴 Alto (confianza + legal MX) | ✅ **Corregido** (4 páginas + rutas) |
| 3 | **SEO casi nulo.** SPA en cliente, sin metadatos por ruta, sin datos estructurados, `manifest.json` 404, sin `robots.txt`/`sitemap`, favicon de Base44. | `main.jsx` CSR; `index.html` estático | 🔴 Alto | 🟡 **Mitigado** (meta + JSON-LD + manifest/robots/sitemap/favicon). Falta SSR/prerender |
| 4 | **Sin reductores de ansiedad de compra.** Cero política de devoluciones visible, sin garantía, sin MSI (meses sin intereses) — clave en México. | PDP solo “envío gratis +$1,200” y “3–5 días” | 🔴 Alto | ✅ **Corregido** (bloque de confianza + MSI + página Envíos/Devoluciones) |
| 5 | **Elementos de confianza “placeholder”.** Redes a `facebook.com`/`instagram.com` genéricas, WhatsApp `5215512345678` ficticio, atletas y testimonios que *parecen* inventados. | `Footer.jsx`, `AthletesSection.jsx`, `TestimonialsSection.jsx` | 🟠 Alto | ⏳ Pendiente (requiere datos reales) |
| 6 | **Bundle único de 632 KB (199 KB gzip), sin code-splitting**, con dependencias pesadas probablemente sin uso en la tienda (`three`, `recharts`, `jspdf`, `html2canvas`, `react-leaflet`, `react-quill`, `moment`). | `package.json`, build de Vite | 🟠 Medio-Alto | ⏳ Pendiente (ver §8) |
| 7 | **Prueba social escondida** tras una pestaña en PDP; rating sin “compra verificada”. | `ProductDetail.jsx` tab “Reseñas” | 🟠 Medio | ⏳ Pendiente |

---

## 3. Análisis página por página

### 3.1 Home (`Home.jsx` + secciones)
Estructura actual: Hero → TrustBar → Bestsellers → Why Mercy → Atletas → Testimonios → Captura de email.

**Positivo:** orden lógico de persuasión (gancho → confianza → producto → razones → autoridad → prueba social → captura). El hero es fuerte visualmente y el copy *“Tu Compañero En El Tatami”* es bueno.

**Problemas:**
- **Sin barra de anuncio** que comunique envío gratis/descuento *antes* del scroll. (✅ añadida)
- **Captura de email (10 %) hasta el fondo**: se pierde la mayoría del tráfico antes de verla. Debería existir también como entrada (barra + pop-up de intención de salida).
- **TrustBar con marquee animado en móvil**: distrae y compite con el CTA del hero; los “badges” son emojis (poco premium).
- **Bestsellers depende de datos**: si ningún producto tiene `is_bestseller`, la sección queda vacía sin fallback.
- **Sección Atletas** sin prueba (sin @handles, sin enlaces, sin “patrocinado”): puede leerse como ficticia y **restar** credibilidad en vez de sumarla.
- **Hero a pantalla completa (`h-screen`)**: empuja el producto muy abajo; conviene reducir a ~80vh y mostrar “asomo” de producto/categorías.

### 3.2 Categoría / Catálogo (`Catalog.jsx`)
**Positivo:** filtros por talla, disponibilidad y orden; grid 2 col en móvil correcto; manejo de “agotado”.
**Problemas:**
- **Sin conteo de resultados** ni cantidad por filtro.
- **Sin descripción de categoría** (malo para SEO y para contexto). (✅ añadí meta/description por categoría; falta texto on-page).
- Filtros de talla **no muestran ediciones limitadas/escasez**.
- No hay **quick-add** ni selección de talla desde la card (toda conversión exige entrar a PDP).
- Header de categoría es decorativo (imagen + título) y ocupa mucho “above the fold” sin vender.

### 3.3 Producto / PDP (`ProductDetail.jsx`) — *la página más importante*
**Positivo:** selector de talla con estado claro, “avísame” cuando hay agotado (captura demanda), breadcrumbs, relacionados, pestañas con guía de tallas y reseñas.
**Problemas detectados (varios ya corregidos):**
- ❌→✅ *Comprar ahora* no llevaba a pagar. (corregido → `/checkout`)
- ❌→✅ Sin MSI, sin devoluciones, sin garantía. (corregido: línea “12 pagos de $X” + bloque de 4 señales)
- ❌→✅ Sin urgencia/escasez. (corregido: “Edición limitada — quedan pocas tallas”)
- ❌→✅ Sin CTA fijo en móvil. (corregido: barra inferior sticky con precio + AGREGAR)
- ❌→✅ Sin datos estructurados Product/Offer/AggregateRating. (corregido: JSON-LD)
- ⏳ **Galería pobre**: máximo 2 imágenes, sin zoom, sin video, sin foto “talla en cuerpo / modelo mide X / usa talla Y”.
- ⏳ **Reseñas ocultas** en pestaña: el resumen de rating debería verse sin click.
- ⏳ **Cantidad antes de talla**: orden invertido respecto al patrón mental (primero talla).

### 3.4 Carrito (`CartDrawer.jsx`)
**Positivo (muy bien):** barra de progreso de envío gratis (ancla + meta), edición de cantidad, persistencia en `localStorage`.
**Problemas:**
- ❌→✅ Botón de pago muerto. (corregido)
- ⏳ **Sin cross-sell** (“completa tu kit”, “lleva el short que combina”) para cruzar el umbral de envío gratis.
- ⏳ **Sin campo de cupón** en el drawer (el 10 % prometido no tenía dónde aplicarse). (✅ lo añadí en `/checkout`).
- ⏳ **Sin sellos de pago / “compra segura”** dentro del carrito.

### 3.5 Nosotros (`About.jsx`)
**Positivo:** narrativa con alma, 3 pilares claros (Disciplina/Identidad/Rendimiento), CTA al final.
**Problemas:** historia genérica de “nacimos de la frustración” sin **datos concretos** (año, fundadores reales, gimnasios, números). No explica el nombre **Mercy**. Sin fotos del equipo/taller (prueba de “hecho en México”).

### 3.6 Guía de tallas (`SizeGuide.jsx`)
**Positivo:** tablas claras, “cómo medirte”, recomendación entre tallas. Buen activo anti-devolución.
**Problemas:** sin **selector de talla interactivo** (calculadora por estatura/peso), sin equivalencias con marcas conocidas, sin ilustración de puntos de medición.

### 3.7 Wishlist (`Wishlist.jsx`)
Funciona y persiste. **Oportunidad:** disparar email/captura para “avisarte si baja de precio / por agotarse” sobre favoritos.

### 3.8 Navegación / Header (`Navbar.jsx`)
**Positivo:** sticky con cambio al hacer scroll, contadores de carrito y wishlist.
**Problemas:** ❌→✅ sin barra de anuncio (añadida). Sin buscador (aceptable con 9 SKUs, pero sin enlace a Envíos/Contacto). Menú móvil no incluye accesos a soporte/envíos.

### 3.9 Footer (`Footer.jsx`)
**Positivo:** estructura completa (tienda, info, pagos, contacto, redes).
**Problemas:** ❌→✅ enlazaba a páginas inexistentes (corregido). Métodos de pago como texto (`VISA/MC/OXXO/MP`) en vez de logos reconocibles. Redes con URLs placeholder.

### 3.10 Buscador / Menús
No hay buscador. Con catálogo de 9 productos es defendible, pero conviene **autocompletado por talla/categoría** cuando el catálogo crezca.

---

## 4. CRO — embudo y fricción

**Mapa de abandono (antes):** Home → Catálogo → PDP → **Carrito → ☠️ (muro: no hay pago)**. Literalmente el 100 % del tráfico con intención de compra moría en el carrito.

| Punto de fricción | Severidad | Recomendación |
|---|---|---|
| Checkout inexistente | 🔴 | ✅ Checkout funcional con resumen, cupón, MSI y pedido por WhatsApp |
| Sin pago invitado claro / fricción de cuenta | 🟠 | Checkout sin obligar registro (✅ el nuevo flujo no exige cuenta) |
| Sin urgencia/escasez | 🟠 | ✅ Low-stock en PDP + barra de anuncio; falta contador de stock real |
| AOV sin palancas | 🟠 | Bundles rashguard+short, cross-sell en carrito, umbral de envío |
| Prueba social oculta | 🟠 | Mostrar rating + nº reseñas arriba; badges “compra verificada” |
| Microcopy de CTA | 🟢 | A/B de verbos (“AGREGAR” vs “AÑADIR AL CARRITO – $X”) |

**Palancas de valor:**
- **Ticket promedio:** kits (rashguard+short con descuento), “completa tu set” en carrito, umbral de envío gratis bien comunicado.
- **Recompra:** post-compra con email de cuidado de prenda + drop nuevo; programa “familia Mercy”.
- **Valor por cliente:** captura de email temprana + segmentación por disciplina (BJJ/MMA/No-Gi).

---

## 5. Neuromarketing & economía del comportamiento

| Principio | ¿Presente? | Oportunidad |
|---|---|---|
| **Escasez** | 🟡 “ediciones limitadas” en copy | Conteo real de stock por talla; “quedan N” |
| **Urgencia** | 🟡 (añadida low-stock + barra) | Cuenta regresiva de drops; “pedidos hoy salen mañana” |
| **Prueba social** | 🟡 testimonios + reseñas | Mostrarla arriba; UGC real, fotos, @handles, nº de clientes |
| **Autoridad** | 🟡 atletas (sin prueba) | Atletas reales verificables, prensa, gimnasios aliados |
| **Reciprocidad** | 🟡 10 % por email | Guía gratuita (“cómo elegir tu rashguard”), contenido |
| **Anclaje** | 🔴 ausente | Precio “antes/ahora”, precio de kit vs piezas sueltas |
| **Aversión a la pérdida** | 🟡 “avísame” agotado | “No te quedes sin tu talla”, wishlist con alerta de stock |
| **Efecto halo** | ✅ dirección de arte premium | Mantener; reforzar con fotografía lifestyle real |
| **Simplificación de decisión** | 🟡 | Recomendador de talla; “más vendido” como elección por defecto |
| **Default / social proof bias** | 🟡 | Preseleccionar talla más vendida; “92 % elige su talla habitual” |

---

## 6. Copywriting — evaluación y reescrituras

**Diagnóstico:** voz de marca **muy buena** (campo semántico de guerra/tatami/disciplina), pero **sin manejo de objeciones** ni storytelling del nombre, y CTAs algo planos.

| Ubicación | Actual | Propuesta |
|---|---|---|
| Hero H1 | “Tu Compañero En El Tatami” | ✅ Mantener (excelente). Subtítulo: añadir prueba → *“El equipo que ya usan +2,000 grapplers en México. Hecho aquí, probado en competencia.”* |
| Hero CTA | “COMPRA RASHGUARDS” / “VER SHORTS” | *“VER RASHGUARDS →”* + *“VER SHORTS →”* (simetría) o un CTA primario único *“ARMAR MI EQUIPO”* |
| Why Mercy | “MATERIAL PREMIUM / ARTE ÚNICO / HECHO PARA RENDIR” | Añadir números: *“UPF 50+ · 4-way stretch · costuras flatlock que no raspan en el roll”* |
| About | “Nacimos de la frustración…” | Anclar al nombre: *“En el tatami, ‘mercy’ es la palabra que separa seguir o rendirte. Construimos equipo para los que no la dicen.”* |
| PDP descripción | genérica | Beneficio→prueba→uso: *“Compresión que sujeta sin cortar el movimiento. Probado en 6+ meses de entrenamiento diario.”* |
| Email capture | “QUIERO DESCUENTO DEL 10%” | *“DAME MI 10% Y LOS DROPS ANTES QUE NADIE”* |
| CTA carrito | “PROCEDER AL PAGO” | *“PAGAR DE FORMA SEGURA →”* + sello |
| Objeción talla | — (nuevo) | *“¿Dudas con la talla? Cambio gratis en 30 días.”* (✅ implementado el mensaje de cambios) |

---

## 7. SEO orientado a conversión

**Problemas:** SPA CSR (contenido no en el HTML inicial), 1 solo `<title>`/description para todo el sitio, sin canonical por ruta, sin datos estructurados, `manifest.json` 404, sin `robots.txt`/`sitemap.xml`, favicon ajeno a la marca, sin H1 únicos optimizados por intención.

**Implementado:** componente `Seo` por ruta (title/description/canonical/OG/Twitter), **JSON-LD** `Product`+`Offer`+`AggregateRating` en PDP y `Organization` en Home, `manifest.json`, `robots.txt`, `sitemap.xml`, favicon de marca, `preconnect` a CDNs.

**Pendiente (alto impacto SEO):** **prerender/SSR** (Base44 + un prerender, o migración a framework con SSR) para que Google indexe el contenido renderizado; textos on-page por categoría con keywords (“rashguard BJJ México”, “short MMA grappling”); alt text descriptivo en todas las imágenes; breadcrumb JSON-LD.

---

## 8. Performance

| Tema | Hallazgo | Acción |
|---|---|---|
| Bundle JS | **632 KB (199 KB gzip), un solo chunk**, sin lazy routes | Code-splitting por ruta (`React.lazy`/`Suspense`) + `manualChunks` |
| Dependencias | `three`, `recharts`, `jspdf`, `html2canvas`, `react-leaflet`, `react-quill`, `moment` probablemente sin uso en tienda | Auditar y **eliminar**; sustituir `moment`→`date-fns` (ya presente) |
| Imágenes | Hero y producto en **PNG**, sin `srcset`, sin dimensiones | Servir **WebP/AVIF**, `width/height` (anti-CLS), `srcset` responsive |
| LCP | Hero a pantalla completa, sin preload | ✅ `fetchPriority="high"` + `preconnect`; añadir `<link rel="preload">` del hero |
| Fuentes | `@import` de Google Fonts en CSS (bloqueante), 3 familias/varios pesos | ✅ `preconnect`; pasar a `<link>` con `display=swap` y subset; reducir pesos |
| CLS | Imágenes sin dimensiones; marquee | Definir aspect-ratios fijos (parcialmente ya con `aspect-[4/5]`) |
| Lazy loading | ✅ añadido `loading="lazy"` en cards | Extender a imágenes below-the-fold |

---

## 9. Mobile (probable mayoría del tráfico)

- ✅ **CTA de compra fijo** en PDP (era el gap más caro en móvil).
- ✅ Barra de anuncio visible.
- ⏳ TrustBar marquee distrae; preferir badges estáticos o sello compacto.
- ⏳ Hero `h-screen` deja el producto demasiado abajo en móvil.
- ⏳ Filtros del catálogo pueden saturar; considerar bottom-sheet de filtros.
- ✅ Targets de talla 56×48 px (cumplen ≥44 px). Reseñas/menus ok.

---

## 10. Accesibilidad

| Problema | Estado |
|---|---|
| Botones de icono sin nombre accesible (carrito, wishlist, menú, cantidad, carrusel) | ✅ `aria-label` añadidos en los principales |
| Texto `#2A2A2A` sobre fondo oscuro (ciudad en reseñas, tallas agotadas) — **contraste insuficiente** | ⏳ subir a ≥ `#6B6B6B` |
| Inputs solo con `placeholder` (sin `<label>`) | ✅ en checkout con `<label>`; ⏳ revisar reviews/notify |
| Foco visible | ⏳ definir `:focus-visible` consistente (anillo rojo) |
| `lang="es"` | ✅ correcto |

---

## 11. Psicología del consumidor (ansiedad → confianza)

La compra de ropa de combate tiene **alta ansiedad de ajuste** y **ansiedad de legitimidad** (marca nueva, pago en línea). El sitio resolvía mal ambas. Acciones: devoluciones 30 días visibles (✅), MSI (✅), pago seguro (✅), guía de tallas accesible desde PDP (✅ enlace añadido), reseñas con foto y “compra verificada” (⏳), datos reales de contacto (⏳).

---

## 12. Benchmark vs. líderes del sector

| Marca | Qué hacen mejor | Acción para MERCY |
|---|---|---|
| **Gymshark** | Prueba social masiva, atletas reales, app, drops con cuenta regresiva, fotografía lifestyle | Drops con countdown; UGC real; atletas verificables |
| **Hayabusa / Venum** | Fichas técnicas profundas, tecnología de material con nombre, video de producto | Tabla técnica con nombres de tecnología + video en PDP |
| **Sanabul** | Reseñas con miles de ratings, “best value”, bundles | Bundles y reseñas verificadas con fotos |
| **Vulkan / Tatami Fightwear** | Catálogo por disciplina, guías de compra, comunidad | Landing por disciplina (BJJ/MMA/No-Gi) + guías |
| **Born Primitive** | Storytelling de identidad + causa, email/SMS marketing | Explotar narrativa “Mercy” + captura temprana y SMS |

El **diferenciador** de MERCY (identidad mexicana + edición limitada) es genuino y defendible; el gap no es de concepto sino de **ejecución de confianza, prueba y fricción de compra**.

---

## 13. Priorización por impacto

**🔴 Alto impacto (ventas):**
1. Checkout funcional (✅). 2. Pasarela de pago real (Stripe/Mercado Pago) ⏳. 3. Devoluciones/MSI/garantía visibles (✅). 4. Páginas legales/contacto (✅). 5. Datos de contacto y redes reales ⏳. 6. Prueba social real y visible ⏳. 7. SEO indexable (meta+JSON-LD ✅ / SSR ⏳).

**🟠 Impacto medio:**
8. CTA móvil fijo (✅). 9. Barra de anuncio (✅). 10. Bundles/cross-sell (⏳). 11. Galería PDP + video (⏳). 12. Performance/bundle (⏳). 13. Reseñas arriba (⏳).

**🟢 Impacto bajo (pulido):**
14. Logos de pago (⏳). 15. Contraste/foco (⏳). 16. Microcopys (⏳). 17. Recomendador de talla (⏳).

---

## 14. Roadmap de ejecución

| Horizonte | Acciones |
|---|---|
| **Quick wins (<1 h)** | ✅ Wire checkout, ✅ barra de anuncio, ✅ páginas legales, ✅ robots/sitemap/manifest, ✅ favicon, ✅ aria-labels, ✅ MSI/devoluciones en PDP, ✅ low-stock, ✅ CTA móvil fijo, ⏳ subir contraste de grises, ⏳ logos de pago reales |
| **Una tarde** | Pasarela real (Mercado Pago/Stripe Checkout); reseñas visibles arriba + “compra verificada”; cross-sell en carrito; textos on-page por categoría |
| **Una semana** | Code-splitting + purga de dependencias; imágenes WebP/AVIF + `srcset`; galería PDP con zoom/video; bundles rashguard+short; pop-up de captura (intención de salida) |
| **Un mes** | Prerender/SSR para SEO; email/SMS post-compra y carrito abandonado; landings por disciplina; recomendador de talla; UGC real de atletas |
| **Rediseño** | Ver §16 |

---

## 15. ✔️ Cambios ya implementados en esta sesión

Todos verificados con `npm run build` y `npm run lint` (0 errores).

1. **Checkout funcional nuevo** (`src/pages/Checkout.jsx`, ruta `/checkout`): formulario de envío con `<label>`, resumen de pedido, **campo de cupón** (`BIENVENIDO10`/`MERCY10` = −10 %, conecta la promesa del email), cálculo de envío/umbral, métodos de pago (Mercado Pago/MSI, transferencia, OXXO) y confirmación de pedido por **WhatsApp** (ruta de conversión real mientras se integra la pasarela). Botones del carrito y *Comprar ahora* ya **llevan a pagar**.
2. **Páginas legales/soporte** (arreglan los 404 del footer): `Contact.jsx` (`/contacto`), `Shipping.jsx` (`/envios-y-devoluciones`), `Privacy.jsx` (`/privacidad`), `Terms.jsx` (`/terminos`).
3. **SEO**: componente `Seo` por ruta (title/description/canonical/OG/Twitter) en Home, Catálogo, PDP, Nosotros, Guía, Checkout y legales; **JSON-LD** `Product/Offer/AggregateRating` (PDP) y `Organization` (Home); `public/manifest.json`, `public/robots.txt`, `public/sitemap.xml`; `index.html` con favicon de marca, `preconnect` y `og:image`.
4. **PDP**: línea de **MSI** (“12 pagos de $X”), bloque de 4 señales de confianza (envío gratis, entrega, **30 días de cambios**, pago seguro), **urgencia low-stock**, enlace a guía de tallas, **barra de compra fija en móvil**, `aria-label`s.
5. **Confianza/AOV/UX**: **barra de anuncio** (envío gratis + cupón) en el header; badge **“MÁS VENDIDO”** en cards; `aria-label`s en navbar, carrito, cards y carrusel; `loading="lazy"` en imágenes de producto; `fetchPriority` en hero.
6. **Config central** `src/lib/site.js` (WhatsApp, email, umbral, cupones) — **placeholders marcados con TODO** para reemplazar por datos reales.

> ⚠️ **Acción tuya requerida:** reemplazar en `src/lib/site.js` el número de WhatsApp y redes reales; e integrar una **pasarela de pago real** (el checkout actual coordina por WhatsApp como puente).

---

## 16. Rediseño propuesto por página (resumen)

**Home:** Barra anuncio → Hero ~80vh con asomo de producto y prueba (“+2,000 atletas”) → Tira de logos de pago/garantía (estática) → Bestsellers (default “más vendido”) → Bloque “armar tu kit” (bundle) → Why Mercy con datos técnicos → Atletas **reales** con @ → Reseñas con foto → Captura (además de pop-up). *Eliminar:* marquee distractor. *Mover:* captura de email también arriba.

**PDP:** Galería con zoom/video + “modelo mide X / usa M” → Título, rating visible (no en tab), precio + MSI → Talla (con recomendador) → Cantidad → CTA (AGREGAR + Comprar) → Señales de confianza → Acordeones (no tabs) con reseñas expandidas. *Añadir:* bundle “+ short que combina”.

**Carrito:** + cross-sell, + cupón, + sellos de pago, + “te faltan $X para envío gratis” (ya existe ✅).

**Catálogo:** + texto SEO por categoría, + contador, + quick-add de talla.

---

## 17. 30+ experimentos A/B priorizados

| # | Hipótesis | Qué cambiar | Por qué funciona (principio) | KPI | Impacto |
|---|---|---|---|---|---|
| 1 | Un checkout funcional convierte | Habilitar pago (✅) | Eliminar bloqueo total | CVR | 🔴 |
| 2 | Mostrar MSI sube conversión | “12 pagos de $X” en PDP (✅) | Reduce barrera de precio | CVR PDP | 🔴 |
| 3 | Devoluciones visibles reducen ansiedad | Bloque 30 días (✅) | Aversión a la pérdida/riesgo | Add-to-cart→compra | 🔴 |
| 4 | CTA móvil fijo sube add-to-cart | Barra sticky (✅) | Reduce fricción/scroll | ATC móvil | 🟠 |
| 5 | Barra de anuncio con envío gratis sube AOV | Barra header (✅) | Meta/umbral | AOV | 🟠 |
| 6 | Reseñas arriba (no en tab) suben CVR | Rating + nº visibles | Prueba social temprana | CVR PDP | 🟠 |
| 7 | Badge “compra verificada” sube confianza | En reseñas | Credibilidad | CVR | 🟠 |
| 8 | Bundle rashguard+short sube AOV | Oferta de kit | Anclaje/ahorro | AOV | 🟠 |
| 9 | Cross-sell en carrito sube unidades | “Completa tu set” | Default/ancla | Unidades/pedido | 🟠 |
| 10 | Contador de stock real crea urgencia | “Quedan N” | Escasez | CVR | 🟠 |
| 11 | Countdown de drop sube prisa | Timer en colección | Urgencia | CVR | 🟠 |
| 12 | Recomendador de talla baja devoluciones | Calculadora estatura/peso | Simplificación | Tasa devolución | 🟠 |
| 13 | Pop-up captura (exit-intent) sube leads | Modal salida | Reciprocidad | Suscriptores | 🟠 |
| 14 | Logos de pago reales suben confianza | Footer/checkout | Autoridad | CVR checkout | 🟢 |
| 15 | Galería con video sube CVR | Video en PDP | Reduce incertidumbre | CVR PDP | 🟠 |
| 16 | Foto “modelo usa talla M” baja dudas | Imagen referencia | Claridad | Devoluciones | 🟢 |
| 17 | CTA “PAGAR SEGURO →” vs “PROCEDER” | Microcopy | Reduce ansiedad | Click checkout | 🟢 |
| 18 | Hero 80vh vs 100vh sube scroll a producto | Altura hero | Jerarquía | Scroll→PDP | 🟢 |
| 19 | CTA único “ARMAR MI EQUIPO” vs dos | Hero CTA | Carga de decisión | CTR hero | 🟢 |
| 20 | Preseleccionar talla “más vendida” | Default talla | Default bias | ATC | 🟢 |
| 21 | Prueba “+2,000 atletas” en hero | Copy social | Prueba social | CVR home | 🟠 |
| 22 | Atletas con @ reales vs sin prueba | Sección atletas | Autoridad | Confianza/CVR | 🟠 |
| 23 | WebP/AVIF vs PNG mejora CVR (velocidad) | Formato imágenes | LCP↓ | CVR/Bounce | 🟠 |
| 24 | Code-splitting baja bounce móvil | Lazy routes | TTI↓ | Bounce móvil | 🟠 |
| 25 | Texto SEO por categoría sube tráfico | Copy on-page | Indexación | Sesiones orgánicas | 🟠 |
| 26 | Cupón en carrito vs solo email | Campo cupón (✅) | Cierre/reciprocidad | CVR | 🟢 |
| 27 | Sellos de garantía en carrito | Iconos confianza | Reduce abandono | Abandono carrito | 🟢 |
| 28 | Email post-compra cuidado de prenda | Flujo email | Recompra | LTV/recompra | 🟠 |
| 29 | Carrito abandonado (email/WhatsApp) | Automatización | Aversión a la pérdida | Recuperación | 🟠 |
| 30 | Quick-add de talla en card | Catálogo | Menos clics | ATC | 🟢 |
| 31 | Contraste de grises ≥ AA | Color texto | Legibilidad | Bounce/a11y | 🟢 |
| 32 | Acordeones vs tabs en PDP | Patrón info | Escaneabilidad | Tiempo/CVR | 🟢 |
| 33 | Explicar el nombre “Mercy” en hero/About | Storytelling | Efecto halo/memoria | Marca/recall | 🟢 |

---

## 18. Estimación de incremento de conversión

> Estimación basada en buenas prácticas (Baymard, CXL, NN/g) y benchmarks del sector. **No es una garantía**; el resultado real depende de tráfico, producto, precio y ejecución, y debe validarse con A/B testing.

- **Habilitar el checkout (#1):** efecto *existencial* — la tienda pasa de **no poder cobrar** a poder hacerlo. No es un “+X %”, es la condición para tener ventas.
- Sobre una tienda **ya funcional**, el paquete priorizado aporta de forma agregada (con solapamientos):
  - Reductores de ansiedad (devoluciones + MSI + pago seguro visibles): **+8 % a +15 %**.
  - Prueba social real y visible: **+5 % a +12 %**.
  - CTA móvil fijo + velocidad + barra de anuncio: **+5 % a +10 %**.
  - Urgencia/escasez real + bundles/cross-sell (AOV): **+5 % a +10 % en CVR y +8 % a +15 % en AOV**.
- **Rango combinado estimado: +25 % a +45 % de tasa de conversión relativa**, además de un **AOV +8 % a +15 %**, una vez integrada la pasarela real y reemplazados los datos placeholder.

---

### Cierre
MERCY es un **caso de marca fuerte con fontanería rota**. La identidad ya está ganada; lo que faltaba era **poder vender, dar confianza y ser encontrable**. Los bloqueadores críticos ya están corregidos en código; el mayor pendiente estratégico es **integrar una pasarela de pago real**, sustituir los **datos placeholder por reales** y **prerenderizar para SEO**. Con eso, MERCY compite de tú a tú con los líderes del sector.
