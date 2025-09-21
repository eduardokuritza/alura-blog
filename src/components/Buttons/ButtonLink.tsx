import { FC, type ComponentProps } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  active?: boolean;
};

const ButtonLink: FC<ButtonLinkProps> = ({
  variant = "primary",
  size = "md",
  active,
  ...props
}) => {
  const variants = tv({
    base: "transition-all text-nowrap",
    variants: {
      variant: {
        primary: `font-chakra flex items-center justify-center font-bold hover:text-primary rounded-xs focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2
          
          ${active ? "text-primary" : "text-primary-300"}
      `,
        secondary: `
          flex items-center justify-center border border-primary rounded-sm 
          px-[12px] py-[8px] hover:bg-primary-300 
          hover:border-primary-300 focus-visible:outline-primary focus-visible:outline-2 
          focus-visible:outline-offset-2 font-bold 
          ${active ? "bg-white text-primary hover:text-white" : "bg-primary text-white"}
      `,
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-base font-bold",
        lg: "text-lg md:text-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  });

  return (
    <Link
      aria-label={props.children?.toString()}
      className={variants({ variant, size, class: props.className })}
      {...props}
    />
  );
};

export default ButtonLink;
