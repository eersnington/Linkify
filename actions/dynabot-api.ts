'use server';

import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { revalidateTag } from 'next/cache';
import getConfig from 'next/config';
import { redirect } from 'next/navigation';

interface Domain {
  name: string;
  available: boolean;
  price?: string;
}

interface vercelDomainVerificationResponse {
  verified: boolean;
}

interface vercelDomainConfigResponse {
  misconfigured: boolean;
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

async function addDomainToVercel(domain: string): Promise<boolean> {
  try {
    const endpoint = `https://api.vercel.com/v10/projects/${
      process.env.VERCEL_PROJECT_ID
    }/domains${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ''
    }`;

    const response = await axios.post(
      endpoint,
      { name: domain },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Vercel domain addition response:', response.data);

    if (response.data.name === domain) {
      return true;
    }
  } catch (error) {
    console.error(`Error adding domain ${domain} to Vercel:`, error);
  }
  return false;
}

export async function getConfigResponse(
  domain: string
): Promise<vercelDomainConfigResponse> {
  try {
    const endpoint = `https://api.vercel.com/v6/domains/${domain}/config${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ''
    }`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Vercel domain config check response:', response.data);
    return {
      misconfigured: response.data.misconfigured,
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        `Error checking domain ${domain} config from Vercel:`,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error(
        `Error checking domain ${domain} config from Vercel:`,
        error.request
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(
        `Error checking domain ${domain} config from Vercel:`,
        error.message
      );
    }
    return {
      misconfigured: true,
    };
  }
}

export async function verifyDomain(domain: string): Promise<any> {
  try {
    const response = await axios.post(
      `https://api.vercel.com/v9/projects/${
        process.env.VERCEL_PROJECT_ID
      }/domains/${domain}/verify${
        process.env.VERCAL_TEAM_ID
          ? `?teamId=${process.env.VERCAL_TEAM_ID}`
          : ''
      }`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Vercel domain verification response:', response.data);
    return {
      verified: response.data.verified,
    };
  } catch (error) {
    console.error(`Error verifying domain ${domain} from Vercel:`, error);
    return {
      verified: false,
    };
  }
}

async function setDomainPrivacy(domain: string): Promise<boolean> {
  // this function is not used in the current implementation as domains are set to private by default
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

async function setARecord(domain: string, ipAddress: string): Promise<boolean> {
  const params = new URLSearchParams({
    key: process.env.DYNADOT_API_KEY || '',
    command: 'set_dns2',
    domain: domain,
    main_record_type0: 'a',
    main_record0: ipAddress,
  });

  try {
    const response = await axios.get('https://api.dynadot.com/api3.json', {
      params,
    });

    console.log(response.data);

    if (response.data?.SetDnsResponse?.ResponseCode === 0) {
      return true;
    }
  } catch (error) {
    console.error(`Error setting A record for ${domain}:`, error);
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

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { domain: true },
  });

  if (userData?.domain) {
    return { error: 'You already have a domain registered' };
  }

  try {
    // return {
    //   // to disable buying domain
    //   error: 'Buying domain is disabled for now',
    // };

    const isRegistered = await registerDomain(domain);
    if (!isRegistered) {
      return { error: 'Failed to register domain' };
    }

    const addedToVercel = await addDomainToVercel(domain);

    if (addedToVercel) {
      await prisma.user.update({
        where: { id: user.id },
        data: { domain, domainInVercel: true },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { domain },
      });
    }

    const website = await prisma.website.findFirst({
      where: { userEmail: user.emailAddresses[0].emailAddress },
    });

    if (website) {
      await setARecord(domain, '76.76.21.21');
      revalidateTag(
        `${website.domainName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
      );
    }

    return {
      success: `Domain ${domain} registered and set successfully`,
    };
  } catch (error) {
    console.error('Error buying domain:', error);
    return { error: 'Error buying domain' };
  }
}
