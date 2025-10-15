
import type { ProfileData } from '../types';

export const initialProfileData: ProfileData = {
  name: "Federico Mosqueira",
  title: "Curriculum Online",
  avatarUrl: "https://picsum.photos/id/64/150/150",
  availability: "Onmiddellijke beschikbaarheid om aan de slag te gaan.",
  email: "fede1985.mosqueira@gmail.com",
  phone: "+31 6 42656946",
  overview: "Ik ben op zoek naar een uitdagende functie waarin ik mijn vaardigheden in probleemoplossing, tijdbeheer, kritisch denken en veerkracht kan benutten, om bij te dragen aan het succes van een organisatie. Met mijn sterke motivatie, aanpassingsvermogen en veerkracht, streef ik ernaar deel uit te maken van een dynamisch team waar ik mijn ervaring en toewijding kan inzetten om waarde toe te voegen.",
  experience: [
    {
      id: 1,
      role: "Magazijnier",
      isContract: true,
      company: "Van Aerde",
      location: "Antwerpen",
      dates: "agosto 2023 / oktober 2025",
      description: "Verantwoordelijk voor het beheren van inkomende en uitgaande goederen, orderpicken en het handhaven van een veilige en georganiseerde werkomgeving."
    },
    {
      id: 2,
      role: "Winkelmedewerker",
      isContract: false,
      company: "Colruyt",
      location: "Antwerpen",
      dates: "2023 / 2025",
      description: "Kassa bedienen, rekken aanvullen en klanten helpen met hun vragen. Zorgen voor een nette en uitnodigende winkelomgeving."
    },
    {
      id: 3,
      role: "Keuken Assistent",
      isContract: false,
      company: "McDonald's Aartselaar",
      location: "Antwerpen",
      dates: "2020 / 2022",
      description: "Assisteren bij de voedselbereiding, keuken schoonhouden en de operationele normen van McDonald's handhaven om kwaliteit en snelheid te garanderen."
    },
    {
      id: 4,
      role: "Logistiek Medewerker",
      isContract: false,
      company: "Ultimate Solutions",
      location: "New Zealand",
      dates: "2017 / 2019",
      description: "Beheren van de inventaris, voorbereiden van zendingen en coördineren met transporteurs voor tijdige leveringen."
    },
    {
      id: 5,
      role: "Web en Grafisch Ontwerper",
      isContract: false,
      company: "i2es",
      location: "Montevideo, Uruguay",
      dates: "2015 / 2017",
      description: "Ontwerpen en ontwikkelen van websites, creëren van grafische content voor marketingcampagnes en onderhouden van de visuele identiteit van het merk."
    }
  ],
  education: [
    {
      institution: "ORT University",
      degree: "Carrière van webdesign en grafisch ontwerp",
      location: "Uruguay",
      status: ""
    },
    {
      institution: "UTU Tourism and Hospitality School",
      degree: "",
      location: "Uruguay",
      status: ""
    },
    {
      institution: "Middelbare school",
      degree: "",
      location: "",
      status: "(afgestudeerd)"
    }
  ],
  languages: [
    { flag: "🇳🇱", name: "Dutch", level: "basis werkvloer" },
    { flag: "🇬🇧", name: "English", level: "zeer goed" },
    { flag: "🇪🇸", name: "Spaans", level: "moedertaal" },
  ],
  contactDetails: {
    address: "Lange Leemstraat 93, Antwerpen",
    nationality: "Uruguayaans",
    status: "Gehuwd 🙂"
  },
  coreCompetencies: [
    "Probleemoplossing",
    "Initiatief, flexibiliteit",
    "Besluitvorming",
    "Multitasken en timemanagement",
    "Lichamelijke conditie en uithoudingsvermogen"
  ],
  references: "Recente rol: Van Aerde, beschikbaar op aanvraag."
};