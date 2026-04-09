// ===== Type Definitions =====

export interface HeroStat {
  value: number;
  unit: string;
  label: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  stats: HeroStat[];
}

export interface OverviewItem {
  icon: string;
  title: string;
  description: string;
}

export interface Phase {
  id: number;
  label: string;
}

export interface TimelineItem {
  phase: number;
  date: string;
  title: string;
  desc: string;
  highlight: boolean;
}

export interface Leader {
  gen: string;
  name: string;
  initial: string;
  period: string;
  current: boolean;
}

export interface BusinessItem {
  icon: string;
  name: string;
}

export interface BusinessTab {
  id: string;
  label: string;
  items: BusinessItem[];
}

export interface Feature {
  num: string;
  title: string;
  desc: string;
}

export interface FooterData {
  brand: string;
  address: string;
  date: string;
}

export interface NavLink {
  id: string;
  label: string;
}

// ===== Data =====

export const navLinks: NavLink[] = [
  { id: "overview", label: "기관 개요" },
  { id: "timeline", label: "연혁" },
  { id: "gallery", label: "갤러리" },
  { id: "leaders", label: "역대 이사장" },
  { id: "business", label: "사업현황" },
  { id: "features", label: "특징" },
];

export const heroData: HeroData = {
  badge: "Since 2006",
  title: "은평구시설관리공단\n기관변천사",
  subtitle: "주차장, 체육시설, 공공시설 관리를 넘어\n구민의 일상을 함께하는 20년의 발자취",
  stats: [
    { value: 20, unit: "년", label: "설립 이후" },
    { value: 8, unit: "대", label: "역대 이사장" },
    { value: 1271, unit: "면", label: "주차면수" },
    { value: 6, unit: "개", label: "체육시설" },
  ],
};

export const overviewData: OverviewItem[] = [
  { icon: "\u{1F3DB}\uFE0F", title: "설립 근거", description: "서울특별시 은평구 시설관리공단 설치 및 운영에 관한 조례 (2005.8.10 제정)" },
  { icon: "\u{1F4C5}", title: "법인 설립", description: "2006년 8월 22일 법인 설립 등기 완료, 자본금 5억 원" },
  { icon: "\u{1F4CD}", title: "현재 위치", description: "서울특별시 은평구 통일로 684, 미래청 4층 (서울혁신파크)" },
  { icon: "\u{1F310}", title: "홈페이지", description: "efmc.or.kr — 주차, 체육, 시설관리 통합 서비스 제공" },
];

export const phases: Phase[] = [
  { id: 1, label: "1단계 설립 (2005~2006)" },
  { id: 2, label: "2단계 확장 (2007~2009)" },
  { id: 3, label: "3단계 인증 (2010~2013)" },
  { id: 4, label: "4단계 고도화 (2014~2017)" },
  { id: 5, label: "5단계 현재 (2018~)" },
];

