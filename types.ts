
export interface Experience {
  id: number;
  role: string;
  isContract: boolean;
  company: string;
  location: string;
  dates: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  status: string;
}

export interface Language {
  flag: string;
  name: string;
  level: string;
}

export interface ProfileData {
  name: string;
  title: string;
  avatarUrl: string;
  availability: string;
  email: string;
  phone: string;
  overview: string;
  experience: Experience[];
  education: Education[];
  languages: Language[];
  contactDetails: {
    address: string;
    nationality: string;
    status: string;
  };
  coreCompetencies: string[];
  references: string;
}