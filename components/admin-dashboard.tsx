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
import { User, AdminUser } from '@prisma/client';
import { env } from '@/env.mjs';
import Link from 'next/link';
import { UserSignupsChart } from './charts/user-signups-chart';
import { WebsitePublicationChart } from './charts/published-chart';
import { PremiumUsersChart } from './charts/premium-users-chart';
import { PremiumUsersDomainChart } from './charts/domains-chart';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { onAddAdminUser, onDeleteAdminUser } from '@/actions/admin-dashboard';

const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = rootDomain === 'localhost:3000' ? 'http://' : 'https://';

interface AdminDashboardContentProps {
  users: (User & { website: { domainName: string } | null })[];
  adminUsers: AdminUser[];
}

export function AdminDashboardContent({
  users,
  adminUsers: initialAdminUsers,
}: AdminDashboardContentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [error, setError] = useState<string | null>(null);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<string | null>(null);

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

  const handleAddAdminUser = async () => {
    if (!newAdminEmail) return;

    setAddingAdmin(true);
    setError(null);
    try {
      const result = await onAddAdminUser(newAdminEmail);
      if (result.success) {
        toast({
          title: 'Admin user added',
          description: `Admin user with email ${newAdminEmail} has been added.`,
          className: 'bg-green-500 text-white font-mono',
        });
        setAdminUsers([
          ...adminUsers,
          {
            id: Date.now().toString(),
            userEmail: newAdminEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as AdminUser,
        ]);
        setNewAdminEmail('');
      } else {
        setError(result.error);
        toast({
          title: 'Failed to add admin user',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to add admin user:', error);
      setError('An unexpected error occurred');
      toast({
        title: 'Failed to add admin user',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleDeleteAdminUser = async (id: string) => {
    setDeletingAdmin(id);
    setError(null);
    try {
      const result = await onDeleteAdminUser(id);
      if (result.success) {
        toast({
          title: 'Admin user deleted',
          description: 'Admin user has been deleted.',
          className: 'bg-green-500 text-white font-mono',
        });
        setAdminUsers(adminUsers.filter((admin) => admin.id !== id));
      } else {
        setError(result.error);
        toast({
          title: 'Failed to delete admin user',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to delete admin user:', error);
      setError('An unexpected error occurred');
      toast({
        title: 'Failed to delete admin user',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setDeletingAdmin(null);
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
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Manage Admin Users</h2>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Enter admin email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="max-w-sm"
          />
          <Button
            onClick={handleAddAdminUser}
            disabled={addingAdmin || !newAdminEmail}
          >
            {addingAdmin ? 'Adding...' : 'Add Admin'}
          </Button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Added At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.userEmail}</TableCell>
                <TableCell>
                  {new Date(admin.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteAdminUser(admin.id)}
                    disabled={deletingAdmin === admin.id}
                    variant="destructive"
                  >
                    {deletingAdmin === admin.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
