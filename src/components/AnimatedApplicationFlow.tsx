'use client';

import { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Briefcase, Mail, Phone, Award, Calendar, FileText, Upload } from 'lucide-react';

interface AnimatedApplicationFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'welcome' | 'position' | 'name' | 'email' | 'phone' | 'experience' | 'availability' | 'cover-letter' | 'reference' | 'cv-upload' | 'success';

export default function AnimatedApplicationFlow({ isOpen, onClose }: AnimatedApplicationFlowProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [applicationData, setApplicationData] = useState({
    position: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    coverLetter: '',
    reference: '',
    cvFile: null as File | null,
  });

  const positions = [
    'Line Cook',
    'Sous Chef',
    'Server',
    'Bartender',
    'Host/Hostess',
    'Dishwasher',
    'Other'
  ];

  const steps: Step[] = ['welcome', 'position', 'name', 'email', 'phone', 'experience', 'availability', 'cover-letter', 'reference', 'cv-upload', 'success'];
  const currentStepIndex = steps.indexOf(step);

  if (!isOpen) return null;

  const updateData = (field: string, value: any) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleSubmit = async () => {
    nextStep();
    
    try {
      const formData = new FormData();
      formData.append('position', applicationData.position);
      formData.append('firstName', applicationData.firstName);
      formData.append('lastName', applicationData.lastName);
      formData.append('email', applicationData.email);
      formData.append('phone', applicationData.phone);
      formData.append('experience', applicationData.experience);
      formData.append('availability', applicationData.availability);
      formData.append('coverLetter', applicationData.coverLetter);
      formData.append('reference', applicationData.reference);
      
      if (applicationData.cvFile) {
        formData.append('cv', applicationData.cvFile);
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      console.log('Application submitted successfully');
    } catch (error) {
      console.error('Application error:', error);
    }
  };

  const getStepTransform = (stepIndex: number) => {
    const diff = stepIndex - currentStepIndex;
    if (diff < 0) return '-translate-x-full opacity-0 pointer-events-none'; // Past
    if (diff === 0) return 'translate-x-0 opacity-100 pointer-events-auto'; // Current
    if (diff === 1) return 'translate-x-[110%] opacity-50 scale-95 pointer-events-none'; // Next (visible on right)
    return 'translate-x-[200%] opacity-0 pointer-events-none'; // Future
  };

  const shouldRender = (stepIndex: number) => {
    const diff = stepIndex - currentStepIndex;
    return diff >= 0 && diff <= 1; // Render current and next step only
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
        {/* Welcome - Step 0 */}
        {shouldRender(0) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(0)}`}>
            <div className="bg-white rounded-3xl shadow-2xl transform transition-all border border-gray-100 overflow-hidden max-h-[85vh]">
              <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-8 border-b border-orange-200">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 border-4 border-white overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&q=80" 
                      alt="Chef" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Join Our Team!</h2>
                    <p className="text-slate-700 text-lg leading-relaxed font-medium">
                      Let's get you started on your culinary journey with us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6 mb-6">
                  <p className="text-gray-900 text-lg leading-relaxed">
                    <span className="font-bold text-xl">Welcome!</span> We're excited that you're interested in joining the Hawthorn family. 
                    This quick application will only take a few minutes.
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-slate-200 shadow-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-800 text-base font-medium">Position and contact details</span>
                  </li>
                  <li className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-slate-200 shadow-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-800 text-base font-medium">Your experience and availability</span>
                  </li>
                  <li className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-slate-200 shadow-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-800 text-base font-medium">A brief cover letter</span>
                  </li>
                </ul>

                <button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 hover:shadow-2xl transition-all font-bold text-xl shadow-xl transform hover:scale-[1.02]"
                >
                  Let's Get Started
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Position - Step 1 */}
        {shouldRender(1) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(1)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">What role interests you?</h2>
                  <p className="text-gray-600 text-lg mt-1">Select the position you're applying for</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1 overflow-y-auto">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => updateData('position', pos)}
                    className={`px-6 py-4 rounded-2xl border-2 transition-all font-bold text-lg shadow-sm hover:shadow-md ${
                      applicationData.position === pos
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!applicationData.position}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Name - Step 2 */}
        {shouldRender(2) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(2)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">What's your name?</h2>
                  <p className="text-gray-600 text-lg mt-1">Let us know who you are</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 flex-1">
                <input
                  type="text"
                  value={applicationData.firstName}
                  onChange={(e) => updateData('firstName', e.target.value)}
                  placeholder="First Name"
                  className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                  autoFocus
                />
                <input
                  type="text"
                  value={applicationData.lastName}
                  onChange={(e) => updateData('lastName', e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              <button
                onClick={nextStep}
                disabled={!applicationData.firstName || !applicationData.lastName}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Email - Step 3 */}
        {shouldRender(3) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(3)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Great, {applicationData.firstName}!</h2>
                  <p className="text-gray-600 text-lg mt-1">What's your email address?</p>
                </div>
              </div>
              
              <input
                type="email"
                value={applicationData.email}
                onChange={(e) => updateData('email', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white mb-6"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && applicationData.email && nextStep()}
              />

              <button
                onClick={nextStep}
                disabled={!applicationData.email}
                className="w-full mt-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Phone - Step 4 */}
        {shouldRender(4) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(4)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Perfect!</h2>
                  <p className="text-gray-600 text-lg mt-1">What's your phone number?</p>
                </div>
              </div>
              
              <input
                type="tel"
                value={applicationData.phone}
                onChange={(e) => updateData('phone', e.target.value)}
                placeholder="+44 1234 567890"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white mb-6"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && applicationData.phone && nextStep()}
              />

              <button
                onClick={nextStep}
                disabled={!applicationData.phone}
                className="w-full mt-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Experience - Step 5 */}
        {shouldRender(5) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(5)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your experience?</h2>
                  <p className="text-gray-600 text-lg mt-1">How many years have you worked in hospitality?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                {['0-1', '1-2', '2-5', '5-10', '10+'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => updateData('experience', exp)}
                    className={`px-6 py-5 rounded-2xl border-2 transition-all font-bold text-xl shadow-sm hover:shadow-md ${
                      applicationData.experience === exp
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {exp === '0-1' ? 'Less than 1 year' : exp === '10+' ? 'More than 10 years' : `${exp} years`}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!applicationData.experience}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Availability - Step 6 */}
        {shouldRender(6) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(6)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">When can you work?</h2>
                  <p className="text-gray-600 text-lg mt-1">Select your availability</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                {['Full-Time', 'Part-Time', 'Seasonal', 'Flexible'].map((avail) => (
                  <button
                    key={avail}
                    onClick={() => updateData('availability', avail)}
                    className={`px-6 py-5 rounded-2xl border-2 transition-all font-bold text-xl shadow-sm hover:shadow-md ${
                      applicationData.availability === avail
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!applicationData.availability}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Cover Letter - Step 7 */}
        {shouldRender(7) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(7)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tell us about yourself</h2>
                  <p className="text-gray-600 text-lg mt-1">Why would you be a great fit? (Optional)</p>
                </div>
              </div>
              
              <textarea
                value={applicationData.coverLetter}
                onChange={(e) => updateData('coverLetter', e.target.value)}
                placeholder="Tell us about your passion for hospitality, relevant experience, or why you'd like to join our team..."
                rows={6}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 text-gray-900 text-lg transition-all resize-none shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white flex-1"
                autoFocus
              />

              <button
                onClick={nextStep}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Reference - Step 8 */}
        {shouldRender(8) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(8)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">One last thing...</h2>
                  <p className="text-gray-600 text-lg mt-1">How did you hear about us?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                {['Indeed', 'Website', 'Employee', 'Social Media', 'Walk-in', 'Other'].map((ref) => (
                  <button
                    key={ref}
                    onClick={() => updateData('reference', ref)}
                    className={`px-6 py-4 rounded-2xl border-2 transition-all font-bold text-lg shadow-sm hover:shadow-md ${
                      applicationData.reference === ref
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400 text-gray-700 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    {ref}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!applicationData.reference}
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-2xl hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* CV Upload - Step 9 */}
        {shouldRender(9) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(9)}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Upload your CV</h2>
                  <p className="text-gray-600 text-lg mt-1">Add your resume/CV (Optional)</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block w-full">
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    applicationData.cvFile 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-orange-500 bg-gray-50 hover:bg-orange-50'
                  }`}>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    {applicationData.cvFile ? (
                      <div>
                        <p className="text-green-700 font-semibold text-lg mb-1">✓ File uploaded</p>
                        <p className="text-gray-600">{applicationData.cvFile.name}</p>
                        <p className="text-sm text-gray-500 mt-2">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 font-semibold text-lg mb-1">Click to upload or drag and drop</p>
                        <p className="text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= 5 * 1024 * 1024) {
                        updateData('cvFile', file);
                      } else if (file) {
                        alert('File size must be less than 5MB');
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-5 rounded-2xl hover:from-green-700 hover:to-green-600 transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                <Check className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </div>
        )}

        {/* Success - Step 10 */}
        {shouldRender(10) && (
          <div className={`absolute inset-0 transition-all duration-700 ease-out ${getStepTransform(10)}`}>
            <div className="bg-white rounded-3xl shadow-2xl transform transition-all border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 border-b border-emerald-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 border-4 border-emerald-100">
                    <Check className="w-16 h-16 text-emerald-600" />
                  </div>
                  
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                  <p className="text-emerald-700 text-lg font-medium">We've received your application</p>
                </div>
              </div>

              <div className="p-8 text-center">
                <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p className="text-gray-700">We'll review your application within 3-5 business days</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p className="text-gray-700">If you're a good fit, we'll reach out to schedule an interview</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p className="text-gray-700">Check your email at <strong>{applicationData.email}</strong> for updates</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-base mb-6">
                  Thank you for your interest in joining The Hawthorn family!
                </p>

                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-2xl hover:from-orange-700 hover:to-orange-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
