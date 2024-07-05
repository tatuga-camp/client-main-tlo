export type DocumentType =
  | "PERSON"
  | "COPORATE"
  | "IDCARD"
  | "PRODUCT"
  | "OWNER"
  | "OTOP"
  | "REQUEST"
  | "TRADEMARK"
  | "OTHERS"
  | "AUTORIZEPERSON_COPORATE"
  | "AUTORIZEPERSON_OTOP"
  | "MEMBER";

export type UserRole = "ADMIN" | "USER";
export type UserType = "EXTERNAL" | "INTERNAL";
export type StatusPartner = "STAFF" | "STUDENT" | "EXTERNAL";
export type WorkType = "PETTY" | "INVENTION";
export type FileWorkType = "OWNERSHIP" | "RESEARCHRESULT" | "PUBLIC";
export type MenuSearchWorks =
  | "สิทธิบัตรหรืออนุสิทธิบัตร"
  | "วารสารวิชาการ"
  | "อื่น ๆ";

export type StatusLists = "PENDING" | "INPROGRESS" | "APPROVED" | "REJECTED";
export type NewsType = "news" | "knowledge";
