import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Users, MessageCircle, Star, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../hooks/useLanguage';
import { uiStrings } from '../content';

type Tab = 'overview' | 'students' | 'messages';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getGameProgress } = useProgress();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const strings = uiStrings[language] || uiStrings.en;

  // Mock student data
  const students = [
    {
      name: 'Sipho',
      lastActivity: '2 hours ago',
      levelsCompleted: 8,
      stars: 22,
      struggles: 'Prepositions'
    },
    {
      name: 'Aisha', 
      lastActivity: '1 day ago',
      levelsCompleted: 12,
      stars: 34,
      struggles: 'Reading fluency'
    },
    {
      name: 'Liam',
      lastActivity: '3 hours ago', 
      levelsCompleted: 6,
      stars: 15,
      struggles: 'Vocabulary'
    }
  ];

  const messages = [
    'Sipho finished Level 1 – Word Builder today. 🎉',
    'Aisha needs help with reading fluency exercises.',
    'Liam completed 3 levels this week! Great progress! ⭐'
  ];

  const gameProgress = {
    wordHunt: getGameProgress('wordHunt'),
    readAloud: getGameProgress('readAloud'),
    fillBlank: getGameProgress('fillBlank'),
    wordBuilder: getGameProgress('wordBuilder')
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Time This Week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">2h 34m</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Total Stars</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Object.values(gameProgress).reduce((sum, game) => sum + game.totalStars, 0)}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Completion Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(Object.values(gameProgress).reduce((sum, game) => sum + game.percentage, 0) / 4)}%
          </p>
        </div>
      </div>

      {/* Game Progress */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(strings.games).map(([gameKey, gameInfo]) => {
            const progress = gameProgress[gameKey as keyof typeof gameProgress];
            return (
              <div key={gameKey} className="flex items-center gap-4">
                <ProgressRing percent={progress.percentage} size={60}>
                  <span className="text-xs font-medium">{progress.percentage}%</span>
                </ProgressRing>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{gameInfo.title}</h4>
                  <p className="text-sm text-gray-600">
                    {progress.completedItems}/{progress.totalItems} completed
                  </p>
                  <p className="text-sm text-yellow-600">
                    ⭐ {progress.totalStars} stars
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <span className="text-red-700">Prepositions (in, on, under)</span>
            <span className="text-sm text-red-600">Needs attention</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-yellow-700">Reading fluency</span>
            <span className="text-sm text-yellow-600">Improving</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-green-700">Vocabulary building</span>
            <span className="text-sm text-green-600">Strong</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StudentsTab = () => (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Levels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stars</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Struggles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-orange-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.lastActivity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.levelsCompleted}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-sm text-yellow-600">
                    <Star className="w-4 h-4" />
                    {student.stars}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600">{student.struggles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MessagesTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent SMS Updates</h3>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-800">{message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                    Send (Mock)
                  </button>
                  <span className="text-xs text-gray-500">Demo mode</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-md">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'messages' && <MessagesTab />}
      </div>
    </div>
  );
};