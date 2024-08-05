'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { User } from '@prisma/client';
import { env } from '@/env.mjs';
import Link from 'next/link';
import { UserSignupsChart } from './charts/user-signups-chart';
import { WebsitePublicationChart } from './charts/published-chart';
import { PremiumUsersChart } from './charts/premium-users-chart';
import { PremiumUsersDomainChart } from './charts/domains-chart';

const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = rootDomain === 'localhost:3000' ? 'http://' : 'https://';

interface AdminDashboardContentProps {
  users: (User & { website: { domainName: string } | null })[];
}

export function AdminDashboardContent({ users }: AdminDashboardContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<'email' | 'createdAt' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortColumn === 'email') {
      return sortOrder === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    }
    if (sortColumn === 'createdAt') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const handleSort = (column: 'email' | 'createdAt') => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const premiumUsers = users.filter((user) => user.stripeSubscriptionId).length;
  const nonPremiumUsers = users.length - premiumUsers;
  const publishedWebsites = users.filter((user) => user.website).length;

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Premium Users</h2>
          <p className="text-2xl font-bold">{premiumUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Published Websites</h2>
          <p className="text-2xl font-bold">{publishedWebsites}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <UserSignupsChart users={users} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PremiumUsersChart users={users} />
          <WebsitePublicationChart users={users} />
          <PremiumUsersDomainChart users={users} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="mb-5">
          <Input
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email{' '}
                  {sortColumn === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  Date and Time Signed Up{' '}
                  {sortColumn === 'createdAt' &&
                    (sortOrder === 'asc' ? '▲' : '▼')}
                </TableHead>
                <TableHead>Published Website</TableHead>
                <TableHead>Website Link</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Domain Purchased</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{user.website ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user.website ? (
                      <Link
                        href={`${protocol}${user.website.domainName}.${rootDomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.domain ||
                          `${user.website.domainName}.${rootDomain}`}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    {user.stripeSubscriptionId ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {user.stripeSubscriptionId
                      ? user.domain
                        ? 'Yes'
                        : 'No'
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
