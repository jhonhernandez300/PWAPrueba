using PWA.Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWA.Server.Core.Interfaces
{
    public interface IBooksRepository : IBaseRepository<Book>
    {
        Task<bool> UpdateBookAsync(Book book);
        Task<IEnumerable<Book>> GetBooksFromStoredProcedureAsync();
        Task<int> AddBookUsingStoredProcedureAsync(Book book);
        Task<bool> DeleteBookAsync(int id);
    }
}
