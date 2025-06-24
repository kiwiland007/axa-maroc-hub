import React, { useState, useReducer } from 'react';
import FormLayout from './FormLayout';
import FormField from './FormField';
import FormNavigation from './FormNavigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

interface FormState {
  currentStep: number;
  formData: {
    // Étape 1 - Informations personnelles
    civilite: string;
    prenom: string;
    nom: string;
    dateNaissance: string;
    lieuNaissance: string;
    nationalite: string;
    profession: string;
    telephone: string;
    email: string;
    adresse: string;
    ville: string;
    codePostal: string;
    // Étape 2 - Type d'assurance et véhicule
    typeAssurance: string;
    marqueVehicule: string;
    modeleVehicule: string;
    anneeVehicule: string;
    puissanceFiscale: string;
    numeroImmatriculation: string;
    valeurVehicule: string;
    usageVehicule: string;
    // Étape 3 - Historique conducteur
    permisConduire: string;
    dateObtentionPermis: string;
    assurancePrecedente: string;
    // Étape 4 - Documents et confirmation
    documentsUploaded: File[];
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
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'ADD_DOCUMENT'; file: File }
  | { type: 'REMOVE_DOCUMENT'; index: number };

const initialState: FormState = {
  currentStep: 1,
  formData: {
    civilite: '',
    prenom: '',
    nom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: 'Marocaine',
    profession: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    typeAssurance: '',
    marqueVehicule: '',
    modeleVehicule: '',
    anneeVehicule: '',
    puissanceFiscale: '',
    numeroImmatriculation: '',
    valeurVehicule: '',
    usageVehicule: '',
    permisConduire: '',
    dateObtentionPermis: '',
    assurancePrecedente: '',
    documentsUploaded: [],
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
    case 'ADD_DOCUMENT':
      return {
        ...state,
        formData: {
          ...state.formData,
          documentsUploaded: [...state.formData.documentsUploaded, action.file]
        }
      };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        formData: {
          ...state.formData,
          documentsUploaded: state.formData.documentsUploaded.filter((_, index) => index !== action.index)
        }
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
        currentStep: Math.min(state.currentStep + 1, 4)
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

const AffaireNouvelleComplete: React.FC = () => {
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
    { value: 'sale', label: 'Salé' },
    { value: 'temara', label: 'Témara' },
    { value: 'mohammedia', label: 'Mohammedia' },
    { value: 'el-jadida', label: 'El Jadida' },
    { value: 'beni-mellal', label: 'Béni Mellal' },
    { value: 'nador', label: 'Nador' },
    { value: 'khouribga', label: 'Khouribga' },
    { value: 'settat', label: 'Settat' },
    { value: 'larache', label: 'Larache' },
    { value: 'ksar-el-kebir', label: 'Ksar El Kébir' },
    { value: 'berrechid', label: 'Berrechid' },
    { value: 'khemisset', label: 'Khémisset' },
    { value: 'guelmim', label: 'Guelmim' },
    { value: 'errachidia', label: 'Errachidia' },
    { value: 'taza', label: 'Taza' },
    { value: 'essaouira', label: 'Essaouira' },
    { value: 'laayoune', label: 'Laâyoune' },
    { value: 'tiznit', label: 'Tiznit' },
    { value: 'dakhla', label: 'Dakhla' },
    { value: 'ouarzazate', label: 'Ouarzazate' },
  ];

  const marques = [
    { value: 'renault', label: 'Renault' },
    { value: 'peugeot', label: 'Peugeot' },
    { value: 'citroen', label: 'Citroën' },
    { value: 'dacia', label: 'Dacia' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'ford', label: 'Ford' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'kia', label: 'KIA' },
    { value: 'autre', label: 'Autre' },
  ];

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    dispatch({ type: 'SET_FIELD', field: name, value: fieldValue });
    
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error('Le fichier ne doit pas dépasser 5MB');
          return;
        }
        dispatch({ type: 'ADD_DOCUMENT', file });
      });
    }
  };

  const removeDocument = (index: number) => {
    dispatch({ type: 'REMOVE_DOCUMENT', index });
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
      
      if (state.formData.email && !/\S+@\S+\.\S+/.test(state.formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
    }
    
    if (step === 2) {
      if (!state.formData.typeAssurance) errors.typeAssurance = 'Le type d\'assurance est requis';
      if (!state.formData.marqueVehicule) errors.marqueVehicule = 'La marque du véhicule est requise';
      if (!state.formData.anneeVehicule) errors.anneeVicule = 'L\'année du véhicule est requise';
    }
    
    if (step === 3) {
      if (!state.formData.permisConduire) errors.permisConduire = 'Le numéro de permis est requis';
      if (!state.formData.dateObtentionPermis) errors.dateObtentionPermis = 'La date d\'obtention du permis est requise';
    }
    
    if (step === 4) {
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
    if (!validateStep(4)) return;
    
    dispatch({ type: 'SET_LOADING', loading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Votre demande d\'affaire nouvelle a été envoyée avec succès !');
      console.log('Données du formulaire:', state.formData);
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
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
                options={[
                  { value: 'M', label: 'M.' },
                  { value: 'Mme', label: 'Mme' },
                  { value: 'Mlle', label: 'Mlle' },
                ]}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                label="Lieu de naissance"
                name="lieuNaissance"
                value={state.formData.lieuNaissance}
                onChange={handleFieldChange}
                placeholder="Ville de naissance"
              />
              <FormField
                label="Nationalité"
                name="nationalite"
                type="select"
                value={state.formData.nationalite}
                onChange={handleFieldChange}
                options={[
                  { value: 'Marocaine', label: 'Marocaine' },
                  { value: 'Française', label: 'Française' },
                  { value: 'Autre', label: 'Autre' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Profession"
                name="profession"
                value={state.formData.profession}
                onChange={handleFieldChange}
                placeholder="Votre profession"
              />
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
            </div>

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

            <FormField
              label="Adresse complète"
              name="adresse"
              type="textarea"
              value={state.formData.adresse}
              onChange={handleFieldChange}
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
              />
              <FormField
                label="Code postal"
                name="codePostal"
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations véhicule</h2>
            
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Type d'assurance souhaité *
              </Label>
              <RadioGroup 
                value={state.formData.typeAssurance} 
                onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'typeAssurance', value })}
                className="space-y-3"
              >
                {[
                  { value: 'responsabilite-civile', label: 'Responsabilité Civile' },
                  { value: 'tous-risques', label: 'Tous Risques' },
                  { value: 'vol-incendie', label: 'Vol + Incendie' },
                  { value: 'tiers-collision', label: 'Tiers Collision' },
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Marque du véhicule"
                name="marqueVehicule"
                type="select"
                value={state.formData.marqueVehicule}
                onChange={handleFieldChange}
                options={marques}
                error={state.errors.marqueVehicule}
                required
              />
              <FormField
                label="Modèle"
                name="modeleVehicule"
                value={state.formData.modeleVehicule}
                onChange={handleFieldChange}
                placeholder="Ex: Clio, 206..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Année"
                name="anneeVehicule"
                type="number"
                value={state.formData.anneeVehicule}
                onChange={handleFieldChange}
                error={state.errors.anneeVehicule}
                required
                min={1980}
                max={2024}
                placeholder="2020"
              />
              <FormField
                label="Puissance fiscale (CV)"
                name="puissanceFiscale"
                type="number"
                value={state.formData.puissanceFiscale}
                onChange={handleFieldChange}
                placeholder="6"
              />
              <FormField
                label="Valeur du véhicule (DHS)"
                name="valeurVehicule"
                type="number"
                value={state.formData.valeurVehicule}
                onChange={handleFieldChange}
                placeholder="150000"
              />
            </div>

            <FormField
              label="Numéro d'immatriculation"
              name="numeroImmatriculation"
              value={state.formData.numeroImmatriculation}
              onChange={handleFieldChange}
              placeholder="12345-أ-12"
            />

            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">Usage du véhicule</Label>
              <RadioGroup 
                value={state.formData.usageVehicule} 
                onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'usageVehicule', value })}
                className="space-y-3"
              >
                {[
                  { value: 'prive', label: 'Usage privé' },
                  { value: 'professionnel', label: 'Usage professionnel' },
                  { value: 'mixte', label: 'Usage mixte' },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique de conduite</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Numéro de permis de conduire"
                name="permisConduire"
                value={state.formData.permisConduire}
                onChange={handleFieldChange}
                error={state.errors.permisConduire}
                required
                placeholder="Numéro de permis"
              />
              <FormField
                label="Date d'obtention du permis"
                name="dateObtentionPermis"
                type="date"
                value={state.formData.dateObtentionPermis}
                onChange={handleFieldChange}
                error={state.errors.dateObtentionPermis}
                required
              />
            </div>

            <FormField
              label="Assurance précédente"
              name="assurancePrecedente"
              value={state.formData.assurancePrecedente}
              onChange={handleFieldChange}
              placeholder="Nom de votre ancienne compagnie d'assurance"
            />
          </div>
        );

      case 4:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents et confirmation</h2>
            
            {/* Upload de documents */}
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-700">
                Documents nécessaires
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Glissez-déposez vos documents ou cliquez pour sélectionner</p>
                <p className="text-sm text-gray-500 mb-4">
                  Documents requis: CIN, Permis de conduire, Carte grise, Relevé d'information
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Sélectionner des fichiers
                </Button>
              </div>
              
              {/* Liste des documents uploadés */}
              {state.formData.documentsUploaded.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Documents uploadés:</Label>
                  {state.formData.documentsUploaded.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Récapitulatif de votre demande</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nom:</span> {state.formData.civilite} {state.formData.prenom} {state.formData.nom}</p>
                <p><span className="font-medium">Email:</span> {state.formData.email}</p>
                <p><span className="font-medium">Téléphone:</span> {state.formData.telephone}</p>
                <p><span className="font-medium">Véhicule:</span> {state.formData.marqueVehicule} {state.formData.modeleVehicule} ({state.formData.anneeVehicule})</p>
                <p><span className="font-medium">Type d'assurance:</span> {state.formData.typeAssurance}</p>
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
                  J'accepte de recevoir des communications de Moumen Technique et Prévoyance
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
      title="Nouvelle Affaire - Assurance Auto" 
      currentStep={state.currentStep} 
      totalSteps={4}
    >
      {renderStep()}
      <FormNavigation
        currentStep={state.currentStep}
        totalSteps={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isLoading={state.isLoading}
        canProceed={true}
      />
    </FormLayout>
  );
};

export default AffaireNouvelleComplete;
