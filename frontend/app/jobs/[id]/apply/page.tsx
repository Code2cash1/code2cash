'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, FileText, CheckCircle, Building } from 'lucide-react';
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
}

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Address
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },

    // Professional Info
    experience: '',
    currentCompany: '',
    currentPosition: '',

    // Education
    highestQualification: '',
    yearOfPassing: '',
    university: '',
    percentage: '',

    // Skills
    technicalSkills: '',
    softSkills: '',

    // Detailed Questions
    whyShouldWeHireYou: '',
    howCanYouContribute: '',
    careerGoals: '',

    // Additional Info
    linkedinProfile: '',
    githubProfile: '',
    portfolioWebsite: '',
    expectedSalary: '',
    noticePeriod: ''
  });

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
        router.push('/jobs');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setUploadedResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedResume) {
      toast.error('Please upload your resume');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', jobId);

      // Personal Info
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      // Address
      formDataToSend.append('address[street]', formData.address.street);
      formDataToSend.append('address[city]', formData.address.city);
      formDataToSend.append('address[state]', formData.address.state);
      formDataToSend.append('address[pincode]', formData.address.pincode);
      formDataToSend.append('address[country]', formData.address.country);

      // Professional Info
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('currentCompany', formData.currentCompany);
      formDataToSend.append('currentPosition', formData.currentPosition);

      // Education
      formDataToSend.append('highestQualification', formData.highestQualification);
      formDataToSend.append('yearOfPassing', formData.yearOfPassing);
      formDataToSend.append('university', formData.university);
      formDataToSend.append('percentage', formData.percentage);

      // Skills
      formDataToSend.append('technicalSkills', JSON.stringify(formData.technicalSkills.split(',').map(s => s.trim()).filter(Boolean)));
      formDataToSend.append('softSkills', JSON.stringify(formData.softSkills.split(',').map(s => s.trim()).filter(Boolean)));

      // Detailed Questions
      formDataToSend.append('whyShouldWeHireYou', formData.whyShouldWeHireYou);
      formDataToSend.append('howCanYouContribute', formData.howCanYouContribute);
      formDataToSend.append('careerGoals', formData.careerGoals);

      // Additional Info
      formDataToSend.append('linkedinProfile', formData.linkedinProfile);
      formDataToSend.append('githubProfile', formData.githubProfile);
      formDataToSend.append('portfolioWebsite', formData.portfolioWebsite);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      formDataToSend.append('noticePeriod', formData.noticePeriod);

      // Resume
      formDataToSend.append('resume', uploadedResume);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        toast.success('Application submitted successfully!');
        router.push(`/jobs/${jobId}`);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    } finally {
      setSubmitting(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link href="/careers" className="inline-flex items-center text-white/60 hover:text-[#31a39c] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#0a0a0a] border-white/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Apply for <span className="text-[#31a39c]">{job.title}</span></CardTitle>
                  <p className="text-white/60">
                    Fill out the form below to submit your application
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-white/80">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white/80">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white/80">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-white/80">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Address Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address.street" className="text-white/80">Street Address *</Label>
                          <Input
                            id="address.street"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address.city" className="text-white/80">City *</Label>
                          <Input
                            id="address.city"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address.state" className="text-white/80">State *</Label>
                          <Input
                            id="address.state"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address.pincode" className="text-white/80">Pincode *</Label>
                          <Input
                            id="address.pincode"
                            name="address.pincode"
                            value={formData.address.pincode}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address.country" className="text-white/80">Country *</Label>
                          <Input
                            id="address.country"
                            name="address.country"
                            value={formData.address.country}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Professional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="experience" className="text-white/80">Years of Experience *</Label>
                          <Input
                            id="experience"
                            name="experience"
                            placeholder="e.g., 3-5 years"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currentPosition" className="text-white/80">Current Position</Label>
                          <Input
                            id="currentPosition"
                            name="currentPosition"
                            value={formData.currentPosition}
                            onChange={handleInputChange}
                            placeholder="Optional"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currentCompany" className="text-white/80">Current Company</Label>
                          <Input
                            id="currentCompany"
                            name="currentCompany"
                            value={formData.currentCompany}
                            onChange={handleInputChange}
                            placeholder="Optional"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expectedSalary" className="text-white/80">Expected Salary *</Label>
                          <Input
                            id="expectedSalary"
                            name="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="noticePeriod" className="text-white/80">Notice Period *</Label>
                          <Input
                            id="noticePeriod"
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Education Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="highestQualification" className="text-white/80">Highest Qualification *</Label>
                          <Input
                            id="highestQualification"
                            name="highestQualification"
                            value={formData.highestQualification}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="yearOfPassing" className="text-white/80">Year of Passing *</Label>
                          <Input
                            id="yearOfPassing"
                            name="yearOfPassing"
                            type="number"
                            min="1950"
                            max={new Date().getFullYear() + 10}
                            value={formData.yearOfPassing}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="university" className="text-white/80">University/Institute *</Label>
                          <Input
                            id="university"
                            name="university"
                            value={formData.university}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="percentage" className="text-white/80">Percentage/CGPA *</Label>
                          <Input
                            id="percentage"
                            name="percentage"
                            value={formData.percentage}
                            onChange={handleInputChange}
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills & Expertise */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Skills & Expertise</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="technicalSkills" className="text-white/80">Technical Skills *</Label>
                          <Textarea
                            id="technicalSkills"
                            name="technicalSkills"
                            rows={3}
                            value={formData.technicalSkills}
                            onChange={handleInputChange}
                            placeholder="e.g., React, Node.js, MongoDB, Python (comma-separated)"
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="softSkills" className="text-white/80">Soft Skills</Label>
                          <Textarea
                            id="softSkills"
                            name="softSkills"
                            rows={3}
                            value={formData.softSkills}
                            onChange={handleInputChange}
                            placeholder="e.g., Communication, Leadership, Teamwork (comma-separated)"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Profiles */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Professional Profiles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="linkedinProfile" className="text-white/80">LinkedIn Profile</Label>
                          <Input
                            id="linkedinProfile"
                            name="linkedinProfile"
                            value={formData.linkedinProfile}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="githubProfile" className="text-white/80">GitHub Profile</Label>
                          <Input
                            id="githubProfile"
                            name="githubProfile"
                            value={formData.githubProfile}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="portfolioWebsite" className="text-white/80">Portfolio Website</Label>
                          <Input
                            id="portfolioWebsite"
                            name="portfolioWebsite"
                            value={formData.portfolioWebsite}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Detailed Questions */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Detailed Questions</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="whyShouldWeHireYou" className="text-white/80">Why should we hire you? *</Label>
                          <Textarea
                            id="whyShouldWeHireYou"
                            name="whyShouldWeHireYou"
                            rows={4}
                            value={formData.whyShouldWeHireYou}
                            onChange={handleInputChange}
                            placeholder="Tell us about your strengths, achievements, and what makes you the perfect candidate for this role..."
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="howCanYouContribute" className="text-white/80">How can you contribute to our company? *</Label>
                          <Textarea
                            id="howCanYouContribute"
                            name="howCanYouContribute"
                            rows={4}
                            value={formData.howCanYouContribute}
                            onChange={handleInputChange}
                            placeholder="Describe how your skills and experience align with our company goals and how you can add value..."
                            required
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="careerGoals" className="text-white/80">Career Goals (Optional)</Label>
                          <Textarea
                            id="careerGoals"
                            name="careerGoals"
                            rows={3}
                            value={formData.careerGoals}
                            onChange={handleInputChange}
                            placeholder="What are your long-term career aspirations and how does this role fit into them?"
                            className="bg-[#1a1a1a] border-white/10 text-white focus:border-[#31a39c]/50 placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <Label className="text-white/80">Resume *</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[#31a39c]/50 transition-colors bg-white/5 group">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            {uploadedResume ? (
                              <>
                                <CheckCircle className="w-8 h-8 text-[#31a39c] mb-2" />
                                <span className="text-sm font-medium text-[#31a39c]">
                                  {uploadedResume.name}
                                </span>
                                <span className="text-xs text-white/40 mt-1">
                                  Click to change file
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-white/40 mb-2 group-hover:text-[#31a39c] transition-colors" />
                                <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                                  Click to upload resume
                                </span>
                                <span className="text-xs text-white/30 mt-1">
                                  PDF, DOC, or DOCX (max 5MB)
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                      <Link href="/careers">
                        <Button variant="outline" type="button" className="border-white/10 text-white hover:bg-white/5 hover:text-white">
                          Cancel
                        </Button>
                      </Link>
                      <Button type="submit" disabled={submitting} className="bg-[#31a39c] hover:bg-[#31a39c]/90 text-white">
                        {submitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </form>
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
                  <h3 className="font-semibold mb-2 text-white">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-[#31a39c]/20 text-[#31a39c] border-0">
                      {job.domain}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-white/60">{job.type}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-white/60">Salary:</span>
                      <span className="font-medium text-[#31a39c]">{job.salary}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-white/60">Location:</span>
                      <span className="font-medium text-white">{job.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-white/60">Experience:</span>
                      <span className="font-medium text-white">{job.experience}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2 text-white">Required Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#31a39c]/10 border-[#31a39c]/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-[#31a39c] mt-1" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Application Tips</h4>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• Tailor your resume to the job requirements</li>
                        <li>• Highlight relevant experience and skills</li>
                        <li>• Write a compelling cover letter</li>
                        <li>• Double-check your contact information</li>
                      </ul>
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
