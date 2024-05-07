const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api_error");
const {
  StatusCodes,
  CustomPagesLabels,
  DEFAULT_PAGE_SIZE,
} = require("../app_constants");
const { mapBodyToModel } = require("../utils/common_utils");
//const fastjson = require("fast-json-stringify");

function generateSchema(obj) {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return { type: typeof obj };
  }

  const properties = {};
  const required = [];

  for (const key of Object.keys(obj)) {
    properties[key] = generateSchema(obj[key]);
    required.push(key);
  }

  return {
    type: "object",
    properties,
    required,
  };
}

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(
        new ApiError(`No document for this id ${id}`, StatusCodes.NOT_FOUND)
      );
    }

    // Trigger "remove" event when update document
    document.remove();
    res.send({ success: true, message: "document deleted successfully" });
  });

exports.updateOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    // 1) build the query
    let query = Model.findByIdAndUpdate(
      req.params.id,
      mapBodyToModel(Model, req.body),
      {
        new: true,
      }
    );

    if (populationOpt) {
      query.populate(populationOpt);
    }
    // 2) execute the query
    const document = await query;

    if (!document) {
      return next(
        new ApiError(
          `No document for this id ${req.params.id}`,
          StatusCodes.NOT_FOUND
        )
      );
    }
    // Trigger "save" event when update document
    document.save();
    res.json({
      success: true,
      data: document,
      message: "document updated successfully",
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(mapBodyToModel(Model, req.body));
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: newDoc,
      message: "document created successfully",
    });
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    // 2) Execute query
    const document = await query.lean();

    // TODO get populated field in the result

    if (!document) {
      return next(
        new ApiError(`No document for this id ${id}`, StatusCodes.NOT_FOUND)
      );
    }
    res.json({ success: true, data: document });
  });

exports.getAll = (Model, populationOpt) =>
  asyncHandler(async (req, res) => {
    const pageIndex = parseInt(req.query.page) || 1;
    const limitCount = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;

    const pageObj = {
      page: pageIndex,
      limit: limitCount,
      lean: true,
      customLabels: CustomPagesLabels,
    };

    if (populationOpt) {
      pageObj.populate = populationOpt;
    }
    //res.json({ success: true, data: allDocs });

    const allDocs = await Model.paginate(
      {}, // TODO apply filter here
      pageObj
    );

    // let docs = [];
    // for (var i = 1; i <= 10000; i++) {
    //   docs.push({
    //     firstname: "ahmed",
    //     age: 28,
    //     gender: "male",
    //     ratings: [{ rate: 10 }, { rate: 9 }],
    //   });
    // }

    //const stringify = fastjson(generateSchema(allDocs));

    // const stringify = fastjson({
    //   title: "Example Schema",
    //   type: "array",
    //   properties: {
    //     firstname: {
    //       type: "string",
    //     },
    //     age: {
    //       type: "string",
    //     },
    //     gender: {
    //       type: "string",
    //     },
    //     ratings: {
    //       type: "array",
    //       properties: {
    //         rate: {
    //           type: "integer",
    //         },
    //       },
    //     },
    //   },
    // });

    // res
    //   .status(200)
    //   .header("Content-Type", "application/json")
    //   .send(stringify(docs));

    res.json({ success: true, data: allDocs });
  });
