---
name: efmc-orchestrator
description: "은평구시설관리공단 기관변천사 웹사이트를 최신 프론트엔드 기술로 리빌드하는 오케스트레이터. 디자인 시스템 생성 → Next.js 프론트엔드 빌드 → QA 검증의 전체 파이프라인을 조율한다. 'EFMC 웹사이트 빌드', '기관변천사 리빌드', '프론트엔드 구현' 요청 시 반드시 이 스킬을 사용할 것."
---

# EFMC Orchestrator

은평구시설관리공단 기관변천사 웹사이트를 세계 최고 수준의 프론트엔드 기술로 리빌드하는 에이전트 팀을 조율한다.

## 실행 모드: 에이전트 팀

## 에이전트 구성

| 팀원 | 에이전트 정의 | 역할 | 스킬 | 출력 |
|------|-------------|------|------|------|
| design-architect | `.claude/agents/design-architect.md` | 디자인 시스템 생성 | efmc-design-system | `_workspace/01_design-system/DESIGN.md` |
| frontend-engineer | `.claude/agents/frontend-engineer.md` | Next.js 프로젝트 구현 | efmc-frontend-build | `src/` 디렉토리 전체 |
| qa-engineer | `.claude/agents/qa-engineer.md` | 빌드 검증 + 수정 | efmc-qa | `_workspace/03_qa/qa-report.md` |

## 워크플로우

### Phase 1: 준비
1. 프로젝트 디렉토리 확인: `C:/project-eun/`
2. `_workspace/` 디렉토리 생성
3. 기존 HTML 파일 존재 확인: `C:\Users\Windows11 K\Downloads\efmc-history.html`

### Phase 2: 팀 구성

1. 팀 생성:
```
TeamCreate(
  team_name: "efmc-rebuild",
  description: "EFMC 기관변천사 웹사이트 리빌드 팀"
)
```

2. 팀원 스폰 (Phase 2-A: design-architect 먼저):
```
Agent(
  name: "design-architect",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "너는 design-architect다. `.claude/agents/design-architect.md`와 `.claude/skills/efmc-design-system/skill.md`를 읽고 디자인 시스템을 생성하라. 기존 HTML 파일 `C:\\Users\\Windows11 K\\Downloads\\efmc-history.html`의 CSS 변수를 분석하고, _workspace/01_design-system/DESIGN.md와 tokens.json을 출력하라. 완료 후 리더에게 알려라.",
  team_name: "efmc-rebuild"
)
```

3. design-architect 완료 대기 후, frontend-engineer 스폰:
```
Agent(
  name: "frontend-engineer",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "너는 frontend-engineer다. `.claude/agents/frontend-engineer.md`와 `.claude/skills/efmc-frontend-build/skill.md`를 읽고 Next.js 15 프로젝트를 구현하라. `_workspace/01_design-system/DESIGN.md`의 디자인 시스템과 `.claude/skills/efmc-frontend-build/references/content-data.md`의 콘텐츠 데이터를 활용하라. 모든 섹션을 구현하고 `npm run build` 성공을 확인하라. 완료 후 리더에게 알려라.",
  team_name: "efmc-rebuild"
)
```

4. frontend-engineer 완료 후, qa-engineer 스폰:
```
Agent(
  name: "qa-engineer",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "너는 qa-engineer다. `.claude/agents/qa-engineer.md`와 `.claude/skills/efmc-qa/skill.md`를 읽고 프로젝트를 검증하라. `npm run build`를 실행하고, 빌드 에러를 수정하라. 기존 HTML `C:\\Users\\Windows11 K\\Downloads\\efmc-history.html`과 콘텐츠를 대조하라. 문제를 발견하면 직접 수정하고 재빌드하라. _workspace/03_qa/qa-report.md에 결과를 기록하라.",
  team_name: "efmc-rebuild"
)
```

### Phase 3: 디자인 시스템 생성
- design-architect가 DESIGN.md 생성
- 완료 시 리더에게 알림 → Phase 4 시작

### Phase 4: 프론트엔드 구현
- frontend-engineer가 Next.js 프로젝트 전체 구현
- 디자인 시스템 토큰을 Tailwind 설정에 반영
- 모든 섹션 컴포넌트 구현 + 애니메이션 적용
- `npm run build` 성공 확인
- 완료 시 리더에게 알림 → Phase 5 시작

### Phase 5: QA 검증
- qa-engineer가 빌드 검증 + 콘텐츠 정합성 확인
- 문제 발견 시 직접 수정 + 재빌드
- QA 보고서 생성

### Phase 6: 정리 및 보고
1. 팀원들에게 종료 요청:
```
SendMessage(to: "design-architect", message: { type: "shutdown_request" })
SendMessage(to: "frontend-engineer", message: { type: "shutdown_request" })
SendMessage(to: "qa-engineer", message: { type: "shutdown_request" })
```
2. 팀 정리: `TeamDelete`
3. `_workspace/` 보존
4. 사용자에게 결과 요약:
   - 빌드 성공 여부
   - 적용된 기술 스택
   - `npm run dev`로 확인하는 방법
   - 주요 UI/UX 기법 목록

## 데이터 흐름

```
[리더/오케스트레이터]
    │
    ├── Phase 2-A: design-architect 스폰
    │       │
    │       ↓
    │   _workspace/01_design-system/DESIGN.md
    │       │
    ├── Phase 2-B: frontend-engineer 스폰 (DESIGN.md 참조)
    │       │
    │       ↓
    │   src/ (Next.js 프로젝트 전체)
    │       │
    ├── Phase 2-C: qa-engineer 스폰 (src/ 검증)
    │       │
    │       ↓
    │   _workspace/03_qa/qa-report.md + 수정된 src/
    │
    └── Phase 6: 사용자에게 보고
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| design-architect 실패 | 기존 HTML의 CSS 변수를 그대로 사용하여 frontend-engineer 진행 |
| frontend-engineer 빌드 실패 | qa-engineer에게 수정 위임 |
| qa-engineer 수정 후에도 빌드 실패 | 리더가 에러 로그를 분석하여 직접 수정 시도 |
| npm install 실패 | Node.js 버전 확인, 패키지 버전 고정 재시도 |
| 타임아웃 | 현재 진행 상태 보존, 사용자에게 중간 결과 보고 |

## 테스트 시나리오

### 정상 흐름
1. Phase 1: `_workspace/` 생성
2. Phase 3: design-architect가 DESIGN.md + tokens.json 생성 (~3분)
3. Phase 4: frontend-engineer가 Next.js 프로젝트 구현 (~15분)
4. Phase 5: qa-engineer가 빌드 검증, 1~2개 수정 후 통과 (~5분)
5. Phase 6: 팀 정리, 사용자에게 `npm run dev` 안내
6. 예상 결과: `src/` + `package.json` + 빌드 성공 상태

### 에러 흐름
1. Phase 4에서 frontend-engineer 빌드 실패 (TypeScript 에러)
2. qa-engineer가 에러 분석 후 타입 수정
3. 재빌드 성공
4. QA 보고서에 "빌드 에러 2건 수정" 기록
