using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PWA.Server.Core.Interfaces;
using PWA.Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWA.Server.EF.Repositories
{
    public class BooksRepository : BaseRepository<Book>, IBooksRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public BooksRepository(ApplicationDbContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var parameters = new { Id = id };
                var result = await connection.ExecuteAsync("DeleteBook", parameters, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
        }

        public async Task<bool> UpdateBookAsync(Book book)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var parameters = new { Id = book.Id, Title = book.Title };
                var result = await connection.ExecuteAsync("UpdateBook", parameters, commandType: CommandType.StoredProcedure);
                return result > 0;
            }
        }

        public async Task<IEnumerable<Book>> GetBooksFromStoredProcedureAsync()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.QueryAsync<Book>("GetBooks", commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<int> AddBookUsingStoredProcedureAsync(Book book)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@Title", book.Title, DbType.String, ParameterDirection.Input, 250);

                var result = await connection.ExecuteAsync("AddBook", parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

    }
}
