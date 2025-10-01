import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, MessageSquare, TrendingUp, Clock, Target, Send } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { Language, GameKey, Grade } from '../types';
import { t } from '../utils/i18n';
import { mockStudents, mockMessages } from '../content';

interface DashboardProps {
  language: Language;
  grade: Grade;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, grade, showToast }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'messages'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const { getGameProgress } = useProgress();

  const gameKeys: GameKey[] = ['wordHunt', 'readAloud', 'fillBlank', 'wordBuilder'];
  const gameNames = {
    wordHunt: 'Word Hunt',
    readAloud: 'Sentence Builder',
    fillBlank: 'Fill-in-the-Blank',
    wordBuilder: 'Word Builder'
  };

  const overviewData = gameKeys.map(gameKey => {
    const progress = getGameProgress(gameKey);
    return {
      name: gameNames[gameKey],
      percentage: Math.round(progress.percentage),
      stars: progress.totalStars,
      maxStars: progress.maxStars
    };
  });

  const colors = ['#FF7A00', '#3B82F6', '#22C55E', '#EF4444'];

  const handleSendMessage = (messageIndex: number) => {
    showToast(t('smsQueued', language), 'success');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FF8000]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-800">73%</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('timeSpentThisWeek', language)}</p>
              <p className="text-2xl font-bold text-gray-800">4.2h</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Levels Completed</p>
              <p className="text-2xl font-bold text-gray-800">26</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Bar 
                  dataKey="percentage" 
                  fill="#FF7A00"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('focusAreas', language)}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="font-medium text-red-800">Prepositions</span>
              <span className="text-sm text-red-600">2 students struggling</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="font-medium text-yellow-800">Word building</span>
              <span className="text-sm text-yellow-600">1 student struggling</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="font-medium text-green-800">Reading fluency</span>
              <span className="text-sm text-green-600">All students progressing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="bg-[#f9fafb] rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Student Progress</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('lastActivity', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('levelsCompleted', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('stars', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('struggles', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#f9fafb] divide-y divide-gray-200">
              {mockStudents.map((student, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedStudent(selectedStudent === student.name ? null : student.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-[#FF8000] font-medium">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">{student.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {student.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {student.levelsCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    ⭐ {student.stars}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {student.struggles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Drawer */}
      {selectedStudent && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedStudent} - Detailed Progress
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameKeys.map((gameKey, index) => {
              const progress = getGameProgress(gameKey);
              return (
                <div key={gameKey} className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-700 mb-2">{gameNames[gameKey]}</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{Math.round(progress.percentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${progress.percentage}%`,
                          backgroundColor: colors[index]
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stars:</span>
                      <span className="font-medium">{progress.totalStars}/{progress.maxStars}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">SMS Preview</h3>
        <div className="space-y-4">
          {mockMessages[language].map((message, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-800">{message}</p>
                <p className="text-sm text-gray-500 mt-1">Ready to send</p>
              </div>
              <button
                onClick={() => handleSendMessage(index)}
                className="ml-4 flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{t('sendMock', language)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('dashboard', language)} - Grade {grade}
          </h1>
          <p className="text-gray-600">
            Monitor student progress and send updates to parents
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {(['overview', 'students', 'messages'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab === 'overview' && <TrendingUp className="w-4 h-4" />}
                    {tab === 'students' && <Users className="w-4 h-4" />}
                    {tab === 'messages' && <MessageSquare className="w-4 h-4" />}
                    <span className="capitalize">{t(tab, language)}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'messages' && renderMessages()}
      </div>
    </div>
  );
};

export default Dashboard;