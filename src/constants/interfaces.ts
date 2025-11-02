import { BtnProps } from "@/components/ui/btn";
import {
  BoxProps,
  ButtonProps,
  MenuItemProps,
  StackProps,
  TableCellProps,
  TableColumnHeaderProps,
} from "@chakra-ui/react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Type__DateRange,
  Type__DateRangePresets,
  Type__DisclosureSizes,
  Type__MaterialType,
  Type__TimeRange,
} from "./types";
import { ReactNode } from "react";

// CMS
export interface Interface__CMSFAQs extends Interface__CUD {
  id: string;
  question: Interface__CMSTextContent;
  answer: Interface__CMSTextContent;
}
export interface Interface__CMSLegalDocs extends Interface__CUD {
  id: string;
  title: Interface__CMSTextContent;
  description: Interface__CMSTextContent;
  document: Interface__StorageFile[];
}
export interface Interface__CMSTextContent {
  id: string;
  en: string;
}

// KMIS
export interface Interface__KMISTopic extends Interface__CUD {
  id: string;
  category: Interface__KMISTopicCategory;
  topicCover: Interface__StorageFile[];
  title: string;
  description: string;
  totalQuiz: number;
  totalViews?: number;
  quizDuration: number; // seconds
}
export interface Interface__KMISMaterial extends Interface__CUD {
  id: string;
  createdUser: Interface__User;
  uploadedUser: Interface__User;
  topic: Interface__KMISTopic;
  materialFiles: Interface__StorageFile[];
  materialCover: Interface__StorageFile[];
  title: string;
  materialType: Type__MaterialType;
  materialUrl: any;
  description: string;
  isPublic: boolean;
  isCompleted?: boolean;
}
export interface Interface__KMISQuiz extends Interface__CUD {
  id: string;
  topic: Interface__KMISTopic;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctOption: string;
  explanation: string;
}
export interface Interface__KMISLearningAttempt extends Interface__CUD {
  id: string;
  attemptUser: Interface__User;
  topic: Interface__KMISTopic;
  attemptStatus: number;
  assessmentStatus: boolean;
  totalMaterial: number;
  completedMaterial: number;
  completedQuiz: number;
  quizStarted: string;
  quizFinished: string;
  questionsAnswered: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  scoreTotal: number;
  feedback?: number | null;
  feedbackComment?: string | null;
  certificate: Interface__StorageFile[];
}
export interface Interface__KMISQuizResponse {
  selectedOption: string;
  isMarker: boolean | number;
  isCorrect: boolean | number;
  quiz: Interface__KMISQuiz;
}
export interface Interface__KMISEducator extends Interface__CUD {
  id: string;
  user: Interface__User;
  totalMaterial: number;
}
export interface Interface__KMISStudent extends Interface__CUD {
  id: string;
  user: Interface__User;
  totalTopic: number;
  totalAttempts: number;
  totalFinished: number;
  avgScoreFinished: number;
}
export interface Interface__KMISTopicCategory extends Interface__CUD {
  id: string;
  categoryCover: Interface__StorageFile[];
  title: string;
  description: string;
}

