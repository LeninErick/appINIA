🐹 Sistema Web de Cuyes
Este proyecto es un sistema web diseñado para gestionar, monitorear y visualizar información relacionada con el control y mejoramiento genético de cuyes en el Instituto Nacional de Innovación Agraria (INIA) – Chumbibamba, Talavera. La plataforma permite registrar datos de animales, cruzamientos, tratamientos, controles, ventas, y más, utilizando una estructura organizada en colecciones y subcolecciones de Firestore.

🚀 Tecnologías y herramientas utilizadas
Angular 20.1.0 – Framework frontend para construir la interfaz SPA.

Firebase / Firestore – Plataforma backend para base de datos en tiempo real, autenticación y almacenamiento.

Tailwind CSS – Estilizado moderno y adaptable para una mejor experiencia de usuario.

RxJS & Signals – Reactividad avanzada en componentes y servicios.

Shadcn/UI – Componentes estilizados reutilizables.

Lucide Icons – Íconos modernos para mejorar la visualización.

⚙️ Requisitos para instalar y ejecutar
Antes de comenzar, asegúrate de tener instalado:

Node.js (v18 o superior)

Angular CLI (npm install -g @angular/cli)

Una cuenta de Firebase con un proyecto creado y Firestore habilitado

Pasos para instalación
bash
Copiar
Editar
# Clona el repositorio
git clone https://github.com/tu-usuario/proyecto-monitor-cuyes.git
cd proyecto-monitor-cuyes

# Instala dependencias
npm install

# Configura tu entorno Firebase
# (Agregar las credenciales del proyecto Firebase en el entorno de Angular)

# Ejecuta el servidor de desarrollo
ng serve
La aplicación estará disponible en http://localhost:4200.

🧱 Arquitectura del sistema
La aplicación está compuesta por los siguientes elementos clave:

🔹 Componentes principales
TablaComponent: Renderiza cualquier colección y permite aplicar filtros, ver subcolecciones y acciones.

ModalFiltrarComponent: Permite seleccionar una columna y aplicar filtros por palabra clave.

FormularioComponent: Vista dinámica para crear/editar registros según la colección activa.

🔹 Servicios
FirestoreService: Gestiona lectura, escritura y actualización de datos en Firebase.

UiService: Controla rutas internas, vistas activas, ID de documento padre y estado de carga.

ModalService: Administra apertura y cierre de modales reutilizables.

RefDisplayPipe: Muestra campos de referencias (DocumentReference) recuperando dinámicamente los datos relacionados.

Link de la página web:
https://leninerick.github.io/appINIA/login


Link del vídeo:
