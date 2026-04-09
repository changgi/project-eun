---
name: efmc-frontend-build
description: "은평구시설관리공단 기관변천사 웹사이트를 Next.js 15 + Tailwind CSS v4 + Framer Motion + GSAP으로 구현하는 스킬. 세계 최고 수준의 프론트엔드 UI/UX 기술을 적용한다. 프론트엔드 빌드, 컴포넌트 구현, 애니메이션 개발 시 이 스킬을 사용할 것."
---

# EFMC Frontend Build

Next.js 15 프로젝트를 생성하고, 디자인 시스템 기반으로 모든 섹션을 구현한다.

## 프로젝트 초기화

### Step 1: 프로젝트 생성
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

### Step 2: 의존성 설치
```bash
npm install framer-motion gsap @gsap/react
npm install -D @types/node
```

### Step 3: 폰트 설정
`src/app/layout.tsx`에서 next/font를 사용한다:
```typescript
import localFont from 'next/font/local'

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})
```
Pretendard 웹폰트는 CDN link로 대체 가능:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
```

## 콘텐츠 데이터

모든 콘텐츠를 `src/data/content.ts`에 타입 안전하게 정의한다. 상세 데이터는 `references/content-data.md` 참조.

## 컴포넌트 구현 순서

### 1. 기반 컴포넌트 (ui/)
가장 먼저 재사용 가능한 기반 컴포넌트를 만든다:

**ParticleCanvas.tsx** — Canvas API 기반 부유 파티클
- requestAnimationFrame 루프
- 모바일에서 파티클 수 줄임 (30 → 10)
- opacity 매우 낮게 (0.06~0.1)

**LoadingScreen.tsx** — 로딩 화면
- Framer Motion AnimatePresence로 사라짐 처리
- 로고 텍스트 + 프로그레스 바

**Card3D.tsx** — 3D 틸트 카드
```typescript
// 마우스 위치에 따라 rotateX, rotateY 계산
const handleMouseMove = (e: MouseEvent) => {
  const rect = ref.current.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  setRotate({ x: y * -10, y: x * 10 })
}
```
- perspective: 1000px
- 호버 시 그림자 + 보더 색상 변경

**MagneticButton.tsx** — 마그네틱 효과 버튼
- 마우스 접근 시 버튼이 살짝 끌려오는 효과
- Framer Motion useSpring 활용

**TextReveal.tsx** — 텍스트 등장 애니메이션
- 단어 단위 또는 줄 단위 순차 reveal
- Framer Motion variants + staggerChildren

**CountUp.tsx** — 숫자 카운터
- Framer Motion useMotionValue + animate
- 뷰포트 진입 시 트리거
- spring 이징으로 자연스러운 가속/감속

### 2. 레이아웃 컴포넌트 (layout/)

**Navigation.tsx**
- 스크롤 방향 감지: 아래로 → 숨김, 위로 → 표시
- 현재 섹션 하이라이트 (IntersectionObserver)
- 모바일 햄버거 메뉴 (AnimatePresence)
- glassmorphism 배경

**ScrollProgress.tsx**
- 페이지 스크롤 퍼센트 → 상단 프로그레스 바 너비
- 그라디언트 (primary → accent)

### 3. 섹션 컴포넌트 (sections/)

모든 섹션에 공통 적용:
- `motion.section`으로 래핑
- whileInView={{ opacity: 1, y: 0 }} 초기값 { opacity: 0, y: 30 }
- viewport={{ once: true, margin: "-100px" }}

**HeroSection.tsx**
- 그라디언트 메시 배경 (radial-gradient 레이어링)
- 히어로 텍스트: TextReveal 컴포넌트 활용
- 카운터 4개: CountUp 컴포넌트
- 스크롤 인디케이터: 무한 bounce 애니메이션
- "Since 2006" 뱃지: glassmorphism pill

**OverviewSection.tsx**
- 섹션 헤더: tag + h2 + subtitle
- 4개 카드: Card3D 컴포넌트 + staggered reveal
- 각 카드 상단에 그라디언트 accent line (호버 시 표시)
- 아이콘: emoji 또는 SVG

**TimelineSection.tsx**
- 5단계 필터 버튼 (pill 스타일, active 시 그라디언트 배경)
- 타임라인 트랙: 좌측 수직 선 (gradient)
- 각 항목: 날짜 + 내용 카드 + dot
- 단계 전환 시 AnimatePresence로 부드럽게
- GSAP ScrollTrigger: 타임라인 라인이 스크롤에 따라 그려지는 효과

**LeadersSection.tsx**
- 카드 그리드 (auto-fill, minmax(200px, 1fr))
- 아바타: 이니셜 원형 (gradient 배경)
- 현직 이사장: accent 보더 + "현직" 뱃지
- staggered reveal 애니메이션

**BusinessSection.tsx**
- 3개 탭 버튼 (주차/체육/시설관리)
- AnimatePresence로 탭 전환 애니메이션
- 각 항목: 아이콘 + 텍스트 (가로 배치)

**FeaturesSection.tsx**
- 넘버 카드: 01~04 큰 숫자 (gradient text)
- h3 + description
- staggered reveal

## 핵심 커스텀 훅

**useScrollDirection.ts** — 스크롤 방향 감지
**useInView.ts** — IntersectionObserver 래퍼 (Framer Motion의 것 활용 가능)
**useMagneticEffect.ts** — 마그네틱 좌표 계산

## 글로벌 CSS (`globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-primary-*: /* 디자인 시스템에서 */;
  --color-accent-*: /* 디자인 시스템에서 */;
  --color-surface-*: /* 디자인 시스템에서 */;
}

/* Noise texture overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* noise pattern */
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-surface-dark); }
::-webkit-scrollbar-thumb { background: var(--color-primary-500); border-radius: 3px; }

/* Selection */
::selection { background: rgba(59, 130, 246, 0.3); }
```

## 빌드 및 검증
구현 완료 후 반드시 `npm run build`를 실행하여 빌드 성공을 확인한다.
