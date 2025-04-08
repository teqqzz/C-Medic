using System;

namespace ClinicaMedica.Models;

public class Estoque{
    public int Id { get; set;}
    public string Name { get; set;} = string.Empty;
    public string Tipo { get; set;} = string.Empty;
    public double Preco { get; set; }
    public int Quantidade { get; set; }
    public DateTime Validade { get; set;} 
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public string Criadopor { get; set; } = string.Empty;
}