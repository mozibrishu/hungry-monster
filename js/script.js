document.getElementById("search-btn").addEventListener("click", function () {
    showWarning(""); // removing warning Text

    const inputMealName = document.getElementById("input-meal-name").value;
    const mealName = inputMealName.trim();

    if (mealName === "") {
        showWarning("Please Enter a meal name.")
    } else {

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    showWarning("No meal found. Please try another.")
                } else {
                    console.log(data);
                    processData(data.meals);
                }
            })
    }
})

function processData(meals) {
    document.getElementById("meal-list").innerHTML = "";
    meals.forEach(meal => {
        const mealDisplay = `
        <div class="meal-card">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = mealDisplay;
        document.getElementById("meal-list").appendChild(mealDiv);
    });
}


function showWarning(warningText) {
    document.getElementById("warning-text").innerText = warningText;
}