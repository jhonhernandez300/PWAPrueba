using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PWA.Server.Core;
using PWA.Server.Core.Consts;
using PWA.Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public BooksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpDelete("{id}")]
        [EnableCors("AllowOrigins")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _unitOfWork.Books.DeleteBookAsync(id);

            if (response)
            {
                return Ok(Json("Libro eliminado exitosamente."));
            }
            else
            {
                return NotFound(Json("El libro con el Id especificado no existe o no se pudo eliminar."));
            }
        }

        [HttpPost("Update")]
        [EnableCors("AllowOrigins")]
        public async Task<IActionResult> Update([FromBody] Book book)
        {
            if (book == null || book.Id == 0)
            {
                return BadRequest("Datos de entrada inválidos.");
            }

            var response = await _unitOfWork.Books.UpdateBookAsync(book);

            if (response)
            {
                return Ok(Json("Libro actualizado exitosamente."));
            }
            else
            {
                return NotFound(Json("El libro con el Id especificado no existe o no se pudo actualizar."));
            }
        }       

        [HttpPost("Save")]
        [EnableCors("AllowOrigins")]
        public async Task<IActionResult> Save([FromBody] Book book)
        {
            var response = await _unitOfWork.Books.AddBookUsingStoredProcedureAsync(book);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetById()
        {
            return Ok(_unitOfWork.Books.GetById(1));
        }

        [HttpGet("GetAll")]
        [EnableCors("AllowOrigins")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _unitOfWork.Books.GetBooksFromStoredProcedureAsync();
            return Ok(response);
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName()
        {
            return Ok(_unitOfWork.Books.Find(b => b.Title == "New Book", new[] { "Author" }));
        }

        [HttpGet("GetAllWithAuthors")]
        public IActionResult GetAllWithAuthors()
        {
            return Ok(_unitOfWork.Books.FindAll(b => b.Title.Contains("New Book"), new[] { "Author" }));
        }

        [HttpGet("GetOrdered")]
        public IActionResult GetOrdered()
        {
            return Ok(_unitOfWork.Books.FindAll(b => b.Title.Contains("New Book"), null, null, b => b.Id, OrderBy.Descending));
        }       
    }
}
