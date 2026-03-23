import { Icon } from "@/components/ui/Icon/Icon";
import { iconNames } from "@/components/ui/Icon/Icon.types";
import { GuideBox } from "./GuideBox";

function SampleIconPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Icon Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="전체 아이콘"
          description="src/assets/icons/ 폴더에 있는 모든 아이콘 목록입니다."
          code={`
            sm / 16, md / 24, lg / 48 
<Icon name="search" size="md" />
<Icon name="search" size={16} />
          `}
        >
          <div className="flex flex-wrap gap-6">
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 border hover:border-line02"
              >
                <Icon name={name} className="hover:text-primary" />
                <span className="text-xs text-font-g font-mono">{name}</span>
              </div>
            ))}
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleIconPage };
export default SampleIconPage;
