import { GuideBox } from "@/publish/guide/GuideBox";

export default function SampleNamingConventionPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">약속어 (camelCase)</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 원칙"
          description="프로젝트 전반에서 가장 보편적으로 쓰는 camelCase 중심으로 이름을 통일합니다."
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>변수/함수/객체 key: camelCase (`userName`, `fetchUserList`)</li>
            <li>이벤트 핸들러: `handle + 대상 + 동사` (`handleSubmitForm`)</li>
            <li>boolean: `is/has/can/should` 접두어 (`isOpen`, `hasError`)</li>
            <li>상수: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)</li>
          </ul>
        </GuideBox>

        <GuideBox
          title="파일/컴포넌트 네이밍"
          description="React와 퍼블리싱 샘플에서 충돌 없이 유지하기 쉬운 규칙입니다."
          code={`
// 컴포넌트 파일
sampleUserCard.tsx

// 컴포넌트 이름 (PascalCase)
function SampleUserCard() {}

// 훅 파일/이름
useMediaDevice.ts
function useMediaDevice() {}

// CSS 클래스 네이밍
// custom: camelCase
.userCardWrap {}

// tailwind/external: kebab-case
className="items-center gap-2 swiper-slide"
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>컴포넌트 함수명: PascalCase</li>
            <li>샘플 페이지 파일명: camelCase (`sampleButton.tsx`)</li>
            <li>커스텀 훅: `use` + camelCase (`useScrollSpy`)</li>
            <li>스타일 파일: 컴포넌트 기준으로 매칭 (`Button.scss` 등)</li>
            <li>
              CSS 클래스명은 <strong>커스텀 스타일은 camelCase</strong>를 사용합니다.
            </li>
            <li>
              Tailwind 유틸리티/외부 라이브러리 클래스는{" "}
              <strong>kebab-case</strong>를 그대로 사용합니다.
            </li>
          </ul>
        </GuideBox>

        <GuideBox
          title="좋은 예 / 피해야 할 예"
          description="팀 합의가 흔들리기 쉬운 포인트를 예시로 고정합니다."
          code={`
// good
const isLoading = true;
const userProfileImageUrl = "";
function handleClickSave() {}

// avoid
const loading_yn = true;
const User_Profile_Image_URL = "";
function click_save() {}
          `}
        >
          <div className="rounded border border-line01 bg-box p-3 text-sm text-font-b">
            축약어는 팀에서 공통으로 쓰는 경우만 허용하고, 임의 축약은 지양합니다.
            (예: `cnt`보다 `count`)
          </div>
        </GuideBox>

        <GuideBox
          title="보편 약속어 리스트"
          description="클래스/변수명에 자주 쓰는 공통 단어를 정해두면 네이밍 일관성을 유지하기 쉽습니다."
          code={`
// examples
iconWrap
btnArea
contentInner
titleBox
formFieldList
          `}
        >
          <div className="grid grid-cols-1 gap-2 text-sm text-font-b sm:grid-cols-2">
            <div className="rounded border border-line01 bg-box p-3">
              <strong>icon</strong>: 아이콘 요소
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>btn</strong>: 버튼 요소/영역
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>inner</strong>: 내부 컨텐츠 래퍼
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>area</strong>: 기능/의미 단위 영역
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>wrap</strong>: 바깥 감싸는 래퍼
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>box</strong>: 시각적 그룹 박스
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>list / item</strong>: 목록 / 목록 아이템
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>title / desc</strong>: 제목 / 설명 텍스트
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>thumb</strong>: 썸네일 이미지
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>content</strong>: 본문 컨텐츠
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>header / body / footer</strong>: 섹션 구조 분리
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>form / field</strong>: 폼 / 입력 단위
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}
