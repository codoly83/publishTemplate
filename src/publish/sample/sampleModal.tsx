import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "./GuideBox";

function SampleModalPage() {
  const [alertExternalOpen, setAlertExternalOpen] = useState(false);
  const [smallExternalOpen, setSmallExternalOpen] = useState(false);
  const [mediumExternalOpen, setMediumExternalOpen] = useState(false);
  const [largeExternalOpen, setLargeExternalOpen] = useState(false);
  const [fullscreenExternalOpen, setFullscreenExternalOpen] = useState(false);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Modal Samples</h1>
      <div className="guide-content">
        {/* ── Alert ── */}
        <GuideBox
          title="Alert"
          description="단순 알림 메시지에 사용하는 최소형 다이얼로그입니다. 제목 없이 내용과 확인 버튼만 표시됩니다."
          code={`
{/* 방법 1: ModalTrigger 내부 사용 */}
<Modal>
  <ModalTrigger asChild>
    <Button variant="outline" size="md">
      Alert 열기
    </Button>
  </ModalTrigger>
  <ModalContent size="alert">
    <ModalBody>    
      이 항목을 정말로 삭제하시겠습니까?
      <br />
      삭제된 데이터는 복구할 수 없습니다.      
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button>확인</Button>
      </ModalClose>
    </ModalFooter>
  </ModalContent>
</Modal>

{/* 방법 2: 외부 상태로 제어 */}
<Button
  variant="outline"
  size="md"
  onClick={() => setAlertExternalOpen(true)}
>
  Alert 열기 (External)
</Button>
<Modal
  open={alertExternalOpen}
  onOpenChange={setAlertExternalOpen}
>
  <ModalContent size="alert">
    <ModalBody>      
      이 항목을 정말로 삭제하시겠습니까?
      <br />
      삭제된 데이터는 복구할 수 없습니다.      
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button>확인</Button>
      </ModalClose>
    </ModalFooter>
  </ModalContent>
</Modal>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: ModalTrigger 내부 사용 */}
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline" size="md">
                  Alert 열기
                </Button>
              </ModalTrigger>
              <ModalContent size="alert">
                <ModalBody>
                  이 항목을 정말로 삭제하시겠습니까?
                  <br />
                  삭제된 데이터는 복구할 수 없습니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setAlertExternalOpen(true)}
            >
              Alert 열기 (External)
            </Button>
            <Modal open={alertExternalOpen} onOpenChange={setAlertExternalOpen}>
              <ModalContent size="alert">
                <ModalBody>
                  이 항목을 정말로 삭제하시겠습니까?
                  <br />
                  삭제된 데이터는 복구할 수 없습니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </GuideBox>

        {/* ── Small ── */}
        <GuideBox
          title="Small"
          description="간단한 안내 메시지나 단일 액션 확인에 사용하는 소형 다이얼로그입니다."
          code={`
 {/* 방법 1: ModalTrigger 내부 사용 */}
  <Modal>
    <ModalTrigger asChild>
      <Button variant="outline" size="md">
        Small 열기 (Trigger)
      </Button>
    </ModalTrigger>
    <ModalContent size="small">
      <ModalHeader>
        <ModalTitle>알림</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        저장이 완료되었습니다. 변경사항이 적용되었습니다.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline">확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/* 방법 2: 외부 상태로 제어 */}
  <Button
    variant="outline"
    size="md"
    onClick={() => setSmallExternalOpen(true)}
  >
    Small 열기 (External)
  </Button>
  <Modal
    open={smallExternalOpen}
    onOpenChange={setSmallExternalOpen}
  >
    <ModalContent size="small">
      <ModalHeader>
        <ModalTitle>알림</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        저장이 완료되었습니다. 변경사항이 적용되었습니다.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline">확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>            
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: ModalTrigger 내부 사용 */}
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline" size="md">
                  Small 열기 (Trigger)
                </Button>
              </ModalTrigger>
              <ModalContent size="small">
                <ModalHeader>
                  <ModalTitle>알림</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  저장이 완료되었습니다. 변경사항이 적용되었습니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline">확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setSmallExternalOpen(true)}
            >
              Small 열기 (External)
            </Button>
            <Modal open={smallExternalOpen} onOpenChange={setSmallExternalOpen}>
              <ModalContent size="small">
                <ModalHeader>
                  <ModalTitle>알림</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  저장이 완료되었습니다. 변경사항이 적용되었습니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline">확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </GuideBox>

        {/* ── Medium ── */}
        <GuideBox
          title="Medium"
          description="일반적인 확인/취소 액션이 필요한 기본 다이얼로그입니다. (기본값)"
          code={`
  {/* 방법 1: ModalTrigger 내부 사용 */}
  <Modal>
    <ModalTrigger asChild>
      <Button variant="outline" size="md">
        Medium 열기 (Trigger)
      </Button>
    </ModalTrigger>
    <ModalContent size="medium">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        변경사항을 저장하시겠습니까? 저장하지 않으면 입력한 내용이
        사라집니다.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">
            취소
          </Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/* 방법 2: 외부 상태로 제어 */}
  <Button
    variant="outline"
    size="md"
    onClick={() => setMediumExternalOpen(true)}
  >
    Medium 열기 (External)
  </Button>
  <Modal
    open={mediumExternalOpen}
    onOpenChange={setMediumExternalOpen}
  >
    <ModalContent size="medium">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        변경사항을 저장하시겠습니까? 저장하지 않으면 입력한 내용이 사라집니다.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">취소</Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: ModalTrigger 내부 사용 */}
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline" size="md">
                  Medium 열기 (Trigger)
                </Button>
              </ModalTrigger>
              <ModalContent size="medium">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  변경사항을 저장하시겠습니까? 저장하지 않으면 입력한 내용이
                  사라집니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setMediumExternalOpen(true)}
            >
              Medium 열기 (External)
            </Button>
            <Modal
              open={mediumExternalOpen}
              onOpenChange={setMediumExternalOpen}
            >
              <ModalContent size="medium">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  변경사항을 저장하시겠습니까? 저장하지 않으면 입력한 내용이
                  사라집니다.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </GuideBox>

        {/* ── Large ── */}
        <GuideBox
          title="Large"
          description="복잡한 내용을 넓게 표시할 때 사용하는 대형 다이얼로그입니다."
          code={`
  {/* 방법 1: ModalTrigger 내부 사용 */}
  <Modal>
    <ModalTrigger asChild>
      <Button variant="outline" size="md">
        Large 열기 (Trigger)
      </Button>
    </ModalTrigger>
    <ModalContent size="large">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        이용약관에 동의하시겠습니까? 서비스를 계속 이용하려면 아래
        내용을 확인하고 동의해 주세요.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">
            취소
          </Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/* 방법 2: 외부 상태로 제어 */}
  <Button
    variant="outline"
    size="md"
    onClick={() => setLargeExternalOpen(true)}
  >
    Large 열기 (External)
  </Button>
  <Modal
    open={largeExternalOpen}
    onOpenChange={setLargeExternalOpen}
  >
    <ModalContent size="large">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        이용약관에 동의하시겠습니까? 서비스를 계속 이용하려면 아래 내용을
        확인하고 동의해 주세요.        
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">취소</Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: ModalTrigger 내부 사용 */}
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline" size="md">
                  Large 열기 (Trigger)
                </Button>
              </ModalTrigger>
              <ModalContent size="large">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  이용약관에 동의하시겠습니까? 서비스를 계속 이용하려면 아래
                  내용을 확인하고 동의해 주세요.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setLargeExternalOpen(true)}
            >
              Large 열기 (External)
            </Button>
            <Modal open={largeExternalOpen} onOpenChange={setLargeExternalOpen}>
              <ModalContent size="large">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  이용약관에 동의하시겠습니까? 서비스를 계속 이용하려면 아래
                  내용을 확인하고 동의해 주세요.
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </GuideBox>

        {/* ── Full Screen ── */}
        <GuideBox
          title="Full Screen"
          description="화면 전체를 덮는 풀스크린 다이얼로그입니다. 상세 폼이나 미리보기에 활용합니다."
          code={`
  {/* 방법 1: ModalTrigger 내부 사용 */}
  <Modal>
    <ModalTrigger asChild>
      <Button variant="outline" size="md">
        Full Screen 열기 (Trigger)
      </Button>
    </ModalTrigger>
    <ModalContent size="full">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        풀스크린 다이얼로그의 콘텐츠 영역입니다. 긴 내용이나 폼,
        미리보기 등 충분한 공간이 필요한 경우에 활용합니다.
        
        <div className="mt-6 grid gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">
            취소
          </Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/* 방법 2: 외부 상태로 제어 */}
  <Button
    variant="outline"
    size="md"
    onClick={() => setFullscreenExternalOpen(true)}
  >
    Full Screen 열기 (External)
  </Button>
  <Modal
    open={fullscreenExternalOpen}
    onOpenChange={setFullscreenExternalOpen}
  >
    <ModalContent size="full">
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>        
        풀스크린 다이얼로그의 콘텐츠 영역입니다. 긴 내용이나 폼,
        미리보기 등 충분한 공간이 필요한 경우에 활용합니다.
        
        <div className="mt-6 grid gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button variant="outline" color="gray">취소</Button>
        </ModalClose>
        <ModalClose asChild>
          <Button>확인</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: ModalTrigger 내부 사용 */}
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline" size="md">
                  Full Screen 열기 (Trigger)
                </Button>
              </ModalTrigger>
              <ModalContent size="full">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  풀스크린 다이얼로그의 콘텐츠 영역입니다. 긴 내용이나 폼,
                  미리보기 등 충분한 공간이 필요한 경우에 활용합니다.
                  <div className="mt-6 grid gap-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="h-12 rounded-lg bg-slate-100 animate-pulse"
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setFullscreenExternalOpen(true)}
            >
              Full Screen 열기 (External)
            </Button>
            <Modal
              open={fullscreenExternalOpen}
              onOpenChange={setFullscreenExternalOpen}
            >
              <ModalContent size="full">
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  풀스크린 다이얼로그의 콘텐츠 영역입니다. 긴 내용이나 폼,
                  미리보기 등 충분한 공간이 필요한 경우에 활용합니다.
                  <div className="mt-6 grid gap-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="h-12 rounded-lg bg-slate-100 animate-pulse"
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="outline" color="gray">
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button>확인</Button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleModalPage };
export default SampleModalPage;
