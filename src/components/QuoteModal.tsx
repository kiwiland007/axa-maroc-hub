
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Car, Home, Heart, Shield, PiggyBank, Briefcase, Upload, X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType?: string;
}

const QuoteModal = ({ isOpen, onClose, productType }: QuoteModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    civilite: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    // Informations produit
    typeAssurance: productType || '',
    // Auto spécifique
    marqueVehicule: '',
    modeleVehicule: '',
    anneeVehicule: '',
    puissanceFiscale: '',
    valeurVehicule: '',
    // Habitation spécifique
    typeLogement: '',
    surfaceLogement: '',
    valeurMobilier: '',
    // Santé spécifique
    nombreBeneficiaires: '',
    agesBeneficiaires: '',
    // Documents
    documents: [] as File[]
  });

  const productIcons = {
    'auto': Car,
    'habitation': Home,
    'sante': Heart,
    'prevoyance': Shield,
    'epargne': PiggyBank,
    'professionnelle': Briefcase
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...newFiles] 
      }));
      toast.success(`${newFiles.length} document(s) ajouté(s)`);
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    toast.success('Demande de devis envoyée avec succès!');
    onClose();
    setStep(1);
    setFormData({
      civilite: '',
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      dateNaissance: '',
      typeAssurance: productType || '',
      marqueVehicule: '',
      modeleVehicule: '',
      anneeVehicule: '',
      puissanceFiscale: '',
      valeurVehicule: '',
      typeLogement: '',
      surfaceLogement: '',
      valeurMobilier: '',
      nombreBeneficiaires: '',
      agesBeneficiaires: '',
      documents: []
    });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Civilité *</Label>
          <Select onValueChange={(value) => handleInputChange('civilite', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M.">M.</SelectItem>
              <SelectItem value="Mme">Mme</SelectItem>
              <SelectItem value="Mlle">Mlle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Type d'assurance *</Label>
          <Select 
            value={formData.typeAssurance}
            onValueChange={(value) => handleInputChange('typeAssurance', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un produit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Assurance Auto</SelectItem>
              <SelectItem value="habitation">Assurance Habitation</SelectItem>
              <SelectItem value="sante">Assurance Santé</SelectItem>
              <SelectItem value="prevoyance">Prévoyance</SelectItem>
              <SelectItem value="epargne">Épargne & Retraite</SelectItem>
              <SelectItem value="professionnelle">Assurance Professionnelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Prénom *</Label>
          <Input 
            value={formData.prenom}
            onChange={(e) => handleInputChange('prenom', e.target.value)}
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <Label>Nom *</Label>
          <Input 
            value={formData.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            placeholder="Votre nom"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Email *</Label>
          <Input 
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <Label>Téléphone *</Label>
          <Input 
            value={formData.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            placeholder="+212 6XX-XXX-XXX"
          />
        </div>
      </div>

      <div>
        <Label>Date de naissance</Label>
        <Input 
          type="date"
          value={formData.dateNaissance}
          onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => {
    switch (formData.typeAssurance) {
      case 'auto':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Informations du véhicule
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Marque *</Label>
                <Input 
                  value={formData.marqueVehicule}
                  onChange={(e) => handleInputChange('marqueVehicule', e.target.value)}
                  placeholder="Ex: Renault, Peugeot..."
                />
              </div>
              <div>
                <Label>Modèle *</Label>
                <Input 
                  value={formData.modeleVehicule}
                  onChange={(e) => handleInputChange('modeleVehicule', e.target.value)}
                  placeholder="Ex: Clio, 208..."
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Année *</Label>
                <Input 
                  value={formData.anneeVehicule}
                  onChange={(e) => handleInputChange('anneeVehicule', e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label>Puissance fiscale</Label>
                <Input 
                  value={formData.puissanceFiscale}
                  onChange={(e) => handleInputChange('puissanceFiscale', e.target.value)}
                  placeholder="CV"
                />
              </div>
              <div>
                <Label>Valeur du véhicule</Label>
                <Input 
                  value={formData.valeurVehicule}
                  onChange={(e) => handleInputChange('valeurVehicule', e.target.value)}
                  placeholder="DHS"
                />
              </div>
            </div>
          </div>
        );

      case 'habitation':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Informations du logement
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type de logement *</Label>
                <Select onValueChange={(value) => handleInputChange('typeLogement', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Surface (m²) *</Label>
                <Input 
                  value={formData.surfaceLogement}
                  onChange={(e) => handleInputChange('surfaceLogement', e.target.value)}
                  placeholder="120"
                />
              </div>
            </div>
            <div>
              <Label>Valeur du mobilier estimée</Label>
              <Input 
                value={formData.valeurMobilier}
                onChange={(e) => handleInputChange('valeurMobilier', e.target.value)}
                placeholder="DHS"
              />
            </div>
          </div>
        );

      case 'sante':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Informations santé
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nombre de bénéficiaires *</Label>
                <Input 
                  value={formData.nombreBeneficiaires}
                  onChange={(e) => handleInputChange('nombreBeneficiaires', e.target.value)}
                  placeholder="1, 2, 3..."
                />
              </div>
              <div>
                <Label>Âges des bénéficiaires</Label>
                <Input 
                  value={formData.agesBeneficiaires}
                  onChange={(e) => handleInputChange('agesBeneficiaires', e.target.value)}
                  placeholder="30, 28, 5..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations complémentaires</h3>
            <Textarea 
              placeholder="Décrivez vos besoins spécifiques..."
              rows={4}
            />
          </div>
        );
    }
  };

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Upload className="h-5 w-5 mr-2" />
        Documents à joindre
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label 
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Cliquez pour ajouter des documents
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF, JPG, PNG (max 5MB par fichier)
          </p>
        </label>
      </div>

      {formData.documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Documents ajoutés:</h4>
          {formData.documents.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Documents recommandés:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          {formData.typeAssurance === 'auto' && (
            <>
              <li>• Carte grise du véhicule</li>
              <li>• Permis de conduire</li>
              <li>• Relevé d'information</li>
            </>
          )}
          {formData.typeAssurance === 'habitation' && (
            <>
              <li>• Titre de propriété ou contrat de bail</li>
              <li>• Factures d'achat des biens à assurer</li>
            </>
          )}
          <li>• Pièce d'identité</li>
          <li>• Justificatif de domicile</li>
        </ul>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {formData.typeAssurance && productIcons[formData.typeAssurance as keyof typeof productIcons] && 
              React.createElement(productIcons[formData.typeAssurance as keyof typeof productIcons], { className: "h-5 w-5" })}
            <span>Demande de Devis - Étape {step}/3</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Form content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            >
              {step > 1 ? 'Précédent' : 'Annuler'}
            </Button>

            <Button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="bg-red-500 hover:bg-red-600"
              disabled={step === 1 && (!formData.nom || !formData.prenom || !formData.email || !formData.telephone)}
            >
              {step < 3 ? 'Suivant' : 'Envoyer la demande'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
