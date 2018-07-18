using System.Collections.Generic;
using System;

namespace ApiTudoApp.Models
{
    public class TarefaRepositorio : ITarefa
    {
        private List<Tarefa> tarefas = new List<Tarefa>();
        
        public TarefaRepositorio()
        {
            Add(new Tarefa {Id = 1, Description = "Tarefa de  Fagner", CreatedAt = DateTime.Now, Done = false });
            Add(new Tarefa {Id = 2, Description = "Tarefa de  Luiz", CreatedAt = DateTime.Now, Done = false });
            Add(new Tarefa {Id = 3, Description = "Tarefa de  Felipe", CreatedAt = DateTime.Now, Done = false });
        }

        public bool Add(Tarefa tarefa)
        {
            bool addResult = false;
            if (tarefa.Description == null || tarefa.Description == "")
                return addResult;

            tarefa.Id = tarefas.Count + 1;

            int index = tarefas.FindLastIndex(s => s.Id == tarefa.Id);

            if (index == -1)
            {
                tarefa.CreatedAt = DateTime.Now;
                tarefas.Add(tarefa);
                addResult = true;
                return addResult;
            }
            else
                return addResult;
        }

        public Tarefa Get(int id)
        {
            return tarefas.Find(s => s.Id == id);
        }

        public IEnumerable<Tarefa> GetAll()
        {
            return tarefas;
        }

        public void Remove(int id)
        {
            tarefas.RemoveAll(s => s.Id == id);
        }

        public bool Update(Tarefa tarefa)
        {
            if (tarefa == null)
                throw new ArgumentNullException("Tarefa");
            int index = tarefas.FindIndex(s => s.Id == tarefa.Id);
            if (index == -1)
                return false;

            tarefas.RemoveAt(index);
            tarefas.Add(tarefa);
            return true;
        }
    }
}