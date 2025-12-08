'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, Briefcase, Clock, Filter } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  description: string;
  experience: string;
  salary: string;
  location: string;
  skills: string[];
  domain: string;
  type: string;
  applicationCount: number;
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const domains = ['Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Other'];
  const types = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, domainFilter, typeFilter, currentPage]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (domainFilter !== 'all') params.append('domain', domainFilter);
      if (typeFilter !== 'all') params.append('type', typeFilter);
      params.append('page', currentPage.toString());
      params.append('limit', '10');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs?${params.toString()}`);

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.pagination.pages);
      } else {
        toast.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const getDomainColor = (domain: string) => {
    const colors: { [key: string]: string } = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Sales': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'HR': 'bg-indigo-100 text-indigo-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Other': 'bg-orange-100 text-orange-800'
    };
    return colors[domain] || colors['Other'];
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading jobs...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={domainFilter} onValueChange={setDomainFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        <Link href={`/jobs/${job._id}`} className="hover:text-blue-600 transition-colors">
                          {job.title}
                        </Link>
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getDomainColor(job.domain)}>
                          {job.domain}
                        </Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="secondary">{job.experience}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600 mb-1">{job.salary}</div>
                      <div className="text-sm text-gray-500">{job.applicationCount} applications</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {truncateText(job.description, 150)}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 5} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href={`/jobs/${job._id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/jobs/${job._id}/apply`}>
                      <Button variant="outline">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
