'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Brain, AlertCircle, Mail, MailOpen, ChevronLeft, ChevronRight, Filter, Search, Sparkles, Activity, Clock, CheckCircle2, XCircle, Flag, Briefcase, FileText, Download, Phone } from 'lucide-react';

interface Insight {
  id: number;
  insightType: string;
  title: string;
  description: string;
  priority: string;
  actionable: boolean;
  status: string;
  data: any;
  createdAt: string;
}

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  upcomingEvents: number;
  emailsSent: number;
  emailReplies: number;
  aiInteractions: number;
  conversionRate: number;
}

interface Booking {
  id: number;
  guestName: string;
  guestEmail: string;
  date: string;
  time: string;
  partySize: number;
  status: string;
  specialRequests?: string;
}

interface EmailActivity {
  id: number;
  type: 'sent' | 'reply';
  subject: string;
  recipient: string;
  timestamp: string;
  status: string;
  emailType?: string;
  emailData?: any;
  bookingId?: number;
  voucherId?: number;
}

export default function Dashboard() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    upcomingEvents: 0,
    emailsSent: 0,
    emailReplies: 0,
    aiInteractions: 0,
    conversionRate: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [emailActivity, setEmailActivity] = useState<EmailActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'bookings' | 'emails' | 'applications'>('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<EmailActivity | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [calendarFilterDate, setCalendarFilterDate] = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const insightsRes = await fetch('/api/analytics/insights');
      const insightsData = await insightsRes.json();
      setInsights(insightsData.insights || []);

      const statsRes = await fetch('/api/analytics/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      const bookingsRes = await fetch('/api/bookings?upcoming=true');
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings || []);
      }

      const interactionsRes = await fetch('/api/analytics/interactions');
      if (interactionsRes.ok) {
        const interactionsData = await interactionsRes.json();
        setEmailActivity(interactionsData.interactions || []);
      }

      const applicationsRes = await fetch('/api/applications');
      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.applications || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewInsights = async () => {
    setGeneratingInsights(true);
    try {
      await fetch('/api/analytics/insights?generate=true');
      await fetchDashboardData();
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setGeneratingInsights(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getBookingsForDate = (day: number | null) => {
    if (!day) return 0;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.date.startsWith(dateStr)).length;
  };

  const hasSpecialRequestsForDate = (day: number | null) => {
    if (!day) return false;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.some(b => b.date.startsWith(dateStr) && b.specialRequests && b.specialRequests.trim() !== '');
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (calendarFilterDate) {
      return matchesSearch && b.date.startsWith(calendarFilterDate);
    }
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <p className="mt-6 text-slate-300 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <Brain className="w-10 h-10 text-blue-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold text-white">Owner Dashboard</h1>
            </div>
            <p className="text-slate-400 ml-14">Real-time analytics for The Hawthorn</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('bookings')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'bookings'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveView('emails')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'emails'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Email Activity
            </button>
            <button
              onClick={() => setActiveView('applications')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'applications'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Applications
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
            <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Revenue</p>
            <p className="text-3xl font-bold text-white">£{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Email Activity</p>
            <p className="text-3xl font-bold text-white">{stats.emailsSent}</p>
            <p className="text-xs text-slate-500 mt-2">{stats.emailReplies} replies received</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">AI Interactions</p>
            <p className="text-3xl font-bold text-white">{stats.aiInteractions}</p>
            <p className="text-xs text-slate-500 mt-2">Conversion rate: {stats.conversionRate}%</p>
          </div>
        </div>

        {activeView === 'overview' && (
          <>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 mb-8">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-white">AI-Powered Insights</h2>
                </div>
                <button
                  onClick={generateNewInsights}
                  disabled={generatingInsights}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium shadow-lg shadow-blue-500/30"
                >
                  {generatingInsights ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analyzing...
                    </span>
                  ) : (
                    'Generate New Insights'
                  )}
                </button>
              </div>

              <div className="p-6">
                {insights.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
                    <p className="text-slate-400 mb-4">No insights available yet</p>
                    <button
                      onClick={generateNewInsights}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
                    >
                      Generate AI Insights
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insights.map((insight) => (
                      <div
                        key={insight.id}
                        className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-white">{insight.title}</h3>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {insight.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm mb-3 text-slate-400">{insight.description}</p>
                        {insight.data?.recommendation && (
                          <div className="bg-slate-800/50 rounded-lg p-3 mt-2 border border-slate-700">
                            <p className="text-sm font-medium mb-1 text-slate-500">AI Recommendation:</p>
                            <p className="text-sm text-slate-300">{insight.data.recommendation}</p>
                          </div>
                        )}
                        <p className="text-xs mt-3 text-blue-500">
                          Generated {new Date(insight.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Live Activity Feed
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-green-500/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">New booking received</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-blue-500/20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Gift voucher purchased</p>
                      <p className="text-xs text-slate-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-700">
                    <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">AI chat interaction completed</p>
                      <p className="text-xs text-slate-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-orange-500/20">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Email confirmation sent</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  AI Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Chat Resolution Rate</span>
                      <span className="font-bold text-green-400">94%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full shadow-lg shadow-green-500/50" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Booking Conversion</span>
                      <span className="font-bold text-blue-400">87%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full shadow-lg shadow-blue-500/50" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Upsell Success Rate</span>
                      <span className="font-bold text-blue-500">76%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 rounded-full shadow-lg shadow-blue-500/30" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Customer Satisfaction</span>
                      <span className="font-bold text-yellow-400">92%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-400 h-2.5 rounded-full shadow-lg shadow-yellow-500/50" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'bookings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-blue-500" />
                      Upcoming Bookings
                    </h3>
                    {calendarFilterDate && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-slate-400">
                          Showing bookings for {new Date(calendarFilterDate).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => setCalendarFilterDate(null)}
                          className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
                      <p className="text-slate-400">No bookings found</p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-slate-700/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500 hover:bg-slate-700 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div>
                              <h4 className="font-semibold text-white">{booking.guestName}</h4>
                              <p className="text-sm text-slate-500">{booking.guestEmail}</p>
                            </div>
                            {booking.specialRequests && booking.specialRequests.trim() !== '' && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full">
                                <Flag className="w-3 h-3 text-red-500 fill-red-500" />
                                <span className="text-xs font-bold text-red-400">Special Request</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                              booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {booking.status.toUpperCase()}
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4 text-blue-500" />
                            {booking.partySize} guests
                          </div>
                        </div>
                        {booking.specialRequests && (
                          <div className="mt-3 p-2 bg-slate-800/50 rounded border border-slate-700">
                            <p className="text-xs text-slate-500">Special Requests: {booking.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Calendar</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                      className="p-1 hover:bg-slate-700 rounded"
                    >
                      <ChevronLeft className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                      className="p-1 hover:bg-slate-700 rounded"
                    >
                      <ChevronRight className="w-5 h-5 text-blue-500" />
                    </button>
                  </div>
                </div>
                <p className="text-center text-slate-400 font-medium mb-4">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-xs font-bold text-blue-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarDays().map((day, idx) => {
                    const bookingCount = getBookingsForDate(day);
                    const hasSpecialRequests = hasSpecialRequestsForDate(day);
                    const dateStr = day ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                    const isSelected = dateStr === calendarFilterDate;
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (day && bookingCount > 0) {
                            setCalendarFilterDate(dateStr);
                          }
                        }}
                        className={`aspect-square flex flex-col items-center justify-center text-sm rounded-lg relative ${
                          day
                            ? bookingCount > 0
                              ? isSelected
                                ? 'bg-blue-700 text-white font-bold cursor-pointer ring-2 ring-blue-400'
                                : 'bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-500'
                              : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                            : ''
                        }`}
                      >
                        {day && (
                          <>
                            {hasSpecialRequests && (
                              <Flag className="absolute top-0.5 right-0.5 w-3 h-3 text-red-500 fill-red-500" />
                            )}
                            <span>{day}</span>
                            {bookingCount > 0 && (
                              <span className="text-[10px] text-slate-200">{bookingCount}</span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'emails' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-400" />
              Email Activity Log
            </h3>
            <div className="space-y-3">
              {emailActivity.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
                  <p className="text-slate-400">No emails sent yet</p>
                </div>
              ) : (
                emailActivity.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className="bg-slate-700/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500 hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          email.emailType === 'booking_confirmation' ? 'bg-blue-500/20' : 'bg-green-500/20'
                        }`}>
                          {email.emailType === 'booking_confirmation' ? (
                            <Calendar className="w-5 h-5 text-blue-400" />
                          ) : (
                            <DollarSign className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              email.emailType === 'booking_confirmation' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                            }`}>
                              {email.emailType === 'booking_confirmation' ? 'BOOKING' : 'VOUCHER'}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              email.status === 'sent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {email.status.toUpperCase()}
                            </span>
                          </div>
                          <h4 className="font-semibold text-white mb-1">{email.subject}</h4>
                          <p className="text-sm text-slate-500">To: {email.recipient}</p>
                          <p className="text-xs text-blue-500 mt-2">
                            {new Date(email.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {email.status === 'sent' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-400" />
                        )}
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {selectedEmail && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEmail(null)}>
            <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  {selectedEmail.emailType === 'booking_confirmation' ? (
                    <Calendar className="w-6 h-6 text-blue-400" />
                  ) : (
                    <DollarSign className="w-6 h-6 text-green-400" />
                  )}
                  Email Details
                </h3>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">Type</label>
                  <p className="text-white mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      selectedEmail.emailType === 'booking_confirmation' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {selectedEmail.emailType === 'booking_confirmation' ? 'Booking Confirmation' : 'Gift Voucher Purchase'}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400">Subject</label>
                  <p className="text-white mt-1">{selectedEmail.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400">Recipient</label>
                  <p className="text-white mt-1">{selectedEmail.recipient}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400">Sent At</label>
                  <p className="text-white mt-1">{new Date(selectedEmail.timestamp).toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400">Status</label>
                  <p className="text-white mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      selectedEmail.status === 'sent' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedEmail.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                {selectedEmail.emailData && (
                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Email Content</h4>
                    
                    {selectedEmail.emailType === 'booking_confirmation' && (
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-slate-400">Guest Name</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.guestName}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-400">Party Size</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.partySize} guests</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-400">Date</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.date}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-400">Time</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.time}</p>
                          </div>
                        </div>
                        {selectedEmail.emailData.specialRequests && (
                          <div>
                            <label className="text-xs font-medium text-slate-400">Special Requests</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedEmail.emailType === 'voucher_purchase' && (
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-slate-400">Voucher Code</label>
                            <p className="text-white mt-1 font-mono text-lg">{selectedEmail.emailData.voucherCode}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-400">Amount</label>
                            <p className="text-white mt-1 text-lg font-bold">{selectedEmail.emailData.voucherAmount}</p>
                          </div>
                        </div>
                        {selectedEmail.emailData.recipientName && (
                          <div>
                            <label className="text-xs font-medium text-slate-400">Recipient</label>
                            <p className="text-white mt-1">{selectedEmail.emailData.recipientName}</p>
                          </div>
                        )}
                        {selectedEmail.emailData.message && (
                          <div>
                            <label className="text-xs font-medium text-slate-400">Personal Message</label>
                            <p className="text-white mt-1 italic">{selectedEmail.emailData.message}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
            <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Booking Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">Status</label>
                  <p className="text-white mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      selectedBooking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      selectedBooking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedBooking.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400">Guest Name</label>
                    <p className="text-white mt-1 text-lg font-semibold">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">Party Size</label>
                    <p className="text-white mt-1 text-lg font-semibold">{selectedBooking.partySize} guests</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-400">Email</label>
                  <p className="text-white mt-1">{selectedBooking.guestEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400">Date</label>
                    <p className="text-white mt-1 text-lg">{new Date(selectedBooking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">Time</label>
                    <p className="text-white mt-1 text-lg">{selectedBooking.time}</p>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="w-5 h-5 text-red-500 fill-red-500" />
                      <label className="text-sm font-medium text-red-400">Special Requests - Attention Required</label>
                    </div>
                    <div className="mt-1 bg-red-500/10 rounded-lg p-4 border-2 border-red-500/50">
                      <p className="text-white font-medium">{selectedBooking.specialRequests}</p>
                    </div>
                  </div>
                )}

                <div className="border-t border-slate-700 pt-4 mt-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Booking Information</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Booking ID</span>
                      <span className="text-white font-mono">#{selectedBooking.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Created</span>
                      <span className="text-white">{new Date(selectedBooking.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications View */}
        {activeView === 'applications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Applications List */}
            <div className="lg:col-span-1 space-y-4">
              {applications.length === 0 ? (
                <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-8 text-center">
                  <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No applications yet</p>
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApplication(app)}
                    className={`bg-slate-800 rounded-xl shadow-xl border p-4 cursor-pointer transition-all hover:border-blue-500 ${
                      selectedApplication?.id === app.id ? 'border-blue-500 bg-slate-700' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">
                          {app.firstName} {app.lastName}
                        </h3>
                        <p className="text-sm text-slate-400">{app.position}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        app.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                        app.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                    
                    {app.cvPath && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-400 font-medium">
                        <FileText className="w-3 h-3" />
                        CV Attached
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Application Details */}
            <div className="lg:col-span-2">
              {selectedApplication ? (
                <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">
                        {selectedApplication.firstName} {selectedApplication.lastName}
                      </h2>
                      <p className="text-xl text-blue-400 font-semibold">{selectedApplication.position}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedApplication.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      selectedApplication.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                      selectedApplication.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedApplication.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Email</p>
                        <p className="text-sm font-semibold text-white">{selectedApplication.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Phone</p>
                        <p className="text-sm font-semibold text-white">{selectedApplication.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Experience</p>
                        <p className="text-sm font-semibold text-white">{selectedApplication.experience} years</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Availability</p>
                        <p className="text-sm font-semibold text-white">{selectedApplication.availability}</p>
                      </div>
                    </div>
                  </div>

                  {selectedApplication.coverLetter && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-white mb-3">Cover Letter</h3>
                      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedApplication.cvPath && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-white mb-3">Resume/CV</h3>
                      <a
                        href={selectedApplication.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
                      >
                        <Download className="w-5 h-5" />
                        Download CV
                      </a>
                    </div>
                  )}

                  <div className="flex gap-3 pt-6 border-t border-slate-700">
                    <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Accept
                    </button>
                    <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-12 text-center h-full flex items-center justify-center">
                  <div>
                    <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select an Application</h3>
                    <p className="text-slate-400">Click on an application to view details</p>
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
