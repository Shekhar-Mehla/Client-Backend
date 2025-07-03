import { responseClient } from "../middleware/responseClient.js";
import {
  getAllProducts,
  getAllProductsByPath,
  getProductById,
  getProductsByCategoryId,
} from "../models/Product/ProductModel.js";
// import { createRegexFilter } from "../utils/createRegexFilter.js";

//
export const getProductsByCategoryIdController = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (categoryId) {
      // call model
      const products = await getProductsByCategoryId({ categoryId });
      if (Array.isArray(products)) {
        return responseClient({
          message: "here is the list of products based on selected category",
          res,
          payload: products,
          req,
        });
      }
    } else {
      return responseClient({
        message: "invalid id",
        res,
        statusCode: 400,
        req,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (_id) {
      // call model
      const product = await getProductById({ _id });
      if (product?._id) {
        return responseClient({
          message: "here is the product",
          res,
          req,
          payload: product,
        });
      } else {
        return responseClient({
          message: "no product found",
          res,
          req,
          statusCode: 400,
        });
      }
    } else {
      return responseClient({
        message: "you must send id",
        res,
        statusCode: 400,
        req,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProductsController = async (req, res, next) => {
  try {
    // call model

    const producstList = await getAllProducts();
    if (producstList?.length && Array.isArray(producstList)) {
      return responseClient({
        message: "here is the product list",
        res,
        req,
        payload: producstList,
      });
    } else {
      return responseClient({
        message: "there is no product sorry!😂",
        res,
        statusCode: 400,
        req,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllFilterProductsController = async (req, res, next) => {
  try {
    const { mainCategory, maxPrice, minPrice, colors, sale } = req.query;

    const filter = {};
    console.log(mainCategory);

    // if (req.params.productPath !== "all") {
    //   const productPaths = req.params.productPath.split(",");
    //   if (productPaths.length > 0) {
    //     filter.$or = createRegexFilter(productPaths);
    //   }
    // }
    if (mainCategory) {
      filter.mainCategory = mainCategory.includes(",")
        ? { $in: mainCategory.split(",") }
        : mainCategory;
    }
    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (colors) {
      filter.colors = colors.includes(",")
        ? { $in: colors.split(",") }
        : colors;
    }
    if (sale === "true") {
      filter.sale = sale;
    }
    console.log(filter);
    const products = await getAllProductsByPath(filter);
    console.log(products);
    products?.length > 0 && Array.isArray(products)
      ? responseClient({
          payload: products,
          message: products.length ? "Filtered products" : "No products found",
          req,
          res,
        })
      : responseClient({
          message: "No products found",
          req,
          res,
        });
  } catch (error) {
    next(error);
  }
};
