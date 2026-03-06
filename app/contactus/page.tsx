"use client";

import React, { useState } from "react";
import { Linkedin, Youtube } from "lucide-react";

interface FormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  inquiryType: string;
  message: string;
}

// Accent Color: #9B7F5A
// Background Color: #FBFAF2

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    inquiryType: "Program registration",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");

    const requiredFields: (keyof FormData)[] = [
      "fullName",
      "phoneNumber",
      "emailAddress",
      "message",
    ];
    const hasEmptyField = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (hasEmptyField) {
      setSubmissionMessage("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    console.log("Form Submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmissionMessage(
      "Message sent successfully! Our team will get back to you within 1-2 business days."
    );
    setFormData({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      inquiryType: "Program registration",
      message: "",
    });
    setIsSubmitting(false);
  };

  const FormInput: React.FC<{
    label: string;
    name: keyof FormData;
    placeholder: string;
    type?: string;
    isTextArea?: boolean;
  }> = ({ label, name, placeholder, type = "text", isTextArea = false }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4}
          className="w-full p-3 border border-gray-200 bg-neutral-100 rounded-lg focus:ring-[#9B7F5A] focus:border-[#9B7F5A] transition duration-150"
          required
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-200 bg-neutral-100 rounded-lg focus:ring-[#9B7F5A] focus:border-[#9B7F5A] transition duration-150"
          required
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFAF2] pt-28 pb-16 px-6 sm:px-10 xl:px-40 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Primary Heading */}
        <h2
          className="text-3xl sm:text-4xl lg:text-4xl text-center lg:text-left leading-snug mb-6"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            fontStyle: "normal",
            color: "#A67950",
            whiteSpace: "pre-line",
          }}
        >
          Contact Us
        </h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN: Contact Information */}
          <div className="space-y-12 pr-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Get in touch
              </h2>
              <p className="text-gray-600 max-w-sm">
                Reach out to us using the contact details provided.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#9B7F5A] mb-1">
                Address
              </h3>
              <p className="text-gray-800 leading-relaxed">
                SS Innovations Pvt. Ltd.
                <br />
                Plot No. 04, HSIIDC Industrial Estate, Sector 31,
                <br />
                Faridabad, Haryana 121003, India
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#9B7F5A] mb-1">
                Phone:
              </h3>
              <p className="text-gray-800">+91-XXXXXXXXXXXX</p>
              <p className="text-gray-500 text-sm">
                Available: Monday - Friday, 9:00 AM to 6:00 PM IST
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#9B7F5A] mb-1">
                Email:
              </h3>
              <a
                href="mailto:info@ssicrs.com"
                className="text-gray-800 hover:text-[#9B7F5A] transition duration-200"
              >
                info@ssicrs.com
              </a>
              <p className="text-gray-500 text-sm max-w-xs pt-1">
                For general inquiries, training programs, and collaborations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Follow our social media
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-[#9B7F5A] hover:text-[#7d6549] transition duration-200"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-[#9B7F5A] hover:text-[#7d6549] transition duration-200"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="mt-16 lg:mt-0">
            <div className="p-8 sm:p-12 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Fill out the form below and our team will get back to you within
                1–2 business days.
              </p>

              {submissionMessage && (
                <div
                  className={`p-4 mb-4 rounded-lg text-sm ${
                    submissionMessage.includes("successfully")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submissionMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Write your full name..."
                  />
                  <FormInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="+91 - xxx xxx xxxx"
                    type="tel"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Email Address"
                    name="emailAddress"
                    placeholder="Enter your email address"
                    type="email"
                  />
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 bg-neutral-100 rounded-lg focus:ring-[#9B7F5A] focus:border-[#9B7F5A] transition duration-150 text-gray-700"
                    >
                      <option value="Program registration">
                        Program registration
                      </option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                    </select>
                  </div>
                </div>

                <FormInput
                  label="Message"
                  name="message"
                  placeholder="Write your message here..."
                  isTextArea
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-[#9B7F5A] text-white font-semibold rounded-lg shadow-md hover:bg-[#7d6549] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-20 w-full h-[450px] rounded-xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            title="SS Innovations Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14012.370132424373!2d77.3115271565845!3d28.394615497686187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb5062f4af45%3A0x46c72c57b19e7ef8!2sSS%20Innovations%20Private%20Limited!5e0!3m2!1sen!2sin!4v1696859990568!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
