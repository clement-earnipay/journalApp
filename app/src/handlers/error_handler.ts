import { CustomError } from "../models/error";
import { Err } from "./result_type";

interface ApiErrorPayload {
  message?: string;
  code?: string;
  details?: any;
}

function isApiErrorPayload(data: any): data is ApiErrorPayload {
  return data && typeof data.message === "string";
}

export function handleApiError(
  error: any,
  fallbackMessage = "Unknown error",
  fallbackCode = "UNKNOWN_ERROR"
): Err<CustomError> {
  const data = error?.response?.data;

  const customError = isApiErrorPayload(data)
    ? new CustomError(
        data.message ?? fallbackMessage,
        data.code ?? fallbackCode,
        data.details
      )
    : new CustomError(fallbackMessage, fallbackCode, error);

  return new Err(customError);
}
