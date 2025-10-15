Project Template Base (Plantilla del Proyecto)
Estructura de Directorios:
code
Code
/src
  /components/     # Componentes de UI reutilizables
  /data/           # Datos iniciales y mock
  /types/          # Definiciones de tipos (TypeScript)
  App.tsx          # Componente principal
  index.tsx        # Punto de entrada de React
Configuración y Stack:
Framework: React con TypeScript.
Estilos: Tailwind CSS para un enfoque utility-first.
Fuente: "Inter", cargada desde Google Fonts.
Dependencias Externas (CDN): html2canvas, jspdf.
Scripts (Conceptuales):
dev: Iniciar el servidor de desarrollo.
build: Generar los archivos estáticos para producción.
export: Representa la funcionalidad de descarga de PDF dentro de la app.
Proceso de QA (Control de Calidad):
La validación principal consiste en una comparación visual lado a lado del CV en el navegador y el PDF generado.
Revisar específicamente que los tamaños de fuente, grosores, márgenes, paddings y la calidad de la imagen de perfil no sufran degradación.