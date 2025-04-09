using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicaMedica.Models
{
    public class Medico
    {
        public int Id { get; set;}
        public string Name { get; set;}= string.Empty;
        public string Birthday { get; set;}= string.Empty;
        public string Email { get; set;}= string.Empty;
        public string Phone { get; set;}= string.Empty;
        public string CPF { get; set;}= string.Empty;
        public int CRM { get; set;}
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public string Criadopor { get; set; } = string.Empty;
    }
}