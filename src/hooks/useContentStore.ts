
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ContentStore {
  content: {
    hero: {
      title: string;
      subtitle: string;
      backgroundImage: string;
    };
    about: {
      title: string;
      subtitle: string;
      description: string;
      experience: string;
      clients: string;
      satisfaction: string;
      response: string;
    };
    contact: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
    products: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      image?: string;
      detailedDescription?: string;
      features: string[];
    }>;
  };
  updateContent: (section: string, data: any) => void;
  updateProduct: (productId: string, data: any) => void;
  addProduct: (product: any) => void;
  removeProduct: (productId: string) => void;
  resetContent: () => void;
}

const defaultContent = {
  hero: {
    title: 'Votre Sécurité, Notre Priorité',
    subtitle: 'MOUMEN TECHNIQUE ET PREVOYANCE vous accompagne depuis plus de 20 ans pour protéger ce qui compte le plus : votre famille, votre maison, votre entreprise.',
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  about: {
    title: 'MOUMEN TECHNIQUE & PREVOYANCE',
    subtitle: 'Votre Agent Général AXA de Confiance',
    description: 'Depuis plus de 20 ans, MOUMEN TECHNIQUE ET PREVOYANCE accompagne les particuliers et les entreprises dans leurs projets d\'assurance et de prévoyance.',
    experience: '20+',
    clients: '5000+',
    satisfaction: '98%',
    response: '24h'
  },
  contact: {
    address: '123 Avenue Mohammed V, Casablanca 20000, Maroc',
    phone: '+212 5XX-XXX-XXX',
    email: 'contact@moumentechnique.ma',
    hours: 'Lun-Ven: 8h00-18h00, Sam: 8h00-12h00'
  },
  products: [
    {
      id: 'auto',
      title: 'Assurance Auto',
      description: 'Protection complète pour votre véhicule',
      icon: 'Car',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Notre assurance auto vous offre une protection complète pour votre véhicule avec des garanties adaptées à vos besoins et votre budget.',
      features: ['Responsabilité civile obligatoire', 'Tous risques complet', 'Vol et incendie', 'Assistance 24h/7j', 'Véhicule de remplacement']
    },
    {
      id: 'habitation',
      title: 'Assurance Habitation',
      description: 'Protégez votre foyer et vos biens',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Protégez votre logement et vos biens avec notre assurance habitation complète, adaptée aux spécificités du marché marocain.',
      features: ['Incendie et explosion', 'Vol et vandalisme', 'Dégâts des eaux', 'Responsabilité civile', 'Bris de glace']
    },
    {
      id: 'sante',
      title: 'Assurance Santé',
      description: 'Couverture santé pour toute la famille',
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Une couverture santé complète pour vous et votre famille avec accès aux meilleurs établissements de soins au Maroc.',
      features: ['Consultation médicale', 'Hospitalisation', 'Médicaments', 'Soins dentaires', 'Optique']
    },
    {
      id: 'prevoyance',
      title: 'Prévoyance',
      description: 'Sécurisez l\'avenir de votre famille',
      icon: 'Shield',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Protégez l\'avenir de votre famille avec nos solutions de prévoyance complètes et personnalisées.',
      features: ['Décès accidentel', 'Invalidité permanente', 'Incapacité temporaire', 'Rente éducation', 'Capital obsèques']
    },
    {
      id: 'epargne',
      title: 'Épargne & Retraite',
      description: 'Constituez votre capital pour l\'avenir',
      icon: 'PiggyBank',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Préparez votre retraite et constituez un capital avec nos solutions d\'épargne avantageuses et sécurisées.',
      features: ['Épargne progressive', 'Retraite complémentaire', 'Placement sécurisé', 'Avantages fiscaux', 'Transmission patrimoine']
    },
    {
      id: 'professionnelle',
      title: 'Assurance Professionnelle',
      description: 'Protection complète de votre activité',
      icon: 'Building',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      detailedDescription: 'Protégez votre activité professionnelle avec nos assurances adaptées aux entreprises et professions libérales.',
      features: ['Responsabilité civile pro', 'Protection juridique', 'Multirisque bureau', 'Cyber-risques', 'Perte d\'exploitation']
    }
  ]
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      content: defaultContent,
      updateContent: (section, data) =>
        set((state) => ({
          content: {
            ...state.content,
            [section]: { ...state.content[section as keyof typeof state.content], ...data }
          }
        })),
      updateProduct: (productId, data) =>
        set((state) => ({
          content: {
            ...state.content,
            products: state.content.products.map(p => 
              p.id === productId ? { ...p, ...data } : p
            )
          }
        })),
      addProduct: (product) =>
        set((state) => ({
          content: {
            ...state.content,
            products: [...state.content.products, { ...product, id: product.id || Date.now().toString() }]
          }
        })),
      removeProduct: (productId) =>
        set((state) => ({
          content: {
            ...state.content,
            products: state.content.products.filter(p => p.id !== productId)
          }
        })),
      resetContent: () =>
        set(() => ({ content: defaultContent }))
    }),
    {
      name: 'moumen-content-store',
      version: 1
    }
  )
);
