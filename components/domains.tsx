'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getDomains } from '@/actions/dynabot-api';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from '@/components/ui/use-toast';

interface Domain {
  name: string;
  available: boolean;
  price?: string;
}

export default function DomainAvailability() {
  const [keyword, setKeyword] = useState('');
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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

  return (
    <motion.div
      className="domain-availability mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          whileHover={{ scale: 1.1 }}
        >
          <Input
            id="domain-search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="google"
            className="flex-grow"
          />
        </motion.div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      {searched &&
        (domains.length > 0 ? (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-lg font-bold">Available Domains:</h3>
            <ul className="list-disc pl-5 mt-2">
              {domains.map((domain) => (
                <motion.li
                  key={domain.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span>{domain.name}</span>
                  {domain.available ? (
                    <span className="ml-2 text-green-500 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="ml-2 text-red-500 font-semibold">
                      Taken
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-lg font-bold">
              No domains available for {keyword}
            </h3>
          </motion.div>
        ))}
    </motion.div>
  );
}
