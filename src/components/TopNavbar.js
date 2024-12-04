import { useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-dark-card/50 border-b border-gray-800/50 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
        {/* Left side: Mobile Menu Button / Logo on Desktop */}
        <div className="justify-self-start">
          <button
            className="md:hidden text-gray-300 hover:text-accent-primary"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden md:block">
            <Link href="/" passHref legacyBehavior>
              <a className="text-3xl font-semibold font-ocr bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Antitoken
              </a>
            </Link>
          </div>
        </div>

        {/* Center: Logo on Mobile / Navigation on Desktop */}
        <div className="justify-self-center w-full">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center">
            <Link href="/" passHref legacyBehavior>
              <a className="text-3xl font-semibold font-ocr bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Antitoken
              </a>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center space-x-8">
            <a
              href="https://antitoken.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-accent-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="https://antitoken.pro/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-accent-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Whitepaper
            </a>
            <a
              href="https://forum.antitoken.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent-primary transition-colors"
            >
              Forum
            </a>
          </div>
        </div>

        {/* Wallet Button */}
        <div className="justify-self-end relative">
          {/* (Desktop) */}
          <div className="hidden md:block">
            <div>
              <WalletMultiButton className="wallet-button" />
            </div>
          </div>
          {/* (Mobile) */}
          <div className="md:hidden">
            <div>
              <WalletMultiButton className="wallet-button" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-card/90 border-b border-gray-800/50">
          <div className="px-4 py-3 space-y-4">
            <a
              href="https://antitoken.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-accent-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="https://antitoken.pro/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-accent-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Whitepaper
            </a>
            <a
              href="https://forum.antitoken.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-accent-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Forum
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
