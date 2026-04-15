// ============================================================
// SHARED
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ============================================================
// ENUMS
// ============================================================

export type CourseType =
  | "GRAPHIC_DESIGN"
  | "INTRODUCTION_TO_AI"
  | "BASIC_PROGRAMMING"
  | "DIGITAL_CONTENT_CREATION"
  | "MICROSOFT_OFFICE_APPLICATION"
  | "GOOGLE_TOOLS_AND_ONLINE_COLLABORATION"
  | "E_GOVERNMENT_TOOLS_AND_SERVICES"
  | "COMPUTER_AND_DIGITAL_FOUNDATION";

// Human-readable labels for CourseType (use in dropdowns/UI)
export const COURSE_LABELS: Record<CourseType, string> = {
  GRAPHIC_DESIGN: "Graphic Design",
  INTRODUCTION_TO_AI: "Introduction to Artificial Intelligence",
  BASIC_PROGRAMMING: "Basic Programming",
  DIGITAL_CONTENT_CREATION: "Digital Content Creation",
  MICROSOFT_OFFICE_APPLICATION: "Microsoft Office Application",
  GOOGLE_TOOLS_AND_ONLINE_COLLABORATION: "Google Tools and Online Collaborations",
  E_GOVERNMENT_TOOLS_AND_SERVICES: "e-Government Tools and Services",
  COMPUTER_AND_DIGITAL_FOUNDATION: "Computer and Digital Foundation",
};

export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ServiceCategory =
  // Web & Digital
  | "WEBSITE_DEVELOPMENT"
  | "ONLINE_SETUP_AND_SUPPORT"
  // Government Services
  | "REMBO_SERVICES"
  | "RRA_SERVICES"
  | "RDB_SERVICES"
  | "RURA_SERVICES"
  | "MIFOTRA_SERVICES"
  | "ETC"
  // Career & Documents
  | "JOB_APPLICATIONS"
  | "SCHOLARSHIP_APPLICATIONS"
  | "CV_AND_COVER_LETTER_WRITING"
  | "PROJECT_PROPOSAL_WRITING"
  | "REPORT_WRITING_AND_EDITING"
  | "BOOK_WRITING_AND_FORMATTING"
  | "GENERAL_DOCUMENT_PREPARATION"
  // Creative
  | "PHOTOGRAPHY_AND_VIDEOGRAPHY"
  | "GRAPHIC_DESIGN"
  // Legal
  | "NOTARY_SERVICES"
  | "CASE_FILING_AND_LEGAL_REPRESENTATION"
  | "BAIL_APPLICATION_ASSISTANCE"
  | "COURT_CASE_SUBMISSION_AND_FILING"
  | "LEGAL_ADVISORY_AND_CONSULTATION"
  | "LEGALLY_RECOGNIZED_CONTRACTS_AND_AGREEMENTS";

// Human-readable labels for ServiceCategory (use in dropdowns/UI)
export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  WEBSITE_DEVELOPMENT: "Website Development",
  ONLINE_SETUP_AND_SUPPORT: "Online Setup & Support",
  REMBO_SERVICES: "Rembo Services",
  RRA_SERVICES: "RRA Services",
  RDB_SERVICES: "RDB Services",
  RURA_SERVICES: "RURA Services",
  MIFOTRA_SERVICES: "MIFOTRA Services",
  ETC : "ETC Services",
  JOB_APPLICATIONS: "Job Applications",
  SCHOLARSHIP_APPLICATIONS: "Scholarship Applications",
  CV_AND_COVER_LETTER_WRITING: "CV & Cover Letter Writing",
  PROJECT_PROPOSAL_WRITING: "Project Proposal Writing",
  REPORT_WRITING_AND_EDITING: "Report Writing & Editing",
  BOOK_WRITING_AND_FORMATTING: "Book Writing & Formatting",
  GENERAL_DOCUMENT_PREPARATION: "General Document Preparation & Editing",
  PHOTOGRAPHY_AND_VIDEOGRAPHY: "Photography & Videography",
  GRAPHIC_DESIGN: "Graphic Design",
  NOTARY_SERVICES: "Notary Services",
  CASE_FILING_AND_LEGAL_REPRESENTATION: "Case Filing & Legal Representation Support",
  BAIL_APPLICATION_ASSISTANCE: "Bail Application Assistance",
  COURT_CASE_SUBMISSION_AND_FILING: "Court Case Submission & Filing",
  LEGAL_ADVISORY_AND_CONSULTATION: "Legal Advisory & Consultation",
  LEGALLY_RECOGNIZED_CONTRACTS_AND_AGREEMENTS: "Legally Recognized Contracts & Agreements",
};

