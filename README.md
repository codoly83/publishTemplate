## Node.js 및 pnpm 설치

### 1. Node.js (npm 포함)

[Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전을 설치합니다. (Windows는 설치 마법사를 쓰면 `node`, `npm` 명령이 Path에 잡힙니다.)

설치 후 터미널을 새로 열고 다음으로 확인합니다.

```bash
node -v
npm -v
```

### 2. npm으로 pnpm 설치

전역(global)으로 pnpm을 올립니다.

```bash
npm install -g pnpm
```

설치가 끝나면 버전을 확인합니다.

```bash
pnpm -v
```

**Windows 참고:** `pnpm`을 찾을 수 없다고 나오면, npm 전역 실행 파일 경로(보통 `%AppData%\npm`)가 사용자 **Path**에 있는지 확인합니다. Node 설치 시 “Add to PATH” 옵션을 켰다면 대부분 자동입니다.

### 3. (선택) 스토어 경로 고정

여러 프로젝트나 오프라인 환경에서 패키지 캐시 위치를 통일하려면 한 번만 설정합니다.

```bash
pnpm config set store-dir C:\workspaces\pnpm-store
```

### 4. 이 프로젝트에서 실행

프로젝트 루트(`package.json`이 있는 폴더)에서:

```bash
pnpm install
pnpm dev
```

스토어를 미리 맞춰 둔 오프라인 PC라면 `pnpm install --offline`을 사용할 수 있습니다. (스토어에 없는 패키지가 있으면 실패합니다.)

## 스택

- React 19 + TypeScript 5.9
- Vite 7
- tailwind 4
- React Router 7
