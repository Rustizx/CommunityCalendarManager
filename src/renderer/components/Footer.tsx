interface FooterProps {
  className: string;
}

function Footer(props: FooterProps) {
  const { className } = props;
  return (
    <div className="footer">
      <p className={`footer-text ${className}`}>Created by Josh Blayone</p>
    </div>
  );
}

export default Footer;
