const Footer = () => {
  const backToTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div
        onClick={backToTop}
        className="p-3 bg-amazon_blue-light cursor-pointer"
      >
        <p className="text-white text-center">Back to top</p>
      </div>
    </div>
  );
};

export default Footer;
