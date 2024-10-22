namespace Application.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<T> Get(Guid id);
        void Add(T item);
        Task Update(Guid id, T item);
        Task Delete(Guid id);
        Task SaveChangesAsync();
    }
}