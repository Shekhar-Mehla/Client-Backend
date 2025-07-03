export const createRegexFilter = (prodcutPaths) => {
  const regexFilters = prodcutPaths.map((path) => ({
    productPath: { $regex: `^/${path}/`, $options: "i" },
  }));
  return regexFilters;
};
