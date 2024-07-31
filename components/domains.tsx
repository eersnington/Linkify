'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getDomains, buyDomain } from '@/actions/dynabot-api';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

interface Domain {
  name: string;
  available: boolean;
  price?: string;
}

export default function DomainAvailability() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [buying, setBuying] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(false); // Reset the searched state before making a new search
    try {
      const { data, error } = await getDomains(keyword);
      if (error) {
        // Show error using Toast component
        toast({
          title: 'Domain Search Error',
          description: error,
          variant: 'destructive',
        });
      } else if (data) {
        setDomains(data);
        setSearched(true); // Set searched to true after receiving the data
      }
    } catch (error) {
      // Handle unexpected errors gracefully
      console.error('Unexpected error:', error);
      toast({
        title: 'Domain Search Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (domain: string) => {
    setBuying(domain);
    try {
      const { success, error } = await buyDomain(domain);
      if (error) {
        toast({
          title: 'Domain Purchase Error',
          description: error,
          variant: 'destructive',
        });
      } else if (success) {
        setShowConfetti(true);
        toast({
          title: 'Domain Purchased 🚀',
          description: `Domain ${domain} registered successfully.`,
          className: 'bg-green-500',
        });
        setTimeout(() => setShowConfetti(false), 7000); // Hide confetti after 7 seconds

        // Optionally, you can update the domain list or state here
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Domain Purchase Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBuying(null);
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <motion.div
        className="domain-availability mt-8 p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.div className="flex-grow">
            <Input
              id="domain-search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter domain name..."
              className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm md:text-base text-purple-950 transition-colors duration-300 placeholder:text-purple-400 focus:border-purple-500 focus-visible:ring-0"
            />
          </motion.div>
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-1/5 px-4 py-2 bg-gradient-to-tr  from-indigo-500 to-purple-500 text-white rounded-lg shadow-md ease-linear transition-colors duration-300  hover:from-indigo-600 hover:to-purple-600"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {searched &&
          (domains.length > 0 ? (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-gray-800">
                Available Domains:
              </h3>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {domains.map((domain) => (
                  <motion.li
                    key={domain.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-gray-700">{domain.name}</span>
                    <div className="flex items-center">
                      {domain.available ? (
                        <>
                          <span className="ml-2 text-green-600 font-semibold">
                            Available
                          </span>
                          <Button
                            onClick={() => handleBuy(domain.name)}
                            disabled={buying === domain.name}
                            className="ml-4 px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
                          >
                            {buying === domain.name ? 'Setting...' : 'Select'}
                          </Button>
                        </>
                      ) : (
                        <span className="ml-2 text-red-600 font-semibold">
                          Taken
                        </span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-gray-800">
                No domains available for{' '}
                <span className="text-red-600">{keyword}</span>
              </h3>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
}
