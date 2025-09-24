import reviewCollection from "./ReviewsSchema.js";

export const postReview = async (reviewObj) =>
  await reviewCollection(reviewObj).save();

export const getReviewByProductId = async (obj) => {
  const reviews = await reviewCollection.find(obj);
  return reviews;
};

export const updateReview = async (filter, update) =>
  await reviewCollection.findByIdAndUpdate(filter, update, { new: true });
