
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Content {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    experience: string;
    clients: string;
    satisfaction: string;
    response: string;
  };
  products: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    features: string[];
  }>;
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  company: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  emergency: {
    title: string;
    description: string;
    phone: string;
    instructions: string;
  };
  legal: {
    mentions: string;
    privacy: string;
    terms: string;
  };
}

interface ContentStore {
  content: Content;
  updateContent: (section: keyof Content, data: any) => void;
  updateProduct: (productId: string, data: any) => void;
  addProduct: (product: any) => void;
  removeProduct: (productId: string) => void;
  saveImage: (imageData: string, path: string) => Promise<string>;
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      content: {
        hero: {
          title: "Votre Protection, Notre Expertise",
          subtitle: "Plus de 20 ans d'expérience en assurance au Maroc. Solutions personnalisées pour particuliers et professionnels.",
          backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80"
        },
        about: {
          title: "À Propos de Moumen Technique et Prévoyance",
          subtitle: "Plus de 20 ans d'expertise",
          description: "Depuis plus de 20 ans, nous accompagnons particuliers et professionnels dans la protection de leurs biens les plus précieux avec expertise et proximité.",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          experience: "20+ ans",
          clients: "5000+",
          satisfaction: "98%",
          response: "24h"
        },
        products: [
          {
            id: 'auto',
            title: 'Assurance Auto',
            description: 'Protection complète pour votre véhicule avec AXA Maroc',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'Car',
            features: ['Assistance 24h/7j', 'Véhicule de remplacement', 'Protection du conducteur', 'Garantie tous risques']
          },
          {
            id: 'habitation',
            title: 'Assurance Habitation',
            description: 'Protégez votre logement contre tous les risques',
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'Home',
            features: ['Responsabilité civile vie privée', 'Assistance habitation', 'Garantie mobilier', 'Protection juridique']
          },
          {
            id: 'sante',
            title: 'Assurance Santé',
            description: 'Couverture médicale complète pour votre famille',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'Heart',
            features: ['Médecine générale', 'Hospitalisation', 'Dentaire et optique', 'Médicaments']
          },
          {
            id: 'prevoyance',
            title: 'Prévoyance',
            description: 'Protégez vos proches en cas d\'accidents de la vie',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'Shield',
            features: ['Capital décès', 'Rente invalidité', 'Indemnités journalières', 'Assistance famille']
          },
          {
            id: 'epargne',
            title: 'Épargne & Retraite',
            description: 'Constituez votre patrimoine pour l\'avenir',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'PiggyBank',
            features: ['Épargne disponible', 'Retraite complémentaire', 'Transmission patrimoine', 'Avantages fiscaux']
          },
          {
            id: 'professionnelle',
            title: 'Assurance Professionnelle',
            description: 'Solutions sur-mesure pour votre activité',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            icon: 'Briefcase',
            features: ['Responsabilité civile pro', 'Multirisque professionnelle', 'Protection juridique', 'Cyber-risques']
          }
        ],
        contact: {
          name: "MOUMEN TECHNIQUE ET PREVOYANCE",
          phone: "+212 523 456 789",
          email: "contact@moumentechnique.ma",
          address: "123 Boulevard Mohammed V, Casablanca, Maroc 20000",
          hours: "Lun-Ven: 8h00-18h00, Sam: 8h00-12h00"
        },
        company: {
          name: "MOUMEN TECHNIQUE ET PREVOYANCE",
          phone: "+212 523 456 789",
          email: "contact@moumentechnique.ma",
          address: "Casablanca, Maroc"
        },
        emergency: {
          title: "Urgence Sinistre 24h/7j",
          description: "En cas de sinistre, contactez-nous immédiatement pour une prise en charge rapide",
          phone: "+212 661 234 567",
          instructions: "Appelez immédiatement ce numéro en cas d'accident ou de sinistre. Notre équipe d'urgence est disponible 24h/24."
        },
        legal: {
          mentions: "MOUMEN TECHNIQUE ET PREVOYANCE - Agent Général d'Assurance agréé par l'ACAPS sous le numéro AG-XXXX. Siège social : 123 Boulevard Mohammed V, Casablanca, Maroc. RC : XXXX. Patente : XXXX. IF : XXXX. CNSS : XXXX.",
          privacy: "Vos données personnelles sont collectées et traitées dans le respect de la loi 09-08 relative à la protection des données personnelles. Elles sont utilisées uniquement pour la gestion de vos contrats d'assurance et ne sont jamais communiquées à des tiers sans votre consentement.",
          terms: "Les présentes conditions générales s'appliquent à tous les contrats d'assurance souscrits auprès de MOUMEN TECHNIQUE ET PREVOYANCE. Tout litige sera soumis aux tribunaux compétents de Casablanca."
        }
      },
      updateContent: (section, data) =>
        set((state) => ({
          content: {
            ...state.content,
            [section]: { ...state.content[section], ...data }
          }
        })),
      updateProduct: (productId, data) =>
        set((state) => ({
          content: {
            ...state.content,
            products: state.content.products.map(product =>
              product.id === productId ? { ...product, ...data } : product
            )
          }
        })),
      addProduct: (product) =>
        set((state) => ({
          content: {
            ...state.content,
            products: [...state.content.products, product]
          }
        })),
      removeProduct: (productId) =>
        set((state) => ({
          content: {
            ...state.content,
            products: state.content.products.filter(product => product.id !== productId)
          }
        })),
      saveImage: async (imageData: string, path: string) => {
        try {
          // Dans un environnement réel, vous enverriez l'image à votre serveur
          // Pour cette démo, nous retournons directement l'URL de données
          console.log('Saving image:', path);
          return imageData;
        } catch (error) {
          console.error('Erreur lors de la sauvegarde de l\'image:', error);
          throw error;
        }
      }
    }),
    {
      name: 'content-storage',
    }
  )
);
