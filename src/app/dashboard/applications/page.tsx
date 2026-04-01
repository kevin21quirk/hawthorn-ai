'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Mail, Phone, Calendar, Briefcase, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Application {
  id: number;
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  availability: string;
  coverLetter: string | null;
  referenceSource: string | null;
  cvPath: string | null;
  status: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewed': return <AlertCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Applications</h1>
          <p className="text-gray-600">Review and manage applicant submissions</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">Applications will appear here once candidates submit them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Applications List */}
            <div className="lg:col-span-1 space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApplication(app)}
                  className={`bg-white rounded-xl shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedApplication?.id === app.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {app.firstName} {app.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{app.position}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                  
                  {app.cvPath && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                      <FileText className="w-3 h-3" />
                      CV Attached
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Application Details */}
            <div className="lg:col-span-2">
              {selectedApplication ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        {selectedApplication.firstName} {selectedApplication.lastName}
                      </h2>
                      <p className="text-xl text-orange-600 font-semibold">{selectedApplication.position}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusIcon(selectedApplication.status)}
                      {selectedApplication.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Mail className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedApplication.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Phone className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedApplication.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Experience</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedApplication.experience} years</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Availability</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedApplication.availability}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Applied On</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(selectedApplication.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {selectedApplication.referenceSource && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">How They Found Us</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedApplication.referenceSource}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedApplication.coverLetter && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Cover Letter</h3>
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedApplication.cvPath && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Resume/CV</h3>
                      <a
                        href={selectedApplication.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-5 h-5" />
                        Download CV
                      </a>
                    </div>
                  )}

                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Accept
                    </button>
                    <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center h-full flex items-center justify-center">
                  <div>
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Application</h3>
                    <p className="text-gray-600">Click on an application to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
