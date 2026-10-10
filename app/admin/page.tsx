import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch statistics
  const [
    { count: skillsCount },
    { count: experienceCount },
    { count: certificationsCount },
    { count: educationCount },
    { count: projectsCount },
    { count: publishedProjectsCount },
    { count: messagesCount },
    { count: newMessagesCount },
  ] = await Promise.all([
    supabase.from('skills').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('experience').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('certifications').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('education').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  // Fetch recent messages
  const { data: recentMessages } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { name: 'Active Skills', value: skillsCount || 0, href: '/admin/skills', color: 'violet' },
    { name: 'Published Experience', value: experienceCount || 0, href: '/admin/experience', color: 'steel' },
    { name: 'Certifications', value: certificationsCount || 0, href: '/admin/certifications', color: 'steel' },
    { name: 'Education Records', value: educationCount || 0, href: '/admin/education', color: 'steel' },
    { name: 'Total Projects', value: projectsCount || 0, href: '/admin/projects', color: 'steel' },
    { name: 'Published Projects', value: publishedProjectsCount || 0, href: '/admin/projects', color: 'violet' },
    { name: 'Total Messages', value: messagesCount || 0, href: '/admin/messages', color: 'steel' },
    { name: 'New Messages', value: newMessagesCount || 0, href: '/admin/messages', color: newMessagesCount ? 'violet' : 'steel' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-almost-white mb-2">Dashboard Overview</h1>
        <p className="text-steel">Portfolio content management and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="card border border-ash/20 p-6 hover:border-signal-violet/30 transition-all"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm text-steel uppercase tracking-wide">{stat.name}</p>
              <p className={`text-3xl font-bold ${stat.color === 'violet' ? 'text-signal-violet' : 'text-almost-white'}`}>
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-medium text-soft-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 p-4 border border-ash/20 rounded-buttons hover:border-signal-violet/30 transition-colors"
          >
            <svg className="w-6 h-6 text-signal-violet" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-sm font-medium text-graphite">Edit Profile</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-3 p-4 border border-ash/20 rounded-buttons hover:border-signal-violet/30 transition-colors"
          >
            <svg className="w-6 h-6 text-signal-violet" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-sm font-medium text-graphite">Add Skill</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 border border-ash/20 rounded-buttons hover:border-signal-violet/30 transition-colors"
          >
            <svg className="w-6 h-6 text-signal-violet" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-sm font-medium text-graphite">Create Project</span>
          </Link>
        </div>
      </div>

      {/* Recent Messages */}
      {recentMessages && recentMessages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-soft-white">Recent Contact Messages</h2>
            <Link href="/admin/messages" className="text-sm text-signal-violet hover:text-lavender-mist">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <Link
                key={message.id}
                href={`/admin/messages`}
                className="block card border border-ash/20 p-4 hover:border-signal-violet/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-almost-white">{message.name}</p>
                      {message.status === 'new' && (
                        <span className="px-2 py-0.5 text-xs bg-signal-violet text-almost-white rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-steel mb-2">{message.email}</p>
                    {message.subject && (
                      <p className="text-sm text-graphite mb-1 font-medium">{message.subject}</p>
                    )}
                    <p className="text-sm text-graphite line-clamp-2">{message.message}</p>
                  </div>
                  <div className="text-xs text-steel whitespace-nowrap">
                    {new Date(message.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
