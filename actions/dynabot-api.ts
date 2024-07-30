'use server';

import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { redirect } from 'next/navigation';

interface Domain {
  name: string;
  available: boolean;
  price?: string;
}

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

      return {
        name: result.DomainName,
        available: result.Available === 'yes',
        price: result.Price,
      };
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

  const tlds = ['com', 'net', 'me', 'co.uk'];
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

    return {
      data: availableDomains,
    };
  } catch (error) {
    console.error('Error fetching domains:', error);
    return { error: 'Error fetching domains' };
  }
}
