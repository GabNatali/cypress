import moment from 'moment';
import 'cypress-wait-until';

describe('Login', () => {
    before(() => {
        cy.login('italo.aparicio@epp.pe','epp10')
        cy.visit('rei/aprendizaje')
    });

    it('Select Options', () =>{

        function generarI(moment , time, method) {
            cy.get('select#codTipoSecuencia').select(moment);
            cy.get('select#intMinuto').select(time);
            cy.get('select#codActividad').select(method);
            cy.get('button#btn-generar-sesion-aprendizaje').as('generar')
            cy.get('@generar').click();
        
            cy.request('POST','rei/aprendizaje/json').then((response) => {
                if(response.status === 200){
                    cy.wait(17000)
                }
            });
        
            if( cy.get('@generar').should('not.be.disabled')){
                cy.get('button').contains('Grabar').click();
            }
            cy.request('POST','rei/aprendizaje/calendario').then((response)=>{
                expect(response.status).to.eq(200);
            })
        }

        cy.get('#select2-docentes-container').type('Italo Aparicio{enter}');
        cy.get('select#aulas').select('1° Secundaria A', { force: true });
        cy.get(':nth-child(3) > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field')
            .type('Secundaria{enter}')
        cy.get('#bt-crear-sesion-aprendizaje').click();
        cy.get(':nth-child(2) > :nth-child(1) > .col-sm-4.col-md-2 > .select2 > .selection > .select2-selection').type(' ')
        cy.get('#select2-intNumeroSesion-results').children().contains('Sesión 1').click()
        cy.get('select#codPeriodo').select('1° Bimestre')
        cy.get('#strTituloTema').type('ley de signos')

        // Generando fecha actual menos domingo
        const fechaActual = moment();
        if (fechaActual.day() === 0 ) {
            fechaActual.add(1, 'days');
        }
        const newFecha = fechaActual.format("DD/MM/YYYY");

        cy.get('#fchDesarrollo').type(newFecha);
        cy.get('#fchDesarrollo').should("have.value", newFecha);
        cy.get('body').click();
        
        cy.get('.multiselect').click()
        cy.get('label.checkbox').contains(' 1ra - 9:00 / 9:40').click();
        cy.get('label.checkbox').contains(' 2da - 9:45 / 10:25').click();
        cy.get('.agregar-secuencia-didactica').as('add');
        cy.get('@add').click();
        cy.get('button').contains('Propósito de aprendizaje').click();
        cy.get('button').contains('Resuelve problemas de cantidad').click();
        cy.get(':nth-child(1)>.col-12.pr-0 >.contenedor-capacidad-target').children('button').click();
        cy.get('button').contains('Traduce cantidades a expresiones numéricas').click()
        cy.get('button').contains('Desempeño').click()
        cy.get('li.nav-item>a>div').first().click();
        generarI('Inicio','10','Gamificación');

        cy.get('@add').click();
        generarI('Desarrollo','50','Gamificación');

        cy.get('@add').click();
        generarI('Cierre','10','Aprendizaje Autónomo');
    })
});


