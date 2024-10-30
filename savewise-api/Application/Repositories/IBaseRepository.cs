namespace Application.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<T> GetById(Guid id);
        void Add(T item);
        void Update(Guid id, T item);
        void Delete(Guid id);
        void SaveChangesAsync();
    }
}