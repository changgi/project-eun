---
name: efmc-design-system
description: "은평구시설관리공단 기관변천사 웹사이트의 디자인 시스템을 생성하는 스킬. DESIGN.md 파일에 색상 토큰, 타이포그래피, 컴포넌트 스펙, 애니메이션 가이드라인을 정의한다. 디자인 시스템, 컬러 팔레트, UI 토큰 작업 시 이 스킬을 사용할 것."
---

# EFMC Design System Generator

기존 HTML의 디자인 언어를 분석하고, awesome-design-md 형식의 DESIGN.md를 생성한다.

## 워크플로우

### Step 1: 기존 디자인 분석
기존 HTML(`C:\Users\Windows11 K\Downloads\efmc-history.html`)의 CSS 변수를 추출한다:
- `--primary: #3b82f6` (블루)
- `--accent: #06d6a0` (민트 그린)
- `--gold: #f59e0b`
- `--bg-dark: #0a0e1a`
- `--bg-card: #131830`

### Step 2: 디자인 토큰 확장
기존 팔레트를 유지하면서 더 풍부한 색상 스케일을 생성한다:

**Color Scale 생성 원칙:**
- Primary (Blue): 50~950 스케일 (Tailwind 패턴)
- Accent (Mint): 50~950 스케일
- Surface: bg-dark 기반 3~4단계
- Text: primary / secondary / muted
- Semantic: success / warning / error / info
- Gradient: primary → accent 방향의 프리셋 3개

### Step 3: 타이포그래피 정의
```
폰트 패밀리:
- 본문: Pretendard (한글), Inter (영문)
- 숫자: Tabular Lining (고정폭 숫자)

타입 스케일 (Major Third = 1.25):
- display: clamp(2.5rem, 5vw, 4.5rem) / weight 900
- h1: clamp(2rem, 4vw, 3rem) / weight 800
- h2: clamp(1.5rem, 3vw, 2.25rem) / weight 700
- h3: 1.25rem / weight 600
- body: 1rem / weight 400
- caption: 0.875rem / weight 500
- small: 0.75rem / weight 400
```

### Step 4: 애니메이션 가이드라인
```
이징:
- ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1) — 등장 애니메이션
- ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1) — 루프 애니메이션
- spring: { stiffness: 300, damping: 30 } — Framer Motion

듀레이션:
- fast: 150ms (호버, 포커스)
- normal: 300ms (전환)
- slow: 500ms (reveal, 등장)
- stagger: 80ms (순차 등장 간격)

스크롤 애니메이션:
- reveal: translateY(30px) + opacity 0 → visible
- slide-in: translateX(-30px) + opacity 0 → visible
- scale-in: scale(0.95) + opacity 0 → visible
```

### Step 5: 컴포넌트 스펙
각 컴포넌트의 시각적 속성을 정의한다:

**Card (기본):**
- background: surface-card
- border: 1px solid border-default
- border-radius: 16px
- padding: 2rem
- hover: translateY(-4px) + border-color 변경 + shadow 추가
- transition: all 300ms ease-out-expo

**Glassmorphism Card:**
- background: rgba(19, 24, 48, 0.7)
- backdrop-filter: blur(20px)
- border: 1px solid rgba(59, 130, 246, 0.15)

**Navigation:**
- background: rgba(10, 14, 26, 0.92)
- backdrop-filter: blur(20px)
- border-bottom: 1px solid border-default
- 스크롤 다운 시: transform translateY(-100%)

**Timeline Node:**
- dot: 12px circle, primary color, glow shadow
- highlight dot: 16px circle, accent color, bigger glow
- line: 2px gradient (primary → accent → transparent)

**Badge/Pill:**
- padding: 0.4rem 1.2rem
- border-radius: 50px
- border: 1px solid border-default
- font-size: 0.8rem, uppercase, letter-spacing: 2px

### Step 6: 출력
모든 토큰과 가이드라인을 `_workspace/01_design-system/DESIGN.md`에 작성한다. Tailwind CSS v4 @theme 블록과 호환되는 형식으로 토큰을 정리한다.
