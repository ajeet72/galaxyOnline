import Link from 'next/link';

export default function Navbar({ darkMode, setDarkMode }: any) {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4">
      <div className="bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-full px-6 py-3 flex justify-between items-center border border-white dark:border-gray-700 border-opacity-30 shadow-lg">
        <Link href="/">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 cursor-pointer">
            MindCanvas
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'Blog', 'About', 'Contact'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <span className="font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 cursor-pointer">
                {item}
              </span>
            </Link>
          ))}
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative"
        >
          <span className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-all duration-300 ${
            darkMode ? 'left-7' : 'left-1'
          }`}></span>
        </button>
      </div>
    </nav>
  );
}