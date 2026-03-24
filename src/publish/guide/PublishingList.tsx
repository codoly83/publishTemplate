import { publishingList } from "@/publish/guide/publishing";
import { NavLink } from "react-router-dom";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export default function PublishingList() {
  return (
    <Table variant="sub" type="vertical">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">페이지</TableHead>
          <TableHead>경로</TableHead>
          <TableHead>이동</TableHead>
          <TableHead>날짜</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {publishingList.map((page) => (
          <TableRow key={page.path}>
            <TableCell>{page.name}</TableCell>

            <TableCell>{page.path}</TableCell>

            <TableCell className="text-center">
              <NavLink to={page.path} target="_blank" rel="noopener noreferrer">
                보기
              </NavLink>
            </TableCell>
            <TableCell className="text-center">{page.date}</TableCell>
            <TableCell className="text-center">
              <Chip
                variant="solid"
                color={page.status === "완료" ? "green" : "gray"}
              >
                {page.status}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
