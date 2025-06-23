
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

const FormLayout = ({ 
  title, 
  description, 
  children, 
  showBackButton = true,
  currentStep,
  totalSteps
}: FormLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="container mx-auto px-4">
        {showBackButton && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {title}
              </CardTitle>
              {description && (
                <p className="text-gray-600 mt-2">
                  {description}
                </p>
              )}
              {currentStep && totalSteps && (
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Étape {currentStep} sur {totalSteps}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-8">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
