export enum STATUSCODES {
    BAD_REQUEST = 400,
    VALIDATION_FAILED = 400,
    OUTGOING_API_ERROR = 777,
    ERROR_UNKNOWN_SHOW_TO_USER = 400,
    ERROR_UNKNOWN = 500,
    ERROR_CANNOT_FULLFILL_REQUEST = 417,
    NOT_FOUND = 404,
    DATABASE_ERROR = 402,
    DATABASE_DUPLICATE_ERROR_CODE = 1062,
    INVALID_UPLOADING = 1103,
    TOKEN_INVALID = 511,
    ACCESS_DENIED = 403,
    INVALID_ROUTE_URL = 608,
    INVALID_BASE_URL = 609,
    CONFLICT = 409,
    SUCCESS = 200
}

export enum JwtTokenTypes {
    AUTH_TOKEN = 'AUTH_TOKEN'
}

export var ExpressExtendedRequestParams = {
    IP: "PC_ip_address",
    START_TIME: "PC_start_timeStamp",
    PAYLOAD: "PC_payload",
    USER: "PC_user",
};

export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN"
}

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED"
}

