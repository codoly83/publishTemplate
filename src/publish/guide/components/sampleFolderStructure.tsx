import { GuideBox } from "@/publish/guide/GuideBox";

export default function SampleFolderStructurePage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">폴더구조 샘플</h1>
      <div className="guide-content">
        <GuideBox
          title="권장 기본 구조"
          description="트리 구조에서 각 폴더의 역할을 함께 볼 수 있도록 정리했습니다. 폴더 구조만 표시합니다."
        >
          <pre className="rounded-lg border border-line01 bg-box p-4 text-sm text-font-b leading-7 overflow-x-auto">
            {`src/
├─ assets/                  # 아이콘, 폰트, 이미지, 스타일 등 정적 리소스
│  ├─ icons/                # SVG/아이콘 파일
│  └─ styles/               # 전역 스타일, 토큰, 믹스인
├─ components/              # 재사용 컴포넌트
│  ├─ layout/               # 레이아웃 전용 컴포넌트
│  └─ ui/                   # Button/Input/Modal 등 공통 UI
├─ providers/               # Theme/Context 등 전역 Provider
├─ hooks/                   # 공통 커스텀 훅
├─ lib/                     # 공통 유틸 함수/헬퍼
├─ routes/                  # 라우트 정의, 페이지 매핑
├─ app/                     # 개발 페이지 영역
└─ publish/                 # 퍼블리싱 산출물/가이드 영역
   └─ guide/                # 퍼블리싱 가이드
      ├─ components/        # UI 컴포넌트 샘플 페이지
      ├─ hooks/             # 훅 샘플 페이지
      ├─ layout/            # 레이아웃 샘플 페이지
      └─ pageFeatures/      # 페이지 기능 샘플 페이지`}
          </pre>
        </GuideBox>
      </div>
    </div>
  );
}
