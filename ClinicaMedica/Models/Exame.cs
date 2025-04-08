using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicaMedica.Models
{
    public class Exame
    {
        public int Id { get; set;}

        public int CodeE {get; set;}
        public string Name { get; set;} = string.Empty;
        public double Preco{ get; set;}
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public string Criadopor { get; set; } = string.Empty;
    }
}