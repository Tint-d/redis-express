export const getSkipAndTake = (page: string, size: string) => {
  let take;
  let skip;

  let numberPage = parseInt(page);
  let numberSize = parseInt(size);

  if (!numberPage) numberPage = 1;
  if (!numberSize) numberSize = 2;

  if (numberPage < 1) numberPage = 1;

  take = numberSize;
  skip = (numberPage - 1) * take;

  return {
    take: take,
    skip: skip,
  };
};