export const timelineData: TimelineItem[] = [
  // Phase 1
  { phase: 1, date: "2005. 8. 10", title: "\u300C은평구시설관리공단 설치 및 운영에 관한 조례\u300D 제정", desc: "법적 설립 근거 마련 \u2014 은평구 공공시설 전문관리의 첫 걸음", highlight: true },
  { phase: 1, date: "2006. 8. 1", title: "임상묵 초대 이사장 취임", desc: "공단의 초석을 놓은 초대 이사장 취임", highlight: true },
  { phase: 1, date: "2006. 8. 22", title: "법인 설립 등기 완료", desc: "자본금 5억 원으로 공단 공식 출범", highlight: true },
  { phase: 1, date: "2006. 10. 1", title: "영업 개시", desc: "공영주차장 \u00B7 은평문화예술회관 \u00B7 은평구민체육센터 운영 시작", highlight: true },
  { phase: 1, date: "2006. 10. 15", title: "은평구립축구장 운영 개시", desc: "체육시설 운영의 시작", highlight: false },

  // Phase 2
  { phase: 2, date: "2007. 1. 2", title: "거주자우선주차구획 사업 개시", desc: "주민 밀착형 주차서비스 확대", highlight: false },
  { phase: 2, date: "2007. 1. 24", title: "K3 리그 축구대회 유치", desc: "지역 스포츠 활성화에 기여", highlight: false },
  { phase: 2, date: "2008. 5. 6", title: "제1차 중장기경영전략 수립", desc: "체계적 경영 기반 마련", highlight: false },
  { phase: 2, date: "2008. 12. 24", title: "한국서비스품질 우수기업 인증 획득", desc: "지식경제부 인증 \u2014 서비스 품질 우수성 공인", highlight: true },
  { phase: 2, date: "2009. 8. 22", title: "이원석 제2대 이사장 취임", desc: "사업 확장기를 이끈 2대 이사장", highlight: true },

  // Phase 3
  { phase: 3, date: "2010. 1. 1", title: "시설운영팀 신설", desc: "불광천 \u00B7 은평터널 \u00B7 어린이공원 \u00B7 마을마당 시설관리 및 구청사 환경관리 담당", highlight: true },
  { phase: 3, date: "2011. 6. 7", title: "황홍연 제3대 이사장 취임", desc: "조직 확대 및 인증 체계 구축기의 리더", highlight: false },
  { phase: 3, date: "2012. 2. 14", title: "ISO 9001 (품질경영시스템) 인증 취득", desc: "국제 표준 품질경영 시스템 도입", highlight: true },
  { phase: 3, date: "2013. 4. 23", title: "날씨경영 인정 획득", desc: "기상청 주관 \u2014 기후변화 대응 경영 인정", highlight: true },
  { phase: 3, date: "2013. 7. 9", title: "ISO 9001 / ISO 14001 재인증", desc: "품질경영 + 환경경영 동시 인증 달성", highlight: true },
  { phase: 3, date: "2013. 11. 15", title: "은평다목적체육관 사업 개시", desc: "체육시설 포트폴리오 확대", highlight: false },
  { phase: 3, date: "2013. 12. 9", title: "가족친화기업 인증", desc: "여성가족부 인증 \u2014 일-가정 양립 문화 조성", highlight: false },

  // Phase 4
  { phase: 4, date: "2014. 2. 18", title: "대한민국 녹색기후상 수상", desc: "국회기후변화포럼 \u2014 친환경 경영 성과 인정", highlight: false },
  { phase: 4, date: "2014. 6. 24", title: "대한민국 기상산업대상 수상", desc: "기상청 \u2014 기상정보 활용 우수 사례", highlight: false },
  { phase: 4, date: "2014. 9. 1", title: "이성일 제4대 이사장 취임", desc: "조직 고도화기의 리더", highlight: true },
  { phase: 4, date: "2015. 2. 2", title: "봉산도시자연공원 지하 공영주차장 사업 개시", desc: "도시공원 내 주차 인프라 구축", highlight: false },
  { phase: 4, date: "2017. 9. 1", title: "황도연 제5대 이사장 취임", desc: "사회서비스 영역 확장의 전환점", highlight: true },

  // Phase 5
  { phase: 5, date: "2018. 1. 1", title: "청사\u00B7보건소 환경관리 수탁 운영 개시", desc: "은평구청사, 보건소, 공중화장실, 은평역사한옥박물관 환경관리 포함", highlight: true },
  { phase: 5, date: "2025. 10. 1", title: "정희석 제8대 이사장 취임", desc: "현직 이사장 \u2014 새로운 시대를 이끌다", highlight: true },
];

export const leadersData: Leader[] = [
  { gen: "초대", name: "임상묵", initial: "임", period: "2006. 8. 1 ~", current: false },
  { gen: "제2대", name: "이원석", initial: "이", period: "2009. 8. 22 ~", current: false },
  { gen: "제3대", name: "황홍연", initial: "황", period: "2011. 6. 7 ~", current: false },
  { gen: "제4대", name: "이성일", initial: "이", period: "2014. 9. 1 ~", current: false },
  { gen: "제5대", name: "황도연", initial: "황", period: "2017. 9. 1 ~", current: false },
  { gen: "제7대", name: "이현찬", initial: "이", period: "\u2014", current: false },
  { gen: "제8대", name: "정희석", initial: "정", period: "2025. 10. 1 ~", current: true },
];

