import { responseClient } from "../middleware/responseClient.js";
import { updateProductsRating } from "../models/Product/ProductModel.js";
import {
  getReviewByProductId,
  postReview,
  updateReview,
} from "../models/Reviews/ReviewsModel.js";

export const postReviewController = async (req, res, next) => {
  try {
    const review = await postReview(req.body);

    if (review?._id) {
      const totalreview = await getReviewByProductId({
        productId: review.productId,
      });

      let rating = 0;

      if (Array.isArray(totalreview) && totalreview.length > 0) {
        const totalRating = totalreview.reduce(
          (acc, item) => acc + item.rating,
          0
        );
        rating = parseFloat((totalRating / totalreview.length).toFixed(1));
      }

      const product = await updateProductsRating(
        { _id: review.productId },
        { reviews: rating }
      );

      if (!product?._id) {
        throw new Error("Could not update the product rating");
      }

      responseClient({
        req,
        res,
        message: "Thank you, your review has been submitted successfully 😊",
      });
    } else {
      responseClient({
        req,
        res,
        statusCode: 400,
        message:
          "Something went wrong, review could not be created. Try again later!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductReviewController = async (req, res, next) => {
  try {
    const productReviewList = await getReviewByProductId({
      productId: req.params?.productId,
      status: "approved",
    });

    return Array.isArray(productReviewList) && productReviewList.length
      ? responseClient({
          req,
          res,
          message: "here is product review",
          payload: productReviewList,
        })
      : responseClient({
          req,
          res,
          message: "this product has no review",
          payload: [],
        });
  } catch (error) {
    next(error);
  }
};
