// faculty-card-page.tsx
import React from 'react';
import Image from 'next/image';

// Interface for a single faculty member
interface Faculty {
  name: string;
  title: string;
  details: string;
  image: string;
}

// 1. Separate the faculty members into two main categories: International/Cardiac and Others
const internationalCardiacFaculty: Faculty[] = [
{
  name: "Sudhir Srivastava, MD",
  title: "Founder, Chairman, CEO - SSICRS",
  details: "Robotic Cardiac Surgeon | Surgical Robotics Pioneer | Industry Leader",
  image: "/Images/homepage/section7/image1.webp",
},
{
  name: "Dr. Husam Balkhy",
  title: "MBBS, MS, FACS, FACC",
  details: "The University of Chicago Medicine and Biological Sciences Chicago, IL, USA",
  image: "/Images/homepage/section7/image6.webp",
},
{
  name: "Dr. T Sloane Guy",
  title: "MBA, MS. FACC",
  details: "Georgia Heart Institute,Gainesville, GA",
  image: "/Images/homepage/section7/image7.webp",
},
{
  name: "Dr. Nirav Patel",
  title: "MBBS, MS, FRCS",
  details: "Lenox Hill Hospital, New York, NY, USA",
  image: "/Images/homepage/section7/image8.webp",
},
{
  name: "Dr. Gianluca Torregrossa ",
  title: "MBBS, MS",
  details: "Lankenau Heart Institute,Philidelphia, PA, USA",
  image: "/Images/homepage/section7/image9.webp",
},
{
  name: "Dr. Frank van Praet ",
  title: "MS, FETCS",
  details: "Co-Director of Cardiovascular Center AZorg, Aalst, Belgium",
  image: "/Images/homepage/section7/image10.webp",
},
{
  name: "Dr. Wouter Oosterlinck ",
  title: "MD, PhD",
  details: "Cardiac Surgery Professor, University Hospitals, Leuven, Belgium",
  image: "/Images/homepage/section7/image11.webp",
},
{
  name: "Dr. Bob Kiaii ",
  title: "BSc, MD, FRCSC, FACS",
  details: "Chief of Section of Cardiac Surgery, Department of Cardiac Sciences, Foothills Medical Centre, Libin Cardiovascular Institute, University of Calgary",
  image: "/Images/homepage/section7/image12.webp",
},
{
  name: "Dr. Johannes Oliver Bonatti",
  title: "MBBS, MS",
  details: "University of Pittsburgh Medical Center, Pittsburg, PA, USA",
  image: "/Images/homepage/section7/image13.webp",
},
{
  name: "Dr. Danny Ramsey",
  title: "MD, Phd",
  details: "Professor and Chief of Cardiac Surgery, UTHealth McGovern School of Medicine",
  image: "/Images/homepage/section7/image14.webp",
},
];

const otherFaculty: Faculty[] = [
  {
    name: "Dr. Nitin Kumar Rajput",
    title: "MCH (Cardiothoracic and Vascular Surgery), MS (General Surgery)",
    details: "Associate Director - Cardiac Surgery | Medanta, The Medicity - Gurugram, Haryana",
    image: "/Images/homepage/section7/image4.webp",
  },
  {
    name: "Dr. Sathyaki Nambala",
    title: "MBBS, MS, DNB, MCh",
    details: "Chief Surgeon, Robotic & Minimally Invasive Cardiac Surgery, Apollo Hospitals Bannerghatta",
    image: "/Images/homepage/section7/image15.webp",
  },
  {
    name: "Dr. M M Yusuf ",
    title: "FRCS (Edin), FRCS (Glasgow), FRCS (CardioTh)",
    details: "Apollo Hospital,Chennai, TN",
    image: "/Images/homepage/section7/image16.webp",
  },
  {
    name: "Dr. Yugal Kishore Mishra ",
    title: "MBBS, MS, Ph.D (Cardiovascular Surgery)",
    details: "Chairman - Manipal Institute of Medical Sciences",
    image: "/Images/homepage/section7/image17.webp",
  },
  {
    name: "Dr. Lalitaditya Malik",
    title: "MBBS | MS | MCh (C.T.V.S)",
    details: "HOD, Chief Cardiac Surgeon, Manipal Hospital, Jaipur, India",
    image: "/Images/homepage/section7/image18.webp",
  },
  {
    name: "Dr. Ritwick Raj Bhuyan",
    title: "MBBS, MS, MCh",
    details: "DIRECTOR CARDIO THORACIC VASCULAR SURGERY | Fortis Okhla",
    image: "/Images/homepage/section7/image19.webp",
  },
  {
    name: "Dr. Harish Badami",
    title: "MBBS | MS | MCh (C.T.V.S)",
    details: "Consultant Cardiac Thoracic Surgeon, Parthima Hospital, Kachiguda, Hyderabad",
    image: "/Images/homepage/section7/image20.webp",
  },
];


