'use client';

import { useState, useEffect } from 'react';
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users, Briefcase, DollarSign, MapPin, Menu, Eye } from 'lucide-react';
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
  isActive: boolean;
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function JobsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experience: '',
    salary: '',
    location: '',
    skills: '',
    domain: '',
    type: ''
  });

  const domains = ['Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Other'];
  const types = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
      };

      const url = editingJob ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs/${editingJob._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        toast.success(`Job ${editingJob ? 'updated' : 'created'} successfully`);
        setIsCreateDialogOpen(false);
        setEditingJob(null);
        resetForm();
        fetchJobs();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Job deleted successfully');
        fetchJobs();
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const toggleJobStatus = async (jobId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Job status updated successfully');
        fetchJobs();
      } else {
        toast.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      experience: '',
      salary: '',
      location: '',
      skills: '',
      domain: '',
      type: ''
    });
  };

  const openEditDialog = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      experience: job.experience,
      salary: job.salary,
      location: job.location,
      skills: job.skills.join(', '),
      domain: job.domain,
      type: job.type
    });
    setIsCreateDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <div className="text-white/60">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-white">Job Management</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setFormData({
                  title: '',
                  description: '',
                  experience: '',
                  salary: '',
                  location: '',
                  skills: '',
                  domain: '',
                  type: ''
                });
                setEditingJob(null);
              }} className="bg-[#31a39c] hover:bg-[#31a39c]/80 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingJob ? 'Edit Job' : 'Create New Job'}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  {editingJob ? 'Update the job details below.' : 'Fill in the details to create a new job position.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white/80">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain" className="text-white/80">Domain</Label>
                    <Select value={formData.domain} onValueChange={(value) => setFormData({ ...formData, domain: value })}>
                      <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain} className="text-white hover:bg-white/10">
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-white/80">Job Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {types.map((type) => (
                          <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-white/80">Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g., 2-3 years"
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary" className="text-white/80">Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="e.g., 8-12 LPA"
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-white/80">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Remote"
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="skills" className="text-white/80">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g., React, Node.js, MongoDB"
                    required
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white/80">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    required
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#31a39c] hover:bg-[#31a39c]/80 text-white">
                    {editingJob ? 'Update Job' : 'Create Job'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Briefcase className="w-16 h-16 text-white/20 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">No jobs posted yet</h3>
              <p className="text-white/60 mb-4">Create your first job posting to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#31a39c] hover:bg-[#31a39c]/80 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job._id} className="bg-[#0a0a0a]/50 border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="bg-[#31a39c]/20 text-[#31a39c] border-[#31a39c]/30">{job.domain}</Badge>
                          <Badge variant="outline" className="border-white/20 text-white/60">{job.type}</Badge>
                          <Badge variant={job.isActive ? "default" : "destructive"} className={job.isActive ? "bg-green-500/20 text-green-400 border-green-400/30" : "bg-red-500/20 text-red-400 border-red-400/30"}>
                            {job.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/admin/jobs/applications/${job._id}`}>
                          <Button variant="outline" size="sm" className="border-white/20 text-white/60 hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleJobStatus(job._id)}
                          className="border-white/20 text-white/60 hover:bg-white/10"
                        >
                          {job.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(job)} className="border-white/20 text-white/60 hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)} className="bg-red-500/20 text-red-400 border-red-400/30 hover:bg-red-500/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/60">{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/60">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/60">{job.applicationCount} Applications</span>
                      </div>
                    </div>
                    <p className="text-white/60 mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/60">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
