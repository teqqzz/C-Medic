using Microsoft.EntityFrameworkCore;
using ClinicaMedica.Models;

namespace ClinicaMedica.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Estoque> Estoque { get; set; }
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Medico> Medicos { get; set; }

    public DbSet<Exame> Exames { get; set; }
    public DbSet<Consulta> Consultas { get; set; }
    public DbSet<Pagamento> Pagamentos { get; set; }
    
}