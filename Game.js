let player1Name=document.getElementById('Player1Id');
let player2Name=document.getElementById('Player2Id');
const defaultCategories=["General Knowledge","History","Science","Sports","Geography"];
let categories=JSON.parse(localStorage.getItem('CatValues'))||defaultCategories;
const cat=document.getElementById("cat");
cat.innerHTML="";

categories.forEach(field => {
    const option=document.createElement("option");
    option.value=field;
    option.textContent=field;
    cat.append(option);
});

let Player1={name:'',score: 0};
let Player2={name:'',score: 0};

function getNames(){
    Player1.name=player1Name.value.toUpperCase();
    Player2.name=player2Name.value.toUpperCase();
    if(!Player1.name || !Player2.name){
        alert('Enter both Player Names');
        return;
    }else{
        const category=document.getElementById("cat").value;
        // console.log(category);
        localStorage.setItem('Player1',JSON.stringify(Player1));
        localStorage.setItem('Player2',JSON.stringify(Player2));
        localStorage.setItem('Category',category);
        localStorage.setItem('CatValues',JSON.stringify(categories));
        console.log(localStorage.getItem('Player1'));
        window.location.href="loadAndFetch.html";
    }
    
}
