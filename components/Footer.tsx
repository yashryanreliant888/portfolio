import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Education', href: '/education' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ash/20 mt-section">
      <div className="max-w-page mx-auto px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-medium mb-4">Yash Ryan Reliant</h3>
            <p className="text-sm text-steel mb-4">Digital Marketing Specialist</p>
            <a
              href="mailto:yashryanreliant@gmail.com"
              className="text-sm text-almost-white hover:text-signal-violet transition-colors duration-200"
            >
              yashryanreliant@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-wide text-soft-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel hover:text-almost-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-sm uppercase tracking-wide text-soft-white mb-4">Specializations</h4>
            <ul className="space-y-2 text-sm text-steel">
              <li>Search Engine Optimization</li>
              <li>Paid Advertising</li>
              <li>Social Media Marketing</li>
              <li>Marketing Analytics</li>
              <li>Email Marketing</li>
              <li>AI-Integrated Marketing</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ash/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-steel">
            © {currentYear} Yash Ryan Reliant. All rights reserved.
          </p>
          <p className="text-sm text-steel">Kerala, India</p>
        </div>
      </div>
    </footer>
  );
}
