'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, Mail, Phone, Building, GraduationCap, FileText, Users, MapPin, DollarSign, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

interface JobApplication {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    location: string;
    type: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  experience: string;
  currentCompany?: string;
  currentPosition?: string;
  highestQualification: string;
  yearOfPassing: number;
  university: string;
  percentage: string;
  technicalSkills: string[];
  softSkills: string[];
  whyShouldWeHireYou: string;
  howCanYouContribute: string;
  careerGoals?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioWebsite?: string;
  expectedSalary: string;
  noticePeriod: string;
  resumeUrl: string;
  resumePublicId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: string;
}

export default function JobApplicationsPage() {
  const params = useParams();
  const jobId = params?.jobId as string;

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    shortlisted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    hired: 'bg-purple-100 text-purple-800'
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId, statusFilter]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = statusFilter === 'all'
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications/job/${jobId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications/job/${jobId}?status=${statusFilter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success('Application status updated successfully');
        fetchApplications();
        if (selectedApplication && selectedApplication._id === applicationId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus as any });
        }
      } else {
        toast.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const downloadResume = (resumeUrl: string, applicantName: string) => {
    // If it's a Cloudinary URL, add fl_attachment to force download
    let downloadUrl = resumeUrl;
    if (resumeUrl.includes('cloudinary.com') && resumeUrl.includes('/upload/')) {
      // Insert fl_attachment after /upload/
      downloadUrl = resumeUrl.replace('/upload/', '/upload/fl_attachment/');
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    // The download attribute might be ignored for cross-origin URLs, 
    // but fl_attachment on Cloudinary handles the Content-Disposition header server-side.
    link.download = `resume_${applicantName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Application deleted successfully');
        fetchApplications();
        setSelectedApplication(null);
      } else {
        toast.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No applications found</h3>
            <p className="text-gray-600">
              {statusFilter === 'all'
                ? "No applications have been submitted for this job yet"
                : `No applications with status "${statusFilter}"`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{application.firstName} {application.lastName}</CardTitle>
                    <p className="text-gray-600">{application.jobId.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={statusColors[application.status]}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Application Details</DialogTitle>
                        </DialogHeader>
                        {selectedApplication && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">Personal Information</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.firstName} {selectedApplication.lastName}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.address.city}, {selectedApplication.address.state}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.expectedSalary}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">Professional Information</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Building className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.currentCompany || 'Not specified'}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <GraduationCap className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.highestQualification} ({selectedApplication.yearOfPassing})</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <span>{selectedApplication.experience}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">Skills</h3>
                              <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Technical Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {selectedApplication.technicalSkills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {selectedApplication.softSkills.length > 0 && (
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Soft Skills:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedApplication.softSkills.map((skill, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">Why Should We Hire You?</h3>
                              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                                {selectedApplication.whyShouldWeHireYou}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">How Can You Contribute?</h3>
                              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                                {selectedApplication.howCanYouContribute}
                              </p>
                            </div>

                            {selectedApplication.careerGoals && (
                              <div>
                                <h3 className="font-semibold mb-2">Career Goals</h3>
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                                  {selectedApplication.careerGoals}
                                </p>
                              </div>
                            )}

                            <div>
                              <h3 className="font-semibold mb-2">Resume</h3>
                              <Button
                                onClick={() => downloadResume(selectedApplication.resumeUrl, `${selectedApplication.firstName} ${selectedApplication.lastName}`)}
                                className="w-full"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Resume
                              </Button>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">Update Status</h3>
                              <div className="flex space-x-2">
                                {Object.keys(statusColors).map((status) => (
                                  <Button
                                    key={status}
                                    variant={selectedApplication.status === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updateApplicationStatus(selectedApplication._id, status)}
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <Button
                                variant="destructive"
                                className="w-full"
                                onClick={() => deleteApplication(selectedApplication._id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Application
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{application.jobId.type}</Badge>
                  <Badge variant="outline">{application.jobId.location}</Badge>
                </div>
                <p className="text-gray-600 text-sm">
                  Applied on {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
