Product Requirements
Objetivo General: Desarrollar una aplicación web de currículum vitae (CV) interactiva, con una estética inspirada en Notion. El sistema debe permitir la edición de contenido en tiempo real y la exportación a un archivo PDF que sea una réplica visualmente exacta de la versión web.
Funcionalidades Clave:
Modo dual: Alternar entre vista de lectura y panel de edición.
Edición en vivo: Los cambios en el formulario se reflejan instantáneamente en la vista del CV.
Acordeones de Experiencia: Las secciones de experiencia laboral son desplegables para mostrar/ocultar descripciones detalladas.
Exportación PDF 1:1: Generación de un PDF de alta fidelidad que reproduce exactamente el layout, tipografía y espaciado del DOM.
Alcance: Aplicación 100% frontend. No requiere backend; la persistencia de datos se gestiona localmente.
Requisitos No Funcionales:
Performance: Carga rápida y respuesta fluida durante la edición.
Consistencia Visual: El diseño debe ser coherente en todos los componentes.
Fidelidad de Renderizado: La tipografía, márgenes y paddings definidos en CSS deben mantenerse en el PDF.
Accesibilidad: Uso de atributos ARIA básicos (aria-expanded, aria-label) para una mejor navegación.
Criterio de Éxito Principal: El archivo PDF generado es visualmente indistinguible del CV mostrado en el navegador.