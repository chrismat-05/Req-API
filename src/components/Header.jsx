import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary-500 text-white font-semibold shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl">API Peek</h1>
          <a
            href="https://github.com/chrismat-05/api-peek"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors"
            aria-label="GitHub Repository"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;