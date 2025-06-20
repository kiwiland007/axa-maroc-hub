
import React, { useState, useReducer } from 'react';
import FormLayout from './FormLayout';
import FormField from './FormField';
import FormNavigation from './FormNavigation';
import { Label } from '@/components/ui/label';

interface FormState {
  currentStep: number;
  formData: {
    // Étape 1 - Informations du bien
    typeBien: string;
    statut: string;
    adresseBien: string;
    villeBien: string;
    surface: string;
    nombrePieces: string;
    anneeConstruction: string;
    etage: string;
    valeurBien: string;
    // Étape 2 - Couverture
    garanties: string[];
    franchise: string;
    protectionJuridique: boolean;
    assistance24h: boolean;
    // Étape 3 - Informations personnelles
    civilite: string;
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
    sinistresAnterieurs: string;
    detailsSinistres: string;
    assureurPrecedent: string;
    accepteConditions: boolean;
    accepteCommunications: boolean;
    accepteTraitement: boolean;
  };
  errors: Record<string, string>;
  isLoading: boolean;
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_GARANTIE'; garantie: string; checked: boolean }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOADING'; loading: boolean };

const initialState: FormState = {
  currentStep: 1,
  formData: {
    typeBien: '',
    statut: '',
    adresseBien: '',
    villeBien: '',
    surface: '',
    nombrePieces: '',
    anneeConstruction: '',
    etage: '',
    valeurBien: '',
    garanties: [],
    franchise: '',
    protectionJuridique: false,
    assistance24h: false,
    civilite: '',
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    sinistresAnterieurs: '',
    detailsSinistres: '',
    assureurPrecedent: '',
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
    case 'SET_GARANTIE':
      const garanties = action.checked
        ? [...state.formData.garanties, action.garantie]
        : state.formData.garanties.filter(g => g !== action.garantie);
      return {
        ...state,
        formData: { ...state.formData, garanties }
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

const MRHForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const typeBienOptions = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'riad', label: 'Riad' },
    { value: 'autre', label: 'Autre' },
  ];

  const statutOptions = [
    { value: 'proprietaire', label: 'Propriétaire' },
    { value: 'locataire', label: 'Locataire' },
  ];

  const villesMaroc = [
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'fes', label: 'Fès' },
    { value: 'tanger', label: 'Tanger' },
    { value: 'agadir', label: 'Agadir' },
  ];

  const franchiseOptions = [
    { value: '500', label: '500 DHS' },
    { value: '1000', label: '1 000 DHS' },
    { value: '2000', label: '2 000 DHS' },
    { value: '5000', label: '5 000 DHS' },
  ];

  const civiliteOptions = [
    { value: 'M', label: 'M.' },
    { value: 'Mme', label: 'Mme' },
    { value: 'Mlle', label: 'Mlle' },
  ];

  const garantiesObligatoires = [
    'incendie',
    'degats-eaux',
    'responsabilite-civile'
  ];

  const garantiesDisponibles = [
    { id: 'incendie', label: 'Incendie et explosion', obligatoire: true },
    { id: 'degats-eaux', label: 'Dégâts des eaux', obligatoire: true },
    { id: 'vol', label: 'Vol et vandalisme', obligatoire: false },
    { id: 'bris-glace', label: 'Bris de glace', obligatoire: false },
    { id: 'responsabilite-civile', label: 'Responsabilité civile', obligatoire: true },
    { id: 'objets-valeur', label: 'Objets de valeur', obligatoire: false },
    { id: 'catastrophes', label: 'Catastrophes naturelles', obligatoire: false },
  ];

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    dispatch({ type: 'SET_FIELD', field: name, value: fieldValue });
    
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const handleGarantieChange = (garantieId: string, checked: boolean) => {
    dispatch({ type: 'SET_GARANTIE', garantie: garantieId, checked });
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!state.formData.typeBien) errors.typeBien = 'Le type de logement est requis';
      if (!state.formData.statut) errors.statut = 'Le statut est requis';
      if (!state.formData.adresseBien) errors.adresseBien = 'L\'adresse du bien est requise';
      if (!state.formData.villeBien) errors.villeBien = 'La ville est requise';
      if (!state.formData.surface) errors.surface = 'La surface est requise';
      if (!state.formData.nombrePieces) errors.nombrePieces = 'Le nombre de pièces est requis';
      if (!state.formData.valeurBien) errors.valeurBien = 'La valeur du bien est requise';
    }
    
    if (step === 2) {
      const garantiesManquantes = garantiesObligatoires.filter(g => !state.formData.garanties.includes(g));
      if (garantiesManquantes.length > 0) {
        errors.garanties = 'Certaines garanties obligatoires ne sont pas sélectionnées';
      }
    }
    
    if (step === 3) {
      if (!state.formData.civilite) errors.civilite = 'La civilité est requise';
      if (!state.formData.prenom) errors.prenom = 'Le prénom est requis';
      if (!state.formData.nom) errors.nom = 'Le nom est requis';
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
      alert('Votre devis MRH a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.');
      console.log('Données du formulaire MRH:', state.formData);
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations du bien</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Type de logement"
                name="typeBien"
                type="select"
                value={state.formData.typeBien}
                onChange={handleFieldChange}
                options={typeBienOptions}
                error={state.errors.typeBien}
                required
              />
              <FormField
                label="Statut"
                name="statut"
                type="select"
                value={state.formData.statut}
                onChange={handleFieldChange}
                options={statutOptions}
                error={state.errors.statut}
                required
              />
            </div>

            <FormField
              label="Adresse du bien"
              name="adresseBien"
              type="textarea"
              value={state.formData.adresseBien}
              onChange={handleFieldChange}
              error={state.errors.adresseBien}
              required
              placeholder="Adresse complète du bien à assurer"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Ville"
                name="villeBien"
                type="select"
                value={state.formData.villeBien}
                onChange={handleFieldChange}
                options={villesMaroc}
                error={state.errors.villeBien}
                required
              />
              <FormField
                label="Surface habitable (m²)"
                name="surface"
                type="number"
                value={state.formData.surface}
                onChange={handleFieldChange}
                error={state.errors.surface}
                required
                placeholder="120"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Nombre de pièces"
                name="nombrePieces"
                type="number"
                value={state.formData.nombrePieces}
                onChange={handleFieldChange}
                error={state.errors.nombrePieces}
                required
                placeholder="4"
              />
              <FormField
                label="Année de construction"
                name="anneeConstruction"
                type="number"
                value={state.formData.anneeConstruction}
                onChange={handleFieldChange}
                placeholder="2010"
                min={1900}
                max={2024}
              />
              <FormField
                label="Étage (si appartement)"
                name="etage"
                type="number"
                value={state.formData.etage}
                onChange={handleFieldChange}
                placeholder="2"
              />
            </div>

            <FormField
              label="Valeur du bien immobilier (DHS)"
              name="valeurBien"
              type="number"
              value={state.formData.valeurBien}
              onChange={handleFieldChange}
              error={state.errors.valeurBien}
              required
              placeholder="800000"
            />
          </div>
        );

      case 2:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Couverture souhaitée</h2>
            
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Garanties {state.errors.garanties && <span className="text-red-500">({state.errors.garanties})</span>}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {garantiesDisponibles.map((garantie) => (
                  <div key={garantie.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      id={garantie.id}
                      checked={state.formData.garanties.includes(garantie.id)}
                      onChange={(e) => handleGarantieChange(garantie.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor={garantie.id} className="flex-1 cursor-pointer">
                      {garantie.label}
                      {garantie.obligatoire && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Montant franchise souhaité"
                name="franchise"
                type="select"
                value={state.formData.franchise}
                onChange={handleFieldChange}
                options={franchiseOptions}
                placeholder="Choisir une franchise"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">Options complémentaires</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="protectionJuridique"
                    name="protectionJuridique"
                    checked={state.formData.protectionJuridique}
                    onChange={handleFieldChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="protectionJuridique" className="cursor-pointer">
                    Protection juridique
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="assistance24h"
                    name="assistance24h"
                    checked={state.formData.assistance24h}
                    onChange={handleFieldChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="assistance24h" className="cursor-pointer">
                    Assistance 24h/24
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos informations</h2>
            
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

            <div className="space-y-4">
              <FormField
                label="Sinistres antérieurs (5 dernières années)"
                name="sinistresAnterieurs"
                type="select"
                value={state.formData.sinistresAnterieurs}
                onChange={handleFieldChange}
                options={[
                  { value: 'non', label: 'Non' },
                  { value: 'oui', label: 'Oui' },
                ]}
                placeholder="Avez-vous eu des sinistres ?"
              />

              {state.formData.sinistresAnterieurs === 'oui' && (
                <FormField
                  label="Détails des sinistres"
                  name="detailsSinistres"
                  type="textarea"
                  value={state.formData.detailsSinistres}
                  onChange={handleFieldChange}
                  placeholder="Décrivez les sinistres survenus"
                  rows={3}
                />
              )}

              <FormField
                label="Assureur précédent"
                name="assureurPrecedent"
                value={state.formData.assureurPrecedent}
                onChange={handleFieldChange}
                placeholder="Nom de votre précédent assureur (optionnel)"
              />
            </div>

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
      title="Devis Multirisque Habitation" 
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

export default MRHForm;
