export enum ResultStatus {
  Succeeded = 'Succeeded',
  InvalidRequest = 'InvalidRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  MissingResource = 'MissingResource',
  Conflict = 'Conflict',
  ExpiredResource = 'ExpiredResource',
  ProcessingError = 'ProcessingError',
  DependencyFailure = 'DependencyFailure',
  ClientError = 'ClientError',
  Unspecified = 'Unspecified'
}

export type Success<T> = {
  content: T;
  errorMessage?: never;
  status: ResultStatus;
};

export type Failure<T = never> = {
  content?: T;
  errorMessage: string;
  status: ResultStatus;
};

export type FailureWithContent<T = any> = Required<Failure<T>>;

export type Result<TSuccess, TFailure = TSuccess> =
  | Success<TSuccess>
  | Failure<TFailure>;

export default function statusCodeToResultStatus(
  statusCode: number
): ResultStatus {
  if (statusCode === 400) {
    return ResultStatus.InvalidRequest;
  }

  if (statusCode === 404) {
    return ResultStatus.MissingResource;
  }

  return ResultStatus.ProcessingError;
}

export function isResult<TSuccess, TFailure = TSuccess>(
  v: unknown
): v is Result<TSuccess, TFailure> {
  return typeof v === 'object' && v != null && 'status' in v;
}

export function isSuccess<T>(v: unknown): v is Success<T> {
  return isResult<T>(v) && !Boolean(v.errorMessage) && v.content != null;
}

export function isFailure<T = never>(v: unknown): v is Failure<T> {
  return isResult<unknown, T>(v) && Boolean(v.errorMessage);
}
