'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  ArrowLeft,
  Building,
  GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { Footer } from "@/components/ui/footer-section";

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
  postedBy: {
    name: string;
    email: string;
  };
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data.job);
      } else if (response.status === 404) {
        toast.error('Job not found');
      } else {
        toast.error('Failed to fetch job details');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to fetch job details');
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

  if (loading) {
    return (
      <>
        <Code2CashNavbar />
        <div className="min-h-screen bg-[#030303] flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#31a39c]"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Code2CashNavbar />
        <div className="min-h-screen bg-[#030303] pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Job Not Found</h3>
              <p className="text-white/60 mb-4">The job you're looking for doesn't exist or has been removed.</p>
              <Link href="/jobs">
                <Button className="bg-[#31a39c] hover:bg-[#31a39c]/80 text-white">Browse All Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Code2CashNavbar />
      <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#0a0a0a] border-white/10 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <CardTitle className="text-3xl font-bold text-white mb-0">{job.title}</CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-[#31a39c]/20 text-[#31a39c] border-0 hover:bg-[#31a39c]/30">
                          {job.domain}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white/80 hover:bg-white/5">
                          {job.type}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white border-0 hover:bg-white/20">
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left md:text-right flex flex-col items-end">
                      <Link href="/careers" className="inline-flex items-center text-white/60 hover:text-[#31a39c] mb-2 transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Careers
                      </Link>
                      <div className="text-2xl font-bold text-[#31a39c] mb-1">{job.salary}</div>
                      <div className="text-sm text-white/40">{job.applicationCount} applications</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white/5 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-[#31a39c]" />
                      <div>
                        <div className="text-sm text-white/40">Location</div>
                        <div className="font-medium text-white">{job.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-[#31a39c]" />
                      <div>
                        <div className="text-sm text-white/40">Experience</div>
                        <div className="font-medium text-white">{job.experience}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-[#31a39c]" />
                      <div>
                        <div className="text-sm text-white/40">Posted</div>
                        <div className="font-medium text-white">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Job Description</h3>
                    <div className="prose prose-invert max-w-none text-white/70 leading-relaxed">
                      {job.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm border-white/20 text-white/70 py-1.5 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Card className="bg-[#0a0a0a] border-white/10 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to apply?</h3>
                  <p className="text-white/60 mb-6 max-w-lg mx-auto">
                    Take the next step in your career. Applying takes only a few minutes.
                  </p>
                  <Link href={`/jobs/${job._id}/apply`}>
                    <Button size="lg" className="w-full md:w-auto min-w-[200px] bg-[#31a39c] hover:bg-[#31a39c]/90 text-white font-semibold text-lg py-6 shadow-[0_0_20px_-5px_#31a39c]">
                      Apply for this Position
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-[#0a0a0a] border-white/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Job Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/60">Type</span>
                      <span className="font-medium text-white">{job.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/60">Domain</span>
                      <span className="font-medium text-white">{job.domain}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/60">Experience</span>
                      <span className="font-medium text-white">{job.experience}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/60">Salary</span>
                      <span className="font-medium text-[#31a39c]">{job.salary}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/60">Location</span>
                      <span className="font-medium text-white">{job.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0a0a0a] border-white/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Posted By</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#31a39c]/10 rounded-xl flex items-center justify-center border border-[#31a39c]/20">
                      <Building className="w-6 h-6 text-[#31a39c]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Team Code2Cash</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
