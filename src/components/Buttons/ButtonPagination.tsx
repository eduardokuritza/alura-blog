import { ComponentProps, FC } from "react";

type ButtonPaginationProps = ComponentProps<"button"> & {
  active?: boolean;
};

const ButtonPagination: FC<ButtonPaginationProps> = ({ active, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center px-[12px] py-[8px] text-white font-bold text-base cursor-pointer transition-all border border-gray-300 rounded-sm focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 ${
        active ? "bg-primary-300 border-primary-300 " : "bg-gray-300 hover:bg-primary hover:border-primary "
      } disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    />
  );
};

export default ButtonPagination;
