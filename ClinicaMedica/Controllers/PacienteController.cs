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
            return Ok(new {
                mensagem = "Pacientes Encontrados: ",
                pacientes = pacientes
            });
        }

        //Endpoint GET Verificar Paciente pelo ID
        [HttpGet("ListarId/{id}")]
        public IActionResult GetPacienteId(int id){
            var paciente = _paciente.ListarPacientePorId(id);
            if (paciente == null){
                return NotFound("Paciente não encontrado.");
            }

            return Ok(paciente);
            }

         //Endpoint Put Verificar Paciente pelo ID
        [HttpPut("Atualizar")]
        public IActionResult AtualizarPaciente([FromBody]Paciente paciente){
            try{
            var pacienteAtualizado = _paciente.AtualizarPacientePorId(paciente.Id, paciente);
            if (pacienteAtualizado == null){
                return NotFound("Paciente não encontrado.");
            }

                return Ok(new {
                mensagem = "Paciente Atualizado: ",
                pacienteAtualizado = pacienteAtualizado
                });
            }
            catch(Exception ex){
            return BadRequest($"Erro ao atualizar: {ex.Message}");
            }
        }

        [HttpDelete("Deletar/{id}")]
        public IActionResult DeletarPacientePorId(int id){
            var pacienteDeletado = _paciente.DeletarPacientePorId(id);
            if (pacienteDeletado == null){
                return NotFound("Paciente não encontrado.");
            }

            return Ok(new {
                mensagem = "Paciente deletado: ",
                paciente = pacienteDeletado
            });
        }
        
    }    

    