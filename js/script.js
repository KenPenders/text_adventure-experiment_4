let optieLaag = localStorage.getItem('optieLaag'); // vul var met laatste waarde uit localstorage
/* Slaat op in welke 'keuzelaag' van de dialogue tree je je bevindt*/ 



/* Slaat op welke opties je hebt gekozen in de dialoog. Cijfer (van de laag) en letter(van de geklikte button)*/  
// create a let with an array with the content of alleGekozenOpties
let alleGekozenOpties = JSON.parse(localStorage.getItem('alleGekozenOpties')) || [];


/* Mijn oude code, voordat ik het opnieuw gedaan heb*/
// let gekozenOpties = JSON.parse(localStorage.getItem('gekozenOpties')) || [];


/* Zet nummers om in letters van het alfabet (1=A,2=B,enz) Bron: https://www.tutorialspoint.com/convert-number-to-alphabet-letter-javascript */
const toAlpha = (num) => {
    if(num < 1 || num > 26 || typeof num !== 'number'){
       return -1;
    }
    const leveller = 64;
    //since actually A is represented by 65 and we want to represent it with one
    return String.fromCharCode(num + leveller);
};
    


/* Initiele toestand */
document.addEventListener("DOMContentLoaded", function() {
    var initialClickedOptie;
    if (localStorage.getItem('optieLaag') == null) {
        initialClickedOptie = 0;
    }else {
        initialClickedOptie = String( localStorage.getItem('optieLaag') );
    }

    localStorage.setItem('optieLaag', initialClickedOptie);
    
    // $.getJSON( "../json/dialogenEnOpties.json", function(data){
    //     $.each(data, function(key, value) {
    //         $('#dialoog1').text(this[initialClickedOptie].dialogen.dialoog1) ;
    //         //console.log(this[clickedOptie].dialogen.dialoog1)
    //         $('#dialoog2').text(this[initialClickedOptie].dialogen.dialoog2) ;
    //         //console.log(this[clickedOptie].dialogen.dialoog2)
    //         $('#dialoog3').text(this[initialClickedOptie].dialogen.dialoog3) ;

    //         $('#option-A').text(this[initialClickedOptie].opties.optie1) ;
    //         $('#option-B').text( this[initialClickedOptie].opties.optie2)
    //         $('#button-A').attr('keuze', this[initialClickedOptie].welkeOpties.optie1)
    //         //console.log(this[clickedOptie].welkeOpties.optie1)
    //         $('#button-A').attr('keuze', this[initialClickedOptie].welkeOpties.optie1)
    //         //console.log(this[clickedOptie].welkeOpties.optie2)
    //     })
    // });


    $.support.cors
    $.ajax({
        method: "GET", 
        url: "dialogenEnOpties.json",    
        contentType: "application/json; charset=utf-8",  
        dataType:"json", 
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/json; charset=utf-8" );
        },
        error: function(){
            //Error code
            
        },
        success: function(data){
            $.each(data, function() {
                $('#dialoog1').text(this[initialClickedOptie].dialogen.dialoog1) ;
                //console.log(this[clickedOptie].dialogen.dialoog1)
                $('#dialoog2').text(this[initialClickedOptie].dialogen.dialoog2) ;
                //console.log(this[clickedOptie].dialogen.dialoog2)
                $('#dialoog3').text(this[initialClickedOptie].dialogen.dialoog3) ;
    
                $('#option-A').text(this[initialClickedOptie].opties.optie1) ;
                $('#option-B').text( this[initialClickedOptie].opties.optie2)
                $('#button-A').attr('keuze', this[initialClickedOptie].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie1)
                $('#button-A').attr('keuze', this[initialClickedOptie].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie2)
            })
        }
    });

    //$("#dialoog1, #dialoog2, #dialoog3, #option-A, #button-A, #option-B, #button-B").addClass('visible');

});

