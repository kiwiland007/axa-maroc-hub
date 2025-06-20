
import React, { useState, useReducer } from 'react';
import FormLayout from './FormLayout';
import FormField from './FormField';
import FormNavigation from './FormNavigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FormState {
  currentStep: number;
  formData: {
    // Étape 1 - Informations personnelles
    civilite: string;
    prenom: string;
    nom: string;
    dateNaissance: string;
    profession: string;
    telephone: string;
    email: string;
    adresse: string;
    ville: string;
    codePostal: string;
    // Étape 2 - Type d'assurance
    typeAssurance: string;
    autreAssurance: string;
    montantCouverture: string;
    commentaires: string;
    // Étape 3 - Confirmations
    accepteConditions: boolean;
    accepteCommunications: boolean;
    accepteTraitement: boolean;
  };
  errors: Record<string, string>;
  isLoading: boolean;
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOADING'; loading: boolean };

const initialState: FormState = {
  currentStep: 1,
  formData: {
    civilite: '',
    prenom: '',
    nom: '',
    dateNaissance: '',
    profession: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    typeAssurance: '',
    autreAssurance: '',
    montantCouverture: '',
    commentaires: '',
    accepteConditions: false,
    accepteCommunications: false,
    accepteTraitement: false,
  },
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

const AffaireNouvelleForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const villesMaroc = [
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'fes', label: 'Fès' },
    { value: 'tanger', label: 'Tanger' },
    { value: 'agadir', label: 'Agadir' },
    { value: 'meknes', label: 'Meknès' },
    { value: 'oujda', label: 'Oujda' },
    { value: 'kenitra', label: 'Kénitra' },
    { value: 'tetouan', label: 'Tétouan' },
  ];

  const civiliteOptions = [
    { value: 'M', label: 'M.' },
    { value: 'Mme', label: 'Mme' },
    { value: 'Mlle', label: 'Mlle' },
  ];

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    dispatch({ type: 'SET_FIELD', field: name, value: fieldValue });
    
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!state.formData.civilite) errors.civilite = 'La civilité est requise';
      if (!state.formData.prenom) errors.prenom = 'Le prénom est requis';
      if (!state.formData.nom) errors.nom = 'Le nom est requis';
      if (!state.formData.dateNaissance) errors.dateNaissance = 'La date de naissance est requise';
      if (!state.formData.telephone) errors.telephone = 'Le téléphone est requis';
      if (!state.formData.email) errors.email = 'L\'email est requis';
      if (!state.formData.adresse) errors.adresse = 'L\'adresse est requise';
      if (!state.formData.ville) errors.ville = 'La ville est requise';
      
      // Validation email
      if (state.formData.email && !/\S+@\S+\.\S+/.test(state.formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
    }
    
    if (step === 2) {
      if (!state.formData.typeAssurance) errors.typeAssurance = 'Veuillez sélectionner un type d\'assurance';
      if (state.formData.typeAssurance === 'autre' && !state.formData.autreAssurance) {
        errors.autreAssurance = 'Veuillez préciser le type d\'assurance';
      }
    }
    
    if (step === 3) {
      if (!state.formData.accepteConditions) errors.accepteConditions = 'Vous devez accepter les conditions générales';
      if (!state.formData.accepteTraitement) errors.accepteTraitement = 'Vous devez accepter le traitement des données';
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
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Votre demande d\'affaire nouvelle a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
      console.log('Données du formulaire:', state.formData);
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Civilité"
                name="civilite"
                type="select"
                value={state.formData.civilite}
                onChange={handleFieldChange}
                options={civiliteOptions}
                error={state.errors.civilite}
                required
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
              <FormField
                label="Nom"
                name="nom"
                value={state.formData.nom}
                onChange={handleFieldChange}
                error={state.errors.nom}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Date de naissance"
                name="dateNaissance"
                type="date"
                value={state.formData.dateNaissance}
                onChange={handleFieldChange}
                error={state.errors.dateNaissance}
                required
              />
              <FormField
                label="Profession"
                name="profession"
                value={state.formData.profession}
                onChange={handleFieldChange}
                placeholder="Votre profession"
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
              label="Adresse complète"
              name="adresse"
              type="textarea"
              value={state.formData.adresse}
              onChange={handleFieldChange}
              error={state.errors.adresse}
              required
              placeholder="Votre adresse complète"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Ville"
                name="ville"
                type="select"
                value={state.formData.ville}
                onChange={handleFieldChange}
                options={villesMaroc}
                error={state.errors.ville}
                required
              />
              <FormField
                label="Code postal"
                name="codePostal"
                type="number"
                value={state.formData.codePostal}
                onChange={handleFieldChange}
                placeholder="20000"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Type d'assurance</h2>
            
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Sélectionnez le type d'assurance souhaité *
              </Label>
              <RadioGroup 
                value={state.formData.typeAssurance} 
                onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'typeAssurance', value })}
                className="space-y-3"
              >
                {[
                  { value: 'auto', label: 'Assurance Auto' },
                  { value: 'habitation', label: 'Assurance Habitation' },
                  { value: 'sante', label: 'Assurance Santé' },
                  { value: 'voyage', label: 'Assurance Voyage' },
                  { value: 'autre', label: 'Autre (préciser)' },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {state.errors.typeAssurance && (
                <p className="text-sm text-red-500">{state.errors.typeAssurance}</p>
              )}
            </div>

            {state.formData.typeAssurance === 'autre' && (
              <FormField
                label="Précisez le type d'assurance"
                name="autreAssurance"
                value={state.formData.autreAssurance}
                onChange={handleFieldChange}
                error={state.errors.autreAssurance}
                required
                placeholder="Décrivez le type d'assurance souhaité"
              />
            )}

            <FormField
              label="Montant souhaité de couverture (DHS)"
              name="montantCouverture"
              type="number"
              value={state.formData.montantCouverture}
              onChange={handleFieldChange}
              placeholder="100000"
            />

            <FormField
              label="Commentaires"
              name="commentaires"
              type="textarea"
              value={state.formData.commentaires}
              onChange={handleFieldChange}
              placeholder="Informations complémentaires (optionnel)"
              rows={4}
            />
          </div>
        );

      case 3:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmation et envoi</h2>
            
            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Récapitulatif de votre demande</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nom:</span> {state.formData.civilite} {state.formData.prenom} {state.formData.nom}</p>
                <p><span className="font-medium">Email:</span> {state.formData.email}</p>
                <p><span className="font-medium">Téléphone:</span> {state.formData.telephone}</p>
                <p><span className="font-medium">Type d'assurance:</span> {state.formData.typeAssurance}</p>
                {state.formData.montantCouverture && (
                  <p><span className="font-medium">Montant de couverture:</span> {state.formData.montantCouverture} DHS</p>
                )}
              </div>
            </div>

            {/* Checkboxes de confirmation */}
            <div className="space-y-4">
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
      title="Nouvelle Affaire" 
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

export default AffaireNouvelleForm;
