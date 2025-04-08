using System;
using ClinicaMedica.Models;
using ClinicaMedica.Data;
public class Pagamento
{
    public int Id { get; set; }
    public string Tipo { get; set; } = string.Empty; // Pix, Cartão, Dinheiro
    public decimal Valor { get; set; }
    public string Status { get; set; } = string.Empty; // Pago, Pendente, Cancelado
    public DateTime DataPagamento { get; set; }
    public string Referencia { get; set; } = string.Empty;
    public string? Observacoes { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public string Criadopor { get; set; } = string.Empty;

    // FK Consulta
    public int? ConsultaId { get; set; }
    public Consulta? Consulta { get; set; }

    // FK Medico
    public int? PacienteId { get; set; }
    public Paciente? Paciente { get; set; }
}