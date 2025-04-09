using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClinicaMedica.Data;
using ClinicaMedica.Models;
using ClinicaMedica.Repositories;

namespace ClinicaMedica.Controllers;
[ApiController]
//Criação de rota da Base Paciente
[Route("ClinicaMedica/Paciente")]

//Criação da PacienteController herdando ControllerBase
    public class PacienteController : ControllerBase{

       //Injeção de Dependencias 
        private readonly IPaciente _paciente;
        public PacienteController(IPaciente paciente){
            _paciente = paciente;
        }

        //Endpoint Post Cadastrar Pacientes
        [HttpPost("Cadastrar")]
        public IActionResult CadastrarPacientes([FromBody]Paciente paciente){
            _paciente.CadastrarPacientes(paciente);
            return Created("", paciente);
        }

        //Endpoint GET Listar Pacientes
        [HttpGet("Listar")]
        public IActionResult GetPacientes(){
            var pacientes = _paciente.ListarPacientes();
            return Ok(pacientes);
        }

    }