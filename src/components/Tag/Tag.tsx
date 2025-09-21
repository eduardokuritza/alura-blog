import { FC } from "react";

interface TagProps {
  text?: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center rounded-sm border border-primary bg-transparent px-[12px] py-[8px]">
      <p className="text-primary font-bold text-base">{text}</p>
    </div>
  );
};

export default Tag;