// Interface for FacultyCard props
interface FacultyCardProps {
  faculty: Faculty;
}

// Component for a single faculty card
const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => (
  <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <Image
      src={faculty.image}
      alt={faculty.name}
      width={373}
      height={378}
      className="rounded-xl w-full h-auto max-w-[280px] aspect-square object-cover mb-4" // Removed border-4 border-[#A67950]
      priority={true}
    />
    <h3
      className="mt-4 text-xl font-bold"
      style={{
        fontFamily: "DM Serif Text, serif",
        fontWeight: 400,
        color: "#401323",
      }}
    >
      {faculty.name}
    </h3>
    <p
      className="mt-1 text-sm italic"
      style={{
        fontFamily: "Lato, sans-serif",
        color: "#D2A073",
      }}
    >
      {faculty.title}
    </p>
    <p
      className="mt-3 text-base font-medium"
      style={{
        fontFamily: "Lato, sans-serif",
        color: "#A67950",
        lineHeight: "1.5",
      }}
    >
      {faculty.details}
    </p>
  </div>
);


const FacultyCardPage: React.FC = () => {
  return (
    // Added a container with decorative squares for visual similarity to the image
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Absolute positioned decorative elements (light beige squares) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {/* Simple grid to scatter the elements */}
        <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
          <div className="border border-[#D2A073] h-24 w-24 m-8 row-start-1 col-start-1"></div>
          <div className="border border-[#D2A073] h-16 w-16 m-12 row-start-2 col-start-2"></div>
          <div className="border border-[#D2A073] h-32 w-32 m-16 row-start-1 col-end-5"></div>
          <div className="border border-[#D2A073] h-20 w-20 m-4 row-start-4 col-start-3"></div>
          <div className="border border-[#D2A073] h-28 w-28 m-10 row-start-3 col-end-5"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Header */}
        <header className="mb-12 text-center">
          <h1
            className="text-5xl font-extrabold sm:text-6xl"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: 530,
              color: "#A67950",
            }}
          >
            Meet Our Faculty
          </h1>
          <p className="mt-4 text-xl text-gray-600" style={{ fontFamily: "Lato, sans-serif" }}>
            Renowned surgeons and clinical leaders guiding the next generation of robotic surgery.
          </p>
        </header>

        {/* =========================================================
            Cardiac / International Faculties Section
        ========================================================= */}
        <div className="mt-20">
          <h2
            className="text-4xl sm:text-5xl mb-4"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: 530,
              color: "#401323", // Dark color for main section title
            }}
          >
            Cardiac
          </h2>
          <p
            className="text-lg italic mb-12"
            style={{
              fontFamily: "Lato, sans-serif",
              color: "#A67950", // Lighter color for subheading
            }}
          >
            International Faculties
          </p>

          {/* Faculty Grid for International Cardiac */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {internationalCardiacFaculty.map((faculty, index) => (
              <FacultyCard key={`int-${index}`} faculty={faculty} />
            ))}
          </div>
        </div>
        
        {/* Divider for next section */}
        <hr className="my-20 border-[#D2A073] border-t-2 max-w-4xl mx-auto" />

        {/* =========================================================
            Other Faculty (e.g., Domestic/Other Specialities)
            I've added a generic heading for the remaining faculty.
        ========================================================= */}
        <div className="mt-20">
          <h2
            className="text-4xl sm:text-5xl mb-12"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: 530,
              color: "#401323",
            }}
          >
            National Faculties
          </h2>
          
          {/* Faculty Grid for Other Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {otherFaculty.map((faculty, index) => (
              <FacultyCard key={`other-${index}`} faculty={faculty} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCardPage;