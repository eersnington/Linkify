import { CTAForm } from '../forms/cta-email-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-purple-950 to-purple-900 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Your free corporate makeover is a click away
            </h2>
            <p className="text-xl lg:text-2xl text-purple-200 mb-8">
              Land better jobs, increase respect and grow professionally with
              Resumade.
            </p>
            <div className="flex items-center space-x-2 mb-8">
              {/* {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-purple-200 text-lg ml-2">
                Trusted by 10,000+ professionals
              </span> */}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <Card className="bg-white shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-900">
                  Get your professional website now
                </CardTitle>
                <CardDescription>
                  Start your journey to a better career today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CTAForm />
                <p className="text-sm text-gray-600 mt-4 text-center">
                  No credit card required. Set up in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
