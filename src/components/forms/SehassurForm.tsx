
import React, { useState, useReducer, useEffect } from 'react';
import FormLayout from './FormLayout';
import FormField from './FormField';
import FormNavigation from './FormNavigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FormState {
  currentStep: number;
  formData: {
    // Étape 1 - Profil
    age: string;
    sexe: string;
    situationFamiliale: string;
    nombreEnfants: string;
    revenusMensuels: string;
    regionResidence: string;
    // Étape 2 - Besoins santé
    couverturesSouhaitees: string[];
    niveauCouverture: string;
    maladiesChroniques: string;
    hospitalisationRecente: string;
    // Étape 3 - Contact
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    meilleurMoment: string;
    accepteConditions: boolean;
    accepteCommunications: boolean;
    accepteTraitement: boolean;
  };
  simulation: {
    cotisationMensuelle: number;
    tauxRemboursement: number;
    plafondAnnuel: number;
    franchise: number;
  } | null;
  errors: Record<string, string>;
  isLoading: boolean;
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_COUVERTURE'; couverture: string; checked: boolean }
  | { type: 'SET_SIMULATION'; simulation: any }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOADING'; loading: boolean };

const initialState: FormState = {
  currentStep: 1,
  formData: {
    age: '',
    sexe: '',
    situationFamiliale: '',
    nombreEnfants: '',
    revenusMensuels: '',
    regionResidence: '',
    couverturesSouhaitees: [],
    niveauCouverture: '',
    maladiesChroniques: '',
    hospitalisationRecente: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    meilleurMoment: '',
    accepteConditions: false,
    accepteCommunications: false,
    accepteTraitement: false,
  },
  simulation: null,
  errors: {},
  isLoading: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value }
      };
    case 'SET_COUVERTURE':
      const couvertures = action.checked
        ? [...state.formData.couverturesSouhaitees, action.couverture]
        : state.formData.couverturesSouhaitees.filter(c => c !== action.couverture);
      return {
        ...state,
        formData: { ...state.formData, couverturesSouhaitees: couvertures }
      };
    case 'SET_SIMULATION':
      return {
        ...state,
        simulation: action.simulation
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'CLEAR_ERROR':
      const { [action.field]: _, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 3)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1)
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading
      };
    default:
      return state;
  }
};

const SehassurForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const situationFamilialeOptions = [
    { value: 'celibataire', label: 'Célibataire' },
    { value: 'marie', label: 'Marié(e)' },
    { value: 'divorce', label: 'Divorcé(e)' },
    { value: 'veuf', label: 'Veuf(ve)' },
  ];

  const revenusMensuelsOptions = [
    { value: '0-3000', label: 'Moins de 3 000 DHS' },
    { value: '3000-5000', label: '3 000 - 5 000 DHS' },
    { value: '5000-8000', label: '5 000 - 8 000 DHS' },
    { value: '8000-12000', label: '8 000 - 12 000 DHS' },
    { value: '12000-20000', label: '12 000 - 20 000 DHS' },
    { value: '20000+', label: 'Plus de 20 000 DHS' },
  ];

  const regionsMaroc = [
    { value: 'grand-casablanca', label: 'Grand Casablanca' },
    { value: 'rabat-sale-kenitra', label: 'Rabat-Salé-Kénitra' },
    { value: 'marrakech-safi', label: 'Marrakech-Safi' },
    { value: 'fes-meknes', label: 'Fès-Meknès' },
    { value: 'tanger-tetouan', label: 'Tanger-Tétouan-Al Hoceima' },
    { value: 'oriental', label: 'L\'Oriental' },
    { value: 'souss-massa', label: 'Souss-Massa' },
    { value: 'beni-mellal', label: 'Béni Mellal-Khénifra' },
    { value: 'draa-tafilalet', label: 'Drâa-Tafilalet' },
    { value: 'laayoune', label: 'Laâyoune-Sakia El Hamra' },
    { value: 'dakhla', label: 'Dakhla-Oued Ed-Dahab' },
    { value: 'guelmim', label: 'Guelmim-Oued Noun' },
  ];

  const couverturesDisponibles = [
    { id: 'consultations', label: 'Consultations médicales' },
    { id: 'medicaments', label: 'Médicaments' },
    { id: 'hospitalisation', label: 'Hospitalisation' },
    { id: 'dentaire', label: 'Soins dentaires' },
    { id: 'optique', label: 'Optique' },
    { id: 'maternite', label: 'Maternité' },
    { id: 'analyses', label: 'Analyses et examens' },
  ];

  const meilleurMomentOptions = [
    { value: 'matin', label: 'Matin (9h-12h)' },
    { value: 'apres-midi', label: 'Après-midi (14h-17h)' },
    { value: 'soir', label: 'Soir (17h-19h)' },
    { value: 'weekend', label: 'Weekend' },
  ];

  // Simulation automatique quand les données nécessaires sont disponibles
  useEffect(() => {
    if (state.currentStep === 3 && state.formData.age && state.formData.niveauCouverture) {
      calculateSimulation();
    }
  }, [state.currentStep, state.formData.age, state.formData.niveauCouverture, state.formData.couverturesSouhaitees]);

  const calculateSimulation = () => {
    const age = parseInt(state.formData.age);
    const nombreCouvertures = state.formData.couverturesSouhaitees.length;
    
    let baseCotisation = 200; // Base de 200 DHS
    
    // Ajustement par âge
    if (age > 50) baseCotisation *= 1.5;
    else if (age > 30) baseCotisation *= 1.2;
    
    // Ajustement par nombre de couvertures
    baseCotisation += nombreCouvertures * 50;
    
    // Ajustement par niveau de couverture
    let tauxRemboursement = 70;
    let multiplicateur = 1;
    
    switch (state.formData.niveauCouverture) {
      case 'essentiel':
        tauxRemboursement = 70;
        multiplicateur = 1;
        break;
      case 'confort':
        tauxRemboursement = 85;
        multiplicateur = 1.4;
        break;
      case 'premium':
        tauxRemboursement = 95;
        multiplicateur = 1.8;
        break;
    }
    
    const cotisationMensuelle = Math.round(baseCotisation * multiplicateur);
    const plafondAnnuel = cotisationMensuelle * 12 * 3; // 3x la cotisation annuelle
    const franchise = state.formData.niveauCouverture === 'premium' ? 100 : 
                     state.formData.niveauCouverture === 'confort' ? 200 : 300;

    const simulation = {
      cotisationMensuelle,
      tauxRemboursement,
      plafondAnnuel,
      franchise
    };

    dispatch({ type: 'SET_SIMULATION', simulation });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    dispatch({ type: 'SET_FIELD', field: name, value: fieldValue });
    
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const handleCouvertureChange = (couvertureId: string, checked: boolean) => {
    dispatch({ type: 'SET_COUVERTURE', couverture: couvertureId, checked });
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!state.formData.age) errors.age = 'L\'âge est requis';
      if (!state.formData.sexe) errors.sexe = 'Le sexe est requis';
      if (!state.formData.situationFamiliale) errors.situationFamiliale = 'La situation familiale est requise';
      if (!state.formData.regionResidence) errors.regionResidence = 'La région de résidence est requise';
      
      const age = parseInt(state.formData.age);
      if (age && (age < 18 || age > 80)) {
        errors.age = 'L\'âge doit être entre 18 et 80 ans';
      }
    }
    
    if (step === 2) {
      if (state.formData.couverturesSouhaitees.length === 0) {
        errors.couverturesSouhaitees = 'Veuillez sélectionner au moins une couverture';
      }
      if (!state.formData.niveauCouverture) errors.niveauCouverture = 'Veuillez sélectionner un niveau de couverture';
    }
    
    if (step === 3) {
      if (!state.formData.nom) errors.nom = 'Le nom est requis';
      if (!state.formData.prenom) errors.prenom = 'Le prénom est requis';
      if (!state.formData.telephone) errors.telephone = 'Le téléphone est requis';
      if (!state.formData.email) errors.email = 'L\'email est requis';
      if (!state.formData.accepteConditions) errors.accepteConditions = 'Vous devez accepter les conditions générales';
      if (!state.formData.accepteTraitement) errors.accepteTraitement = 'Vous devez accepter le traitement des données';
      
      if (state.formData.email && !/\S+@\S+\.\S+/.test(state.formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
    }

    Object.keys(errors).forEach(field => {
      dispatch({ type: 'SET_ERROR', field, error: errors[field] });
    });

    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(state.currentStep)) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    dispatch({ type: 'SET_LOADING', loading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Votre demande SEHASSUR a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
      console.log('Données du formulaire SEHASSUR:', { ...state.formData, simulation: state.simulation });
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Votre profil</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Âge"
                name="age"
                type="number"
                value={state.formData.age}
                onChange={handleFieldChange}
                error={state.errors.age}
                required
                min={18}
                max={80}
                placeholder="35"
              />
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Sexe <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={state.formData.sexe} 
                  onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'sexe', value })}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="homme" id="homme" />
                    <Label htmlFor="homme" className="cursor-pointer">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femme" id="femme" />
                    <Label htmlFor="femme" className="cursor-pointer">Femme</Label>
                  </div>
                </RadioGroup>
                {state.errors.sexe && (
                  <p className="text-sm text-red-500">{state.errors.sexe}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Situation familiale"
                name="situationFamiliale"
                type="select"
                value={state.formData.situationFamiliale}
                onChange={handleFieldChange}
                options={situationFamilialeOptions}
                error={state.errors.situationFamiliale}
                required
              />
              <FormField
                label="Nombre d'enfants à charge"
                name="nombreEnfants"
                type="number"
                value={state.formData.nombreEnfants}
                onChange={handleFieldChange}
                min={0}
                max={10}
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Revenus mensuels (DHS)"
                name="revenusMensuels"
                type="select"
                value={state.formData.revenusMensuels}
                onChange={handleFieldChange}
                options={revenusMensuelsOptions}
                placeholder="Sélectionner une tranche"
              />
              <FormField
                label="Région de résidence"
                name="regionResidence"
                type="select"
                value={state.formData.regionResidence}
                onChange={handleFieldChange}
                options={regionsMaroc}
                error={state.errors.regionResidence}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos besoins santé</h2>
            
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Couverture souhaitée {state.errors.couverturesSouhaitees && <span className="text-red-500">({state.errors.couverturesSouhaitees})</span>}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {couverturesDisponibles.map((couverture) => (
                  <div key={couverture.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      id={couverture.id}
                      checked={state.formData.couverturesSouhaitees.includes(couverture.id)}
                      onChange={(e) => handleCouvertureChange(couverture.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor={couverture.id} className="flex-1 cursor-pointer">
                      {couverture.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Niveau de couverture <span className="text-red-500">*</span>
              </Label>
              <RadioGroup 
                value={state.formData.niveauCouverture} 
                onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'niveauCouverture', value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="essentiel" id="essentiel" />
                  <div className="flex-1">
                    <Label htmlFor="essentiel" className="cursor-pointer font-medium">
                      Essentiel (70% remboursement)
                    </Label>
                    <p className="text-sm text-gray-600">Couverture de base pour les soins essentiels</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="confort" id="confort" />
                  <div className="flex-1">
                    <Label htmlFor="confort" className="cursor-pointer font-medium">
                      Confort (85% remboursement)
                    </Label>
                    <p className="text-sm text-gray-600">Couverture étendue avec meilleur remboursement</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="premium" id="premium" />
                  <div className="flex-1">
                    <Label htmlFor="premium" className="cursor-pointer font-medium">
                      Premium (95% remboursement)
                    </Label>
                    <p className="text-sm text-gray-600">Couverture maximale pour tous les soins</p>
                  </div>
                </div>
              </RadioGroup>
              {state.errors.niveauCouverture && (
                <p className="text-sm text-red-500">{state.errors.niveauCouverture}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Maladies chroniques"
                name="maladiesChroniques"
                type="select"
                value={state.formData.maladiesChroniques}
                onChange={handleFieldChange}
                options={[
                  { value: 'non', label: 'Non' },
                  { value: 'oui', label: 'Oui' },
                ]}
                placeholder="Avez-vous des maladies chroniques ?"
              />
              <FormField
                label="Hospitalisation récente"
                name="hospitalisationRecente"
                type="select"
                value={state.formData.hospitalisationRecente}
                onChange={handleFieldChange}
                options={[
                  { value: 'non', label: 'Non' },
                  { value: 'oui', label: 'Oui' },
                ]}
                placeholder="Hospitalisation dans les 12 derniers mois ?"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Simulation et contact</h2>
            
            {/* Résultats de simulation */}
            {state.simulation && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Votre simulation SEHASSUR</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{state.simulation.cotisationMensuelle} DHS</div>
                    <div className="text-sm text-gray-600">Cotisation mensuelle</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{state.simulation.tauxRemboursement}%</div>
                    <div className="text-sm text-gray-600">Taux de remboursement</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{state.simulation.plafondAnnuel.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Plafond annuel (DHS)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{state.simulation.franchise}</div>
                    <div className="text-sm text-gray-600">Franchise (DHS)</div>
                  </div>
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-800">Contact pour finalisation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Nom"
                name="nom"
                value={state.formData.nom}
                onChange={handleFieldChange}
                error={state.errors.nom}
                required
                placeholder="Votre nom"
              />
              <FormField
                label="Prénom"
                name="prenom"
                value={state.formData.prenom}
                onChange={handleFieldChange}
                error={state.errors.prenom}
                required
                placeholder="Votre prénom"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Téléphone"
                name="telephone"
                type="tel"
                value={state.formData.telephone}
                onChange={handleFieldChange}
                error={state.errors.telephone}
                required
                placeholder="+212 6XX XXX XXX"
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={state.formData.email}
                onChange={handleFieldChange}
                error={state.errors.email}
                required
                placeholder="votre.email@exemple.com"
              />
            </div>

            <FormField
              label="Meilleur moment pour être contacté"
              name="meilleurMoment"
              type="select"
              value={state.formData.meilleurMoment}
              onChange={handleFieldChange}
              options={meilleurMomentOptions}
              placeholder="Choisir un créneau"
            />

            {/* Checkboxes de confirmation */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="accepteConditions"
                  name="accepteConditions"
                  checked={state.formData.accepteConditions}
                  onChange={handleFieldChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="accepteConditions" className="text-sm">
                  J'accepte les conditions générales * 
                  {state.errors.accepteConditions && (
                    <span className="text-red-500 ml-1">{state.errors.accepteConditions}</span>
                  )}
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="accepteCommunications"
                  name="accepteCommunications"
                  checked={state.formData.accepteCommunications}
                  onChange={handleFieldChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="accepteCommunications" className="text-sm">
                  J'accepte de recevoir des communications d'AXA Maroc
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="accepteTraitement"
                  name="accepteTraitement"
                  checked={state.formData.accepteTraitement}
                  onChange={handleFieldChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="accepteTraitement" className="text-sm">
                  J'accepte le traitement de mes données personnelles *
                  {state.errors.accepteTraitement && (
                    <span className="text-red-500 ml-1">{state.errors.accepteTraitement}</span>
                  )}
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormLayout 
      title="Simulateur SEHASSUR" 
      currentStep={state.currentStep} 
      totalSteps={3}
    >
      {renderStep()}
      <FormNavigation
        currentStep={state.currentStep}
        totalSteps={3}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isLoading={state.isLoading}
        canProceed={true}
      />
    </FormLayout>
  );
};

export default SehassurForm;