// Auth
export interface Interface__User extends Interface__CUD {
  id: string;
  photoProfile: Interface__StorageFile[];
  name: string;
  email: string;
  role: Interface__Role;
  accountStatus: string | number;
  // optional
  gender: boolean | number | null; // 1 male, 0 female
  phoneNumber: string | null;
  birthDate: string | null;
  address: string | null;
  // audit timestamps
  registerAt: string;
  lastLogin: string | null;
  lastChangePassword: string | null;
  deactiveAt: string | null;
}
export interface Interface__Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// CMS
export interface Interface__CMSDocument extends Interface__CUD {
  id: number;
  title: Interface__CMSContentText;
  description: Interface__CMSContentText;
  file: Interface__StorageFile[];
}
export interface Interface_CMSActivityCategory extends Interface__CUD {
  id: number;
  name: Interface__CMSContentText;
  description: Interface__CMSContentText;
}
export interface Interface__CMSActivity extends Interface__CUD {
  id: number;
  eventCategory: Interface_CMSActivityCategory;
  thumbnail: Interface__StorageFile[];
  title: Interface__CMSContentText;
  description: Interface__CMSContentText;
  eventContent: Interface__CMSContentText;
  plannedDate: string;
}
export interface Interface_CMSNewsCategory extends Interface__CUD {
  id: number;
  name: Interface__CMSContentText;
  description: Interface__CMSContentText;
}
export interface Interface__CMSNews extends Interface__CUD {
  id: number;
  newsCategory: Interface_CMSNewsCategory;
  thumbnail: Interface__StorageFile[];
  title: Interface__CMSContentText;
  slug: Interface__CMSContentText;
  description: Interface__CMSContentText;
  newsContent: Interface__CMSContentText;
}
export interface Interface_CMSContent extends Interface__CUD {
  id: number;
  type: string;
  content: any;
}
export interface Interface__CMSContentText {
  id: string;
  en: string;
}

// Navs
export interface Interface__NavItem {
  groupLabelKey?: string;
  list: {
    icon?: any;
    labelKey: string;
    descriptionKey?: string;
    external?: boolean;
    path: string;
    backPath?: string;
    subMenus?: Interface__NavItem[];
  }[];
}

// Data Table
export interface Interface__FormattedTableHeader {
  th: string;
  sortable?: boolean;
  headerProps?: TableColumnHeaderProps;
  wrapperProps?: StackProps;
}
export interface Interface__FormattedTableData {
  id: number;
  idx: number;
  data: any;
  columns: {
    td: any;
    value: any;
    dataType?: string; // "string" | "number" | "date" | "time" |
    tableCellProps?: TableCellProps;
    wrapperProps?: StackProps;
  }[];
}
export interface Interface__TableOption {
  disabled?: boolean;
  label?: string;
  icon?: any;
  onClick?: (data: any) => void;
  confirmation?: (dataParams: any) => {
    id: string;
    title: string;
    description: string;
    confirmLabel: string;
    onConfrim: () => void;
    confirmButtonProps?: BtnProps;
  };
  menuItemProps?: Partial<MenuItemProps>;
  override?: (data: any) => ReactNode;
}

// HTTP
export interface Interface__RequestState<T = any> {
  loading: boolean;
  status: number | null;
  error: any;
  response: AxiosResponse<T> | null;
}
export interface Interface__Req<T = any> {
  config: AxiosRequestConfig;
  onResolve?: {
    onSuccess?: (r: AxiosResponse<T>) => void;
    onError?: (e: any) => void;
  };
}

// CUD
export interface Interface__CUD {
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

// Storage
export interface Interface__StorageFile extends Interface__CUD {
  id: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
  fileMimeType: string;
  fileSize: string;
}

// Select Input
export interface Interface__SelectOption {
  id: any;
  label: any;
  label2?: any;
  original_data?: any;
  disabled?: boolean;
}

// Date Range Picker Input
export interface Interface__DateRangePicker extends ButtonProps {
  id?: string;
  name?: string;
  title?: string;
  onConfirm?: (inputValue: Type__DateRange) => void;
  inputValue?: Type__DateRange;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  disclosureSize?: Type__DisclosureSizes;
  preset?: Type__DateRangePresets[];
  maxRange?: number;
}

// Time Range Picker Input
export interface Interface__TimeRangePicker extends ButtonProps {
  id?: string;
  name?: string;
  title?: string;
  onConfirm?: (inputValue: Type__TimeRange | undefined) => void;
  inputValue?: Type__TimeRange | undefined;
  withSeconds?: boolean;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  disclosureSize?: Type__DisclosureSizes;
}

// Divider
export interface Interface__Divider extends BoxProps {
  dir?: "vertical" | "horizontal";
}
