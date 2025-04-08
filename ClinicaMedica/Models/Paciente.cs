using System;

namespace ClinicaMedica.Data
{
    public class Paciente
    {
        public int Id { get; set;}
        public string Name { get; set;}= string.Empty;
        public string Birthday { get; set;}= string.Empty;
        public string Email { get; set;}= string.Empty;
        public string Phone { get; set;}= string.Empty;
        public int CPF { get; set;}= int.MaxValue;
        public double Weight { get; set;}= double.MaxValue;
        public double Height { get; set;}= double.MaxValue;
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public string Criadopor { get; set; } = string.Empty;       
    }
}