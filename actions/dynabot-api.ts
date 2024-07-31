'use server';

import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { redirect } from 'next/navigation';

interface Domain {
  name: string;
  available: boolean;
  price?: string;
}

const tlds = ['com', 'me', 'co.uk', 'dev', 'pro', 'buzz'];

async function searchDomain(domain: string): Promise<Domain | null> {
  const params = new URLSearchParams({
    key: process.env.DYNADOT_API_KEY || '',
    command: 'search',
    show_price: '1',
    currency: 'USD',
    domain0: domain,
  });

  try {
    const response = await axios.get('https://api.dynadot.com/api3.json', {
      params,
    });

    if (
      response.data?.SearchResponse?.ResponseCode === '0' &&
      response.data.SearchResponse.SearchResults?.length > 0
    ) {
      const result = response.data.SearchResponse.SearchResults[0];

      const finalResponse = {
        name: result.DomainName,
        available: result.Available === 'yes',
        price: result.Price,
      };

      return finalResponse;
    }
  } catch (error) {
    console.error(`Error searching for ${domain}:`, error);
  }
  return null;
}

export async function getDomains(keyword: string) {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  if (!keyword) {
    return { error: 'Please enter a keyword' };
  }

  keyword = keyword.trim().toLowerCase();

  const isValidKeyword = (keyword: string) => {
    const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return regex.test(keyword);
  };

  if (!isValidKeyword(keyword)) {
    return { error: 'Invalid keyword for a domain' };
  }

  const domains = tlds.map((tld) => `${keyword}.${tld}`);

  try {
    const availableDomains: Domain[] = [];

    for (const domain of domains) {
      const result = await searchDomain(domain);
      if (result) {
        availableDomains.push(result);
      }
    }

    if (availableDomains.length === 0) {
      return { error: 'No domains available' };
    }

    console.log(availableDomains);

    return {
      data: availableDomains,
    };
  } catch (error) {
    console.error('Error fetching domains:', error);
    return { error: 'Error fetching domains' };
  }
}

async function registerDomain(domain: string): Promise<boolean> {
  const params = new URLSearchParams({
    key: process.env.DYNADOT_API_KEY || '',
    command: 'register',
    domain: domain,
    duration: '1',
    currency: 'USD',
  });

  console.log(params);

  try {
    const response = await axios.get('https://api.dynadot.com/api3.json', {
      params,
    });

    console.log(response.data);

    if (response.data?.RegisterResponse?.ResponseCode === '0') {
      return true;
    }
  } catch (error) {
    console.error(`Error registering domain ${domain}:`, error);
  }
  return false;
}

async function setDomainPrivacy(domain: string): Promise<boolean> {
  const params = new URLSearchParams({
    key: process.env.DYNADOT_API_KEY || '',
    command: 'set_privacy',
    domain: domain,
    option: 'on',
  });

  try {
    const response = await axios.get('https://api.dynadot.com/api3.json', {
      params,
    });

    console.log(response.data);

    if (response.data?.SetPrivacyResponse?.ResponseCode === '0') {
      return true;
    }
  } catch (error) {
    console.error(`Error setting privacy for domain ${domain}:`, error);
  }
  return false;
}

export async function buyDomain(domain: string) {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  if (!domain) {
    return { error: 'Please enter a domain name' };
  }

  domain = domain.trim().toLowerCase();

  const isValidDomain = (domain: string) => {
    const tldPattern = tlds.map((tld) => tld.replace('.', '\\.')).join('|');
    const regex = new RegExp(`^[a-z0-9]+(-[a-z0-9]+)*\\.(${tldPattern})$`);
    return regex.test(domain);
  };

  if (!isValidDomain(domain)) {
    return { error: 'Invalid domain name or unsupported TLD' };
  }

  try {
    return {
      // to disable buying domain
      error: 'Buying domain is disabled for now',
    };

    const isRegistered = await registerDomain(domain);
    if (!isRegistered) {
      return { error: 'Failed to register domain' };
    }

    await setTimeout(() => {}, 1000); // Wait for a second before setting privacy

    return {
      success: `Domain ${domain} registered and privacy set successfully`,
    };
  } catch (error) {
    console.error('Error buying domain:', error);
    return { error: 'Error buying domain' };
  }
}
