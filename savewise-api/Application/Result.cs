namespace Application
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; } = default!;
        public string Error { get; set; } = String.Empty;

        public static Result<T> Success(T value) => new Result<T>
        {
            IsSuccess = true,
            Value = value,
        };

        public static Result<T> Failure(string error) => new Result<T>
        {
            IsSuccess = false,
            Error = error,
        };
    }
}