function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer fixed bottom-0 bg-base-300 text-neutral-content footer-center">
      <div className="navbar bg-base-300 justified-content">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center">
          <a>Parent</a>
        </div>
        <div className="navbar-center">
          <a>Child</a>
        </div>
        <div className="navbar-center">
          <a>Noun</a>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