export const businessTabs: BusinessTab[] = [
  {
    id: "parking",
    label: "\u{1F697} 주차사업",
    items: [
      { icon: "\u{1F17F}\uFE0F", name: "공영주차장 직영 8개소" },
      { icon: "\u{1F464}", name: "민간위탁 주차장 3개소" },
      { icon: "\u{1F4CA}", name: "총 1,271면 운영" },
      { icon: "\u{1F3E0}", name: "거주자우선주차구획 사업" },
    ],
  },
  {
    id: "sports",
    label: "\u26BD 체육사업",
    items: [
      { icon: "\u{1F3CA}", name: "은평구민체육센터" },
      { icon: "\u26BD", name: "은평구립축구장" },
      { icon: "\u{1F3C0}", name: "은평다목적체육관" },
      { icon: "\u{1F3BE}", name: "은평구립테니스장" },
      { icon: "\u{1F3CA}", name: "은평 청여울수영장" },
      { icon: "\u{1F9D7}", name: "은평인공암벽장 / 익스트림은평 (2025 신규)" },
    ],
  },
  {
    id: "facility",
    label: "\u{1F3D7}\uFE0F 시설관리",
    items: [
      { icon: "\u{1F3DB}\uFE0F", name: "은평구청사 \u00B7 구의회 환경관리" },
      { icon: "\u{1F3E5}", name: "보건소(보건지소) 환경관리" },
      { icon: "\u{1F3EF}", name: "은평역사한옥박물관 환경관리" },
      { icon: "\u{1F333}", name: "불광천 \u00B7 어린이공원 \u00B7 마을마당 관리" },
      { icon: "\u{1F4A7}", name: "은평뉴타운 실개천 \u00B7 교통섬 관리" },
      { icon: "\u267B\uFE0F", name: "자원업사이클링 사업" },
      { icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", name: "구립경로당 시설 관리" },
    ],
  },
];

export const featuresData: Feature[] = [
  { num: "01", title: "관리 범위의 단계적 확대", desc: "초기 주차장\u00B7체육시설 중심에서 구청사\u00B7보건소\u00B7하천\u00B7공원\u00B7한옥박물관\u00B7암벽장 등으로 점진적 확장" },
  { num: "02", title: "조직 내부화", desc: "민간위탁으로 운영되던 시설을 직영으로 전환하는 경향" },
  { num: "03", title: "인증 체계 구축", desc: "ISO 9001, ISO 14001, 날씨경영 인정, 가족친화기업 인증 등 각종 경영 인증을 단계적으로 취득" },
  { num: "04", title: "사회서비스 영역 진입", desc: "2018년 이후 청사 환경관리\u00B7공중화장실 등 생활밀착형 공공서비스로 역할 확장" },
];

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
}

export const galleryData: GalleryItem[] = [
  { src: 'https://efmc.or.kr/File/Download/95e2dfbb02ea3b23b2d847cf8d2d7885', alt: '은평구민체육센터 외관', title: '체육센터 외관' },
  { src: 'https://efmc.or.kr/File/Download/6a260f97b8a6874aa8f8dbf7ed9833a8', alt: '은평구민체육센터 내부', title: '체육센터 내부' },
  { src: 'https://efmc.or.kr/File/Download/42897bbcbbb13b948270c1df72ac9e4e', alt: '수영장 외관', title: '수영장 외관' },
  { src: 'https://efmc.or.kr/File/Download/c6fb41110b16635bbcd0bd799c38dfb0', alt: '수영장 내부', title: '수영장 내부' },
  { src: 'https://efmc.or.kr/File/Download/358577b4ad4451c28b1cd34719310782', alt: '축구장', title: '은평구립축구장' },
  { src: 'https://efmc.or.kr/File/Download/8a791bac5351c7e016e659482f3df97e', alt: '인공암벽장', title: '인공암벽장' },
  { src: 'https://efmc.or.kr/File/Download/e1af166151aada73128990d196be7d52', alt: '익스트림은평 실내', title: '익스트림은평' },
  { src: 'https://efmc.or.kr/File/Download/3c522b641dd7bd62b6abe919e617c5af', alt: '클라이밍 파노라마', title: '클라이밍 파노라마' },
  { src: 'https://efmc.or.kr/File/Download/15625f0d0b93d6f122e09e48ab536a64', alt: '캠핑장 전경', title: '캠핑장 전경' },
  { src: 'https://efmc.or.kr/File/Download/6093a20a46fefd2668d3e399c1216da1', alt: '야외 클라이밍', title: '야외 클라이밍' },
];

export const footerData: FooterData = {
  brand: "은평구시설관리공단",
  address: "서울특별시 은평구 통일로 684, 미래청 4층 (녹번동, 서울혁신파크)",
  date: "작성 기준일: 2026년 4월 8일",
};
