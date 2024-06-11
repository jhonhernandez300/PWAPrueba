using PWA.Server.Core;
using PWA.Server.Core.Interfaces;
using PWA.Server.Core.Models;
using PWA.Server.EF.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWA.Server.EF
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public IBaseRepository<Author> Authors { get; private set; }
        public IBooksRepository Books { get; private set; }

        public UnitOfWork(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

            Authors = new BaseRepository<Author>(_context);
            Books = new BooksRepository(_context, _configuration);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