/* Reset knop: terug naar het begin */
$('#reset-button').click(function(event){
    var startPosition = 0;
    //$("#dialoog1, #dialoog2, #dialoog3, #option-A, #button-A, #option-B, #button-B").removeClass('visible');
    alleGekozenOpties = [];

    localStorage.setItem('optieLaag', startPosition);
    localStorage.setItem('alleGekozenOpties', null);


    $.support.cors
    $.ajax({
        method: "GET", 
        url: "dialogenEnOpties.json",    
        contentType: "application/json; charset=utf-8",  
        dataType:"json", 
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/json; charset=utf-8" );
        },
        error: function(){
            //Error code
            
        },
        success: function(data){
            $.each(data, function() {
                $('#dialoog1').text(this[startPosition].dialogen.dialoog1) ;
                //console.log(this[clickedOptie].dialogen.dialoog1)
                $('#dialoog2').text(this[startPosition].dialogen.dialoog2) ;
                //console.log(this[clickedOptie].dialogen.dialoog2)
                $('#dialoog3').text(this[startPosition].dialogen.dialoog3) ;
    
                $('#option-A').text(this[startPosition].opties.optie1) ;
                $('#option-B').text( this[startPosition].opties.optie2)
                $('#button-A').attr('keuze', this[startPosition].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie1)
                $('#button-A').attr('keuze', this[startPosition].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie2)
            })
        }
    });

    //$("#dialoog1, #dialoog2, #dialoog3, #option-A, #button-A, #option-B, #button-B").addClass('visible');

});

