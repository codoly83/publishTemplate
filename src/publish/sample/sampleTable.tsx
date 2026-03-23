import {
  Checkbox,
  Input,
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "Active",
  },
];

function SampleTablePage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Table Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Horizontal Table"
          description="가로형 테이블입니다. 각 행이 레코드를 나타냅니다."
          code={`
  <Table type="horizontal">
    <TableCaption>A list of users in horizontal layout.</TableCaption>
    <TableBody>
      {sampleData.map((user) => (
        <TableRow key={user.id}>
          <TableHead>Name</TableHead>
          <TableCell>{user.name}</TableCell>
          <TableHead>Email</TableHead>
          <TableCell>{user.email}</TableCell>
          <TableHead>Role</TableHead>
          <TableCell>{user.role}</TableCell>
          <TableHead>Status</TableHead>
          <TableCell>{user.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
          `}
        >
          <ScrollArea className="rounded-lg bg-base border rounded-2xl">
            <Table type="horizontal">
              <TableCaption>A list of users in horizontal layout.</TableCaption>
              <TableBody>
                {sampleData.map((user) => (
                  <TableRow key={user.id}>
                    <TableHead>Name</TableHead>
                    <TableCell>{user.name}</TableCell>
                    <TableHead>Email</TableHead>
                    <TableCell>{user.email}</TableCell>
                    <TableHead>Role</TableHead>
                    <TableCell>{user.role}</TableCell>
                    <TableHead>Status</TableHead>
                    <TableCell>{user.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </GuideBox>
        <GuideBox
          title="Horizontal Table"
          description="가로형 입력폼 테이블입니다. 각 행이 레코드를 나타냅니다."
          code={`
  <Table type="horizontal">
    <TableCaption>A list of users in horizontal layout.</TableCaption>
     <colgroup>
        <col className="w-30" />
        <col />
      </colgroup>
    <TableBody>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableCell>
          <Input placeholder="이름을 입력하세요" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Email</TableHead>
        <TableCell>
          <Input placeholder="이메일을 입력하세요" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
          `}
        >
          <Table type="horizontal">
            <TableCaption>A list of users in horizontal layout.</TableCaption>
            <colgroup>
              <col className="w-30" />
              <col />
            </colgroup>
            <TableBody>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableCell>
                  <Input placeholder="이름을 입력하세요" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableCell>
                  <Input placeholder="이메일을 입력하세요" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GuideBox>

        <GuideBox
          title="Vertical Table"
          description="세로형 테이블입니다."
          code={`
  <Table type="vertical">
    <TableCaption>A list of users.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sampleData.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
          `}
        >
          <Table type="vertical">
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GuideBox>
        <GuideBox
          title="Vertical Table"
          description="세로형 입력폼 테이블입니다."
          code={`
  <Table type="vertical">
    <TableCaption>A list of users.</TableCaption>
    <colgroup>
      <col className="w-50" />
      <col />
    </colgroup>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <Input placeholder="이름을 입력하세요" />
        </TableCell>
        <TableCell>
          <Input placeholder="이메일을 입력하세요" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
          `}
        >
          <Table type="vertical">
            <TableCaption>A list of users.</TableCaption>
            <colgroup>
              <col className="w-50" />
              <col />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input placeholder="이름을 입력하세요" />
                </TableCell>
                <TableCell>
                  <Input placeholder="이메일을 입력하세요" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GuideBox>

        <GuideBox
          title="sub Vertical Table"
          description="테두리가 없는 서브타입 세로형 테이블입니다."
          code={`
  <Table variant="sub" type="vertical">
    <TableCaption>A list of users in sub vertical layout.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sampleData.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
          `}
        >
          <Table variant="sub" type="vertical">
            <TableCaption>A list of users in sub vertical layout.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GuideBox>
        <GuideBox
          title="sub Vertical Table"
          description="테두리가 없는 서브타입 세로형 입력폼 테이블입니다."
          code={`
  <Table variant="sub" type="vertical">
    <TableCaption>A list of users in sub vertical layout.</TableCaption>
    <colgroup>
      <col className="w-6" />
      <col />
      <col />
    </colgroup>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Checkbox />
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Input placeholder="이름을 입력하세요" />
        </TableCell>
        <TableCell>
          <Input placeholder="이메일을 입력하세요" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Input placeholder="이름을 입력하세요" />
        </TableCell>
        <TableCell>
          <Input placeholder="이메일을 입력하세요" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
          `}
        >
          <Table variant="sub" type="vertical">
            <TableCaption>A list of users in sub vertical layout.</TableCaption>
            <colgroup>
              <col className="w-6" />
              <col />
              <col />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Input placeholder="이름을 입력하세요" />
                </TableCell>
                <TableCell>
                  <Input placeholder="이메일을 입력하세요" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Input placeholder="이름을 입력하세요" />
                </TableCell>
                <TableCell>
                  <Input placeholder="이메일을 입력하세요" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleTablePage };
export default SampleTablePage;
