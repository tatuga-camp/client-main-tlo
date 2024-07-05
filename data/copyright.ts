export const menuNrruCopyright2 = [
  "หนังสืออักษรเบรลล์",
  "สื่อภาษามือ",
  "ตัวหนังสือขุน แผนภาพขุน",
  "สื่อเพื่อการเรียนรู้และพัฒนาทักษะ",
  "สื่อที่มีลักษณะเป็นสื่อผสม",
  "หนังสือหรือภาพขยายใหญ่",
  "สื่อการสอนรูปทรงเรขาคณิต",
  "สื่ออิเล็กทรอนิกส์ตามมาตรฐานสากล",
  "สื่อเสียง",
  "คำบรรยายแทนเสียง",
  "รูปจำลอง",
];

export const menuNrruCopyright8 = [
  { title: "หนังสืออักษรเบรลล์" },
  { title: "สื่อที่มีลักษณะเป็นสื่อผสม" },
  { title: "สื่อเสียง" },
  { title: "สื่อภาษามือ" },
  { title: "สื่อที่มีลักษณะเป็นสื่อผสม" },
  { title: "คำบรรยายแทนเสียง" },
  { title: "ตัวหนังสือนูนแผนภาพนูน" },
  { title: "สื่อการสอนรูปทรงเรขาคณิต" },
  { title: "รูปจำลอง" },
  { title: "สื่อเพื่อการเรียนรู้และพัฒนาทักษะ" },
  { title: "สื่ออิเล็กทรอนิกส์ตามมาตรฐานสากล" },
];

export type HireDetailOptions =
  | "มีหนังสือตกลงว่าให้ผู้ว่าจ้างเป็นเจ้าของลิขสิทธิ์"
  | "ไม่มีหนังสือตกลงฯ";
export const hireDetailOptions = [
  "มีหนังสือตกลงว่าให้ผู้ว่าจ้างเป็นเจ้าของลิขสิทธิ์",
  "ไม่มีหนังสือตกลงฯ",
];

export type WorkQualityOptions =
  | "สร้างสรรค์ขึ้นเองทั้งหมด"
  | "สร้างสรรค์บางส่วน (ระบุ)"
  | "จ้างทำของ"
  | "ไม่มี"
  | "เป็นผู้ดัดแปลงโดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์"
  | "เป็นผู้รวบรวมหรือประกอบเข้ากัน โดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ( เช่น พจนานุกรม หรือเว็บเพจ)"
  | "เป็นผู้นำเอาข้อมูลหรือสิ่งอื่นใดมารวบรวมหรือประกอบเข้ากันในรูปฐานข้อมูลหรืออื่นๆ"
  | "อื่น ๆ (ระบุ)";

export const workQualityOptions = [
  "สร้างสรรค์ขึ้นเองทั้งหมด",
  "สร้างสรรค์บางส่วน (ระบุ)",
  "จ้างทำของ",
  "เป็นผู้ดัดแปลงโดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์",
  "เป็นผู้รวบรวมหรือประกอบเข้ากัน โดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ( เช่น พจนานุกรม หรือเว็บเพจ)",
  "เป็นผู้นำเอาข้อมูลหรือสิ่งอื่นใดมารวบรวมหรือประกอบเข้ากันในรูปฐานข้อมูลหรืออื่นๆ",
  "อื่น ๆ (ระบุ)",
] as const;

export type SignedDocumentDetailLists =
  | "ไม่เคยแจ้งหรือจดทะเบียน"
  | "แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)";
export const signedDocumentDetailLists = [
  "ไม่เคยแจ้งหรือจดทะเบียน",
  "แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)",
];

export type IsMarketingLists =
  | "ยังไม่ได้โฆษณา"
  | "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก";
export const isMarketingLists = [
  "ยังไม่ได้โฆษณา",
  "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก",
];

export type TranferPermissionOptions =
  | "ไม่เคยอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์"
  | "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่";
export const tranferPermissionOptions = [
  "ไม่เคยอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์",
  "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่",
];

export type TranferPermissionQualityOptions =
  | "โอนสิทธิทั้งหมด"
  | "โอนสิทธิบางส่วน (ระบุ)";
export const tranferPermissionQualityOptions = [
  "โอนสิทธิทั้งหมด",
  "โอนสิทธิบางส่วน (ระบุ)",
];

export type TranferPermissionDurationOptions =
  | "ตลอดอายุลิขสิทธิ์"
  | "มีกำหนดเวลา (ระบุ)";
export const tranferPermissionDurationOptions = [
  "ตลอดอายุลิขสิทธิ์",
  "มีกำหนดเวลา (ระบุ)",
];