/*Wanneer je een van de twee optie kiest in een 'keuzelaag' van het verhaal */
$('.option-button').click(function(event){
    event.preventDefault();
    //$("#dialoog1, #dialoog2, #dialoog3, #option-A, #button-A, #option-B, #button-B").removeClass('visible');
    var clickedButtonLetter = $(this).attr('id').replace('button-', '');//Later veranderen in id
    var clickedButtonNum = $(this).attr('keuze').replace("A", "").replace("B", "");;
    var clickedOptie = String(clickedButtonNum + clickedButtonLetter);
     

    optieLaag = clickedOptie;
    console.log(optieLaag);
    localStorage.setItem('optieLaag', optieLaag);


    /* Push de gekozen optie in de array. Cijfer (van de laag) en letter(van de geklikte button)*/
    alleGekozenOpties.push( clickedOptie );
    //console.log(gekozenOpties);
    // push the array to localstorage
    localStorage.setItem('alleGekozenOpties', JSON.stringify(alleGekozenOpties));
    

    // $.getJSON( "../json/dialogenEnOpties.json", function(data){
         
    //     $.each(data, function(key, value) {
    //         $('#dialoog1').text(this[clickedOptie].dialogen.dialoog1) ;
    //         //console.log(this[clickedOptie].dialogen.dialoog1)
    //         $('#dialoog2').text(this[clickedOptie].dialogen.dialoog2) ;
    //         //console.log(this[clickedOptie].dialogen.dialoog2)
    //         $('#dialoog3').text(this[clickedOptie].dialogen.dialoog3) ;

    //         $('#option-A').text(this[clickedOptie].opties.optie1) ;
    //         $('#option-B').text( this[clickedOptie].opties.optie2)
    //         $('#button-A').attr('keuze', this[clickedOptie].welkeOpties.optie1)
    //         //console.log(this[clickedOptie].welkeOpties.optie1)
    //         $('#button-A').attr('keuze', this[clickedOptie].welkeOpties.optie1)
    //         //console.log(this[clickedOptie].welkeOpties.optie2)
    //     })
    // }); 

    $.support.cors
    $.ajax({
        method: "GET", 
        url: "dialogenEnOpties.json",    
        contentType: "application/json; charset=utf-8", 
        dataType:"json", 
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "application/json; charset=utf-8" );
        },
        error: function(){
            //Error code
            
        },
        success: function(data){
            $.each(data, function() {
                $('#dialoog1').text(this[clickedOptie].dialogen.dialoog1) ;
                //console.log(this[clickedOptie].dialogen.dialoog1)
                $('#dialoog2').text(this[clickedOptie].dialogen.dialoog2) ;
                //console.log(this[clickedOptie].dialogen.dialoog2)
                $('#dialoog3').text(this[clickedOptie].dialogen.dialoog3) ;
    
                $('#option-A').text(this[clickedOptie].opties.optie1) ;
                $('#option-B').text( this[clickedOptie].opties.optie2)
                $('#button-A').attr('keuze', this[clickedOptie].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie1)
                $('#button-A').attr('keuze', this[clickedOptie].welkeOpties.optie1)
                //console.log(this[clickedOptie].welkeOpties.optie2)
            })
        }
    });
   
    //$("#dialoog1, #dialoog2, #dialoog3, #option-A, #button-A, #option-B, #button-B").addClass('visible');


    /* Mijn oude code, voordat ik het opnieuw gedaan heb*/

    // /* Wanneer je klikt op een optie, ga je naar een volgende keuzelaag. Dat wordt hier bijgehouden. */
    // laagCount++
    // //console.log(laagCount); 
    // localStorage.setItem('laagCountNum', laagCount)
    // localStorage.setItem('laagCount', toAlpha(laagCount) );
    // var huidigeLaagLetter = localStorage.getItem('laagCount'); /* Iedere 'keuzelaag' is een letter */
    // var volgendeLaagLetter = toAlpha(laagCount + 1); 
    // var clickedButtonNumber = $(this).attr('id').substring(1,3); /* Check welk number de id van de button heeft. Het nummer is het tweede karakter in de 'id'-string. Bijv. A1 clickedButtonNumber = 1 */
    // var otherButtonNumber;



    // // push de deur nummer in de array
    // gekozenOpties.push( $(this).attr('id') );
    // //console.log(gekozenOpties);
    // // push the array to localstorage
    // localStorage.setItem('alleGekozenOpties', JSON.stringify(gekozenOpties));



    // var laagCountNumJsonIndex = parseFloat( localStorage.getItem('laagCountNum') )
    // /* Ik heb uitgezocht hoe getJSON() werkt (dit had ook met AJAX gekunt), omdat ik best veel tekst heb. 
    // Ik wil hiervoor niet lange strings in de js-file hoeven schrijven of in html-file(-s). Dat wordt onoverzichtelijk. 
    // Daarnaast hoef je nu alleen nog maar de json aan te passen bij verandering aan de dialogen.*/ 
    // $.getJSON( "../json/dialogenEnOpties.json", function(data){
    //     $.each(data, function(key, value) {
    //         $('#dialoog1').text(this[laagCountNumJsonIndex].dialogen.dialoog1) ;
    //         $('#dialoog2').text(this[laagCountNumJsonIndex].dialogen.dialoog2) ;
    //         $('#dialoog3').text(this[laagCountNumJsonIndex].dialogen.dialoog3) ;
    //     })
    // });
    
    

    // if(clickedButtonNumber == '1') {
    //     otherButtonNumber = 2;
    // }else {
    //     otherButtonNumber = 1;
    // }

    // console.log('huidige laag=' + huidigeLaagLetter)
    // console.log('volgende bestemming button 1=' + volgendeLaagLetter + clickedButtonNumber );
    // console.log('volgende bestemming button 2=' + volgendeLaagLetter + otherButtonNumber);

    
    // $(this).attr( 'id' , volgendeLaagLetter + clickedButtonNumber); /* Verander de id van de aangeklikte button in de volgende optie. Bijv. Button id='B1' wordt id='C1' */
    // $('[id="'+ String(huidigeLaagLetter + otherButtonNumber) +'"]').attr( 'id' , volgendeLaagLetter + otherButtonNumber);
    
        
    
    
        
        
        

    
    

});
