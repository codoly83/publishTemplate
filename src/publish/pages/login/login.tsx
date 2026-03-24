import { useLayoutClass } from "@/hooks/useLayoutClass";
import { Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Input } from "@/components/ui";
import { FormEvent, useState } from "react";

function Login() {
  useLayoutClass("type2");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 샘플 페이지이므로 제출값을 간단히 확인할 수 있도록 alert를 사용합니다.
    window.alert(
      `로그인 시도\n이메일: ${email || "-"}\n비밀번호: ${
        password ? "입력됨" : "미입력"
      }\n자동 로그인: ${rememberMe ? "사용" : "미사용"}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        padding: "40px 16px",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 420 }}>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <p style={{ margin: 0, fontSize: 14, color: "var(--font-g)" }}>
            UI 컴포넌트 기반 샘플 로그인 화면입니다.
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 12 }}
          >
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 14 }}>이메일</span>
              <Input
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                resetEnabled
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 14 }}>비밀번호</span>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                resetEnabled
              />
            </label>

            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              label="자동 로그인"
            />

            <Button type="submit" style={{ marginTop: 4 }}>
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { Login };
export default Login;
