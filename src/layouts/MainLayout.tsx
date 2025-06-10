import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { name: 'Overview', path: '/overview' },
  { name: 'Tokens & Trading', path: '/token' },
  { name: 'Insights', path: '/insights' },
  { name: 'Portfolio/Risk', path: '/portfolio' },
];

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white font-sans'>
      <header className='bg-gray-800 border-b border-gray-700'>
        <nav className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <span className='font-bold text-xl text-teal-400'>CAINAM</span>
            </div>
            {/* The responsive classes 'hidden md:flex' have been removed here */}
            <div className='flex items-center space-x-4'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-gray-900 text-teal-300'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
