// Homepage Random Meal Generation
let checkMealName = String.fromCharCode('a'.charCodeAt(0) + Math.floor(Math.random() * 26));
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${checkMealName}`)
            .then(res => res.json())
            .then(data => {
                    displayFoundMeals(data.meals);
            })

// Search Button Click Operation
document.getElementById("search-btn").addEventListener("click", function () {
    // removing warning text
    showWarning("");    

    let mealName = document.getElementById("input-meal-name").value;
    // trimming empty spaces
    mealName = mealName.trim();

    if (mealName === "") {
        showWarning("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    showWarning(`No meal found with name \"${mealName}\". Please try again.`)
                } else {
                    displayFoundMeals(data.meals);
                }
            })
    }
    // clearing input field
    document.getElementById("input-meal-name").value = "";
})

// Search: Enter key trigger.
document.getElementById("input-meal-name").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("search-btn").click();
});

function showWarning(warningText) {
    document.getElementById("warning-text").innerText = warningText;
}


function displayFoundMeals(meals) {
    // clearing previous search result and hiding single meal-details section
    document.getElementById("meal-list").innerHTML = "";
    document.getElementById("meal-details").style.display = 'none';

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="meal-card">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("meal-list").appendChild(mealDiv);
    });
}

// fetching single meal details
function mealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
}

// displaying single meal details
function displayMealDetails(meal) {
    document.getElementById("meal-details-display").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="meal-details-image">
        <h3 class="meal-details-title">${meal.strMeal}</h3>
    </div>
    <div>
        <h4>  Ingredients</h4>
         <ul id="ingredient-list">

        </ul>
    </div>
    `;

    // Displaying meal instructions.
    document.getElementById("instruction-display").innerHTML = `
    <p class="instructions">${meal.strInstructions}</p>
    `;

    // Displaying Ingredients.
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) break;

        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }

    document.getElementById("meal-details").style.display = "block";
    document.getElementById("meal-details").scrollIntoView({ behavior: "smooth" });
}
