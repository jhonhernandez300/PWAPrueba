using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWA.Server.Core.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; }        
    }
}
