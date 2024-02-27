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

  // show: how many you want to
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
            <button onclick="handleShowDetails('${phone.slug}')" id="show-details"
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
document.getElementById("search-btn").addEventListener("click", () => {
  handleSearch(false);
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

// handle show details of every single products
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// show phone details function
function showPhoneDetails(phone) {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  popup.innerHTML = `
  <div
  class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
  aria-modal="true"
  role="dialog"
>
  <div class="mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
    <div class="text-center">
      <div
        class="mx-auto mb-5 flex items-center justify-center rounded-md bg-blue-100"
      >
        <img
          src="${phone.image}"
          alt="Phone Image"
          class="w-[150px] h-[199px]"
        />
      </div>
      <h3
        class="text-lg text-left leading-6 font-medium text-gray-900 mt-2 mb-4"
      >
        ${phone.name}
      </h3>
      <div class="text-sm text-left text-gray-500">
        <ul class="text-left mt-4 space-y-2">
          <li>
            <strong>Storage:</strong> ${phone.mainFeatures.storage}
          </li>
          <li><strong>Display Size:</strong> ${phone.mainFeatures.displaySize}</li>
          <li><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</li>
          <li>
            <strong>Memory:</strong> ${phone.mainFeatures.memory}
          </li>
          <li><strong>Slug:</strong> ${phone.slug}</li>
          <li>
            <strong>Release date:</strong> ${phone.releaseDate}
          </li>
          <li><strong>Brand:</strong> ${phone.brand}</li>
          <li>
            <strong>GPS:</strong> ${phone.others.GPS}
          </li>
        </ul>
      </div>
      <div class="mt-5 sm:mt-6">
        <button
          id="close-modal"
          class="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>
  `;
  const close = document.getElementById("close-modal");
  close.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
}
