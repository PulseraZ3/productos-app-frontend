export interface GenericResponse<T>{
    response: T;
    error: string | null;
}