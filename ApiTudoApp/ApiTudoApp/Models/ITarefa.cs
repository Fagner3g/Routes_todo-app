using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiTudoApp.Models
{
    public interface ITarefa
    {
        IEnumerable<Tarefa> GetAll();
        Tarefa Get(int id);
        bool Add(Tarefa tarefa);
        void Remove(int id);
        bool Update(Tarefa tarefa);
    }
}