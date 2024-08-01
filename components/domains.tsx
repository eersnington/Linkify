'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getDomains,
  buyDomain,
  getConfigResponse,
  verifyDomain,
} from '@/actions/dynabot-api';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Confetti from 'react-confetti';
import { ArrowRight, CheckCircle, Loader, XCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table';
import { Badge } from './ui/badge';
import { set } from 'date-fns';

interface DomainSearchResponse {
  name: string;
  available: boolean;
  price?: string;
}

interface DomainVerificationResponse {
  verified: boolean;
}

interface DomainConfigResponse {
  misconfigured: boolean;
}

export function DomainSearchAndPurchase() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [domains, setDomains] = useState<DomainSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [buying, setBuying] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(false);
    try {
      const { data, error } = await getDomains(keyword);
      if (error) {
        toast({
          title: 'Domain Search Error',
          description: error,
          variant: 'destructive',
        });
      } else if (data) {
        setDomains(data);
        setSearched(true);
      }
    } catch (error) {
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

  const handleBuy = (domain: string) => {
    setSelectedDomain(domain);
  };

  const confirmPurchase = async () => {
    if (!selectedDomain) return;

    setBuying(selectedDomain);
    try {
      const { success, error } = await buyDomain(selectedDomain);
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
          description: `${success}`,
          className: 'bg-green-500 text-white',
        });
        setTimeout(() => setShowConfetti(false), 7000);
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
      setSelectedDomain(null);
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <Dialog
        open={!!selectedDomain}
        onOpenChange={(open) => !open && setSelectedDomain(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Domain Selection</DialogTitle>
            <DialogDescription>
              You are about to purchase the domain{' '}
              <strong>{selectedDomain}</strong>.
            </DialogDescription>
            <DialogDescription>
              Please note: Once you select a domain, you&apos;re no longer
              eligible for a free domain for 1 year. Refunds are not available
              for domain purchases.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDomain(null)}>
              Cancel
            </Button>
            <Button
              onClick={confirmPurchase}
              disabled={buying === selectedDomain}
              className="bg-green-500 text-white"
            >
              {buying === selectedDomain
                ? 'Purchasing...'
                : 'Confirm Selection'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Search for a Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter domain name..."
              className="flex-grow"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient_indigo-purple"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {searched && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {domains.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domains.map((domain) => (
                      <TableRow key={domain.name}>
                        <TableCell>{domain.name}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              domain.available ? 'bg-green-500' : 'bg-red-500'
                            }
                          >
                            {domain.available ? 'Available' : 'Taken'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {domain.available ? (
                            <Button
                              onClick={() => handleBuy(domain.name)}
                              size="sm"
                              className="bg-purple-500 text-white"
                            >
                              Select
                            </Button>
                          ) : (
                            <Badge className="bg-purple-950">Unavailable</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground">
                  No domains available for{' '}
                  <span className="font-semibold">{keyword}</span>
                </p>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export function DomainConfigStatus({ domain }: { domain: string }) {
  const [isVercelConfigured, setIsVercelConfigured] = useState(false);
  const [isDNSConfigured, setIsDNSConfigured] = useState(false);
  const [loadingVercel, setLoadingVercel] = useState(false);
  const [loadingDNS, setLoadingDNS] = useState(false);

  const handleVerifyDomain = async () => {
    setLoadingDNS(true);
    const response = await verifyDomain(domain);
    setIsDNSConfigured(response.verified);
    setLoadingDNS(false);
  };

  const handleGetConfigResponse = async () => {
    setLoadingVercel(true);
    const response = await getConfigResponse(domain);
    setIsVercelConfigured(!response.misconfigured);
    setLoadingVercel(false);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Your Domain: <Badge>{domain}</Badge>
          </CardTitle>
          <CardDescription>Configuration status for domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {isVercelConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span>Vercel Configuration</span>
              <Button
                onClick={handleGetConfigResponse}
                disabled={loadingVercel}
              >
                {loadingVercel ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {isDNSConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span>DNS Configuration</span>
              <Button onClick={handleVerifyDomain} disabled={loadingDNS}>
                {loadingDNS ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
          </div>
          <CardFooter className="mt-4 border-2 rounded-lg p-2 items-center text-center">
            {isVercelConfigured && isDNSConfigured ? (
              <p className="text-muted-foreground text-sm">
                Good news! Your DNS records are set up correctly, but it can
                take some time for them to propagate globally.
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Depending on your provider, it might take some time for the DNS
                records to apply. It may take from 5 mins to 24 hours.
              </p>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
