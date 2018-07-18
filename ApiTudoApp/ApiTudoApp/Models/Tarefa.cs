using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiTudoApp.Models
{
    public class Tarefa
    {
        public string Description { get; set; }
        public bool Done { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Id { get; set; }
    }
}