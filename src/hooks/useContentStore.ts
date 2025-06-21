
import { create } from 'zustand';

interface Content {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  products: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
  }>;
  company: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

interface ContentStore {
  content: Content;
  updateContent: (section: keyof Content, data: any) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  content: {
    hero: {
      title: "Votre Protection, Notre Expertise",
      subtitle: "Plus de 20 ans d'expérience en assurance au Maroc. Solutions personnalisées pour particuliers et professionnels.",
      backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80"
    },
    products: [
      {
        id: 'auto',
        title: 'Assurance Auto',
        description: 'Protection complète pour votre véhicule',
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Assistance 24h/7j', 'Véhicule de remplacement', 'Protection du conducteur']
      },
      {
        id: 'habitation',
        title: 'Assurance Habitation',
        description: 'Protégez votre logement contre tous les risques',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Responsabilité civile vie privée', 'Assistance habitation', 'Garantie mobilier']
      },
      {
        id: 'sante',
        title: 'Assurance Santé',
        description: 'Couverture médicale complète pour votre famille',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Médecine générale', 'Hospitalisation', 'Dentaire et optique']
      },
      {
        id: 'prevoyance',
        title: 'Prévoyance',
        description: 'Protégez vos proches en cas d\'accidents de la vie',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Capital décès', 'Rente invalidité', 'Indemnités journalières']
      },
      {
        id: 'epargne',
        title: 'Épargne & Retraite',
        description: 'Constituez votre patrimoine pour l\'avenir',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Épargne disponible', 'Retraite complémentaire', 'Transmission patrimoine']
      },
      {
        id: 'professionnelle',
        title: 'Assurance Professionnelle',
        description: 'Solutions sur-mesure pour votre activité',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Responsabilité civile pro', 'Multirisque professionnelle', 'Protection juridique']
      }
    ],
    company: {
      name: "MOUMEN TECHNIQUE ET PREVOYANCE",
      phone: "+212 5XX-XXX-XXX",
      email: "contact@moumentechnique.ma",
      address: "Casablanca, Maroc"
    }
  },
  updateContent: (section, data) =>
    set((state) => ({
      content: {
        ...state.content,
        [section]: { ...state.content[section], ...data }
      }
    }))
}));
