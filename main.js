let favouriteCountainer= document.getElementById("fav")
let mealsEla = document.getElementById("meals")
async function getRandomMeal() {
    let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    let respData = await resp.json();
    let randomMeal = respData.meals[0];
    console.log(randomMeal);

    addmeal(randomMeal, true);
}

async function getMealById(id) {
    let resp = await fetch(
        " https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id );
     
    console.log(resp)

    let respon = await resp.json()

    console.log(respon)

     let meal = respon.meals[0]
    

    return meal

}

async function getMealBySearch(term) {
    let resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);


    let resData= await resp.json()

    let meals =   resData.meals

    return meals
}


getRandomMeal();
fetchFavMeals ()
let btn1;

function addmeal(mealData, random = false) {
    ;
    let meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
    <div class="mealHead">

    ${ random ? ` <span class="random">random recipe</span>` : " " }

    <img id="swra" src=${mealData.strMealThumb} alt="${mealData.strMeal}">
    
    </div>
    <div class="mealBody">
    <h4>${mealData.strMeal}</h4> 
    <button class="f-btn"><i class="fa-regular fa-heart"></i></button>
    
    </div>
    `;

     btn1=meal.querySelector(".mealBody .f-btn")
    
    let i = meal.querySelector(".f-btn i")
    console.log(i)
   

   btn1.addEventListener("click",(e)=> {
      

       
       if(btn1.classList.contains("active"))
       {
           removeMealfls(mealData.idMeal)
           console.log(mealData.idMeal)
           btn1.classList.remove("active")
           
        }
        else
        {
            addMealTols(mealData.idMeal)
            btn1.classList.add("active")
           
            
    }
      
    // btn1.classList.toggle("active")
   fetchFavMeals()
   
})
let swra =meal.querySelector(".mealHead")
console.log(swra)
swra.addEventListener("click",function(){
    updateMealInfo(mealData)

})

    meals.appendChild(meal);
}



function addMealTols(mealId)
{
    let mealidis=getMealfls()

 let idi = localStorage.setItem("mealids",JSON.stringify( [...mealidis,mealId]))



}

function getMealfls()
{
  let mealidis =JSON.parse(localStorage.getItem("mealids"))

  console.log(mealidis)

  return mealidis === null ? []:mealidis
}



function removeMealfls(mealId)
{
    let mealidis= getMealfls()

    let idi = localStorage.setItem("mealids",JSON.stringify(mealidis.filter(id=> id !== mealId)))

}


async function fetchFavMeals ()
{
     favouriteCountainer.innerHTML=" "
    
    let meals =[]
    let mealidis= getMealfls()
    
    for(let i=0 ;i<mealidis.length;i++)
    {
        let mealid = mealidis[i]
        
        let meal= await  getMealById(mealid)
        
        addfavmeal(meal)
        
        // meals.push(meal)
    }
    console.log(meals)
}


function addfavmeal(mealData) {
    //let meals = document.getElementById("meals");
    let favmeal = document.createElement("li");
    favmeal.classList.add("meal");

    favmeal.innerHTML = `
    
                        <img class="go" src= "${mealData.strMealThumb}"
                         alt="${mealData.strMeal}">
                        <span>${mealData.strMeal}</span>
                        <button class="clear"><i class="fa-solid fa-xmark"></i></button>
                        
    `;


             

           let btn =  favmeal.querySelector(".clear")
           btn.addEventListener("click",()=>{
            btn1.classList.remove("active")
            removeMealfls(mealData.idMeal)
            console.log(mealData.idMeal)
            fetchFavMeals()


           })
            let go  = favmeal.querySelector(".go")
              go.addEventListener("click",function(){
                updateMealInfo(mealData)
              })



   
   
// })
favouriteCountainer.appendChild(favmeal);
}

let searchTerm =document.getElementById("searchTerm")
let searchBtn =document.getElementById("searchBtn")

searchBtn.addEventListener("click",async ()=>{
    mealsEla.innerHTML= ""
    let search = searchTerm.value
    let meals= await  getMealBySearch(search)
    console.log(meals)

     if(meals)
   { meals.forEach(meal => {addmeal(meal) })};
})

let pop=document.getElementById("pop")
let mealinfo=document.getElementById("meal-info")
let mealpop =document.getElementById("mealpop")

pop.addEventListener("click",function(){
    mealpop.classList.add("hidden")
    
})

let meeealinfo=document.getElementById("meeealinfo")


function updateMealInfo(mealData)
{
   
    meeealinfo.innerHTML=" "
     let ele =document.createElement("div")
     
     ele.innerHTML=`   <h2>${mealData.strMeal}</h2>
     <img
         src="${mealData.strMealThumb}"
         alt=""
     />
 
 
     <p>
        ${mealData.strInstructions}
     </p>
     `

     meeealinfo.appendChild(ele)
     mealpop.classList.remove("hidden")
}




