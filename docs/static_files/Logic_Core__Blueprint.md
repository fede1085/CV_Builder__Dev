Logic Core / Blueprint
Flujo de Datos: El estado de la aplicación (profileData) se centraliza en el componente App.tsx y se pasa como props a los componentes hijos (lectura) y al EditorPanel (escritura). El flujo es unidireccional: EditorPanel actualiza el estado central -> App.tsx re-renderiza los componentes de vista.
Estructura de Datos Principal (ProfileData): Un único objeto JSON que contiene toda la información del CV, incluyendo name, title, avatarUrl, overview, y arrays para experience, education, languages, y coreCompetencies.
Lógica de Acordeones: Cada componente Accordion gestiona su propio estado de apertura (isOpen) con un useState. Al hacer clic, se alterna el estado booleano, lo que condicionalmente renderiza el div que contiene la descripción.
Persistencia de Estado: Se utiliza un custom hook useLocalStorage para guardar automáticamente el objeto profileData en el almacenamiento local del navegador, asegurando que los cambios persistan entre sesiones.
Lógica de Exportación a PDF:
Se utiliza la librería html2canvas para capturar el elemento DOM principal del CV (#cv-content) y convertirlo en un <canvas>.
Se configura scale: 2 para obtener una imagen de alta resolución y evitar pixelación.
Se utiliza jsPDF para inicializar un nuevo documento PDF.
Las dimensiones del PDF se establecen para que coincidan exactamente con las del canvas ([canvas.width, canvas.height]), garantizando una correspondencia 1:1.
La imagen del canvas se inserta en el PDF, que luego se ofrece para su descarga.