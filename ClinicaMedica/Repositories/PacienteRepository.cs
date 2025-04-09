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
            public Paciente AtualizarPacientePorId(int id, Paciente novosDados){
                var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);
                if (paciente == null){
                    throw new Exception("Paciente não encontrado");
                }
                paciente.Name = novosDados.Name;
                paciente.Birthday = novosDados.Birthday;    
                paciente.Email = novosDados.Email;
                paciente.Phone = novosDados.Phone;
                paciente.CPF = novosDados.CPF;
                paciente.Adress = novosDados.Adress;
                paciente.Weight = novosDados.Weight;
                paciente.Height = novosDados.Height;
                paciente.Criadopor = novosDados.Criadopor;
                paciente.CriadoEm = novosDados.CriadoEm;
                _context.Pacientes.Update(paciente);
                _context.SaveChanges();
                
                return paciente;
            }

            public Paciente DeletarPacientePorId(int id){
                var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);
                if (paciente == null){
                throw new Exception("Paciente não encontrado");
                }

                _context.Pacientes.Remove(paciente);
                _context.SaveChanges();
                
                return paciente;
            }
    }
}