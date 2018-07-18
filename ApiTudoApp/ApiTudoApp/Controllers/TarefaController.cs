using ApiTudoApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiTudoApp.Controllers
{
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class TarefaController : ApiController
    {
        static readonly ITarefa tarefaRepositorio = new TarefaRepositorio();

        public HttpResponseMessage GetAllTarefas()
        {
            List<Tarefa> listaTarefas = tarefaRepositorio.GetAll().OrderByDescending(x => x.CreatedAt).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, listaTarefas);
        }

        public HttpResponseMessage GetTarefa(int id)
        {
            List<Tarefa> tarefa = new List<Tarefa>();
            tarefa.Add(tarefaRepositorio.Get(id));

            if (tarefa.Count == 0 )
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Estudante não localizado para o ID informado");
            else
                return Request.CreateResponse(HttpStatusCode.OK, tarefa);
        }

        public IEnumerable<Tarefa> GetTarefaPorDescription(string desc)
        {
            var res =  tarefaRepositorio.GetAll().Where(
                e => string.Equals(e.Description, desc, StringComparison.OrdinalIgnoreCase)).ToList();
            return res;
        }

        public HttpResponseMessage PostTarefa(Tarefa tarefa)
        {
            bool result = tarefaRepositorio.Add(tarefa);
            if (result)
            {
                var response = Request.CreateResponse<Tarefa>(HttpStatusCode.Created, tarefa);
                string uri = Url.Link("DefaultApi", new { id = tarefa.Id });
                response.Headers.Location = new Uri(uri);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Tarefa não foi incluído com sucesso");
            }
        }

        public HttpResponseMessage PutTarefa(int id, Tarefa tarefa)
        {
            tarefa.Id = id;
            if (!tarefaRepositorio.Update(tarefa))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Não foi possível atualizar a tarefa para o id informado");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        public HttpResponseMessage DeleteTarefa(int id)
        {
            tarefaRepositorio.Remove(id);
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
