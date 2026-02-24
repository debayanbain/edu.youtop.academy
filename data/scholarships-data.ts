export interface Scholarship {
  id: string;
  slug: string;
  title: string;
  description: string;
  provider: string;
  logo: string;
  amount: string;
  awardDetails: string;
  eligibilitySummary: string;
  deadline: string;
  daysRemaining?: number;
  type: "State" | "National" | "Private";
  state?: "West Bengal" | "Other";
  category: "Indian" | "International" | "Domain-Specific";
  status: "Live" | "Upcoming" | "Always Open";
  domain?: string;
  eligibility: string[];
  benefits: string[];
  applicationLink: string;
  featured?: boolean;
}

export const scholarships: Scholarship[] = [
  {
    id: "1",
    slug: "inspire-scholarship-he-2026",
    title: "INSPIRE Scholarship for Higher Education (SHE)",
    description:
      "Scholarship for students pursuing Bachelor and Masters level courses in Natural and Basic Sciences.",
    provider: "DST, Government of India",
    logo: "https://online-inspire.gov.in/Content/images/logo.png",
    amount: "₹80,000 per annum",
    awardDetails:
      "Provides ₹60,000 cash scholarship and ₹20,000 summer mentorship grant.",
    eligibilitySummary:
      "Top 1% in Class 12th Board Exam, pursuing Natural/Basic Sciences.",
    deadline: "2026-12-31",
    daysRemaining: 310,
    type: "National",
    category: "Indian",
    status: "Live",
    featured: true,
    eligibility: [
      "Top 1% in Class 12th Board Exam",
      "Pursuing courses in Natural and Basic Sciences",
      "Age between 17-22 years",
    ],
    benefits: ["₹60,000 cash scholarship", "₹20,000 summer mentorship grant"],
    applicationLink: "https://online-inspire.gov.in/",
  },
  {
    id: "2",
    slug: "pm-modi-scholarship-scheme-2026",
    title: "Prime Minister's Scholarship Scheme (PMSS)",
    description:
      "Scholarship for wards and widows of deceased/ex-service personnel of Armed Forces.",
    provider: "Kendriya Sainik Board",
    logo: "https://ksb.gov.in/images/logo.png",
    amount: "₹2,500 - ₹3,000 per month",
    awardDetails: "Monthly stipend of ₹3,000 for girls and ₹2,500 for boys.",
    eligibilitySummary: "Wards of Ex-Servicemen with min 60% in Class 12.",
    deadline: "2026-03-15",
    daysRemaining: 19,
    type: "National",
    category: "Indian",
    status: "Live",
    eligibility: [
      "Wards of Ex-Servicemen",
      "Minimum 60% in Class 12 or Equivalent",
      "Pursuing first professional degree (BE, B.Tech, MBBS, etc.)",
    ],
    benefits: ["₹3,000 for girls", "₹2,500 for boys"],
    applicationLink: "https://ksb.gov.in/",
  },
  {
    id: "3",
    slug: "google-generation-scholarship-2026",
    title: "Generation Google Scholarship (APAC)",
    description:
      "Scholarship for women in computer science to help excel in technology and become leaders in the field.",
    provider: "Google",
    logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    amount: "$1,000 (Approx. ₹83,000)",
    awardDetails: "A one-time award of $1,000 for the academic year.",
    eligibilitySummary:
      "Women students in CS or related technical fields across APAC.",
    deadline: "2026-05-15",
    daysRemaining: 80,
    type: "Private",
    category: "Domain-Specific",
    status: "Upcoming",
    domain: "Computer Science",
    featured: true,
    eligibility: [
      "Currently enrolled in a university",
      "Studying Computer Science or related technical field",
      "Academic excellence and leadership potential",
    ],
    benefits: ["One-time financial award", "Google mentorship opportunities"],
    applicationLink:
      "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac",
  },
  {
    id: "4",
    slug: "tata-scholarship-cornell-2026",
    title: "Tata Scholarship at Cornell University",
    description:
      "Full scholarship for Indian citizens to pursue undergraduate studies at Cornell University.",
    provider: "Tata Trust",
    logo: "https://www.tatatrusts.org/assets/img/logo.png",
    amount: "Full Tuition Fee",
    awardDetails: "Covers full tuition fees and potentially living expenses.",
    eligibilitySummary:
      "Indian citizens admitted to Cornell for undergraduate programs.",
    deadline: "2026-01-02",
    type: "Private",
    category: "International",
    status: "Always Open",
    eligibility: [
      "Indian citizen",
      "Admitted to Cornell University as an undergraduate",
      "Demonstrate financial need",
    ],
    benefits: [
      "Full tuition fees",
      "Living expenses (in cases of extreme need)",
    ],
    applicationLink:
      "https://admissions.cornell.edu/apply/international-students/tata-scholarship",
  },
  {
    id: "5",
    slug: "adobe-india-women-in-tech-2026",
    title: "Adobe India Women-in-Technology Scholarship",
    description:
      "Scholarship for women students in India to support their education and careers in technology.",
    provider: "Adobe India",
    logo: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Logo_no_tag_300x75.png",
    amount: "Tuition + Internship",
    awardDetails:
      "Full tuition fee for one year and a paid internship opportunity.",
    eligibilitySummary:
      "Female students in CS/IT courses with strong academic record.",
    deadline: "2026-09-30",
    daysRemaining: 210,
    type: "Private",
    category: "Domain-Specific",
    status: "Live",
    domain: "Technology",
    eligibility: [
      "Female student enrolled in an Indian university",
      "Studying CS or Engineering",
      "Academic performance and technical skills",
    ],
    benefits: [
      "Internship at Adobe India",
      "Tuition fee coverage for one year",
    ],
    applicationLink:
      "https://www.adobe.com/in/ideas/adobe-india-women-in-technology-scholarship.html",
  },
  {
    id: "6",
    slug: "swami-vivekananda-merit-cum-means-2026",
    title: "Swami Vivekananda Merit-cum-Means (SVMCM)",
    description:
      "Scholarship for meritorious students of West Bengal belonging to economically backward families.",
    provider: "Govt. of West Bengal",
    logo: "https://svmcm.wbhed.gov.in/images/logo.png",
    amount: "Up to ₹60,000 per year",
    awardDetails: "Monthly stipend of ₹1,000 to ₹5,000 based on the course.",
    eligibilitySummary: "WB residents with 60% in last exam and income < 2.5L.",
    deadline: "2026-02-28",
    daysRemaining: 4,
    type: "State",
    state: "West Bengal",
    category: "Indian",
    status: "Live",
    eligibility: [
      "Resident of West Bengal",
      "Minimum 60% in last qualifying exam",
      "Family income less than ₹2.5 Lakh per annum",
    ],
    benefits: [
      "Monthly stipend based on course",
      "Financial support for higher education",
    ],
    applicationLink: "https://svmcm.wbhed.gov.in/",
  },
  {
    id: "7",
    slug: "oasis-scholarship-west-bengal-2026",
    title: "Oasis Scholarship (Pre-Matric & Post-Matric)",
    description:
      "Scholarship portal for students belonging to SC/ST/OBC categories in West Bengal.",
    provider: "Govt. of West Bengal",
    logo: "https://oasis.gov.in/images/logo.png",
    amount: "Variable Stipend",
    awardDetails:
      "Maintenance allowance and fee reimbursement for SC/ST students.",
    eligibilitySummary: "SC/ST/OBC students of WB with valid certificates.",
    deadline: "2026-03-31",
    daysRemaining: 35,
    type: "State",
    state: "West Bengal",
    category: "Indian",
    status: "Live",
    eligibility: [
      "Resident of West Bengal",
      "Belonging to SC/ST/OBC category",
      "Income limit as per category norms",
    ],
    benefits: ["Hostel and maintenance allowance", "Tuition fee support"],
    applicationLink: "https://oasis.gov.in/",
  },
  {
    id: "8",
    slug: "national-means-cum-merit-2026",
    title: "National Means-cum-Merit Scholarship (NMMS)",
    description:
      "Centrally sponsored scheme for meritorious students of economically weaker sections.",
    provider: "Ministry of Education",
    logo: "https://scholarships.gov.in/public/images/logo.png",
    amount: "₹12,000 per annum",
    awardDetails: "Financial assistance from Class 9 to 12.",
    eligibilitySummary: "Class 8 students with min 55% and income < 3.5L.",
    deadline: "2026-04-15",
    daysRemaining: 50,
    type: "National",
    category: "Indian",
    status: "Live",
    eligibility: [
      "Studying in Class 8",
      "Score at least 55% in Class 7",
      "Family income not exceeding ₹3,50,000",
    ],
    benefits: ["Yearly stipend of ₹12,000"],
    applicationLink: "https://scholarships.gov.in/",
  },
  {
    id: "9",
    slug: "hcl-tech-bee-scholarship-2026",
    title: "HCL TechBee Early Career Program",
    description:
      "Work-integrated learning program for Class 12th students with financial support.",
    provider: "HCL Technologies",
    logo: "https://www.hcltech.com/themes/custom/hcltech/logo.svg",
    amount: "Stipend + Fully Funded Degree",
    awardDetails: "Stipend during training and funding for higher education.",
    eligibilitySummary: "Class 12 students with strong STEM background.",
    deadline: "2026-06-30",
    daysRemaining: 120,
    type: "Private",
    category: "Domain-Specific",
    status: "Live",
    eligibility: [
      "Class 12 students",
      "Minimum percentage as per regional board norms",
      "Indian citizen",
    ],
    benefits: [
      "Monthly stipend",
      "Assured job at HCL after training",
      "Support for further education (B.Sc/B.Tech)",
    ],
    applicationLink: "https://www.hcltech.com/techbee",
  },
];
