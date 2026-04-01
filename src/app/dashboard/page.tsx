'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Brain, AlertCircle } from 'lucide-react';

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
}

export default function Dashboard() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [generatingInsights, setGeneratingInsights] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-2">AI-powered insights and analytics for The Hawthorn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ Last 30 days</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">£{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ Last 30 days</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCustomers}</p>
              </div>
              <Users className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 mt-2">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.upcomingEvents}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 mt-2">Next 60 days</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h2>
            </div>
            <button
              onClick={generateNewInsights}
              disabled={generatingInsights}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {generatingInsights ? 'Generating...' : 'Generate New Insights'}
            </button>
          </div>

          <div className="p-6">
            {insights.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No insights available yet</p>
                <button
                  onClick={generateNewInsights}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Generate AI Insights
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`border rounded-lg p-4 ${getPriorityColor(insight.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{insight.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded uppercase">
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{insight.description}</p>
                    {insight.data?.recommendation && (
                      <div className="bg-white bg-opacity-50 rounded p-3 mt-2">
                        <p className="text-sm font-medium mb-1">Recommendation:</p>
                        <p className="text-sm">{insight.data.recommendation}</p>
                      </div>
                    )}
                    <p className="text-xs mt-2 opacity-75">
                      Generated {new Date(insight.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New booking received</p>
                  <p className="text-xs text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Gift voucher purchased</p>
                  <p className="text-xs text-gray-600">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Customer inquiry via AI chat</p>
                  <p className="text-xs text-gray-600">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Chat Resolution Rate</span>
                  <span className="font-medium text-gray-900">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Booking Conversion</span>
                  <span className="font-medium text-gray-900">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Upsell Success Rate</span>
                  <span className="font-medium text-gray-900">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
