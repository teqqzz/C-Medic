using System;
using ClinicaMedica.Models;
using ClinicaMedica.Data;

namespace ClinicaMedica.Models
{
    public class Consulta
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public string Status { get; set; } = string.Empty; //Agendado, Realizado, Cancelado
        public string Observacoes { get; set; } = string.Empty;
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public string Criadopor { get; set; } = string.Empty;

        // FK para Paciente
        public int PacienteId { get; set; }
        public Paciente? Paciente { get; set; }
        
        // FK para Médico
        public int MedicoId { get; set; }
        public Medico? Medico { get; set; }
    }
}