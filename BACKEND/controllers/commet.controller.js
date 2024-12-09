const Commnet = require("../models/commet.modal");

const getCommentByProdcutId = async (req, res) => {
  try {
    const { productId } = req.params;
    let comment = await Commnet.find({ product: productId });
    res.send(comment);
  } catch (error) {
    res.send({ message: error });
  }
};

const createComment = async (req, res) => {
  try {
    req.body.user = req.user.id;
    let comment = await Commnet.create(req.body);
    res.send(comment);
  } catch (error) {
    res.send({ message: error });
  }
};

const updateComment = async (req, res) => {
  let { commentId } = req.params;
  try {
    let comment = await Commnet.findByIdAndUpdate(commentId, req.body, {
      new: true,
    });
    res.send(comment);
  } catch (error) {
    res.send({ message: error });
  }
};

const deleteComment = async (req, res) => {
  let { commentId } = req.params;

  try {
    let comment = await Commnet.findByIdAndDelete(commentId);
    res.send(comment);
  } catch (error) {
    res.send({ message: error });
  }
};

module.exports = {
  getCommentByProdcutId,
  createComment,
  updateComment,
  deleteComment,
};