import { AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



export default function WhyDangerous() {
  return (
    <section id="why-dangerous" className="bg-gradient-to-r from-black via-gray-900 to-gray-800 py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">Why are DeepFakes Dangerous?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <AlertTriangle className="h-6 w-6 text-destructive mr-2" />
                Misinformation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Deepfakes can be used to create and spread false information, potentially influencing public opinion and undermining trust in media.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Shield className="h-6 w-6 text-destructive mr-2" />
                Privacy Concerns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Deepfake technology can be misused to violate personal privacy by creating fake compromising images or videos of individuals.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <AlertTriangle className="h-6 w-6 text-destructive mr-2" />
                Financial Fraud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Criminals can use deepfakes to impersonate others in video calls or create fake audio for financial scams and fraud.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