export type OrderStatus = "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";

export type InfoCategory = "JOB" | "OPPORTUNITY" | "ANNOUNCEMENT" | "EVENT";

export type AdminRole = "SUPER_ADMIN" | "ADMIN";

// ============================================================
// TRAINING APPLICATION
// ============================================================

export interface TrainingApplicationRequest {
  fullName: string;
  phone: string;
  email: string;
  selectedCourse: CourseType;
  preferredSchedule: string;
  experienceLevel: ExperienceLevel;
}

export interface TrainingApplication {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  selectedCourse: CourseType;
  preferredSchedule: string;
  experienceLevel: ExperienceLevel;
  status: ApplicationStatus;
  createdAt: string;
}

// GET all → ApiResponse<TrainingApplication[]>
// GET by id → ApiResponse<TrainingApplication>
// DELETE by id → ApiResponse<TrainingApplication>

// ============================================================
// SERVICE REQUEST
// ============================================================

export interface ServiceRequestBody {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceCategory: ServiceCategory;
  service: string;
  description: string;
  documentUrl: string;
  preferredDate: string;
  location: string;
  taskerId: number;
}

export interface StatusHistory {
  createdAt: string;
  note: string;
  status: string;
}

export interface TaskerInfo {
  email: string;
  phone: string;
  name: string;
}

export interface ServiceRequest {
  id: number;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  serviceCategory: string;
  service: string;
  description: string;
  documentUrl: string;
  preferredDate: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tasker: TaskerInfo;
  statusHistory: StatusHistory[];
}

export type UpdateServiceRequestBody = Partial<ServiceRequestBody>;

// GET all  → ApiResponse<ServiceRequest[]>
// GET by id → ApiResponse<ServiceRequest>
// PATCH     → ApiResponse<ServiceRequest>
// DELETE    → ApiResponse<ServiceRequest>

// ============================================================
// PRODUCT
// ============================================================

export interface ProductRequest {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: string;
}

export type UpdateProductRequest = Partial<ProductRequest>;

// GET all   → ApiResponse<Product[]>
// GET by id → ApiResponse<Product>
// PATCH     → ApiResponse<Product>
// DELETE    → ApiResponse<Product>

// ============================================================
// ORDER
// ============================================================

export interface OrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  quantity: number;
  note: string;
  productId: number;
}

export interface Order {
  id: number;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  address: string;
  quantity: number;
  note: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export type UpdateOrderRequest = Partial<OrderRequest>;

// GET all   → ApiResponse<Order[]>
// GET by id → ApiResponse<Order>
// PATCH     → ApiResponse<Order>
// DELETE    → ApiResponse<Order>

// ============================================================
// INFO / ANNOUNCEMENTS
// ============================================================

export interface InfoRequest {
  title: string;
  description: string;
  category: InfoCategory;
  deadline: string;
  location: string;
  applyLink: string;
  contactInfo: string;
}

export interface Info {
  id: number;
  title: string;
  description: string;
  category: InfoCategory;
  deadline: string;
  location: string;
  applyLink: string;
  contactInfo: string;
  isActive: boolean;
  createdAt: string;
}

export type UpdateInfoRequest = Partial<InfoRequest>;

// GET all   → ApiResponse<Info[]>
// GET by id → ApiResponse<Info>
// PATCH     → ApiResponse<Info>
// DELETE    → ApiResponse<Info>

// ============================================================
// AUTH
// ============================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Admin {
  id: number;
  fullName: string;
  profilePicture: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponseData {
  token: string;
  admin: Admin;
}

// POST login    → ApiResponse<LoginResponseData>
// GET profile   → ApiResponse<Admin>
// GET admins    → ApiResponse<Admin[]>
// PATCH deactivate → ApiResponse<Admin>
// DELETE admin  → ApiResponse<Admin>
