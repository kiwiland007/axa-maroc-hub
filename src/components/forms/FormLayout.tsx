
import React from 'react';
import { Shield } from 'lucide-react';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title, currentStep, totalSteps }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/545e624c-1ef4-4d84-864b-14d270f5ae44.png" 
                alt="AXA Maroc" 
                className="h-12 w-auto"
              />
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Étape {currentStep} sur {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
        </div>

        {/* Form content */}
        <div className="bg-white rounded-lg shadow-lg">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500 text-center space-y-2">
          <p>
            Conformément à la loi 09-08, vos données à caractère personnel peuvent à tout moment faire l'objet d'un droit d'accès, 
            de modification, de rectification et d'opposition en s'adressant au : servicereclamations@axa.ma, ou par courrier à l'adresse suivante : 
            Service réclamations, AXA Assurance Maroc, 120-122 Avenue Hassan II, 20 000, Casablanca.
          </p>
          <p>
            Ce traitement a fait l'objet d'une déclaration auprès de la CNDP sous le numéro D-716/2021, en date du 16/11/2021.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
