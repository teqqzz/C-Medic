using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClinicaMedica.Data;

namespace ClinicaMedica.Repositories
{
    public interface IPaciente
    {
        void CadastrarPacientes(Paciente paciente);
        List<Paciente> ListarPacientes();
        Paciente ListarPacientePorId(int id);
    }
}