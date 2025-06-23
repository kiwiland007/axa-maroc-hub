
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCw, Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordGeneratorProps {
  onPasswordGenerated?: (password: string) => void;
}

const PasswordGenerator = ({ onPasswordGenerated }: PasswordGeneratorProps) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset === '') {
      toast.error('Veuillez sélectionner au moins un type de caractère');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    if (onPasswordGenerated) {
      onPasswordGenerated(newPassword);
    }
    toast.success('Mot de passe généré avec succès !');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success('Mot de passe copié dans le presse-papiers !');
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) return { text: 'Faible', color: 'text-red-500', bg: 'bg-red-100' };
    if (score < 5) return { text: 'Moyen', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { text: 'Fort', color: 'text-green-500', bg: 'bg-green-100' };
  };

  const strength = password ? getPasswordStrength() : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5" />
          <span>Générateur de Mot de Passe</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2">Longueur du mot de passe: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <Label htmlFor="uppercase">Majuscules (A-Z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">Minuscules (a-z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">Chiffres (0-9)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">Symboles (!@#$%^&*)</Label>
          </div>
        </div>

        <Button 
          onClick={generatePassword} 
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Générer un mot de passe
        </Button>

        {password && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2">Mot de passe généré</Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {strength && (
              <div className={`p-3 rounded-lg ${strength.bg}`}>
                <p className={`text-sm font-medium ${strength.color}`}>
                  Force du mot de passe: {strength.text}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
