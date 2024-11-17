import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <small>Like what you see?</small>

      <small>
        Visit my website:{" "}
        <a
          href="https://ledu-dev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ledu.dev
        </a>
      </small>
    </div>
  );
};

export default Footer;
