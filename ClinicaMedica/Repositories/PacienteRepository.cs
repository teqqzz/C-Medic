using System.Collections.Generic;
using System.Linq;
using ClinicaMedica.Models;
using ClinicaMedica.Data;

namespace ClinicaMedica.Repositories
{
    public class PacienteRepository : IPaciente
    {   
        //conexao com banco via Entity Framework
        private readonly AppDbContext _context;

        public PacienteRepository(AppDbContext context){
            _context = context;
        }

        public void CadastrarPacientes(Paciente paciente){
            _context.Pacientes.Add(paciente);
            _context.SaveChanges();
        }

        public List<Paciente> ListarPacientes(){
            return _context.Pacientes.ToList();
        }

        public Paciente ListarPacientePorId(int id){
            var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);

            if (paciente == null){
                throw new Exception("Paciente não encontrado");
            }

            return paciente;
        }
    }
}