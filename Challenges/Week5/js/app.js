$(document).ready( function() {
  function addPokemon(name) {
    $(`
        <li class="poke-card">
            <h3 class="name">${name}</h3>
        </li>
    `).appendTo('#pokemon');
  };

  function displayCard( data ) {
    var htmlString = '<div class="poke-card-large"><h1>' + data.name + '</h1>';
    htmlString += '<p>Weight: ' + data.weight + ' | Height: ' + data.height + '</p>';
    if (data.abilities.length > 0) {
      htmlString += '<h3>Abilities:</h3><ul>';
      $.each( data.abilities, function( i, ability ) {
        htmlString += '<li>' + ability.ability.name.trim() + '</li>';
      }); //end each
      htmlString += '</ul>';
    } //end if
    if (data.stats.length > 0) {
      htmlString += '<h3>Stats:</h3><ul>';
      $.each(data.stats, function( i, stat ) {
        htmlString += '<li>' + stat.stat.name + ': ' + stat.base_stat + '</li>';
      }); //end each
      htmlString += '</ul>'
      htmlString += '<img src="' + data.sprites.front_default + '">';
    }
    htmlString += '</div>';
    $('#main-content').append( htmlString );
  };

  // 1.)  Use the PokéAPI from http://pokeapi.co along with jQuery's getJSON function to retrieve the first 20 Pokémon.
  // 1.1)  Use the addPokemon function to show each of the Pokémon names that were retrieved.
  //Hint: Learn how to access resources via the documentation http://pokeapi.co/docsv2/#resource-lists

  var pokemonData;
  var pokemonAPI = 'http://pokeapi.co/api/v2/pokemon/';
  function displayPokemon( data ) {
    pokemonData = data;
    $.each( data.results, function( i, pokemon ) {
      addPokemon(pokemon.name);
    }); //end each
    // Use jQuery to disable the next/previous buttons if there are no more Pokémon to retrieve in that direction.
    if ( data.next === null ) {
      $('#next').attr('disabled', true);
    } else {
      $('#next').attr('disabled', false);
    }
    if ( data.previous === null ) {
      $('#previous').attr('disabled', true);
    } else {
      $('#previous').attr('disabled', false);
    }
  } // end pokeCallback

  $.getJSON( pokemonAPI, displayPokemon);

// Use jQuery to create a click handler for the next and previous buttons.
// Use the "next" and "previous" properties of the pokemon resource object to get the next or previous list of Pokémon.
// When a user clicks next or previous, remove all existing Pokémon from the ul element and add the new list of Pokémon.
  $('#previous').click( function() {
    $('#pokemon').empty();
    $.getJSON( pokemonData.previous, displayPokemon );
  }); //end click

  $('#next').click( function() {
    $('#pokemon').empty();
    $.getJSON( pokemonData.next, displayPokemon );
  }); //end click
/*  Super Awesome Bonus!
    When you click on a Pokémon name, hide all the names and show a larger card that contains details about that Pokémon such as their sprite (picture), name,
    type or anything else you would like to include.  Add a way to go back to the list when your're done looking at the detail.

    Be creative, you can style/arrange the detail information however you like!
*/
  $('#pokemon').on('click', 'li', function() {
    //hide all names
    $('#pokemon').hide();
    $('button').hide();
    //get data and display selected card
    var temp = pokemonAPI + $(this).text().trim();
    $.getJSON( temp, displayCard );
    console.log( temp );
  });//end click

// Go back to main list when click on large card
  $('#main-content').on('click','.poke-card-large', function() {
    $(this).hide();
    $('#pokemon').show();
    $('button').show();
  }); //end click

}); // end ready
