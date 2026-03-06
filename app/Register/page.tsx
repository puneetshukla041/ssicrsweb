"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, ChangeEvent } from "react";
import { CheckCircle, Loader2 } from "lucide-react"; 

type FormValue = string | number | boolean | File | string[] | null;

// --- 1. Animation Variants (Defined in Outer Scope for SuccessModal access) ---

const modalContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const modalCardVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonHover = { scale: 1.03, transition: { duration: 0.2 } };
const buttonTap = { scale: 0.97 };
const inputHover = { scale: 1.005, transition: { duration: 0.1 } };
const inputFocus = {
  scale: 1.005,
  boxShadow: "0 0 0 2px #A67950",
  transition: { duration: 0.2 },
};

// --- 2. Success Modal Component ---
interface SuccessModalProps {
  ticketNo: string | number;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ ticketNo, onClose }) => {
  return (
    <motion.div
      variants={modalContainerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        variants={modalCardVariants}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg w-full text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.3,
          }}
          className="text-green-600 mb-6"
        >
          <CheckCircle className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#401323] mb-3">
          Registration Successful!
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-base md:text-lg mb-6"
        >
          Thank you for enrolling. Your application has been received.
        </motion.p>
        
        <motion.div 
            className="w-full p-4 bg-green-50 rounded-xl border border-green-200 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <p className="text-sm font-semibold text-green-800">Your Ticket Number:</p>
            <p className="text-3xl font-extrabold text-green-700 tracking-wider mt-1">{ticketNo}</p>
        </motion.div>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-semibold text-white bg-[#A67950] py-3 px-8 rounded-full shadow-md hover:bg-[#8d6241] transition-colors"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// --- 3. Main RegisterPage Component ---
export default function RegisterPage() {
  const [formData, setFormData] = useState<Record<string, FormValue>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | number | null>(null); 
  
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
    text: "",
    type: "",
  });

  const showMessage = (text: string, type: "success" | "error") => {
    // Only used for ERROR messages now
    if (type === "error") {
      setMessage({ text, type });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "file") {
      const fileElement = e.target as HTMLInputElement;
      if (fileElement.files && fileElement.files.length > 0) {
        setFormData({
          ...formData,
          [id]: fileElement.files[0],
        });
      }
    } else if (type === "checkbox") {
      const checkboxElement = e.target as HTMLInputElement;
      const currentValues = (formData[id] as string[]) || [];

      if (checkboxElement.checked) {
        setFormData({
          ...formData,
          [id]: [...currentValues, value],
        });
      } else {
        setFormData({
          ...formData,
          [id]: currentValues.filter((v: string) => v !== value),
        });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, termsAgree: e.target.checked });
  };


  const handleSubmit = async () => {
    // Basic validation check (e.g., if terms are not agreed)
    if (formData.termsAgree !== true) {
        showMessage("Please agree to the Terms and Conditions.", "error");
        return;
    }
    
    setLoading(true);
    // Clear any previous message or success screen
    setMessage({ text: "", type: "" });
    setShowSuccessScreen(false);

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        const value = formData[key];
        // Skip the termsAgree field from the final submission data
        if (key === 'termsAgree') continue; 
        
        if (Array.isArray(value)) {
          // Join array fields (like training programs) into a single string for transport
          // NOTE: Your backend API might need to handle this string split
          formDataObj.append(key, value.join('|'));
        } else if (value instanceof File) {
          formDataObj.append(key, value);
        } else if (value !== null && value !== undefined) {
          formDataObj.append(key, String(value));
        }
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();
      if (result.success) {
        // NEW SUCCESS LOGIC: Show the animated success screen
        setTicketNumber(result.ticketNo);
        setShowSuccessScreen(true);
        // Clear the form data and reset file input
        setFormData({});
        (document.getElementById('uploadId') as HTMLInputElement).value = ''; 

      } else {
        // ERROR LOGIC: Show a standard error message
        showMessage(
          "Registration Failed: " + (result.error || "Unknown error"),
          "error"
        );
      }
    } catch (error) {
      showMessage("Error submitting form: " + String(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFAF2] flex flex-col pb-16 md:pb-32 font-lato relative">
      
      {/* SUCCESS SCREEN OVERLAY */}
      <AnimatePresence>
        {showSuccessScreen && ticketNumber && (
          <SuccessModal 
            ticketNo={ticketNumber} 
            onClose={() => setShowSuccessScreen(false)} 
          />
        )}
      </AnimatePresence>
      
      {/* ERROR MESSAGE (ONLY FOR ERRORS) */}
      {message.text && message.type === 'error' && (
        <motion.div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm md:max-w-md p-4 mt-4 rounded-lg shadow-lg text-white font-medium z-50 text-center bg-red-500`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        className="w-full px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-md bg-[#F8F1E9]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <motion.div
        className="flex flex-col text-center px-4 pt-12 md:pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <motion.h1
          className="font-serif text-3xl md:text-6xl text-center font-normal leading-tight text-[#A67950]"
          variants={textVariants}
        >
          Take the First Step Toward
          <br className="hidden md:block" />
          Advancing Your Robotic Surgery Skills
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base md:text-xl text-center text-[#401323] leading-relaxed mt-6 md:mt-8"
          style={{
            fontFamily: "'Lato', sans-serif",
          }}
          variants={textVariants}
        >
          Please complete the form below to enroll into our comprehensive robotic
          surgery training programs.
          <br className="hidden md:block" />
          Upon successful registration, our team will reach out with program
          details, schedules, and next steps.
        </motion.p>

        {/* Main Registration Card */}
        <motion.div
          className="mt-8 md:mt-16 bg-white rounded-2xl shadow-xl p-6 md:p-12 max-w-5xl mx-auto w-full"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Form Fields */}
          <motion.div
            className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-24 md:gap-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="fullName"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Full Name
              </label>
              <motion.input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.fullName || '')}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Email
              </label>
              <motion.input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.email || '')}
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phoneNumber"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Phone Number
              </label>
              <motion.input
                id="phoneNumber"
                type="tel"
                placeholder="Enter Your Contact Number, with Country Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.phoneNumber || '')}
              />
            </motion.div>

            {/* Date of Birth */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="dob"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Date of Birth
              </label>
              <motion.input
                id="dob"
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.dob || '')}
              />
            </motion.div>

            {/* Years of Experience */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="experience"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Years of Experience
              </label>
              <motion.input
                id="experience"
                type="number"
                placeholder="Enter the Number of Years in Practice"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.experience || '')}
              />
            </motion.div>

            {/* Affiliated Institution/Hospital */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="institution"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Affiliated Institution/Hospital
              </label>
              <motion.input
                id="institution"
                type="text"
                placeholder="Enter Your Current Place of Work"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.institution || '')}
              />
            </motion.div>

            {/* Preferred Call Date and Time */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="callDateTime"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Preferred Call Date and Time
              </label>
              <motion.input
                id="callDateTime"
                type="datetime-local"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.callDateTime || '')}
              />
            </motion.div>

            {/* How Did You Hear About Us? */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="hearAboutUs"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                How Did You Hear About Us?
              </label>
              <motion.select
                id="hearAboutUs"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.hearAboutUs || '')}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
                <option value="Colleague Referral">Colleague Referral</option>
                <option value="Conference">Conference</option>
                <option value="Other">Other</option>
              </motion.select>
            </motion.div>

            {/* Current Profession */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="currentProfession"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Current Profession
              </label>
              <motion.select
                id="currentProfession"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.currentProfession || '')}
              >
                <option value="" disabled>
                  Select Your Current Profession
                </option>
                <option value="Surgeon">Surgeon</option>
                <option value="Assistant Surgeon">Assistant Surgeon</option>
                <option value="Anesthesiologist">Anesthesiologist</option>
                <option value="Nurse">Nurse</option>
                <option value="Technician">Technician</option>
                <option value="Bio Medical Engineer">Bio Medical Engineer</option>
                <option value="Others">Others (Please Specify)</option>
              </motion.select>
            </motion.div>

            {/* Specialization */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="specialization"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Specialization
              </label>
              <motion.select
                id="specialization"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.specialization || '')}
              >
                <option value="" disabled>
                  Select Your Specialization
                </option>
                <option value="Urology">Urology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Cardiac">Cardiac</option>
                <option value="Thoracic">Thoracic</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Head and Neck">Head and Neck</option>
                <option value="Colorectal">Colorectal</option>
                <option value="Pediatric">Pediatric</option>
                <option value="Oncology">Oncology</option>
                <option value="Others">Others (Please Specify)</option>
              </motion.select>
            </motion.div>
            
            {/* Learning Goals */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label
                htmlFor="learningGoals"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Any Specific Learning Goals or Comments?
              </label>
              <motion.textarea
                id="learningGoals"
                rows={3}
                placeholder="Enter Any Specific Learning Goals or Comments"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base text-gray-900 focus:ring-2 focus:ring-[#A67950] focus:border-transparent"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
                value={String(formData.learningGoals || '')}
              />
            </motion.div>
          </motion.div>

          {/* Section Separator */}
          <div className="border-t border-gray-300 my-10 md:my-12"></div>

          {/* Training Programs */}
          <motion.div
            className="flex flex-col items-center justify-center w-full"
            variants={containerVariants}
          >
            <motion.h2
              className="font-serif text-2xl md:text-3xl text-center font-normal leading-tight text-[#A67950] mb-6 md:mb-8"
              variants={itemVariants}
            >
              Select Your Training Programs
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16 w-full">
              {/* Core Training Programs */}
              <motion.div
                className="flex flex-col items-start p-4 bg-white rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <label className="font-medium text-base md:text-lg text-[#401323] mb-3">
                  Core Programs
                </label>
                <div className="flex flex-col gap-3">
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="trainingPrograms"
                      value="Surgeon Training"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.trainingPrograms) && formData.trainingPrograms.includes("Surgeon Training")}
                    />
                    <label
                      htmlFor="trainingPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      Surgeon Training
                    </label>
                  </motion.div>
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="trainingPrograms"
                      value="Surgical Staff Training"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.trainingPrograms) && formData.trainingPrograms.includes("Surgical Staff Training")}
                    />
                    <label
                      htmlFor="trainingPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      Surgical Staff Training
                    </label>
                  </motion.div>
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="trainingPrograms"
                      value="Anesthesia Training for Robotic Surgery"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.trainingPrograms) && formData.trainingPrograms.includes("Anesthesia Training for Robotic Surgery")}
                    />
                    <label
                      htmlFor="trainingPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      Anesthesia Training for Robotic Surgery
                    </label>
                  </motion.div>
                </div>
              </motion.div>

              {/* Additional Training Programs */}
              <motion.div
                className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start"
                variants={itemVariants}
              >
                <label className="font-medium text-base md:text-lg text-[#401323] mb-3">
                  Additional Programs
                </label>
                <div className="flex flex-col gap-3">
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="additionalPrograms"
                      value="MantraSync Tele-Surgery Program"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.additionalPrograms) && formData.additionalPrograms.includes("MantraSync Tele-Surgery Program")}
                    />
                    <label
                      htmlFor="additionalPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      MantraSync Tele-Surgery Program
                    </label>
                  </motion.div>
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="additionalPrograms"
                      value="Animal Lab Training"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.additionalPrograms) && formData.additionalPrograms.includes("Animal Lab Training")}
                    />
                    <label
                      htmlFor="additionalPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      Animal Lab Training
                    </label>
                  </motion.div>
                  <motion.div
                    className="flex items-center cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <input
                      type="checkbox"
                      id="additionalPrograms"
                      value="Cadaver Lab Training"
                      className="mr-3 accent-[#A67950] w-5 h-5 cursor-pointer"
                      onChange={handleChange}
                      checked={Array.isArray(formData.additionalPrograms) && formData.additionalPrograms.includes("Cadaver Lab Training")}
                    />
                    <label
                      htmlFor="additionalPrograms"
                      className="text-sm md:text-base font-medium text-[#401323] cursor-pointer"
                    >
                      Cadaver Lab Training
                    </label>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section Separator */}
          <div className="border-t border-gray-300 my-10 md:my-12"></div>

          {/* Upload ID & Register */}
          <motion.div
            className="flex flex-col items-center w-full"
            variants={itemVariants}
          >
            <motion.h2
              className="font-serif text-2xl md:text-3xl text-center font-normal leading-tight text-[#A67950] mb-6 md:mb-8"
              variants={itemVariants}
            >
              Final Steps
            </motion.h2>

            {/* Upload ID */}
            <motion.div
              className="flex flex-col items-start w-full max-w-xl mb-8"
              variants={itemVariants}
            >
              <label
                htmlFor="uploadId"
                className="block text-left mb-1 text-sm md:text-base font-medium text-[#401323]"
              >
                Upload ID
              </label>
              <motion.input
                id="uploadId"
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm md:text-base cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#A67950] file:text-white hover:file:bg-[#8d6241]"
                onChange={handleChange}
                whileHover={inputHover}
                whileFocus={inputFocus}
              />
            </motion.div>

            {/* Register Now Section */}
            <motion.div
              className="flex flex-col items-center max-w-xl mx-auto w-full"
              variants={itemVariants}
            >
              <div className="flex items-start mb-4 md:mb-6 w-full cursor-pointer">
                <motion.input
                  type="checkbox"
                  id="termsAgree"
                  className="mr-2 md:mr-3 mt-1 cursor-pointer accent-[#A67950] shrink-0 w-5 h-5"
                  onChange={handleTermsChange} // Use the dedicated handler
                  checked={!!formData.termsAgree} // Check against the boolean state
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                <label
                  htmlFor="termsAgree"
                  className="text-xs md:text-sm font-medium text-[#401323] text-left cursor-pointer"
                >
                  By clicking on &quot;Register Now&quot;, you agree to our{" "}
                  <a
                    href="/terms"
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacypolicy"
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
<motion.button
  onClick={handleSubmit}
  disabled={loading || !formData.termsAgree} 
  className="font-bold text-base md:text-lg text-white bg-[#A67950] py-3 md:py-4 px-6 md:px-8 border-none rounded-full w-full max-w-xs md:max-w-md cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
  whileHover={buttonHover}
  whileTap={buttonTap}
>
  {loading ? (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5"
      >
        <Loader2 className="w-5 h-5" />
      </motion.div>
      <span>Registering...</span>
    </div>
  ) : (
    "Register Now"
  )}
</motion.button>


            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}