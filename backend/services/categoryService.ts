import { prisma } from "../db/prisma";

export const createCategory = async (
  categoryName: string
): Promise<{
  id: string;
  categoryName: string;
}> => {
  return await prisma.category.create({
    data: {
      categoryName: categoryName,
    },
  });
};

export const fetchCategories = async (): Promise<
  {
    id: string;
    categoryName: string;
  }[]
> => {
  return await prisma.category.findMany();
};

export const fetchCategory = async (categoryName: string) => {
  console.log(categoryName);

  const data = await prisma.category.findUnique({
    where: {
      categoryName: categoryName,
    },
  });
  console.log(data, "in fetchcategory");

  return data;
};

export const updateCategoryName = async (
  categoryId: string,
  categoryName: string
): Promise<{
  id: string;
  categoryName: string;
}> => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      categoryName: categoryName,
    },
  });
};
