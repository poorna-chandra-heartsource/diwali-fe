import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/enquiryForm.css";
import TermConditions from "./TermConditions";
import { formatPrice } from "../utils";
import config from "../config";

const EnquiryForm = ({ cartItems, setCartItems, userData }) => {
  const [formData, setFormData] = useState({
    full_name: userData?.full_name || "",
    email: userData?.email || "",
    mobile: userData?.mobile || "",
    address: {
      city: userData?.address?.city || "",
      state: userData?.address?.state || "",
      pincode: userData?.address?.pincode || "",
      addressLine1: userData?.address?.addressLine1 || "",
      addressLine2: userData?.address?.addressLine2 || "",
      landmark: userData?.address?.landmark || "",
    },
    order: {
      total_price: 0,
      orderItems: [],
    },
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const navigate = useNavigate();
  const errorRef = useRef(null);

  const full_nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const addressLine1Ref = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    if (userData) {
      const userAddress = userData.user_address?.[0];
      setFormData({
        full_name: userData.full_name || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        address: {
          city: userAddress?.city || "",
          state: userAddress?.state || "",
          pincode: userAddress?.pincode || "",
          addressLine1: userAddress?.addressLine1 || "",
          addressLine2: userAddress?.addressLine2 || "",
          landmark: userAddress?.landmark || "",
        },
        order: {
          total_price: 0,
          orderItems: [],
        },
      });
    } else {
      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        address: {
          city: "",
          state: "",
          pincode: "",
          addressLine1: "",
          addressLine2: "",
          landmark: "",
        },
        order: {
          total_price: 0,
          orderItems: [],
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    const orderItems = cartItems.map((item) => ({
      product_id: item._id,
      quantity: item.quantity,
      price: item.unit_price,
    }));

    const total_price = calculateTotal();

    setFormData((prevData) => ({
      ...prevData,
      order: {
        ...prevData.order,
        total_price,
        orderItems,
      },
    }));
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    );
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal >= 20000) return { rate: 0.15, percentage: 15 };
    if (subtotal >= 10001) return { rate: 0.1, percentage: 10 };
    if (subtotal >= 5000) return { rate: 0.05, percentage: 5 };
    return { rate: 0, percentage: 0 };
  };

  const getDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    const { rate } = calculateDiscount(subtotal);
    return subtotal * rate;
  };

  const getDiscountPercentage = () => {
    const subtotal = calculateSubtotal();
    const { percentage } = calculateDiscount(subtotal);
    return percentage;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - getDiscountAmount();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Name is required *";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required *";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format *";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Contact number is required *";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Contact number must be 10 digits *";
    }
    if (!formData.address.addressLine1.trim()) {
      newErrors.addressLine1 = "Street address is required *";
    }
    if (!formData.address.city.trim()) {
      newErrors.city = "City is required *";
    }

    const pincode = String(formData.address.pincode);
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required *";
    } else if (!pincodeRegex.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits *";
    }

    if (!formData.address.state.trim()) {
      newErrors.state = "State is required *";
    }

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      scrollToField(firstErrorField);
    }

    return Object.keys(newErrors).length === 0;
  };

  const scrollToField = (fieldName) => {
    let fieldRef;
    switch (fieldName) {
      case "full_name":
        fieldRef = full_nameRef;
        break;
      case "email":
        fieldRef = emailRef;
        break;
      case "mobile":
        fieldRef = mobileRef;
        break;
      case "addressLine1":
        fieldRef = addressLine1Ref;
        break;
      case "city":
        fieldRef = cityRef;
        break;
      case "pincode":
        fieldRef = pincodeRef;
        break;
      case "state":
        fieldRef = stateRef;
        break;
      default:
        return;
    }

    fieldRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Add focus to the field
    fieldRef.current?.focus();
  };

  const handleSubmit = async () => {
    //spinner
    setIsSubmitting(true);

    //if cart is empty
    if (cartItems.length === 0) {
      setIsSubmitting(false);
      setNotification({
        message:
          "Your cart is empty! Please add items to the cart before submitting an inquiry.",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 7000);
      return;
    }
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      let apiUrl;
      let dataToSend;

      const formDataWithStringPincode = {
        ...formData,
        address: {
          ...formData.address,
          pincode: String(formData.address.pincode),
        },
      };
      const token = localStorage.getItem("token");
      const headerConfig = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      setSubmittedEmail(formData.email);
      //if user is loggedIn
      if (token) {
        apiUrl = `${config.backendURL}/orders`;
        dataToSend = formDataWithStringPincode.order;
      } else {
        // If user is not logged in
        apiUrl = `${config.backendURL}/users`;
        dataToSend = formDataWithStringPincode;
      }

      const response = await axios.post(apiUrl, dataToSend, headerConfig);
      if (response.status === 200 || response.status === 201) {
        setFormData({
          full_name: "",
          email: "",
          mobile: "",
          address: {
            city: "",
            state: "",
            pincode: "",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
          },
          order: {
            total_price: 0,
            orderItems: [],
          },
        });

        setCartItems([]);
        localStorage.removeItem("cartItems");

        setSuccessModalOpen(true);
      } else {
        setNotification({
          message: "Failed to create user. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setNotification({
          message: `Error: ${error.response.data.message}`,
          type: "error",
        });
      } else {
        setNotification({
          message: "An unknown error occurred. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 7000);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    navigate("/products");
  };

  const getSubtotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    );
  };

  return (
    <div className="form-order-container">
      {isSubmitting && (
        <div className="spinner-overlay">
          <div className="successSpinner"></div>
          <p className="spinner-text">
            Please wait, your inquiry is being sent...
          </p>
        </div>
      )}
      <div className="form-container">
        <h2>Fill your details</h2>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                ref={full_nameRef}
                type="text"
                name="full_name"
                autoFocus="true"
                value={formData.full_name}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.full_name ? "error-input" : ""}
                style={{
                  border: errors.full_name
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.full_name && (
                <span className="error">{errors.full_name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.email ? "error-input" : ""}
                style={{
                  border: errors.email
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact No. *</label>
              <input
                ref={mobileRef}
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.mobile ? "error-input" : ""}
                style={{
                  border: errors.mobile
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>

            <div className="form-group">
              <label>Country / Region *</label>
              <input type="text" value="India" readOnly />
            </div>
          </div>

          <div className="form-group">
            <label>Street address *</label>
            <input
              ref={addressLine1Ref}
              type="text"
              name="addressLine1"
              placeholder="House number and street name"
              value={formData.address.addressLine1}
              onChange={handleInputChange}
              disabled={!!userData}
              className={errors.addressLine1 ? "error-input" : ""}
              style={{
                border: errors.addressLine1
                  ? "2px solid red"
                  : formData.full_name
                  ? "1px solid #ccc"
                  : "",
              }}
            />
            {errors.addressLine1 && (
              <span className="error">{errors.addressLine1}</span>
            )}
            <br />
            <input
              type="text"
              name="addressLine2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={formData.address.addressLine2}
              onChange={handleInputChange}
              disabled={!!userData}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Town / City *</label>
              <input
                ref={cityRef}
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.city ? "error-input" : ""}
                style={{
                  border: errors.city
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.address.landmark}
                onChange={handleInputChange}
                disabled={!!userData}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pincode *</label>
              <input
                ref={pincodeRef}
                type="number"
                name="pincode"
                value={formData.address.pincode}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.pincode ? "error-input" : ""}
                style={{
                  border: errors.pincode
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.pincode && (
                <span className="error">{errors.pincode}</span>
              )}
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                ref={stateRef}
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleInputChange}
                disabled={!!userData}
                className={errors.state ? "error-input" : ""}
                style={{
                  border: errors.state
                    ? "2px solid red"
                    : formData.full_name
                    ? "1px solid #ccc"
                    : "",
                }}
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>
        </form>

        {notification.message && (
          <p
            className={`enquiry-notification ${
              notification.type === "success"
                ? "notification-success"
                : "notification-error"
            }`}
          >
            {notification.message}
          </p>
        )}
      </div>
      <div className="order-summary-container">
        <h2>Your Inquiry</h2>
        <div className="order-summary">
          <div className="summary-item">
            <strong>Product(s)</strong>
            <strong>Subtotal</strong>
          </div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="summary-item">
                <span>
                  {item.name} × <b>{item.quantity}</b>
                </span>
                <span>
                  {formatPrice((item.unit_price || 0) * (item.quantity || 0))}
                </span>
              </div>
            ))
          )}

          <div className="summary-item">
            <strong>Budgeted Price</strong>
            <span>₹ {formatPrice(calculateSubtotal())}</span>
          </div>
          <div className="summary-item">
            <strong>
              Discount (<b>{getDiscountPercentage()}%</b>)
            </strong>
            <span>- ₹ {formatPrice(getDiscountAmount())}</span>
          </div>

          <div className="summary-item total">
            <strong>Budgeted Total Price</strong>
            <span>₹ {formatPrice(calculateTotal())}</span>
          </div>
          <div className="termConditions">
            By sending your inquiry, you agree to the &nbsp;
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              Terms & Conditions
            </a>
            &nbsp; of Diwali-Inquiries Website
            <sup>*</sup>
          </div>
        </div>
        <br />
        <button
          ref={errorRef}
          className="submitBtn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Send Inquiry
        </button>
      </div>
      {/* Modal */}
      <TermConditions
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Success Modal */}
      {successModalOpen && (
        <div className="success-modal">
          <p>
            Your Inquiry has been sent successfully ! <br /> Please check your
            email (<strong>{submittedEmail}</strong>) for more details.
          </p>
          <button onClick={handleSuccessModalClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;
