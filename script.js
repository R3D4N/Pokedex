const fetchPokemon = async () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    // fetch es para consultar APIs, pregunta y obtiene respuesta
    const data = await fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/img-pokemonSad.gif")
            const pokeIdName = document.getElementById("pokemon-id-name");
            pokeIdName.textContent = "Pokemon Not Found";
        }
        else {
            return res.json();
        }
    })

    if (data) {
        //console.log(data);
        // show image of pokemon
        let pokeImg = data.sprites.other.dream_world.front_default;
        pokeImage(pokeImg);

        // show id and name of pokemon
        let pokeId = data.id;
        let pokeName = data.name;
        pokeData(pokeId, pokeName);

        // show height and weight of pokemon
        let pokeHeight = data.height;
        let pokeWeight = data.weight;
        pokeBody(pokeHeight, pokeWeight);

        // show type and abilities of pokemon
        let pokeTypes = data.types.map(item => (item.type.name));
        let pokeAbilities = data.abilities.map(item => (item.ability.name));

        pokeTypeAbility(pokeTypes, pokeAbilities);
    }
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeData = (pokeId, pokeName) => {
    const pokeIdName = document.getElementById("pokemon-id-name");
    pokeIdName.textContent = "#0" + pokeId.toString() + "-" + pokeName.toUpperCase();
}

const pokeBody = (pokeHeight, pokeWeight) => {
    const pokemonHeight = document.getElementById("pokemon-height");
    const pokemonWeight = document.getElementById("pokemon-weight");
    pokemonHeight.textContent = "Altura: " + (pokeHeight / 10).toString() + " M";
    pokemonWeight.textContent = "Peso: " + (pokeWeight / 10).toString() + " Kg";
}

const pokeTypeAbility = (pokeTypes, pokeAbilities) => {
    // se usa spread operator para convertirlo en array object
    const pokemonTypes = [...(document.getElementsByClassName("pokemon-type"))];
    const pokemonAbilities = [...(document.getElementsByClassName("pokemon-ability"))];
    const colores = ["#ead151", "#88c357", "#1d8eca", "#0bcdff", "#4075da"];

    // write each type in each spam tag
    pokemonTypes.forEach((element, index) => {
        if (index < pokeTypes.length) {
            element.textContent = pokeTypes[index];
            // paint the tag
            element.style.backgroundColor = colores[4];
        } else {
            element.textContent = "";
            element.style.background = "none";
        }
    })

    // write each ability in each spam tag
    pokemonAbilities.forEach((element, index) => {
        if (index < pokeAbilities.length) {
            element.textContent = pokeAbilities[index];
            // paint the tag
            element.style.backgroundColor = colores[index];
        } else {
            element.textContent = "";
            element.style.background = "none";
        }
    })
}