<footer className="bg-festival-primary text-white">
  <p className="text-white/80">
    {/* ... existing code ... */}
  </p>
  <Link
    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
    className="text-white/80 hover:text-white transition-colors"
  >
    {/* ... existing code ... */}
  </Link>
  <ul className="space-y-2 text-white/80">
    {/* ... existing code ... */}
    <a
      key={platform.name}
      href={platform.href}
      className="text-white/80 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* ... existing code ... */}
    </a>
  </ul>
  <p className="mt-12 pt-8 border-t border-white/30 text-center text-white/80">
    {/* ... existing code ... */}
  </p>
</footer> 