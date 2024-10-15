import React from "react";
import "../Styles/termConditionsModal.css";

const TermConditions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("terms-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="terms-modal-overlay" onClick={handleOverlayClick}>
      <div className="terms-modal-content">
        <button className="close-modal-btn-top" onClick={onClose}>
          &times;
        </button>
        <h2>Terms & Conditions</h2>
        <p>
          These Terms & Conditions govern your use of{" "}
          <strong>diwaliinquiries.in</strong>, referred to as Website in these
          Terms and Conditions. By accessing or using Website, you agree to be
          bound by these terms.
        </p>

        <h3>1. No Sale of Firecrackers</h3>
        <p>
          Website intends only to provide an estimated cost of fire crackers. It
          does not sell firecrackers or any related products. Pricing,
          categories and items are modeled after Gopi Agencies from Sivakasi.
          Once an inquiry is submitted, you will get an email detailing your
          selections and budget.
        </p>

        <h3>2. Liability Disclaimer</h3>
        <p>
          Website acts solely as a platform for submitting inquiry requests and
          has no involvement in the sale, shipment, delivery, or payment for
          firecrackers. By using our platform, you acknowledge and agree that:
        </p>
        <ul>
          <li>
            Website bears no liability for the quality, safety, legality, or any
            other aspect of the firecrackers inquiries.
          </li>
          <li>
            Website makes no representations or warranties about the accuracy,
            completeness, or reliability of the information provided on the
            Website.
          </li>
          <li>
            The Website reserves the right to modify or discontinue the Website
            at any time.
          </li>
        </ul>

        <h3>3. Changes to the Terms</h3>
        <p>
          Website reserves the right to modify or update these Terms &
          Conditions at any time without prior notice. Continued use of the
          website following any changes constitutes acceptance of the updated
          terms.
        </p>

        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TermConditions;
