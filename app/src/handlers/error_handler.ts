import { CustomError } from "../models/error";

interface ApiErrorPayload {
  message?: string;
  code?: string;
  details?: any;
}

function isApiErrorPayload(data: any): data is ApiErrorPayload {
  return data && typeof data.error === "object";
}

export function handleApiError(
  error: any,
  fallbackMessage = "Unknown error",
  fallbackCode = "UNKNOWN_ERROR"
) {
  const data = error?.response?.data;

  if (isApiErrorPayload(data)) {
    const { message, code, details } = data;
    throw new CustomError(
      message ?? fallbackMessage,
      code ?? fallbackCode,
      details
    );
  }

  throw new CustomError(fallbackMessage, fallbackCode, error);
}
