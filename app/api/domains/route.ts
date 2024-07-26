import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

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
    console.log(
      `API Response for ${domain}:`,
      JSON.stringify(response.data, null, 2)
    );

    if (
      response.data?.SearchResponse?.ResponseCode === '0' &&
      response.data.SearchResponse.SearchResults?.length > 0
    ) {
      const result = response.data.SearchResponse.SearchResults[0];
      return {
        name: result.DomainName,
        available: result.Available.toLowerCase() === 'yes',
        price: result.Price,
      };
    }
  } catch (error) {
    console.error(`Error searching for ${domain}:`, error);
  }
  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
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
      return NextResponse.json(
        { error: 'No domain data found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ availableDomains });
  } catch (error) {
    console.error('Error fetching domain availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch domain availability' },
      { status: 500 }
    );
  }
}
