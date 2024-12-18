interface TabMenuProps {
  selectedTab: "상품 정보" | "사이즈" | "리뷰";
  onTabChange: (tab: "상품 정보" | "사이즈" | "리뷰") => void;
}

export default function TabMenu({ selectedTab, onTabChange }: TabMenuProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-8">
        {["상품 정보", "사이즈", "리뷰"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab as "상품 정보" | "사이즈" | "리뷰")}
            className={`py-4 px-2 font-bold text-lg relative ${
              selectedTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
