import { Pagination as IPagination } from "@/@types/posts";
import { FC } from "react";
import ButtonPagination from "../Buttons/ButtonPagination";

interface PaginationProps {
  pagination: IPagination | undefined;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pagination, onPageChange }) => {
  if (!pagination) return null;
  const { currentPage, totalPages } = pagination;
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  const pages: (number | string)[] = [1];

  // Determine start and end for intermediate pages
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  // Adjust so we always show up to 3 intermediate pages if possible
  if (currentPage <= 2) end = Math.min(totalPages - 1, 4);
  if (currentPage >= totalPages - 1) start = Math.max(2, totalPages - 3);

  // Add ellipsis after first page if needed
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  // Add ellipsis before last page if needed
  if (end < totalPages - 1) pages.push("...");
  // Always show last page if more than one page
  if (totalPages > 1) pages.push(totalPages);

  return (
    <div className="flex w-full items-center justify-center gap-[6px] sm:gap-[8px]">
      <ButtonPagination type="button" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)}>
        Prev
      </ButtonPagination>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="font-semi  ">
            ...
          </span>
        ) : (
          <ButtonPagination
            key={page}
            type="button"
            active={page === currentPage}
            onClick={() => goTo(page as number)}
            aria-current={page === currentPage ? "page" : undefined}
            style={{
              fontWeight: page === currentPage ? "bold" : undefined,
              margin: "0 2px"
            }}
          >
            {page}
          </ButtonPagination>
        )
      )}
      <ButtonPagination type="button" disabled={currentPage === totalPages} onClick={() => goTo(currentPage + 1)}>
        Next
      </ButtonPagination>
    </div>
  );
};

export default Pagination;
