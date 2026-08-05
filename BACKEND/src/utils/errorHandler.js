import AppError from "../errors/AppError.js";

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	console.error("Unexpected error:", err);
	return res.status(500).json({
		status: "error",
		message: err.message || "Internal Server Error",
	});
};

const handleCastError = (err) => new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateKeyError = (err) => {
	const value = err?.keyValue ? Object.values(err.keyValue).join(", ") : "value";
	return new AppError(`Duplicate field value: ${value}. Please use another value.`, 400);
};

const handleValidationError = (err) => {
	const messages = Object.values(err.errors || {}).map((item) => item.message);
	return new AppError(messages.join(". "), 400);
};

export const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	if (err.name === "CastError") error = handleCastError(err);
	if (err.code === 11000) error = handleDuplicateKeyError(err);
	if (err.name === "ValidationError") error = handleValidationError(err);

	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	if (process.env.NODE_ENV === "development") {
		return sendErrorDev(error, res);
	}

	return sendErrorProd(error, res);
};

export const notFoundHandler = (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};
