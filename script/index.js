function loadcategories(){
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //convert promise to json
    .then(response=>response.json())
    //sent data to display
    .then(data=>displaycategories(data.categories))
}
function displaycategories(categories)
{
    //console.log(categories)
    const categorycontainer=document.getElementById('category-container')
    for(let cat of categories)
    {
        //console.log(cat);
        const div=document.createElement("div");
        div.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadcategoryvideos(${cat.category_id})" class="btn btn-sm hover:bg-red-700 hover:text-white">${cat.category}</button>
        `
        categorycontainer.appendChild(div)
    }
}
loadcategories()


function loadvideo()
{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response=>response.json())
    .then(data=>displayvideos(data.videos))

}
const displayvideos=(videos)=>{
   // console.log(videos)
   const videocontainer=document.getElementById('video-container');
   videocontainer.innerHTML=""

   if(videos.length==0)
   {
    videocontainer.innerHTML=`
    <div class="col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="Icon.png" alt="">
            <h2 class="text-2xl font-bold">OOps!! sorry, No content here</h2>
        </div>`
        return;
   }
   videos.forEach((video)=>{
    //console.log(video)
    const videocard=document.createElement('div')
    videocard.innerHTML=`
    <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover"
                src=${video.thumbnail}
                alt="Shoes" />
                <span class="absolute bottom-3 right-2 px-2 bg-black text-white text-sm rounded-sm">3 hour 56 minute ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
               <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src=${video.authors[0].profile_picture} />
                    </div>
                </div>
                </div>
                <div class="intro ">
                    <h2 class="text-sm font-semibold">Midnight</h2>
                    <p class="text-gray-400 flex gap-1">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src=" https://img.icons8.com/?size=64&id=2AuMnRFVB9b1&format=png" alt=""></p>
                    <p class="text-gray-400">${video.others.views}</p>
                </div>
            </div>
             
        </div>
    `;
    videocontainer.append(videocard)
   });
};
//loadvideo()

const loadcategoryvideos=(id)=>{
   // console.log(id)
    const url=`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        const clickbtn=document.getElementById(`btn-${id}`);
        clickbtn.classList.add('active')
        console.log(clickbtn)
        displayvideos(data.category);
    });
        
};