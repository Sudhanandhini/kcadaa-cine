import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Change background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Members",
      path: "/members",
      hasSubmenu: true,
      submenu: [
        { name: "Board Members", path: "/members/board" },
        { name: "Art Director", path: "/members/art-director" },
        { name: "Asst. Art Director", path: "/members/asst-art-director" },
      ],
    },
    { name: "Gallery", path: "/gallery" },
    { name: "Event", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-[90%] max-w-[1400px]  rounded-lg shadow-lg">
      {/* Top Contact Bar */}
      <div className={`px-6 py-1 text-right text-white text-sm transition ${isScrolled ? "opacity-100" : "opacity-90"}`}>
        +91 74110 41975
      </div>

      {/* Header Main */}
      <div className=" bg-primary flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-[250px] h-auto  flex items-center justify-center ">
            <img src={logo} alt="logo"  /> {/* Replace logo file */}
          </div>
          {/* <span className="text-2xl font-bold text-white">KCADAA</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-white">
          {navLinks.map((link) =>
            link.hasSubmenu ? (
              <div key={link.name} className="relative group">
                <Link to={link.path} className={`hover:text-accent transition ${location.pathname.startsWith("/members") ? "text-accent" : ""}`}>
                  {link.name}
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.path}
                      to={sublink.path}
                      className="block px-4 py-2 hover:bg-primary hover:text-white"
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.path} to={link.path} className={`hover:text-accent transition ${isActive(link.path) ? "text-accent" : ""}`}>
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary px-6 pb-4 space-y-3 text-white">
          {navLinks.map((link) =>
            link.hasSubmenu ? (
              <div key={link.name}>
                <button onClick={() => setIsMembersOpen(!isMembersOpen)} className="flex justify-between w-full py-2">
                  {link.name}
                  <span>{isMembersOpen ? "-" : "+"}</span>
                </button>

                {isMembersOpen && (
                  <div className="pl-3 space-y-2">
                    {link.submenu.map((sublink) => (
                      <Link key={sublink.path} to={sublink.path} className="block py-1" onClick={() => setIsMenuOpen(false)}>
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.path} to={link.path} className="block py-2" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
