document.getElementById("buy-now").addEventListener("click", function (e) {
  e.preventDefault();
  let href = this.getAttribute("href");
  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
});

// calling api for getting all phone's details
const loadPhone = async (searchText, isShowAll) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("something happened", error);
  }
};
//display phones function
function displayPhones(phones, isShowAll) {
  const productsContainer = document.getElementById("products");
  productsContainer.textContent = "";

  // condition for show-all
  const showAll = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  // show how many you want to:
  // show-all button event
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  } 

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = `border text-card-foreground w-full bg-white rounded-lg shadow-lg`;
    div.innerHTML = `
    <div class="flex flex-col space-y-1.5 p-6">
            <img
              src="${phone.image}"
              class="mx-auto mt-4 w-[199px] h-[260px]"
            />
          </div>
          <div class="p-4">
            <h2 class="text-lg font-semibold text-center">${phone.phone_name}</h2>
            <p class="text-sm text-gray-600 text-center mt-2">
              There are many variations of passages of available, but the
              majority have suffered
            </p>
          </div>
          <div class="items-center p-6 flex justify-center pb-4">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-[#0D6EFD] text-[#ffff] hover:bg-[#2070e7] h-10 px-4 py-2 w-full"
            >
              Show Details
            </button>
          </div>

        
    `;
    productsContainer.appendChild(div);
  });

  // hide loading spinner
  spinnerHandler(false);
}

//search btn handle function
document.getElementById("search-btn").addEventListener("click", () =>{
  handleSearch(false)
});
function handleSearch(isShowAll) {
  spinnerHandler(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}

const spinnerHandler = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

//show-all button handle
document.getElementById("show-all").addEventListener("click", () => {
  handleSearch(true);
});
