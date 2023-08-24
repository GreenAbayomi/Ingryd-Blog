const Author = require("./../models/authorModel");
const { APIError } = require("./../utils/apiError");

exports.register = async (req, res, next) => {
  try {
    const { name, email, username } = req.body;

    if (!name || !email || !username) {
      return next(APIError.badRequest(`Field(s) missing. Please try again.`));
    }

    const authorExists = await Author.findOne({ email });

    if (authorExists) {
      return next(
        APIError.customError(
          `An author with the email: ${email} exists already. Try again with another email`,
          409
        )
      );
    }

    const newAuthor = await Author.create({
      name,
      email,
      username,
    });

    res.status(201).json({
      status: "success",
      data: {
        message: `Hey ${name}, welcome to INGRYD BLOG`,
        author: newAuthor,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find({}).populate({
      path: "posts",
      select: "title -_id -author ",
    });
    res.status(200).json({
      status: "success",
      results: authors.length,
      data: {
        authors,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id).populate({
      path: "posts",
      select: "title -_id -author",
    });

    if (!author) {
      return next(APIError.notFound(`There is no author with the ID: ${id}`));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (err) {
    next(err);
  }
};
