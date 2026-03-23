## 외부 PC 설치 목록

## 프로젝트 위치

### frontend

---

## node 및 pnpm 설치

1. node 경로 정하고 압축 해제
2. pnpm 경로 정하고 `pnpm-win-x64.exe` 파일 넣기
3. `pnpm.exe`로 이름 바꾸기
4. pnpm 시스템 환경 변수 설정 -> Path 목록 중에 가장 위로 보내야 함
5. node 내부에 있는 corepack pnpm 과 겹치기 때문에
6. `pnpm config set store-dir C:\workspaces\pnpm-store`
7. `pnpm install --offline`
8. `pnpm dev`

## 스택

- React 19 + TypeScript 5.9
- Vite 7
- tailwind 4
- TanStack Query 5
- Zustand 5
- React Router 7
- MSW 2
