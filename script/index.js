
function showloader()
{
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video-container').classList.add("hidden");
}

function hideloader()
{
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video-container').classList.remove("hidden");
}


function removeActive(){
    const activebtn=document.getElementsByClassName('active');
    for(let btn of activebtn)
    {
        btn.classList.remove('active')
    }
}

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


function loadvideo(searchText ="")
{
    showloader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response=>response.json())
    .then(data=>{
        removeActive()
        document.getElementById('btn-all').classList.add('active')
        displayvideos(data.videos);
    });

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
        hideloader()
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
                    <p class="text-gray-400 flex gap-1">${video.authors[0].profile_name} ${video.authors[0].verified==true?`<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000"/>`:``}
                    <p class="text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick=loadvideodetails('${video.video_id}') class="btn btn-wide">Show Details</button> 
        </div>
    `;
    videocontainer.append(videocard)
   });
   hideloader()
};
//loadvideo()

const loadcategoryvideos=(id)=>{
    showloader()
   // console.log(id)
    const url=`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        removeActive()
        const clickbtn=document.getElementById(`btn-${id}`);
        clickbtn.classList.add('active')

        displayvideos(data.category);
    });
        
};

const loadvideodetails=(videoId)=>{
  console.log(videoId)
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    displayvideodatails(data.video)
  })
}

const displayvideodatails=(video)=>{
   console.log(video)
   document.getElementById('video_details').showModal()
   const detailscontainer=document.getElementById('details_container');
   detailscontainer.innerHTML=`
   <h2>${video.title}</h2>
   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
   `
}

document.getElementById('searchinput').addEventListener('keyup',(e)=>{
    const input=e.target.value;
    loadvideo(input)
    console.log(input)
})