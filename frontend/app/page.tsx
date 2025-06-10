import Header from '../components/Header';
import { Briefcase, Users, PlusCircle, Files, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <Header pageTitle="Dashboard" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome back!</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your activity summary.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-300">
              <PlusCircle size={20} />
              <span>Create New Job</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatCard title="Active Jobs" value="12" icon={Briefcase} trend="+2 this week" />
            <StatCard title="Candidates" value="4,281" icon={Users} trend="+120 this month" />
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Analyses</h3>
            <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700">
                <div className="inline-block p-5 bg-gray-100 dark:bg-slate-700 rounded-full">
                    <Files size={40} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h4 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">No analyses found</h4>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Results from your latest resume screenings will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: React.ElementType, trend: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{value}</span>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
          <Icon size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
        <ArrowUpRight size={16} />
        <span>{trend}</span>
      </div>
    </div>
  );
}
