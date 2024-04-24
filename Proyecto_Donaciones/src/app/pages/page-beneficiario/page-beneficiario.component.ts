import { Component } from '@angular/core';
import { Alimento } from '../../services/models/alimento';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { Producto } from '../../services/models/producto';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-beneficiario',
  templateUrl: './page-beneficiario.component.html',
  styleUrl: './page-beneficiario.component.css'
})
export class PageBeneficiarioComponent {
  arrayObjetos: number[] = [];
  alimentos: Alimento[] = [];
  productos: Producto[] = [];
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  formBenefAlimento = this.fb.group({
    fechaHoraProgramada: ['', [Validators.required]],
  });
  contenidoConcatenado: string = '';
  suma: number = 0;
  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
    // this.arrayObjetos[2] = 'arroz';
    // this.arrayObjetos[21] = 'azucar';
    this.display();
  }

  urlGetAllAlimentos(){
    this.loginService.urlGetAllAlimentos().subscribe({
      next: (data) => {
        this.alimentos = data;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.alimentos = errorData;
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }
  urlGetAllProductos(){
    this.loginService.urlGetAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.alimentos = errorData;
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }

  display(){
    
    this.urlGetAllAlimentos();
    this.urlGetAllProductos();
    this.concatenarContenido();
  }

  // agregarElemento(id: number, nprod: string){
  //   this.arrayObjetos[id] = nprod;
  // }
  agregarElemento(id: number){
    if (!this.arrayObjetos[id]) {
        // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
        this.arrayObjetos[id] = 0;
    }
    this.arrayObjetos[id] += 1;
  }
  dejarElemento(id: number){
    if (!this.arrayObjetos[id]) {
        // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
        this.arrayObjetos[id] = 0;
    }
    this.arrayObjetos[id] -= 1;
  }

  concatenarContenido(): void {
    this.contenidoConcatenado = '';
    this.suma = 0;
    for (let i = 0; i < this.arrayObjetos.length; i++) {
      if (this.arrayObjetos[i] !== undefined && this.arrayObjetos[i] !== null) {
        let alimento: string = (this.alimentos.find(a => a.idAlimento === i))?.tipo as string;
        // if (alimento) {
        //   vari = alimento.tipo; // Asigna el tipo del alimento encontrado
        // }
        if(this.arrayObjetos[i] > 0){
          this.contenidoConcatenado += (this.arrayObjetos[i]).toString() + alimento + ',';
          this.suma += this.arrayObjetos[i];
        }
      }
    }
    // Elimina la coma y el espacio extra al final
    this.contenidoConcatenado = this.contenidoConcatenado.slice(0, -1);

    // Quita todos los "0" individuales que no están seguidos por otros dígitos
    // contenidoConcatenado = contenidoConcatenado.replace(/\b0\b/g, '');



    console.log(this.contenidoConcatenado, '\n',this.suma);


    // console.log(this.arrayObjetos);
    
    
  }

  enviarFormBenefAlimento() {
    this.concatenarContenido();
    const fechaObjeto = new Date(
      this.formBenefAlimento.value.fechaHoraProgramada as string
    );

    // Obtener los componentes de la fecha
    const dia = fechaObjeto.getDate().toString().padStart(2, '0'); // Día con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0, por lo que se suma 1 (padStart se utiliza para agregar un cero inicial si es necesario)
    const anio = fechaObjeto.getFullYear();
    const horas = fechaObjeto.getHours().toString().padStart(2, '0'); // Horas con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
    const minutos = fechaObjeto.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)

    // Construir la cadena de fecha en el formato deseado
    const fechaTransformada = `${dia}/${mes}/${anio}/${horas}/${minutos}`;
    if(this.formBenefAlimento.valid){
      if(this.suma>0){
        console.log(this.currentUsuarioSimpleData.correo, '\n', this.suma, '\n', this.contenidoConcatenado, fechaTransformada);
        this.loginService
        .urlRealizarSolicitudBene(this.currentUsuarioSimpleData.correo, this.suma, this.contenidoConcatenado, fechaTransformada)
        .subscribe({
          next: (salida) => {
            console.log('salida: ', salida);
            // alert('Su solicitud para ser ha sido enviada.')
          },
        });  
        
      }else {
        alert('Debe elegir un producto antes de enviar.')
      }

      
    }else{
      alert('No olvide agregar la fecha de envio')
    }
  }
}
