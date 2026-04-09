---
name: efmc-qa
description: "은평구시설관리공단 기관변천사 Next.js 프로젝트의 품질을 검증하고 수정하는 스킬. 빌드 검증, 콘텐츠 정합성, 반응형 레이아웃, 접근성을 확인한다. QA, 테스트, 빌드 검증, 버그 수정 시 이 스킬을 사용할 것."
---

# EFMC QA Review

빌드된 프로젝트를 검증하고, 발견된 문제를 직접 수정한다.

## 검증 워크플로우

### Step 1: 빌드 검증
```bash
cd C:/project-eun && npm run build
```
빌드 실패 시 에러를 분석하고 수정한다. 최대 3회 재시도.

**빈번한 빌드 에러와 수정법:**
- `'use client'` 누락: Framer Motion, useState, useEffect 사용 컴포넌트에 추가
- 타입 에러: props 타입 정의 확인, 필요시 인터페이스 수정
- Import 에러: 파일 경로 대소문자 확인 (Windows에서 중요)
- GSAP SSR 에러: dynamic import + `ssr: false` 또는 useEffect 안에서만 사용

### Step 2: 콘텐츠 정합성 검증
기존 HTML 파일(`C:\Users\Windows11 K\Downloads\efmc-history.html`)과 `src/data/content.ts`를 대조:

1. 히어로 숫자 4개 (20, 8, 1271, 6) 확인
2. 기관개요 카드 4개 텍스트 확인
3. 타임라인 항목: Phase 1 (5개), Phase 2 (5개), Phase 3 (7개), Phase 4 (5개), Phase 5 (2개) = 총 24개
4. 역대 이사장 7명 (초대~제8대, 제6대 없음 주의)
5. 사업현황: 주차 4개, 체육 6개, 시설관리 7개
6. 특징 4개

### Step 3: 경계면 교차 검증
- `content.ts`의 데이터 타입 ↔ 각 섹션 컴포넌트의 props 타입 일치 확인
- 컴포넌트 import 경로 ↔ 실제 파일 위치 교차 확인
- Tailwind 클래스 ↔ tailwind.config.ts 커스텀 테마 정의 매칭

### Step 4: 코드 품질
- 불필요한 `any` 타입 제거
- 미사용 import 제거
- React key prop 누락 확인 (map 렌더링)
- useEffect 의존성 배열 확인

### Step 5: 수정 사항 적용
발견된 모든 문제를 직접 수정한다. 수정 후 `npm run build` 재실행으로 확인.

### Step 6: QA 보고서
`_workspace/03_qa/qa-report.md`에 결과를 기록:
- 발견된 문제 수
- 수정된 문제 수
- 미해결 이슈 (있다면)
- 최종 빌드 상태
