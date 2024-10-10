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
        <h2>Terms and Conditions</h2>
        <p>
          These Terms & Conditions govern your use of <b>Diwali Celebrations</b>
          , referred to as Website in these Terms and Conditions. By accessing
          or using Website, you agree to be bound by these terms.
        </p>

        <h3>1. No Sale of Firecrackers</h3>
        <p>
          Website does <b>not sell</b> firecrackers or any related products
          directly. Our platform is designed to showcase various firecrackers
          provided by{" "}
          <b>
            Gopi Agencies, 2/2052, Sasi Nagar, Sivakasi, Tamil Nadu - 626123
          </b>
          , allowing users to submit <b>inquiry requests</b> for these products.
          Once an inquiry is submitted, it is forwarded to Gopi Agencies for
          further processing.
        </p>

        <h3>2. Inquiry Process</h3>
        <p>
          When you submit an inquiry through our website, the details of your
          request are sent directly to Gopi Agencies. Gopi Agencies is
          responsible for:
        </p>
        <ul>
          <li>
            Processing your inquiry and communicating feasibility of shipment
            delivery.
          </li>
          <li>Finalizing the sale.</li>
          <li>Shipping and delivering the firecrackers.</li>
          <li>Handling payment directly upon delivery.</li>
        </ul>

        <h3>3. Liability Disclaimer</h3>
        <p>
          Website acts solely as a platform for submitting inquiry requests and
          has <b>no involvement</b> in the sale, shipment, delivery, or payment
          for firecrackers. By using our platform, you acknowledge and agree
          that:
        </p>
        <ul>
          <li>
            Website bears <b>no liability</b> for the quality, safety, legality,
            or any other aspect of the firecrackers provided by Gopi Agencies.
          </li>
          <li>
            Website is not responsible for any issues, including but not limited
            to, delays, damages, or legal concerns arising from the sale,
            shipment, or use of the firecrackers.
          </li>
          <li>
            Website is not liable for any damages, losses, or injuries arising
            from the purchase, use, or possession of firecrackers.
          </li>
          <li>Any actions or omissions by Gopi Agencies.</li>
          <li>
            Any disputes or claims regarding the firecrackers must be resolved
            between you and Gopi Agencies.
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

        <h3>4. Compliance with Laws</h3>
        <p>
          Gopi Agencies is solely responsible for ensuring that all products
          comply with applicable laws, regulations, and safety standards. This
          includes, but is not limited to:
        </p>
        <ul>
          <li>
            Selling only approved firecrackers, such as green crackers with
            reduced emissions, as required by law.
          </li>
          <li>
            Ensuring that firecrackers are <b>not delivered to areas</b> where
            they are prohibited or restricted by local laws and regulations.
          </li>
        </ul>

        <h3>5. Prohibited Regions</h3>
        <p>
          It is the responsibility of Gopi Agencies to ensure that firecrackers
          are <b>not delivered to regions</b> where their sale or use is banned
          or restricted. Website is not liable for any shipments made to such
          areas and does not verify the legality of deliveries.
        </p>

        <h3>6. Changes to the Terms</h3>
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
