import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full text-center py-4 text-gray-500">
      <div className="flex justify-center space-x-4">
        <a
          href="https://bullx.gitbook.io/bullx/privacy-policy"
          className="hover:underline"
          target="_blank"
        >
          Privacy Policy
        </a>
        <a
          href="https://bullx.gitbook.io/bullx/terms-of-use"
          className="hover:underline"
        >
          Terms & Condition
        </a>
      </div>
    </footer>
  );
};

export default Footer;
